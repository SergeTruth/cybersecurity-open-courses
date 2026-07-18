window.COURSE_MODULE = {
  "title": "Hunting for Abnormal Industrial Communication",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Industrial communication hunts compare observed behavior with expected assets, roles, protocols, paths, timing, and operations. New devices or peers may represent replacement equipment, a vendor laptop, an inventory gap, or an unauthorized connection. Validate ownership and function before assigning intent.\n\nUnexpected protocol use can reveal a configuration change or unmanaged pathway. Protocol-aware telemetry may also show unusual read and write patterns, new engineering sessions, or operations inconsistent with the device role. The meaning depends on what the process was doing at the time.\n\nController-to-controller relationships are often stable. A new relationship, changed direction, or communication crossing an architectural zone can guide a focused hunt. Compare actual flows with approved conduits, firewall policy, network diagrams, and change records.\n\nTiming matters. Activity outside production rhythm, maintenance windows, or normal polling intervals may deserve review. However, startup, failover, batch transitions, equipment faults, and communications recovery can also change volume and timing.\n\nUse passive data and existing records. Hunters should not generate writes, discovery traffic, or disruptive scans in production to test a theory. Correlate network evidence with controller status, historian trends, HMI alarms, remote sessions, and engineering activity.\n\nDocument the baseline used, deviations found, operational explanation, and remaining uncertainty. A communication anomaly is a lead, not a verdict. The strongest finding links a meaningful change to asset identity, process context, supporting evidence, and a safe escalation path.",
  "narrationPoints": [
    "Industrial communication hunts compare observed behavior with expected assets, roles, protocols, paths, timing, and operations.",
    "New devices or peers may represent replacement equipment, a vendor laptop, an inventory gap, or an unauthorized connection.",
    "Validate ownership and function before assigning intent.",
    "Unexpected protocol use can reveal a configuration change or unmanaged pathway.",
    "Protocol-aware telemetry may also show unusual read and write patterns, new engineering sessions, or operations inconsistent with the device role.",
    "The meaning depends on what the process was doing at the time."
  ]
};
