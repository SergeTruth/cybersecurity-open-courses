window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Logging, Monitoring, Rate Limits, and Abuse Signals' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Derive non-secret API-key telemetry tokens",
      "language": "csharp",
      "blurb": "The helper requires an application-owned correlation key, bounds raw API-key bytes, computes HMAC-SHA-256, emits only a short hexadecimal token, and clears its temporary digest.",
      "code": "using System.Security.Cryptography;\n\npublic static class ApiKeyTelemetryToken\n{\n    public static string Create(\n        ReadOnlySpan<byte> correlationKey,\n        ReadOnlySpan<byte> apiKey)\n    {\n        if (correlationKey.Length is < 32 or > 64)\n            throw new ArgumentException(\"Correlation key rejected.\", nameof(correlationKey));\n        if (apiKey.Length is < 32 or > 512)\n            throw new ArgumentException(\"API key rejected.\", nameof(apiKey));\n\n        Span<byte> digest = stackalloc byte[SHA256.HashSizeInBytes];\n        try\n        {\n            _ = HMACSHA256.HashData(correlationKey, apiKey, digest);\n            return Convert.ToHexStringLower(digest[..12]);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(digest);\n        }\n    }\n}\n"
    },
    {
      "title": "Bound failed attempts for one API-key identity",
      "language": "csharp",
      "blurb": "The per-key counter serializes a fixed one-minute window, owns its system-clock reads, enforces an application-owned maximum, and never accepts a caller-selected capacity or timestamp.",
      "code": "public sealed class ApiKeyAttemptWindow\n{\n    private const int MaximumAttempts = 60;\n    private static readonly TimeSpan Window = TimeSpan.FromMinutes(1);\n    private readonly object _gate = new();\n    private DateTimeOffset _windowStart = DateTimeOffset.UtcNow;\n    private int _attempts;\n\n    public bool TryRecord()\n    {\n        lock (_gate)\n        {\n            var now = DateTimeOffset.UtcNow;\n            if (now - _windowStart >= Window)\n            {\n                _windowStart = now;\n                _attempts = 0;\n            }\n            if (_attempts >= MaximumAttempts) return false;\n            _attempts++;\n            return true;\n        }\n    }\n}\n"
    }
  ]
};
