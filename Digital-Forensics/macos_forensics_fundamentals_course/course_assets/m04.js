window.COURSE_MODULE = {
  "title": "Logs and Unified Logging",
  "graphicAlt": "Blank placeholder graphic for macOS logs and unified logging",
  "narration": "macOS unified logging is a major event source for modern Mac investigations. Unified logs can contain system, application, security-relevant, and operational events across time. They can help analysts understand application behavior, service activity, device state, authentication-related clues, installation events, and errors. The challenge is that unified logs can be high volume and require careful filtering by time range, process, subsystem, category, or keywords.\n\nTraditional logs and application-specific logs still matter. Install logs can show software installation and update activity. Application logs may record errors, user actions, synchronization behavior, or service activity. Endpoint security products, management agents, VPN clients, browser tools, collaboration apps, and developer tools may all produce their own records. Investigators should know which logs are native, which are third-party, and which are centrally forwarded.\n\nRetention and time ranges are important. Older logs may be rotated, compressed, expired, overwritten, or unavailable depending on system settings and collection timing. Unified log availability can vary by macOS version, log level, privacy behavior, and whether the system is still live. Missing logs are not automatic proof of tampering, but gaps should be documented and compared with other sources.\n\nLogs must be correlated with other evidence. A log line can provide a useful lead, but it may be incomplete or ambiguous without file metadata, user artifacts, application data, endpoint telemetry, or cloud records. Good log analysis asks what the event shows, what it does not show, and what other evidence can confirm or challenge the interpretation.",
  "narrationPoints": [
    "macOS unified logging is a major event source for modern Mac investigations.",
    "Traditional logs and application-specific logs still matter.",
    "Retention and time ranges are important.",
    "Logs must be correlated with other evidence."
  ]
};
