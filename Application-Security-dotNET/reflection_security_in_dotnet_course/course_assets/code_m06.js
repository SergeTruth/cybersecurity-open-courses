window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Reflection, Deserialization, and Framework Automation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Deserialize into an explicit bounded contract",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Rejects unknown and duplicate properties and caps raw UTF-8 bytes and JSON depth. Deserialization chooses a compile-time DTO, never a payload-selected CLR type.",
      "code": "using System.Text.Json;\nusing System.Text.Json.Serialization;\npublic sealed record RenameRequest(string DisplayName);\npublic static RenameRequest ParseRename(byte[] json)\n{\n    if (json is null || json.Length is 0 or > 1024) throw new JsonException(\"Request limit.\");\n    using var document = JsonDocument.Parse(json, new JsonDocumentOptions { MaxDepth = 2 });\n    if (document.RootElement.ValueKind != JsonValueKind.Object) throw new JsonException(\"Object required.\");\n    var names = new HashSet<string>(StringComparer.Ordinal);\n    foreach (var property in document.RootElement.EnumerateObject())\n        if (!names.Add(property.Name)) throw new JsonException(\"Duplicate member.\");\n    var value = JsonSerializer.Deserialize<RenameRequest>(json, new JsonSerializerOptions\n        { UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow, MaxDepth = 2 })\n        ?? throw new JsonException(\"Request required.\");\n    if (value.DisplayName is not { Length: > 0 and <= 64 } || !value.DisplayName.All(c => char.IsAsciiLetterOrDigit(c) || c == ' '))\n        throw new JsonException(\"Invalid display name.\");\n    if (string.IsNullOrWhiteSpace(value.DisplayName)) throw new JsonException(\"Display name required.\");\n    return value with { DisplayName = value.DisplayName.Trim() };\n}\n"
    },
    {
      "title": "Avoid reflection-based mass assignment",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. A narrow immutable command exposes only the field this operation may change. Persistence must separately bind the authenticated principal and target-object authorization.",
      "code": "public sealed record RenameCommand(string DisplayName);\npublic static RenameCommand MakeRename(string name)\n{\n    if (name is not { Length: > 0 and <= 64 } || !name.All(c => char.IsAsciiLetterOrDigit(c) || c == ' '))\n        throw new ArgumentException(\"Invalid name.\");\n    name = name.Trim();\n    if (name.Length == 0) throw new ArgumentException(\"Name required.\");\n    return new RenameCommand(name);\n}\n// No foreach(payload) -> PropertyInfo.SetValue: role/tenant/ownership are not writable fields.\n"
    }
  ]
};
