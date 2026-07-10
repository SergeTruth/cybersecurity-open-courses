window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Blank placeholder graphic for macOS forensics summary",
  "narration": "macOS forensics requires understanding system layout, user artifacts, logs, plists, persistence locations, file metadata, and application traces. /Users, /Library, ~/Library, /Applications, /System, and /private/var all help orient the investigation. User-specific Library data and application support folders are often especially important because they can reveal preferences, caches, saved state, browser data, and activity traces.\n\nStrong analysis preserves evidence and correlates multiple sources. Unified logs, install logs, application logs, recent items, plists, LaunchAgents, LaunchDaemons, login items, APFS metadata, quarantine attributes, browser artifacts, and endpoint telemetry can all contribute. Any one artifact may be incomplete, stale, misleading, or missing context. Correlation is what turns clues into defensible findings.\n\nCollection choices shape confidence. Disk images, snapshots, targeted collections, memory capture, log exports, hashes, chain of custody records, and case notes all help support defensible work. The analyst should explain what was collected, what was not collected, and how live system changes, encryption, retention, privacy settings, or management controls affect conclusions.\n\nThe goal is defensible understanding of what happened, when it happened, and what systems or users were affected. macOS forensics should support incident response, insider investigations, endpoint response, malware triage, and user activity analysis through careful evidence handling, honest limitations, and clear communication.",
  "narrationPoints": [
    "macOS forensics requires understanding system layout, user artifacts, logs, plists, persistence locations, file metadata, and application traces.",
    "Strong analysis preserves evidence and correlates multiple sources.",
    "Collection choices shape confidence.",
    "The goal is defensible understanding of what happened, when it happened, and what systems or users were affected."
  ]
};
