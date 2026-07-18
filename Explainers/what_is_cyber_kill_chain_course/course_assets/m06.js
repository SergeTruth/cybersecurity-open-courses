window.COURSE_MODULE = {
  "title": "Command and Control",
  "graphicAlt": "Conceptual visual of command and control detection through outbound telemetry, egress controls, and segmentation.",
  "narration": "Command and control means unauthorized communication that allows an affected asset, account, workload, or service to receive direction or send status outside normal trust boundaries. Defenders should treat this stage as a question about communication evidence, not as a lesson in setup or evasion. Useful signals may appear in DNS logs, proxy logs, firewall records, endpoint telemetry, cloud network flow records, identity events, or SaaS activity logs. The details vary by environment. A workstation, a container workload, a cloud function, and a compromised account may all create different communication patterns. Defensive controls include egress filtering, destination allowlists, segmentation, proxy inspection, anomaly detection, and rapid containment paths. Analysts should ask what communicated, where it communicated, how often, through which control point, and whether that behavior matches expected business activity. Containment decisions should be evidence based. Isolating a host, disabling a credential, blocking a destination, or segmenting a workload can reduce risk, but those actions should be recorded and coordinated. The value of this stage is to make outbound visibility and containment planning part of normal defensive readiness. This stage is a reminder that outbound visibility matters as much as inbound defense. If the organization cannot explain which systems can reach which destinations, containment becomes slower and less precise. Well-governed egress makes unusual communication easier to notice and easier to limit.",
  "narrationPoints": [
    "Command and control is unauthorized control communication.",
    "Outbound telemetry is important for detection.",
    "Egress controls and segmentation can reduce reachability.",
    "Endpoint, DNS, proxy, and cloud logs may provide signals.",
    "Containment decisions should be evidence-based."
  ]
};
