window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Input Handling, Output Encoding, and XSS Reduction' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Create a bounded comment command before rendering",
      "language": "csharp",
      "blurb": "The private command factory rejects null, blank, untrimmed, control-bearing, and oversized UTF-8 text while preserving ordinary characters for context-aware output encoding later.",
      "code": "using System.Text;\n\npublic sealed class CommentCommand\n{\n    private CommentCommand(string text) => Text = text;\n\n    public string Text { get; }\n\n    public static CommentCommand Create(string text)\n    {\n        if (string.IsNullOrWhiteSpace(text) ||\n            Encoding.UTF8.GetByteCount(text) > 4096 ||\n            !string.Equals(text, text.Trim(), StringComparison.Ordinal) ||\n            text.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Comment rejected.\", nameof(text));\n        }\n        return new CommentCommand(text);\n    }\n}\n"
    },
    {
      "title": "Encode untrusted text for its HTML output context",
      "language": "csharp",
      "blurb": "The renderer validates the caller's command object, uses the framework HTML encoder for element content, and returns ordinary text rather than an IHtmlContent escape hatch.",
      "code": "using System.Text.Encodings.Web;\n\npublic static class CommentRenderer\n{\n    public static string EncodeForElement(CommentText comment)\n    {\n        ArgumentNullException.ThrowIfNull(comment);\n        if (string.IsNullOrWhiteSpace(comment.Value) ||\n            comment.Value.Length > 4096 ||\n            comment.Value.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Comment rejected.\", nameof(comment));\n        }\n        return HtmlEncoder.Default.Encode(comment.Value);\n    }\n}\n\npublic sealed record CommentText(string Value);\n"
    }
  ]
};
