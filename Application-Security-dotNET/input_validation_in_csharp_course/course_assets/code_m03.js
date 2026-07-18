window.COURSE_CODE_MODULE = {
  title: "Code Examples: Define Expected Data",
  codeIntro: "These examples turn informal expectations into explicit C# contracts that can be validated consistently.",
  codeExamples: [
    {
      title: "Use a DTO with Data Annotations",
      blurb: "A request DTO should describe the fields the client is allowed to send, not the persistence model behind the application.",
      language: "csharp",
      code: `public sealed class CreateUserRequest
{
    [Required]
    [EmailAddress]
    [StringLength(254)]
    public string Email { get; init; } = string.Empty;

    [Required]
    [StringLength(80, MinimumLength = 1)]
    [RegularExpression("^[A-Za-z][A-Za-z0-9 _.-]{0,79}$")]
    public string DisplayName { get; init; } = string.Empty;

    [Range(13, 120)]
    public int Age { get; init; }

    [Required]
    [RegularExpression("^(user|manager|viewer)$")]
    public string RequestedRole { get; init; } = "user";
}`
    },
    {
      title: "Prefer Allowlisted Values over Free Strings",
      blurb: "Controlled sets are easier to reason about when the code rejects unknown values before business logic runs.",
      language: "csharp",
      code: `public enum ReportFormat
{
    Pdf,
    Csv,
    Json
}

public static bool TryParseReportFormat(
    string? raw,
    out ReportFormat format,
    out string? error)
{
    if (Enum.TryParse(raw, ignoreCase: true, out format) &&
        Enum.IsDefined(format))
    {
        error = null;
        return true;
    }

    error = "format must be one of: pdf, csv, json.";
    return false;
}`
    }
  ]
};
