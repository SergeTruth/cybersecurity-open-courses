window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-54ada0804a",
  "questions": {
    "q01": {
      "options": {
        "A": "Nonrepeating characters do not ensure a sequence is unpredictable.",
        "B": "Secure random generation does not mathematically guarantee zero collisions.",
        "C": "Complex appearance does not make deterministic values unpredictable to attackers.",
        "D": "Secret values need sufficient entropy and attacker resistant unpredictability."
      }
    },
    "q02": {
      "options": {
        "A": "Simulation generators are unsuitable when attackers might predict security values.",
        "B": "The core issue is predictability rather than operating system speed.",
        "C": "The random module is not a fixed-key encryption token scheme.",
        "D": "Output formatting is separate from the generator's security suitability."
      }
    },
    "q03": {
      "options": {
        "A": "Encoded length does not prove the underlying source is unpredictable.",
        "B": "Independent randomness still permits collisions with some nonzero probability.",
        "C": "Entropy measures unpredictable information rather than merely encoded character count.",
        "D": "Reproducible stored seeds do not ensure attacker resistant secret values."
      }
    },
    "q04": {
      "options": {
        "A": "The secrets module exposes randomness intended for sensitive security uses.",
        "B": "Time based seeds do not make simulation randomness cryptographically secure.",
        "C": "UUID punctuation does not prove the generation method is secure.",
        "D": "Hashing predictable inputs does not create new unpredictable information."
      }
    },
    "q05": {
      "options": {
        "A": "Seed length alone does not make repeatable test output suitable secrets.",
        "B": "Regenerating past bearer values undermines secrecy and credential lifecycle safety.",
        "C": "Environment labels and start times can be guessed by attackers.",
        "D": "Deterministic output helps tests but defeats production secret unpredictability."
      }
    },
    "q06": {
      "options": {
        "A": "Reset tokens grant sensitive authority and should not be permanent identifiers.",
        "B": "Password salts do not enable recovery of the original password.",
        "C": "Reset tokens carry temporary authority to change an account password.",
        "D": "A reset bearer value provides access rather than only diagnostic correlation."
      }
    },
    "q07": {
      "options": {
        "A": "Expiration limits time, not the entropy of existing token bytes.",
        "B": "Short validity reduces the usable lifetime of stolen reset credentials.",
        "C": "Replay protection remains useful while tokens are still unexpired.",
        "D": "Long validity expands the opportunity for a stolen token's misuse."
      }
    },
    "q08": {
      "options": {
        "A": "Salts and nonces are not universally secrets like bearer credentials.",
        "B": "Exclude usable credentials and sensitive key material from operational records.",
        "C": "Encoding does not make session identifiers or reset links harmless.",
        "D": "Logging once can disclose usable credentials before any later redaction."
      }
    },
    "q09": {
      "options": {
        "A": "Salts do not make password hashing reversibly recoverable across devices.",
        "B": "Salts differ from a shared secret pepper and need uniqueness.",
        "C": "Salts complement appropriate hashing cost rather than replace its algorithm.",
        "D": "Unique salts make identical passwords yield different stored verifier values."
      }
    },
    "q10": {
      "options": {
        "A": "Salts normally need uniqueness rather than confidential storage with verifiers.",
        "B": "Salt disclosure does not directly reveal the password without guessing.",
        "C": "Salt confidentiality is not the basis of password hash uniqueness.",
        "D": "Reusing one salt undermines the intended per-password uniqueness property."
      }
    },
    "q11": {
      "options": {
        "A": "Nonce reuse can break cryptographic scheme assumptions and message security.",
        "B": "Protocols require nonce uniqueness or one-time use within defined contexts.",
        "C": "Password salts and protocol nonces have different roles and requirements.",
        "D": "Different plaintext does not generally make repeated nonces safe."
      }
    },
    "q12": {
      "options": {
        "A": "Nonce reuse can compromise confidentiality or integrity in affected schemes.",
        "B": "Fresh tags do not universally compensate for repeated encryption nonces.",
        "C": "Repeated nonces can invalidate the scheme's intended security guarantees.",
        "D": "Secure generation does not make reusing an existing nonce safe."
      }
    },
    "q13": {
      "options": {
        "A": "Collisions and unequal range probabilities are distinct random generation concerns.",
        "B": "Encoding alphabet choice alone does not define modulo range bias.",
        "C": "Biased mapping makes certain output values more likely than others.",
        "D": "Sorting does not repair an incorrectly biased range mapping procedure."
      }
    },
    "q14": {
      "options": {
        "A": "Entropy depends on source and alphabet rather than characters alone.",
        "B": "Choose entropy and representation to meet threat and lifecycle needs.",
        "C": "TLS does not compensate for an easily guessed short credential.",
        "D": "Long tokens still need expiry, storage protection, and revocation controls."
      }
    },
    "q15": {
      "options": {
        "A": "Review token generation for accidental use of predictable random APIs.",
        "B": "Deterministic testing does not make deterministic production secrets more secure.",
        "C": "Operating system randomness does not need a predictable timestamp added.",
        "D": "Implicit generator state still makes random unsuitable for security tokens."
      }
    },
    "q16": {
      "options": {
        "A": "Expiry and hashing cannot reliably compensate for predictable bearer tokens.",
        "B": "Encoding predictable values does not create cryptographically unpredictable entropy.",
        "C": "Issuance controls do not automatically enforce later storage and lifecycle safety.",
        "D": "Use secure randomness with adequate entropy and protected credential lifecycles."
      }
    }
  }
};
