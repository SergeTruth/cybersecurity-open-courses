window.COURSE_MODULE = {
  "title": "Password Hashing Concepts",
  "graphicAlt": "Unique salts and appropriate cost produce stored verifiers for one-way verification.",
  "narration": "Hashing and encryption are often confused, but they solve different problems. Encryption is designed to be reversible with the right key. Password hashing for storage is designed for one-way verification. During login, the application processes the submitted password with the stored parameters and compares the result to the stored verifier. It should not decrypt or recover the original password because recovery should not be possible.\n\nA salt is a unique value used with each password before hashing. When used correctly, per-password salts help ensure that two users with the same password do not have the same stored verifier. Salts also make broad precomputed comparisons less useful. Salts are normally stored with the password hash because their role is uniqueness, not secrecy. A missing or reused salt weakens the design because repeated passwords become easier to recognize.\n\nWork factors and computational cost are what make password hashing intentionally expensive. A good password hashing design should be slow enough to make large-scale offline guessing difficult if hashes are exposed, but not so slow that normal login, account creation, and reset flows become unreliable. Memory-hard hashing concepts add memory cost as part of the defensive design, making some large-scale guessing strategies harder to scale.\n\nFast general-purpose hashes are not appropriate for password storage because speed helps attackers test guesses quickly after a hash database is exposed. Password storage should use vetted password hashing algorithms through mature libraries or framework-supported patterns. Custom implementations are risky because small mistakes in salts, parameters, comparisons, encoding, or upgrades can undermine the entire control.",
  "narrationPoints": [
    "Hashing and encryption are often confused.",
    "A salt is a unique value used with each password.",
    "Work factors and computational cost are what make password.",
    "Fast general-purpose hashes are not appropriate.",
    "It should not decrypt or recover the original password.",
    "Password storage should use vetted password hashing."
  ]
};
