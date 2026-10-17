window.COURSE_MODULE = {
  "title": "Password Authentication and Credential Storage",
  "graphicAlt": "A password-hashing library checks a submitted credential against a stored salted verifier, with CPU and memory cost tuned to the environment.",
  "narration": "Passwords should never be stored in plaintext or reversible form. A Node.js application should store password verifiers using password-hashing algorithms designed for credential storage, such as Argon2id, bcrypt, or scrypt, through well-maintained libraries. Password hashing is different from ordinary fast hashing. It is intentionally slower and configurable so large-scale guessing is more expensive. Salts should be unique per password and handled by the library or storage format correctly.\n\nThere is an engineering tradeoff in password-hashing parameters. Stronger parameters increase attacker cost, but they also consume server CPU and memory during legitimate logins. Teams should choose settings that fit the deployment environment, monitor performance, and plan to upgrade over time. They should avoid custom cryptography, homegrown password transformations, or storing enough information to recover the original password. Verification should compare the submitted password to the stored verifier through the selected library.\n\nPassword authentication also includes login abuse controls, account enumeration resistance, reset flows, and monitoring. Error messages should avoid confirming whether a specific account exists. Rate limiting, throttling, lockout design, bot protection, and alerts help defend login endpoints without creating unnecessary denial of service for legitimate users. Password change and reset flows should revalidate identity and invalidate risky existing sessions or tokens where appropriate.",
  "narrationPoints": [
    "Passwords should never be stored in plaintext or reversible.",
    "There is an engineering tradeoff in password-hashing.",
    "Password authentication also includes login abuse controls.",
    "js application should store password verifiers using.",
    "Salts should be unique per password and handled.",
    "Teams should choose settings that fit the deployment."
  ]
};
