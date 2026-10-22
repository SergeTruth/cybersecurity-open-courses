window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a3f8b7b146",
  "questions": {
    "q1": {
      "options": {
        "A": "Architecture governs executable trust and resource behavior beyond diagram presentation.",
        "B": "Design decisions establish service identity, data, dependencies, failure, and operational trust contracts.",
        "C": "Imports contribute dependencies but do not define every architectural security decision.",
        "D": "Architecture provides reviewable assumptions rather than eliminating review of later changes."
      }
    },
    "q2": {
      "options": {
        "A": "Internal traffic can still carry malformed values or unauthorized resource requests.",
        "B": "Boundaries identify where validation and diagnostic evidence remain especially important.",
        "C": "Knowing a dependency boundary does not establish that its implementation is trustworthy.",
        "D": "Changed trust assumptions identify where identity, validation, permissions, and observability are required."
      }
    },
    "q3": {
      "options": {
        "A": "Authentication establishes caller identity while authorization evaluates its permitted operations and resources.",
        "B": "Identity checks and resource permissions apply beyond logging and database concerns.",
        "C": "Identifying a caller does not grant universal permission to its requested actions.",
        "D": "The stated roles confuse identity verification with unrelated output formatting."
      }
    },
    "q4": {
      "options": {
        "A": "Comments describe intended behavior without enforcing permission before protected operations.",
        "B": "Gateway checks may lack the specific resource and workflow context required downstream.",
        "C": "Enforce policy where protected actions and actual ownership context can be checked.",
        "D": "Permission checks after disclosure cannot recover data already returned to an unauthorized caller."
      }
    },
    "q5": {
      "options": {
        "A": "Persisting unvalidated values can publish invalid or unauthorized application state.",
        "B": "Validate and consistently normalize external values before sensitive business operations rely on them.",
        "C": "Full payload logging can disclose confidential input without establishing valid domain semantics.",
        "D": "Internal callers can be outdated or compromised and still need boundary checks."
      }
    },
    "q6": {
      "options": {
        "A": "Publishing every persistence field can expose confidential or administrative properties.",
        "B": "Explicit response models help restrict disclosure rather than merely avoid defining contracts.",
        "C": "Clients should receive stable intended data rather than private implementation details.",
        "D": "Select only fields justified for the caller's task and resource permissions."
      }
    },
    "q7": {
      "options": {
        "A": "Treat credentials as confidential values with controlled storage, delivery, use, and diagnostics.",
        "B": "Token logs can grant reusable access to readers and copied diagnostic systems.",
        "C": "Sensitive material needs narrower handling than ordinary public application strings.",
        "D": "Committed credentials spread into source history, artifacts, and unrelated deployment copies."
      }
    },
    "q8": {
      "options": {
        "A": "Unnecessary packages enlarge the trusted executable surface and maintenance obligations.",
        "B": "Version and vulnerability review must continue as dependencies and threats evolve.",
        "C": "Keep each dependency justified, versioned, reviewed, and traceable through delivered builds.",
        "D": "Runtime images contain dependencies and still need maintenance and security updates."
      }
    },
    "q9": {
      "options": {
        "A": "Repeated attempts can increase traffic precisely when a dependency is already overloaded.",
        "B": "Bound retry effort and account for repeated state-changing effects and downstream capacity.",
        "C": "Deadlines remain necessary to cap total retry duration and retained resources.",
        "D": "Idempotency requires an explicit side-effect contract rather than merely repeating requests."
      }
    },
    "q10": {
      "options": {
        "A": "Missing preplanned diagnostics can leave incident activity impossible to reconstruct reliably.",
        "B": "Local unstructured files alone can limit correlation, access governance, and durable evidence.",
        "C": "Metrics reveal pressure and failures that logs alone may not explain.",
        "D": "Design safe logs, traces, metrics, and audit context before responders need them."
      }
    }
  }
};
