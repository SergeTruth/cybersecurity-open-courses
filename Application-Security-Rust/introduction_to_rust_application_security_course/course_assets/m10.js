window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-40e046fb50",
  "questions": {
    "q1": {
      "options": {
        "A": "Rust applications can use third-party dependencies, whose behavior and supply-chain origins still need review.",
        "B": "Memory-safety protections reduce important defect classes while leaving application logic, access control, dependencies, and operations to engineer.",
        "C": "Authentication and authorization rules express application policy that the compiler cannot automatically determine or enforce.",
        "D": "Rust provides meaningful memory-safety guarantees when safe code and sound abstractions follow their contracts."
      }
    },
    "q2": {
      "options": {
        "A": "Distributing unsafe operations widely increases the number of assumptions that must be checked manually.",
        "B": "Hidden safety assumptions make it harder to verify that implementations and safe callers preserve required invariants.",
        "C": "Small justified unsafe regions with explicit invariants make manual safety obligations easier to review and maintain.",
        "D": "Compilation does not verify every unsafe precondition or establish that its surrounding abstraction is sound."
      }
    },
    "q3": {
      "options": {
        "A": "Foreign code can rely on pointer, ownership, representation, and threading assumptions beyond Rust's automatic verification.",
        "B": "FFI needs documented contracts because ownership, validity, and calling conventions must agree across languages.",
        "C": "Foreign interfaces are not inherently safer than compiler-checked Rust and may expose additional manual obligations.",
        "D": "External values still require validation even when they cross a documented foreign-function interface."
      }
    },
    "q4": {
      "options": {
        "A": "Application-specific business rules must be expressed explicitly; Rust cannot infer them from incoming data.",
        "B": "Input remains untrusted until relevant structural, semantic, permission, and resource checks have succeeded.",
        "C": "Safe code still needs validation of operations, authority, domain meaning, and resource consumption.",
        "D": "Externally controlled values may drive sensitive operations, making validation essential before they enter trusted application behavior."
      }
    },
    "q5": {
      "options": {
        "A": "Unwrap and expect do not redact sensitive error context and can expose details through panic handling.",
        "B": "Extracting values without handling expected failures can cause panics or brittle behavior on ordinary error paths.",
        "C": "Graceful degradation requires intentional error handling rather than assuming value extraction will always succeed.",
        "D": "These methods can panic on failure cases instead of preventing all panics."
      }
    },
    "q6": {
      "options": {
        "A": "Authorized teams can receive useful context when sensitive values are minimized and access is appropriate.",
        "B": "Consistent failure categories help observability without inherently disclosing secrets or implementation internals.",
        "C": "Error output should avoid revealing credentials, deployment topology, sensitive configuration, or unnecessary implementation details.",
        "D": "Clear non-sensitive status information helps users and operators understand failures without exposing protected data."
      }
    },
    "q7": {
      "options": {
        "A": "Dependency review and behavioral tests provide different evidence and should complement each other.",
        "B": "Crates can contribute executable behavior, build-time effects, linked components, and application data processing.",
        "C": "Dependencies become part of the trusted build and execution path, so their risk affects the application.",
        "D": "Transitive dependencies can also execute or ship with the application and belong in dependency review."
      }
    },
    "q8": {
      "options": {
        "A": "Feature flags can enable compiled functionality rather than merely alter source comments.",
        "B": "Feature selection does not prove that enabled dependency implementations or release processes are safe.",
        "C": "Lockfiles record resolved dependency versions, while feature configuration determines enabled capabilities; both matter.",
        "D": "Enabled features may introduce additional parsers, protocols, integrations, dependencies, and security-sensitive behavior."
      }
    },
    "q9": {
      "options": {
        "A": "Approved runtime delivery and redaction limit unnecessary secret copies in source history, artifacts, and logs.",
        "B": "Broadly distributed build artifacts can expose embedded secrets to readers who do not need runtime credentials.",
        "C": "Printing secrets at startup creates retained copies in log systems and increases disclosure risk.",
        "D": "Hard-coded credentials spread through source, history, binaries, and deployments and make replacement more difficult."
      }
    },
    "q10": {
      "options": {
        "A": "Safe code still benefits from deadlines that limit waiting, abandoned work, and resource consumption.",
        "B": "Unbounded concurrency and resource use can exhaust capacity even when every individual operation is memory safe.",
        "C": "Ownership checks do not automatically prevent task floods, unbounded queues, or excessive connection use.",
        "D": "Limits constrain workload, while observability helps detect saturation, failures, and attempts to abuse capacity."
      }
    },
    "q11": {
      "options": {
        "A": "Logs should support diagnosis without copying working credentials or other secrets into retained output.",
        "B": "Omitting every failure detail makes investigation and operational response unnecessarily difficult.",
        "C": "Structured evidence should identify events and outcomes while minimizing secrets, personal data, and sensitive internals.",
        "D": "Raw requests and credentials can expose protected data and should not be logged indiscriminately."
      }
    },
    "q12": {
      "options": {
        "A": "Dependency trust and operational configuration both influence application security and belong within the review boundary.",
        "B": "Tests exercise application behavior beyond the properties established through compilation and type checking.",
        "C": "Compiler guarantees do not replace security review of policy, boundaries, deployment, dependencies, and lifecycle behavior.",
        "D": "Secure engineering applies Rust's safety strengths while also protecting the supply chain, configuration, releases, and operations."
      }
    }
  }
};
