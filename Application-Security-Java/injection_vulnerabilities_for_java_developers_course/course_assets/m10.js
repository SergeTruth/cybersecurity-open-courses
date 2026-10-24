window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-fe6c63465e",
  "questions": {
    "q01": {
      "options": {
        "A": "Injection occurs when input crosses from data into interpreted syntax or behavior at a sensitive boundary.",
        "B": "Java package names organize code; injection concerns untrusted data changing an interpreter's behavior.",
        "C": "Compiler warnings can flag many issues; injection specifically concerns control of interpreted input.",
        "D": "Backup operations copy data and do not define the injection mechanism."
      }
    },
    "q02": {
      "options": {
        "A": "Comments are not the only input source; runtime requests and integration data can cross trust boundaries.",
        "B": "Compiled constants omit the external runtime data that applications receive and must validate.",
        "C": "Requests, messages, imports, configuration, and API responses can all introduce data outside the application's trust assumptions.",
        "D": "A variable's local scope does not determine whether its value originated from an untrusted source."
      }
    },
    "q03": {
      "options": {
        "A": "A color setting alone does not describe where untrusted data becomes interpreted syntax.",
        "B": "A sensitive sink is where data is interpreted or executed with security consequences, requiring controls suited to that destination.",
        "C": "A build folder alone does not identify a security-relevant command, parser, or interpreter consuming input.",
        "D": "Naming style organizes source code and does not establish an interpretation boundary."
      }
    },
    "q04": {
      "options": {
        "A": "Hiding errors can reduce disclosure but leaves an injected query's behavior intact.",
        "B": "Table names do not stop user-controlled values from altering string-built SQL syntax.",
        "C": "Variable-name length does not separate query syntax from parameter data.",
        "D": "Prepared statements bind values separately from SQL structure, so parameter data cannot become SQL syntax."
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
        "B": "ORM applications can still expose injection through raw-query escape hatches and unsafe string construction.",
        "C": "Least privilege limits database impact regardless of whether a query is dynamic.",
        "D": "A data library cannot protect a query after application code has unsafely combined input with SQL syntax."
      }
    },
    "q07": {
      "options": {
        "A": "Directory searches process filter input, creating a boundary that needs safe construction.",
        "B": "Unsafe filter construction lets input introduce directory-search syntax beyond the intended search value.",
        "C": "LDAP injection changes directory query interpretation rather than stylesheet behavior.",
        "D": "An altered filter can change which identities or directory entries an application retrieves."
      }
    },
    "q08": {
      "options": {
        "A": "Allowed query fields do not establish the identity of the caller.",
        "B": "Logging still helps investigate query behavior and does not become unnecessary when fields are restricted.",
        "C": "An allowlist limits query structure to the fields and operations the application intentionally supports.",
        "D": "The purpose is to constrain supported query behavior, rather than deliberately reduce performance."
      }
    },
    "q09": {
      "options": {
        "A": "XML documentation does not control how a process API interprets command input.",
        "B": "A stylesheet build failure does not itself describe attacker influence over process execution.",
        "C": "Cookie lifetime is a session concern, rather than the command interpretation boundary in this question.",
        "D": "Unsafe process construction can let input select unintended commands, options, or operating-system behavior."
      }
    },
    "q10": {
      "options": {
        "A": "A fixed executable, controlled arguments, and suitable process APIs reduce opportunities to reinterpret input as commands.",
        "B": "Concatenation can mix attacker input with shell syntax or unintended command options.",
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
        "B": "The risk arises when user input controls template syntax or expressions instead of remaining template data.",
        "C": "Database migrations change schema or data and are a different mechanism from template interpretation.",
        "D": "Static compression changes representation, rather than executing template expressions from user input."
      }
    },
    "q13": {
      "options": {
        "A": "Password storage protects credentials; XSS concerns untrusted content interpreted in a browser.",
        "B": "Backup scheduling does not describe the browser execution boundary exploited by XSS.",
        "C": "Routing moves network traffic, while XSS changes how a browser interprets application output.",
        "D": "XSS occurs when browser output treats untrusted content as executable script or unsafe markup instead of inert data."
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
        "A": "Tracing untrusted data to sensitive sinks identifies where context-specific construction, validation, or encoding is required.",
        "B": "Naming style alone does not reveal whether untrusted data reaches a dangerous interpreter.",
        "C": "Comments can help explain intent, but review must inspect actual data flow and API use.",
        "D": "Colors do not establish whether command, query, parser, or output boundaries are safe."
      }
    },
    "q16": {
      "options": {
        "A": "Attackers can bypass client validation, so trusted server-side controls must enforce the boundary.",
        "B": "Universal escaping fails because each destination grammar has different interpretation rules.",
        "C": "Context-specific construction and validation keep data separate from interpreted control, with least privilege and tests reducing remaining risk.",
        "D": "String construction can merge untrusted data with executable syntax unless safe APIs preserve separation."
      }
    }
  }
};
