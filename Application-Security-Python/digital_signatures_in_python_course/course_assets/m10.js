window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3aea4aaa76",
  "questions": {
    "q01": {
      "options": {
        "A": "Signatures support authenticity and integrity checks for the exact signed content.",
        "B": "Public verification does not require hiding signed data from other readers.",
        "C": "A valid signature can be replayed unless separate freshness controls prevent reuse.",
        "D": "Signing is not encryption that restricts content recovery to the signer."
      }
    },
    "q02": {
      "options": {
        "A": "Signing authenticates content rather than primarily hides its readable bytes.",
        "B": "Signatures verify authenticity and integrity; encryption primarily protects confidentiality.",
        "C": "Matching key sizes do not make signing and encryption interchangeable operations.",
        "D": "An asymmetric signature does not inherently conceal the signed content."
      }
    },
    "q03": {
      "options": {
        "A": "A valid result matches the signed bytes, expected key, and approved signature scheme.",
        "B": "Signature verification does not establish whether transport kept the content confidential.",
        "C": "Application policy must separately decide whether the signing identity may perform the action.",
        "D": "Authentic signatures do not automatically grant every represented application permission."
      }
    },
    "q04": {
      "options": {
        "A": "A stolen signing key can produce signatures accepted under that key's identity.",
        "B": "One private key's disclosure does not reveal every verifier's unrelated private key.",
        "C": "Public keys normally verify signatures without requiring the signer's secret material.",
        "D": "Private key disclosure can enable forging new signatures, not merely verification."
      }
    },
    "q05": {
      "options": {
        "A": "The public key verifies signatures made using its corresponding private key.",
        "B": "Verification does not generally decrypt a confidential payload for readers.",
        "C": "A public key cannot create replacement signatures requiring the private key.",
        "D": "Sound public key schemes do not reconstruct the private key during verification."
      }
    },
    "q06": {
      "options": {
        "A": "An established library still needs safe algorithm and configuration choices.",
        "B": "Reviewed implementations reduce risks from custom primitives and unsafe cryptographic composition.",
        "C": "Both parties still need an agreed representation of the signed bytes.",
        "D": "Library quality does not remove key lifecycle, algorithm, or protocol decisions."
      }
    },
    "q07": {
      "options": {
        "A": "Canonical representation concerns consistent bytes rather than necessarily encrypting fields.",
        "B": "Pickle is not a universal or safe canonical representation for signed data.",
        "C": "Removing signed fields changes content and can invalidate the agreed signature.",
        "D": "Canonicalization defines consistent representations so equivalent intended content verifies predictably."
      }
    },
    "q08": {
      "options": {
        "A": "Equivalent JSON values can have different whitespace, ordering, or encodings.",
        "B": "Different serializations can produce different bytes and therefore different verification outcomes.",
        "C": "Inconsistent normalization between signer and verifier can break the security contract.",
        "D": "JSON compliance does not guarantee identical byte output from different encoders."
      }
    },
    "q09": {
      "options": {
        "A": "Do not perform trusted processing before establishing that the content verifies.",
        "B": "Trying arbitrary algorithms can bypass the protocol's approved verification requirements.",
        "C": "Verification should enforce the expected scheme rather than accept whichever algorithm succeeds.",
        "D": "Failed verification requires rejection or explicitly untrusted handling under the defined policy."
      }
    },
    "q10": {
      "options": {
        "A": "Signatures do not universally encode a complete application permission policy.",
        "B": "Signing a request does not establish ownership of every requested resource.",
        "C": "Key authenticity does not automatically confer all application privileges.",
        "D": "Verified identity still needs policy authorization for the requested action and resource."
      }
    },
    "q11": {
      "options": {
        "A": "Signature checks alone omit audience, issuer, time, and application purpose constraints.",
        "B": "Encryption strength and compression do not substitute for token identity and validity checks.",
        "C": "Validate signature integrity and relevant issuer, audience, expiry, and intended purpose.",
        "D": "A cryptographically valid token can still be expired or intended for another service."
      }
    },
    "q12": {
      "options": {
        "A": "Replay protection addresses repeated use rather than directly protects verifier key configuration.",
        "B": "Freshness checks do not inherently encrypt the signed payload after delivery.",
        "C": "A signature alone does not remember whether a message was already processed.",
        "D": "Replay defenses prevent reuse outside the signed message's intended context or lifetime."
      }
    },
    "q13": {
      "options": {
        "A": "Rotation manages replacement through creation, deployment, overlap, validation, and retirement.",
        "B": "Publishing a private key permits additional signatures attributed to its identity.",
        "C": "Reformatting existing signatures does not replace the keys that authorize signing.",
        "D": "Rotation changes key material rather than merely reencodes previous signatures."
      }
    },
    "q14": {
      "options": {
        "A": "Logs should support diagnosis without exposing keys, tokens, or unnecessary signed content.",
        "B": "Verification failure does not justify printing sensitive private key material.",
        "C": "Full payloads can disclose sensitive information and are not universally needed.",
        "D": "Restricted telemetry can leak and is not an appropriate store for private keys."
      }
    },
    "q15": {
      "options": {
        "A": "A signature need not decrypt content, so this is not a valid success criterion.",
        "B": "Malformed signatures should not be accepted merely because the key identifier is current.",
        "C": "One valid case misses tampering, wrong keys, stale context, and malformed inputs.",
        "D": "Negative tests should cover wrong keys, modified bytes, malformed signatures, and invalid context."
      }
    },
    "q16": {
      "options": {
        "A": "HMAC uses a shared secret and is not a publicly verifiable signature scheme.",
        "B": "Use reviewed libraries, protected keys, exact byte contracts, strict checks, and managed rotation.",
        "C": "Signatures alone do not provide confidentiality, authorization, or complete replay prevention.",
        "D": "HMAC verifiers possess signing capability, unlike public key signature verifiers."
      }
    }
  }
};
