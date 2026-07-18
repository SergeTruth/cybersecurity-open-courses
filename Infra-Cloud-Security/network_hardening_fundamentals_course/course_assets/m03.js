window.COURSE_MODULE = {
  "title": "Reducing Attack Surface",
  "graphicAlt": "Conceptual visual of unnecessary services and exposed paths being reduced safely.",
  "narration": "Attack surface is the set of exposed services, paths, interfaces, and configurations that could be misused or fail under pressure. In network hardening, the goal is to reduce avoidable exposure. That may mean disabling unused services, removing obsolete firewall rules, closing unnecessary ports, restricting legacy protocols, retiring unsupported systems, and making sure public exposure is intentional rather than accidental.\n\nManagement interfaces deserve special attention. Router, switch, firewall, hypervisor, wireless, storage, backup, and appliance administration should not be broadly reachable. Administrative access should come through controlled paths such as a management network, VPN, or bastion host, with strong authentication and logging. Default accounts and default passwords should be removed or changed according to approved procedure, and emergency access should be documented rather than improvised.\n\nSafe reduction requires care. A port or protocol may look unnecessary until a business process, monitoring tool, backup job, DNS dependency, or legacy application needs it. Before changing production, identify the owner, review logs where available, confirm the intended use, document the change, choose a maintenance window when needed, and define rollback. Hardening that breaks critical traffic without warning can damage trust in the program.\n\nA good rule of thumb is simple: remove what is not needed and protect what must remain. If an exposure is required, make it explicit. Scope it to known sources and destinations when possible, monitor it, document the reason, and review it later. Attack surface reduction is not about making every rule tiny for its own sake. It is about making exposure intentional, explainable, and maintainable.",
  "narrationPoints": [
    "Attack surface includes exposed services and paths.",
    "Disable or remove what is not needed.",
    "Public exposure should be intentional and minimal.",
    "Management interfaces need strong restrictions.",
    "Changes should be tested, documented, and reversible."
  ]
};
