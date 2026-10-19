window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Deployment Review and Header Governance' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Register one header owner for the final response",
      "language": "csharp",
      "blurb": "Use once before application endpoints. OnStarting applies centrally reviewed policy to the final response; do not combine this with competing CSP writers. HSTS remains the HTTPS-only middleware from module 3.",
      "code": "using Microsoft.AspNetCore.Builder;\npublic static void UseReviewedHeaders(WebApplication app)\n{\n    app.Use(async (context, next) =>\n    {\n        context.Response.OnStarting(() =>\n        {\n            var h = context.Response.Headers;\n            h[\"Content-Security-Policy\"] = \"default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'\";\n            h[\"X-Frame-Options\"] = \"DENY\";\n            h[\"X-Content-Type-Options\"] = \"nosniff\";\n            h[\"Referrer-Policy\"] = \"no-referrer\";\n            h[\"Permissions-Policy\"] = \"camera=(), microphone=(), geolocation=()\";\n            return Task.CompletedTask;\n        });\n        await next(context);\n    });\n}\n"
    },
    {
      "title": "Check the externally observed header contract",
      "language": "csharp",
      "blurb": "Call in a deployment test with a response from an approved HTTPS test route. Follow redirects only under the test environment authority policy; never turn certificate verification off.",
      "code": "public static void AssertObservedHeaders(HttpResponseMessage response)\n{\n    if (!response.IsSuccessStatusCode) throw new InvalidOperationException(\"Positive route failed.\");\n    foreach (var name in new[] { \"Content-Security-Policy\", \"X-Frame-Options\", \"X-Content-Type-Options\", \"Referrer-Policy\", \"Permissions-Policy\", \"Strict-Transport-Security\" })\n        if (!response.Headers.TryGetValues(name, out var values) || values.Count() != 1 || string.IsNullOrWhiteSpace(values.Single()))\n            throw new InvalidOperationException(\"Required response header absent or ambiguous.\");\n    // Also compare exact environment-approved values and exercise error/redirect responses.\n}\n"
    }
  ]
};
