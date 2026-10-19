window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'CORS, Origin Checks, and Boundary Confusion' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Keep CORS and antiforgery controls distinct",
      "language": "csharp",
      "blurb": "Optional exact-origin CORS policy for a trusted credentialed browser client. Every cookie-authenticated unsafe endpoint must still validate the antiforgery token.",
      "code": "public static void AddBrowserCors(IServiceCollection services)\n{\n    services.AddCors(options => options.AddPolicy(\"TrustedBrowser\", policy =>\n        policy.WithOrigins(\"https://app.example.com\")\n              .WithMethods(\"POST\").WithHeaders(\"content-type\", \"X-CSRF-TOKEN\")\n              .AllowCredentials()));\n}\n// Apply UseCors(\"TrustedBrowser\") after routing and before authorization.\n// A denied CORS response does NOT prove a simple form POST did not execute.\n"
    },
    {
      "title": "Test the missing-token rejection boundary",
      "language": "csharp",
      "blurb": "Call this check with application-configured antiforgery services in an isolated test. It makes no HTTP connection and fails if a tokenless unsafe request is accepted.",
      "code": "using Microsoft.AspNetCore.Antiforgery;\npublic static async Task AssertMissingTokenRejected(IAntiforgery antiforgery, IServiceProvider services)\n{\n    var context = new DefaultHttpContext { RequestServices = services };\n    context.Request.Method = \"POST\";\n    context.Request.Scheme = \"https\";\n    context.Request.ContentType = \"application/json\";\n    try { await antiforgery.ValidateRequestAsync(context); }\n    catch (AntiforgeryValidationException) { return; }\n    throw new InvalidOperationException(\"Tokenless POST was accepted.\");\n}\n"
    }
  ]
};
