window.COURSE_MODULE = {
  "title": "Recovery and Lessons Learned",
  "graphicAlt": "Placeholder illustration for recovery and lessons learned",
  "narration": "Recovery is more than turning systems back on. A safe recovery restores systems to a trusted state and validates that the conditions that allowed the incident are addressed. Depending on the case, recovery may include rebuilding hosts, restoring from backups, rotating passwords and keys, removing malicious rules, patching vulnerable services, changing access policies, and confirming that security tools are functioning.\n\nValidation matters because recovery can create a false sense of closure. Systems may appear normal while attacker persistence remains. Credentials may be reset while tokens, service accounts, OAuth grants, or API keys continue to provide access. Malware may be removed from one endpoint while the initial entry point remains exposed. A good recovery plan includes checks that support confidence, not just speed.\n\nMonitoring after recovery is part of the same effort. Security teams may add temporary detections, increase logging, watch for known indicators, review authentication anomalies, and monitor sensitive systems for recurrence. This period is not about panic. It is about maintaining visibility while the organization returns to normal operations.\n\nLessons learned convert incident pain into lasting improvement. The post-incident review should cover root cause, timeline, detection quality, response speed, evidence availability, communication, decision points, and control gaps. The output should be practical: better logging, clearer escalation, improved backup testing, stronger identity controls, patched systems, better segmentation, refined detections, or updated training. The best DFIR programs make every incident a source of operational learning.",
  "narrationPoints": [
    "Recovery is more than turning systems back on.",
    "A safe recovery restores systems to a trusted state and validates that the conditions that allowed the incident are addressed.",
    "Depending on the case, recovery may include rebuilding hosts, restoring from backups, rotating passwords and keys, removing malicious rules, patching vulnerable services, changing access.",
    "Validation matters because recovery can create a false sense of closure.",
    "Systems may appear normal while attacker persistence remains.",
    "Credentials may be reset while tokens, service accounts, OAuth grants, or API keys continue to provide access."
  ]
};
