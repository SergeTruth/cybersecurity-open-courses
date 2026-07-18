window.COURSE_MODULE = {
  "title": "Secure Baselines and Configuration Standards",
  "graphicAlt": "Conceptual visual of secure baselines applied to different system roles.",
  "narration": "A secure baseline is an approved starting configuration for a class of systems. It can apply to user workstations, administrative workstations, servers, cloud instances, container hosts, or specialized endpoint devices. The baseline defines what the organization expects: account settings, password and MFA expectations where applicable, remote access rules, logging, endpoint protection, encryption, local firewall behavior, software installation rules, update settings, and audit configuration.\n\nBaselines reduce drift and inconsistency. Without a standard, every system can become a special case, and reviews turn into arguments about individual settings. With a baseline, teams can compare the current state against an approved configuration and focus on exceptions. This makes onboarding, patching, troubleshooting, compliance review, and incident response easier because the expected state is documented.\n\nBaselines must fit the system role and risk. A kiosk, developer workstation, production database server, cloud instance, and administrative laptop may need different settings. A baseline that is too weak leaves avoidable exposure. A baseline that is unrealistic leads to bypasses, emergency exceptions, or systems that no one can operate. The safest standards are tested, documented, versioned, and reviewed with the teams that must support them.\n\nTreat baseline updates as managed changes. When threats, platforms, vendors, or business needs change, the baseline should evolve. Test changes on pilot systems, verify logs and endpoint protection still work, confirm that rollback is possible, and document the version. A baseline is not a shelf document. It is the reference point for reliable, repeatable system hardening.",
  "narrationPoints": [
    "A baseline defines expected secure configuration.",
    "Baselines reduce inconsistent system settings.",
    "Baselines should match system role and risk.",
    "Tested standards are safer than ad hoc changes.",
    "Baselines need versioning and regular review."
  ]
};
