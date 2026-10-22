window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1ade85dbe4",
  "questions": {
    "q1": {
      "options": {
        "A": "Minified browser code remains client-controlled and cannot enforce permission at the backend delete operation.",
        "B": "Trusted server-side authorization must bind the requester's identity, requested action, and actual target before deletion.",
        "C": "Hidden fields are client input and cannot provide authoritative permission for a protected side effect.",
        "D": "Unpredictable page locations do not prevent direct calls to a known delete endpoint."
      }
    },
    "q2": {
      "options": {
        "A": "A type assertion does not inspect the runtime object or reject its unexpected fields.",
        "B": "Asserting a request type does not coerce strings into safe integers or validate numeric bounds.",
        "C": "A client can construct a request without using the official application, regardless of its asserted server type.",
        "D": "The assertion communicates a static assumption while leaving the actual request value unchecked."
      }
    },
    "q3": {
      "options": {
        "A": "Verified session identity and authoritative membership records provide trusted user and tenant context for access decisions.",
        "B": "Matching body fields remain caller-controlled and must not replace the verified session's identity or tenant scope.",
        "C": "Local storage is controlled by the client and cannot establish authoritative backend identity.",
        "D": "Hidden form inputs can be altered and do not constitute a verified user or tenant identity."
      }
    },
    "q4": {
      "options": {
        "A": "A Boolean shape check does not establish permission to grant or exercise administrative privileges.",
        "B": "HTTPS protects transport but does not make a caller's self-declared administrative status trustworthy.",
        "C": "Privilege decisions must use trusted server state rather than accept a client-provided isAdmin value as authority.",
        "D": "Hiding an administrative UI control does not constrain fields that a direct API request can submit."
      }
    },
    "q5": {
      "options": {
        "A": "A positive submitted total can still be below the authorized price or ignore required business conditions.",
        "B": "Server-side product, quantity, discount, and entitlement rules should calculate the authoritative amount to charge.",
        "C": "Client local storage can be modified and cannot validate the price the server should enforce.",
        "D": "Obfuscation does not prevent a client from replacing the calculation or sending an arbitrary total."
      }
    },
    "q6": {
      "options": {
        "A": "Explicit update allowlists prevent broad schemas or future accepted fields from unintentionally gaining persistence authority.",
        "B": "Database libraries can accept JavaScript update objects, which is why their approved field set needs control.",
        "C": "Validators do not universally remove every property, and operation-specific mapping still limits intended writable fields.",
        "D": "Both body and query inputs can be used after appropriate validation, authorization, and explicit mapping."
      }
    },
    "q7": {
      "options": {
        "A": "Authentication identifies the user without granting access to every document the service can retrieve.",
        "B": "A submitted owner label cannot establish the actual ownership relationship of the target document.",
        "C": "UUIDs can be learned or leaked and do not prove that the requester may access the object.",
        "D": "Retrieval should constrain records to trusted tenant or ownership scope and enforce any additional action-specific policy."
      }
    },
    "q8": {
      "options": {
        "A": "The browser's earlier display can be stale and does not authorize a transition from the current rejected state.",
        "B": "Accepting conflicting transitions can violate workflow invariants regardless of which response the client displays.",
        "C": "The server must evaluate current authoritative state and reject transitions whose required preconditions no longer hold.",
        "D": "Blind retries can keep applying an invalid transition instead of resolving the state conflict safely."
      }
    },
    "q9": {
      "options": {
        "A": "Joining the precondition to the mutation at the authoritative database boundary prevents competing requests from consuming the same unit.",
        "B": "A browser check can become stale and can be bypassed by direct or concurrent requests.",
        "C": "An erased interface cannot force the database to preserve positive stock during overlapping writes.",
        "D": "Disabling one browser button does not coordinate other clients or in-flight operations competing for the same stock."
      }
    },
    "q10": {
      "options": {
        "A": "A screenshot shows presentation rules but cannot prove the API rejects unauthorized direct requests.",
        "B": "Direct negative requests with valid authentication test target authorization, field restrictions, denial, and absence of protected changes.",
        "C": "Strict client compilation does not enforce runtime policy for arbitrary callers of the backend API.",
        "D": "Client-side messages do not establish that trusted server code enforces equivalent validation or permissions."
      }
    }
  }
};
