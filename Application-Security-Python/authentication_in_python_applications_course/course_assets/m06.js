window.COURSE_MODULE = {
  "title": "MFA, Passkeys, and Account Recovery",
  "graphicAlt": "Signed-in users and recovery requests both face appropriate verification before sensitive account actions, with protected recovery and review.",
  "narration": "Multi-factor authentication means requiring more than one type of proof before granting access or completing a sensitive action. The exact method may be an authenticator app, one-time code, push approval at a high level, hardware-backed authenticator, passkey, or another supported factor. MFA reduces reliance on passwords alone, but it still needs secure enrollment, reset, recovery, user education, and monitoring.\n\nPasskeys and phishing-resistant authentication concepts are important because they can reduce the value of stolen passwords and some social engineering patterns. The implementation details will change over time, so the durable principle is to prefer authentication methods that bind proof to the legitimate service and reduce reusable shared secrets. Python applications often rely on identity providers or mature libraries for these flows rather than building protocol details directly.\n\nEnrollment and recovery are as important as normal sign-in. Backup codes, MFA reset, device changes, and help desk processes can become weak paths if they are easier to abuse than the primary login. Recovery flows should be logged, rate limited where appropriate, verified carefully, and designed to avoid exposing account details. A support process that bypasses strong MFA without controls can undo the value of MFA.\n\nStep-up authentication is useful for higher-risk actions or contexts. A user may be signed in for ordinary browsing but still need additional proof before changing MFA settings, exporting sensitive data, updating payment information, changing administrative roles, or rotating credentials. The goal is not to add friction everywhere. The goal is to apply stronger proof where the risk justifies it and to make recovery paths just as carefully protected as primary login paths.",
  "narrationPoints": [
    "Multi-factor authentication means requiring more than one.",
    "Passkeys and phishing-resistant authentication concepts.",
    "Enrollment and recovery are as important as normal sign-in.",
    "Step-up authentication is useful for higher-risk actions.",
    "Recovery flows should be logged, rate limited.",
    "MFA reduces reliance on passwords alone."
  ]
};
