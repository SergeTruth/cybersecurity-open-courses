window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-aded730556",
  "questions": {
    "q01": {
      "options": {
        "A": "A bearer credential can authorize its possessor without another proof, so disclosure can give an attacker the token's authority.",
        "B": "A usable bearer token is a secret credential rather than a harmless public identifier.",
        "C": "A bearer token can often be replayed until expiry or revocation unless an explicit control prevents reuse.",
        "D": "At-rest encryption does not prevent disclosure from transport handling, scripts, logs, or error reports."
      }
    },
    "q02": {
      "options": {
        "A": "Different token purposes call for different audiences, authority, lifetimes, and handling rules.",
        "B": "Storage choices depend on the token's exposure, replay consequences, client context, and granted privileges.",
        "C": "Defining purpose establishes the security contract needed to choose appropriate validation and lifecycle controls.",
        "D": "A display label does not establish the cryptographic, audience, or lifecycle requirements of a token."
      }
    },
    "q03": {
      "options": {
        "A": "Repeated calls to a non-cryptographic generator do not establish the unpredictability required for a bearer secret.",
        "B": "Base64 changes representation and cannot add entropy missing from the source value.",
        "C": "UUID formatting changes the appearance of bytes, not the security of the generator producing them.",
        "D": "Security-sensitive tokens require a cryptographically secure random source rather than a generator designed for general simulation."
      }
    },
    "q04": {
      "options": {
        "A": "Hashing an opaque token creates a verifier; it does not add JWT claims, formatting, or a signature.",
        "B": "A digest protects stored credential material but does not bound token lifetime or revoke issued authority.",
        "C": "For sufficiently unpredictable tokens, a stored verifier reduces direct credential reuse after a database-only leak.",
        "D": "Low-entropy token candidates can still be tested offline against a stolen fast digest."
      }
    },
    "q05": {
      "options": {
        "A": "Decoding exposes attacker-supplied claims without proving their authenticity or acceptability.",
        "B": "Selecting a candidate key is one step; verification and required claim checks must still succeed.",
        "C": "An issuer string can be copied or forged and does not replace signature, algorithm, or audience validation.",
        "D": "Claims become usable for security decisions only after the configured cryptographic and required semantic checks succeed."
      }
    },
    "q06": {
      "options": {
        "A": "A non-expired token can still have the wrong issuer, audience, type, key, or intended use.",
        "B": "Verification must enforce the application's trusted algorithms, keys, intended issuer and audience, time constraints, and required claim policy.",
        "C": "The application must constrain accepted algorithms rather than allowing the untrusted token to choose any supported one.",
        "D": "A valid signature can authenticate a token intended for another issuer context or audience, so those checks remain necessary."
      }
    },
    "q07": {
      "options": {
        "A": "These token types serve different protocol roles, so substituting them can grant or expose authority in the wrong context.",
        "B": "An ID token describes authentication to its intended client and is not a universal API access credential.",
        "C": "Refresh tokens often support longer-lived access and need handling suited to their distinct replay and lifecycle consequences.",
        "D": "Similar serialization does not make the represented authority or required storage protections interchangeable."
      }
    },
    "q08": {
      "options": {
        "A": "Browser scripts can read localStorage, whereas HttpOnly cookies block that direct script access and have different request risks.",
        "B": "Each location has different exposure paths through scripts, automatic requests, history, logs, and diagnostic tooling.",
        "C": "HTTPS does not keep a URL token out of browser history, logs, copied links, or referrer-related exposure paths.",
        "D": "Headers can be captured by diagnostics and telemetry unless appropriate redaction and access controls are applied."
      }
    },
    "q09": {
      "options": {
        "A": "Expiration limits duration but does not provide immediate containment, replay detection, or coordinated session invalidation.",
        "B": "Issuing another successor on detected refresh-token replay can preserve an attacker's access rather than contain it.",
        "C": "Lifecycle and monitoring controls limit useful exposure time and support detection, revocation, and response after issuance.",
        "D": "A process-local set does not automatically propagate revocations across replicas, restarts, and regions."
      }
    },
    "q10": {
      "options": {
        "A": "Unpredictable generation does not protect tokens from unsafe storage, validation, transport, logging, or lifecycle handling.",
        "B": "Expired credentials can remain sensitive in retained records, and full-value logging normalizes an avoidable exposure path.",
        "C": "JWT verification checks one use of the token and does not supply revocation, replay response, rotation, or monitoring.",
        "D": "A complete review follows tokens from generation through storage, validation, browser exposure, lifecycle controls, logging, and incident response."
      }
    }
  }
};
