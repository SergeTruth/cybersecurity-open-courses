window.COURSE_MODULE = {
  "title": "Hardening Network Devices and Services",
  "graphicAlt": "Conceptual visual of routers, switches, firewalls, wireless, DNS, DHCP, and VPN services using secure baselines.",
  "narration": "Network devices and shared services need consistent hardening. Routers, switches, firewalls, wireless controllers, VPN gateways, DNS, DHCP, NTP, load balancers, and monitoring systems are part of the defensive foundation. If they use weak management settings, unsupported firmware, broad access, or inconsistent naming, the network becomes harder to operate and harder to protect. Vendor-neutral baselines help teams apply secure expectations consistently.\n\nCommon hardening themes include secure management protocols, strong authentication, restricted administrative access, appropriate telemetry, reliable time synchronization, useful logging, configuration backups, and disabled legacy or unused protocols where safe. The goal is not to change every setting blindly. The goal is to align device configuration with an approved baseline, the device role, and the operational needs of the environment.\n\nConfiguration backups are especially important. Before changing a firewall, switch, router, VPN gateway, or wireless controller, teams should know how to recover. Backups should be protected, versioned, and tested enough that recovery is realistic. After a change, a new known-good configuration should be retained. Without backups, a hardening change can become a long outage or a manual reconstruction exercise.\n\nBroad rollout should be staged. Test on a limited scope, validate connectivity, monitor logs and alerts, confirm management access, and review the effect on users and services. Network devices often carry critical traffic, so baseline enforcement must be operationally safe. The best hardening baseline is one the team can understand, implement, audit, and maintain over time.",
  "narrationPoints": [
    "Network devices need secure management settings.",
    "Disable legacy or unused protocols where safe.",
    "Restrict management access to trusted paths.",
    "Back up configurations before and after changes.",
    "Use approved baselines for consistent hardening."
  ]
};
