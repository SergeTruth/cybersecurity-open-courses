window.COURSE_MODULE = {
  "title": "Telemetry Quality and Coverage",
  "graphicAlt": "Instructional illustration for Telemetry Quality and Coverage.",
  "narration": "Telemetry quality determines whether collected data can support a decision. Completeness asks whether required activity is represented. Accuracy asks whether fields describe the correct event. Reliable asset mapping, units, identities, protocol decoding, and status values are all part of quality.\n\nTime synchronization is essential for correlation. Controllers, servers, remote sites, and security platforms may use different clocks or time zones. Record clock sources, expected drift, and timestamp meaning so investigators can build a defensible sequence of events.\n\nRetention should reflect investigation needs, source volume, operational cycles, legal constraints, and storage cost. Normalization makes data searchable across systems, but it must preserve source detail. Overly broad parsing can hide important industrial fields or produce misleading values.\n\nCoverage is the portion of important activity that the program can observe. Gaps may include serial networks, encrypted sessions, dormant assets, unsupported devices, local engineering actions, or sites without sensors. A coverage map should connect use cases to sources and state limitations openly.\n\nNoisy data creates a different gap between collection and visibility. Duplicate alarms, unstable asset names, missing fields, parser errors, and excessive low-value events consume attention. Monitor source health, event rate, delay, loss, schema changes, and enrichment success.\n\nQuality control is continuous. Assign source owners, test changes, investigate collection failures, protect integrity, and review whether retained data still supports operations and security. A large archive is not a telemetry program unless teams can find, trust, interpret, and act on what it contains.",
  "narrationPoints": [
    "Telemetry quality determines whether collected data can support a decision.",
    "Time synchronization is essential for correlation.",
    "Retention should reflect investigation needs, source volume, operational cycles, legal constraints, and storage cost.",
    "Coverage is the portion of important activity that the program can observe.",
    "Noisy data creates a different gap between collection and visibility."
  ]
};
