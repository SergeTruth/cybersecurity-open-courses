window.COURSE_CODE_MODULE = {
  "title": "Bound Process Work",
  "codeIntro": "One application-owned supervisor enforces admission, concurrency, input, output, deadline, process-tree, and close/reap guarantees. The operation validates its result before reporting success.",
  "codeExamples": [
    {
      "title": "Execute through a shared bounded supervisor",
      "language": "typescript",
      "blurb": "The supervisor is created once at bootstrap with a fixed worker quota and bounded waiting queue. The isolation profile means an unprivileged identity, no network, read-only tools, a private job directory, and OS CPU, memory, file, and process limits. Its adapter must pass OS-specific tests proving that settlement occurs only after descendants are contained and the child is closed and reaped. If cleanup cannot be confirmed, the supervisor is poisoned and the service fails closed. Telemetry queues metadata only, never process output.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type Format = "pdf" | "png";

const MAX_INPUT_BYTES: 26_214_400 = 26_214_400;
const MAX_OUTPUT_BYTES: 1_048_576 = 1_048_576;
const EXECUTION_DEADLINE_MS = 25_000;
const CLEANUP_RESERVE_MS = 5_000;
const ADMISSION_DEADLINE_MS = 2_000;

const jobKey = Symbol("approved conversion job");

class ApprovedConversionJob {
  readonly #operandPath: string;
  readonly format: Format;
  readonly inputBytes: number;

  constructor(
    key: typeof jobKey,
    operandPath: string,
    format: Format,
    inputBytes: number
  ) {
    const parts = operandPath.split("/");
    if (key !== jobKey ||
        parts.length !== 7 ||
        parts[0] !== "" ||
        parts[1] !== "var" ||
        parts[2] !== "lib" ||
        parts[3] !== "course-worker" ||
        parts[4] !== "jobs" ||
        !/^job_[a-f0-9]{32}$/.test(parts[5] ?? "") ||
        parts[6] !== "input" ||
        (format !== "pdf" && format !== "png") ||
        !Number.isSafeInteger(inputBytes) ||
        inputBytes < 1 ||
        inputBytes > MAX_INPUT_BYTES) {
      throw new TypeError("invalid conversion job");
    }
    this.#operandPath = operandPath;
    this.format = format;
    this.inputBytes = inputBytes;
    Object.freeze(this);
  }

  operand(key: typeof jobKey): string {
    if (key !== jobKey) throw new TypeError("invalid job access");
    return this.#operandPath;
  }
}

const executableKey = Symbol("approved executable");
const approvedExecutables = new WeakSet<object>();

class ApprovedExecutable {
  constructor(key: typeof executableKey) {
    if (key !== executableKey) throw new TypeError("unapproved executable");
    approvedExecutables.add(this);
    Object.freeze(this);
  }
}

// Module 3's verified registry is the only production caller of this issuer.
function issueApprovedExecutable(): ApprovedExecutable {
  return new ApprovedExecutable(executableKey);
}

type BoundedLaunch = Readonly<{
  executable: ApprovedExecutable;
  args: readonly ["--format", Format, "--", string];
  shell: false;
  cwd: "/var/lib/course-worker";
  env: Readonly<{ LANG: "C.UTF-8"; LC_ALL: "C.UTF-8" }>;
  isolationProfile: "converter-unprivileged-v1";
  inputBytes: number;
  maxOutputBytes: 1_048_576;
  executionDeadlineMs: 25_000;
  cleanupReserveMs: 5_000;
  admissionDeadlineMs: 2_000;
}>;

type ProcessOutcome = Readonly<{
  exitCode: number | null;
  signal: string | null;
  durationMs: number;
  stdoutBytes: number;
  stderrBytes: number;
  closedAndReaped: true;
  processTreeContained: true;
}>;

interface CancellationSignal {
  readonly aborted: boolean;
  onAbort(listener: () => void): () => void;
}

interface SharedBoundedProcessSupervisor {
  // Validates while the slot is borrowed. A rejected response retires the
  // worker and poisons the service before any slot can be reused.
  runValidated<T>(
    launch: BoundedLaunch,
    cancellation: CancellationSignal,
    validate: (value: unknown) => T
  ): Promise<T>;
  // Trusted application shutdown rejects admission, drains, then terminates,
  // closes, and reaps every remaining child within this positive deadline.
  shutdown(deadlineMs: number): Promise<void>;
}

type SupervisorPolicy = Readonly<{
  maxWorkers: 4;
  maxQueued: 16;
  maxInputBytes: 26_214_400;
  maxOutputBytes: 1_048_576;
  executionDeadlineMs: 25_000;
  cleanupReserveMs: 5_000;
  admissionDeadlineMs: 2_000;
  isolationProfile: "converter-unprivileged-v1";
}>;

interface ProcessSupervisorFactory {
  start(policy: SupervisorPolicy): SharedBoundedProcessSupervisor;
}

interface NonBlockingTelemetryQueue {
  // A tested in-memory enqueue: it never performs handler I/O or blocks.
  tryEnqueue(event: Readonly<Record<string, string | number>>): boolean;
}

class ConversionFailed extends Error {
  constructor() {
    super("conversion failed");
    this.name = "ConversionFailed";
  }
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function requireOutcome(
  value: unknown
): ProcessOutcome {
  const expectedKeys = [
    "exitCode", "signal", "durationMs", "stdoutBytes", "stderrBytes",
    "closedAndReaped", "processTreeContained"
  ];
  if (!isPlainRecord(value) ||
      Object.keys(value).length !== expectedKeys.length ||
      !expectedKeys.every((key: string): boolean => Object.hasOwn(value, key))) {
    throw new ConversionFailed();
  }

  const readDataProperty = (key: string): unknown => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) {
      throw new ConversionFailed();
    }
    return descriptor.value as unknown;
  };

  const exitCode = readDataProperty("exitCode");
  const signal = readDataProperty("signal");
  const durationMs = readDataProperty("durationMs");
  const stdoutBytes = readDataProperty("stdoutBytes");
  const stderrBytes = readDataProperty("stderrBytes");
  const closedAndReaped = readDataProperty("closedAndReaped");
  const processTreeContained = readDataProperty("processTreeContained");

  if ((exitCode !== null &&
        (typeof exitCode !== "number" ||
          !Number.isSafeInteger(exitCode) ||
          exitCode < 0 || exitCode > 255)) ||
      (typeof signal !== "string" && signal !== null) ||
      (typeof signal === "string" &&
        !/^[A-Z][A-Z0-9]{1,15}$/.test(signal)) ||
      ((exitCode === null) === (signal === null)) ||
      typeof durationMs !== "number" ||
      !Number.isFinite(durationMs) ||
      durationMs < 0 ||
      durationMs > EXECUTION_DEADLINE_MS + CLEANUP_RESERVE_MS ||
      typeof stdoutBytes !== "number" ||
      !Number.isSafeInteger(stdoutBytes) ||
      stdoutBytes < 0 ||
      typeof stderrBytes !== "number" ||
      !Number.isSafeInteger(stderrBytes) ||
      stderrBytes < 0 ||
      stdoutBytes + stderrBytes > MAX_OUTPUT_BYTES ||
      closedAndReaped !== true ||
      processTreeContained !== true) {
    throw new ConversionFailed();
  }

  return Object.freeze({
    exitCode,
    signal,
    durationMs,
    stdoutBytes,
    stderrBytes,
    closedAndReaped,
    processTreeContained
  });
}

type BoundedConversionService = Readonly<{
  convert(
    job: ApprovedConversionJob,
    cancellation: CancellationSignal
  ): Promise<Readonly<{ kind: "converted" }>>;
  shutdown(): Promise<void>;
  telemetryDrops(): number;
}>;

let conversionServiceConfigured = false;

function configureBoundedConversionService(
  approvedConverter: ApprovedExecutable,
  supervisorFactory: ProcessSupervisorFactory,
  telemetry: NonBlockingTelemetryQueue
): BoundedConversionService {
  if (conversionServiceConfigured) {
    throw new Error("conversion service is already configured");
  }
  if (!(approvedConverter instanceof ApprovedExecutable) ||
      !approvedExecutables.has(approvedConverter)) {
    throw new TypeError("unapproved executable");
  }
  conversionServiceConfigured = true;

  const supervisor = supervisorFactory.start(Object.freeze({
    maxWorkers: 4,
    maxQueued: 16,
    maxInputBytes: MAX_INPUT_BYTES,
    maxOutputBytes: MAX_OUTPUT_BYTES,
    executionDeadlineMs: EXECUTION_DEADLINE_MS,
    cleanupReserveMs: CLEANUP_RESERVE_MS,
    admissionDeadlineMs: ADMISSION_DEADLINE_MS,
    isolationProfile: "converter-unprivileged-v1"
  }));
  let droppedTelemetry = 0;
  let lifecycle: "running" | "closing" | "closed" | "poisoned" = "running";
  let shutdownPromise: Promise<void> | undefined;

  const convert = async (
    job: ApprovedConversionJob,
    cancellation: CancellationSignal
  ): Promise<Readonly<{ kind: "converted" }>> => {
    if (lifecycle !== "running") throw new ConversionFailed();
    if (!(job instanceof ApprovedConversionJob) ||
        job.inputBytes > MAX_INPUT_BYTES ||
        typeof cancellation !== "object" ||
        cancellation === null ||
        typeof cancellation.aborted !== "boolean" ||
        typeof cancellation.onAbort !== "function") {
      throw new TypeError("unapproved conversion job");
    }
    if (cancellation.aborted) throw new ConversionFailed();

    const launch: BoundedLaunch = Object.freeze({
      executable: approvedConverter,
      args: Object.freeze([
        "--format", job.format, "--", job.operand(jobKey)
      ] as const),
      shell: false,
      cwd: "/var/lib/course-worker",
      env: Object.freeze({ LANG: "C.UTF-8", LC_ALL: "C.UTF-8" }),
      isolationProfile: "converter-unprivileged-v1",
      inputBytes: job.inputBytes,
      maxOutputBytes: MAX_OUTPUT_BYTES,
      executionDeadlineMs: EXECUTION_DEADLINE_MS,
      cleanupReserveMs: CLEANUP_RESERVE_MS,
      admissionDeadlineMs: ADMISSION_DEADLINE_MS
    });

    const outcome = await supervisor.runValidated(
      launch,
      cancellation,
      requireOutcome
    );
    if (outcome.exitCode !== 0 || outcome.signal !== null) {
      throw new ConversionFailed();
    }

    const event = Object.freeze({
      event: "conversion_completed",
      duration_ms: outcome.durationMs,
      output_bytes: outcome.stdoutBytes + outcome.stderrBytes
    });
    try {
      if (!telemetry.tryEnqueue(event)) droppedTelemetry += 1;
    } catch {
      droppedTelemetry += 1;
    }
    void droppedTelemetry; // Expose this counter through protected health metrics.
    return Object.freeze({ kind: "converted" as const });
  };

  const shutdown = (): Promise<void> => {
    if (shutdownPromise !== undefined) return shutdownPromise;
    lifecycle = "closing";
    shutdownPromise = (async (): Promise<void> => {
      try {
        await supervisor.shutdown(10_000);
        lifecycle = "closed";
      } catch {
        lifecycle = "poisoned";
        throw new ConversionFailed();
      }
    })();
    return shutdownPromise;
  };

  return Object.freeze({
    convert,
    shutdown,
    telemetryDrops: (): number => droppedTelemetry
  });
}`
    }
  ]
};
