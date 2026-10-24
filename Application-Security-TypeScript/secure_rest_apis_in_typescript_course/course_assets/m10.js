window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3e22ac533b",
  "questions": {
    "q01": {
      "options": {
        "A": "TypeScript's compile-time checks do not validate arbitrary runtime requests or enforce all security policy.",
        "B": "Every transition between clients, services, and data operations can change which input and authority assumptions are safe.",
        "C": "Useful logging supports operations; explicit trust boundaries determine what to validate and what information is safe to record.",
        "D": "Route contracts define expected input and behavior and help make trust-boundary enforcement reviewable."
      }
    },
    "q02": {
      "options": {
        "A": "A declared interface does not inspect bytes arriving over HTTP; runtime validation must establish their actual shape and constraints.",
        "B": "Interfaces are a TypeScript capability, but declaring one does not validate external values.",
        "C": "Typed function declarations help compile-time checking and do not guarantee that unchecked external input matches them.",
        "D": "Strict compiler settings improve static checks while leaving runtime input validation necessary."
      }
    },
    "q03": {
      "options": {
        "A": "Validation constrains accepted input and does not require exposing a route publicly.",
        "B": "A valid request can still come from a caller without permission to perform the action.",
        "C": "Logging complete bodies can disclose sensitive data and does not establish their validity.",
        "D": "Runtime checks establish expected structure, limits, and domain constraints before external values drive business behavior."
      }
    },
    "q04": {
      "options": {
        "A": "The controls answer different questions: who the caller is and what that caller may do.",
        "B": "Proving identity is authentication; authorization evaluates permission for the requested action and resource.",
        "C": "Identity verification supplies context, while authorization applies permissions to the particular operation.",
        "D": "A logged-in caller can still lack access to a particular object or tenant."
      }
    },
    "q05": {
      "options": {
        "A": "Route-level access does not imply permission for every resource identifier accepted by that route.",
        "B": "Roles supplied by a client are untrusted claims until established by trusted server-side identity and policy.",
        "C": "Permission checks and input validation address different risks and both remain necessary.",
        "D": "Private and authenticated APIs also need checks preventing access to other users' or tenants' resources."
      }
    },
    "q06": {
      "options": {
        "A": "Internal records can contain secret, private, or implementation-only fields that clients should not receive.",
        "B": "Stack traces can disclose internals and sensitive details; client errors should expose appropriate information.",
        "C": "Even authenticated clients can cause excessive data retrieval, so response and pagination limits still matter.",
        "D": "Explicit response models control the fields exposed at the API boundary instead of serializing internal objects indiscriminately."
      }
    },
    "q07": {
      "options": {
        "A": "Logs should support investigation with useful, appropriately redacted context rather than avoid all evidence.",
        "B": "Verbose error and log content can create additional disclosure paths for credentials, personal data, or application internals.",
        "C": "Silent failures hinder diagnosis; safe reporting can preserve useful context without exposing secrets.",
        "D": "Logged secrets can remain accessible long after the request and widen the effect of a leak."
      }
    },
    "q08": {
      "options": {
        "A": "CORS controls browser cross-origin behavior and does not authenticate or authorize API callers.",
        "B": "Broad permissions can expose browser-accessible API behavior to origins the application did not intend to support.",
        "C": "An intentional origin, method, and header policy limits browser cross-origin access to the intended integration needs.",
        "D": "TypeScript types do not configure the browser and server headers that implement CORS."
      }
    },
    "q09": {
      "options": {
        "A": "Rate and size limits bound consumption and help protect availability under unexpected or abusive request patterns.",
        "B": "Resource limits constrain load but do not establish identity or permission.",
        "C": "Dynamic APIs also consume CPU, memory, database connections, and downstream capacity that need limits.",
        "D": "A small or infrequent request can still contain invalid or dangerous input, so validation remains necessary."
      }
    },
    "q10": {
      "options": {
        "A": "Routes, dependencies, and deployment conditions change after release, so a single early review becomes stale.",
        "B": "Clients can bypass their own checks; trusted server-side enforcement remains necessary.",
        "C": "Rejected-request tests check that security boundaries actually deny invalid or unauthorized behavior.",
        "D": "Repeated engineering and operational checks keep validation and access policy enforced as the API evolves."
      }
    }
  }
};
