window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a825e73286",
  "questions": {
    "q01": {
      "options": {
        "A": "Confidentiality depends on correct cryptographic use and protection of keys and plaintext boundaries.",
        "B": "Encryption does not justify omitting permission enforcement at the protected access boundary.",
        "C": "Cryptography cannot stop every deletion or automatically enforce freshness and replay rules.",
        "D": "Plaintext in memory remains sensitive and deserves deliberate lifetime and exposure controls."
      }
    },
    "q02": {
      "options": {
        "A": "Authenticated encryption protects bytes without deciding which users may retrieve them.",
        "B": "Business permissions must be enforced where data is accessed, not only when keys are generated.",
        "C": "Anyone authorized too broadly to decrypt may still disclose the recovered sensitive data.",
        "D": "Nonces are algorithm parameters rather than proof of the caller's business permission."
      }
    },
    "q03": {
      "options": {
        "A": "Authenticated modes combine confidentiality with checked integrity under their key, nonce, and tag requirements.",
        "B": "Authentication tags do not repair nonce reuse that violates an algorithm's security contract.",
        "C": "Data authentication does not independently identify or authorize the person supplying it.",
        "D": "Valid ciphertext can still be replayed unless the workflow enforces context and freshness."
      }
    },
    "q04": {
      "options": {
        "A": "Exposing the decryption key can defeat confidentiality despite a correct authentication tag.",
        "B": "Symmetric keys also need protection separate from broadly readable ciphertext copies.",
        "C": "Faster log rotation does not make logging decryption keys safe.",
        "D": "Access to both key and ciphertext can allow recovery of protected plaintext."
      }
    },
    "q05": {
      "options": {
        "A": "Required nonce size, unpredictability, and uniqueness depend on the specific construction.",
        "B": "Timestamps can collide or be predictable and do not satisfy every algorithm's nonce rules.",
        "C": "Follow the chosen algorithm's IV and nonce rules because misuse can break protection.",
        "D": "Reuse can compromise confidentiality or authentication rather than merely change formatting."
      }
    },
    "q06": {
      "options": {
        "A": "An authentication tag does not exist to encrypt or conceal the nonce.",
        "B": "Verify the tag and relevant authenticated context before accepting decrypted data as valid.",
        "C": "Tag verification proves a cryptographic condition rather than a user's resource access rights.",
        "D": "Authentication is part of the mode's contract and should not be skipped for stored ciphertext."
      }
    },
    "q07": {
      "options": {
        "A": "Recoverable password encryption unnecessarily exposes original credentials if decryption authority is compromised.",
        "B": "Store salted appropriately costly verifiers to make offline password guessing more expensive.",
        "C": "Unsalted fast digests permit efficient guessing despite uniqueness constraints on database records.",
        "D": "Base64 is reversible representation and does not provide password-verifier guessing resistance."
      }
    },
    "q08": {
      "options": {
        "A": "Field encryption protects selected values while complicating database operations and support workflows.",
        "B": "Ordinary secure ciphertext does not preserve plaintext ordering for existing indexes automatically.",
        "C": "Data classification still determines which fields need protection and appropriate access boundaries.",
        "D": "Decrypted values remain confidential and need controls on their use and disclosure."
      }
    },
    "q09": {
      "options": {
        "A": "Logging keys and plaintext creates reusable secrets and confidential data copies.",
        "B": "A client error status does not authorize disclosure of decrypted record values.",
        "C": "Separating logs does not make a disclosed cryptographic key nonconfidential.",
        "D": "Keep secrets and unnecessary cryptographic state out of logs and public failure responses."
      }
    },
    "q10": {
      "options": {
        "A": "Algorithm choice alone omits key access, nonce handling, failures, and operational exposure.",
        "B": "Review construction and its complete key, parameter, validation, lifecycle, and response assumptions.",
        "C": "Negative tests verify rejection of tampering, wrong context, missing keys, and other failures.",
        "D": "Application and infrastructure owners must jointly validate the entire protection and disclosure path."
      }
    }
  }
};
