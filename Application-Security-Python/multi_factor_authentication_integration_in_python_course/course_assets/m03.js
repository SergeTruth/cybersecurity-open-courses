window.COURSE_MODULE = {
  "title": "MFA Methods and Authenticator Strength",
  "graphicAlt": "Authenticator selection considers risk, phishing/replay resistance, enrollment, recovery and usability; local unlock remains within the device.",
  "narration": "MFA methods provide different levels of assurance. One-time passcodes from authenticator apps are common and familiar. Push approvals can be convenient but need careful monitoring and user clarity. SMS and email codes may be useful in some environments, but they are often weaker options because they depend on communication channels and account recovery paths outside the application. Hardware security keys and passkeys can provide stronger resistance to some phishing and replay risks when implemented correctly.\n\nAuthenticator strength is not only a technical label. It includes resistance to phishing, replay, social engineering, device loss, operational failure, and user confusion. A method that is strong on paper may still fail if enrollment is weak, recovery is easy to abuse, support teams bypass the process, or users cannot understand what they are approving. Security and usability have to be designed together.\n\nBackup codes are an important recovery mechanism, not a casual convenience. They can provide an alternate path into an account when the primary factor is unavailable, so they should be generated, displayed, stored, used, and retired carefully. Biometrics at a high level often act as a local unlock mechanism for a device or authenticator, so applications should understand what proof they actually receive rather than assuming the biometric itself is sent to the server.\n\nChoosing MFA methods requires matching risk to context. Consumer accounts, internal tools, privileged administration, financial actions, health data access, and service operations may need different assurance levels. Accessibility also matters. Strong MFA should not lock out legitimate users unnecessarily. The durable design principle is to choose authenticators that fit the risk, protect enrollment and reset, and give users a clear and supportable path through the process.",
  "narrationPoints": [
    "MFA methods provide different levels of assurance.",
    "Authenticator strength is not only a technical label.",
    "Backup codes are an important recovery mechanism.",
    "Choosing MFA methods requires matching risk to context.",
    "Strong MFA should not lock out legitimate users.",
    "A method that is strong on paper may still fail."
  ]
};
