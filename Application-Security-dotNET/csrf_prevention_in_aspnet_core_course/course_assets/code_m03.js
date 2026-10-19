window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'ASP.NET Core Antiforgery Fundamentals' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Register secure antiforgery services",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Register at trusted bootstrap. This configures tokens; validation still belongs on unsafe endpoints.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static void AddRequestIntentProtection(IServiceCollection services)\n{\n    services.AddAntiforgery(options =>\n    {\n        options.HeaderName = \"X-CSRF-TOKEN\";\n        options.Cookie.Name = \"__Host-csrf\";\n        options.Cookie.Path = \"/\";\n        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;\n        options.Cookie.HttpOnly = true;\n        options.Cookie.SameSite = SameSiteMode.Strict;\n    });\n}\n"
    },
    {
      "title": "Validate before the protected handler runs",
      "language": "csharp",
      "blurb": "Register services first; invoke after authentication. The framework checks the cookie/request-token pair. Authentication and object authorization remain separate required controls.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static async Task<IResult> CheckRequestIntentAsync(HttpContext context, IAntiforgery antiforgery)\n{\n    if (context.User.Identity?.IsAuthenticated != true) return Results.Unauthorized();\n    if (!HttpMethods.IsPost(context.Request.Method)) return Results.StatusCode(405);\n    try { await antiforgery.ValidateRequestAsync(context); }\n    catch (AntiforgeryValidationException) { return Results.BadRequest(new { error = \"invalid_request_intent\" }); }\n    // Only now may the caller perform its independently authorized mutation.\n    return Results.NoContent();\n}\n"
    }
  ]
};
