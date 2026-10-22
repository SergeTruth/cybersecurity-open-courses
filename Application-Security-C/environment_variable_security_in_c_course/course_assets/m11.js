window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c7e0ec6db4",
  "questions": {
    "q1": {
      "options": {
        "A": "Process startup does not authenticate configuration inherited from an uncontrolled launcher.",
        "B": "Inherited strings can redirect parsing, paths, loading, features, and child behavior and therefore need a defined input policy.",
        "C": "Environment-driven settings can affect sensitive behavior without an additional command-line option.",
        "D": "Environment state can change and its source and lifetime require explicit assumptions."
      }
    },
    "q2": {
      "options": {
        "A": "A non-null getenv result does not guarantee that retaining it remains valid after environment changes.",
        "B": "The returned storage is not a scratch buffer for in-place parsing or normalization.",
        "C": "Handle absence and lifetime deliberately, and validate the value's complete type and meaning before sensitive use.",
        "D": "A generic length limit does not establish valid numbers, modes, lists, or paths."
      }
    },
    "q3": {
      "options": {
        "A": "Lower-trust launch settings can influence code that executes with broader file, process, or service authority.",
        "B": "Sanitization behavior differs across platforms and launch paths and cannot be assumed universal.",
        "C": "Locale, loader, feature, and application settings can affect privileged behavior as well as PATH.",
        "D": "Documentation does not make malformed security-critical values safe to accept."
      }
    },
    "q4": {
      "options": {
        "A": "A single pattern cannot generally enforce the semantics of every configuration type.",
        "B": "A present value can still be malformed, unsafe, or unauthorized for the deployment.",
        "C": "Type-specific parsing establishes complete representation, permitted values, and relevant range or resource constraints.",
        "D": "Ignoring trailing characters can hide invalid units, modes, or unsupported annotations."
      }
    },
    "q5": {
      "options": {
        "A": "Sanitizing PATH does not alone prove the selected file has trusted ownership and contents.",
        "B": "Explicit trusted locations reduce ambiguity from launcher-dependent search state, while executable identity and directory trust still need checks.",
        "C": "An allowed basename can still resolve to an unintended executable in the current search path.",
        "D": "A previously resolved path can be replaced unless relevant filesystem and lifecycle assumptions remain protected."
      }
    },
    "q6": {
      "options": {
        "A": "Trusted children and intentional-log policy do not cover every diagnostic, inspection, or accidental disclosure path.",
        "B": "Getenv does not erase the value from the process or its retained copies after returning.",
        "C": "Delivery through environment state can expose values through inheritance and operational tooling unless suitable controls prevent it.",
        "D": "Hiding a variable's name does not redact its secret-bearing contents."
      }
    },
    "q7": {
      "options": {
        "A": "A denylist can miss unknown or newly significant variables retained from the parent.",
        "B": "A child or its dependencies may consume variables outside one document's listed settings.",
        "C": "A trusted executable can still behave unsafely under unexpected inherited configuration.",
        "D": "An explicit minimal environment limits the inherited settings that can influence the child's behavior."
      }
    },
    "q8": {
      "options": {
        "A": "Deployment variability alone does not establish suitable storage for sensitive or audited values.",
        "B": "File permissions do not automatically implement key rotation, approval, versioning, or complete lifecycle handling.",
        "C": "Convenience should not precede the security and operational properties required for the value.",
        "D": "The mechanism should match the data's sensitivity, required change process, access evidence, and lifecycle needs."
      }
    },
    "q9": {
      "options": {
        "A": "Environment dumps can expose credentials and internal deployment details beyond their intended audience and retention.",
        "B": "Debug output can be enabled, retained, or exported and still needs sensitive-data controls.",
        "C": "Low-entropy values can be guessed against stable hashes, so hashing is not universally safe redaction.",
        "D": "Names are imperfect indicators; sensitivity depends on actual content and intended use."
      }
    },
    "q10": {
      "options": {
        "A": "Documented allowlists need implementation that deliberately handles unsupported or unexpected inputs.",
        "B": "A shared contract and tests keep accepted values, fallback behavior, sensitivity, and deployment assumptions inspectable.",
        "C": "Invalid, missing, and adversarial launch values exercise paths that valid settings cannot cover.",
        "D": "Operational protection does not justify unvalidated consumption or unnecessary secret logging in code."
      }
    }
  }
};
