window.COURSE_MODULE = {
  "title": "MFA, Account Recovery, and Lifecycle Controls",
  "graphicAlt": "Enrollment and protected recovery both require verification before an account change, followed by appropriate revocation and review.",
  "narration": "MFA can reduce account takeover risk, but it must be designed with usability, recovery, and enrollment security in mind. An application that adds MFA but leaves weak reset and support flows may simply move attackers to the easier path. Enrollment, device changes, MFA reset, backup codes, remembered devices, and step-up prompts should be logged, reviewed, and tested because they affect the strength of the overall authentication system.\n\nRecovery flows are authentication flows and should be treated as high risk. Password reset, email change, device enrollment, account deletion, administrator invitation, role change, and MFA reset can all change who controls an account. Recovery links, one-time codes, and temporary credentials should be short-lived, single-use where appropriate, and protected from logs and unnecessary URL exposure. High-risk events may require reauthentication or stronger verification before the action completes.\n\nLifecycle controls should cover account disablement, lockout, session revocation, credential rotation, support procedures, and incident response. A user whose password is reset may need existing sessions invalidated. A disabled account should not continue using refresh tokens. A role change may require rechecking authorization in active sessions. The application should make these transitions explicit rather than treating account state as something checked only at login time.",
  "narrationPoints": [
    "MFA can reduce account takeover risk.",
    "Recovery flows are authentication flows and should.",
    "Lifecycle controls should cover account disablement.",
    "Recovery links, one-time codes, and temporary credentials.",
    "A disabled account should not continue using refresh tokens.",
    "The application should make these transitions explicit."
  ]
};
