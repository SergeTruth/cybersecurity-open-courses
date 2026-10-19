window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "One-way verifiers, appropriate parameters, recovery, migration and operations reduce password exposure impact.",
  "narration": "Secure password storage in Python means passwords are never stored in plaintext or reversible form. The application should not be able to recover a user's password. It should only be able to verify a submitted password against a stored verifier created with a vetted password hashing approach. This design reduces the harm if a password database, backup, export, or development copy is exposed.\n\nStrong designs use mature password hashing libraries, per-password salts, appropriate work factors, safe secret handling, protected recovery flows, migration planning, and careful logging. Salts provide uniqueness, not secrecy. Peppers, if used, are shared secrets that require serious operational planning. Work factors must balance offline attack resistance with user experience, server capacity, and availability.\n\nPassword storage is connected to authentication architecture, account recovery, session management, monitoring, incident response, and user trust. Password reset flows must be protected as carefully as login. Password changes may need session effects. Legacy hashes need migration plans. Authentication logs should support defense without recording credentials or reset secrets. Abuse monitoring helps identify when password controls are being stressed.\n\nThe goal is not to make passwords invincible. The goal is to reduce the damage caused by password database exposure and make authentication systems safer to operate. Durable password security comes from simple, reviewed implementation, vetted libraries, explicit parameters, safe reset workflows, tested migrations, privacy-aware logs, and continuous improvement as technology and threat patterns change.",
  "narrationPoints": [
    "Secure password storage in Python means passwords are never.",
    "Strong designs use mature password hashing libraries.",
    "Password storage is connected to authentication.",
    "The goal is not to make passwords invincible.",
    "The application should not be able to recover a user's.",
    "It should only be able to verify a submitted password."
  ]
};
