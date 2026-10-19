window.COURSE_MODULE = {
  "title": "Symmetric Encryption and Authenticated Encryption",
  "graphicAlt": "Authenticated encryption produces protected data that must pass integrity verification before use; tampered data is rejected.",
  "narration": "Symmetric encryption uses the same secret key for encryption and decryption. Python applications may use it to protect stored data, files, messages, backups, application secrets, or internal payloads at a high level. The central strength is efficiency and simplicity of a shared secret. The central challenge is key management: anyone who can decrypt must have access to the same secret key or to a service that can use it on their behalf.\n\nEncryption alone is not always enough. If a system only hides plaintext but does not detect unauthorized changes to ciphertext, an attacker may be able to tamper with encrypted data in ways the application does not expect. Authenticated encryption concepts combine confidentiality with integrity protection for ciphertext. The application can both keep data private and detect if the protected message was modified outside the intended process.\n\nInitialization values, nonces, and modes are areas where misuse becomes dangerous. Some encryption designs require a value to be unique, unpredictable, or never reused with the same key. Reusing a nonce or choosing an unsafe mode can weaken confidentiality or integrity even if the algorithm itself is strong. These details are one reason developers should prefer high-level library APIs that package safe choices together rather than manually assembling primitives.\n\nA safe encryption design should define what is encrypted, which key protects it, where the key lives, how nonces or initialization values are handled, how integrity is checked, how errors are reported, and how rotation works. Avoid treating encryption as a single function call that magically solves data protection. It is a small protocol inside your application, and it needs the same review and operational ownership as any other security boundary.",
  "narrationPoints": [
    "Symmetric encryption uses the same secret key.",
    "Encryption alone is not always enough.",
    "Initialization values, nonces, and modes are areas.",
    "A safe encryption design should define what is encrypted.",
    "Python applications may use it to protect stored data.",
    "These details are one reason developers should prefer."
  ]
};
