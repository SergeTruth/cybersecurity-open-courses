window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Kestrel Request Limits and Server-Side Controls' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Apply reviewed Kestrel request limits",
      "language": "csharp",
      "blurb": "The helper writes application-owned body, header-count, header-size, request-header timeout, keep-alive timeout, and minimum request-body data-rate limits directly to Kestrel rather than accepting them from each request.",
      "code": "using Microsoft.AspNetCore.Server.Kestrel.Core;\n\npublic static class ReviewedKestrelLimits\n{\n    public static void Apply(KestrelServerOptions options)\n    {\n        ArgumentNullException.ThrowIfNull(options);\n        options.Limits.MaxRequestBodySize = 2 * 1024 * 1024;\n        options.Limits.MaxRequestHeaderCount = 64;\n        options.Limits.MaxRequestHeadersTotalSize = 32 * 1024;\n        options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);\n        options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(2);\n        options.Limits.MinRequestBodyDataRate =\n            new MinDataRate(bytesPerSecond: 240, gracePeriod: TimeSpan.FromSeconds(5));\n    }\n}\n"
    },
    {
      "title": "Read a request body under an application byte ceiling",
      "language": "csharp",
      "blurb": "The helper validates a small application-owned limit, requests at most the remaining bytes plus one, honors cancellation, rejects empty and oversized bodies, and returns an owned array rather than continuing to expose the request stream.",
      "code": "using System.Buffers;\n\npublic static class BoundedRequestBody\n{\n    public static async Task<byte[]> ReadAsync(\n        Stream body,\n        int maximumBytes,\n        CancellationToken cancellationToken)\n    {\n        ArgumentNullException.ThrowIfNull(body);\n        if (!body.CanRead || maximumBytes is < 1 or > 2 * 1024 * 1024)\n            throw new ArgumentException(\"Request body policy rejected.\");\n        var rented = ArrayPool<byte>.Shared.Rent(Math.Min(maximumBytes + 1, 64 * 1024));\n        try\n        {\n            using var output = new MemoryStream(Math.Min(maximumBytes, 64 * 1024));\n            while (output.Length <= maximumBytes)\n            {\n                var remaining = maximumBytes + 1 - checked((int)output.Length);\n                var read = await body.ReadAsync(\n                    rented.AsMemory(0, Math.Min(rented.Length, remaining)), cancellationToken)\n                    .ConfigureAwait(false);\n                if (read == 0) break;\n                await output.WriteAsync(rented.AsMemory(0, read), cancellationToken)\n                    .ConfigureAwait(false);\n            }\n            if (output.Length is 0 || output.Length > maximumBytes)\n                throw new InvalidDataException(\"Request body byte limit exceeded.\");\n            return output.ToArray();\n        }\n        finally\n        {\n            ArrayPool<byte>.Shared.Return(rented, clearArray: true);\n        }\n    }\n}\n"
    }
  ]
};
