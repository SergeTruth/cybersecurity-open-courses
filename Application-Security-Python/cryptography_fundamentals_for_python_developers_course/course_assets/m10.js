window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-43d931af74",
  "questions": {
    "q01": {
      "options": {
        "A": "Use reviewed libraries and protocols matched to explicit security goals.",
        "B": "New custom ciphers lack the review and assurance of established designs.",
        "C": "Source embedded keys can spread through history, builds, and copies.",
        "D": "Verification failures need correction rather than bypassing the trust check."
      }
    },
    "q02": {
      "options": {
        "A": "Signer authenticity is a different objective from preventing disclosure.",
        "B": "Confidentiality restricts information disclosure to appropriately authorized recipients.",
        "C": "Unexpected modification concerns integrity rather than whether others can read data.",
        "D": "System availability concerns service operation rather than information disclosure."
      }
    },
    "q03": {
      "options": {
        "A": "Application colors do not establish whether protected information was modified.",
        "B": "Counting files does not verify that their contents remain unchanged.",
        "C": "Integrity checks detect unauthorized or unexpected modification of protected data.",
        "D": "Login speed does not establish the integrity of stored or transmitted information."
      }
    },
    "q04": {
      "options": {
        "A": "Key generation, storage, rotation, and recovery still need dedicated management.",
        "B": "Threat models improve design without guaranteeing the absence of every vulnerability.",
        "C": "A clear threat model still needs suitable algorithms and protocols.",
        "D": "Modeling clarifies protected data, adversaries, boundaries, and relevant failure modes."
      }
    },
    "q05": {
      "options": {
        "A": "Secure randomness supplies unpredictable values for keys, tokens, and applicable protocol nonces.",
        "B": "Log formatting is unrelated to generating unpredictable security sensitive values.",
        "C": "Compression reduces representation size rather than provides cryptographically unpredictable outputs.",
        "D": "Permission decisions remain necessary regardless of random token quality."
      }
    },
    "q06": {
      "options": {
        "A": "Embedded keys can be difficult to locate and replace across deployments.",
        "B": "Source, repositories, images, logs, and shared outputs can expose hardcoded keys.",
        "C": "Hardcoded string values are not automatically stored as protected ciphertext.",
        "D": "Embedded secrets still require ownership, protection, rotation, and incident handling."
      }
    },
    "q07": {
      "options": {
        "A": "Password reset is an account workflow rather than a symmetric encryption definition.",
        "B": "A logging representation does not define the keys used for encryption.",
        "C": "Symmetric encryption uses the same secret key for encryption and decryption.",
        "D": "Source formatting does not describe a cryptographic confidentiality mechanism."
      }
    },
    "q08": {
      "options": {
        "A": "Authenticated encryption does not decide whether a caller may access a resource.",
        "B": "Its keys still need secure generation, access control, and lifecycle management.",
        "C": "Password storage generally needs suitable hashing rather than reversible encryption.",
        "D": "Authenticated encryption combines confidentiality with detection of unauthorized ciphertext modification."
      }
    },
    "q09": {
      "options": {
        "A": "A cryptographic hash maps data to a fixed sized digest without intended reversibility.",
        "B": "A connection string configures database access rather than computes a digest.",
        "C": "Session cookies carry web state rather than define the general hashing primitive.",
        "D": "Hashing does not provide reversible confidentiality as encryption does."
      }
    },
    "q10": {
      "options": {
        "A": "Fast hashing makes guesses cheaper rather than preventing offline password attacks.",
        "B": "Speed lets attackers test large numbers of candidate passwords after verifier disclosure.",
        "C": "Hash algorithms do not automatically add another authentication factor.",
        "D": "Account recovery still needs separate secure processes and verification controls."
      }
    },
    "q11": {
      "options": {
        "A": "Salting password verifiers does not encrypt the entire underlying database.",
        "B": "A salt does not make a properly hashed password directly recoverable.",
        "C": "Unique salts make identical passwords produce distinct stored verifiers.",
        "D": "Login throttling still reduces online guessing independently of verifier salting."
      }
    },
    "q12": {
      "options": {
        "A": "Shared passwords do not define asymmetric public and private key pairs.",
        "B": "One source embedded secret lacks the distinct public and private roles.",
        "C": "An unkeyed checksum is not the public key cryptography model.",
        "D": "Public key systems use paired public and private keys for supported cryptographic operations."
      }
    },
    "q13": {
      "options": {
        "A": "Signatures can verify signed content integrity and its association with a signing key.",
        "B": "Signatures authenticate content without automatically encrypting database fields.",
        "C": "Verified content can still need format, range, and business validation.",
        "D": "A signed token can still expire and requires validity checks."
      }
    },
    "q14": {
      "options": {
        "A": "Certificate validation establishes trust and service identity rather than cosmetic appearance.",
        "B": "Disabling verification can establish encrypted transport to an unintended or untrusted server.",
        "C": "Identity checks do not prevent every application logic or access control defect.",
        "D": "Bypassing peer verification weakens authenticity rather than improves it."
      }
    },
    "q15": {
      "options": {
        "A": "A token may be present while forged, expired, or intended for another service.",
        "B": "Token length does not establish valid issuance or cryptographic integrity.",
        "C": "Check integrity and appropriate issuer, audience, expiration, and intended usage.",
        "D": "Frontend acceptance does not establish that the server should trust the token."
      }
    },
    "q16": {
      "options": {
        "A": "Custom cryptography introduces design risks without the review of established protocols.",
        "B": "Encoding changes representation and does not provide secret key confidentiality.",
        "C": "Authentic signed content still needs authorization for its intended application action.",
        "D": "Effective use combines clear goals, reviewed tools, key protection, validation, and operational ownership."
      }
    }
  }
};
