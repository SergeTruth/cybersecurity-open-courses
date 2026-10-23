window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ec91f61e43",
  "questions": {
    "q01": {
      "options": {
        "A": "Readable stored passwords expose users immediately after database compromise.",
        "B": "Strong verifiers slow offline guessing after stored credentials are exposed.",
        "C": "Password storage supports authentication rather than replacing identity checks.",
        "D": "Authorization remains necessary regardless of password storage protection strength."
      }
    },
    "q02": {
      "options": {
        "A": "Plaintext exposes actual passwords across compromised records and copied artifacts.",
        "B": "Reset flows should replace passwords rather than recover stored plaintext.",
        "C": "MFA does not require storing the underlying password in plaintext.",
        "D": "Plaintext storage does not prevent users reusing compromised passwords elsewhere."
      }
    },
    "q03": {
      "options": {
        "A": "Password hashes are intended for verification rather than reversible recovery.",
        "B": "Encryption is designed to be reversible with the appropriate key.",
        "C": "Hashing supports one-way verification while encryption permits authorized reversal.",
        "D": "Hashing and encryption provide different properties and operational purposes."
      }
    },
    "q04": {
      "options": {
        "A": "Salts do not require making passwords public or exposing plaintext.",
        "B": "Password salts do not encrypt the entire credential database.",
        "C": "Online rate limits remain useful alongside salted password hashing.",
        "D": "Unique salts keep identical passwords from producing identical stored verifiers."
      }
    },
    "q05": {
      "options": {
        "A": "Store salts with verifiers; uniqueness rather than secrecy provides their role.",
        "B": "Salts are not normally the application's primary secret credential.",
        "C": "Users still authenticate with passwords or other enrolled factors.",
        "D": "Salts are used in hashing even though normally public."
      }
    },
    "q06": {
      "options": {
        "A": "Fast hashes allow attackers to test many guesses quickly.",
        "B": "General purpose hash speed makes exposed password guesses inexpensive.",
        "C": "Hash functions do not automatically enroll additional authentication factors.",
        "D": "Account recovery still needs independent secure design and implementation."
      }
    },
    "q07": {
      "options": {
        "A": "Work factors describe hash computation cost rather than employment roles.",
        "B": "Reset email presentation does not determine password hashing cost.",
        "C": "Work factor settings control computational effort for password verification.",
        "D": "Backup labels do not set the cost of password hashing."
      }
    },
    "q08": {
      "options": {
        "A": "Zero cost would weaken resistance to offline password guessing.",
        "B": "Hash cost directly affects security, server load, and login latency.",
        "C": "Monitoring complements appropriate hash cost rather than being replaced.",
        "D": "Tune cost to resist guessing within acceptable workload capacity."
      }
    },
    "q09": {
      "options": {
        "A": "Memory requirements raise the cost of large scale password guessing.",
        "B": "Database indexing does not define memory-hard password hashing behavior.",
        "C": "Password manager appearance is separate from password verifier computation.",
        "D": "Log formatting does not establish the memory cost of hashing."
      }
    },
    "q10": {
      "options": {
        "A": "Custom cryptography can introduce subtle and dangerous implementation mistakes.",
        "B": "Vetted libraries implement important hashing details more consistently than custom code.",
        "C": "Password hashing should not make stored passwords reversibly recoverable.",
        "D": "Library use still requires integration testing and configuration review."
      }
    },
    "q11": {
      "options": {
        "A": "Public usernames are identifiers rather than shared cryptographic secret values.",
        "B": "A pepper supplements rather than replaces appropriate password hashing.",
        "C": "Peppers are additional secrets used alongside salts and password hashes.",
        "D": "Ordinary profile preferences do not provide secret hashing protection."
      }
    },
    "q12": {
      "options": {
        "A": "Peppers introduce an additional secret requiring controlled operational management.",
        "B": "Hashing remains necessary when a pepper supplements stored verifiers.",
        "C": "Public storage defeats the intended secrecy of a pepper.",
        "D": "Pepper protection requires access, rotation, and recovery planning beyond hashing."
      }
    },
    "q13": {
      "options": {
        "A": "Bound lifetime and use count while making reset tokens unpredictable.",
        "B": "Reusable logged tokens provide persistent opportunities for unauthorized resets.",
        "C": "Username derived tokens can be predictable and easy to guess.",
        "D": "Reset flows should not disclose or reuse current plaintext passwords."
      }
    },
    "q14": {
      "options": {
        "A": "Rehashing upgrades verifiers without retaining the user's password in plaintext.",
        "B": "Successful authentication allows safe migration to stronger hash parameters.",
        "C": "Rehashing depends on successful verification rather than disabling checks.",
        "D": "Hash upgrades do not require sharing passwords with other systems."
      }
    },
    "q15": {
      "options": {
        "A": "Timestamps can support authentication investigation without revealing credential values.",
        "B": "Appropriate identifiers can support event attribution under access controls.",
        "C": "Credentials and recovery tokens should not appear in authentication logs.",
        "D": "Controlled failure categories are useful without exposing authentication secrets."
      }
    },
    "q16": {
      "options": {
        "A": "Reversible password storage increases the impact of key or database compromise.",
        "B": "Fast unsalted hashes make offline guessing and cross-account correlation easier.",
        "C": "Stored verifier quality directly affects authentication security after exposure.",
        "D": "Use vetted salted hashing and protect recovery, logging, and migration lifecycles."
      }
    }
  }
};
