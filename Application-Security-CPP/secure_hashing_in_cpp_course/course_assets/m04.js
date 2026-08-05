window.COURSE_MODULE = {
  "title": "Password Hashing Is Different",
  "graphicAlt": "Hashing workflow for Password Hashing Is Different, tracing canonical input through an approved cryptographic provider to versioned digest metadata, bounded verification, and a documented acceptance or migration decision.",
  "narration": "Password storage is not the same as hashing a file. Passwords are often human-chosen and lower entropy than random keys. A fast general cryptographic hash can be excellent for fingerprints while still being the wrong construction for stored passwords because speed helps large-scale guessing. Password storage needs mechanisms designed for that purpose, not an ordinary digest wrapped in local conventions.\n\nApproved password hashing or key-derivation mechanisms use salts and configurable cost parameters. A salt helps ensure that identical passwords do not produce identical stored values across accounts or systems. Work factors and memory cost are intended to make verification acceptable for the legitimate service while making bulk guessing more expensive. Those parameters should be stored with the verifier so they can be upgraded over time as policy changes.\n\nC++ applications should keep password handling narrow and careful. Do not log passwords, password-derived values, reset secrets, or verification material. Keep storage formats versioned enough to support migration. Separate password verifier logic from general hashing utilities so a developer cannot accidentally choose a fast digest because the helper was easy to call. Review should ask whether salts are generated correctly, parameters are current, and upgrade behavior has been tested. The verification path should also handle legacy records deliberately so old formats do not remain accepted forever by accident.",
  "narrationPoints": [
    "Password storage needs mechanisms designed for that purpose, not an ordinary digest wrapped in local conventions.",
    "Approved password hashing or key-derivation mechanisms use salts and configurable cost parameters.",
    "Review should ask whether salts are generated correctly, parameters are current, and upgrade behavior has been tested.",
    "Separate password verifier logic from general hashing utilities so a developer cannot accidentally choose a fast digest because the helper was easy to call.",
    "The verification path should also handle legacy records deliberately so old formats do not remain accepted forever by accident.",
    "C++ applications should keep password handling narrow and careful."
  ]
};
