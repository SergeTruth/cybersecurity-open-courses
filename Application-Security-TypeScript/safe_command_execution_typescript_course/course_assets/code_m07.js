window.COURSE_CODE_MODULE = {
  "title": "Test the Launch Specification",
  "codeIntro": "Security regression tests instantiate the production façade with trusted fakes and assert positive authorization, exact launch structure, denial before launch, and process-lifecycle failure behavior.",
  "codeExamples": [
    {
      "title": "Verify the complete conversion boundary",
      "language": "typescript",
      "blurb": "The fixture builds the real modules 3–6 composition and substitutes fakes only at trusted bootstrap. The production process adapter also needs a separate OS-specific conformance suite for deadline, output overflow, descendant termination, close, and reap behavior.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type Principal = Readonly<{ opaquePrincipal: true }>;
type ConversionResult = Readonly<{ kind: "converted" }>;

type LaunchRecord = Readonly<{
  executable: object;
  args: readonly string[];
  shell: false;
  cwd: string;
  env: Readonly<Record<string, string>>;
  isolationProfile: string;
  inputBytes: number;
  maxOutputBytes: number;
  executionDeadlineMs: number;
  cleanupReserveMs: number;
  admissionDeadlineMs: number;
}>;

interface ConversionServiceUnderTest {
  convert(principal: Principal, request: unknown): Promise<ConversionResult>;
}

interface StorageTestControl {
  allowOwnedAsset(principal: Principal, assetId: string): void;
  denyAsset(principal: Principal, assetId: string): void;
  readonly authorizationCalls: readonly Readonly<{
    principal: Principal;
    assetId: string;
  }>[];
}

interface RunnerTestControl {
  readonly approvedExecutable: object;
  readonly launches: readonly LaunchRecord[];
  returnNonzeroExit(): void;
  returnDeadline(): void;
  returnProtocolViolation(): void;
  readonly closeWasConfirmed: boolean;
  readonly supervisorWasPoisoned: boolean;
  readonly supervisorPolicy: Readonly<{
    maxWorkers: number;
    maxQueued: number;
  }>;
}

type ConversionFixture = Readonly<{
  service: ConversionServiceUnderTest;
  storage: StorageTestControl;
  runner: RunnerTestControl;
  principalA: Principal;
  principalB: Principal;
}>;

type ConversionFixtureFactory = () => ConversionFixture;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function expectSanitizedRejection(
  action: () => Promise<unknown>
): Promise<void> {
  try {
    await action();
  } catch (error: unknown) {
    assert(error instanceof Error, "expected an Error");
    assert(
      error.message === "invalid conversion request" ||
      error.message === "asset is not authorized" ||
      error.message === "conversion failed",
      "unexpected or unsanitized error"
    );
    return;
  }
  throw new Error("expected rejection");
}

function sameStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length &&
    actual.every((value: string, index: number): boolean =>
      value === expected[index]
    );
}

// Run this function from the course's test runner. The factory creates a fresh
// production composition for each case, with no operating-system process.
async function runConversionSecurityRegressionTests(
  createFixture: ConversionFixtureFactory
): Promise<void> {
  const assetId = "asset_0123456789abcdef0123456789abcdef";

  {
    const fixture = createFixture();
    fixture.storage.allowOwnedAsset(fixture.principalA, assetId);
    const result = await fixture.service.convert(fixture.principalA, {
      assetId,
      format: "pdf"
    });

    assert(result.kind === "converted", "positive control failed");
    assert(fixture.storage.authorizationCalls.length === 1,
      "storage authorization must occur exactly once");
    const authorizationCall = fixture.storage.authorizationCalls[0];
    assert(authorizationCall !== undefined, "missing authorization call");
    assert(authorizationCall.principal === fixture.principalA,
      "authorization used the wrong principal");
    assert(authorizationCall.assetId === assetId,
      "authorization used the wrong asset");
    assert(fixture.runner.launches.length === 1,
      "exactly one process may be launched");
    const launch = fixture.runner.launches[0];
    assert(launch !== undefined, "missing launch");
    assert(launch.executable === fixture.runner.approvedExecutable,
      "unexpected executable handle");
    assert(sameStrings(launch.args, [
      "--format", "pdf", "--",
      "/var/lib/course-worker/jobs/job_00000000000000000000000000000000/input"
    ]), "unexpected argument grammar");
    assert(launch.shell === false, "shell must remain disabled");
    assert(launch.cwd === "/var/lib/course-worker", "unexpected cwd");
    assert(Object.keys(launch.env).length === 2, "environment is not minimal");
    assert(launch.env.LANG === "C.UTF-8", "unexpected locale");
    assert(launch.env.LC_ALL === "C.UTF-8", "unexpected locale override");
    assert(!Object.hasOwn(launch.env, "PATH"), "PATH must not be inherited");
    assert(launch.isolationProfile === "converter-unprivileged-v1",
      "least-privilege isolation profile missing");
    assert(launch.inputBytes <= 25 * 1024 * 1024, "input limit missing");
    assert(launch.maxOutputBytes === 1_048_576, "output limit missing");
    assert(launch.executionDeadlineMs === 25_000, "deadline missing");
    assert(launch.cleanupReserveMs === 5_000, "cleanup reserve missing");
    assert(launch.admissionDeadlineMs === 2_000, "queue bound missing");
    assert(fixture.runner.supervisorPolicy.maxWorkers === 4,
      "shared worker limit missing");
    assert(fixture.runner.supervisorPolicy.maxQueued === 16,
      "bounded waiting queue missing");
    assert(fixture.runner.closeWasConfirmed, "child was not closed and reaped");
  }

  {
    const fixture = createFixture();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId, format: "pdf --output=/tmp/owned" }
    ));
    assert(fixture.runner.launches.length === 0,
      "unsupported formats must not launch a process");
  }

  {
    const fixture = createFixture();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId: "--help", format: "pdf" }
    ));
    assert(fixture.storage.authorizationCalls.length === 0,
      "invalid identifiers must fail before storage");
    assert(fixture.runner.launches.length === 0,
      "invalid identifiers must not launch a process");
  }

  {
    const fixture = createFixture();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId, format: "pdf", executable: "/bin/sh" }
    ));
    assert(fixture.runner.launches.length === 0,
      "extra structural fields must be rejected");
  }

  {
    const fixture = createFixture();
    fixture.storage.denyAsset(fixture.principalB, assetId);
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalB,
      { assetId, format: "pdf" }
    ));
    assert(fixture.runner.launches.length === 0,
      "unauthorized assets must not launch a process");
  }

  {
    const fixture = createFixture();
    fixture.storage.allowOwnedAsset(fixture.principalA, assetId);
    fixture.runner.returnNonzeroExit();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId, format: "pdf" }
    ));
    assert(fixture.runner.launches.length === 1,
      "the failure case must reach the process adapter");
    assert(fixture.runner.closeWasConfirmed,
      "failure must not return before close and reap");
  }

  {
    const fixture = createFixture();
    fixture.storage.allowOwnedAsset(fixture.principalA, assetId);
    fixture.runner.returnDeadline();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId, format: "pdf" }
    ));
    assert(fixture.runner.closeWasConfirmed,
      "deadline must include termination, close, and reap");
  }

  {
    const fixture = createFixture();
    fixture.storage.allowOwnedAsset(fixture.principalA, assetId);
    fixture.runner.returnProtocolViolation();
    await expectSanitizedRejection(() => fixture.service.convert(
      fixture.principalA,
      { assetId, format: "pdf" }
    ));
    assert(fixture.runner.supervisorWasPoisoned,
      "a process protocol violation must poison the supervisor");
  }
}`
    }
  ]
};
