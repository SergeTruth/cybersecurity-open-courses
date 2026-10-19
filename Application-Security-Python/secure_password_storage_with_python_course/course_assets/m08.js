window.COURSE_MODULE = {
  "title": "Testing, Logging, and Monitoring",
  "graphicAlt": "Tests cover authentication and recovery while safe events support monitoring and incident response.",
  "narration": "Password storage controls need tests because small changes can create serious risk. Unit tests should verify that valid passwords are accepted, invalid passwords are rejected, hashes are not reused incorrectly, and migration behavior works as intended. Regression tests should cover legacy verification and rehash-on-login paths. Reset token tests should cover lifetime, one-time use, invalid tokens, and successful replacement of the stored verifier.\n\nLockout, throttling, and rate limiting behavior should also be tested. The application should resist automated abuse without creating easy denial of service for legitimate users. Tests should confirm that errors are safe, timing behavior is not needlessly revealing, and authentication flows remain reliable under expected load. Password-related tests should never require storing real user passwords or exposing secrets in fixtures.\n\nLogging must be useful without being dangerous. Authentication logs can include successful and failed login events, reset requests, reset completions, migration events, lockouts, throttle events, and suspicious recovery patterns. Logs should avoid plaintext passwords, reset tokens, password hashes where not necessary, peppers, sensitive authentication secrets, and unnecessary credential material. Observability should help defenders without creating a second source of compromise.\n\nMonitoring connects password storage to operations and incident response. Failed login patterns, credential stuffing indicators at a high level, unusual reset activity, spikes in lockouts, migration errors, and authentication performance changes may require investigation. Incident response readiness includes knowing how to rotate secrets, invalidate sessions, force resets, preserve evidence, and communicate with users. Password storage controls must be observable without exposing the secrets they are meant to protect.",
  "narrationPoints": [
    "Password storage controls need tests.",
    "Lockout, throttling, and rate limiting behavior should also.",
    "Logging must be useful without being dangerous.",
    "Monitoring connects password storage to operations.",
    "Regression tests should cover legacy verification.",
    "Reset token tests should cover lifetime."
  ]
};
