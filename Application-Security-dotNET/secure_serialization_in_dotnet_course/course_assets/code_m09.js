window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Review, Testing, Dependencies, and Legacy Remediation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Create immutable reviewed serializer options",
      "language": "csharp",
      "blurb": "The factory fixes case sensitivity, unknown-member rejection, numeric handling, syntax, depth, and reflection fallback policy, then makes the options read-only so later code cannot weaken the reviewed contract after startup validation.",
      "code": "using System.Text.Json;\nusing System.Text.Json.Serialization;\nusing System.Text.Json.Serialization.Metadata;\n\npublic static class ReviewedSerializerPolicy\n{\n    public static JsonSerializerOptions Create()\n    {\n        var options = new JsonSerializerOptions\n        {\n            PropertyNameCaseInsensitive = false,\n            UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,\n            NumberHandling = JsonNumberHandling.Strict,\n            ReadCommentHandling = JsonCommentHandling.Disallow,\n            AllowTrailingCommas = false,\n            MaxDepth = 8,\n            TypeInfoResolver = new DefaultJsonTypeInfoResolver()\n        };\n        options.MakeReadOnly();\n        return options;\n    }\n}\n"
    },
    {
      "title": "Fail closed at a JSON-only legacy migration boundary",
      "language": "csharp",
      "blurb": "The gate accepts only a bounded UTF-8 object whose first non-whitespace byte is a JSON object marker, rejects binary, empty, duplicate-member, and permissive inputs, limits depth, and returns an owned clone for explicit migration logic.",
      "code": "using System.Text.Json;\n\npublic static class JsonOnlyMigrationBoundary\n{\n    public static JsonElement Parse(ReadOnlyMemory<byte> payload)\n    {\n        if (payload.Length is 0 or > 64 * 1024)\n            throw new InvalidDataException(\"Legacy migration payload size rejected.\");\n        var span = payload.Span;\n        var index = 0;\n        while (index < span.Length && span[index] is 0x20 or 0x09 or 0x0a or 0x0d)\n            index++;\n        if (index == span.Length || span[index] != (byte)'{')\n            throw new InvalidDataException(\"Only JSON object migration payloads are accepted.\");\n\n        using var document = JsonDocument.Parse(payload, new JsonDocumentOptions\n        {\n            AllowTrailingCommas = false,\n            CommentHandling = JsonCommentHandling.Disallow,\n            MaxDepth = 8\n        });\n        if (document.RootElement.ValueKind != JsonValueKind.Object)\n            throw new JsonException(\"Migration payload must be an object.\");\n        RejectDuplicateMembers(document.RootElement);\n        return document.RootElement.Clone();\n    }\n\n    private static void RejectDuplicateMembers(JsonElement element)\n    {\n        if (element.ValueKind == JsonValueKind.Object)\n        {\n            var names = new HashSet<string>(StringComparer.Ordinal);\n            foreach (var property in element.EnumerateObject())\n            {\n                if (!names.Add(property.Name))\n                    throw new JsonException(\"Duplicate migration member rejected.\");\n                RejectDuplicateMembers(property.Value);\n            }\n        }\n        else if (element.ValueKind == JsonValueKind.Array)\n        {\n            foreach (var item in element.EnumerateArray())\n                RejectDuplicateMembers(item);\n        }\n    }\n}\n"
    }
  ]
};
