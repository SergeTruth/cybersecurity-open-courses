window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Connection Strings, Certificates, Keys, and Tokens' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Load a bounded PKCS#12 certificate into ephemeral key storage",
      "language": "csharp",
      "blurb": "The loader validates archive and password bounds, uses the current X509CertificateLoader API with ephemeral nonexportable key storage, requires a private key and current validity, and disposes a rejected certificate before returning.",
      "code": "using System.Security.Cryptography.X509Certificates;\n\npublic static class ServiceCertificateLoader\n{\n    public static X509Certificate2 Load(\n        ReadOnlySpan<byte> pkcs12,\n        ReadOnlySpan<char> password,\n        TimeProvider clock)\n    {\n        ArgumentNullException.ThrowIfNull(clock);\n        if (pkcs12.Length is 0 or > 1024 * 1024 ||\n            password.Length is 0 or > 256 || ContainsControl(password))\n        {\n            throw new ArgumentException(\"Certificate input rejected.\");\n        }\n\n        var certificate = X509CertificateLoader.LoadPkcs12(\n            pkcs12,\n            password,\n            X509KeyStorageFlags.EphemeralKeySet);\n        var now = clock.GetUtcNow().UtcDateTime;\n        if (!certificate.HasPrivateKey || certificate.NotBefore.ToUniversalTime() > now ||\n            certificate.NotAfter.ToUniversalTime() <= now)\n        {\n            certificate.Dispose();\n            throw new InvalidOperationException(\"Service certificate rejected.\");\n        }\n        return certificate;\n    }\n\n    private static bool ContainsControl(ReadOnlySpan<char> value)\n    {\n        foreach (var character in value)\n        {\n            if (char.IsControl(character)) return true;\n        }\n        return false;\n    }\n}\n"
    },
    {
      "title": "Apply an outbound service token to one approved request",
      "language": "csharp",
      "blurb": "The boundary validates one canonical bounded token, requires an absolute HTTPS request to the application-owned host and port, rejects existing authorization state, and uses AuthenticationHeaderValue instead of query strings or string-built headers.",
      "code": "using System.Net.Http.Headers;\n\npublic static class OutboundServiceToken\n{\n    public static void Apply(HttpRequestMessage request, string token)\n    {\n        ArgumentNullException.ThrowIfNull(request);\n        var endpoint = request.RequestUri;\n        if (endpoint is null || !endpoint.IsAbsoluteUri ||\n            endpoint.Scheme != Uri.UriSchemeHttps ||\n            !string.Equals(endpoint.IdnHost, \"payments.example.com\", StringComparison.Ordinal) ||\n            (!endpoint.IsDefaultPort && endpoint.Port != 443) ||\n            !string.IsNullOrEmpty(endpoint.UserInfo) || request.Headers.Authorization is not null)\n        {\n            throw new InvalidOperationException(\"Outbound token destination rejected.\");\n        }\n        if (token is null || token.Length is < 43 or > 256 ||\n            !token.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_'))\n        {\n            throw new ArgumentException(\"Service token rejected.\", nameof(token));\n        }\n        request.Headers.Authorization = new AuthenticationHeaderValue(\"Bearer\", token);\n    }\n}\n"
    }
  ]
};
