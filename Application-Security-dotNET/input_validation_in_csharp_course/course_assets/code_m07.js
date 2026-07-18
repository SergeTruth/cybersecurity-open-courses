window.COURSE_CODE_MODULE = {
  title: "Code Examples: Files, Paths, and Structured Input",
  codeIntro: "These examples validate filenames, resolved paths, and structured input before the application touches sensitive resources.",
  codeExamples: [
    {
      title: "Resolve User Paths Under an Approved Directory",
      blurb: "Normalize the candidate path and verify it remains inside the intended base directory before opening a file.",
      language: "csharp",
      code: `public static bool TryResolveUploadPath(
    string storageRoot,
    string originalFileName,
    out string safePath,
    out string? error)
{
    safePath = string.Empty;
    var fileName = Path.GetFileName(originalFileName);

    if (string.IsNullOrWhiteSpace(fileName) ||
        fileName.Length > 120 ||
        fileName.IndexOfAny(Path.GetInvalidFileNameChars()) >= 0)
    {
        error = "filename is not allowed.";
        return false;
    }

    var root = Path.GetFullPath(storageRoot);
    var candidate = Path.GetFullPath(Path.Combine(root, fileName));

    if (!candidate.StartsWith(root, StringComparison.OrdinalIgnoreCase))
    {
        error = "path escapes the upload directory.";
        return false;
    }

    safePath = candidate;
    error = null;
    return true;
}`
    },
    {
      title: "Constrain JSON Deserialization",
      blurb: "Structured input should have size, depth, and type expectations before it becomes application data.",
      language: "csharp",
      code: `public static async Task<CreateOrderRequest?> ReadOrderAsync(
    HttpRequest request,
    CancellationToken ct)
{
    if (request.ContentLength is null or > 64_000)
        return null;

    var options = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true,
        MaxDepth = 16
    };

    var order = await JsonSerializer.DeserializeAsync<CreateOrderRequest>(
        request.Body,
        options,
        ct);

    if (order is null || order.Lines.Count is < 1 or > 100)
        return null;

    return order;
}`
    }
  ]
};
