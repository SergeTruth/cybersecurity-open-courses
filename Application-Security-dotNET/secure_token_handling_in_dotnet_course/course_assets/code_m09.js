window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Logging, Monitoring, Errors, and Incident Response' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Project token failure telemetry without credential material",
      "language": "csharp",
      "blurb": "The event contains only a fixed category and server-generated correlation ID. Submit it through the application nonblocking telemetry boundary; never pass the token or validation exception text.",
      "code": "public enum TokenFailure { Missing, Invalid, Expired, Forbidden }\npublic sealed record TokenFailureEvent(string Category, Guid CorrelationId);\npublic static TokenFailureEvent CreateTokenFailureEvent(TokenFailure failure, Guid correlationId)\n{\n    if (correlationId == Guid.Empty) throw new ArgumentException(\"Correlation required.\");\n    string category = failure switch\n    {\n        TokenFailure.Missing => \"missing\", TokenFailure.Invalid => \"invalid\",\n        TokenFailure.Expired => \"expired\", TokenFailure.Forbidden => \"forbidden\",\n        _ => throw new ArgumentOutOfRangeException(nameof(failure))\n    };\n    return new(category, correlationId);\n}\n"
    },
    {
      "title": "Differentiate authentication failure from denied permission",
      "language": "csharp",
      "blurb": "Use the configured authentication scheme rather than manually composing WWW-Authenticate details. No token, exception, or claim value is reflected to the caller.",
      "code": "public static IResult MissingOrInvalidToken() => Results.Challenge(authenticationSchemes: new[] { \"Bearer\" });\npublic static IResult AuthenticatedButForbidden() => Results.Forbid(authenticationSchemes: new[] { \"Bearer\" });\n// Let the validated bearer handler produce 401; use 403 only after authentication succeeded.\n"
    }
  ]
};
