window.COURSE_MODULE = {
  "title": "Inventory, Ownership, and Network Mapping",
  "graphicAlt": "Conceptual visual of network assets, owners, subnets, services, and dependencies being mapped.",
  "narration": "Hardening starts with knowing what exists. A useful inventory includes routers, switches, firewalls, wireless controllers, VPN gateways, servers, appliances, cloud networks, subnets, VLANs, DNS and DHCP services, NTP sources, third-party connections, and management interfaces. It should also identify what each asset does, where it lives, what it depends on, and whether it is still supported. Unknown assets are hard to patch, hard to monitor, and hard to protect.\n\nOwnership matters as much as discovery. Every network segment, rule set, service, and connection should have a responsible team or person. If a firewall rule allows traffic between a user subnet and a server network, someone should understand why it exists and who can approve changes. If a VPN profile grants administrative access, someone should own the access review. Without ownership, hardening questions become slow and risky during production pressure.\n\nNetwork maps do not need to be perfect on day one, but they must be accurate enough to support decisions. A practical map shows critical paths: user networks, server networks, management networks, guest wireless, cloud networks, internet edges, firewalls, remote access paths, and key dependencies. It should help answer operational questions such as what depends on this subnet, what would break if this rule changed, and where monitoring should exist.\n\nInventory is not a static spreadsheet. It should be reviewed when projects launch, systems retire, sites change, cloud networks are added, or emergency exceptions are created. A network that was accurate last quarter may already have drifted. Regular review turns hardening from guesswork into managed operations and gives teams a safer starting point for exposure reduction, segmentation, patching, and validation.",
  "narrationPoints": [
    "Hardening starts with knowing what exists.",
    "Assets, subnets, services, and connections need owners.",
    "Network maps support safer decisions.",
    "Unknown assets create operational and security risk.",
    "Inventory should be reviewed and updated regularly."
  ]
};
