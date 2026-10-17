window.COURSE_MODULE = {
  "title": "Password Authentication and Credential Storage",
  "graphicAlt": "Vetted login handling combines salted verifier storage, abuse controls, protected recovery and safe security-event logging.",
  "narration": "Password authentication remains common in Python applications, even when single sign-on and passkeys are also available. Passwords create familiar risks: reuse across sites, weak choices, automated guessing, credential stuffing concepts at a high level, and support burdens when users forget them. A secure password flow does not rely only on user behavior. It combines vetted libraries, safe storage, throttling, monitoring, recovery controls, and clear user guidance.\n\nPlaintext passwords, reversible password storage, hardcoded credentials, and password logging are unacceptable because exposure of a database, log file, repository, or backup can directly expose user secrets. Applications should store password verifiers, not passwords. Salted password hashing helps make stored password data resistant to simple reuse if a database is exposed. Hashing parameters should be chosen through established library and framework guidance and revisited over time as systems evolve.\n\nLogin flows need resistance to automated abuse without creating unnecessary denial of service for legitimate users. Rate limiting, throttling, progressive delays, account monitoring, and careful lockout tradeoffs can reduce guessing and credential stuffing risk at a high level. Error messages should avoid confirming whether a username or password was the failed part. Logs should capture useful security events without recording secrets.\n\nPassword reset is part of password security, not an afterthought. A weak recovery flow can undermine strong password storage. Reset tokens, recovery links, support processes, and identity verification steps need careful lifetime, single-use behavior, logging, and user notification. When possible, developers should lean on mature framework-supported patterns and identity services rather than inventing credential handling from scratch.",
  "narrationPoints": [
    "Password authentication remains common in Python.",
    "Plaintext passwords, reversible password storage, hardcoded.",
    "Login flows need resistance to automated abuse.",
    "Password reset is part of password security.",
    "Applications should store password verifiers, not passwords.",
    "Hashing parameters should be chosen through established."
  ]
};
