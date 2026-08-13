window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Request Placement, Transport, and Exposure Paths' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Accept API keys only from one HTTPS request header",
      "language": "csharp",
      "blurb": "The boundary rejects non-HTTPS requests, query-string credentials, missing or repeated headers, and anything outside the one canonical 256-bit Base64URL key form.",
      "code": "using Microsoft.AspNetCore.Http;\n\npublic static class ApiKeyRequestBoundary\n{\n    private const string HeaderName = \"X-Api-Key\";\n\n    public static bool TryRead(HttpRequest request, out string apiKey)\n    {\n        ArgumentNullException.ThrowIfNull(request);\n        apiKey = string.Empty;\n        if (!request.IsHttps ||\n            request.Query.ContainsKey(\"api_key\") ||\n            !request.Headers.TryGetValue(HeaderName, out var values) ||\n            values.Count != 1)\n        {\n            return false;\n        }\n\n        var candidate = values[0];\n        if (!IsCanonicalKey(candidate)) return false;\n        apiKey = candidate!;\n        return true;\n    }\n\n    private static bool IsCanonicalKey(string? value) =>\n        value is { Length: 43 } && value.All(character =>\n            char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    },
    {
      "title": "Place third-party API keys in reviewed outbound headers",
      "language": "csharp",
      "blurb": "The factory accepts one canonical key, an application-owned HTTPS destination allowlist, no URI credentials or alternate ports, and returns a request that never places the key in its URL.",
      "code": "public static class PartnerApiRequest\n{\n    private static readonly HashSet<string> AllowedHosts = new(\n        StringComparer.OrdinalIgnoreCase)\n    {\n        \"payments.example.com\",\n        \"reports.example.com\"\n    };\n\n    public static HttpRequestMessage Create(Uri endpoint, string apiKey)\n    {\n        if (!IsApproved(endpoint))\n            throw new ArgumentException(\"Endpoint rejected.\", nameof(endpoint));\n        if (!IsCanonicalKey(apiKey))\n            throw new ArgumentException(\"API key rejected.\", nameof(apiKey));\n\n        var request = new HttpRequestMessage(HttpMethod.Get, endpoint);\n        if (!request.Headers.TryAddWithoutValidation(\"X-Api-Key\", apiKey))\n        {\n            request.Dispose();\n            throw new InvalidOperationException(\"API key header could not be added.\");\n        }\n        return request;\n    }\n\n    private static bool IsApproved(Uri endpoint) =>\n        endpoint is { IsAbsoluteUri: true } &&\n        endpoint.Scheme == Uri.UriSchemeHttps &&\n        string.IsNullOrEmpty(endpoint.UserInfo) &&\n        (endpoint.IsDefaultPort || endpoint.Port == 443) &&\n        AllowedHosts.Contains(endpoint.IdnHost);\n\n    private static bool IsCanonicalKey(string value) =>\n        value is { Length: 43 } && value.All(character =>\n            char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    }
  ]
};
