window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'DTOs, Model Binding, and Validation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Validate DTOs, Model Binding, and Validation DTOs explicitly",
      "language": "csharp",
      "blurb": "The DTO accepts only operation-specific fields and performs server-side validation before use.",
      "code": "using System.ComponentModel.DataAnnotations;\n\npublic sealed record SecureWebM03DtosModelBindingValidationRequest(\n    [property: Required, MaxLength(66)] string Dtos,\n    [property: Required, MaxLength(66)] string Model,\n    bool Binding);\n\npublic static class SecureWebM03DtosModelBindingValidationValidation\n{\n    public static IReadOnlyList<ValidationResult> Validate(SecureWebM03DtosModelBindingValidationRequest request)\n    {\n        var context = new ValidationContext(request);\n        var results = new List<ValidationResult>();\n        Validator.TryValidateObject(request, context, results, validateAllProperties: true);\n        return results;\n    }\n}\n"
    },
    {
      "title": "Reject over-posting in DTOs, Model Binding, and Validation",
      "language": "csharp",
      "blurb": "An explicit ASCII teaching contract checks exact runtime types, raw lengths, allowed fields, and normalized values before constructing an immutable command. No arbitrary conversion or caller-supplied domain entity is accepted. Validate the decoded dictionary only after a bounded, duplicate-rejecting request parser.",
      "code": "public sealed record SecureWebM03DtosModelBindingValidationCommand(string Dtos, string Model, bool Binding);\npublic static SecureWebM03DtosModelBindingValidationCommand ToSecureWebM03DtosModelBindingValidationCommand(IDictionary<string, object?> input)\n{\n    ArgumentNullException.ThrowIfNull(input);\n    if (input.Count is < 2 or > 3 || input.Keys.Any(k => k is not (\"dtos\" or \"model\" or \"binding\")))\n        throw new ArgumentException(\"Unexpected fields.\");\n    if (!input.TryGetValue(\"dtos\", out var first) || first is not string firstText ||\n        !input.TryGetValue(\"model\", out var second) || second is not string secondText)\n        throw new ArgumentException(\"Text fields required.\");\n    bool flag = false;\n    if (input.TryGetValue(\"binding\", out var flagValue))\n    {\n        if (flagValue is not bool parsed) throw new ArgumentException(\"Boolean required.\");\n        flag = parsed;\n    }\n    static string Text(string value)\n    {\n        if (value.Length is 0 or > 66 || !value.All(c => char.IsAsciiLetterOrDigit(c) || c is ' ' or '-' or '_' or '.'))\n            throw new ArgumentException(\"Invalid text.\");\n        var normalized = value.Trim();\n        if (normalized.Length == 0) throw new ArgumentException(\"Text required.\");\n        return normalized;\n    }\n    return new(Text(firstText), Text(secondText), flag);\n}\n"
    }
  ]
};
