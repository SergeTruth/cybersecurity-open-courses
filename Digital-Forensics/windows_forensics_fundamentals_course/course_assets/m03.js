window.COURSE_MODULE = {
  "title": "User Account and Activity Artifacts",
  "graphicAlt": "Blank placeholder graphic for Windows user account and activity artifacts",
  "narration": "User account and activity artifacts help analysts understand who could access a Windows system and what actions may be associated with an account. Accounts may be local, domain-based, cloud-connected, service-oriented, or temporary. Logon activity can appear in Windows Event Logs, EDR telemetry, remote access logs, identity provider records, and application logs. A strong investigation compares these sources instead of relying on one login event.\n\nUser profiles are rich evidence sources. Recent files, jump lists, link files, desktop artifacts, downloads, browser traces, application data, and shell activity can all help reconstruct what a user account did. Jump lists and shortcuts may show that a file, folder, or application was accessed. Browser and application traces may show web activity, downloads, cloud sync behavior, or document access.\n\nShellbags, at a high level, can provide clues about folder browsing behavior and viewed locations. They are useful because they may preserve traces of folders even when the folders are no longer present. Like other artifacts, they need context and corroboration. A shellbag clue does not automatically prove intent or explain how the activity occurred.\n\nLimits of user attribution are important. A user profile artifact may indicate activity under an account, but the account may have been shared, remotely accessed, compromised, or used by automation. Analysts should connect account artifacts with logons, timestamps, device context, network records, file activity, and business context. The goal is a defensible conclusion, not an overconfident guess.",
  "narrationPoints": [
    "User account and activity artifacts help analysts understand who could access a Windows system and what actions may be associated with an...",
    "User profiles are rich evidence sources.",
    "Shellbags, at a high level, can provide clues about folder browsing behavior and viewed locations.",
    "Limits of user attribution are important.",
    "Before entering a profile or known-folder lead, validate every path component and reject reparse points; Downloads, Desktop, Documents, and OneDrive remain lead lists because known folders can be redirected."
  ]
};
