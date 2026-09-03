window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Hosting, Middleware, and Runtime Settings' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Apply bounded Kestrel request limits at startup",
      "language": "csharp",
      "blurb": "The startup configuration suppresses server disclosure and fixes independent body, header count, total header size, header deadline, keep-alive, connection, and upgraded-connection limits before the server begins accepting requests.",
      "code": "using Microsoft.AspNetCore.Server.Kestrel.Core;\n\npublic static class KestrelSecurityLimits\n{\n    public static void Apply(KestrelServerOptions options)\n    {\n        ArgumentNullException.ThrowIfNull(options);\n        options.AddServerHeader = false;\n        options.Limits.MaxRequestBodySize = 1024 * 1024;\n        options.Limits.MaxRequestHeaderCount = 64;\n        options.Limits.MaxRequestHeadersTotalSize = 32 * 1024;\n        options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);\n        options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);\n        options.Limits.MaxConcurrentConnections = 1_000;\n        options.Limits.MaxConcurrentUpgradedConnections = 100;\n    }\n}\n"
    },
    {
      "title": "Map a runtime API group with complete endpoint policy",
      "language": "csharp",
      "blurb": "The mapping uses one fixed route group and attaches the application-owned authorization, rate-limit, and CORS policies at the group boundary so new endpoints inherit the same runtime controls instead of relying on per-handler convention.",
      "code": "using Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Routing;\n\npublic static class SecuredRuntimeApi\n{\n    public static RouteGroupBuilder MapSecuredRuntimeApi(this IEndpointRouteBuilder endpoints)\n    {\n        ArgumentNullException.ThrowIfNull(endpoints);\n        var group = endpoints.MapGroup(\"/api/orders\")\n            .RequireAuthorization(\"orders-api\")\n            .RequireRateLimiting(\"authenticated-writes\")\n            .RequireCors(\"orders-origin\");\n        group.MapGet(\"/{id}\", GetOrder);\n        return group;\n    }\n\n    private static IResult GetOrder(string id)\n    {\n        if (string.IsNullOrEmpty(id) || id.Length > 64 ||\n            !id.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_'))\n        {\n            return Results.BadRequest();\n        }\n        return Results.Ok(new { id });\n    }\n}\n"
    }
  ]
};
