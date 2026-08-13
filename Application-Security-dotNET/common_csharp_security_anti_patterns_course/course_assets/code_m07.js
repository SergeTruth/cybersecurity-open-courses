window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Token, Cookie, and Credential Handling Mistakes' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Read bearer credentials from one HTTPS header only",
      "language": "csharp",
      "blurb": "The request boundary requires HTTPS, rejects query-string and cookie credentials, requires one Authorization value with the exact Bearer scheme, and copies only a canonical bounded Base64URL token.",
      "code": "using Microsoft.Extensions.Primitives;\n\npublic sealed class BearerCredential\n{\n    private BearerCredential(string token) => Token = token;\n\n    public string Token { get; }\n\n    public static BearerCredential Read(HttpRequest request)\n    {\n        ArgumentNullException.ThrowIfNull(request);\n        if (!request.IsHttps || request.Query.ContainsKey(\"access_token\") ||\n            request.Cookies.ContainsKey(\"access_token\") ||\n            !request.Headers.TryGetValue(\"Authorization\", out StringValues values) ||\n            values.Count != 1)\n        {\n            throw new UnauthorizedAccessException(\"Bearer credential boundary rejected.\");\n        }\n\n        var header = values[0];\n        if (header is null || !header.StartsWith(\"Bearer \", StringComparison.OrdinalIgnoreCase))\n            throw new UnauthorizedAccessException(\"Bearer scheme rejected.\");\n        var token = header[7..];\n        if (token.Length is < 43 or > 128 ||\n            !token.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_'))\n        {\n            throw new UnauthorizedAccessException(\"Bearer token syntax rejected.\");\n        }\n        return new BearerCredential(token);\n    }\n}\n"
    },
    {
      "title": "Issue a host-bound browser session cookie without exposing it in a body",
      "language": "csharp",
      "blurb": "The writer validates one canonical high-entropy value, uses a __Host- cookie with Secure, HttpOnly, strict same-site, root path, and bounded expiry, and prevents caching of the response carrying the credential.",
      "code": "public static class BrowserSessionCookie\n{\n    public static void Append(\n        HttpResponse response,\n        string sessionValue,\n        TimeProvider clock)\n    {\n        ArgumentNullException.ThrowIfNull(response);\n        ArgumentNullException.ThrowIfNull(clock);\n        if (sessionValue is null || sessionValue.Length != 43 ||\n            !sessionValue.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_'))\n        {\n            throw new ArgumentException(\"Session value rejected.\", nameof(sessionValue));\n        }\n\n        var now = clock.GetUtcNow();\n        if (now > DateTimeOffset.MaxValue.AddMinutes(-30))\n            throw new InvalidOperationException(\"Session clock value rejected.\");\n        response.Cookies.Append(\"__Host-orders-session\", sessionValue, new CookieOptions\n        {\n            Secure = true,\n            HttpOnly = true,\n            SameSite = SameSiteMode.Strict,\n            Path = \"/\",\n            Expires = now.AddMinutes(30),\n            IsEssential = true\n        });\n        response.Headers.CacheControl = \"no-store\";\n        response.Headers.Pragma = \"no-cache\";\n    }\n}\n"
    }
  ]
};
