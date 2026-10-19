window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'ASP.NET Core Identity and Data Protection Tokens' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Configure Identity token lifetime through the actual provider",
      "language": "csharp",
      "blurb": "ASP.NET Core Identity with an application-owned IUserStore configured separately. Persist and encrypt Data Protection keys as taught in the Data Protection course. Do not place account tokens in logs.",
      "code": "using Microsoft.AspNetCore.Identity;\npublic static void AddIdentityTokens(IServiceCollection services)\n{\n    services.AddIdentityCore<IdentityUser>().AddDefaultTokenProviders();\n    services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromMinutes(30));\n}\n// Register the real IUserStore/role policy and rate-limit recovery endpoints before serving requests.\n"
    },
    {
      "title": "Let Identity validate a password-reset token",
      "language": "csharp",
      "blurb": "The recovery service chooses the account through the verified recovery workflow. ResetPasswordAsync checks the purpose-bound token and applies password policy; its returned errors are not echoed as internal diagnostics.",
      "code": "using Microsoft.AspNetCore.Identity;\npublic static async Task<bool> ResetApprovedAccountPassword(UserManager<IdentityUser> users, IdentityUser account, string token, string newPassword)\n{\n    if (token is not { Length: > 0 and <= 4096 } || newPassword is not { Length: >= 12 and <= 256 }) return false;\n    var result = await users.ResetPasswordAsync(account, token, newPassword);\n    return result.Succeeded;\n}\n// Enforce recovery authorization, throttling, audit, and session revocation at the service boundary.\n"
    }
  ]
};
