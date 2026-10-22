window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8e37f68e66",
  "questions": {
    "q1": {
      "options": {
        "A": "A build log can retain and expose a reusable credential to additional readers.",
        "B": "Secrets can convey authority, identity, signing capability, decryption access, or service connectivity.",
        "C": "Credentials and keys can directly determine which protected runtime operations succeed.",
        "D": "Secret values protect access and cryptographic trust rather than merely interface appearance."
      }
    },
    "q2": {
      "options": {
        "A": "Infrastructure and identity settings can remain sensitive even without an explicit password field.",
        "B": "A placeholder label does not make a real infrastructure-bearing string appropriate to publish.",
        "C": "Connection details can reveal internal topology, provider behavior, and identity-based access assumptions.",
        "D": "Connection strings can select databases, identities, and transport properties affecting access."
      }
    },
    "q3": {
      "options": {
        "A": "A reference identifies the secret to retrieve; the value is the confidential access material.",
        "B": "Screenshots can expose an actual secret value regardless of whether its reference is hidden.",
        "C": "A lookup identifier and the retrieved credential are distinct items with different disclosure implications.",
        "D": "References need lifecycle governance and do not automatically rotate the underlying credential."
      }
    },
    "q4": {
      "options": {
        "A": "Local user secrets do not replace managed workload identity and production access policy.",
        "B": "Production deployment does not universally require the local development user-secrets facility.",
        "C": "Development convenience storage does not supply a managed production access and lifecycle system.",
        "D": "Local storage does not automatically audit each read made by production workloads."
      }
    },
    "q5": {
      "options": {
        "A": "Production access in demonstrations expands credential exposure instead of making examples safer.",
        "B": "Samples and tests spread across repositories and execution environments that should not inherit production authority.",
        "C": "Tests should use appropriate isolated credentials rather than require production access by default.",
        "D": "Sample repositories and copied projects cannot be assumed to remain private indefinitely."
      }
    },
    "q6": {
      "options": {
        "A": "Runtime identities still need explicit permissions for the resources they access.",
        "B": "Identity-based access reduces copied secrets rather than embedding credentials into source files.",
        "C": "A workload can authenticate directly to approved resources through a governed runtime identity.",
        "D": "Workload identity does not automatically grant administrators' privileges to developers."
      }
    },
    "q7": {
      "options": {
        "A": "Central retrieval should protect values rather than hardcode every credential in application code.",
        "B": "Shared retrieval logic must prevent secret printing instead of enabling indiscriminate debugging.",
        "C": "Retrieval centralization does not remove secret expiration, replacement, or revocation needs.",
        "D": "A common reviewed path makes retrieval, caching, failures, and disclosure protections easier to govern."
      }
    },
    "q8": {
      "options": {
        "A": "Build jobs should receive only the credentials required for building and releasing their artifacts.",
        "B": "Runtime workloads may still need governed access to credentials or managed identities.",
        "C": "Separating credential purposes can support deployment while reducing unnecessary access paths.",
        "D": "Different trust contexts need distinct access so build logs and artifacts cannot expose runtime authority."
      }
    },
    "q9": {
      "options": {
        "A": "Copied artifacts spread through registries and caches, making embedded secret disclosure difficult to contain.",
        "B": "Embedding credentials in an artifact does not cause their automatic rotation.",
        "C": "Release artifacts commonly move among build agents, registries, hosts, and developer machines.",
        "D": "Build history and layers can preserve credentials unless secret handling deliberately prevents inclusion."
      }
    },
    "q10": {
      "options": {
        "A": "Lifecycle plans support actual credential replacement rather than only public documentation.",
        "B": "A named owner and replacement policy make ongoing maintenance and retirement accountable.",
        "C": "Credentials can expire, leak, or lose their justification and therefore need continued maintenance.",
        "D": "Ownership supports auditing but does not make audit trails unnecessary."
      }
    },
    "q11": {
      "options": {
        "A": "Public failures should not reveal complete secret-bearing configuration state.",
        "B": "Diagnostics can be retained, indexed, and copied far beyond an individual request.",
        "C": "A full dump can mix harmless settings with credentials and spread them into support systems.",
        "D": "Configuration often contains passwords, tokens, keys, and sensitive infrastructure details."
      }
    },
    "q12": {
      "options": {
        "A": "Audit records support response planning without replacing an incident-handling process.",
        "B": "Useful audit trails record events and identities rather than publish raw secret values.",
        "C": "Logging access does not justify granting broader permissions than a workload requires.",
        "D": "Tracked access and lifecycle changes help investigators understand use, administration, and emergency response."
      }
    }
  }
};
