window.COURSE_MODULE = {
  "title": "Monitoring, Incident Response, and Governance",
  "narration": "SSO and MFA require ongoing monitoring after deployment. Authentication logs, sign-in events, failed login patterns, MFA enrollment changes, MFA reset events, suspicious approval behavior, privileged account activity, token anomalies, application consent events, and policy changes all tell part of the identity story. Without monitoring, a centralized identity system can become a centralized blind spot.\n\nAlerting should focus on meaningful signals. Repeated failures, impossible-travel-style patterns, unusual enrollment changes, unexpected privileged sign-ins, new application consent, policy exceptions, and high-risk session behavior may deserve review. The goal is not to generate noise for every login. The goal is to detect changes that could indicate account compromise, misconfiguration, risky access, or operational drift.\n\nIncident response plans should include identity-specific actions. Teams may need to disable accounts, revoke sessions, reset authenticators, rotate keys or certificates, review application assignments, inspect consent grants, and preserve logs. Recovery should be coordinated so the organization restores safe access without destroying evidence or creating new gaps. Help desk and operations teams should know when identity events require escalation.\n\nGovernance keeps the system aligned over time. Access reviews confirm that users, groups, privileged roles, and application assignments still make sense. Policy exceptions should be owned and time-bound. Audit trails should show who changed identity settings and why. SSO and MFA are powerful controls, but their value depends on review, ownership, monitoring, and the willingness to correct drift.",
  "graphicAlt": "Identity events support contextual investigation, coordinated response and access governance.",
  "narrationPoints": [
    "SSO and MFA require ongoing monitoring after deployment.",
    "Alerting should focus on meaningful signals.",
    "Incident response plans should include identity-specific actions.",
    "Governance keeps the system aligned over time."
  ]
};
