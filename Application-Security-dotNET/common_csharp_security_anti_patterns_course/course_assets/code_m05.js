window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Output, Serialization, and Injection Mistakes' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Encode untrusted comment text for an HTML text context",
      "language": "csharp",
      "blurb": "The validated value is bounded by characters and UTF-8 bytes, rejects controls and ambiguous surrounding whitespace, owns its string, and is encoded only when placed into the fixed HTML text context.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic sealed class CommentText\n{\n    private CommentText(string value) => Value = value;\n\n    public string Value { get; }\n\n    public static CommentText Create(string value)\n    {\n        if (string.IsNullOrEmpty(value) || value.Length > 500 ||\n            Encoding.UTF8.GetByteCount(value) > 1_000 ||\n            !string.Equals(value, value.Trim(), StringComparison.Ordinal) ||\n            value.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Comment text rejected.\", nameof(value));\n        }\n        return new CommentText(value);\n    }\n}\n\npublic static class CommentHtml\n{\n    public static string Render(CommentText comment)\n    {\n        ArgumentNullException.ThrowIfNull(comment);\n        return \"<p class=\\\"comment\\\">\" +\n               HtmlEncoder.Default.Encode(comment.Value) +\n               \"</p>\";\n    }\n}\n"
    },
    {
      "title": "Write a public profile with a structured JSON writer",
      "language": "csharp",
      "blurb": "The serializer validates a closed public DTO, bounds every UTF-8 field, rejects controls, and uses Utf8JsonWriter so quotes and structural characters cannot escape into attacker-selected JSON syntax.",
      "code": "using System.Buffers;\nusing System.Text;\nusing System.Text.Json;\n\npublic sealed record PublicProfile(string DisplayName, string Biography);\n\npublic static class PublicProfileJson\n{\n    public static byte[] Serialize(PublicProfile profile)\n    {\n        ArgumentNullException.ThrowIfNull(profile);\n        Validate(profile.DisplayName, 80, 160, nameof(profile.DisplayName), allowEmpty: false);\n        Validate(profile.Biography, 500, 1_000, nameof(profile.Biography), allowEmpty: true);\n\n        var output = new ArrayBufferWriter<byte>(1_280);\n        using (var writer = new Utf8JsonWriter(output, new JsonWriterOptions\n        {\n            Indented = false,\n            SkipValidation = false\n        }))\n        {\n            writer.WriteStartObject();\n            writer.WriteString(\"displayName\", profile.DisplayName);\n            writer.WriteString(\"biography\", profile.Biography);\n            writer.WriteEndObject();\n        }\n        return output.WrittenSpan.ToArray();\n    }\n\n    private static void Validate(\n        string value,\n        int maximumCharacters,\n        int maximumBytes,\n        string parameterName,\n        bool allowEmpty)\n    {\n        if (value is null || (!allowEmpty && value.Length == 0) ||\n            value.Length > maximumCharacters ||\n            Encoding.UTF8.GetByteCount(value) > maximumBytes ||\n            value.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Public profile field rejected.\", parameterName);\n        }\n    }\n}\n"
    }
  ]
};
