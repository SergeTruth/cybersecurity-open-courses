window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-90ec29ea2b",
  "questions": {
    "q1": {
      "options": {
        "A": "Credentials and keys can convey identity, authority, decryption, signing, and service access.",
        "B": "Type safety does not prevent disclosed credentials from granting unintended external access.",
        "C": "Secrets also include encryption keys, signing keys, and credentials for connected systems.",
        "D": "Deployment and diagnostics can expose memory-held secrets and remain part of their protection lifecycle."
      }
    },
    "q2": {
      "options": {
        "A": "Different secret roles can require different access, lifetime, rotation, and recovery policies.",
        "B": "Classification should directly inform access boundaries rather than merely improve documentation.",
        "C": "Short lifetime reduces exposure duration but does not justify unnecessary component access.",
        "D": "Classifying role and responsibility links each secret to concrete protection and recovery requirements."
      }
    },
    "q3": {
      "options": {
        "A": "Credentials used at runtime can remain in binaries; optimization is not a secret-removal guarantee.",
        "B": "Repository permissions do not prevent secrets from spreading into authorized builds and caches.",
        "C": "Embedded values can persist across many derived copies beyond the current source file.",
        "D": "Protection depends on storage, access, and key policy rather than location alone."
      }
    },
    "q4": {
      "options": {
        "A": "Removing the current line does not erase historical commits, clones, or derived artifacts.",
        "B": "Rotate or revoke exposed values because deletion cannot reliably recover all existing copies.",
        "C": "Exposed development credentials can also grant access and need an appropriate revocation decision.",
        "D": "Private repository access does not guarantee that a committed secret remained confidential."
      }
    },
    "q5": {
      "options": {
        "A": "Reviewed stores centralize access control, audit trails, and lifecycle mechanisms for secrets.",
        "B": "A custom encrypted file still needs sound cryptography, key management, and access control.",
        "C": "Approved storage still requires scoped component permissions and accountable operational ownership.",
        "D": "Components should receive only the retrieval permissions needed for their own responsibilities."
      }
    },
    "q6": {
      "options": {
        "A": "Arguments and environment values differ in inheritance and operating-system visibility.",
        "B": "Configuration files still need suitable permissions even when stored outside the repository.",
        "C": "Each injection channel has distinct exposure through inheritance, diagnostics, permissions, and artifacts.",
        "D": "Process-inspection tools can expose command-line arguments subject to platform access controls."
      }
    },
    "q7": {
      "options": {
        "A": "Const references can reduce some copies but do not prevent all string duplication.",
        "B": "Minimize copies and diagnostics because each copy can extend lifetime or create disclosure.",
        "C": "A dump can retain secret bytes beyond the intended in-process lifetime.",
        "D": "Partial credential logging can still disclose sensitive material and should follow explicit policy."
      }
    },
    "q8": {
      "options": {
        "A": "Metadata and ciphertext can still require filesystem access restrictions and integrity protection.",
        "B": "Keeping an accessible decryption key beside ciphertext can defeat the intended storage protection.",
        "C": "Encrypted backups still need access, retention, and key-management policies.",
        "D": "Encryption cannot compensate for an exposed key or overly broad decryption access."
      }
    },
    "q9": {
      "options": {
        "A": "Least privilege limits access, while rotation and revocation support recovery when trust changes.",
        "B": "Routine rotation policy can reduce exposure and prepare services for necessary credential changes.",
        "C": "Revocation does not replace audit information needed to assess who used an exposed value.",
        "D": "Broad secret access expands incident scope and the number of components requiring trust."
      }
    },
    "q10": {
      "options": {
        "A": "Diagnostics can contain configuration values or generated output independently of debug symbols.",
        "B": "Realistic reusable credentials in fixtures can escape through tests, artifacts, or shared systems.",
        "C": "Crash reports can include memory and configuration as well as control-flow details.",
        "D": "Review operational outputs because they can capture secrets from configuration, memory, and fixtures."
      }
    }
  }
};
