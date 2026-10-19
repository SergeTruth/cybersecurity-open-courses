window.COURSE_MODULE = {
  "title": "What to Log",
  "narration": "Secure logging starts by deciding which events are worth recording. Authentication events are usually important: successful sign-ins, failed attempts, MFA changes, account recovery, lockouts, and suspicious patterns. Authorization decisions can also matter, especially denied access to sensitive resources, administrative actions, privilege changes, and attempts to cross tenant or ownership boundaries. These records help teams understand whether controls are working and where misuse may be happening.\n\nAdministrative actions and privileged operations deserve strong logging. Role changes, permission grants, configuration updates, secret rotations, feature flag changes, data exports, account disablement, and changes to security settings are the kinds of events investigators often need later. Data access events may be important for sensitive records or regulated workflows, particularly when access is unusual, high volume, or tied to privileged support activity. The goal is to log security-relevant decisions and outcomes, not every byte of data.\n\nOperational failures are also useful. System errors, dependency failures, background job failures, payment workflow errors, queue processing problems, and business-critical workflow failures can become security-relevant during an incident. A failed downstream service may explain why a control did not complete. A spike in validation failures may indicate probing or a broken client. Good logging helps teams connect application behavior to security and operational reality.",
  "graphicAlt": "Authentication, authorization, privileged changes and operational failures contribute contextual outcome records.",
  "narrationPoints": [
    "Secure logging starts by deciding which events are worth recording.",
    "Administrative actions and privileged operations deserve strong logging.",
    "Operational failures are also useful."
  ]
};
