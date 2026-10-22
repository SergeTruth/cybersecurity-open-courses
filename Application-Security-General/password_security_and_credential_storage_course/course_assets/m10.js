window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7285fd1cff",
  "questions": {
    "q01": {
      "options": {
        "A": "Plaintext disclosure immediately reveals the passwords themselves instead of protected verifiers.",
        "B": "Easier credential disclosure does not make authentication safer for users.",
        "C": "Reset workflows can replace passwords without storing recoverable original values.",
        "D": "Password storage and additional authentication factors address different security requirements."
      }
    },
    "q02": {
      "options": {
        "A": "Password hashing supports verification rather than deliberate reversible password recovery.",
        "B": "Store a verifier derived from the password rather than plaintext.",
        "C": "Cookie attributes govern session delivery rather than stored password verification.",
        "D": "Session duration does not define how a password verifier is computed."
      }
    },
    "q03": {
      "options": {
        "A": "Salts should not expose the original password to administrators or operators.",
        "B": "Password salts do not encrypt database connections or network traffic.",
        "C": "Unique salts separate equal passwords and undermine reusable precomputed guessing tables.",
        "D": "Salts accompany password hashing and do not replace the hashing construction."
      }
    },
    "q04": {
      "options": {
        "A": "Visual presentation has no bearing on computational password-verification cost.",
        "B": "Database table names do not specify password-guessing resistance or algorithm cost.",
        "C": "Email templates are separate from password verifier processing parameters.",
        "D": "A work factor tunes the resources required for each password computation."
      }
    },
    "q05": {
      "options": {
        "A": "Cheap hashing lets attackers test many guesses against stolen verifier records.",
        "B": "General-purpose hashes do not universally generate unique salts for password storage.",
        "C": "Fast hashes can be guessed efficiently when candidate passwords are predictable.",
        "D": "Stored verifier design complements rather than replaces account-abuse monitoring."
      }
    },
    "q06": {
      "options": {
        "A": "Base64 represents bytes and is not a costly password-verification algorithm.",
        "B": "Argon2 is designed for password hashing with configurable resource costs.",
        "C": "ROT13 is reversible text substitution rather than secure password verification.",
        "D": "Plain fast SHA-1 lacks a dedicated password KDF's guessing-cost controls."
      }
    },
    "q07": {
      "options": {
        "A": "A username is typically public identification rather than an additional secret.",
        "B": "Browser headers are not the definition of a password-storage pepper.",
        "C": "A pepper is a separately protected secret added to a verifier design.",
        "D": "A recovery email belongs to account workflow rather than verifier secret parameters."
      }
    },
    "q08": {
      "options": {
        "A": "Password-hashing libraries store verifiers rather than deliberately make passwords plaintext.",
        "B": "Salts remain important when using a maintained password-verification implementation.",
        "C": "Storage libraries do not prevent every phishing or session compromise threat.",
        "D": "Reviewed implementations reduce subtle mistakes in custom password-storage schemes."
      }
    },
    "q09": {
      "options": {
        "A": "Attackers replay previously exposed username-password pairs against other services.",
        "B": "Transport encryption protects credentials rather than testing leaked pairs elsewhere.",
        "C": "Backup rotation is unrelated to automated reuse of breached login credentials.",
        "D": "Salting verifiers is different from trying exposed plaintext credential pairs."
      }
    },
    "q10": {
      "options": {
        "A": "Attempt budgets do not make stored password hashes reversibly decryptable.",
        "B": "Limits constrain automated guessing and repeated attempts using leaked credential pairs.",
        "C": "Additional factors still provide protection beyond limiting request frequency.",
        "D": "Safe authentication events remain useful for detecting abuse and tuning limits."
      }
    },
    "q11": {
      "options": {
        "A": "Reset tokens can grant account control and should remain confidential.",
        "B": "Recovery credentials should have narrow purpose and bounded validity.",
        "C": "A stolen usable reset token can let another party change account credentials.",
        "D": "Logging full recovery links creates another reusable credential exposure path."
      }
    },
    "q12": {
      "options": {
        "A": "Password changes can indicate that prior session authority should be reassessed.",
        "B": "Revoking potentially exposed sessions can restore the intended account security boundary.",
        "C": "Session invalidation is possible when designed into session and revocation controls.",
        "D": "Existing sessions may belong to an attacker or predate the user's recovery intent."
      }
    },
    "q13": {
      "options": {
        "A": "Review collection, verification, diagnostics, and comparison paths for credential exposure and misuse.",
        "B": "Debug logs should not preserve reusable plaintext credentials or secret input.",
        "C": "Recovery tokens need intentional expiry and reuse rules for account protection.",
        "D": "Hash parameters determine resistance and need deliberate validation and upgrade policy."
      }
    },
    "q14": {
      "options": {
        "A": "Rehashing updates a verifier without recovering a password from its stored digest.",
        "B": "After successful verification, upgrade storage to the current approved cost and format.",
        "C": "Upgrading a verifier does not require disabling additional authentication factors.",
        "D": "A verifier migration should not create plaintext password diagnostic records."
      }
    },
    "q15": {
      "options": {
        "A": "Recoverable plaintext creates unnecessary credential exposure and account compromise opportunities.",
        "B": "Routine administrator recovery is not the purpose of password-verifier storage.",
        "C": "Use purpose-built verifiers with unique salts, suitable cost, and protected operations.",
        "D": "Optimizing solely for speed makes offline password guessing cheaper for attackers."
      }
    }
  }
};
