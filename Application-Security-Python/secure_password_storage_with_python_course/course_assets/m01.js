window.COURSE_MODULE = {
  "title": "Why Password Storage Matters",
  "graphicAlt": "The application stores a verifier for comparison and cannot recover the original password.",
  "narration": "Password storage is a high-impact security design decision because it affects what happens after something has already gone wrong. A login system may work perfectly during normal use, but the real test is how much harm occurs if an authentication database, backup, log archive, export, or development copy is exposed. Secure password storage is designed to reduce that harm by making stored password verifiers difficult to turn back into usable passwords.\n\nPassword authentication, password storage, password reset, session management, and authorization are related but separate concerns. Password authentication verifies a user's claim during login. Password storage determines how the application keeps the information needed to verify future logins. Password reset changes or reestablishes that verifier. Session management carries authenticated state after login. Authorization decides what the authenticated user may do. A weakness in any one area can affect the others.\n\nPassword databases are attractive targets because users often reuse passwords across services. If one application stores plaintext passwords or reversible password data, a breach can affect not only that application but also email accounts, business systems, banking services, cloud portals, and other unrelated sites where users reused credentials. This is why plaintext password storage creates downstream risk far beyond the original database.\n\nSecure storage does not make passwords invincible. It does make password database exposure less immediately damaging. The application should never need to recover a user's password. It only needs to verify whether a submitted password matches a stored verifier. That shift from recovery to verification is the core principle behind responsible password storage in Python applications.",
  "narrationPoints": [
    "Password storage is a high-impact security design decision.",
    "Password authentication, password storage, password reset.",
    "Password databases are attractive targets.",
    "Secure storage does not make passwords invincible.",
    "Password storage determines how the application keeps.",
    "The application should never need to recover a user's."
  ]
};
