window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d8819edb59",
  "questions": {
    "q1": {
      "options": {
        "A": "Comments cannot replace tests demonstrating safe behavior when assumptions fail.",
        "B": "Defensive code has defined outcomes for invalid input, failed dependencies, and broken assumptions.",
        "C": "Failures need safe responses and useful controlled diagnostics rather than concealment.",
        "D": "Defensive checks should protect meaningful assumptions rather than add arbitrary complexity."
      }
    },
    "q2": {
      "options": {
        "A": "Nullable analysis is not a runtime guarantee that all references remain non-null.",
        "B": "Nullable reference annotations do not turn reference objects into value types.",
        "C": "Annotations expose absence assumptions and guide deliberate checks and missing-value handling.",
        "D": "Untrusted values still need semantic validation even when nullability is understood."
      }
    },
    "q3": {
      "options": {
        "A": "Valid domain states centralize invariants and reduce scattered contradictory checks.",
        "B": "Domain validity and caller authorization remain separate application responsibilities.",
        "C": "Accepting contradictory states makes behavior less predictable rather than safely flexible.",
        "D": "Object-oriented design does not require objects to permit invalid combinations of state."
      }
    },
    "q4": {
      "options": {
        "A": "Input validity does not establish who may perform an action on a resource.",
        "B": "Network, storage, service, and configuration boundaries also need validation.",
        "C": "Later transformations and trust boundaries can introduce new assumptions requiring review.",
        "D": "At each boundary, validate incoming data against the receiving operation's explicit contract."
      }
    },
    "q5": {
      "options": {
        "A": "Client validation can improve feedback while remaining insufficient as a security boundary.",
        "B": "Server checks are essential because callers can bypass or modify client behavior.",
        "C": "Client checks do not automatically enforce database query safety or data permissions.",
        "D": "Browsers can show validation feedback without being trusted to enforce server policy."
      }
    },
    "q6": {
      "options": {
        "A": "Exception handling still needs bounded logging and appropriate operational visibility.",
        "B": "Meaningful request, service, and workflow boundaries can also handle exceptions safely.",
        "C": "A suitable boundary can preserve context and choose a safe response without losing diagnostics.",
        "D": "Swallowing all exceptions hides failed requirements and can leave invalid state undetected."
      }
    },
    "q7": {
      "options": {
        "A": "A safe actionable retry instruction can help users without disclosing internals.",
        "B": "A controlled failure explanation can be appropriate for the user-facing contract.",
        "C": "Internal traces and secret-bearing details can disclose sensitive implementation or access information.",
        "D": "A nonsecret correlation identifier can support investigation without exposing internal state."
      }
    },
    "q8": {
      "options": {
        "A": "Parameters separate data from syntax but do not enforce every business invariant.",
        "B": "Connections and transactions still need defined lifetime and disposal handling.",
        "C": "Parameterization does not make protected records publicly accessible or authorized.",
        "D": "Binding values as data prevents them from changing the intended query structure."
      }
    },
    "q9": {
      "options": {
        "A": "ORM queries still need resource permissions, tenant scope, bounded results, and safe projections.",
        "B": "ORM use supplements rather than replaces application data-access and security review.",
        "C": "ORM query values can be externally influenced and require appropriate validation and binding.",
        "D": "Generating and executing database queries is an ordinary ORM responsibility."
      }
    },
    "q10": {
      "options": {
        "A": "Logs can be widely copied and need deliberate access and retention limits.",
        "B": "Distributed copies in code and diagnostics complicate secret access control and effective rotation.",
        "C": "The compiler does not automatically encrypt secret values sent to logging APIs.",
        "D": "Production credentials belong in approved secret management rather than committed source."
      }
    },
    "q11": {
      "options": {
        "A": "Collections can be safe when ownership, mutability, and synchronization are deliberately controlled.",
        "B": "A mutable collection does not decide whether a caller has permission to change it.",
        "C": "Exposing mutable internals lets callers violate invariants outside the intended control path.",
        "D": "A read-only interface can restrict mutation through that interface, subject to its underlying contract."
      }
    },
    "q12": {
      "options": {
        "A": "CI and release systems often hold powerful credentials requiring explicit protection.",
        "B": "Third-party packages can change application behavior and introduce vulnerabilities.",
        "C": "Delivery dependencies and build controls matter throughout development and production releases.",
        "D": "Review the dependencies and privileged build steps that determine the deployed artifact."
      }
    }
  }
};
