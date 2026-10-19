window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'HTTPS, Redirects, and HSTS' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Configure HTTPS redirection and HSTS explicitly",
      "language": "csharp",
      "blurb": "ASP.NET Core 8 browser application registration. Set the reviewed external HTTPS port. Enable subdomain/preload policy only after auditing every subdomain; these are intentionally disabled here.",
      "code": "using Microsoft.AspNetCore.Builder;\npublic static void RegisterHttpsPolicy(IServiceCollection services)\n{\n    services.AddHttpsRedirection(options => { options.HttpsPort = 443; options.RedirectStatusCode = 307; });\n    services.AddHsts(options => { options.MaxAge = TimeSpan.FromDays(30); options.IncludeSubDomains = false; options.Preload = false; });\n}\n"
    },
    {
      "title": "Activate the HTTPS policy in the request pipeline",
      "language": "csharp",
      "blurb": "Use this before endpoints. APIs that must never accept plaintext should reject it at ingress instead of relying on redirects. Behind a TLS terminator, configure forwarded headers for specific trusted proxies before this middleware; do not trust arbitrary forwarded values.",
      "code": "using Microsoft.AspNetCore.Builder;\nusing Microsoft.Extensions.Hosting;\npublic static void ActivateHttpsPolicy(WebApplication app)\n{\n    if (!app.Environment.IsDevelopment()) app.UseHsts();\n    app.UseHttpsRedirection();\n}\n// Requires RegisterHttpsPolicy at bootstrap. Provision a real HTTPS listener/certificate.\n// HSTS takes effect only after the browser receives it over HTTPS; it is not first-hop TLS.\n"
    }
  ]
};
