window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c3cc5874b8",
  "questions": {
    "q1": {
      "options": {
        "A": "Random identifiers do not themselves encrypt the associated application content.",
        "B": "Random-looking values can grant authority and therefore require careful security review.",
        "C": "Unpredictable security values make guessing sessions, reset capabilities, and challenges harder.",
        "D": "An identifier becomes security-sensitive when knowing it is sufficient to obtain access."
      }
    },
    "q2": {
      "options": {
        "A": "Security generators must resist prediction rather than deliberately expose replayable token sequences.",
        "B": "Repeatability supports simulations, while security values require resistance to attacker prediction.",
        "C": "A private seed does not transform a simulation generator into a reviewed cryptographic construction.",
        "D": "Predictable replay and adversarial unpredictability are different design goals for random sources."
      }
    },
    "q3": {
      "options": {
        "A": "Simulation PRNGs produce deterministic sequences without the security guarantees required for tokens.",
        "B": "A clock seed is guessable and does not make a general-purpose engine cryptographic.",
        "C": "The issue is prediction resistance, not merely the number of possible output values.",
        "D": "Deleting recorded outputs does not establish that a deterministic engine resists state prediction."
      }
    },
    "q4": {
      "options": {
        "A": "The standard does not universally require a hardware entropy source for random_device.",
        "B": "Implementation differences can affect security suitability as well as performance.",
        "C": "Varied samples do not prove unpredictability or acceptable entropy-source behavior.",
        "D": "Verify the deployed implementation and use an approved source for security-sensitive generation."
      }
    },
    "q5": {
      "options": {
        "A": "These values are often observable, guessable, or drawn from a small uncertainty space.",
        "B": "Combining predictable process information does not establish independent cryptographic entropy.",
        "C": "An application-configured counter remains predictable if its progression or initial value is known.",
        "D": "A fixed seed yields repeatable values even if that seed is not logged."
      }
    },
    "q6": {
      "options": {
        "A": "Cryptographic sources can still fail, so callers must verify complete successful generation.",
        "B": "Seeding a simulation engine from a provider does not change the engine's design guarantees.",
        "C": "Approved platform sources provide reviewed generation intended to resist adversarial prediction.",
        "D": "Caller-specific weak fallbacks can silently undermine a centrally approved random-source policy."
      }
    },
    "q7": {
      "options": {
        "A": "Different roles have different unpredictability, uniqueness, lifetime, and reuse requirements.",
        "B": "Password salts normally need uniqueness and appropriate generation rather than key-like secrecy.",
        "C": "Nonce reuse can break security even when the cryptographic key remains confidential.",
        "D": "Specify generation and handling requirements according to each value's cryptographic role."
      }
    },
    "q8": {
      "options": {
        "A": "A smaller bound does not guarantee that source values divide evenly among outcomes.",
        "B": "Uneven division gives some residues more source values and therefore higher probability.",
        "C": "Rejection sampling can remove mapping bias when implemented with an appropriate source.",
        "D": "Widening a type does not by itself ensure divisibility or uniform mapping."
      }
    },
    "q9": {
      "options": {
        "A": "A production fixed-seed mode can make security tokens predictable during troubleshooting.",
        "B": "An undocumented reachable test hook can still force predictable production security values.",
        "C": "Keep repeatable fixtures separate from production paths that require approved unpredictable generation.",
        "D": "Matching sample outputs or interfaces does not grant a deterministic fixture cryptographic properties."
      }
    },
    "q10": {
      "options": {
        "A": "Documented length cannot compensate for predictable seeds or an unapproved generator.",
        "B": "Review source selection, failure handling, testing separation, and sensitive-value exposure to prevent regressions.",
        "C": "Recording a value's role does not make secret tokens or keys safe to log.",
        "D": "Provider selection must include tested behavior for unavailable or failing random generation."
      }
    }
  }
};
