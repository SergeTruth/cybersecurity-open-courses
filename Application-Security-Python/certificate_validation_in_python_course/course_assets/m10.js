window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6d89471bf3",
  "questions": {
    "q01": {
      "options": {
        "A": "An encryption capable key alone does not establish trusted service identity.",
        "B": "Cipher negotiation is different from validating the certificate's identity and trust.",
        "C": "Validation determines whether the certificate is trusted for the intended use.",
        "D": "A modern cipher does not establish that its endpoint certificate is trustworthy."
      }
    },
    "q02": {
      "options": {
        "A": "Certificates normally bind identities to public keys rather than one session's symmetric key.",
        "B": "A certificate binds a named subject or identity to a public key.",
        "C": "Serial numbers identify certificates and do not cover every issuer operated service.",
        "D": "Session encryption keys are negotiated separately from the identity certificate binding."
      }
    },
    "q03": {
      "options": {
        "A": "Trust anchors must come from approved trust configuration rather than arbitrary endpoint selection.",
        "B": "Intermediate certificates do not remove the need to match the intended service name.",
        "C": "Chains establish a path from the endpoint through intermediates to a trusted anchor.",
        "D": "A trusted chain still needs identity matching for the intended connection."
      }
    },
    "q04": {
      "options": {
        "A": "A cache of observed endpoints is not inherently a configured set of trusted authorities.",
        "B": "A host allowlist controls destinations rather than defines certificate trust anchors.",
        "C": "A trust store contains authorities or anchors the validator is configured to trust.",
        "D": "Unconditionally learning roots from an endpoint lets that endpoint choose its own trust."
      }
    },
    "q05": {
      "options": {
        "A": "Certificate serial numbers do not define the authorized DNS or IP identity.",
        "B": "Hostname validation matches the certificate against the service identity the client intended.",
        "C": "A CA issues certificates without necessarily operating the endpoint's service.",
        "D": "DNS resolution alone does not make a different certificate name the intended identity."
      }
    },
    "q06": {
      "options": {
        "A": "Without validation, clients can accept a malicious or unintended peer.",
        "B": "Encryption can remain enabled while reliable endpoint authentication is lost.",
        "C": "Disabled validation can remove more checks than merely enforcing certificate expiry.",
        "D": "An encrypted channel can terminate at an attacker without authenticating the expected service."
      }
    },
    "q07": {
      "options": {
        "A": "Transport encryption does not prove ownership of every application resource referenced.",
        "B": "A strong cipher does not establish whether the correct peer received the connection.",
        "C": "Encryption without identity checks can protect a channel to the wrong endpoint.",
        "D": "Modern cryptography still needs identity validation to authenticate the intended application endpoint."
      }
    },
    "q08": {
      "options": {
        "A": "Reject failed validation using a documented failure path that preserves trust requirements.",
        "B": "An empty trust store does not resolve the underlying trust validation problem.",
        "C": "Warnings do not protect confidentiality once data is sent to an unverified peer.",
        "D": "Retrying while accepting the same untrusted certificate bypasses the failed security boundary."
      }
    },
    "q09": {
      "options": {
        "A": "A public CA is not made private by storing its certificate in an application directory.",
        "B": "A private CA is organization managed and needs explicit client trust configuration.",
        "C": "A self signed endpoint certificate and an internal issuing CA are different roles.",
        "D": "Network membership alone does not install or approve a private trust anchor."
      }
    },
    "q10": {
      "options": {
        "A": "Standard cryptographic libraries can verify supported signatures from private authorities.",
        "B": "Configure approved trust for the intended private authority in each relevant client environment.",
        "C": "Expiry validation can remain enabled when private roots are appropriately trusted.",
        "D": "Matching a subject name alone does not establish trusted certificate issuance."
      }
    },
    "q11": {
      "options": {
        "A": "Global trust installation permits more than pinning one specific peer certificate or key.",
        "B": "Trusting every certificate from an issuer is broader than a specific pin.",
        "C": "Pinning limits accepted certificate or key identities and needs operational lifecycle planning.",
        "D": "Pinning does not inherently accept every certificate issued by the endpoint's CA."
      }
    },
    "q12": {
      "options": {
        "A": "Stale pins can reject legitimate certificate rotation or emergency key replacement.",
        "B": "Pinning does not automatically override certificate validity dates for replacements.",
        "C": "Pins do not prevent servers including intermediate certificates in their chains.",
        "D": "Keys can require replacement, so pinning needs explicit rotation and recovery preparation."
      }
    },
    "q13": {
      "options": {
        "A": "Mutual TLS lets both peers present certificates and validate each other's identity.",
        "B": "Peers do not need to share the same private key and certificate.",
        "C": "Mutual TLS uses certificates rather than exchanging users' passwords between peers.",
        "D": "Sharing one identity and private key would undermine distinct peer authentication."
      }
    },
    "q14": {
      "options": {
        "A": "Client certificates do not universally encode every permitted application action.",
        "B": "Tenant and object access checks remain necessary after certificate authentication.",
        "C": "Trusted identity alone does not justify unrestricted access to every operation.",
        "D": "mTLS authenticates peers while application policy separately authorizes requested actions."
      }
    },
    "q15": {
      "options": {
        "A": "Bounded protocol, expiry, and validation results can provide safe troubleshooting context.",
        "B": "Bounded fingerprints and correlation identifiers can support investigation without exposing secret keys.",
        "C": "Logs should omit private keys, credentials, tokens, and unnecessary sensitive details.",
        "D": "Restricted logs can still leak, so private keys should not be printed there."
      }
    },
    "q16": {
      "options": {
        "A": "Parsing an HTTPS URL does not validate the endpoint's certificate.",
        "B": "Trusted chains, identity checks, safe failures, testing, and lifecycle management support validation.",
        "C": "Server supplied roots cannot be accepted automatically as independent trust anchors.",
        "D": "Certificate validity does not replace application policy, identity context, and lifecycle decisions."
      }
    }
  }
};
