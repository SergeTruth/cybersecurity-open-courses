window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Middleware Order and Endpoint Scope' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Install rate limiting after identity middleware",
      "language": "csharp",
      "blurb": "The extension fixes the reviewed routing, authentication, authorization, and rate-limiter order in one place. Partitioners can therefore use an authenticated identity, while authorization still runs before a protected endpoint handler.",
      "code": "using Microsoft.AspNetCore.Builder;\n\npublic static class ReviewedRateLimitPipeline\n{\n    public static IApplicationBuilder UseReviewedRateLimitPipeline(this IApplicationBuilder app)\n    {\n        ArgumentNullException.ThrowIfNull(app);\n        app.UseRouting();\n        app.UseAuthentication();\n        app.UseAuthorization();\n        app.UseRateLimiter();\n        return app;\n    }\n}\n"
    },
    {
      "title": "Map a protected endpoint to a named limiter",
      "language": "csharp",
      "blurb": "The route uses a fixed template and handler, requires the reviewed authorization policy, and explicitly attaches the named authenticated API limiter so a new endpoint cannot silently inherit an unrelated global policy.",
      "code": "using Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Http;\nusing Microsoft.AspNetCore.Routing;\n\npublic static class RateLimitedOrderEndpoint\n{\n    public static RouteHandlerBuilder Map(IEndpointRouteBuilder endpoints)\n    {\n        ArgumentNullException.ThrowIfNull(endpoints);\n        return endpoints.MapGet(\"/api/orders/{id}\", (string id) => Results.Ok(new { id }))\n            .RequireAuthorization(\"orders.read\")\n            .RequireRateLimiting(\"authenticated-api\");\n    }\n}\n"
    }
  ]
};
