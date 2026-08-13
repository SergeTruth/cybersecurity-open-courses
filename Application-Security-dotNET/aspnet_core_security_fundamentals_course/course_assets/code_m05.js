window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Cookies, Sessions, CSRF, and CORS' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Configure antiforgery and credentialed CORS as one browser boundary",
      "language": "csharp",
      "blurb": "The browser policy uses a host-only secure antiforgery cookie, a dedicated request header, one exact HTTPS origin, explicit methods and headers, credentials, and a bounded preflight cache.",
      "code": "public static class BrowserRequestSecurity\n{\n    public static IServiceCollection AddBrowserRequestSecurity(\n        this IServiceCollection services)\n    {\n        ArgumentNullException.ThrowIfNull(services);\n        services.AddAntiforgery(options =>\n        {\n            options.HeaderName = \"X-CSRF-TOKEN\";\n            options.Cookie.Name = \"__Host-orders-antiforgery\";\n            options.Cookie.HttpOnly = true;\n            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;\n            options.Cookie.SameSite = SameSiteMode.Strict;\n            options.Cookie.Path = \"/\";\n        });\n        services.AddCors(options =>\n        {\n            options.AddPolicy(\"browser-client\", policy =>\n                policy.WithOrigins(\"https://app.example.com\")\n                    .WithMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\")\n                    .WithHeaders(\"content-type\", \"x-csrf-token\")\n                    .AllowCredentials()\n                    .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));\n        });\n        return services;\n    }\n}\n"
    },
    {
      "title": "Require antiforgery validation on cookie-authenticated mutations",
      "language": "csharp",
      "blurb": "The endpoint group requires authentication and antiforgery for state-changing form requests, while the handler accepts a narrow validated form field instead of binding an unrestricted object graph.",
      "code": "using System.Text;\nusing Microsoft.AspNetCore.Antiforgery;\nusing Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Routing;\n\npublic static class ProfileEndpoints\n{\n    public static RouteGroupBuilder MapProfileEndpoints(IEndpointRouteBuilder routes)\n    {\n        ArgumentNullException.ThrowIfNull(routes);\n        var group = routes.MapGroup(\"/profile\")\n            .RequireAuthorization()\n            .WithMetadata(new RequireAntiforgeryTokenAttribute(true));\n\n        group.MapPost(\"/display-name\", (string displayName) =>\n        {\n            if (!IsDisplayName(displayName)) return Results.BadRequest();\n            return Results.Ok(new { displayName });\n        });\n        return group;\n    }\n\n    private static bool IsDisplayName(string value) =>\n        !string.IsNullOrWhiteSpace(value) &&\n        Encoding.UTF8.GetByteCount(value) <= 128 &&\n        string.Equals(value, value.Trim(), StringComparison.Ordinal) &&\n        !value.Any(char.IsControl);\n}\n"
    }
  ]
};
