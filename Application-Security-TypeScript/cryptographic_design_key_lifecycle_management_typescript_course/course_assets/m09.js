window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-647daac005",
  "questions": {
    "q1": {
      "options": {
        "A": "Base64 represents bytes as text without concealing them; confidentiality requires suitable encryption and protected keys.",
        "B": "Base64 is readily reversible and cannot replace a deliberately expensive password-verification construction.",
        "C": "An attacker can decode a stored Base64 value without finding the original string elsewhere.",
        "D": "Decoding needs only the encoding rules, so Base64 provides neither cryptographic confidentiality nor integrity."
      }
    },
    "q2": {
      "options": {
        "A": "Confidentiality-only encryption and JSON parsing do not establish cryptographic authenticity of the decrypted content.",
        "B": "A vetted AEAD design verifies integrity and expected context before making decrypted plaintext available for use.",
        "C": "Provisional plaintext must not be released before authentication succeeds, even when an AEAD algorithm is used.",
        "D": "An attacker able to alter data can often recompute an unkeyed hash, so it does not supply authentication."
      }
    },
    "q3": {
      "options": {
        "A": "Separate workers can repeat the same counter under one key unless their nonce spaces are coordinated.",
        "B": "Nonce secrecy does not make reuse safe; key-and-nonce reuse can violate the construction's security requirements.",
        "C": "Nonce uniqueness must hold across all users of the key, including restarts, recovery, and usage limits.",
        "D": "Relabeling unchanged key material does not create a distinct cryptographic key-and-nonce pair."
      }
    },
    "q4": {
      "options": {
        "A": "Timestamps and account identifiers are often predictable and do not supply suitable cryptographic key entropy.",
        "B": "Hashing weak random input changes representation but does not add the missing source entropy.",
        "C": "A random UUID's text and effective entropy do not automatically meet every algorithm's key format or size requirements.",
        "D": "Use an algorithm-appropriate cryptographic generator and required key size, then protect the resulting secret material."
      }
    },
    "q5": {
      "options": {
        "A": "Login verifiers should normally avoid reversible password storage and use a purpose-built password-hashing construction.",
        "B": "Fresh salts, deliberately expensive parameters, and versioned metadata support resistant and upgradeable password verification.",
        "C": "HKDF is not a substitute for a password-hashing construction designed to slow guessing of low-entropy passwords.",
        "D": "A salt prevents simple hash reuse but does not make a fast digest computationally expensive per guess."
      }
    },
    "q6": {
      "options": {
        "A": "Identical derivation context can produce the same material and does not establish distinct cryptographic purposes.",
        "B": "Renaming one shared key does not isolate its actual bytes or limit cross-protocol consequences.",
        "C": "Type aliases do not change key material or enforce cryptographic separation at runtime.",
        "D": "Independent keys or reviewed context-separated derivation isolate roles using distinct, explicit purpose labels."
      }
    },
    "q7": {
      "options": {
        "A": "Managed KEK custody does not prevent an application performing local encryption from handling plaintext data keys.",
        "B": "Wrapped data keys still require an authorized unwrapping authority or separately controlled key capable of recovering them.",
        "C": "KEK rotation alone does not automatically replace every DEK or re-encrypt all historical application data.",
        "D": "Envelope encryption can centralize wrapping-key control while plaintext DEKs still exist transiently during local cryptographic operations."
      }
    },
    "q8": {
      "options": {
        "A": "Following record-supplied paths or URLs can let untrusted metadata choose an unintended key source or destination.",
        "B": "Approved version mappings constrain historical key selection, and authentication must precede trusting decrypted record contents.",
        "C": "Trying arbitrary keys and accepting plausible-looking plaintext lacks a clear version contract and valid authentication decision.",
        "D": "Record metadata should select among approved formats and key roles rather than introduce arbitrary cryptographic configurations."
      }
    },
    "q9": {
      "options": {
        "A": "Destroying a historical key before migration can make remaining ciphertext and backups permanently unreadable.",
        "B": "Alias changes do not erase old key copies, rewrite ciphertext, or automatically rewrap all stored data keys.",
        "C": "Existing records retain their old cryptographic dependencies until migrated, while policy can direct new writes to the new key.",
        "D": "A shared logical purpose does not make ciphertext encrypted under one key decrypt correctly under another key."
      }
    },
    "q10": {
      "options": {
        "A": "Authenticated data still requires requester authorization for the actual resource and controlled handling of plaintext and keys.",
        "B": "A service's key permission does not grant every remote caller access to every record it can decrypt.",
        "C": "An embedded tenant identifier must be bound to trusted request context and checked against actual access policy.",
        "D": "Ciphertext authentication verifies protected content rather than proving that the requester is entitled to receive its plaintext."
      }
    }
  }
};
