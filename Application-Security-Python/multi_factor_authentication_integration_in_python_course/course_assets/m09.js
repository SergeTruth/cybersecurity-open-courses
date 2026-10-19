window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Maintainable MFA combines appropriate authenticators, protected binding, explicit verification, governed recovery and continual testing.",
  "narration": "MFA integration in Python applications strengthens authentication by adding proof beyond a single password or token. It is not merely a second form field. A strong integration defines where MFA is required, how enrollment works, how challenges are verified, how sessions are upgraded, how recovery is handled, and how events are logged and monitored. MFA raises assurance, but it does not replace authorization.\n\nStrong integration requires appropriate authenticator choices, protected enrollment, secure factor binding, careful verification flows, safe partial-login state, session handling, step-up authentication, recovery controls, and lifecycle governance. Different MFA methods provide different resistance to phishing, replay, social engineering, and operational failure. The best choice depends on account risk, user needs, support reality, and organizational policy.\n\nMFA also depends on identity provider validation and application-side judgment. When SSO handles MFA, the Python application still needs to validate identity assertions and interpret authentication context correctly. APIs, service accounts, delegated access, and machine-to-machine authentication need their own controls. MFA belongs inside a broader identity system that includes authorization, sessions, logging, monitoring, privacy, and incident response.\n\nThe goal is not to make login frustrating. The goal is to raise identity assurance in a way that is secure, usable, observable, and maintainable. Durable MFA programs protect recovery paths, test negative cases, avoid leaking secrets into logs, monitor suspicious events, and improve over time as authenticators, platforms, and business risk change.",
  "narrationPoints": [
    "MFA integration in Python applications strengthens.",
    "Strong integration requires appropriate authenticator.",
    "MFA also depends on identity provider validation.",
    "The goal is not to make login frustrating.",
    "When SSO handles MFA.",
    "Durable MFA programs protect recovery paths."
  ]
};
