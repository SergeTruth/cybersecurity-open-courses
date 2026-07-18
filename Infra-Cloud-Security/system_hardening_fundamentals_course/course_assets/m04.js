window.COURSE_MODULE = {
  "title": "Reducing Local Attack Surface",
  "graphicAlt": "Conceptual visual of unnecessary software, services, accounts, and exposure being reduced safely.",
  "narration": "Local attack surface is the set of services, software, interfaces, accounts, and configurations that could be misused or fail under pressure. Reducing it means removing or restricting what the system does not need. Safe examples include uninstalling unused software, disabling unnecessary services, closing unneeded local listening ports, restricting remote access, reviewing default or unused accounts, limiting autorun behavior, and avoiding tools that have no business purpose.\n\nRemote access deserves deliberate review. A system may need remote administration, remote support, or application connectivity, but those paths should be intentional, authenticated, logged, and scoped. Broad remote access created for convenience can become long-term risk. If a remote access method is required, document why it exists, who owns it, what controls apply, and how it is monitored.\n\nAccount cleanup is also attack surface reduction. Default accounts, stale local users, old administrator accounts, unmanaged service accounts, and test accounts can create confusion and risk. Review them with the system owner before removal or restriction. Some accounts exist for maintenance or recovery, so safe hardening requires understanding, approval, and a rollback path.\n\nProduction safety matters. Do not remove software, disable services, or change access paths blindly. Confirm business purpose, test with a pilot group, choose a maintenance window when needed, back up configuration, document the change, and define rollback. Good hardening removes unnecessary exposure while preserving the required function of the system.",
  "narrationPoints": [
    "Attack surface includes services, software, and accounts.",
    "Remove or disable what is not needed.",
    "Remote access should be intentional and restricted.",
    "Default and unused accounts should be reviewed.",
    "Changes should be tested, documented, and reversible."
  ]
};
