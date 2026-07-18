window.COURSE_CODE_MODULE = {
  title: "Code Examples: FluentValidation and Service-Layer Rules",
  codeIntro: "These examples show how FluentValidation can express richer request contracts and how service code can preserve business invariants.",
  codeExamples: [
    {
      title: "Define a FluentValidation Validator",
      blurb: "FluentValidation keeps complex rules readable and testable when annotations become too limited.",
      language: "csharp",
      code: `public sealed record RegisterDeviceRequest(
    string SerialNumber,
    string DisplayName,
    string DeviceType);

public sealed class RegisterDeviceValidator
    : AbstractValidator<RegisterDeviceRequest>
{
    public RegisterDeviceValidator()
    {
        RuleFor(x => x.SerialNumber)
            .NotEmpty()
            .MaximumLength(64)
            .Matches("^[A-Z0-9-]+$");

        RuleFor(x => x.DisplayName)
            .NotEmpty()
            .MaximumLength(80);

        RuleFor(x => x.DeviceType)
            .Must(type => new[] { "sensor", "gateway", "camera" }.Contains(type))
            .WithMessage("DeviceType must be sensor, gateway, or camera.");
    }
}`
    },
    {
      title: "Validate Before Persistence",
      blurb: "Service-layer validation protects non-HTTP entry points such as queue handlers, jobs, and administrative tooling.",
      language: "csharp",
      code: `public sealed class DeviceRegistrationService
{
    private readonly IValidator<RegisterDeviceRequest> _validator;
    private readonly AppDbContext _db;

    public DeviceRegistrationService(
        IValidator<RegisterDeviceRequest> validator,
        AppDbContext db)
    {
        _validator = validator;
        _db = db;
    }

    public async Task<ValidationResult> RegisterAsync(
        RegisterDeviceRequest request,
        CancellationToken ct)
    {
        var validation = await _validator.ValidateAsync(request, ct);
        if (!validation.IsValid) return validation;

        _db.Devices.Add(new Device
        {
            SerialNumber = request.SerialNumber,
            DisplayName = request.DisplayName.Trim(),
            DeviceType = request.DeviceType
        });

        await _db.SaveChangesAsync(ct);
        return validation;
    }
}`
    }
  ]
};
