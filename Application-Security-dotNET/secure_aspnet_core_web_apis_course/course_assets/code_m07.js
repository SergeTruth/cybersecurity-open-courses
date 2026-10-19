window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secure Data Access and Business Logic Boundaries' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Validate Secure Data Access and Business Logic Boundaries DTOs explicitly",
      "language": "csharp",
      "blurb": "The DTO accepts only operation-specific fields and performs server-side validation before use.",
      "code": "using System.ComponentModel.DataAnnotations;\n\npublic sealed record SecureWebM07SecureDataAccessBusinessRequest(\n    [property: Required, MaxLength(22)] string Secure,\n    [property: Required, MaxLength(22)] string Data,\n    bool Access);\n\npublic static class SecureWebM07SecureDataAccessBusinessValidation\n{\n    public static IReadOnlyList<ValidationResult> Validate(SecureWebM07SecureDataAccessBusinessRequest request)\n    {\n        var context = new ValidationContext(request);\n        var results = new List<ValidationResult>();\n        Validator.TryValidateObject(request, context, results, validateAllProperties: true);\n        return results;\n    }\n}\n"
    },
    {
      "title": "Reject over-posting in Secure Data Access and Business Logic Boundaries",
      "language": "csharp",
      "blurb": "An explicit ASCII teaching contract checks exact runtime types, raw lengths, allowed fields, and normalized values before constructing an immutable command. No arbitrary conversion or caller-supplied domain entity is accepted. Validate the decoded dictionary only after a bounded, duplicate-rejecting request parser.",
      "code": "public sealed record SecureWebM07SecureDataAccessBusinessCommand(string Secure, string Data, bool Access);\npublic static SecureWebM07SecureDataAccessBusinessCommand ToSecureWebM07SecureDataAccessBusinessCommand(IDictionary<string, object?> input)\n{\n    ArgumentNullException.ThrowIfNull(input);\n    if (input.Count is < 2 or > 3 || input.Keys.Any(k => k is not (\"secure\" or \"data\" or \"access\")))\n        throw new ArgumentException(\"Unexpected fields.\");\n    if (!input.TryGetValue(\"secure\", out var first) || first is not string firstText ||\n        !input.TryGetValue(\"data\", out var second) || second is not string secondText)\n        throw new ArgumentException(\"Text fields required.\");\n    bool flag = false;\n    if (input.TryGetValue(\"access\", out var flagValue))\n    {\n        if (flagValue is not bool parsed) throw new ArgumentException(\"Boolean required.\");\n        flag = parsed;\n    }\n    static string Text(string value)\n    {\n        if (value.Length is 0 or > 22 || !value.All(c => char.IsAsciiLetterOrDigit(c) || c is ' ' or '-' or '_' or '.'))\n            throw new ArgumentException(\"Invalid text.\");\n        var normalized = value.Trim();\n        if (normalized.Length == 0) throw new ArgumentException(\"Text required.\");\n        return normalized;\n    }\n    return new(Text(firstText), Text(secondText), flag);\n}\n"
    }
  ]
};
