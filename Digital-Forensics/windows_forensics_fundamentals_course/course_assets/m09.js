window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Blank placeholder graphic for Windows forensics summary",
  "narration": "Windows forensics depends on correlating user activity, logs, registry artifacts, file system evidence, execution traces, and security telemetry. User profiles can show activity under an account. Event logs can show authentication, services, security events, and application behavior. Registry hives can reveal configuration, autoruns, device history, and user-specific artifacts. File system evidence can support timelines and execution analysis.\n\nStrong analysis preserves evidence and avoids overclaiming. A jump list entry, logon event, registry key, Prefetch artifact, scheduled task, or security alert may be important, but it is rarely enough by itself. Analysts should compare multiple sources, check timestamps, understand system context, and document gaps or uncertainty.\n\nCollection choices shape confidence. Full disk images, targeted collections, memory capture, log exports, registry exports, EDR telemetry, hashes, chain of custody records, and case notes all help make the work more defensible. The analyst should explain what was collected, what was not collected, and how those choices affect the conclusions.\n\nThe goal is defensible understanding. Windows forensics supports incident response, insider investigations, malware triage, and user activity reconstruction by answering what happened, when it happened, and what systems or accounts were affected. When the analysis is careful and evidence-based, it helps the organization make better decisions under pressure.",
  "narrationPoints": [
    "Windows forensics depends on correlating user activity, logs, registry artifacts, file system evidence, execution traces, and security telemetry.",
    "Strong analysis preserves evidence and avoids overclaiming.",
    "Collection choices shape confidence.",
    "The goal is defensible understanding.",
    "The capstone combines exact 100-nanosecond ordering, component containment, and shared run-to-mount provenance verification.",
    "Limited triage establishes its run context inside explicit error handling, so a context failure cannot break run-dependent error reporting."
  ]
};
