window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Lockout, Rate Limiting, and Abuse Resistance' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Apply an account-local lockout state machine",
      "language": "csharp",
      "blurb": "The gate owns its clock and state, serializes updates, refuses attempts during lockout, resets after a valid credential check, and applies a fixed application-owned failure threshold and duration.",
      "code": "public readonly record struct LoginAttemptResult(\n    bool Accepted,\n    bool Locked,\n    TimeSpan RetryAfter);\n\npublic sealed class AccountLoginGate\n{\n    private const int MaximumFailures = 5;\n    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(15);\n    private readonly object _gate = new();\n    private int _failures;\n    private DateTimeOffset _lockedUntil;\n\n    public LoginAttemptResult Record(bool credentialsValid)\n    {\n        lock (_gate)\n        {\n            var now = DateTimeOffset.UtcNow;\n            if (_lockedUntil > now)\n                return new(false, true, _lockedUntil - now);\n\n            if (credentialsValid)\n            {\n                _failures = 0;\n                _lockedUntil = default;\n                return new(true, false, TimeSpan.Zero);\n            }\n\n            _failures++;\n            if (_failures < MaximumFailures)\n                return new(false, false, TimeSpan.Zero);\n\n            _failures = 0;\n            _lockedUntil = now + LockoutDuration;\n            return new(false, true, LockoutDuration);\n        }\n    }\n}\n"
    },
    {
      "title": "Create bounded Retry-After values for rejected logins",
      "language": "csharp",
      "blurb": "The response helper admits only finite positive delays within the application lockout ceiling and rounds up so clients are never told to retry before the enforced deadline.",
      "code": "public static class LoginRetryAfter\n{\n    private static readonly TimeSpan MaximumDelay = TimeSpan.FromMinutes(15);\n\n    public static int ToSeconds(TimeSpan retryAfter)\n    {\n        if (retryAfter <= TimeSpan.Zero || retryAfter > MaximumDelay)\n            throw new ArgumentOutOfRangeException(nameof(retryAfter));\n        return checked((int)Math.Ceiling(retryAfter.TotalSeconds));\n    }\n}\n"
    }
  ]
};
