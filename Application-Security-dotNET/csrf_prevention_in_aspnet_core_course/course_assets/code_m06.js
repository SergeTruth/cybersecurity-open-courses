window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'SameSite Cookies and Defense in Depth' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Configure a secure authentication cookie",
      "language": "csharp",
      "blurb": "Trusted bootstrap for a same-site web application. SameSite is defense in depth, not a replacement for validating tokens. Review external-login compatibility separately.",
      "code": "using Microsoft.AspNetCore.Authentication.Cookies;\npublic static void AddApplicationCookie(IServiceCollection services)\n{\n    services.AddAuthentication(\"AppCookie\").AddCookie(\"AppCookie\", options =>\n    {\n        options.Cookie.Name = \"__Host-session\";\n        options.Cookie.Path = \"/\";\n        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;\n        options.Cookie.HttpOnly = true;\n        options.Cookie.SameSite = SameSiteMode.Strict;\n        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);\n        options.SlidingExpiration = false;\n    });\n}\n"
    },
    {
      "title": "Protect logout from cross-site requests",
      "language": "csharp",
      "blurb": "Logout changes authentication state. This example requires POST and an authenticated antiforgery pair before signing out the application cookie.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\nusing Microsoft.AspNetCore.Authentication;\npublic static async Task<IResult> LogoutAsync(HttpContext context, IAntiforgery antiforgery)\n{\n    if (!HttpMethods.IsPost(context.Request.Method)) return Results.StatusCode(405);\n    if (context.User.Identity?.IsAuthenticated != true) return Results.Unauthorized();\n    try { await antiforgery.ValidateRequestAsync(context); }\n    catch (AntiforgeryValidationException) { return Results.BadRequest(new { error = \"invalid_request_intent\" }); }\n    await context.SignOutAsync(\"AppCookie\");\n    return Results.NoContent();\n}\n"
    }
  ]
};
