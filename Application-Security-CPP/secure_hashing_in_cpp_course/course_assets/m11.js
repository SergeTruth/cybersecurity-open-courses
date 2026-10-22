window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-bf2111bad7",
  "questions": {
    "q1": {
      "options": {
        "A": "A digest is not an encoded copy designed for later plaintext recovery.",
        "B": "Hashing creates a digest, while encryption supports recovery using the appropriate key.",
        "C": "Encryption produces protected recoverable data rather than merely a fixed-length fingerprint.",
        "D": "Hexadecimal encoding changes representation and does not provide confidentiality by itself."
      }
    },
    "q2": {
      "options": {
        "A": "Digest size alone does not establish the properties required by a particular use case.",
        "B": "Passwords, signatures, and cache keys require different constructions and security assumptions.",
        "C": "Text encoding changes bytes' representation without supplying cryptographic authenticity or guessing resistance.",
        "D": "Select the construction according to whether the goal is fingerprinting, verification, or authentication."
      }
    },
    "q3": {
      "options": {
        "A": "Collision resistance makes finding two different inputs with the same digest computationally difficult.",
        "B": "Difficulty reversing a digest describes a different property from collision resistance.",
        "C": "Fixed-length digests can collide; collision resistance concerns finding matching outputs, not lengths.",
        "D": "Collision resistance does not remove future algorithm maintenance or migration obligations."
      }
    },
    "q4": {
      "options": {
        "A": "Short source code does not establish that a custom construction is cryptographically sound.",
        "B": "Reviewed cryptographic libraries can support C++ without inventing bespoke hashing algorithms.",
        "C": "Cryptographic security needs specialized design, implementation review, and ongoing maintenance.",
        "D": "Publishing a specification does not itself establish production suitability or implementation safety."
      }
    },
    "q5": {
      "options": {
        "A": "Salts and appropriate computational cost make low-entropy password guessing more expensive.",
        "B": "Fast general-purpose digests allow efficient offline guessing of likely passwords.",
        "C": "Recording password length does not impose the computational cost of a password KDF.",
        "D": "Work-factor policy must evolve as hardware and operational constraints change."
      }
    },
    "q6": {
      "options": {
        "A": "A shared application salt does not provide a distinct random salt for each record.",
        "B": "A salt is generally stored with a verifier and is not the secret authentication key.",
        "C": "Salted verifiers remain sensitive because attackers can use them for offline guessing.",
        "D": "Distinct salts prevent equal passwords from producing identical verifier records under the same parameters."
      }
    },
    "q7": {
      "options": {
        "A": "HMAC is a keyed authentication construction rather than a digest-labeling text format.",
        "B": "Knowing a public input format does not authenticate who computed an unkeyed digest.",
        "C": "A secret HMAC key lets authorized parties authenticate data against unauthorized modification.",
        "D": "Exposing the authentication key with public metadata lets attackers compute valid tags."
      }
    },
    "q8": {
      "options": {
        "A": "Equal structured values can have different field orders or byte encodings without canonical rules.",
        "B": "Define exact serialized bytes because hashing does not understand semantic equivalence.",
        "C": "Text can vary in whitespace, encoding, and normalization just as binary formats vary.",
        "D": "Producers and verifiers need agreed normalization rather than independently chosen equivalence rules."
      }
    },
    "q9": {
      "options": {
        "A": "Truncation reduces output space and can reduce the available cryptographic security margin.",
        "B": "A digest string does not inherently identify its algorithm or domain context.",
        "C": "Choose an unambiguous encoding and justify any truncation against the required security properties.",
        "D": "Comparison must respect the selected representation; case folding is not universally appropriate."
      }
    },
    "q10": {
      "options": {
        "A": "Stored formats and security policies can change and need explicit compatibility planning.",
        "B": "Migration needs deliberate handling of recognized older records rather than accidental incompatibility.",
        "C": "A security-oriented helper name does not prove the underlying construction is appropriate.",
        "D": "Versioned formats, tests, and migration procedures keep changing algorithms and policies manageable."
      }
    }
  }
};
