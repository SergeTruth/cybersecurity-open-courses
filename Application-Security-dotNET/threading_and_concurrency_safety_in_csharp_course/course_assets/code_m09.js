window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Diagnostics, Testing, and Production Review' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Project only approved diagnostic fields",
      "language": "csharp",
      "blurb": "Drops every unknown field and nested value instead of guessing which key names contain secrets. The trusted caller supplies nonsecret operation/outcome labels and a server-generated correlation ID. A read-only result preserves the validated projection.",
      "code": "using System.Collections.ObjectModel;\n\npublic static IReadOnlyDictionary<string, object?> BuildThreadingConcurrencyM09DiagnosticsTestingProductionReviewLogScope(\n    IReadOnlyDictionary<string, object?> values)\n{\n    var source = values;\n    ArgumentNullException.ThrowIfNull(source);\n    // Only these application-owned diagnostic fields may be emitted. Never walk nested objects.\n    if (source.Count > 32) throw new ArgumentException(\"Diagnostic field limit exceeded.\");\n    var safe = new Dictionary<string, object?>(StringComparer.Ordinal);\n    foreach (var key in new[] { \"correlationId\", \"operation\", \"outcome\" })\n    {\n        if (source.TryGetValue(key, out var value) && value is string text &&\n            text.Length is > 0 and <= 64 && text.All(c => char.IsAsciiLetterOrDigit(c) || c is '-' or '_' or '.'))\n            safe.Add(key, text);\n    }\n    return new ReadOnlyDictionary<string, object?>(safe);\n}\n"
    },
    {
      "title": "Bound Diagnostics, Testing, and Production Review error details",
      "language": "csharp",
      "blurb": "Maps only an explicit domain denial to 403; OS permission errors and other defects remain 500. Uses a server-generated UUID correlation identifier and never returns exception text. Submit protected diagnostics through a bounded, non-throwing telemetry boundary separately.",
      "code": "public sealed record ThreadingConcurrencyM09DiagnosticsTestingProductionReviewError(int Status, string Message, string CorrelationId);\n\npublic static ThreadingConcurrencyM09DiagnosticsTestingProductionReviewError ToThreadingConcurrencyM09DiagnosticsTestingProductionReviewError(Exception exception, string correlationId)\n{\n    ArgumentNullException.ThrowIfNull(exception);\n    if (!Guid.TryParseExact(correlationId, \"D\", out var id) || id == Guid.Empty)\n        throw new ArgumentException(\"Server correlation ID required.\");\n    var status = exception is ThreadingConcurrencyM09DiagnosticsTestingProductionReviewErrorAccessDeniedException ? 403 : 500;\n    var message = status == 500 ? \"Internal server error\" : \"diagnostics testing production review rejected.\";\n    return new ThreadingConcurrencyM09DiagnosticsTestingProductionReviewError(status, message, correlationId);\n}\n\n// Raised only by the application's authorization boundary, not by filesystem APIs.\npublic sealed class ThreadingConcurrencyM09DiagnosticsTestingProductionReviewErrorAccessDeniedException : Exception { }\n"
    }
  ]
};
