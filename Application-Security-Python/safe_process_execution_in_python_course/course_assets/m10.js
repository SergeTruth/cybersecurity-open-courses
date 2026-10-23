window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a425add4d1",
  "questions": {
    "q01": {
      "options": {
        "A": "Safe execution constrains programs, arguments, privileges, resources, and process lifecycle.",
        "B": "Shell escaping alone leaves privileges and resource consumption uncontrolled.",
        "C": "Fixed working directories do not constrain arbitrary executable behavior.",
        "D": "Portable escaping cannot replace command selection and lifecycle protections."
      }
    },
    "q02": {
      "options": {
        "A": "Children have separate execution behavior and inherit relevant operating permissions.",
        "B": "Directly launched programs can access files without shell interpretation.",
        "C": "Shell use is not required for child filesystem access.",
        "D": "Process creation exposes operating system, environment, filesystem, and privilege boundaries."
      }
    },
    "q03": {
      "options": {
        "A": "Quoting semantics vary across shells, programs, and operating systems.",
        "B": "Python does not automatically recover safe arguments from interpolated commands.",
        "C": "One quoting approach cannot safely cover every shell context.",
        "D": "Interpolated input may become executable command or shell syntax."
      }
    },
    "q04": {
      "options": {
        "A": "Replacing semicolons misses other syntax and argument injection risks.",
        "B": "Shell quoting is platform dependent and leaves other execution risks.",
        "C": "Structured arguments reduce shell interpretation while preserving clear command boundaries.",
        "D": "Direct argument vectors usually avoid unnecessary shell parsing behavior."
      }
    },
    "q05": {
      "options": {
        "A": "Allowlisting deliberately limits supported operations to reviewed application needs.",
        "B": "Directory membership does not prove an executable is appropriate.",
        "C": "User supplied commands remain untrusted despite matching help text.",
        "D": "System executable availability does not authorize every application operation."
      }
    },
    "q06": {
      "options": {
        "A": "Operation mapping controls supported behavior rather than encrypting commands.",
        "B": "Internal names do not establish the caller's execution permissions.",
        "C": "Mapping limits callers to approved programs and supported command structures.",
        "D": "Endpoints still need authorization for their approved process operations."
      }
    },
    "q07": {
      "options": {
        "A": "Child programs may follow links or overwrite existing filesystem objects.",
        "B": "A fixed program may still process malicious caller chosen paths.",
        "C": "Executable selection does not validate every file argument automatically.",
        "D": "Child file arguments can expose or modify sensitive filesystem objects."
      }
    },
    "q08": {
      "options": {
        "A": "Textual prefixes can match sibling paths outside approved storage.",
        "B": "Resolved containment checks constrain access to the intended storage boundary.",
        "C": "Supported extensions do not prove the path remains contained.",
        "D": "Matching extensions cannot establish resolved directory membership or permission."
      }
    },
    "q09": {
      "options": {
        "A": "Full inheritance can unnecessarily expose secrets and alter child behavior.",
        "B": "Renamed variables still carry their sensitive values into children.",
        "C": "Pass only required variables and omit unrelated secrets or controls.",
        "D": "Variable names do not prevent children reading inherited secret values."
      }
    },
    "q10": {
      "options": {
        "A": "Command arguments may be exposed through diagnostics and process inspection.",
        "B": "Subprocess does not encrypt arguments against local process inspection.",
        "C": "Direct calls can still expose arguments in process listings.",
        "D": "Direct launch does not make command arguments private by default."
      }
    },
    "q11": {
      "options": {
        "A": "Administrator children can cause broader damage when compromised or misused.",
        "B": "Parent privileges may exceed the child's specific operational requirements.",
        "C": "Limit child permissions to those required for the approved task.",
        "D": "Avoiding permission errors does not justify unnecessary administrative execution privileges."
      }
    },
    "q12": {
      "options": {
        "A": "Timeouts bound execution duration and help control resource consumption.",
        "B": "Descendant cleanup requires deliberate platform appropriate process lifecycle handling.",
        "C": "Output can grow excessively before a timeout ever expires.",
        "D": "Direct child termination does not universally stop every descendant process."
      }
    },
    "q13": {
      "options": {
        "A": "Unlimited capture can exhaust memory or retain sensitive child output.",
        "B": "Diagnostic streams can contain secrets and excessive amounts of data.",
        "C": "Standard error is not guaranteed safe or bounded by programs.",
        "D": "Bound output volume and protect potentially sensitive captured contents."
      }
    },
    "q14": {
      "options": {
        "A": "Log controlled metadata while excluding secrets and private process data.",
        "B": "Stable names and safe result identifiers support useful operational diagnostics.",
        "C": "Internal stderr can still expose credentials or private application content.",
        "D": "Complete environments and arguments can contain secrets unsuitable for logs."
      }
    },
    "q15": {
      "options": {
        "A": "One successful argument misses hostile input and lifecycle failure cases.",
        "B": "Shell behavior varies across supported platforms and execution contexts.",
        "C": "Exercise rejected inputs, limits, permissions, cleanup, and safe diagnostic behavior.",
        "D": "Success and one error do not exercise the full boundary."
      }
    },
    "q16": {
      "options": {
        "A": "Argument arrays reduce shell parsing but leave other execution risks.",
        "B": "Privileges and inherited credentials remain relevant without shell interpretation.",
        "C": "Constrain structure, permissions, resources, state, and termination throughout execution.",
        "D": "Child option parsing and filesystem races require additional explicit controls."
      }
    }
  }
};
