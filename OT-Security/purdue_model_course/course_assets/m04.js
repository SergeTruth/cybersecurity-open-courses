window.COURSE_MODULE = {
  "title": "Level 2: Area Supervisory Control",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Level 2 contains the systems that provide supervisory control and visibility for a process area. Human-machine interfaces, local operator stations, alarm services, and area-level control servers are commonly associated with this level. They translate controller data into information that operators can understand and act upon.\n\nAn HMI displays measurements, equipment state, trends, and alarms. Depending on authorization and design, it may also allow an operator to start equipment, acknowledge alarms, adjust a setpoint, or select an operating mode. The HMI does not replace the controller's real-time logic, but it can influence how that logic is used.\n\nLevel 2 compromise can affect operations even when field controllers remain intact. Operators may lose visibility, see misleading values, miss alarms, or issue commands based on untrustworthy information. A widespread workstation outage may cause a facility to enter a safer manual mode or stop production because continued operation cannot be supervised confidently.\n\nControls should protect both availability and integrity. Limit administrative access, separate engineering privileges from routine operation, maintain recoverable configurations, monitor communications with controllers, and restrict pathways from higher levels. Endpoint protections must be tested so they do not disrupt required applications or introduce uncontrolled reboots.\n\nIncident planning should define how operators recognize loss of trusted visibility, what local indications remain, and which actions are safe. Level 2 shows why cybersecurity cannot focus only on whether control logic was changed. Reliable operator awareness is itself a critical control function.",
  "narrationPoints": [
    "Level 2 contains the systems that provide supervisory control and visibility for a process area.",
    "An HMI displays measurements, equipment state, trends, and alarms.",
    "Level 2 compromise can affect operations even when field controllers remain intact.",
    "Controls should protect both availability and integrity.",
    "Incident planning should define how operators recognize loss of trusted visibility, what local indications remain, and which actions are safe."
  ]
};
