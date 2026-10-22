window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7342f65dc6",
  "questions": {
    "q01": {
      "options": {
        "A": "TypeScript's static checks do not automatically reject malicious HTTP requests or validate their runtime payloads.",
        "B": "Type checking does not encrypt payloads or provide runtime validation of their structure and semantics.",
        "C": "Types are erased from runtime execution, leaving external values in need of actual validation code.",
        "D": "Authorization determines permitted actions and remains separate from static type checks and input validation."
      }
    },
    "q02": {
      "options": {
        "A": "unknown preserves uncertainty and requires deliberate checks before external data can be treated as a trusted type.",
        "B": "any lets unvalidated values pass through many operations without the compiler requiring useful narrowing checks.",
        "C": "Treating every value as text can misrepresent actual data and does not establish the required domain constraints.",
        "D": "Removing runtime checks leaves the actual shape, ranges, and meaning of external values unverified."
      }
    },
    "q03": {
      "options": {
        "A": "any does not execute validation or prove that fields exist with the expected runtime types.",
        "B": "any can suppress checks that would expose invalid assumptions rather than prevent every runtime bug.",
        "C": "any provides no schema parser or semantic validation of incoming payloads.",
        "D": "Unchecked any can carry unvalidated values across boundaries and hide useful compiler warnings about their use."
      }
    },
    "q04": {
      "options": {
        "A": "A type assertion does not inspect fields or reject invalid runtime values.",
        "B": "An assertion changes the compiler's view while leaving the underlying runtime object unchanged and unvalidated.",
        "C": "Type assertions do not parse JSON or reject invalid serialization before it is read.",
        "D": "A type assertion performs no cryptographic operation and does not conceal the asserted object."
      }
    },
    "q05": {
      "options": {
        "A": "A guard executes a check and lets TypeScript narrow the value when that check succeeds.",
        "B": "Database roles govern database permissions rather than checking a runtime value for type narrowing.",
        "C": "Cookie flags control browser behavior and do not define TypeScript runtime type guards.",
        "D": "Password hashing verifies credentials and is distinct from general runtime shape checks used for narrowing."
      }
    },
    "q06": {
      "options": {
        "A": "nodemon restarts development processes and does not itself supply payload schema validation.",
        "B": "Prettier formats code and does not validate external application payloads against domain schemas.",
        "C": "Chalk styles terminal output rather than checking the structure and constraints of incoming data.",
        "D": "Zod defines runtime schemas that can parse external values and support corresponding inferred TypeScript types."
      }
    },
    "q07": {
      "options": {
        "A": "Schema-derived types still rely on executing the schema validation when untrusted data crosses the boundary.",
        "B": "Inferring types from validation schemas reduces mismatches between runtime checks and compile-time expectations.",
        "C": "Schema types do not prove that every business operation or authorization decision is correct.",
        "D": "Tests remain useful for boundary behavior, refinements, invalid cases, and how the application uses parsed results."
      }
    },
    "q08": {
      "options": {
        "A": "CSS layout affects presentation rather than consistency between data validation and application type expectations.",
        "B": "Password reset is an authentication workflow rather than divergence between schemas and type contracts.",
        "C": "Schema drift occurs when runtime rules, static types, or consuming code no longer agree about accepted data.",
        "D": "Backup formats concern stored data representation rather than mismatch between validation and application expectations."
      }
    },
    "q09": {
      "options": {
        "A": "Browsers can be controlled by the requester and do not guarantee that received requests are safe.",
        "B": "Frontend TypeScript does not force arbitrary clients to follow the backend's validation contract.",
        "C": "Server validation protects backend operations and data boundaries rather than merely changing presentation styles.",
        "D": "Attackers can modify or bypass client code and send requests directly, so the server must validate independently."
      }
    },
    "q10": {
      "options": {
        "A": "Mass assignment lets client-controlled fields populate properties that should remain under server or policy control.",
        "B": "Encryption protects confidentiality and does not describe uncontrolled assignment of request properties into privileged objects.",
        "C": "Generating types from style data is unrelated to which request fields may update protected state.",
        "D": "Route creation does not itself define or prevent copying unauthorized fields into application records."
      }
    },
    "q11": {
      "options": {
        "A": "Prototype pollution is a runtime object-handling risk rather than a normal compiler feature.",
        "B": "A secure validator may help reject dangerous structures, but it is not itself prototype pollution.",
        "C": "Unsafe handling of dynamic properties can influence inherited object behavior or values in unintended parts of the program.",
        "D": "Database query options are separate from JavaScript prototype-chain mutation caused by unsafe object operations."
      }
    },
    "q12": {
      "options": {
        "A": "Domain rules remain essential for deciding whether structurally valid input is meaningful for the requested operation.",
        "B": "Transport shape and business validity differ, so separating them clarifies which rules each boundary enforces.",
        "C": "Structural payload checks do not determine whether a subject may perform the operation on a resource.",
        "D": "Separation clarifies responsibilities but still requires careful integration and does not remove every source of complexity."
      }
    },
    "q13": {
      "options": {
        "A": "Malformed, extreme, unexpected, and type-confused inputs test rejection rules and boundary assumptions beyond successful examples.",
        "B": "Happy-path tests do not establish safe rejection of missing fields, wrong types, excessive sizes, or invalid values.",
        "C": "Screenshots cannot verify all backend parsing, semantic checks, rejection paths, or resource boundaries.",
        "D": "Negative cases are necessary to show that invalid external values cannot enter trusted application operations."
      }
    },
    "q14": {
      "options": {
        "A": "Including credentials or other secrets in validation errors creates an avoidable disclosure path.",
        "B": "Stack traces can expose implementation details and should not be returned indiscriminately to remote clients.",
        "C": "Database schema details can reveal unnecessary internals without helping clients correct ordinary payload mistakes.",
        "D": "Useful field-level guidance should help legitimate clients while minimizing sensitive values and internal implementation details."
      }
    },
    "q15": {
      "options": {
        "A": "Interfaces describe expectations but do not execute validation of incoming network values.",
        "B": "Type assertions can hide uncertainty without proving that runtime data satisfies the asserted contract.",
        "C": "Treat external values as unknown, validate and transform them, then use the trusted typed result in application logic.",
        "D": "Browser-only validation can be bypassed, so backend trust boundaries still need their own enforced checks."
      }
    }
  }
};
