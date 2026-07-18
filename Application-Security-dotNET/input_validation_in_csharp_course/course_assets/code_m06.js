window.COURSE_CODE_MODULE = {
  title: "Code Examples: Parse and Convert Safely",
  codeIntro: "These examples keep parse failures on the validation path instead of turning ordinary bad input into exceptions or unsafe defaults.",
  codeExamples: [
    {
      title: "Parse GUIDs, Dates, and Enums Explicitly",
      blurb: "Successful parsing only proves shape. The parsed value still needs context and business checks.",
      language: "csharp",
      code: `public enum ExportScope
{
    Mine,
    Team,
    Organization
}

public static bool TryParseExportRequest(
    IQueryCollection query,
    out Guid projectId,
    out DateOnly from,
    out ExportScope scope,
    out Dictionary<string, string[]> errors)
{
    errors = new();
    projectId = default;
    from = default;
    scope = default;

    if (!Guid.TryParse(query["projectId"], out projectId))
        errors["projectId"] = ["projectId must be a GUID."];

    if (!DateOnly.TryParse(query["from"], out from))
        errors["from"] = ["from must be an ISO date."];

    if (!Enum.TryParse(query["scope"], true, out scope) ||
        !Enum.IsDefined(scope))
        errors["scope"] = ["scope must be mine, team, or organization."];

    return errors.Count == 0;
}`
    },
    {
      title: "Use Culture-Aware Numeric Parsing Deliberately",
      blurb: "Numeric parsing should specify the expected culture and style so validation behaves consistently across hosts.",
      language: "csharp",
      code: `using System.Globalization;

public static bool TryParseInvoiceAmount(
    string? raw,
    out decimal amount,
    out string? error)
{
    var style = NumberStyles.AllowDecimalPoint | NumberStyles.AllowLeadingSign;
    var culture = CultureInfo.InvariantCulture;

    if (!decimal.TryParse(raw, style, culture, out amount))
    {
        error = "amount must be a decimal number.";
        return false;
    }

    if (amount < 0m || amount > 1_000_000m)
    {
        error = "amount must be from 0 to 1000000.";
        return false;
    }

    error = null;
    return true;
}`
    }
  ]
};
