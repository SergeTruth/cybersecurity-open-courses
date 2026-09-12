window.COURSE_CODE_MODULE = {
  "title": "Assert the Side Effect Did Not Occur",
  "codeIntro": "A framework-independent integration contract exercises production handlers in memory. Positive controls prevent an implementation that rejects everything from passing the failure suite.",
  "codeExamples": [
    {
      "title": "Fail-secure authorization contract suite",
      "language": "typescript",
      "blurb": "The harness must use isolated durable storage and production authorization wiring. Its controllable collaborators inject each failure deterministically; no listening web server is required. Security telemetry may occur, but protected mutations, messages, files, jobs, and privileged calls must remain absent.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode. Save as an integration test.
type EntryPoint =
  | "rest"
  | "rpc"
  | "worker"
  | "scheduler"
  | "admin-tool"
  | "application-service";
type FailureMode =
  | "allow"
  | "deny"
  | "missing-identity"
  | "missing-tenant"
  | "missing-action"
  | "malformed-roles"
  | "resource-lookup-failure"
  | "resource-version-changed-after-allow"
  | "allow-expires-before-effect"
  | "policy-database-failure"
  | "policy-timeout"
  | "retry-exhausted"
  | "invalid-response"
  | "mismatched-response"
  | "nonboolean-policy-result"
  | "unknown-decision"
  | "cache-miss-policy-failure"
  | "expired-cache-policy-failure"
  | "forged-cache-and-policy-failure"
  | "cache-read-timeout"
  | "clock-failure"
  | "identity-revoked-after-cache"
  | "cached-deny"
  | "policy-version-changed-after-cache"
  | "circuit-open"
  | "policy-throws"
  | "authorization-telemetry-throws"
  | "late-allow-after-cancel";

type OperationOutcome = Readonly<{
  kind: "completed" | "denied" | "unavailable";
}>;

type ProtectedEffects = Readonly<{
  databaseMutations: number;
  messages: number;
  fileChanges: number;
  privilegedCalls: number;
  queuedJobs: number;
}>;

interface FailSecureHarness {
  // reset() restores fixtures, counters, clock, circuit and pending operations.
  reset(): Promise<void>;
  configure(mode: FailureMode): Promise<void>;
  invoke(entryPoint: EntryPoint): Promise<unknown>;
  protectedStateDigest(): Promise<unknown>;
  protectedEffects(): Promise<unknown>;
  failureWasConsumed(): Promise<boolean>;

  // Controls used only for the cancellation/late-completion scenario.
  waitUntilPolicyPending(): Promise<void>;
  cancelInvocation(): Promise<void>;
  releaseLateAllow(): Promise<void>;
  flushAsyncWork(): Promise<void>;
}

const ENTRY_POINTS: readonly EntryPoint[] = Object.freeze([
  "rest", "rpc", "worker", "scheduler", "admin-tool", "application-service"
]);

const INDETERMINATE_MODES: readonly FailureMode[] = Object.freeze([
  "missing-action",
  "malformed-roles",
  "resource-lookup-failure",
  "resource-version-changed-after-allow",
  "allow-expires-before-effect",
  "policy-database-failure",
  "policy-timeout",
  "retry-exhausted",
  "invalid-response",
  "mismatched-response",
  "nonboolean-policy-result",
  "unknown-decision",
  "cache-miss-policy-failure",
  "expired-cache-policy-failure",
  "forged-cache-and-policy-failure",
  "cache-read-timeout",
  "clock-failure",
  "policy-version-changed-after-cache",
  "circuit-open",
  "policy-throws",
  "authorization-telemetry-throws"
]);

const DENIAL_MODES: readonly FailureMode[] = Object.freeze([
  "deny",
  "missing-identity",
  "missing-tenant",
  "identity-revoked-after-cache",
  "cached-deny"
]);

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function ownData(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) throw new Error("invalid harness result");
  return descriptor.value;
}

function parseOutcome(value: unknown): OperationOutcome {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("invalid operation outcome");
  }
  const prototype = Object.getPrototypeOf(value);
  if ((prototype !== Object.prototype && prototype !== null) ||
      Reflect.ownKeys(value).length !== 1) {
    throw new Error("invalid operation outcome");
  }
  const kind = ownData(value, "kind");
  if (kind !== "completed" && kind !== "denied" && kind !== "unavailable") {
    throw new Error("invalid operation outcome");
  }
  return Object.freeze({ kind });
}

async function stateDigest(harness: FailSecureHarness): Promise<string> {
  const value = await harness.protectedStateDigest();
  if (typeof value !== "string" || !/^sha256:[a-f0-9]{64}$/u.test(value)) {
    throw new Error("invalid protected-state digest");
  }
  return value;
}

async function effects(harness: FailSecureHarness): Promise<ProtectedEffects> {
  const value = await harness.protectedEffects();
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("invalid effect counters");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new Error("invalid effect counters");
  }
  const names = [
    "databaseMutations", "fileChanges", "messages",
    "privilegedCalls", "queuedJobs"
  ];
  const keys = Reflect.ownKeys(value);
  if (keys.length !== names.length || keys.some(key =>
    typeof key !== "string" || !names.includes(key))) {
    throw new Error("invalid effect counters");
  }
  const readCount = (name: string): number => {
    const count = ownData(value, name);
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
      throw new Error("invalid effect counter");
    }
    return count;
  };
  return Object.freeze({
    databaseMutations: readCount("databaseMutations"),
    messages: readCount("messages"),
    fileChanges: readCount("fileChanges"),
    privilegedCalls: readCount("privilegedCalls"),
    queuedJobs: readCount("queuedJobs")
  });
}

