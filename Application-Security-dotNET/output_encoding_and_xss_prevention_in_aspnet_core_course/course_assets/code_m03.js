window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Razor Encoding Defaults and Unsafe Escape Hatches' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Keep untrusted comments as text until Razor renders them",
      "language": "csharp",
      "blurb": "The model validates a bounded control-free comment but retains the original text rather than pre-encoding it. Razor can render the Text property through its normal HTML text-context encoder without Html.Raw or double encoding.",
      "code": "using System.Text;\n\npublic sealed class CommentText\n{\n    private CommentText(string text) => Text = text;\n\n    public string Text { get; }\n\n    public static CommentText Create(string text)\n    {\n        if (string.IsNullOrEmpty(text) || text.Length > 2_000 ||\n            Encoding.UTF8.GetByteCount(text) > 8_000 || text.Any(character =>\n                char.IsControl(character) && character is not '\\r' and not '\\n' and not '\\t'))\n        {\n            throw new ArgumentException(\"Comment text rejected.\", nameof(text));\n        }\n        return new CommentText(text);\n    }\n}\n"
    },
    {
      "title": "Restrict raw markup to an application-owned catalog",
      "language": "csharp",
      "blurb": "The only markup bypass is a closed enum mapped to fixed source literals. No caller can wrap arbitrary text as trusted HTML, and invalid future enum values fail instead of reaching a Razor Html.Raw boundary.",
      "code": "public enum ReviewedMarkupFragment { EmptyStateIcon, WarningIcon }\n\npublic sealed class ReviewedMarkup\n{\n    private ReviewedMarkup(string html) => Html = html;\n\n    public string Html { get; }\n\n    public static ReviewedMarkup FromCatalog(ReviewedMarkupFragment fragment)\n    {\n        if (!Enum.IsDefined(fragment)) throw new ArgumentOutOfRangeException(nameof(fragment));\n        return new ReviewedMarkup(fragment switch\n        {\n            ReviewedMarkupFragment.EmptyStateIcon =>\n                \"<span class=\\\"icon icon-empty\\\" aria-hidden=\\\"true\\\"></span>\",\n            ReviewedMarkupFragment.WarningIcon =>\n                \"<span class=\\\"icon icon-warning\\\" aria-hidden=\\\"true\\\"></span>\",\n            _ => throw new ArgumentOutOfRangeException(nameof(fragment))\n        });\n    }\n}\n"
    }
  ]
};
