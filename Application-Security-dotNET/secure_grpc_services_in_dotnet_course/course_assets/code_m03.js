window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Transport Security with TLS and Client Certificates' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Read a fixed HTTPS endpoint with one deadline and a byte limit",
      "language": "csharp",
      "blurb": "The application-owned client disables redirects and proxies. One cooperative four-second cancellation deadline covers headers and body; actual bytes are capped at 64 KiB and the response is disposed on every path. This HTTP helper is not a gRPC client or an OS-level hard deadline.",
      "code": "using System.Net;\n\n// Application-owned client configuration, created once at bootstrap and disposed at shutdown.\n// No redirects or ambient proxy; TLS uses the platform certificate verifier.\npublic static HttpClient CreateTransportClient() => new(new SocketsHttpHandler\n{\n    AllowAutoRedirect = false, UseProxy = false, UseCookies = false,\n    ConnectTimeout = TimeSpan.FromSeconds(2), PooledConnectionLifetime = TimeSpan.FromMinutes(5)\n}) { Timeout = Timeout.InfiniteTimeSpan };\n\n// endpoint is a fixed service route, not a caller-supplied URL. Client is trusted bootstrap state.\npublic static async Task<byte[]> ReadTransportHealthAsync(HttpClient client, CancellationToken cancellationToken)\n{\n    using var deadline = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);\n    deadline.CancelAfter(TimeSpan.FromSeconds(4));\n    using var response = await client.GetAsync(new Uri(\"https://transport.example.com/health\"),\n        HttpCompletionOption.ResponseHeadersRead, deadline.Token);\n    response.EnsureSuccessStatusCode();\n    if (response.StatusCode != HttpStatusCode.OK) throw new HttpRequestException(\"Unexpected status.\");\n    const int limit = 65536;\n    if (response.Content.Headers.ContentLength > limit) throw new HttpRequestException(\"Body too large.\");\n    using var input = await response.Content.ReadAsStreamAsync(deadline.Token);\n    using var output = new MemoryStream();\n    var buffer = new byte[4096];\n    while (true)\n    {\n        int count = await input.ReadAsync(buffer.AsMemory(0, Math.Min(buffer.Length, limit - (int)output.Length + 1)), deadline.Token);\n        if (count == 0) break;\n        if (output.Length + count > limit) throw new HttpRequestException(\"Body too large.\");\n        output.Write(buffer, 0, count);\n    }\n    deadline.Token.ThrowIfCancellationRequested();\n    return output.ToArray();\n}\n"
    },
    {
      "title": "Validate Transport Security with TLS and Client Certificates peer identity inputs",
      "language": "csharp",
      "blurb": "The allowlist keeps host decisions explicit before a TLS-backed client is constructed.",
      "code": "public static bool IsSecureGrpcM03TransportSecurityTlsClientHostAllowed(string host)\n{\n    var allowed = new HashSet<string>(StringComparer.OrdinalIgnoreCase)\n    {\n        \"transport.example.com\",\n        \"security.example.com\"\n    };\n    return allowed.Contains(host);\n}\n"
    }
  ]
};
