window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Token Storage, Transmission, and Client Handling' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Keep browser session cookies secure",
      "language": "csharp",
      "blurb": "ASP.NET Core 8 cookie configuration for a same-site BFF. Store upstream tokens server-side, not in JavaScript-readable storage or cookie claims. Cookie-authenticated unsafe operations also require antiforgery validation.",
      "code": "using Microsoft.AspNetCore.Authentication.Cookies;\npublic static void AddBffSession(IServiceCollection services)\n{\n    services.AddAuthentication(\"Bff\").AddCookie(\"Bff\", options =>\n    {\n        options.Cookie.Name = \"__Host-bff\";\n        options.Cookie.Path = \"/\";\n        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;\n        options.Cookie.HttpOnly = true;\n        options.Cookie.SameSite = SameSiteMode.Strict;\n        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);\n        options.SlidingExpiration = false;\n    });\n}\n"
    },
    {
      "title": "Send a bearer credential only to a fixed resource",
      "language": "csharp",
      "blurb": "The token is retrieved from a trusted server-side token store for this resource, never from a query string. One application-owned client is reused; it disables redirects, cookies, and ambient proxies and bounds buffered responses.",
      "code": "using System.Net;\nusing System.Net.Http.Headers;\npublic sealed class OrdersResourceClient : IDisposable\n{\n    private readonly HttpClient _client = new(new SocketsHttpHandler\n    { AllowAutoRedirect = false, UseProxy = false, UseCookies = false, PooledConnectionLifetime = TimeSpan.FromMinutes(5) })\n    { Timeout = TimeSpan.FromSeconds(4), MaxResponseContentBufferSize = 65536 };\n    public async Task<HttpStatusCode> CheckAsync(string resourceAccessToken, CancellationToken cancellationToken)\n    {\n        if (resourceAccessToken is not { Length: > 0 and <= 8192 } || resourceAccessToken.Any(c => c <= 32 || c >= 127))\n            throw new ArgumentException(\"Invalid credential encoding.\");\n        using var request = new HttpRequestMessage(HttpMethod.Get, \"https://orders.example.com/health\");\n        request.Headers.Authorization = new AuthenticationHeaderValue(\"Bearer\", resourceAccessToken);\n        using var response = await _client.SendAsync(request, HttpCompletionOption.ResponseContentRead, cancellationToken);\n        if ((int)response.StatusCode is >= 300 and < 400) throw new HttpRequestException(\"Redirect rejected.\");\n        return response.StatusCode;\n    }\n    public void Dispose() => _client.Dispose();\n}\n"
    }
  ]
};
