window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-10db0c0bb3",
  "questions": {
    "q1": {
      "options": {
        "A": "Authentication requires trusted cryptographic verification, required claim checks, and deliberate construction of the resulting request identity.",
        "B": "A token's chosen algorithm name is untrusted until checked against server policy and actual cryptographic verification.",
        "C": "Matching a static interface and token structure does not authenticate its issuer or prove its integrity.",
        "D": "Required claims must be validated after trusted verification; their unverified presence alone is insufficient."
      }
    },
    "q2": {
      "options": {
        "A": "A recognized key identifier does not authorize every algorithm supported by the JWT library.",
        "B": "Token headers describe requested verification parameters but must not define the server's acceptance policy.",
        "C": "Broad acceptance increases ambiguity and attack surface rather than safely preparing for unspecified issuer migrations.",
        "D": "A narrow configured algorithm policy with compatible key types keeps verification within the intended issuer trust model."
      }
    },
    "q3": {
      "options": {
        "A": "A valid signature from a trusted issuer does not make a token intended for another audience acceptable here.",
        "B": "APIs using one identity provider can still have distinct audiences and token acceptance requirements.",
        "C": "Matching scope names do not override the API's required intended-audience check.",
        "D": "A known subject and future expiry do not compensate for the token being issued to a different API."
      }
    },
    "q4": {
      "options": {
        "A": "Recent issuance does not supply the required expiry, and clock tolerance does not create a missing claim.",
        "B": "A jti names a token but does not enforce single use without suitable server-side state or protocol controls.",
        "C": "Required expiration must be present and valid; issued-at and an identifier do not provide equivalent expiry or replay protection.",
        "D": "Signing-key rotation is not a substitute for the API's explicit token lifetime requirements."
      }
    },
    "q5": {
      "options": {
        "A": "Keys must remain bound to the correct issuer; matching identifiers across issuers do not establish equivalent trust.",
        "B": "A bounded refresh from the configured trusted set permits legitimate rotation without accepting arbitrary keys or unbounded work.",
        "C": "Deriving a fetch destination from an unknown identifier lets token input influence a sensitive outbound trust boundary.",
        "D": "Unbounded entries and retrieval retries permit resource exhaustion and do not establish a valid verification key."
      }
    },
    "q6": {
      "options": {
        "A": "An attacker-controlled key set can verify the attacker's token without establishing the configured issuer's authority.",
        "B": "HTTPS authenticates the chosen remote endpoint, not its authority to issue tokens trusted by this API.",
        "C": "Issuer configuration should select the trusted key source, with limited caching and refresh independent of arbitrary token URLs.",
        "D": "Untrusted issuer text cannot define a new key authority, and indefinite result caching ignores expiry and revocation requirements."
      }
    },
    "q7": {
      "options": {
        "A": "Verified custom claims still need runtime shape and semantic checks before mapping a minimal authenticated application context.",
        "B": "Truthiness does not establish a tenant identifier's type, meaning, issuer-defined semantics, or validity.",
        "C": "A signature authenticates token contents under a key but does not prove conformance to an erased TypeScript interface.",
        "D": "Copying all claims into a domain model can expose unintended fields and confuse token identity with persisted account state."
      }
    },
    "q8": {
      "options": {
        "A": "Authentication of a token does not authenticate unrelated request-body fields such as a caller-selected tenant identifier.",
        "B": "Frontend filtering can be bypassed and cannot enforce the server's tenant or object access rules.",
        "C": "Broad scopes do not automatically authorize every project returned by an unrestricted global lookup.",
        "D": "Resource access needs required scopes plus object permission and trusted tenant context or explicitly verified membership."
      }
    },
    "q9": {
      "options": {
        "A": "HttpOnly limits script access to cookies but does not justify indefinite refresh-token reuse or remove lifecycle abuse risks.",
        "B": "A bounded protected refresh flow needs replay and revocation handling, and logout must account for still-valid access tokens.",
        "C": "Refresh tokens should remain limited to their intended flow rather than serving as interchangeable access credentials.",
        "D": "Deleting one cookie does not revoke copied credentials or immediately invalidate all previously issued access tokens."
      }
    },
    "q10": {
      "options": {
        "A": "HttpOnly does not make refresh tokens safe to copy into diagnostic systems where operators or attackers may read them.",
        "B": "A token rejected here can remain usable elsewhere or expose sensitive claims and should not be logged whole.",
        "C": "Bounded metadata and failure categories support diagnosis without propagating bearer tokens through logs, proxies, or traces.",
        "D": "Restricted logs still create additional credential copies, so Authorization headers should be excluded or appropriately redacted."
      }
    }
  }
};
