window.COURSE_MODULE = {
  "title": "Windows Event Logs",
  "graphicAlt": "Blank placeholder graphic for Windows Event Logs",
  "narration": "Windows Event Logs are one of the most important sources for forensic analysis. The Security log can include authentication, account management, privilege use, policy changes, and other security-relevant activity depending on audit settings. The System log can show service starts, driver events, shutdowns, and operating system issues. The Application log can contain application-specific events.\n\nPowerShell logs, when enabled, can provide useful evidence about script execution and command activity. Defender logs may show malware detections, remediation actions, configuration changes, and protection events. EDR products often add another layer of telemetry, such as process creation, network connections, file activity, and behavioral alerts. Each source has strengths and gaps.\n\nEvent IDs are useful reference points, but Windows forensics is not only memorizing event numbers. The meaning of an event depends on audit policy, operating system version, domain configuration, endpoint controls, and surrounding activity. A logon event should be interpreted with the logon type, account, source, target system, timestamp, and related events.\n\nRetention matters. Logs may be overwritten, archived, cleared, forwarded, or unavailable. Missing or cleared logs are worth investigating, but they do not automatically prove malicious action. Analysts should compare local logs with centralized logging, domain controller records, EDR telemetry, cloud identity records, and other sources. Event logs are powerful when they are part of a larger timeline.",
  "narrationPoints": [
    "Windows Event Logs are one of the most important sources for forensic analysis.",
    "PowerShell logs, when enabled, can provide useful evidence about script execution and command activity.",
    "Event IDs are useful reference points, but Windows forensics is not only memorizing event numbers.",
    "Retention matters.",
    "Offline event derivatives validate every parent component and preserve duplicate EventData names as indexed records alongside source hashes and raw XML."
  ]
};
