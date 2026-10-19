window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Private Members, Encapsulation, and Trust Boundaries' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Do not expose private-state reflection to request code",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. A safe projection selects named public values directly. A private member is an encapsulation mechanism, not a boundary against arbitrary code executing in the same process.",
      "code": "public sealed class Account\n{\n    private readonly string _credential;\n    public Guid PublicId { get; }\n    public Account(Guid publicId, string credential) { PublicId = publicId; _credential = credential; }\n}\npublic sealed record PublicAccount(Guid Id);\npublic static PublicAccount ProjectAccount(Account account) => new(account.PublicId);\n// Never serialize GetFields(NonPublic), every property, or an arbitrary caller-selected member.\n"
    },
    {
      "title": "Use a narrow fixed member contract",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. This illustrates reflection metadata validation, not a sandbox. Model types are application-owned and captured by code; no private member traversal or caller-supplied BindingFlags is exposed.",
      "code": "using System.Reflection;\npublic sealed class PublicLabel { public string Text { get; init; } = \"\"; }\npublic static PropertyInfo GetLabelProperty()\n{\n    var property = typeof(PublicLabel).GetProperty(nameof(PublicLabel.Text), BindingFlags.Instance | BindingFlags.Public)\n        ?? throw new InvalidOperationException(\"Property missing.\");\n    if (property.GetIndexParameters().Length != 0 || property.PropertyType != typeof(string) || property.GetMethod?.IsPublic != true)\n        throw new InvalidOperationException(\"Unexpected property contract.\");\n    return property; // Metadata only, for trusted application composition.\n}\n"
    }
  ]
};
