window.COURSE_MODULE = {
  "title": "Patching, Software, and Endpoint Protection",
  "graphicAlt": "Conceptual visual of patching, software inventory, firmware, endpoint protection, and staged rollout.",
  "narration": "Hardening depends on maintained software. Operating systems, firmware, third-party applications, packages, drivers, and endpoint agents all age. Vendors release updates to correct defects, improve reliability, and reduce known risk. A system with missing patches, unsupported software, unmanaged packages, or outdated firmware can become difficult to defend and difficult to recover.\n\nSoftware inventory supports patching decisions. Teams need to know what is installed, where it came from, whether it is still supported, and who owns it. Package sources and software deployment methods should be controlled so systems do not accumulate unmanaged tools. Unsupported software should be replaced, upgraded, isolated, or formally tracked as an exception with compensating controls.\n\nEndpoint protection is part of the hardening baseline, not a checkbox. Antivirus, EDR, application control, host firewall policy, and related controls should be enabled, monitored, and configured according to policy. A deployed agent that is disabled, unhealthy, or not sending alerts may give a false sense of protection. SOC and endpoint teams should know how health and alerting are reviewed.\n\nPatch rollout must be balanced with availability. Test updates, stage deployment, schedule maintenance windows when needed, monitor results, and retain rollback options. Some systems cannot patch immediately, but every delay should be visible and owned. Patching is strongest when it is connected to inventory, classification, endpoint protection, backups, and change control.",
  "narrationPoints": [
    "Maintained software reduces known risk.",
    "Operating systems and third-party apps need updates.",
    "Unsupported software should be replaced or isolated.",
    "Endpoint protection must be enabled and monitored.",
    "Patch rollout needs testing, staging, and rollback."
  ]
};
