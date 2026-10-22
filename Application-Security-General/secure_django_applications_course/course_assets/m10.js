window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-746b84518c",
  "questions": {
    "q01": {
      "options": {
        "A": "Secure Django design spans code, data, identity, configuration, dependencies, and operations.",
        "B": "Application security complements host and infrastructure protections rather than replacing them.",
        "C": "Maintained dependencies can be used safely through deliberate review and updates.",
        "D": "Comment formatting alone does not establish secure application behavior."
      }
    },
    "q02": {
      "options": {
        "A": "Debug mode does not automatically improve server-side resource permission checks.",
        "B": "Development diagnostics can expose private implementation and runtime configuration details.",
        "C": "Debug behavior can expose more error detail rather than prevent error handling.",
        "D": "Monitoring remains necessary regardless of the production diagnostic display mode."
      }
    },
    "q03": {
      "options": {
        "A": "Secret values can grant sensitive application or cryptographic authority.",
        "B": "Source files can contain string literals including reusable credential values.",
        "C": "Distributed source and artifact copies enlarge disclosure and complicate effective rotation.",
        "D": "Embedded credentials usually make independent replacement harder rather than easier."
      }
    },
    "q04": {
      "options": {
        "A": "Host restrictions should narrow accepted context rather than trust every host.",
        "B": "Expected-origin settings do not authenticate the requesting user or service.",
        "C": "Host validation does not require disabling encrypted transport connections.",
        "D": "Explicit expected hosts and origins constrain inappropriate request trust assumptions."
      }
    },
    "q05": {
      "options": {
        "A": "Validate each value's representation and semantic limits before sensitive operation use.",
        "B": "Presence alone does not establish a value's type, range, or permitted meaning.",
        "C": "A route name does not validate the submitted request's actual data.",
        "D": "Non-browser callers can also send invalid or unauthorized operation requests."
      }
    },
    "q06": {
      "options": {
        "A": "Django can parse a request while its resulting values remain untrusted.",
        "B": "Inputs arrive from sources outside the application's full control or assumptions.",
        "C": "Domain validity does not establish permission for a requested resource.",
        "D": "A successfully parsed request may still violate important application rules."
      }
    },
    "q07": {
      "options": {
        "A": "Identity and permission checks are distinct despite related framework integration.",
        "B": "Password verification is an authentication task rather than a resource permission decision.",
        "C": "Identify the caller and separately evaluate allowed resource actions.",
        "D": "Authentication applies to protected views, APIs, and other backend operations."
      }
    },
    "q08": {
      "options": {
        "A": "Password verifier storage is distinct from forged authenticated browser requests.",
        "B": "Indexing improves database access rather than validating browser request intent.",
        "C": "Compression changes response representation and does not prevent unwanted state changes.",
        "D": "Browsers may send existing credentials on attacker-induced state-changing requests."
      }
    },
    "q09": {
      "options": {
        "A": "Store only necessary session context to reduce sensitive retention and lifecycle complexity.",
        "B": "Larger session state can increase exposure rather than universally improve security.",
        "C": "Full user records add unnecessary sensitive copies and stale-state risks.",
        "D": "A valid session still needs current resource and action authorization."
      }
    },
    "q10": {
      "options": {
        "A": "Object naming does not establish which callers may access it.",
        "B": "Evaluate permission for the specific selected record, tenant, file, or resource.",
        "C": "Encryption does not substitute for a caller's permitted object operations.",
        "D": "A hidden template button cannot prevent direct resource requests."
      }
    },
    "q11": {
      "options": {
        "A": "Administrative pages can expose broad data access and powerful mutation actions.",
        "B": "Admin tooling still needs authentication, scoped authority, and resource policy enforcement.",
        "C": "Restrict and observe high-impact admin capabilities to limit misuse and mistakes.",
        "D": "Authorized administrators can still make errors or suffer account compromise."
      }
    },
    "q12": {
      "options": {
        "A": "Templates commonly display data received from users or external sources.",
        "B": "Output rendering does not automatically grant field-level disclosure permission.",
        "C": "Input validation remains necessary before stored or rendered data is used.",
        "D": "Unsafe rendering can reinterpret untrusted strings as executable browser markup."
      }
    },
    "q13": {
      "options": {
        "A": "Validate redirect choices so callers are not sent to untrusted destinations.",
        "B": "Redirects can influence trust and expose users to misleading destination flows.",
        "C": "Redirect validation does not replace protection of authenticated state-changing requests.",
        "D": "Client-supplied destinations need explicit scheme and target policy checks."
      }
    },
    "q14": {
      "options": {
        "A": "Suppressing database errors reduces disclosure but cannot repair unsafe query construction.",
        "B": "Safe ORM usage and bound parameters separate values from database syntax.",
        "C": "Browsers can bypass checks and cannot safely construct the server's queries.",
        "D": "Identifier length does not prevent input from changing executable SQL structure."
      }
    },
    "q15": {
      "options": {
        "A": "An extension is naming metadata rather than proof of safe content.",
        "B": "Authenticated uploads can still contain malicious or inappropriate file bytes.",
        "C": "File workflows combine untrusted names and content with complex storage and processing.",
        "D": "Upload and download permissions still require server-side resource authorization."
      }
    },
    "q16": {
      "options": {
        "A": "Built-in protections work only when used and configured appropriately.",
        "B": "Preventive controls and tests should be integrated before production deployment.",
        "C": "One package cannot establish every identity, data, and deployment security requirement.",
        "D": "Combine explicit framework controls with safe storage, tests, visibility, and deployment governance."
      }
    }
  }
};
