window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-2b2dd17f14",
  "questions": {
    "q1": {
      "options": {
        "A": "Environment values are externally supplied inputs that can select sensitive application behavior.",
        "B": "Launchers can change environment values without changing or recompiling the application.",
        "C": "Environment settings can influence paths, libraries, credentials, and other execution decisions.",
        "D": "Successful startup does not establish the trustworthiness of inherited configuration values."
      }
    },
    "q2": {
      "options": {
        "A": "The actual environment is supplied by the launch chain rather than universally fixed defaults.",
        "B": "Launch context supplies inputs before startup, when sensitive initialization decisions may occur.",
        "C": "Parents and deployment systems determine inherited values before application validation runs.",
        "D": "Service managers and shell launch settings can change a child's environment independently of source."
      }
    },
    "q3": {
      "options": {
        "A": "Missing-value and invalid-value behavior still need explicit documentation in the centralized policy.",
        "B": "Centralization does not create operating-system confidentiality for environment values.",
        "C": "Repeated reads do not validate syntax, type, range, or semantic meaning.",
        "D": "One reviewed schema keeps parsing, defaults, and rejection behavior consistent across consumers."
      }
    },
    "q4": {
      "options": {
        "A": "Owning a copy solves storage lifetime but does not establish input trust.",
        "B": "Copying avoids retaining runtime-owned storage that later environment operations may invalidate.",
        "C": "An owned string can still contain malformed or policy-violating configuration text.",
        "D": "getenv storage is runtime-managed and must not be treated as caller-owned writable memory."
      }
    },
    "q5": {
      "options": {
        "A": "Prefix parsing can leave unconsumed garbage that changes the intended setting interpretation.",
        "B": "Exact conversion checks the complete representation before producing an allowed typed value.",
        "C": "Deployment manifests can still carry incorrect or externally influenced values requiring validation.",
        "D": "Short text can still be negative, malformed, or out of the destination's range."
      }
    },
    "q6": {
      "options": {
        "A": "Avoiding startup errors does not justify accepting an insecure configuration mode.",
        "B": "Missing configuration must not silently broaden permissions or disable security controls.",
        "C": "Forwarding malformed values postpones validation and allows inconsistent subsystem interpretations.",
        "D": "Define a secure fallback or explicit rejection for missing and invalid settings."
      }
    },
    "q7": {
      "options": {
        "A": "Inheritance and diagnostics can expose environment secrets beyond their intended consumers.",
        "B": "Environment storage does not automatically encrypt values throughout a process's lifetime.",
        "C": "A variable's name does not protect its value from disclosure.",
        "D": "Crash reporting and process inspection can expose environment credentials under applicable access permissions."
      }
    },
    "q8": {
      "options": {
        "A": "Many variables besides PATH can influence loaders, runtimes, and executable behavior.",
        "B": "Behavioral influence does not require shell metacharacters or shell execution.",
        "C": "Inherited runtime configuration can cross privilege boundaries and must follow a reviewed policy.",
        "D": "Privilege changes do not universally validate every inherited application-specific environment value."
      }
    },
    "q9": {
      "options": {
        "A": "Shell quoting does not validate environment policy or eliminate executable selection risks.",
        "B": "Passing every parent variable propagates unintended credentials and runtime configuration to children.",
        "C": "Sanitization after launch is too late for loader and early runtime decisions.",
        "D": "An explicit environment allowlist and structured launch reduce inherited and command-construction surprises."
      }
    },
    "q10": {
      "options": {
        "A": "One local execution cannot establish behavior under every operating system or service launcher.",
        "B": "Casing, inheritance, size limits, and deployment injection differ across supported environments.",
        "C": "std::string stores text without validating platform-specific environment behavior or security policy.",
        "D": "Deployment configuration can change both availability and the meaning of application settings."
      }
    }
  }
};
