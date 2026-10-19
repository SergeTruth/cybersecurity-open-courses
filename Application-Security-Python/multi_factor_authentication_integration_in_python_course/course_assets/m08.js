window.COURSE_MODULE = {
  "title": "Testing, Logging, Monitoring, and Privacy",
  "graphicAlt": "Negative-path tests and sanitized identity-event logs support policy review and investigation without leaking authenticator material.",
  "narration": "MFA controls need tests because authentication flows are easy to break during ordinary changes. Useful tests cover enrollment, verification, failed attempts, recovery, reset, session upgrade, trusted-device behavior, step-up prompts, identity provider claims, and regression after authentication changes. Negative tests are especially important: partial-login users should not reach protected actions, expired challenges should fail, and reset workflows should not silently bypass policy.\n\nCode review should ask where MFA is required, where the decision is enforced, how challenge state is protected, how session state changes after success, how recovery works, and how privileged actions are handled. Reviewers should check that MFA is not confused with authorization. Completing MFA proves more about identity assurance; it does not decide every resource permission by itself.\n\nMFA logs should support investigation without exposing sensitive authentication material. Useful events include enrollment, factor removal, reset, failed verification, successful verification, step-up success, backup code use, privileged account MFA changes, suspicious approval activity, and recovery workflow decisions. Logs should avoid one-time codes, recovery codes, tokens, authenticator secrets, excessive device detail, and unnecessary personal information.\n\nMonitoring turns logs into action. Unusual MFA failures, repeated reset attempts, unexpected privileged factor changes, approval patterns that do not match user behavior, and recovery events followed by sensitive actions may require triage. Incident response readiness includes knowing how to revoke sessions, remove factors, reset account access, preserve evidence, and communicate with affected users. MFA must be observable without becoming another place where secrets leak.",
  "narrationPoints": [
    "MFA controls need tests.",
    "Code review should ask.",
    "MFA logs should support investigation without exposing.",
    "Monitoring turns logs into action.",
    "Reviewers should check that MFA is not confused.",
    "Logs should avoid one-time codes."
  ]
};
