window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Common Misuse Patterns and Review Checklist' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Regression-test expired payload rejection",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. No sleeps or network are required: a deliberately past expiration should fail. Use a disposable test provider rather than production key storage.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static void AssertExpiryEnforced(IDataProtectionProvider provider)\n{\n    var protector = provider.CreateProtector(\"Tests.Expiry.v1\").ToTimeLimitedDataProtector();\n    var token = protector.Protect(\"nonsecret\", DateTimeOffset.UtcNow.AddMinutes(-1));\n    try { protector.Unprotect(token); }\n    catch (CryptographicException) { return; }\n    throw new InvalidOperationException(\"Expired payload was accepted.\");\n}\n"
    },
    {
      "title": "Regression-test tamper rejection",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Tamper with protected bytes, not merely a noncanonical text encoding. A test-only ephemeral provider avoids writing production key material.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static void AssertTamperRejected()\n{\n    var protector = new EphemeralDataProtectionProvider().CreateProtector(\"Tests.Tamper.v1\");\n    var token = protector.Protect(new byte[] { 1, 2, 3 });\n    token[token.Length / 2] ^= 1;\n    try { protector.Unprotect(token); }\n    catch (CryptographicException) { return; }\n    throw new InvalidOperationException(\"Tampered payload was accepted.\");\n}\n"
    }
  ]
};
