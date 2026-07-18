window.COURSE_MODULE = {
  "title": "Inventory, Ownership, and Classification",
  "graphicAlt": "Conceptual visual of system inventory with owners, classifications, and criticality labels.",
  "narration": "Hardening begins with knowing what systems exist. A useful inventory includes workstations, laptops, servers, virtual machines, cloud instances, containers, appliances, administrative systems, lab systems, and endpoint devices that may not be centrally managed yet. It should record the system owner, business purpose, operating system, role, location, exposure, installed software where practical, and whether the system is supported. Unknown systems cannot be hardened reliably.\n\nOwnership turns discovery into accountability. Every system should have a team or person responsible for decisions about configuration, patching, access, backup, and retirement. Without an owner, remediation work stalls. A server may need a patch, an endpoint protection agent may be unhealthy, or a remote access exception may be too broad, but no one can approve or schedule the fix. Hardening requires someone who understands the system's purpose and risk.\n\nClassification helps prioritize effort. Production systems, development systems, internet-facing systems, internal systems, systems with sensitive data, administrative workstations, ordinary user endpoints, and low-risk lab devices do not all need the same urgency or controls. Classification helps the team decide where stricter baselines, faster patching, stronger monitoring, encryption, or tighter access controls are most important.\n\nInventory is a living control. New cloud instances appear, laptops are reassigned, containers are rebuilt, software is installed, and old systems remain online longer than planned. Regular inventory review helps teams find shadow systems, unsupported software, missing endpoint protection, and systems with no owner. It also gives hardening work a safer starting point because teams can make decisions from evidence rather than guesses.",
  "narrationPoints": [
    "Hardening starts with knowing what exists.",
    "Systems need owners and business purpose.",
    "Classification helps prioritize hardening effort.",
    "Unknown systems create security and operational gaps.",
    "Inventory should be reviewed and updated regularly."
  ]
};
