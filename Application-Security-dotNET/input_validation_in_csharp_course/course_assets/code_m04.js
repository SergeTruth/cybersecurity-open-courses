window.COURSE_CODE_MODULE = {
  title: "Code Examples: ASP.NET Core Model Binding and Validation",
  codeIntro: "These examples keep model binding convenient while still checking validation state and avoiding overposting.",
  codeExamples: [
    {
      title: "Check ModelState Before Calling the Service Layer",
      blurb: "Controllers should stop invalid bound models at the boundary and return a predictable validation response.",
      language: "csharp",
      code: `[ApiController]
[Route("api/projects")]
public sealed class ProjectsController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateProjectRequest request,
        ProjectService projects)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var result = await projects.CreateAsync(request);
        return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public IActionResult Get(Guid id) => Ok();
}`
    },
    {
      title: "Use Input Models Instead of Entity Models",
      blurb: "Accept only the fields a client is allowed to set. Do not bind directly to an EF Core entity with sensitive properties.",
      language: "csharp",
      code: `public sealed class UpdateProfileRequest
{
    [Required]
    [StringLength(80)]
    public string DisplayName { get; init; } = string.Empty;

    [StringLength(160)]
    public string? Bio { get; init; }
}

public async Task<IResult> UpdateProfile(
    Guid userId,
    UpdateProfileRequest input,
    AppDbContext db)
{
    var user = await db.Users.FindAsync(userId);
    if (user is null) return Results.NotFound();

    user.DisplayName = input.DisplayName.Trim();
    user.Bio = string.IsNullOrWhiteSpace(input.Bio) ? null : input.Bio.Trim();

    await db.SaveChangesAsync();
    return Results.NoContent();
}`
    }
  ]
};
