window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7aeaad9fdc",
  "questions": {
    "q01": {
      "options": {
        "A": "Encryption still needs an explicit goal, correct parameters, trusted keys, and checked errors.",
        "B": "Encrypted storage still requires authorization over decryption and access to protected operations.",
        "C": "Local storage, signatures, passwords, and secret handling also need cryptographic engineering.",
        "D": "Define the security property, key trust, and failure policy before choosing cryptographic operations."
      }
    },
    "q02": {
      "options": {
        "A": "Cryptographic design and implementation require specialized analysis beyond ordinary functional correctness.",
        "B": "The central risk is security correctness rather than merely execution speed.",
        "C": "C++ applications can use reviewed libraries through suitable interfaces and ownership contracts.",
        "D": "Reviewed libraries still need maintenance, configuration review, and response to discovered vulnerabilities."
      }
    },
    "q03": {
      "options": {
        "A": "Clock-seeded mt19937 is predictable and unsuitable for generating cryptographic keys.",
        "B": "Use a cryptographic source and treat entropy-generation failures as security failures.",
        "C": "Outputs that look random can still be predictable to an attacker.",
        "D": "Nonce rules depend on the algorithm, and changing plaintext does not justify reuse."
      }
    },
    "q04": {
      "options": {
        "A": "Authenticated encryption still depends on secure key storage, access control, and rotation.",
        "B": "Payload authentication does not replace authenticating the expected TLS peer identity.",
        "C": "AEAD combines encryption with integrity checking when keys, nonces, and associated data are correct.",
        "D": "Do not act on plaintext before successful authentication under the library's safe API contract."
      }
    },
    "q05": {
      "options": {
        "A": "A MAC authenticates data using a shared secret; an ordinary hash has no secret.",
        "B": "Hashes and MACs do not provide reversible encryption and decryption operations.",
        "C": "Password storage needs a dedicated password KDF and appropriate cost and salt policy.",
        "D": "An unkeyed hash and keyed MAC provide different guarantees against malicious modification."
      }
    },
    "q06": {
      "options": {
        "A": "Fast unsalted digests allow efficient guessing and reveal equal passwords across accounts.",
        "B": "A hard-coded encryption key exposes recoverable passwords when the application key is obtained.",
        "C": "Logging plaintext passwords creates additional secret exposure even when diagnostic logs are protected.",
        "D": "A dedicated password system uses salts and an appropriate cost to resist offline guessing."
      }
    },
    "q07": {
      "options": {
        "A": "Signing authenticates content without necessarily hiding any of the signed bytes.",
        "B": "Successful verification under a trusted key establishes integrity and authenticity for those bytes.",
        "C": "Signature authenticity does not independently grant permission for every requested operation.",
        "D": "Signing does not automatically rotate, erase, or revoke the private key."
      }
    },
    "q08": {
      "options": {
        "A": "Skipping validation removes a trust check and does not strengthen encryption.",
        "B": "An HTTPS URL does not prove the certificate identifies the intended peer.",
        "C": "Connection failure should be diagnosed rather than bypassing certificate validation in production.",
        "D": "Without certificate validation, encryption can terminate at an impersonating peer."
      }
    },
    "q09": {
      "options": {
        "A": "Restrict access and copies, avoid logging, and retain secrets in approved storage.",
        "B": "Source-embedded keys spread through repositories, builds, and every distributed artifact.",
        "C": "Exception messages can propagate secrets into logs and monitoring systems.",
        "D": "Long-lived process-wide copies enlarge the exposure window and complicate cleanup."
      }
    },
    "q10": {
      "options": {
        "A": "Replacing a reviewed primitive with a shorter custom cipher weakens the assurance model.",
        "B": "Verification failures must stop the protected operation rather than become informational warnings.",
        "C": "Review the complete path through approved APIs, key handling, parameters, and checked failures.",
        "D": "Nonce requirements must be explicit and enforced according to the selected algorithm."
      }
    }
  }
};
