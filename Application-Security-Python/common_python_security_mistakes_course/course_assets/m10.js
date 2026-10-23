window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a1e7b99f02",
  "questions": {
    "q01": {
      "options": {
        "A": "Boundaries affect actual data and identity handling, not merely diagrams.",
        "B": "Trust assumptions can change when data, identities, or permissions cross boundaries.",
        "C": "Python does not automatically validate every value entering a trust boundary.",
        "D": "Code review remains necessary to identify unsafe assumptions at those boundaries."
      }
    },
    "q02": {
      "options": {
        "A": "Existence alone does not establish acceptable content or business meaning.",
        "B": "Function name length does not validate the supplied input value.",
        "C": "Browser origin alone does not establish safe request content or permissions.",
        "D": "Validate type, structure, bounds, format, and the intended business operation."
      }
    },
    "q03": {
      "options": {
        "A": "Unsafe SQL construction can interpret untrusted values as executable query syntax.",
        "B": "Readability does not resolve injection risks from mixing values with instructions.",
        "C": "Database access still needs appropriate permissions regardless of query construction.",
        "D": "String concatenation does not automatically create database parameter bindings."
      }
    },
    "q04": {
      "options": {
        "A": "Hiding error messages does not prevent unsafe SQL from executing.",
        "B": "Longer identifiers do not stop untrusted input becoming query syntax.",
        "C": "Parameters and safe ORM operations separate data values from query instructions.",
        "D": "Client validation can be bypassed before a request reaches the server."
      }
    },
    "q05": {
      "options": {
        "A": "Eval and exec interpret code rather than inherently sanitize input values.",
        "B": "Code evaluation does not enforce resource access rights for the caller.",
        "C": "These functions can execute Python supplied as a string by an attacker.",
        "D": "Evaluating untrusted text can create injection rather than prevent it."
      }
    },
    "q06": {
      "options": {
        "A": "Using an appropriate library can avoid unnecessary shell interpretation risks.",
        "B": "Combining untrusted input with shell syntax can enable unintended command execution.",
        "C": "Controlled argument lists help preserve data boundaries when calling external programs.",
        "D": "Bounded status logs can support troubleshooting without exposing sensitive command data."
      }
    },
    "q07": {
      "options": {
        "A": "Object naming consistency does not enforce permission to read or modify records.",
        "B": "Encryption in memory does not decide whether this caller can access the resource.",
        "C": "Hidden controls cannot replace server checks against direct API requests.",
        "D": "Object authorization checks access to each requested record, file, tenant, or resource."
      }
    },
    "q08": {
      "options": {
        "A": "Server checks remain necessary because an attacker can bypass or modify clients.",
        "B": "Performance advantages do not establish enforceable access restrictions at the backend.",
        "C": "Frontend checks do not eliminate protected APIs or their security obligations.",
        "D": "Client restrictions cannot guarantee prevention of direct request abuse."
      }
    },
    "q09": {
      "options": {
        "A": "Hardcoded credentials can persist in repositories, images, logs, and copied artifacts.",
        "B": "String literals containing credentials are not automatically encrypted by Python.",
        "C": "Distributed embedded values make complete credential rotation more difficult.",
        "D": "Secrets can grant access and require controlled storage and use."
      }
    },
    "q10": {
      "options": {
        "A": "Production debug risk concerns exposed internal behavior rather than source readability.",
        "B": "Debug mode does not automatically enforce stronger resource access policies.",
        "C": "Development diagnostics can reveal internal state or enable unsafe production behavior.",
        "D": "Debug logging can disclose sensitive details rather than inherently suppress logs."
      }
    },
    "q11": {
      "options": {
        "A": "Packages execute code and can change the application's runtime behavior.",
        "B": "Dependencies can introduce vulnerable, malicious, stale, or unexpectedly changed components.",
        "C": "Third party code is not automatically safer than maintained application code.",
        "D": "Dependency use still requires compatibility and security testing of the resulting application."
      }
    },
    "q12": {
      "options": {
        "A": "Pickle can reconstruct Python objects rather than operate as plain safe text.",
        "B": "Unpickling attacker controlled data can execute unsafe reconstruction behavior.",
        "C": "Serialization does not verify the identity or permissions of the source.",
        "D": "Untrusted serialized objects can trigger dangerous behavior during loading."
      }
    },
    "q13": {
      "options": {
        "A": "Size limits constrain resource consumption and are an appropriate upload safeguard.",
        "B": "Separating upload storage from executable paths limits unintended execution opportunities.",
        "C": "Downstream parsers and processors need review for handling attacker controlled content.",
        "D": "Names, MIME claims, paths, and content require validation and handling controls."
      }
    },
    "q14": {
      "options": {
        "A": "Exclude unnecessary credentials, tokens, personal information, and regulated data from logs.",
        "B": "Non sensitive correlation identifiers help connect events without disclosing credentials.",
        "C": "Timestamps provide useful operational sequence information when logged appropriately.",
        "D": "Bounded error categories support troubleshooting while limiting disclosure of internal details."
      }
    },
    "q15": {
      "options": {
        "A": "Negative tests examine rejected and abnormal inputs rather than only easy successes.",
        "B": "Review and tests complement each other in identifying security defects.",
        "C": "Test invalid, unauthorized, unexpected, and boundary inputs to verify safe behavior.",
        "D": "Passing selected tests cannot prove every possible vulnerability is absent."
      }
    },
    "q16": {
      "options": {
        "A": "Default language behavior does not enforce every application security boundary.",
        "B": "Misplaced trust, weak permissions, exposed secrets, unsafe parsing, and dependency gaps create common risks.",
        "C": "Background jobs, scripts, services, and data tools can also have security weaknesses.",
        "D": "Scanner results need developer interpretation and cannot replace design judgment."
      }
    }
  }
};
