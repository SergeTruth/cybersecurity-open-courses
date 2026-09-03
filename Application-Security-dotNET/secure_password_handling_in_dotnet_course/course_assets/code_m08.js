window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Protecting Passwords from Operational Exposure' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Construct password audit events without accepting password material",
      "language": "csharp",
      "blurb": "The closed factory accepts only canonical subject and correlation identifiers plus a fixed outcome enum; its immutable event has no field capable of retaining a submitted password.",
      "code": "public enum PasswordAuditOutcome\n{\n    Accepted,\n    Rejected,\n    Locked\n}\n\npublic sealed class PasswordAuditEvent\n{\n    private PasswordAuditEvent(\n        string subjectId,\n        string correlationId,\n        string outcome)\n    {\n        SubjectId = subjectId;\n        CorrelationId = correlationId;\n        Outcome = outcome;\n    }\n\n    public string SubjectId { get; }\n    public string CorrelationId { get; }\n    public string Outcome { get; }\n\n    public static PasswordAuditEvent Create(\n        string subjectId,\n        string correlationId,\n        PasswordAuditOutcome outcome)\n    {\n        if (!IsIdentifier(subjectId) || !IsIdentifier(correlationId))\n            throw new ArgumentException(\"Audit identifier rejected.\");\n        var category = outcome switch\n        {\n            PasswordAuditOutcome.Accepted => \"accepted\",\n            PasswordAuditOutcome.Rejected => \"rejected\",\n            PasswordAuditOutcome.Locked => \"locked\",\n            _ => throw new ArgumentOutOfRangeException(nameof(outcome))\n        };\n        return new PasswordAuditEvent(subjectId, correlationId, category);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length is >= 8 and <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    },
    {
      "title": "Expose only approved password-service diagnostics",
      "language": "csharp",
      "blurb": "The snapshot copies a closed set of non-secret scalar settings, validates every value, and never accepts arbitrary configuration keys whose classification could be caller-selected.",
      "code": "using System.Collections.ObjectModel;\n\npublic static class PasswordDiagnostics\n{\n    public static IReadOnlyDictionary<string, object> Snapshot(\n        string algorithm,\n        int iterationCount,\n        bool lockoutEnabled)\n    {\n        if (algorithm != \"ASP.NET Core Identity v3\" ||\n            iterationCount is < 100_000 or > 1_000_000)\n        {\n            throw new ArgumentException(\"Password diagnostic value rejected.\");\n        }\n\n        return new ReadOnlyDictionary<string, object>(\n            new Dictionary<string, object>(StringComparer.Ordinal)\n            {\n                [\"algorithm\"] = algorithm,\n                [\"iterationCount\"] = iterationCount,\n                [\"lockoutEnabled\"] = lockoutEnabled\n            });\n    }\n}\n"
    }
  ]
};
