window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Content Security Policy and Browser-Side Defense Layers' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Issue a nonce-bound Content Security Policy",
      "language": "csharp",
      "blurb": "The factory generates a fresh 256-bit nonce internally and builds a fixed policy that denies all sources by default, admits only nonce-bearing same-origin script, and restricts objects, base URIs, frames, forms, styles, images, and connections.",
      "code": "using System.Security.Cryptography;\n\npublic sealed class ContentSecurityPolicy\n{\n    private ContentSecurityPolicy(string nonce, string headerValue)\n    {\n        Nonce = nonce;\n        HeaderValue = headerValue;\n    }\n\n    public string Nonce { get; }\n    public string HeaderValue { get; }\n\n    public static ContentSecurityPolicy Create()\n    {\n        var nonce = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));\n        var header =\n            \"default-src 'none'; \" +\n            $\"script-src 'self' 'nonce-{nonce}'; \" +\n            \"style-src 'self'; img-src 'self'; connect-src 'self'; \" +\n            \"object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'\";\n        return new ContentSecurityPolicy(nonce, header);\n    }\n}\n"
    },
    {
      "title": "Return an immutable browser security-header set",
      "language": "csharp",
      "blurb": "The header catalog is assembled only from fixed reviewed names and values, copied behind a read-only dictionary, and includes a restrictive script-free CSP plus nosniff, referrer, permissions, and cross-origin isolation policies.",
      "code": "using System.Collections.ObjectModel;\n\npublic sealed class BrowserSecurityHeaders\n{\n    private readonly ReadOnlyDictionary<string, string> _values;\n\n    private BrowserSecurityHeaders(Dictionary<string, string> values) =>\n        _values = new ReadOnlyDictionary<string, string>(values);\n\n    public IReadOnlyDictionary<string, string> Values => _values;\n\n    public static BrowserSecurityHeaders Create() => new(new Dictionary<string, string>(\n        StringComparer.OrdinalIgnoreCase)\n    {\n        [\"Content-Security-Policy\"] =\n            \"default-src 'none'; style-src 'self'; img-src 'self'; \" +\n            \"object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'\",\n        [\"X-Content-Type-Options\"] = \"nosniff\",\n        [\"Referrer-Policy\"] = \"no-referrer\",\n        [\"Permissions-Policy\"] = \"camera=(), microphone=(), geolocation=()\",\n        [\"Cross-Origin-Opener-Policy\"] = \"same-origin\"\n    });\n}\n"
    }
  ]
};
