window.COURSE_CODE_MODULE = {
  "title": "Launch the Program Directly",
  "codeIntro": "The trusted composition root captures a direct-process adapter. This internal operation accepts only an authorization-scoped storage capability; request data cannot select a program, shell, pathname, or argument structure.",
  "codeExamples": [
    {
      "title": "Launch a fixed executable without a shell",
      "language": "typescript",
      "blurb": "The adapter contract uses direct OS process creation and never a shell. The storage boundary returns an opaque operand staged in a private worker directory; callers cannot submit a pathname. This converter documents -- as its end-of-options marker. The named isolation profile is application policy, not request data.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
const approvedInputKey = Symbol("approved input");

class ApprovedInput {
  readonly #operandPath: string;

  constructor(key: typeof approvedInputKey, operandPath: string) {
    const parts = operandPath.split("/");
    if (key !== approvedInputKey ||
        parts.length !== 7 ||
        parts[0] !== "" ||
        parts[1] !== "var" ||
        parts[2] !== "lib" ||
        parts[3] !== "course-worker" ||
        parts[4] !== "jobs" ||
        !/^job_[a-f0-9]{32}$/.test(parts[5] ?? "") ||
        parts[6] !== "input") {
      throw new TypeError("invalid approved input");
    }
    this.#operandPath = operandPath;
    Object.freeze(this);
  }

  argument(key: typeof approvedInputKey): string {
    if (key !== approvedInputKey) throw new TypeError("invalid input access");
    return this.#operandPath;
  }
}

// This issuer stays inside the trusted storage adapter module.
function issueApprovedInput(operandPath: string): ApprovedInput {
  return new ApprovedInput(approvedInputKey, operandPath);
}

type DirectLaunch = Readonly<{
  executable: "/opt/course-tools/converter";
  args: readonly ["--format", "pdf", "--", string];
  shell: false;
  cwd: "/var/lib/course-worker";
  env: Readonly<{ LANG: "C.UTF-8"; LC_ALL: "C.UTF-8" }>;
  isolationProfile: "converter-unprivileged-v1";
  deadlineMs: 30_000;
  maxOutputBytes: 1_048_576;
}>;

interface DirectProcessAdapter {
  // Creates the executable directly and settles only after close and reap.
  run(launch: DirectLaunch): Promise<void>;
}

function buildPdfConverter(
  processAdapter: DirectProcessAdapter
): (input: ApprovedInput) => Promise<void> {
  return async (input: ApprovedInput): Promise<void> => {
    if (!(input instanceof ApprovedInput)) {
      throw new TypeError("unapproved converter input");
    }
    const launch: DirectLaunch = Object.freeze({
      executable: "/opt/course-tools/converter",
      args: Object.freeze([
        "--format", "pdf", "--", input.argument(approvedInputKey)
      ] as const),
      shell: false,
      cwd: "/var/lib/course-worker",
      env: Object.freeze({ LANG: "C.UTF-8", LC_ALL: "C.UTF-8" }),
      isolationProfile: "converter-unprivileged-v1",
      deadlineMs: 30_000,
      maxOutputBytes: 1_048_576
    });

    await processAdapter.run(launch);
  };
}`
    }
  ]
};
