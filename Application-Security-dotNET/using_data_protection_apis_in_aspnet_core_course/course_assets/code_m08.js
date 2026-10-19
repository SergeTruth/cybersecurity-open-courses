window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'App Isolation, Shared Cookies, and Multi-App Scenarios' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Test application isolation explicitly",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Providers must come from separately configured applications. A different application discriminator must prevent cross-application unprotect even with the same logical purpose.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static void AssertApplicationIsolation(IDataProtectionProvider orders, IDataProtectionProvider unrelatedApp)\n{\n    var token = orders.CreateProtector(\"Probe.v1\").Protect(\"nonsecret\");\n    try { unrelatedApp.CreateProtector(\"Probe.v1\").Unprotect(token); }\n    catch (CryptographicException) { return; }\n    throw new InvalidOperationException(\"Applications unexpectedly share protection.\");\n}\n"
    },
    {
      "title": "Use distinct purposes for unrelated payload types",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. A common key ring does not mean every component should understand every payload. Purpose strings are fixed by application code, and purpose mismatch is tested.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static void AssertPurposeIsolation(IDataProtectionProvider provider)\n{\n    var token = provider.CreateProtector(\"Orders.Invite.v1\").Protect(\"nonsecret\");\n    try { provider.CreateProtector(\"Orders.Export.v1\").Unprotect(token); }\n    catch (CryptographicException) { return; }\n    throw new InvalidOperationException(\"Purposes unexpectedly interoperable.\");\n}\n"
    }
  ]
};
