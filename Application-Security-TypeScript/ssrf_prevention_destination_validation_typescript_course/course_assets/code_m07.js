window.COURSE_CODE_MODULE = {
  "title": "Test Destination-Changing Behavior",
  "codeIntro": "This framework-independent contract suite uses controlled resolver and transport fakes. It never opens a real socket, and it asserts exact security error codes so unrelated failures cannot make denial tests pass.",
  "codeExamples": [
    {
      "title": "Adversarial outbound-service contract suite",
      "language": "typescript",
      "blurb": "The positive control proves that the harness reaches the permitted path. The remaining checks cover parsing, every DNS result, IP representations, connection pinning, redirect reauthorization, resource limits, and cross-tenant integration authorization.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode. No network is used.
type SecurityCode =
  | "destination_denied"
  | "redirect_denied"
  | "redirect_limit"
  | "redirect_loop"
  | "resource_limit"
  | "authorization_denied";

class SecurityBoundaryError extends Error {
  readonly code: SecurityCode;

  constructor(code: SecurityCode) {
    super("request denied");
    this.name = "SecurityBoundaryError";
    this.code = code;
  }
}

type FakeDnsAnswer = Readonly<{
  address: string;
  family: 4 | 6;
}>;

type FakeResponse = Readonly<{
  status: number;
  location?: string;
  mediaType?: string;
  body?: string;
  encodedBytes?: number;
  decodedBytes?: number;
  headerBytes?: number;
  connectDelayMs?: number;
  responseDelayMs?: number;
  delayMs?: number;
}>;

type ConnectionAttempt = Readonly<{
  socketAddress: string;
  family: 4 | 6;
  tlsServerName: string;
  hostHeader: string;
  transportDnsQueries: number;
  proxyUsed: boolean;
  inboundAuthorizationForwarded: boolean;
  inboundCookieForwarded: boolean;
}>;

declare const testPrincipalBrand: unique symbol;
type TestPrincipal = Readonly<{ [testPrincipalBrand]: true }>;

interface OutboundContractHarness {
  reset(): void;
  setDns(hostname: string, answers: unknown): void;
  setDnsSequence(hostname: string, answersByLookup: readonly unknown[]): void;
  setDnsFailure(hostname: string): void;
  setResponse(canonicalUrl: string, response: FakeResponse): void;
  configureWebhookIntegration(
    integrationId: string,
    tenant: "tenant-a" | "tenant-b",
    canonicalUrl: string
  ): void;
  principal(tenant: "tenant-a" | "tenant-b", subject: string): TestPrincipal;
  fetchPublicDocument(rawUrl: unknown): Promise<unknown>;
  sendWebhookTest(
    principal: TestPrincipal,
    integrationId: string
  ): Promise<unknown>;
  connectionAttempts(): readonly ConnectionAttempt[];
}

function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function expectSecurityCode(
  operation: () => Promise<unknown>,
  expected: SecurityCode
): Promise<void> {
  try {
    await operation();
  } catch (error: unknown) {
    if (error instanceof SecurityBoundaryError && error.code === expected) return;
    throw new Error("wrong failure contract");
  }
  throw new Error("operation unexpectedly succeeded");
}

async function runSsrfContractSuite(
  harness: OutboundContractHarness
): Promise<void> {
  const publicV4: FakeDnsAnswer = Object.freeze({
    address: "8.8.8.8",
    family: 4
  });
  const publicV6: FakeDnsAnswer = Object.freeze({
    address: "2606:4700:4700::1111",
    family: 6
  });

  // Positive control: an allowed target reaches one correctly pinned socket.
  harness.reset();
  harness.setDns("media.example.com", [publicV4]);
  harness.setResponse("https://media.example.com/file", Object.freeze({
    status: 200,
    mediaType: "text/plain",
    body: "ok",
    encodedBytes: 2,
    decodedBytes: 2
  }));
  await harness.fetchPublicDocument("https://media.example.com/file");
  const positiveAttempts = harness.connectionAttempts();
  check(positiveAttempts.length === 1, "positive path must connect once");
  const positive = positiveAttempts[0];
  check(positive !== undefined, "missing positive connection");
  check(positive.socketAddress === publicV4.address,
    "socket must use the approved address");
  check(positive.tlsServerName === "media.example.com" &&
        positive.hostHeader === "media.example.com",
    "TLS and Host must retain the authorized name");
  check(positive.transportDnsQueries === 0 && !positive.proxyUsed,
    "transport must not re-resolve or use an ambient proxy");
  check(!positive.inboundAuthorizationForwarded &&
        !positive.inboundCookieForwarded,
    "inbound credentials must not be forwarded");

  // A pure IPv6 answer follows the same approved, pinned path.
  harness.reset();
  harness.setDns("media.example.com", [publicV6]);
  harness.setResponse("https://media.example.com/v6", Object.freeze({
    status: 200,
    mediaType: "text/plain",
    body: "v6",
    encodedBytes: 2,
    decodedBytes: 2
  }));
  await harness.fetchPublicDocument("https://media.example.com/v6");
  const v6Attempt = harness.connectionAttempts()[0];
  check(v6Attempt !== undefined &&
        v6Attempt.family === 6 &&
        v6Attempt.socketAddress === publicV6.address,
    "IPv6 connection must use its approved canonical address");

  const initialDenials: readonly unknown[] = Object.freeze([
    "http://media.example.com/file",
    "https://user:secret@media.example.com/file",
    "https://media.example.com:8443/file",
    "https://media.example.com./file",
    "https://not-media.example.com/file",
    "https://8.8.8.8/file",
    "https://127.0.0.1/file",
    "https://127.1/file",
    "https://2130706433/file",
    "https://0x7f000001/file",
    "https://[::1]/file",
    "https://[::ffff:127.0.0.1]/file",
    "https://media.example.com/\\nfile",
    new String("https://media.example.com/file")
  ]);
  for (const target of initialDenials) {
    harness.reset();
    await expectSecurityCode(
      () => harness.fetchPublicDocument(target),
      "destination_denied"
    );
    check(harness.connectionAttempts().length === 0,
      "denied URL must not connect");
  }

  // Every selectable answer must pass, including IPv6 and mapped forms.
  for (const forbidden of [
    Object.freeze({ address: "10.0.0.7", family: 4 as const }),
    Object.freeze({ address: "0.0.0.0", family: 4 as const }),
    Object.freeze({ address: "169.254.169.254", family: 4 as const }),
    Object.freeze({ address: "224.0.0.1", family: 4 as const }),
    Object.freeze({ address: "::", family: 6 as const }),
    Object.freeze({ address: "fd00::7", family: 6 as const }),
    Object.freeze({ address: "ff02::1", family: 6 as const }),
    Object.freeze({ address: "::ffff:127.0.0.1", family: 6 as const })
  ]) {
    harness.reset();
    harness.setDns("media.example.com", [publicV4, publicV6, forbidden]);
    await expectSecurityCode(
      () => harness.fetchPublicDocument("https://media.example.com/file"),
      "destination_denied"
    );
    check(harness.connectionAttempts().length === 0,
      "mixed DNS answers must fail before connect");
  }

  for (const invalidAnswers of [
    [],
    [{ address: "8.8.8.8", family: 5 }],
    Array.from({ length: 17 }, () => publicV4),
    "8.8.8.8"
  ]) {
    harness.reset();
    harness.setDns("media.example.com", invalidAnswers);
    await expectSecurityCode(
      () => harness.fetchPublicDocument("https://media.example.com/file"),
      "destination_denied"
    );
    check(harness.connectionAttempts().length === 0,
      "malformed resolution must not connect");
  }
  harness.reset();
  harness.setDnsFailure("media.example.com");
  await expectSecurityCode(
    () => harness.fetchPublicDocument("https://media.example.com/file"),
    "destination_denied"
  );

  // A redirect is closed, parsed, resolved, and authorized before hop two.
  harness.reset();
  harness.setDns("media.example.com", [publicV4]);
  harness.setResponse("https://media.example.com/start", Object.freeze({
    status: 302,
    location: "https://127.0.0.1/private"
  }));
  await expectSecurityCode(
    () => harness.fetchPublicDocument("https://media.example.com/start"),
    "redirect_denied"
  );
  check(harness.connectionAttempts().length === 1,
    "denied redirect must not open a second connection");

  for (const deniedLocation of [
    "http://media.example.com/file",
    "https://user:secret@media.example.com/file",
    "https://media.example.com:8443/file",
    "https://media.example.com/\\nfile",
    "https://not-media.example.com/file"
  ]) {
    harness.reset();
    harness.setDns("media.example.com", [publicV4]);
    harness.setResponse("https://media.example.com/start", Object.freeze({
      status: 302,
      location: deniedLocation
    }));
    await expectSecurityCode(
      () => harness.fetchPublicDocument("https://media.example.com/start"),
      "redirect_denied"
    );
    check(harness.connectionAttempts().length === 1,
      "denied redirect location must not open a second connection");
  }

  // A changed answer is checked before the redirect socket is selected.
  harness.reset();
  harness.setDnsSequence("media.example.com", [
    [publicV4],
    [{ address: "127.0.0.1", family: 4 }]
  ]);
  harness.setResponse("https://media.example.com/first", Object.freeze({
    status: 302,
    location: "/second"
  }));
  await expectSecurityCode(
    () => harness.fetchPublicDocument("https://media.example.com/first"),
    "redirect_denied"
  );
  check(harness.connectionAttempts().length === 1,
    "changed DNS answer must be denied before the next socket");

  // A permitted relative redirect is independently resolved and pinned.
  harness.reset();
  harness.setDns("media.example.com", [publicV4]);
  harness.setResponse("https://media.example.com/start", Object.freeze({
    status: 302,
    location: "/final"
  }));
  harness.setResponse("https://media.example.com/final", Object.freeze({
    status: 200,
    mediaType: "text/plain",
    body: "ok",
    encodedBytes: 2,
    decodedBytes: 2
  }));
  await harness.fetchPublicDocument("https://media.example.com/start");
  const redirectAttempts = harness.connectionAttempts();
  check(redirectAttempts.length === 2,
    "allowed redirect must authorize exactly two connections");
  check(redirectAttempts.every((attempt) =>
    attempt.socketAddress === publicV4.address &&
    attempt.tlsServerName === "media.example.com" &&
    attempt.transportDnsQueries === 0 && !attempt.proxyUsed
  ), "every redirect hop must remain pinned");

  harness.reset();
  harness.setDns("media.example.com", [publicV4]);
  harness.setResponse("https://media.example.com/a", Object.freeze({
    status: 302,
    location: "/b"
  }));
  harness.setResponse("https://media.example.com/b", Object.freeze({
    status: 302,
    location: "/a"
  }));
  await expectSecurityCode(
    () => harness.fetchPublicDocument("https://media.example.com/a"),
    "redirect_loop"
  );

  harness.reset();
  harness.setDns("media.example.com", [publicV4]);
  for (let index = 0; index < 4; index += 1) {
    harness.setResponse(
      "https://media.example.com/" + index,
      Object.freeze({ status: 302, location: "/" + (index + 1) })
    );
  }
  await expectSecurityCode(
    () => harness.fetchPublicDocument("https://media.example.com/0"),
    "redirect_limit"
  );

  // The fake signals limit violations without allocating an oversized body.
  for (const response of [
    Object.freeze({ status: 200, headerBytes: 16_385 }),
    Object.freeze({ status: 200, encodedBytes: 262_145 }),
    Object.freeze({ status: 200, decodedBytes: 524_289 }),
    Object.freeze({ status: 200, connectDelayMs: 2_001 }),
    Object.freeze({ status: 200, responseDelayMs: 5_001 }),
    Object.freeze({ status: 200, delayMs: 10_001 }),
    Object.freeze({ status: 200, mediaType: "text/html" })
  ]) {
    harness.reset();
    harness.setDns("media.example.com", [publicV4]);
    harness.setResponse("https://media.example.com/file", response);
    await expectSecurityCode(
      () => harness.fetchPublicDocument("https://media.example.com/file"),
      "resource_limit"
    );
  }

  // A positive integration control prevents an always-deny implementation
  // from satisfying the cross-tenant assertion that follows.
  const integrationId = "int_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
  harness.reset();
  harness.configureWebhookIntegration(
    integrationId,
    "tenant-b",
    "https://api.example.com/webhook"
  );
  harness.setDns("api.example.com", [publicV4]);
  const tenantB = harness.principal("tenant-b", "subject-b");
  await harness.sendWebhookTest(tenantB, integrationId);
  check(harness.connectionAttempts().length === 1,
    "authorized integration test must reach one pinned connection");

  // The stored integration belongs to tenant B; tenant A is denied before
  // any destination, credential, resolver, or transport capability is used.
  harness.reset();
  harness.configureWebhookIntegration(
    integrationId,
    "tenant-b",
    "https://api.example.com/webhook"
  );
  const tenantA = harness.principal("tenant-a", "subject-a");
  await expectSecurityCode(
    () => harness.sendWebhookTest(
      tenantA,
      integrationId
    ),
    "authorization_denied"
  );
  check(harness.connectionAttempts().length === 0,
    "cross-tenant denial must precede outbound work");
}`
    }
  ]
};
