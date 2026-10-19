window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Time-Limited Payloads and Workflow Tokens' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Issue a genuinely time-limited workflow token",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Call only after the authenticated application authorizes the workflow. The token binds tenant, subject, and object IDs and expires after 15 minutes; the caller cannot select purpose or lifetime.",
      "code": "using Microsoft.AspNetCore.DataProtection;\npublic static string IssueApprovalToken(IDataProtectionProvider provider, Guid tenant, Guid subject, Guid order)\n{\n    if (tenant == Guid.Empty || subject == Guid.Empty || order == Guid.Empty) throw new ArgumentException(\"Identity required.\");\n    var protector = provider.CreateProtector(\"Orders.Approval.v1\").ToTimeLimitedDataProtector();\n    return protector.Protect($\"{tenant:D}|{subject:D}|{order:D}\", TimeSpan.FromMinutes(15));\n}\n"
    },
    {
      "title": "Check expiry and identity before using a workflow token",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Tenant/subject/order come from authenticated and authorized server state. The protected value must match all three. For a one-use mutation, atomically consume a stored workflow ID with the business update; this check alone does not prevent replay.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography;\npublic static bool ValidateApprovalToken(IDataProtectionProvider provider, string token, Guid tenant, Guid subject, Guid order)\n{\n    if (token is not { Length: > 0 and <= 4096 } || tenant == Guid.Empty || subject == Guid.Empty || order == Guid.Empty) return false;\n    try\n    {\n        var protector = provider.CreateProtector(\"Orders.Approval.v1\").ToTimeLimitedDataProtector();\n        var value = protector.Unprotect(token, out _); // Framework verifies the embedded expiry.\n        return value == $\"{tenant:D}|{subject:D}|{order:D}\";\n    }\n    catch (CryptographicException) { return false; }\n}\n"
    }
  ]
};
