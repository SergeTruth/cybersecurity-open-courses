window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Framework Features That Depend on Data Protection' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Create a purpose-isolated framework protector",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Resolve IDataProtectionProvider from trusted DI. This helper protects a bounded nonempty value; the purpose is application code, not a request parameter.",
      "code": "using Microsoft.AspNetCore.DataProtection;\npublic sealed class ProtectedPreferences\n{\n    private readonly IDataProtector _protector;\n    public ProtectedPreferences(IDataProtectionProvider provider) =>\n        _protector = provider.CreateProtector(\"Orders.Preferences.v1\");\n    public string Protect(string value)\n    {\n        if (value is not { Length: > 0 and <= 512 }) throw new ArgumentException(\"Preference limit.\");\n        return _protector.Protect(value);\n    }\n}\n"
    },
    {
      "title": "Unprotect with the matching purpose and bounded failure handling",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Purpose mismatch, tampering, and unavailable keys produce a generic failure. This format is not intended for indefinite storage or as a substitute for authorization.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static bool TryReadPreferences(IDataProtectionProvider provider, string payload, out string? value)\n{\n    value = null;\n    if (payload is not { Length: > 0 and <= 4096 }) return false;\n    try\n    {\n        var plaintext = provider.CreateProtector(\"Orders.Preferences.v1\").Unprotect(payload);\n        if (plaintext.Length is 0 or > 512) return false;\n        value = plaintext;\n        return true;\n    }\n    catch (CryptographicException) { return false; }\n}\n"
    }
  ]
};
