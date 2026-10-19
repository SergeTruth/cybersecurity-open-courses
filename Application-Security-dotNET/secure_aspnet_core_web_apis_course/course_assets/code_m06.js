window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'CORS, Browser Clients, and API Exposure Controls' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Scope CORS, Browser Clients, and API Exposure Controls browser-facing policy",
      "language": "csharp",
      "blurb": "Registers an exact-origin CORS policy; the shown activation step is also required. Non-browser callers and some cross-origin requests can still reach the server. Apply authentication, authorization, and antiforgery where applicable independently.",
      "code": "public static void AddSecureWebM06CorsBrowserClientsExposureCors(IServiceCollection services)\n{\n    services.AddCors(options =>\n    {\n        options.AddPolicy(\"SECUREWEBM06CORSBROWSERCLIENTSEXPOSURE\", policy =>\n        {\n            policy.WithOrigins(\"https://app.example.com\")\n                  .WithMethods(\"GET\", \"POST\")\n                  .WithHeaders(\"authorization\", \"content-type\")\n                  .DisallowCredentials();\n        });\n    });\n}\n\n// Register above at bootstrap, then activate after UseRouting() and before authorization:\n// app.UseCors(\"SECUREWEBM06CORSBROWSERCLIENTSEXPOSURE\");\n// CORS controls browser response access, not authentication, authorization, or CSRF.\n"
    },
    {
      "title": "Return safe CORS, Browser Clients, and API Exposure Controls responses",
      "language": "csharp",
      "blurb": "Two independent helpers: the JSON result is safely serialized; call the header helper on the actual response before it starts. Neither activates the other. correlationId must be a server-generated bounded identifier; these helpers do not authenticate requests.",
      "code": "public static IResult SafeSecureWebM06CorsBrowserClientsExposureResponse(string correlationId)\n{\n    return Results.Json(\n        new { status = \"rejected\", correlationId },\n        statusCode: StatusCodes.Status400BadRequest);\n}\n\npublic static void AddSecureWebM06CorsBrowserClientsExposureHeaders(IHeaderDictionary headers)\n{\n    headers[\"X-Content-Type-Options\"] = \"nosniff\";\n    headers[\"Referrer-Policy\"] = \"no-referrer\";\n    headers[\"Content-Security-Policy\"] = \"default-src 'self'\";\n}\n"
    }
  ]
};
