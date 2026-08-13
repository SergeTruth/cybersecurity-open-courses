window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'APIs, JavaScript Clients, and DOM-Safe Rendering' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Return a minimal JSON API contract",
      "language": "csharp",
      "blurb": "The mapper validates identifiers and bounded text, copies only public fields into a behavior-free DTO, and serializes with System.Text.Json rather than producing HTML. The browser client receives data, not executable markup.",
      "code": "using System.Text;\nusing System.Text.Json;\n\npublic sealed record PublicComment(string Id, string Author, string Text);\n\npublic static class PublicCommentJson\n{\n    private static readonly JsonSerializerOptions Options =\n        new(JsonSerializerDefaults.Web) { MaxDepth = 4 };\n\n    public static byte[] Serialize(string id, string author, string text)\n    {\n        if (!IsIdentifier(id) || !IsText(author, 80, 160) || !IsText(text, 2_000, 8_000))\n            throw new ArgumentException(\"Public comment rejected.\");\n        return JsonSerializer.SerializeToUtf8Bytes(new PublicComment(id, author, text), Options);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n\n    private static bool IsText(string value, int characterLimit, int byteLimit) =>\n        !string.IsNullOrEmpty(value) && value.Length <= characterLimit &&\n        Encoding.UTF8.GetByteCount(value) <= byteLimit && value.All(character =>\n            !char.IsControl(character) || character is '\\r' or '\\n' or '\\t');\n}\n"
    },
    {
      "title": "Describe a client update for a textContent sink",
      "language": "csharp",
      "blurb": "A closed target enum selects a fixed DOM element, while the untrusted value remains bounded text in JSON. The contract explicitly names textContent as the client sink and never transmits an HTML fragment for innerHTML.",
      "code": "using System.Text;\nusing System.Text.Json;\n\npublic enum DomTextTarget { StatusMessage, AccountName }\npublic sealed record DomTextUpdate(string ElementId, string Property, string Value);\n\npublic static class DomTextUpdateJson\n{\n    public static string Serialize(DomTextTarget target, string value)\n    {\n        if (!Enum.IsDefined(target) || string.IsNullOrEmpty(value) || value.Length > 500 ||\n            Encoding.UTF8.GetByteCount(value) > 2_000 || value.Any(character =>\n                char.IsControl(character) && character is not '\\r' and not '\\n' and not '\\t'))\n        {\n            throw new ArgumentException(\"DOM text update rejected.\");\n        }\n        var elementId = target switch\n        {\n            DomTextTarget.StatusMessage => \"status-message\",\n            DomTextTarget.AccountName => \"account-name\",\n            _ => throw new ArgumentOutOfRangeException(nameof(target))\n        };\n        return JsonSerializer.Serialize(new DomTextUpdate(elementId, \"textContent\", value));\n    }\n}\n"
    }
  ]
};
