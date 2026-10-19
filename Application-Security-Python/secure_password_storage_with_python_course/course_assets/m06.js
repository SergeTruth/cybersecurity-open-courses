window.COURSE_MODULE = {
  "title": "Password Reset and Account Recovery",
  "graphicAlt": "Controlled recovery replaces the verifier, protects reset secrets and applies explicit session policy.",
  "narration": "Password reset is part of password storage security because recovery can bypass the normal login path. A strong hash does not protect an account if reset tokens are predictable, long-lived, reusable, logged, or sent through uncontrolled channels. Reset tokens should be difficult to guess, limited in lifetime, and single-use where practical. The application should never disclose the current password during reset because the current password should not be recoverable.\n\nReset link handling needs careful design. Links may travel through email systems, browser history, mobile previews, security scanners, and support tools. The application should treat reset tokens as sensitive secrets, avoid logging them, and avoid exposing them in unnecessary places. User-facing messages should avoid revealing whether an account exists when that would create enumeration risk, while still giving legitimate users a usable recovery path.\n\nAccount recovery often extends beyond email. MFA reset, backup codes, help desk workflows, identity proofing, and support overrides may all affect the user's ability to regain access. These flows can undermine strong authentication if they are easier to abuse than the primary login. Recovery actions should be logged, rate limited where appropriate, reviewed for unusual patterns, and designed with clear ownership and escalation rules.\n\nPassword changes may need to affect existing sessions and tokens. In some systems, changing a password should invalidate active sessions or require reauthentication for sensitive actions. In other systems, the effect may depend on risk, user experience, and identity provider behavior. The important principle is to define the policy deliberately. Recovery paths must be protected as carefully as login paths because they can become the most attractive route into an account.",
  "narrationPoints": [
    "Password reset is part of password storage security.",
    "Reset link handling needs careful design.",
    "Account recovery often extends beyond email.",
    "Password changes may need to affect existing sessions.",
    "A strong hash does not protect an account if reset tokens.",
    "Reset tokens should be difficult to guess."
  ]
};
