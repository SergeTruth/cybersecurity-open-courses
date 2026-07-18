window.COURSE_MODULE = {
  "title": "Monitoring, Validation, and Continuous Review",
  "graphicAlt": "Conceptual visual of logs, alerts, rule reviews, drift detection, validation, and continuous monitoring.",
  "narration": "Hardening must be verified. A network can look well controlled in documentation while reality has drifted. Logs, alerts, configuration review, firewall rule review, access review, vulnerability management, drift detection, availability monitoring, DNS monitoring, certificate monitoring, and periodic tabletop exercises all help teams understand whether controls still work. Monitoring turns assumptions into evidence.\n\nLogs and alerts should help teams detect unexpected exposure, suspicious administrative access, failed changes, policy drift, and operational degradation. Device logs can show authentication failures, configuration changes, routing instability, VPN anomalies, wireless issues, or firewall denies that indicate a broken dependency. Alerts should be meaningful enough that responders know what changed, what is affected, and who owns the next step.\n\nReviews catch the slow accumulation of risk. Firewall rules that were temporary become permanent. Access control lists grow broader than intended. VPN groups gain users who no longer need them. DNS records point to retired services. Certificates approach expiration. Configuration drift detection and periodic review make these issues visible before they become incidents or outages.\n\nContinuous review improves the baseline. When an incident, outage, audit finding, or near miss occurs, ask what should change: inventory, segmentation, access control, logging, alerting, patch process, or change review. Validation is not about proving the network is perfect. It is about confirming controls still match current risk and learning enough to make the next hardening cycle better.",
  "narrationPoints": [
    "Hardening must be monitored and validated.",
    "Logs and alerts reveal unexpected activity.",
    "Rule and access reviews find drift.",
    "Validation confirms controls still work.",
    "Continuous review improves the baseline."
  ]
};
