window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b104d40f9e",
  "questions": {
    "q1": {
      "options": {
        "A": "Safe Rust can still implement incorrect authorization and workflow decisions.",
        "B": "Memory safety does not establish web permissions, valid input, or resource budgets.",
        "C": "Framework defaults cannot guarantee safe application behavior in every deployment.",
        "D": "Type and memory guarantees do not eliminate all web security threats."
      }
    },
    "q2": {
      "options": {
        "A": "Route names do not determine the correctness of database indexes.",
        "B": "Routing defines exposed capabilities and therefore affects security as well as performance.",
        "C": "Review routes to identify intended public, internal, authenticated, and administrative operations.",
        "D": "A route map documents exposure but does not enforce every access decision."
      }
    },
    "q3": {
      "options": {
        "A": "Parsing yields structured values while validation checks their permitted application meaning.",
        "B": "Extracting a tenant value does not prove the caller owns that tenant.",
        "C": "Input extraction does not decide authorization or merely control response formatting.",
        "D": "Request extraction precedes use and is not limited to response generation."
      }
    },
    "q4": {
      "options": {
        "A": "Bounded bodies can still request unauthorized operations on exposed routes.",
        "B": "Body size does not establish permission to submit particular JSON fields.",
        "C": "Limited payloads still need semantic and structural validation before sensitive use.",
        "D": "Reject excessive bodies before they impose unbounded parsing and memory costs."
      }
    },
    "q5": {
      "options": {
        "A": "Authentication can establish user or workload identity for protected APIs.",
        "B": "Authorize the authenticated caller for the requested action and specific resource.",
        "C": "Identity alone does not justify granting every user administrative authority.",
        "D": "Identity checks should precede protected mutations rather than follow completed changes."
      }
    },
    "q6": {
      "options": {
        "A": "Safe correction guidance can help callers without exposing confidential implementation detail.",
        "B": "A nonsecret correlation reference can connect callers with controlled diagnostic evidence.",
        "C": "Public errors should exclude access credentials and unnecessary internal infrastructure details.",
        "D": "Stable status and response contracts support predictable client failure handling."
      }
    },
    "q7": {
      "options": {
        "A": "Layer composition affects requests regardless of the selected build optimization mode.",
        "B": "Middleware scope changes actual protected routes rather than source formatting.",
        "C": "Verify each required route receives its intended layer and policy behavior.",
        "D": "Router composition can apply different layers to different route groups."
      }
    },
    "q8": {
      "options": {
        "A": "CORS origin policy does not authenticate users or authorize API resources.",
        "B": "Non-browser callers are not governed by browser-origin response enforcement.",
        "C": "CORS settings do not validate every request body's business meaning.",
        "D": "Permit browser origins deliberately according to intended application access requirements."
      }
    },
    "q9": {
      "options": {
        "A": "Async services still need bounded work, connection use, and operation deadlines.",
        "B": "Runtime scheduling cannot infer every application's acceptable resource or business budget.",
        "C": "Servers need resource controls just as operational command-line tools do.",
        "D": "Tasks consume memory, connections, CPU, and other finite shared resources."
      }
    },
    "q10": {
      "options": {
        "A": "Detailed internal diagnostics can disclose sensitive information in public responses.",
        "B": "Structured tracing should preserve useful context while excluding reusable credentials and private data.",
        "C": "Full tokens and cookies create additional account-access exposure in logs.",
        "D": "Removing every log also removes useful detection and investigation evidence."
      }
    },
    "q11": {
      "options": {
        "A": "Feature selection can enable additional executable behavior and trusted dependencies.",
        "B": "Dependency review should precede deployment rather than wait for an incident.",
        "C": "Review added code and features because they change parsing, policy, and runtime assumptions.",
        "D": "Rust dependencies can still contain logic, access-control, and operational vulnerabilities."
      }
    },
    "q12": {
      "options": {
        "A": "Client-side checks can be bypassed and cannot enforce server authority.",
        "B": "Memory safety complements rather than replaces operational monitoring and policy checks.",
        "C": "Even a small route set needs clear resource and action authorization.",
        "D": "Define the service contract and coordinate data, authority, failure, resource, and diagnostic safeguards."
      }
    }
  }
};
