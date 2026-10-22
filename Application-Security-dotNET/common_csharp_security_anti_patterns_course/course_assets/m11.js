window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5fb49499fb",
  "questions": {
    "q1": {
      "options": {
        "A": "New projects can repeat unsafe habits just as legacy systems can.",
        "B": "An anti-pattern is a reusable-looking shortcut that repeatedly introduces predictable security risk.",
        "C": "A security anti-pattern has harmful consequences beyond a reviewer's style preference.",
        "D": "Many insecure patterns compile successfully and require design or behavior review."
      }
    },
    "q2": {
      "options": {
        "A": "Embedded credentials do not automatically rotate when copied or disclosed.",
        "B": "Servers, services, libraries, and other applications also expose hardcoded secrets.",
        "C": "Source and artifacts distribute credential copies beyond approved access and storage controls.",
        "D": "A generic variable name does not protect the secret value it contains."
      }
    },
    "q3": {
      "options": {
        "A": "ORM abstractions still leave raw queries, resource access, and tenant isolation to review.",
        "B": "ORMs do not inherently disable authorization, but they do not enforce every application policy.",
        "C": "Executing database queries is a primary ORM function and still needs safe usage.",
        "D": "ORMs manage data access rather than serving only as logging mechanisms."
      }
    },
    "q4": {
      "options": {
        "A": "Disabling a button does not establish ownership of the target resource.",
        "B": "Clients can bypass interface controls, so enforcement must occur at the server boundary.",
        "C": "A direct request can reach an endpoint even when the UI hides its control.",
        "D": "Authorization controls access to operations and resources rather than presentation colors."
      }
    },
    "q5": {
      "options": {
        "A": "Safe output still needs separate identity and resource authorization checks.",
        "B": "Encode untrusted values and select response fields to prevent execution or unwanted disclosure.",
        "C": "Domain objects may contain internal fields that should not appear in API responses.",
        "D": "Web output especially requires context-specific encoding and deliberate response contracts."
      }
    },
    "q6": {
      "options": {
        "A": "Fixed DTO contracts help constrain input and should not be discarded for arbitrary reconstruction.",
        "B": "Type selection can change executed application behavior rather than merely formatting.",
        "C": "Untrusted type metadata can select constructors, members, or behavior outside the intended contract.",
        "D": "Deserialization does not establish the trustworthiness of externally supplied type choices."
      }
    },
    "q7": {
      "options": {
        "A": "API keys do not universally expire after one use without an explicit lifecycle policy.",
        "B": "Credentials remain sensitive even when represented by ordinary managed strings.",
        "C": "Cookies need deliberate scope, expiry, browser flags, and applicable CSRF protection.",
        "D": "Credential possession can grant access until expiry or effective revocation removes that authority."
      }
    },
    "q8": {
      "options": {
        "A": "Disabling validation weakens rather than improves the decision about the remote service's identity.",
        "B": "Production HTTP integrations should retain required certificate and hostname validation.",
        "C": "Certificate validation affects trust in the transport peer rather than log formatting.",
        "D": "Bypassing checks can allow communication with an impersonating or otherwise untrusted service."
      }
    },
    "q9": {
      "options": {
        "A": "Diagnostics spread through operators and tools, so sensitive fields need consistent redaction.",
        "B": "Public error details can disclose implementation information and sensitive operational state.",
        "C": "Credential logging creates additional reusable secrets in the diagnostic infrastructure.",
        "D": "Redaction applies to text records, request data, exceptions, and many other outputs."
      }
    },
    "q10": {
      "options": {
        "A": "Hidden controls and obscure routes do not enforce the server's security contract.",
        "B": "Replace risky shortcuts with coordinated storage, access, output, identity, and diagnostic controls.",
        "C": "Embedded credentials and broad diagnostics amplify exposure while client-only checks leave bypasses.",
        "D": "Development convenience settings need production review rather than automatic promotion."
      }
    }
  }
};
