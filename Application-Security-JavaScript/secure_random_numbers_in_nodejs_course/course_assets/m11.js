window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-6c7e8cd910",
  "questions": {
    "q01": {
      "options": {
        "A": "Session identifiers, reset links, and similar bearer values need unpredictability because guessing them can grant access.",
        "B": "Hard-to-guess identifiers reduce enumeration but do not establish the caller's permission to access an object.",
        "C": "Many authentication and cryptographic boundaries depend on unpredictable values suited to their specific security purpose.",
        "D": "Random generation does not prevent generated secrets from being copied through logs, browser exposure, or intercepted traffic."
      }
    },
    "q02": {
      "options": {
        "A": "Uniqueness prevents duplication, while unpredictability prevents attackers from feasibly guessing a security-sensitive value.",
        "B": "Sequential identifiers can be unique while remaining straightforward for attackers to predict or enumerate.",
        "C": "One-time invalidation does not stop an attacker from predicting and redeeming the value before its intended user.",
        "D": "Cryptographic generation makes collisions unlikely at suitable lengths but does not mathematically guarantee uniqueness."
      }
    },
    "q03": {
      "options": {
        "A": "Hashing predictable or low-entropy output does not add entropy or make the original possibilities unguessable.",
        "B": "Math.random does not provide the cryptographic unpredictability required for authentication tokens and API keys.",
        "C": "Timestamps are often observable or guessable and do not reliably supply independent cryptographic entropy.",
        "D": "Account identifiers and expiration do not repair the weak randomness used to generate a secret key."
      }
    },
    "q04": {
      "options": {
        "A": "The argument counts bytes, so a 256-bit random value normally requires 32 bytes rather than 256.",
        "B": "Appropriate key generation uses cryptographic randomness or algorithm-specific APIs, not deterministic derivation from public account data.",
        "C": "Encoding changes representation and length, while the underlying random bytes determine the available entropy.",
        "D": "crypto.randomBytes provides strong random bytes for suitable tokens, salts, keys, and other security-sensitive material."
      }
    },
    "q05": {
      "options": {
        "A": "Modulo mapping is biased whenever the random source range is not evenly divisible by the desired range.",
        "B": "crypto.randomInt selects integers without the common bias introduced by reducing random bytes modulo a range.",
        "C": "Short codes still have small search spaces and require expiration, attempt limits, and abuse monitoring.",
        "D": "The upper bound is exclusive, so callers must choose their bounds to include the intended final value."
      }
    },
    "q06": {
      "options": {
        "A": "Small code spaces need account-bound verification, short validity, bounded attempts, rate limits, and monitoring against guessing.",
        "B": "Cryptographic randomness does not enlarge the finite search space of a six-digit verification code.",
        "C": "Longer validity gives attackers more opportunity to guess or reuse exposed codes rather than improving their strength.",
        "D": "Hashing stored codes protects storage in some threat models but does not increase their online search space."
      }
    },
    "q07": {
      "options": {
        "A": "Salts, nonces, and IVs have distinct purposes and cannot be treated as interchangeable random prefixes.",
        "B": "Each construction specifies its own uniqueness, unpredictability, length, and reuse requirements for these values.",
        "C": "Nonces and IVs often may be public; their required properties depend on the cryptographic construction.",
        "D": "Reusing one application-wide value can violate per-operation uniqueness or per-password salt requirements despite different keys."
      }
    },
    "q08": {
      "options": {
        "A": "A version 4 UUID can be difficult to guess without establishing the caller's authority over the referenced object.",
        "B": "Ordinary random object identifiers are not authorization decisions and can be exposed through legitimate application activity.",
        "C": "Servers must check access permissions even when the supplied object identifier is statistically hard to guess.",
        "D": "A tenant prefix names a tenant but does not prove membership or permission for the referenced object."
      }
    },
    "q09": {
      "options": {
        "A": "Logs retain and replicate bearer values, creating additional opportunities for unauthorized readers to obtain working secrets.",
        "B": "Including a digest alongside the full token leaves the complete usable secret exposed in the same log entry.",
        "C": "Short-lived secrets may be exposed while active, and log processing delays do not guarantee safe handling.",
        "D": "Authentication tokens can grant access regardless of whether their contents contain personal information themselves."
      }
    },
    "q10": {
      "options": {
        "A": "Importing node:crypto does not establish adequate entropy, correct encoding, protected storage, or a secure token lifecycle.",
        "B": "Statistical appearance cannot prove cryptographic unpredictability, safe secret handling, or appropriate operational security controls.",
        "C": "Length and collision checks leave purpose-specific cryptographic rules, disclosure paths, rotation, and compromise response unresolved.",
        "D": "Review must connect each value's purpose to generation, representation, storage, expiry, exposure controls, monitoring, and recovery behavior."
      }
    }
  }
};
