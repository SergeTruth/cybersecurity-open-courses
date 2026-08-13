window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'ASP.NET Core Data Protection and Framework Tokens' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Issue short-lived purpose-bound Data Protection tokens",
      "language": "csharp",
      "blurb": "The issuer derives a fixed application purpose, validates the subject, obtains time from the system clock, and enforces an application-owned maximum lifetime before protecting the payload.",
      "code": "using Microsoft.AspNetCore.DataProtection;\n\npublic sealed class AccountActionTokenIssuer\n{\n    private static readonly TimeSpan MaximumLifetime = TimeSpan.FromMinutes(15);\n    private readonly ITimeLimitedDataProtector _protector;\n\n    public AccountActionTokenIssuer(IDataProtectionProvider provider)\n    {\n        ArgumentNullException.ThrowIfNull(provider);\n        _protector = provider\n            .CreateProtector(\"orders.account-action\", \"v1\")\n            .ToTimeLimitedDataProtector();\n    }\n\n    public string Issue(string subjectId, TimeSpan lifetime)\n    {\n        if (!IsIdentifier(subjectId))\n            throw new ArgumentException(\"Subject rejected.\", nameof(subjectId));\n        if (lifetime <= TimeSpan.Zero || lifetime > MaximumLifetime)\n        {\n            throw new ArgumentOutOfRangeException(nameof(lifetime));\n        }\n        var now = DateTimeOffset.UtcNow;\n        if (now > DateTimeOffset.MaxValue - lifetime)\n            throw new InvalidOperationException(\"Token clock value rejected.\");\n        return _protector.Protect(subjectId, now + lifetime);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    },
    {
      "title": "Redeem only bounded purpose-bound Data Protection tokens",
      "language": "csharp",
      "blurb": "The redeemer applies the same purpose chain, rejects oversized token text before cryptographic work, relies on time-limited unprotection for expiration, and validates the recovered subject.",
      "code": "using Microsoft.AspNetCore.DataProtection;\n\npublic sealed class AccountActionTokenRedeemer\n{\n    private readonly ITimeLimitedDataProtector _protector;\n\n    public AccountActionTokenRedeemer(IDataProtectionProvider provider)\n    {\n        ArgumentNullException.ThrowIfNull(provider);\n        _protector = provider\n            .CreateProtector(\"orders.account-action\", \"v1\")\n            .ToTimeLimitedDataProtector();\n    }\n\n    public string Redeem(string token)\n    {\n        if (string.IsNullOrWhiteSpace(token) || token.Length > 4096)\n            throw new ArgumentException(\"Token rejected.\", nameof(token));\n        var subjectId = _protector.Unprotect(token, out _);\n        if (!IsIdentifier(subjectId))\n            throw new InvalidOperationException(\"Protected subject rejected.\");\n        return subjectId;\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    }
  ]
};
