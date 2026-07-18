window.COURSE_MODULE = {
  "title": "Accounts, Authentication, and Privilege",
  "graphicAlt": "Conceptual visual of users, administrators, service accounts, privilege levels, and protected emergency access.",
  "narration": "Identity and privilege are central to system hardening. A system can have strong patching and logging but still be risky if too many users have local administrator rights or if service accounts have broad permissions. Least privilege means users, administrators, services, and applications receive the access they need for their role, not broad access by default.\n\nStandard user access should be the normal starting point. Administrative access should be rare, justified, monitored, and reviewed. Local administrator groups, privileged domain groups, cloud roles, endpoint management roles, and remote administration permissions should have clear owners. Shared administrator accounts should be avoided where possible because they weaken accountability. Where shared or break-glass access is unavoidable, it needs stronger controls and careful logging.\n\nService accounts need the same discipline. Each service account should have an owner, purpose, scope, credential rotation expectation, and review schedule. A forgotten service account can retain powerful access long after the application changes. Do not treat service accounts as invisible plumbing. They are identities with permissions, and their risk should be understood.\n\nEmergency access is part of resilience. During an outage, administrators may need protected ways to recover systems even when normal identity services are impaired. Those procedures should be documented, tested, and restricted. Good privilege management balances protection and recovery: administrative power is limited and observable, but authorized teams can still restore service safely when something breaks.",
  "narrationPoints": [
    "Privilege is a major system hardening concern.",
    "Standard user access should be the default.",
    "Administrative access should be limited and monitored.",
    "Service accounts need ownership and review.",
    "Emergency access must be protected and documented."
  ]
};
