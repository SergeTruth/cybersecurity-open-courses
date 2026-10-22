window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d5b63e9c0b",
  "questions": {
    "q01": {
      "options": {
        "A": "Routes accept external values and may exercise protected data and state-changing authority.",
        "B": "API endpoints can expose confidential records and sensitive business capabilities.",
        "C": "Go parsing and typing do not enforce every accepted request contract.",
        "D": "Each exposed capability still needs appropriate caller and resource authorization."
      }
    },
    "q02": {
      "options": {
        "A": "Bound parsing and validate fields before request values become trusted application state.",
        "B": "A populated struct can contain invalid values or unauthorized property assignments.",
        "C": "Content expectations and size limits help prevent ambiguous or resource-intensive parsing.",
        "D": "Validation after persistence may allow side effects before rejection occurs."
      }
    },
    "q03": {
      "options": {
        "A": "Separate responsibilities make input, authority, operation effects, and outputs easier to inspect.",
        "B": "Hidden assumptions obscure required checks and make targeted tests harder to design.",
        "C": "Method policy still needs enforcement through routing or explicit validated handler behavior.",
        "D": "Internal exceptions can expose implementation detail inappropriate for API callers."
      }
    },
    "q04": {
      "options": {
        "A": "Shared identity context still needs resource, tenant, action, and workflow-specific permission evaluation.",
        "B": "Middleware cannot universally infer ownership and permitted actions for every requested object.",
        "C": "Client route guards can be bypassed and do not replace server enforcement.",
        "D": "Authentication identifies the caller without granting universal authority over all resources."
      }
    },
    "q05": {
      "options": {
        "A": "Bind data safely and return only fields appropriate to the caller's authorized task.",
        "B": "Persistence entities can expose internal fields beyond the intended response contract.",
        "C": "Credentials should stay out of API responses and diagnostic payloads.",
        "D": "Input values must not become executable query or shell command syntax."
      }
    },
    "q06": {
      "options": {
        "A": "Give controlled failure guidance while keeping confidential internal detail in protected diagnostics.",
        "B": "Raw errors can disclose implementation details and secret-bearing infrastructure settings.",
        "C": "Reporting success after failed operations hides unmet requirements and incorrect state.",
        "D": "Reusable tokens must not be copied into routine troubleshooting logs."
      }
    },
    "q07": {
      "options": {
        "A": "Shared retained diagnostics can disclose credentials and private payload data without careful filtering.",
        "B": "Request and error logs can contain highly sensitive application values.",
        "C": "Diagnostic content and readership are part of the application's security exposure.",
        "D": "Recording activity complements rather than replaces resource-level permission enforcement."
      }
    },
    "q08": {
      "options": {
        "A": "Limit accepted work and duration while giving operations clear cancellation and cleanup ownership.",
        "B": "Indefinite waits retain shared resources after useful processing may have ended.",
        "C": "Unowned goroutines can survive requests without a reliable cleanup path.",
        "D": "Unlimited bodies can consume excessive memory, parser work, and downstream capacity."
      }
    },
    "q09": {
      "options": {
        "A": "Exercise both allowed behavior and rejection at validation, identity, ownership, and failure boundaries.",
        "B": "Happy-path requests do not establish safe handling of unauthorized or malformed calls.",
        "C": "Server startup does not verify each endpoint's permission and input contract.",
        "D": "Negative tests provide important evidence of safe denial and failure behavior."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate validated requests, trusted permissions, narrow outputs, resource budgets, and governed delivery.",
        "B": "Client fields remain untrusted until their intended server-side contract is checked.",
        "C": "Internal models can contain confidential or privileged fields inappropriate for every caller.",
        "D": "Dependencies and builds affect the trusted code and configuration of the deployed API."
      }
    }
  }
};
