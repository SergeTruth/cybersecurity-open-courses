window.COURSE_MODULE = {
  "title": "Randomness, Keys, and Secrets",
  "graphicAlt": "Security-grade randomness supplies purpose-separated keys, with distinct production and development access and planned rotation and revocation.",
  "narration": "Cryptographic randomness is used to generate unpredictable keys, tokens, nonces, salts, session identifiers, and other security-sensitive values. Predictability is the enemy. A value that looks random to a person may still be predictable to software if it comes from the wrong source or is generated with insufficient entropy. Python developers should use secure random number generation facilities intended for security-sensitive values, not ordinary pseudo-random tools meant for simulations or games.\n\nKeys, passwords, and tokens are related but not interchangeable. A cryptographic key is usually high-entropy material used directly by an algorithm or protocol. A password is human-chosen and usually lower entropy, so it requires password hashing when stored. A token may represent access, identity, or a session depending on design. Treating a password like a key or treating a bearer token like harmless data can create serious mistakes.\n\nKey length concepts matter, but key handling often matters more in real systems. Strong keys must be generated correctly, stored safely, separated by purpose, rotated when required, revoked when exposed, and kept out of logs, source code, images, and broadly readable configuration. Key separation means one key should not be reused for unrelated purposes such as encryption, signing, testing, and production. Environment separation matters too: development keys should not unlock production data.\n\nSecret managers at a high level can help store and control access to keys and other sensitive values, but they do not remove the need for ownership. A Python service should access only the keys it needs. Hardcoded keys, predictable values, shared test secrets, and undocumented rotation paths are common sources of failure. In practice, randomness and key handling often determine whether a cryptographic design is safe, even when the algorithm name is modern and respected.",
  "narrationPoints": [
    "Cryptographic randomness is used to generate unpredictable.",
    "Keys, passwords, and tokens are related but not.",
    "Key length concepts matter.",
    "Secret managers at a high level can help store and control.",
    "Python developers should use secure random number.",
    "Key separation means one key should not be reused."
  ]
};
