window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Common CSRF Prevention Mistakes' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Handle validation failures without echoing token data",
      "language": "csharp",
      "blurb": "Only the expected validation exception becomes a sanitized client rejection. Configuration and programming defects are not disguised as ordinary invalid tokens.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static async Task<bool> HasValidRequestIntent(IAntiforgery antiforgery, HttpContext context)\n{\n    try { await antiforgery.ValidateRequestAsync(context); return true; }\n    catch (AntiforgeryValidationException) { return false; }\n}\n// Never log cookie values, request tokens, or the exception message.\n// Invoke on unsafe endpoints after authentication; a true result does not grant object access.\n"
    },
    {
      "title": "Require the token on unsafe MVC endpoints",
      "language": "csharp",
      "blurb": "The action demonstrates framework filter placement. AddControllersWithViews, authentication, and authorization middleware are required; a real operation adds object authorization before persistence.",
      "code": "using Microsoft.AspNetCore.Authorization;\nusing Microsoft.AspNetCore.Mvc;\n[Authorize]\npublic sealed class ReviewController : Controller\n{\n    [HttpPost(\"/review/confirm\")]\n    [ValidateAntiForgeryToken]\n    public IActionResult Confirm() => NoContent();\n}\n"
    }
  ]
};
