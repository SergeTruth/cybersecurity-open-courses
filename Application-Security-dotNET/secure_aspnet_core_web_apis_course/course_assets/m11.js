window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d9fa00cb91",
  "questions": {
    "q1": {
      "options": {
        "A": "API trust boundaries affect data and authority rather than only presentation styling.",
        "B": "Identify boundary crossings so the server validates new identity, data, command, and file assumptions.",
        "C": "HTTPS protects transport without validating every value or permitted application action.",
        "D": "Internal responses can be malformed or inappropriate and still require receiving-side checks."
      }
    },
    "q2": {
      "options": {
        "A": "Public endpoints should expose deliberately approved capabilities rather than every internal helper.",
        "B": "Exposed capabilities directly determine which operations untrusted callers can request.",
        "C": "Review the complete contract, authority, cost, and observable behavior before exposing a capability.",
        "D": "Any endpoint can expose sensitive operations regardless of whether it handles images."
      }
    },
    "q3": {
      "options": {
        "A": "Pipeline components need suitable context and ordering to apply intended request and response controls.",
        "B": "Authorization must be configured and correctly applied rather than assumed to run automatically.",
        "C": "The configured pipeline determines order instead of arbitrary runtime randomization.",
        "D": "Middleware changes actual request behavior beyond source comments or documentation."
      }
    },
    "q4": {
      "options": {
        "A": "DTOs define data exchange contracts rather than interface font sizes.",
        "B": "An explicit data shape still requires authorization for its operation and resource.",
        "C": "Narrow DTOs specify allowed input and output fields without exposing full internal object models.",
        "D": "A DTO can deliberately omit database columns that clients should not see."
      }
    },
    "q5": {
      "options": {
        "A": "Overposting depends on the accepted model and cannot be ruled out for every binding design.",
        "B": "Binding populates representation while semantic validity and permission remain separate checks.",
        "C": "Model binding applies to request models and is not limited to static-file handling.",
        "D": "Token signature validation belongs to authentication rather than ordinary request model binding."
      }
    },
    "q6": {
      "options": {
        "A": "A published schema describes a contract but does not enforce every runtime business rule.",
        "B": "Validation must run on actual requests throughout development and production operation.",
        "C": "Server rules remain effective even when callers bypass or replace the expected client.",
        "D": "A client can send arbitrary requests without running the supplied validation code."
      }
    },
    "q7": {
      "options": {
        "A": "Successful authentication does not grant every possible permission to the caller.",
        "B": "Identity and permission decisions are different even when integrated into one framework.",
        "C": "Token validation supports authentication, while authorization enforces permitted server operations.",
        "D": "Authenticate the identity, then check the requested action against the particular resource."
      }
    },
    "q8": {
      "options": {
        "A": "Claims and scopes are also used by API token and server policy systems.",
        "B": "Identity claims do not automatically enforce body-size or resource-cost limits.",
        "C": "Server policy must evaluate relevant claims and resource context instead of omitting checks.",
        "D": "Token assertions inform policy while ownership, tenant, role, and workflow can further restrict access."
      }
    },
    "q9": {
      "options": {
        "A": "Feature access does not imply permission for every selected object or administrative operation.",
        "B": "Access checks and audit records complement each other rather than eliminate logging needs.",
        "C": "Object authorization protects actual resources rather than deciding visual API themes.",
        "D": "Authenticated users also need permission to access each requested record or tenant."
      }
    },
    "q10": {
      "options": {
        "A": "An allowed browser origin does not establish a trusted authenticated user.",
        "B": "CORS response sharing must be combined with server authentication, authorization, and validation.",
        "C": "Browser CORS enforcement does not universally prevent direct non-browser requests.",
        "D": "CORS does not manage the rotation or revocation of API credentials."
      }
    },
    "q11": {
      "options": {
        "A": "Resource budgets do not validate token issuer, audience, signature, or lifetime.",
        "B": "Uploads still require content and storage controls beyond generic resource limits.",
        "C": "Bound large, slow, frequent, and expensive work to preserve shared capacity and predictable failure.",
        "D": "Resource protection also matters for endpoints that read or modify data."
      }
    },
    "q12": {
      "options": {
        "A": "Documentation can expose the available operational surface and important implementation assumptions.",
        "B": "Publishing OpenAPI does not inherently disable the endpoints it describes.",
        "C": "Production credentials should never be embedded in exposed API documentation.",
        "D": "Decide documentation audience and environment because models and capabilities can reveal sensitive context."
      }
    }
  }
};
