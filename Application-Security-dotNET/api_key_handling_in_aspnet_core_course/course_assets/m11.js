window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0db4f5721b",
  "questions": {
    "q1": {
      "options": {
        "A": "API keys can authorize production access as well as local development requests.",
        "B": "A key can grant valuable permissions, consume paid services, or expose protected data.",
        "C": "Exposed production keys can directly affect the systems and resources they authorize.",
        "D": "A credential-bearing key is not merely a public identifier without access value."
      }
    },
    "q2": {
      "options": {
        "A": "Both inbound and outbound keys can be sensitive credentials with required validation or storage.",
        "B": "The direction determines whether the application verifies a client's key or presents its own.",
        "C": "Inbound credentials authenticate callers to your app; outbound credentials authenticate calls to another service.",
        "D": "CSS and HTML are not appropriate storage locations for confidential API credentials."
      }
    },
    "q3": {
      "options": {
        "A": "URLs spread through surrounding infrastructure and user artifacts, exposing embedded credential values.",
        "B": "Putting a key in a URL does not rotate or expire it.",
        "C": "Proxies, analytics, browsers, and support tools can retain credential-bearing URLs.",
        "D": "Credential placement does not enforce which operations an authenticated caller may perform."
      }
    },
    "q4": {
      "options": {
        "A": "Encrypted transport still needs bounded monitoring and secret-safe operational diagnostics.",
        "B": "HTTPS authenticates transport endpoints but does not define each key's application permissions.",
        "C": "HTTPS protects requests in transit when the expected service identity is validated.",
        "D": "Transport encryption does not protect a key committed to source control."
      }
    },
    "q5": {
      "options": {
        "A": "Scattered endpoint comparisons can produce inconsistent authentication and error handling.",
        "B": "A reviewed shared integration gives consistent credential validation before protected operations.",
        "C": "Static-file middleware alone does not authenticate every protected API operation.",
        "D": "Frontend code can be modified or bypassed and cannot enforce server authentication."
      }
    },
    "q6": {
      "options": {
        "A": "Viewing a raw key does not automatically revoke or expire it.",
        "B": "A raw bearer credential can be replayed, unlike an appropriately designed stored verifier.",
        "C": "A disclosed raw key can grant access wherever that credential remains valid.",
        "D": "Raw credentials can be copied from storage, diagnostics, backups, or administrative interfaces."
      }
    },
    "q7": {
      "options": {
        "A": "A valid key does not independently prove access to every requested tenant or object.",
        "B": "Keys should receive only their required scopes and authorized operations.",
        "C": "Authorization also applies to service callers and applications using API keys.",
        "D": "Authentication establishes the caller, while authorization checks the requested action and resource."
      }
    },
    "q8": {
      "options": {
        "A": "An inventory is still needed to identify owners, uses, and affected credentials.",
        "B": "Rotation and revocation do not replace safe audit and anomaly monitoring.",
        "C": "One permanent shared key makes attribution and selective revocation difficult.",
        "D": "Lifecycle controls replace aging credentials and support containment when a key is exposed."
      }
    },
    "q9": {
      "options": {
        "A": "Use approved identifiers and outcomes for correlation while excluding complete credential values.",
        "B": "Complete request bodies may contain secrets and are unnecessary for routine key auditing.",
        "C": "Credential-bearing headers must be redacted rather than retained as raw diagnostic data.",
        "D": "Logging raw keys creates a reusable credential store in operational records."
      }
    },
    "q10": {
      "options": {
        "A": "Public configuration and client-side checks cannot protect a confidential service credential.",
        "B": "A complete baseline covers storage, transport, validation, permissions, lifecycle, and operational safeguards.",
        "C": "Query-string credentials and broad permissions unnecessarily increase exposure and incident impact.",
        "D": "One shared production key omits attribution, least privilege, and selective revocation controls."
      }
    }
  }
};
