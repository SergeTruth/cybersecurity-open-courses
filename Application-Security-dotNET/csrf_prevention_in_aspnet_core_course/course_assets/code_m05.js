window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'APIs, SPAs, and JavaScript Clients' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Issue a request token to a same-origin authenticated client",
      "language": "csharp",
      "blurb": "Map this handler to a GET endpoint requiring authorization. Do not enable CORS for it. no-store prevents a shared cache from reusing identity-bound token responses.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static IResult IssueRequestToken(HttpContext context, IAntiforgery antiforgery)\n{\n    if (context.User.Identity?.IsAuthenticated != true) return Results.Unauthorized();\n    context.Response.Headers.CacheControl = \"no-store\";\n    var tokens = antiforgery.GetAndStoreTokens(context);\n    return Results.Json(new { requestToken = tokens.RequestToken });\n}\n// Browser: send requestToken in X-CSRF-TOKEN with the original cookie on the unsafe request.\n"
    },
    {
      "title": "Guard a JSON endpoint explicitly",
      "language": "csharp",
      "blurb": "Minimal JSON APIs do not gain antiforgery enforcement merely by registering services. This handler validates before returning success; apply domain authorization before any actual write.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static async Task<IResult> ProtectedJsonPost(HttpContext context, IAntiforgery antiforgery)\n{\n    if (context.User.Identity?.IsAuthenticated != true) return Results.Unauthorized();\n    if (!HttpMethods.IsPost(context.Request.Method)) return Results.StatusCode(405);\n    try { await antiforgery.ValidateRequestAsync(context); }\n    catch (AntiforgeryValidationException) { return Results.BadRequest(new { error = \"invalid_request_intent\" }); }\n    return Results.NoContent();\n}\n"
    }
  ]
};
