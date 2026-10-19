window.COURSE_MODULE = {
  "title": "Alerting and Human-in-the-Loop Review",
  "narration": "Alert design begins with a defined reviewer and response. Route events by location, schedule, type, and severity. Immediate notification should be reserved for events with a legitimate time-sensitive action, while lower-priority candidates enter a review queue.\n\nAcross multiple cameras, one event may appear in several feeds. Correlation and grouping should combine related detections into a single case with a timeline and relevant views. Cooldowns prevent an ongoing condition from generating repeated notifications.\n\nConfidence thresholds, zones, object size, duration, and schedules can reduce noise. They do not remove uncertainty. When evidence is weak, the interface should mark the event for ordinary review rather than escalate it as a confirmed incident.\n\nHuman reviewers need the event clip, neighboring time, camera identity, model output, and available context. They should be able to confirm, dismiss, defer, annotate, and escalate. High-consequence action should not rely on an unreviewed model label.\n\nDocument decisions and outcomes. Feedback can identify duplicate cameras, harmless recurring motion, poor placement, model drift, or an escalation rule that no longer fits operations. Protect review queues and notes with role-based access.\n\nMeasure relevance, missed events, duplicate rate, time to review, escalation outcome, and reviewer workload. Alert fatigue is an architecture failure, not a reviewer weakness. A sustainable system sends fewer, better-supported events to people who know what to do with them.",
  "graphicAlt": "Related detections become contextual cases that accountable reviewers confirm, dismiss or defer with recorded decisions.",
  "narrationPoints": [
    "Alert design begins with a defined reviewer and response.",
    "Across multiple cameras, one event may appear in several feeds.",
    "Confidence thresholds, zones, object size, duration, and schedules can reduce noise.",
    "Human reviewers need the event clip, neighboring time, camera identity, model output, and available context."
  ]
};
