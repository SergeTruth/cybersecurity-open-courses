window.COURSE_MODULE = {
  "title": "What Network Hardening Means",
  "graphicAlt": "Conceptual visual of network hardening as a lifecycle across inventory, segmentation, access control, patching, and monitoring.",
  "narration": "Network hardening is the process of reducing unnecessary risk in network design, configuration, access, and operations. It does not mean making the network impossible to use. A hardened network still supports intended communication: users reach approved services, applications reach required dependencies, administrators can maintain systems, and monitoring can observe the environment. The difference is that unnecessary exposure is removed, risky defaults are corrected, and access is controlled deliberately.\n\nThe practical themes are consistent across small offices, enterprise campuses, data centers, and cloud networks. You need an asset inventory, owners for each subnet and service, segmentation that reflects business function and sensitivity, least privilege for firewall rules and access control lists, secure remote administration, reliable patch and firmware processes, and logs that help teams see what changed. None of those controls works well when treated as a one-time cleanup.\n\nA useful hardening program also protects availability. Changes to a firewall rule, VLAN, VPN, DNS service, DHCP scope, wireless network, or management interface can disrupt production if they are rushed. Defensive work should use approval, maintenance windows, configuration backups, testing, and rollback plans. Good hardening removes what is not needed, protects what must remain, and preserves the ability to operate the network safely.\n\nThe core idea is lifecycle thinking. Inventory changes as assets appear and retire. Baselines change as vendors release updates. Firewall rules drift as projects come and go. Exceptions may be necessary, but they should be documented and reviewed. Network hardening is disciplined risk reduction through design, configuration, monitoring, validation, and continuous improvement.",
  "narrationPoints": [
    "Network hardening reduces unnecessary risk.",
    "Hardening supports reliable intended communication.",
    "Inventory, segmentation, and least privilege are core themes.",
    "Secure administration and patching reduce avoidable exposure.",
    "Hardening is a lifecycle, not a one-time task."
  ]
};
