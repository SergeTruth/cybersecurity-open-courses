window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Dynamic Invocation and Type Activation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Dispatch only application-owned operations",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Untrusted input selects a token, never a type name, method name, assembly, or BindingFlags. Authorization must precede dispatch if the operation affects protected data.",
      "code": "public static string FormatApproved(string operation, string value)\n{\n    if (value is not { Length: > 0 and <= 64 } || !value.All(char.IsAsciiLetterOrDigit))\n        throw new ArgumentException(\"Invalid value.\");\n    return operation switch\n    {\n        \"upper\" => value.ToUpperInvariant(),\n        \"lower\" => value.ToLowerInvariant(),\n        _ => throw new ArgumentException(\"Unknown operation.\")\n    };\n}\n"
    },
    {
      "title": "When reflection is required, capture the exact method",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Only an application-owned class, public static method, and fixed signature can be invoked. Caller strings never become structural reflection arguments.",
      "code": "using System.Reflection;\npublic static class ApprovedFormatter\n{\n    public static string Normalize(string value) => value.ToUpperInvariant();\n}\npublic static string InvokeApprovedFormatter(string value)\n{\n    if (value is not { Length: > 0 and <= 64 } || !value.All(char.IsAsciiLetterOrDigit))\n        throw new ArgumentException(\"Invalid value.\");\n    var method = typeof(ApprovedFormatter).GetMethod(nameof(ApprovedFormatter.Normalize),\n        BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null)\n        ?? throw new InvalidOperationException(\"Application method missing.\");\n    return (string)method.Invoke(null, new object[] { value })!;\n}\n"
    }
  ]
};
