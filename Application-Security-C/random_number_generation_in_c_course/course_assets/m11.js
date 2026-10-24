window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a8db5282d2",
  "questions": {
    "q1": {
      "options": {
        "A": "Repeatable generators have legitimate simulation and testing uses when unpredictability is not the required property.",
        "B": "Repeatability and resistance to guessing are distinct requirements even when some seed information is confidential.",
        "C": "The use case determines whether sequence reproduction, non-repetition, guessing resistance, or unbiased selection must be established.",
        "D": "Statistical appearance does not prove that simulation output resists an attacker predicting its internal sequence."
      }
    },
    "q2": {
      "options": {
        "A": "Security-oriented generators are designed for adversarial unpredictability rather than merely producing reproducible pseudo-random sequences.",
        "B": "Current time is a predictable seed and does not make a general-purpose generator cryptographically secure.",
        "C": "Output width does not establish cryptographic design, state protection, or safe integration.",
        "D": "Complete current-state compromise can expose future output; security guarantees depend on the generator and its recovery or reseeding design."
      }
    },
    "q3": {
      "options": {
        "A": "Concatenating predictable outputs increases length without establishing cryptographic unpredictability.",
        "B": "Irregular call timing does not turn rand's non-cryptographic sequence into an approved secure source.",
        "C": "A hidden seed and modulo operation do not repair a generator's unsuitable security properties.",
        "D": "Rand is not designed to protect secrets against prediction and is unsuitable for security-sensitive tokens or keys."
      }
    },
    "q4": {
      "options": {
        "A": "Clock intervals can coincide and their values can often be estimated by an attacker.",
        "B": "Predictable initialization narrows the possible generator states and can make derived outputs guessable.",
        "C": "Time and process identifiers are not automatically sufficient entropy for sensitive keys or tokens.",
        "D": "Discarding a few outputs does not establish security when the seed and generator remain predictable."
      }
    },
    "q5": {
      "options": {
        "A": "Keeping a custom algorithm secret does not establish a reviewed or secure random source.",
        "B": "Frequent seeding does not convert rand into a cryptographically designed generator.",
        "C": "Use an appropriate operating-system or reviewed cryptographic source and enforce its documented result and failure contract.",
        "D": "Even an approved source needs bounded failure handling; indefinite retry can stall the service."
      }
    },
    "q6": {
      "options": {
        "A": "Unbounded retries can prevent progress and need a deliberate availability and failure policy.",
        "B": "Failure or incomplete output must be detected before bytes are used as a sensitive key or token.",
        "C": "Zero-filled missing bytes reduce actual randomness even when the resulting buffer has the expected length.",
        "D": "Predictable fallback values silently weaken the security requirement when the approved source fails."
      }
    },
    "q7": {
      "options": {
        "A": "When source outcomes do not divide evenly among target outcomes, some remainders receive more possible source values.",
        "B": "A smaller target range does not guarantee that the source range is an exact multiple of it.",
        "C": "More bytes can reduce some imbalance but do not universally remove modulo bias without appropriate mapping.",
        "D": "Signed representation does not establish an unbiased mapping and can introduce additional range and sign-handling issues."
      }
    },
    "q8": {
      "options": {
        "A": "A counter can be easy to predict even when it never repeats.",
        "B": "Random selection can collide, so uniqueness needs an appropriate collision and identifier policy.",
        "C": "Resistance to guessing does not mathematically guarantee that generated values never repeat.",
        "D": "Uniqueness concerns repetition, while unpredictability concerns guessing; an identifier or token may require both."
      }
    },
    "q9": {
      "options": {
        "A": "Compiler optimization settings do not make a deliberately fixed generator seed unpredictable.",
        "B": "Accidentally enabling a test seed can reproduce production outputs that were required to resist prediction.",
        "C": "Logging a predictable seed does not prevent insecure output and can further expose generator information.",
        "D": "A production-selectable test mode needs explicit controls; a secure default alone does not prevent accidental activation."
      }
    },
    "q10": {
      "options": {
        "A": "Statistical tests can detect some output defects but cannot prove cryptographic unpredictability or correct integration.",
        "B": "A wrapper can centralize policy but still needs correct implementation, tests, and operational constraints.",
        "C": "Explicit requirements and reviewed integration make source selection, failures, range mapping, and deployment behavior consistently checkable.",
        "D": "Passing statistical tests does not establish the provenance or security properties of an undocumented random source."
      }
    }
  }
};
