window.COURSE_MODULE = {
  "title": "Recovery, Reset, and Lifecycle Controls",
  "graphicAlt": "Recovery proof and governed resets connect factor lifecycle, emergency controls, user notices and audit evidence.",
  "narration": "Recovery is where many MFA designs become fragile. Users lose devices, replace phones, forget backup codes, leave organizations, change roles, or need emergency access. The recovery process must balance security, availability, and support reality. If recovery is too weak, it undermines MFA. If recovery is impossible, legitimate users and operations may be locked out at critical moments.\n\nBackup code handling should be deliberate. Backup codes should be difficult to guess, limited in use, stored carefully by the user, protected by the application, and retired after use where appropriate. MFA reset should require suitable proof and should generate audit evidence. Help desk procedures need identity verification, approval boundaries, logging, and escalation paths, especially for privileged accounts.\n\nLifecycle governance connects MFA to joiner, mover, and leaver processes. New users may need enrollment before accessing protected resources. Users who change roles may need different factor requirements. Departing users should lose access through account disablement and session controls. Dormant accounts and stale factors should be reviewed. Factor expiration or replacement may be necessary when authenticator risk changes or when devices are lost.\n\nEmergency access should be designed before it is needed. Break-glass accounts, privileged recovery procedures, and incident response overrides require tight controls, monitoring, and after-action review. User notifications should accompany factor changes and resets when appropriate. Recovery should not be treated as a side door; it is part of the main identity lifecycle and must be protected as carefully as normal MFA verification.",
  "narrationPoints": [
    "Recovery is where many MFA designs become fragile.",
    "Backup code handling should be deliberate.",
    "Lifecycle governance connects MFA to joiner.",
    "Emergency access should be designed before it is needed.",
    "The recovery process must balance security.",
    "MFA reset should require suitable proof and should generate."
  ]
};
