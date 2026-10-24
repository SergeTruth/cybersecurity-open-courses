window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8f9470c3e4",
  "questions": {
    "q01": {
      "options": {
        "A": "Injection occurs when input crosses from data into interpreted syntax or behavior at a sensitive boundary.",
        "B": "Namespace conventions organize code and do not describe untrusted data changing interpreted behavior.",
        "C": "Compiler warnings can flag many issues; injection specifically concerns control of interpreted input.",
        "D": "Backup operations copy data and do not define the injection mechanism."
      }
    },
    "q02": {
      "options": {
        "A": "C# applications can pass unsafe strings to databases, shells, templates, and other interpreters.",
        "B": "Each destination interprets different syntax, so the protection must match that destination's API and grammar.",
        "C": "An escaping rule for one grammar can leave another interpreter's control characters effective.",
        "D": "Shells, templates, directory filters, and browsers can also interpret attacker-controlled syntax."
      }
    },
    "q03": {
      "options": {
        "A": "A theme setting is not a sink unless its data reaches a security-relevant interpreter.",
        "B": "A retention label alone does not describe a point where untrusted data becomes interpreted behavior.",
        "C": "A sink is the destination where input acquires security-relevant meaning through interpretation or execution.",
        "D": "An output directory name alone does not establish that a command, parser, or other interpreter consumes input there."
      }
    },
    "q04": {
      "options": {
        "A": "Hiding errors can reduce disclosure but leaves an injected query's behavior intact.",
        "B": "Table names do not stop user-controlled values from altering string-built SQL syntax.",
        "C": "Variable-name length does not separate query syntax from parameter data.",
        "D": "Command parameters bind values separately from SQL syntax, preventing those values from becoming query structure."
      }
    },
    "q05": {
      "options": {
        "A": "Validation narrows accepted data, but parameterized construction is still needed to keep values outside SQL syntax.",
        "B": "Validation checks values; it does not automatically change how the application constructs SQL.",
        "C": "Database permissions limit impact and remain useful even when input is validated.",
        "D": "Validated text can still be inserted into an unsafe SQL context; construction must preserve the data boundary."
      }
    },
    "q06": {
      "options": {
        "A": "Raw SQL can be unsafe when values are interpolated, whereas parameterized APIs maintain a data boundary.",
        "B": "A data library cannot protect a query after application code has unsafely combined input with SQL syntax.",
        "C": "ORM applications can still expose injection through raw-query escape hatches and unsafe string construction.",
        "D": "Least privilege limits database impact regardless of whether a query is dynamic."
      }
    },
    "q07": {
      "options": {
        "A": "Directory searches process filter input, creating a boundary that needs safe construction.",
        "B": "An altered filter can change which identities or directory entries an application retrieves.",
        "C": "Unsafe filter construction lets input introduce directory-search syntax beyond the intended search value.",
        "D": "LDAP injection changes directory query interpretation rather than stylesheet behavior."
      }
    },
    "q08": {
      "options": {
        "A": "The purpose is to constrain supported query behavior, rather than deliberately reduce performance.",
        "B": "Allowed query fields do not establish the identity of the caller.",
        "C": "Logging still helps investigate query behavior and does not become unnecessary when fields are restricted.",
        "D": "An allowlist limits query structure to the fields and operations the application intentionally supports."
      }
    },
    "q09": {
      "options": {
        "A": "Unsafe process construction can let input select unintended commands, options, or operating-system behavior.",
        "B": "XML documentation does not control how a process API interprets command input.",
        "C": "A stylesheet build failure does not itself describe attacker influence over process execution.",
        "D": "Cookie lifetime is a session concern, rather than the command interpretation boundary in this question."
      }
    },
    "q10": {
      "options": {
        "A": "Concatenation can mix attacker input with shell syntax or unintended command options.",
        "B": "A fixed executable, controlled arguments, and suitable process APIs reduce opportunities to reinterpret input as commands.",
        "C": "Elevation increases the damage an injected command could cause and is not a prevention control.",
        "D": "Validation and useful logging help constrain and investigate process use; disabling them removes safeguards."
      }
    },
    "q11": {
      "options": {
        "A": "An evaluator interprets input; it does not inherently make an untrusted expression safe.",
        "B": "An evaluator can execute with the application's authority unless explicit restrictions exist.",
        "C": "Treating untrusted text as an expression can expose capabilities and program behavior beyond ordinary data processing.",
        "D": "Expression evaluation can be part of template injection rather than a defense against it."
      }
    },
    "q12": {
      "options": {
        "A": "Password hashing protects stored credentials and does not describe user influence over template evaluation.",
        "B": "Static compression changes representation, rather than executing template expressions from user input.",
        "C": "Database migrations change schema or data and are a different mechanism from template interpretation.",
        "D": "The risk arises when user input controls template syntax or expressions instead of remaining template data."
      }
    },
    "q13": {
      "options": {
        "A": "Serializer behavior can instantiate types or activate dangerous paths, so untrusted serialized input requires context-specific controls.",
        "B": "Parsing serialized data does not inherently validate its meaning, permitted types, or downstream behavior.",
        "C": "Deserialization constructs application data or objects and can affect much more than presentation.",
        "D": "Deserializing a request does not verify the caller's identity or permission."
      }
    },
    "q14": {
      "options": {
        "A": "Different grammars interpret delimiters differently, making a universal encoder unsafe.",
        "B": "Encoding must match the exact destination because HTML, scripts, URLs, and other contexts have different syntax rules.",
        "C": "Browser output also needs context-appropriate handling; database parameters address a separate interpreter.",
        "D": "Output encoding controls interpretation and does not establish the caller's identity."
      }
    },
    "q15": {
      "options": {
        "A": "Naming style alone does not reveal whether untrusted data reaches a dangerous interpreter.",
        "B": "Comments can help explain intent, but review must inspect actual data flow and API use.",
        "C": "Tracing untrusted data to sensitive sinks identifies where context-specific construction, validation, or encoding is required.",
        "D": "Colors do not establish whether command, query, parser, or output boundaries are safe."
      }
    },
    "q16": {
      "options": {
        "A": "Attackers can bypass client validation, so trusted server-side controls must enforce the boundary.",
        "B": "Universal escaping fails because each destination grammar has different interpretation rules.",
        "C": "String construction can merge untrusted data with executable syntax unless safe APIs preserve separation.",
        "D": "Context-specific construction and validation keep data separate from interpreted control, with least privilege and tests reducing remaining risk."
      }
    }
  }
};
