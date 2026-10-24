window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-50f3c623ad",
  "questions": {
    "q01": {
      "options": {
        "A": "Applications directly exercise filesystem, process, identity, and resource authority and therefore need explicit privilege design.",
        "B": "Authentication identifies a caller but does not authorize every sensitive operation that caller requests.",
        "C": "Elevated authority increases the consequences of mistakes affecting resources or system state beyond ordinary application access.",
        "D": "Greater authority can magnify integrity, availability, memory, path, and process-control defects as well as confidentiality risks."
      }
    },
    "q02": {
      "options": {
        "A": "Task-specific grants limit the operations and resources exposed if the code fails or is compromised.",
        "B": "Permissions for hypothetical future tasks unnecessarily widen the current process's authority.",
        "C": "Internal naming conventions do not prevent broadly privileged code from exercising excessive access.",
        "D": "Unrestricted self-elevation undermines a boundary intended to limit the component's available authority."
      }
    },
    "q03": {
      "options": {
        "A": "Small code can still contain defects and needs review and failure-path verification.",
        "B": "The privileged entry point must validate unprivileged input rather than trust it because it reached sensitive code.",
        "C": "Returning an error does not by itself guarantee safe partial-state handling, authority reduction, or resource cleanup.",
        "D": "Narrow privileged sections reduce the code and operations capable of misusing elevated rights."
      }
    },
    "q04": {
      "options": {
        "A": "Loader, locale, temporary-path, configuration, and feature variables can also influence sensitive behavior.",
        "B": "Inherited settings can redirect configuration, library loading, parsing, paths, and child behavior and require deliberate startup policy.",
        "C": "A trusted launcher does not guarantee every inherited variable is appropriate for the application's privileged operations.",
        "D": "A fixed denylist can miss newly introduced environment-sensitive behavior and must not substitute for an explicit accepted environment."
      }
    },
    "q05": {
      "options": {
        "A": "Descriptors and working directory can carry inherited authority and resolution assumptions that still need validation.",
        "B": "Privileged initialization can already perform unsafe effects before delayed startup checks run.",
        "C": "Startup checks must establish the intended identity, trusted configuration, paths, environment, and inherited resource grants before sensitive use.",
        "D": "Executable launch success does not prove that inherited state satisfies the application's security contract."
      }
    },
    "q06": {
      "options": {
        "A": "A configured identity value does not establish that the privilege-changing operation actually succeeded.",
        "B": "Failure or incomplete reduction can leave unintended identity, groups, capabilities, or access available to later code.",
        "C": "Continuing at elevated authority after a failed reduction exposes the very permissions the program intended to remove.",
        "D": "Primary identity alone does not describe all supplementary groups, capabilities, or retained authority."
      }
    },
    "q07": {
      "options": {
        "A": "Reducing unnecessary authority and checking the resulting state limits exposure during the rest of the program's lifetime.",
        "B": "A hidden privileged thread still retains powerful authority that must be explicitly justified and constrained.",
        "C": "Handling requests before unnecessary privilege is removed exposes those requests to a broader authority context.",
        "D": "Verification is needed to establish the effective state rather than assume the requested reduction took effect."
      }
    },
    "q08": {
      "options": {
        "A": "A trusted executable can still accidentally expose or misuse authority inherited through resources and configuration.",
        "B": "Unknown inherited resources can carry sensitive authority and require a deliberate inheritance policy.",
        "C": "Avoiding a shell does not automatically remove inherited identity, descriptors, environment, or access.",
        "D": "Child creation can propagate parent authority, so identity and inherited-state restrictions belong in launch design."
      }
    },
    "q09": {
      "options": {
        "A": "Restricted logs can still leak through retention, forwarding, diagnostics, and later access changes.",
        "B": "Privileged diagnostics can reveal sensitive context and need appropriate content limits, redaction, and access controls.",
        "C": "Safe denial and failure records can support investigation without disclosing sensitive policy details indiscriminately.",
        "D": "Secret redaction does not prevent peer-controlled newlines or control characters from confusing log interpretation."
      }
    },
    "q10": {
      "options": {
        "A": "Denied actions and incomplete transitions exercise important boundaries that successful elevated operations cannot establish.",
        "B": "Lower-privilege tests can verify expected denials and actual post-reduction behavior.",
        "C": "Tests should establish effective identity, permitted and denied actions, inherited assumptions, cleanup, and failure behavior.",
        "D": "Cleanup needs coverage across relevant partial-initialization and failure paths rather than one successful example."
      }
    },
    "q11": {
      "options": {
        "A": "A sanitizer checks selected runtime defects, not whether the deployed account and filesystem policy match intended authority.",
        "B": "Tools need an explicit policy and architecture to assess rather than universally infer the intended privilege boundary.",
        "C": "Checked return values do not replace tests showing that denied operations and failed transitions behave safely.",
        "D": "Tools provide defect evidence, while privilege policy still requires intentional design, review, and behavior checks."
      }
    },
    "q12": {
      "options": {
        "A": "A coherent privilege policy covers identities, inherited access, sensitive operations, reduction, diagnostics, and ongoing verification.",
        "B": "Starting elevated and recording activity does not constrain the authority exercised by a defect or compromise.",
        "C": "One hardening setting does not establish every identity, inheritance, reduction, and launch contract.",
        "D": "Logs record observed transitions but do not establish that forbidden operations are actually denied."
      }
    }
  }
};
