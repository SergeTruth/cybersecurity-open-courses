window.COURSE_CODE_MODULE = {
  title: "Code Examples: Validate at C# Trust Boundaries",
  codeIntro: "These examples show validation at common C# trust boundaries before data moves deeper into the application.",
  codeExamples: [
    {
      title: "Validate Route, Query, and Header Input",
      blurb: "Treat every request component as external input, even when ASP.NET Core has already parsed it into framework objects.",
      language: "csharp",
      code: `public sealed record ListInvoicesRequest(
    Guid TenantId,
    int PageSize,
    string RequestId);

app.MapGet("/tenants/{tenantId:guid}/invoices", (
    Guid tenantId,
    HttpRequest request) =>
{
    var pageSizeText = request.Query["pageSize"].FirstOrDefault() ?? "25";
    var requestId = request.Headers["X-Request-Id"].FirstOrDefault()
        ?? Guid.NewGuid().ToString("N");

    if (!int.TryParse(pageSizeText, out var pageSize) ||
        pageSize is < 1 or > 100)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["pageSize"] = ["pageSize must be an integer from 1 to 100."]
        });
    }

    if (requestId.Length > 80)
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["X-Request-Id"] = ["Request ID is too long."]
        });
    }

    var input = new ListInvoicesRequest(tenantId, pageSize, requestId);
    return Results.Ok(input);
});`
    },
    {
      title: "Validate Configuration Before Use",
      blurb: "Environment variables and configuration values are also input. Validate them once at startup and fail with a clear message.",
      language: "csharp",
      code: `public sealed record UploadOptions(long MaxBytes, string StorageRoot);

public static UploadOptions ReadUploadOptions(IConfiguration config)
{
    var maxBytesText = config["Uploads:MaxBytes"];
    var storageRoot = config["Uploads:StorageRoot"];

    if (!long.TryParse(maxBytesText, out var maxBytes) ||
        maxBytes is < 1 or > 100_000_000)
    {
        throw new InvalidOperationException(
            "Uploads:MaxBytes must be between 1 and 100000000.");
    }

    if (string.IsNullOrWhiteSpace(storageRoot) ||
        !Path.IsPathFullyQualified(storageRoot))
    {
        throw new InvalidOperationException(
            "Uploads:StorageRoot must be an absolute path.");
    }

    return new UploadOptions(maxBytes, storageRoot);
}`
    }
  ]
};
