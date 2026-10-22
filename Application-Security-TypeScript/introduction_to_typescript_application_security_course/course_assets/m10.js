window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e90a041a56",
  "questions": {
    "q01": {
      "options": {
        "A": "Static types do not validate runtime inputs or enforce every security boundary, so explicit secure handling remains necessary.",
        "B": "TypeScript does not automatically prevent unsafe browser sinks, untrusted markup, or every other browser security flaw.",
        "C": "Authorization expresses application permissions and must be enforced by trusted runtime code.",
        "D": "Package trust, vulnerabilities, build scripts, and maintenance practices still require dependency review."
      }
    },
    "q02": {
      "options": {
        "A": "Parsing and validation turn untrusted request values into an internal representation whose required properties have been checked.",
        "B": "A cast changes compiler treatment without inspecting the actual request body's fields or values.",
        "C": "Frontend validation can be bypassed by modified clients or direct requests to the API.",
        "D": "Storing unchecked input can persist invalid or sensitive state before the application establishes its acceptability."
      }
    },
    "q03": {
      "options": {
        "A": "Unchecked assertions and any can hide uncertainty and suppress static checks that would otherwise expose unsafe assumptions.",
        "B": "Weakening static checks does not perform runtime validation or automatically improve security.",
        "C": "Neither any nor a type assertion checks whether third-party values satisfy the expected runtime contract.",
        "D": "Authorization requires trusted policy checks rather than a permissive type or asserted interface."
      }
    },
    "q04": {
      "options": {
        "A": "Validation needs domain meaning, allowed ranges, consistency, and suitability for the requested user and action.",
        "B": "Existing property names do not establish valid types, acceptable values, business meaning, or permissions.",
        "C": "Successful compilation does not inspect the actual external values received by the running service.",
        "D": "UI acceptance cannot establish validity because clients can be modified or bypassed."
      }
    },
    "q05": {
      "options": {
        "A": "The server must enforce permissions at sensitive operations because browser-side checks are outside its trust boundary.",
        "B": "Client route guards can be bypassed and do not protect backend operations from arbitrary requests.",
        "C": "Hidden controls improve presentation but do not stop clients from invoking the protected API directly.",
        "D": "Browser code is controlled by the client and cannot be the sole authority protecting backend data."
      }
    },
    "q06": {
      "options": {
        "A": "Controlled errors should preserve valid application state and provide useful guidance without leaking secrets or excessive internals.",
        "B": "Public stack traces can disclose source structure, paths, configuration, and other unnecessary implementation details.",
        "C": "Ignoring invalid input allows unverified values into operations that rely on trusted assumptions.",
        "D": "Silent continuation after partial mutation can break invariants and leave inconsistent or unauthorized state."
      }
    },
    "q07": {
      "options": {
        "A": "Unredacted output can persist and distribute credentials, personal data, and deployment details through logging systems.",
        "B": "Logs are often copied into aggregators, alerts, support tools, traces, backups, and retained archives.",
        "C": "Log messages can contain any values application code includes, including working credentials and protected data.",
        "D": "Logs also need controlled access and cannot replace authorization at application resource boundaries."
      }
    },
    "q08": {
      "options": {
        "A": "Dependency review, lockfiles, advisory tracking, and understanding build scripts help govern what the application trusts and ships.",
        "B": "Small convenience gains do not establish that a new package's trust and maintenance risks are acceptable.",
        "C": "Abandoned packages can retain known defects or lack timely fixes, so their continued use requires review.",
        "D": "CI checks provide useful dependency evidence and should not be disabled merely to simplify the workflow."
      }
    },
    "q09": {
      "options": {
        "A": "Successful and failure-path cases should exercise input, authorization, configuration, and operational assumptions that affect security.",
        "B": "Successful UI paths miss invalid requests, denied access, backend failures, and bypassed client validation.",
        "C": "Confirming compilation does not test runtime inputs, resource permissions, or controlled failure behavior.",
        "D": "Visual snapshots do not establish backend validation, authorization, secret handling, or correct error paths."
      }
    },
    "q10": {
      "options": {
        "A": "Explicit trust boundaries and runtime controls complement types and tests to protect the application as a whole.",
        "B": "Interfaces do not prove the runtime validity or trustworthiness of data received by a service.",
        "C": "Client-only policy can be bypassed, so sensitive operations need enforcement by trusted server-side code.",
        "D": "Documented validation and authorization contracts make expected behavior reviewable and help preserve it during changes."
      }
    }
  }
};
