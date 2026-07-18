window.COURSE_CODE_MODULE = {
  title: "Code Examples: Avoid Common C# Validation Failures",
  codeIntro: "These examples contrast common validation mistakes with safer C# patterns.",
  codeExamples: [
    {
      title: "Avoid Mass Assignment",
      blurb: "Do not let clients set sensitive fields by binding directly to persistence entities or broad update models.",
      language: "csharp",
      code: `// Risky: the client may submit IsAdmin, OwnerId, or AccountStatus.
public async Task<IResult> BadUpdate(User entity, AppDbContext db)
{
    db.Users.Update(entity);
    await db.SaveChangesAsync();
    return Results.NoContent();
}

public sealed record UpdateUserProfileRequest(
    string DisplayName,
    string? Bio);

// Safer: copy only allowed fields after authorization and validation.
public async Task<IResult> GoodUpdate(
    Guid userId,
    UpdateUserProfileRequest input,
    AppDbContext db)
{
    var user = await db.Users.FindAsync(userId);
    if (user is null) return Results.NotFound();

    user.DisplayName = input.DisplayName.Trim();
    user.Bio = string.IsNullOrWhiteSpace(input.Bio) ? null : input.Bio.Trim();

    await db.SaveChangesAsync();
    return Results.NoContent();
}`
    },
    {
      title: "Return Safe Validation Errors",
      blurb: "Validation responses should help callers fix input without leaking stack traces, SQL details, or sensitive values.",
      language: "csharp",
      code: `public static IResult SafeValidationProblem(
    IDictionary<string, string[]> errors,
    ILogger logger,
    string correlationId)
{
    logger.LogInformation(
        "Validation failed for request {CorrelationId}. Fields: {Fields}",
        correlationId,
        string.Join(",", errors.Keys));

    return Results.ValidationProblem(
        errors,
        statusCode: StatusCodes.Status400BadRequest,
        title: "One or more input values are invalid.",
        extensions: new Dictionary<string, object?>
        {
            ["correlationId"] = correlationId
        });
}`
    }
  ]
};
