window.COURSE_MODULE = {
  "title": "Secure Access and Administration",
  "graphicAlt": "Conceptual visual of protected administrative access through MFA, least privilege, VPN, and management networks.",
  "narration": "Administrative access is one of the highest-value parts of the network. Administrators can change firewall rules, routing, VPN profiles, wireless settings, DNS zones, DHCP scopes, device firmware, and logging destinations. Because the access is powerful, it should be tightly controlled. Shared administrator accounts, default passwords, broad VPN access, and exposed management interfaces create avoidable risk and make accountability difficult.\n\nGood administrative access starts with unique accounts, role separation, multi-factor authentication, and least privilege. A help desk account, network engineering account, firewall administration account, and emergency break-glass account should not all have the same permissions. Privilege should match the job, and elevated access should be reviewed. Session logging and change records help teams understand who changed what and when.\n\nRemote administration should use controlled access paths. That may include a VPN, bastion host, jump host, management network, or other approved administrative pathway. The important properties are authentication, authorization, logging, and limited reach. Administrative interfaces should not be exposed broadly just because it is convenient. Convenience that bypasses monitoring and access control often becomes operational debt.\n\nEmergency access also needs design. During an outage, administrators may need a protected way to recover systems even when normal identity or network services are degraded. Those procedures should be documented, tested, and protected with strong controls. Secure administration balances restriction with resilience: only the right people should have access, and they should still be able to perform authorized recovery safely.",
  "narrationPoints": [
    "Administrative access needs strong protection.",
    "Use unique accounts and least privilege.",
    "Remote access should be controlled and monitored.",
    "Management interfaces should not be broadly exposed.",
    "Emergency access must be documented and protected."
  ]
};
