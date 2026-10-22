window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b03901e4f9",
  "questions": {
    "q01": {
      "options": {
        "A": "Secure Go combines language clarity with explicit data, authority, failure, and lifecycle contracts.",
        "B": "Garbage collection does not enforce resource permissions or release every external handle.",
        "C": "Library safety does not establish every application's business and ownership invariant.",
        "D": "Security decisions also need enforcement inside trusted runtime application paths."
      }
    },
    "q02": {
      "options": {
        "A": "Error handling affects actual control flow rather than merely formatting performance.",
        "B": "An ignored failure can let later operations rely on invalid or partial results.",
        "C": "Discarding an error does not guarantee that execution stops safely.",
        "D": "The existence of an unchecked error is not evidence of successful completion."
      }
    },
    "q03": {
      "options": {
        "A": "Entering a handler does not establish the trustworthiness of incoming values.",
        "B": "Validate at the receiving boundary before sensitive operations rely on parsed data.",
        "C": "Only the fields justified by the operation should be accepted or assigned.",
        "D": "Failed validation does not justify logging confidential raw payload contents."
      }
    },
    "q04": {
      "options": {
        "A": "Backend services also require limits over shared capacity and expensive operations.",
        "B": "Resource budgets do not identify callers or grant permission for actions.",
        "C": "Bounded work still needs deliberate handle, buffer, and goroutine cleanup.",
        "D": "Limits constrain excessive resource consumption that can undermine service availability."
      }
    },
    "q05": {
      "options": {
        "A": "Propagate request deadlines and cancellation to work that must stop when no longer needed.",
        "B": "Context should not become an unrestricted repository for unrelated application configuration.",
        "C": "Request context does not replace action and object-level permission checks.",
        "D": "Goroutines must cooperate with cancellation rather than ignore request lifecycle changes."
      }
    },
    "q06": {
      "options": {
        "A": "Restricted logs can still spread credentials into retained operational records.",
        "B": "Hardcoded values enter histories and artifacts and complicate independent replacement.",
        "C": "Deliver credentials through controlled configuration and exclude them from public and diagnostic outputs.",
        "D": "Crash records can retain confidential values beyond intended secret consumers."
      }
    },
    "q07": {
      "options": {
        "A": "Generic middleware may still need resource-specific authorization in the relevant handler.",
        "B": "Shared request infrastructure can consistently apply common limits, identity context, and diagnostics.",
        "C": "Full response capture can create unnecessary confidential data copies in logs.",
        "D": "Request processing should have deliberate bounds before expensive parsing occurs."
      }
    },
    "q08": {
      "options": {
        "A": "Every dependency needs a justified purpose and an accountable maintenance owner.",
        "B": "Integrity and resolution changes deserve review along with source dependency additions.",
        "C": "Transitive code affects trusted application behavior even without a direct import decision.",
        "D": "Use deliberate versions with reviewable provenance and an ongoing update path."
      }
    },
    "q09": {
      "options": {
        "A": "Goroutines need defined ownership, failure handling, cancellation, and coordinated shutdown.",
        "B": "Untracked workers can leak resources or outlive the state they reference.",
        "C": "Channel closure needs a clear lifecycle contract to prevent races and invalid sends.",
        "D": "Shared mutable data requires synchronization preserving the intended multi-step invariants."
      }
    },
    "q10": {
      "options": {
        "A": "Standard-library entry does not validate every external value's business meaning or authority.",
        "B": "Make security assumptions explicit and verify inputs, outcomes, resources, secrets, and releases.",
        "C": "Unsafe features require specific justification and do not automatically solve performance problems safely.",
        "D": "Builds and dependencies determine the trusted software shipped into production."
      }
    }
  }
};
