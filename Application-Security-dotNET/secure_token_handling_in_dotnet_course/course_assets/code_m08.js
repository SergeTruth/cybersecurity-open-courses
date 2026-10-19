window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Signing Keys, Protection Keys, and Rotation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Use HTTPS discovery for signing-key rollover",
      "language": "csharp",
      "blurb": "Configure the real JWT bearer handler to refresh metadata on an unknown signing key. The fixed authority remains trusted; token-controlled jku/x5u values must not select a download URL. This augments the full validation policy from module 3.",
      "code": "using Microsoft.AspNetCore.Authentication.JwtBearer;\npublic static void ConfigureSigningKeyRollover(JwtBearerOptions options)\n{\n    options.Authority = \"https://identity.example.com/\";\n    options.RequireHttpsMetadata = true;\n    options.RefreshOnIssuerKeyNotFound = true;\n    options.BackchannelTimeout = TimeSpan.FromSeconds(5);\n    // Keep issuer, audience, lifetime, signature, and algorithm validation from module 3 enabled.\n}\n"
    },
    {
      "title": "Reject tokens issued by another issuer",
      "language": "csharp",
      "blurb": "A real validator regression fixture for signing-key trust. Construct the second token with a different test issuer; a positive accepted-token control prevents an always-rejecting validator from passing.",
      "code": "using Microsoft.IdentityModel.JsonWebTokens;\nusing Microsoft.IdentityModel.Tokens;\npublic static async Task AssertIssuerBound(string accepted, string otherIssuerToken, TokenValidationParameters policy)\n{\n    var handler = new JsonWebTokenHandler { MapInboundClaims = false, MaximumTokenSizeInBytes = 16384 };\n    if (!(await handler.ValidateTokenAsync(accepted, policy)).IsValid) throw new InvalidOperationException(\"Positive control failed.\");\n    if ((await handler.ValidateTokenAsync(otherIssuerToken, policy)).IsValid) throw new InvalidOperationException(\"Foreign issuer accepted.\");\n}\n"
    }
  ]
};