function zeroEffects(value: ProtectedEffects): boolean {
  return value.databaseMutations === 0 && value.messages === 0 &&
    value.fileChanges === 0 && value.privilegedCalls === 0 &&
    value.queuedJobs === 0;
}

async function assertBlocked(
  harness: FailSecureHarness,
  entryPoint: EntryPoint,
  mode: FailureMode,
  expected: "denied" | "unavailable"
): Promise<void> {
  await harness.reset();
  await harness.configure(mode);
  const before = await stateDigest(harness);
  const outcome = parseOutcome(await harness.invoke(entryPoint));
  assert(outcome.kind === expected, "incorrect non-grant outcome");
  assert(await harness.failureWasConsumed() === true,
    "failure injection was not exercised");
  await harness.flushAsyncWork();
  assert(await stateDigest(harness) === before, "protected state changed");
  assert(zeroEffects(await effects(harness)), "protected side effect occurred");
}

async function runFailSecureContractSuite(
  harness: FailSecureHarness
): Promise<void> {
  for (const entryPoint of ENTRY_POINTS) {
    // Positive control for every supported entry point.
    await harness.reset();
    await harness.configure("allow");
    const before = await stateDigest(harness);
    const allowed = parseOutcome(await harness.invoke(entryPoint));
    assert(allowed.kind === "completed", "allowed operation did not run");
    assert(await stateDigest(harness) !== before, "allowed state did not change");
    const allowedEffects = await effects(harness);
    assert(allowedEffects.databaseMutations === 1 &&
      allowedEffects.messages === 1 &&
      allowedEffects.fileChanges === 0 &&
      allowedEffects.privilegedCalls === 0 &&
      allowedEffects.queuedJobs === 0,
      "allowed operation effects are not exact");

    for (const mode of DENIAL_MODES) {
      await assertBlocked(harness, entryPoint, mode, "denied");
    }
    for (const mode of INDETERMINATE_MODES) {
      await assertBlocked(harness, entryPoint, mode, "unavailable");
    }

    // Cancellation must sever the control flow from a later allow result.
    await harness.reset();
    await harness.configure("late-allow-after-cancel");
    const cancellationBefore = await stateDigest(harness);
    const pending = harness.invoke(entryPoint);
    await harness.waitUntilPolicyPending();
    await harness.cancelInvocation();
    const cancelled = parseOutcome(await pending);
    assert(cancelled.kind === "unavailable", "cancelled operation was not stopped");
    await harness.releaseLateAllow();
    await harness.flushAsyncWork();
    assert(await harness.failureWasConsumed() === true,
      "late allow was not exercised");
    assert(await stateDigest(harness) === cancellationBefore,
      "late allow changed protected state");
    assert(zeroEffects(await effects(harness)),
      "late allow triggered a protected side effect");
  }
}`
    }
  ]
};
