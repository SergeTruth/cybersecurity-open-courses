window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Context-Aware Encoding Rules' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Encode a validated value for an HTML attribute",
      "language": "csharp",
      "blurb": "A closed enum selects the attribute name, the primitive value is bounded and control-free, and HtmlEncoder encodes it for a quoted HTML attribute value. Validation narrows the data; contextual encoding handles metacharacters.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic enum DataField { CommentId, TenantLabel }\n\npublic sealed class EncodedDataField\n{\n    private EncodedDataField(string name, string encodedValue)\n    {\n        Name = name;\n        EncodedValue = encodedValue;\n    }\n\n    public string Name { get; }\n    public string EncodedValue { get; }\n\n    public static EncodedDataField Create(DataField field, string value)\n    {\n        if (!Enum.IsDefined(field) || string.IsNullOrEmpty(value) || value.Length > 80 ||\n            Encoding.UTF8.GetByteCount(value) > 160 || value.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"HTML data attribute rejected.\");\n        }\n        var name = field switch\n        {\n            DataField.CommentId => \"data-comment-id\",\n            DataField.TenantLabel => \"data-tenant-label\",\n            _ => throw new ArgumentOutOfRangeException(nameof(field))\n        };\n        return new EncodedDataField(name, HtmlEncoder.Default.Encode(value));\n    }\n}\n\npublic static class HtmlDataField\n{\n    public static EncodedDataField Create(DataField field, string value) =>\n        EncodedDataField.Create(field, value);\n}\n"
    },
    {
      "title": "Serialize bootstrap data instead of building JavaScript source",
      "language": "csharp",
      "blurb": "The DTO factory validates bounded primitive data, then System.Text.Json produces a data document with the default safe encoder. The result belongs in a non-executable application/json element and is parsed by the client instead of concatenated into script code.",
      "code": "using System.Text;\nusing System.Text.Json;\n\npublic sealed record ClientBootstrapData(string SubjectId, string DisplayName);\n\npublic static class BootstrapJson\n{\n    private static readonly JsonSerializerOptions Options =\n        new(JsonSerializerDefaults.Web) { MaxDepth = 4 };\n\n    public static string Serialize(string subjectId, string displayName)\n    {\n        if (!IsIdentifier(subjectId) || string.IsNullOrEmpty(displayName) ||\n            displayName.Length > 80 || Encoding.UTF8.GetByteCount(displayName) > 160 ||\n            displayName.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Bootstrap data rejected.\");\n        }\n        return JsonSerializer.Serialize(new ClientBootstrapData(subjectId, displayName), Options);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    }
  ]
};
