window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Logging, Monitoring, and Production Readiness' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Create bounded structured request audit events",
      "language": "csharp",
      "blurb": "The closed event factory admits only canonical correlation IDs, fixed methods, fixed outcomes, and finite bounded durations; the immutable result has no headers, cookies, tokens, or exception text.",
      "code": "public enum RequestAuditOutcome\n{\n    Succeeded,\n    Rejected,\n    Failed\n}\n\npublic sealed class RequestAuditEvent\n{\n    private RequestAuditEvent(\n        string correlationId,\n        string method,\n        string outcome,\n        long durationMilliseconds)\n    {\n        CorrelationId = correlationId;\n        Method = method;\n        Outcome = outcome;\n        DurationMilliseconds = durationMilliseconds;\n    }\n\n    public string CorrelationId { get; }\n    public string Method { get; }\n    public string Outcome { get; }\n    public long DurationMilliseconds { get; }\n\n    public static RequestAuditEvent Create(\n        string correlationId,\n        string method,\n        RequestAuditOutcome outcome,\n        long durationMilliseconds)\n    {\n        if (!IsIdentifier(correlationId) ||\n            method is not (\"GET\" or \"POST\" or \"PUT\" or \"DELETE\") ||\n            durationMilliseconds is < 0 or > 3_600_000)\n        {\n            throw new ArgumentException(\"Audit event rejected.\");\n        }\n        var category = outcome switch\n        {\n            RequestAuditOutcome.Succeeded => \"succeeded\",\n            RequestAuditOutcome.Rejected => \"rejected\",\n            RequestAuditOutcome.Failed => \"failed\",\n            _ => throw new ArgumentOutOfRangeException(nameof(outcome))\n        };\n        return new RequestAuditEvent(correlationId, method, category, durationMilliseconds);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length is >= 8 and <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    },
    {
      "title": "Return bounded production errors without exception details",
      "language": "csharp",
      "blurb": "The mapper validates one correlation identifier, maps only expected exception categories to public statuses, and returns fixed messages without stack traces, paths, SQL, or exception messages.",
      "code": "public sealed record PublicProblem(\n    int Status,\n    string Title,\n    string CorrelationId);\n\npublic static class ProductionErrorMapper\n{\n    public static PublicProblem Map(Exception exception, string correlationId)\n    {\n        ArgumentNullException.ThrowIfNull(exception);\n        if (!IsIdentifier(correlationId))\n            throw new ArgumentException(\"Correlation identifier rejected.\", nameof(correlationId));\n\n        return exception switch\n        {\n            UnauthorizedAccessException => new(403, \"Request forbidden\", correlationId),\n            OperationCanceledException => new(408, \"Request timed out\", correlationId),\n            _ => new(500, \"Internal server error\", correlationId)\n        };\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length is >= 8 and <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    }
  ]
};
