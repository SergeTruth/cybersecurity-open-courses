window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-46e9914ebc",
  "questions": {
    "q1": {
      "options": {
        "A": "TypeScript does not validate arbitrary external runtime values, so relevant boundary checks remain necessary.",
        "B": "Explicit assumptions and safe failure paths reduce surprises when inputs, dependencies, or runtime conditions differ from expectations.",
        "C": "Silently continuing after every error can hide failures and allow invalid or unauthorized side effects.",
        "D": "Comments support contracts but cannot replace enforced validation, clear APIs, and controlled failure behavior."
      }
    },
    "q2": {
      "options": {
        "A": "Interfaces describe expected structure without executing code that repairs or rejects incoming data.",
        "B": "Static interfaces do not prevent connection failures, timeouts, or malformed responses from remote services.",
        "C": "Interface declarations do not prove that deployed APIs and databases have completed compatible migrations.",
        "D": "External values need runtime validation because design-time interfaces do not establish their actual shape or meaning."
      }
    },
    "q3": {
      "options": {
        "A": "unknown forces callers to check and narrow values before using them as specific trusted types.",
        "B": "unknown retains useful compiler restrictions instead of disabling all static checking like unconstrained any.",
        "C": "A value typed unknown still needs an actual schema parser or other runtime validation logic.",
        "D": "unknown restricts static use but does not automatically freeze or make the underlying runtime object readonly."
      }
    },
    "q4": {
      "options": {
        "A": "Using raw values before validation exposes business operations to malformed or semantically invalid data.",
        "B": "Failed validation should produce a controlled failure rather than be disguised as successful processing.",
        "C": "Parsing and validation establish a trusted internal representation before business logic relies on its promised properties.",
        "D": "Storing every value as a string loses domain distinctions without establishing that the input is valid."
      }
    },
    "q5": {
      "options": {
        "A": "Unrelated booleans and optional fields can admit contradictory or incomplete combinations of state.",
        "B": "Explicit discriminated cases describe valid alternatives and make handling each state easier to check.",
        "C": "Making every field optional permits incomplete states and weakens the contract of each operation.",
        "D": "any hides useful state distinctions and bypasses checks that could identify invalid combinations."
      }
    },
    "q6": {
      "options": {
        "A": "Merging objects ordinarily creates or changes properties without automatically making the result immutable.",
        "B": "A merge does not establish that external fields satisfy structural or semantic validation rules.",
        "C": "Broad merging may copy unexpected keys instead of limiting updates to an explicit approved field set.",
        "D": "Attacker-influenced keys can alter protected fields, nested structures, or object behavior unless construction is controlled."
      }
    },
    "q7": {
      "options": {
        "A": "Retries can multiply load during outages or repeat a side effect whose earlier outcome is uncertain.",
        "B": "Repeated requests can overload a struggling dependency rather than necessarily improve its health.",
        "C": "Retries do not prevent timeouts and need bounded budgets, suitable backoff, and operation-aware handling.",
        "D": "Cancellation remains necessary to stop abandoned work and release resources even when retry policies exist."
      }
    },
    "q8": {
      "options": {
        "A": "Interface labels can be bypassed and cannot enforce permission at the server's protected action boundary.",
        "B": "Documentation explains policy but does not prevent code from performing an unauthorized operation.",
        "C": "Checks near the protected action ensure the actual resource, operation, and current trusted context are authorized.",
        "D": "Returning sensitive data before checking access cannot recover the confidentiality already lost."
      }
    },
    "q9": {
      "options": {
        "A": "Hard-coded production credentials spread through source history, builds, and distributed artifacts and complicate rotation.",
        "B": "Startup validation catches unusable configuration early, while approved secret delivery avoids unnecessary embedded credentials.",
        "C": "Random failures during requests make configuration defects harder to diagnose and can leave partial workflows.",
        "D": "Environment dumps can reveal credentials and sensitive deployment settings to retained or broadly accessed logs."
      }
    },
    "q10": {
      "options": {
        "A": "Internal values may still originate from compromised sources, stale state, or earlier unvalidated boundaries.",
        "B": "Unexpected success can hide violated assumptions; clear failures make invalid operations visible and controllable.",
        "C": "Widespread any weakens contracts and allows unvalidated values to bypass useful compiler checks.",
        "D": "Types, validation, explicit contracts, and safe failure paths work together to constrain unreliable or unsafe behavior."
      }
    }
  }
};
