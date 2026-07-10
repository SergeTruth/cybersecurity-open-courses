window.COURSE_MODULE = {
  "title": "Registry Forensics",
  "graphicAlt": "Blank placeholder graphic for Windows registry forensics",
  "narration": "The Windows Registry is a database of system, application, and user configuration information. It is divided into hives that may represent machine-wide settings, security configuration, software configuration, and user-specific settings. Registry artifacts can help analysts understand startup behavior, installed software, user activity, device history, network settings, and application configuration.\n\nUser registry hives are especially valuable because they can preserve activity tied to a profile. Recently used items, mounted devices, typed paths, application settings, shell activity, and user preferences may all appear in registry data depending on the system and application. System hives can reveal services, drivers, autoruns, installed software, and configuration changes.\n\nAutoruns and startup locations are important because they show programs or scripts configured to start automatically. Run keys, services, scheduled tasks, startup folders, and other mechanisms may be legitimate administration or relevant to persistence analysis. The goal is defensive interpretation: identify what is configured, when it changed, whether it fits the system role, and what evidence supports that view.\n\nRegistry evidence needs context and corroboration. Some entries are stale, some are updated by normal system activity, and some are indirect indicators rather than direct proof. A USB history entry, recent file reference, or installed software key may be meaningful, but it should be compared with timestamps, event logs, file system evidence, user profile artifacts, and case context before becoming a conclusion.",
  "narrationPoints": [
    "The Windows Registry is a database of system, application, and user configuration information.",
    "User registry hives are especially valuable because they can preserve activity tied to a profile.",
    "Autoruns and startup locations are important because they show programs or scripts configured to start automatically.",
    "Registry evidence needs context and corroboration."
  ]
};
