window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5432c45882",
  "questions": {
    "q1": {
      "options": {
        "A": "Restricting a dashboard does not shorten the lifetime or reduce the authority of already copied credentials.",
        "B": "Encryption at rest does not remove the exposure created by sharing one long-lived key across services.",
        "C": "Short-lived workload credentials reduce the useful lifetime of copied values while least privilege limits their authority.",
        "D": "Fetching another copy of the same permanent key does not shorten its validity or revoke leaked copies."
      }
    },
    "q2": {
      "options": {
        "A": "The platform establishes identity, the provider acquires temporary credentials, and the target still evaluates the request's authority.",
        "B": "A newly injected permanent key is still a long-lived credential rather than the described workload-identity flow.",
        "C": "An attached identity does not eliminate the target service's need to validate credentials and enforce permissions.",
        "D": "Image digests identify artifacts and are not inherently confidential credentials accepted by every target API."
      }
    },
    "q3": {
      "options": {
        "A": "Shorter lifetimes reduce exposure duration but leave the worker's excessive administrative scope intact.",
        "B": "Sharing a deployment identity gives the worker authority needed by another workflow rather than its own limited task.",
        "C": "A distinct least-privilege identity limits the worker to required queues, actions, and explicitly needed secrets.",
        "D": "Better storage encryption does not correct permissions that allow unrelated queue administration and secret access."
      }
    },
    "q4": {
      "options": {
        "A": "Rotating downstream secrets leaves the permanent bootstrap password exposed in the image and required for access.",
        "B": "Moving a master password between variables does not remove the need to protect that bootstrap secret.",
        "C": "Another store can merely move the secret-zero dependency and broaden reuse across environments.",
        "D": "Workload authentication removes the permanent application bootstrap password while narrow grants limit which stored secrets it can read."
      }
    },
    "q5": {
      "options": {
        "A": "An environment variable delivers a credential but still requires lifecycle, inheritance, diagnostic, access, and refresh review.",
        "B": "Excluding environment files from source does not provide runtime access control, rotation adoption, or complete secret auditing.",
        "C": "Runtime files also need restricted access and can still be exposed through diagnostics or application memory.",
        "D": "Operational tools, process inspection, inherited environments, and crash reports can expose runtime environment values."
      }
    },
    "q6": {
      "options": {
        "A": "Browser-delivered environment substitutions remain visible in generated JavaScript regardless of whether the original file is shipped.",
        "B": "A configuration endpoint readable by the browser still delivers the confidential credential to its users.",
        "C": "Minification, hidden source maps, and obscure names do not conceal values the browser must receive and use.",
        "D": "An authenticated, authorized, bounded server operation can use the credential without exposing it to browser clients."
      }
    },
    "q7": {
      "options": {
        "A": "Earlier provider sources can still take precedence, so configured workload identity alone does not prove which credential is used.",
        "B": "Review actual provider precedence and prohibit unintended static or local fallback so production uses its intended identity.",
        "C": "Developer credentials can broaden authority, hide workload-identity failures, and break production identity isolation.",
        "D": "Temporary credentials expire, so applications need the provider's supported refresh behavior rather than retaining one token forever."
      }
    },
    "q8": {
      "options": {
        "A": "Store encryption does not refresh cached credentials or update already established database connection behavior.",
        "B": "Rotation must reach process caches and relevant connections, with adoption verified before any supported old-version overlap ends.",
        "C": "Indefinite fallback and unlimited retries retain stale authority and can amplify authentication failures or outages.",
        "D": "Fetching per request does not automatically replace existing pooled connections or settle their authentication lifecycle."
      }
    },
    "q9": {
      "options": {
        "A": "A developer credential retains human-account authority and does not provide a narrow short-lived deployment trust boundary.",
        "B": "Masking limits some log exposure but does not remove permanent-key lifetime or isolation risks from a shared role.",
        "C": "A trusted issuer can serve many jobs, so token claims must restrict which workflows may assume production authority.",
        "D": "Federated deployment credentials should bind intended job claims to a least-privilege role for the target environment."
      }
    },
    "q10": {
      "options": {
        "A": "A non-null object does not prove the actual principal, and logging it can reveal working credentials.",
        "B": "Safe principal evidence, exercised refresh, and a no-fallback failure test verify intended identity without disclosing secret material.",
        "C": "Secret scanning does not observe production provider precedence, active principal selection, expiry, or refresh behavior.",
        "D": "Success with a developer credential can hide an unintended fallback rather than demonstrate correct workload identity."
      }
    }
  }
};
