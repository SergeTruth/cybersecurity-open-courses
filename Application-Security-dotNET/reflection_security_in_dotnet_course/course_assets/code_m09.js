window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Logging, Diagnostics, Errors, and Production Review' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Sanitize reflection invocation failures",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Only the approved non-mutating method is invoked. Wrapped target errors produce a fixed public category; do not include TargetInvocationException or inner-exception text in an HTTP response.",
      "code": "using System.Reflection;\npublic static class ReviewedOperation\n{\n    public static int CheckedDouble(int value) => checked(value * 2);\n}\npublic static (bool Success, int Value, string? Error) InvokeSafely(int value)\n{\n    var method = typeof(ReviewedOperation).GetMethod(nameof(ReviewedOperation.CheckedDouble))!;\n    try { return (true, (int)method.Invoke(null, new object[] { value })!, null); }\n    catch (TargetInvocationException ex) when (ex.InnerException is OverflowException)\n    { return (false, 0, \"value_out_of_range\"); }\n    // Unexpected defects remain defects; the host's global error boundary sanitizes them.\n}\n"
    },
    {
      "title": "Test that unknown operation tokens fail closed",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. An in-memory regression check for a closed dispatch table. Replace the local trusted dispatcher with the application implementation in its test project.",
      "code": "public static void AssertUnknownOperationRejected(Func<string, string> reviewedDispatcher)\n{\n    if (reviewedDispatcher(\"health\") != \"ready\") throw new InvalidOperationException(\"Positive control failed.\");\n    foreach (var token in new[] { \"System.IO.File\", \"GetType\", \"GetType().Assembly\", \"\", \"HEALTH\" })\n    {\n        try { reviewedDispatcher(token); }\n        catch (ArgumentException) { continue; }\n        throw new InvalidOperationException(\"Unknown operation accepted.\");\n    }\n}\n"
    }
  ]
};
