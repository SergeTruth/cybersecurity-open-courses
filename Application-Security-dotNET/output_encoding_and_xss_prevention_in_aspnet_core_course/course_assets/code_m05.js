window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Safe Handling of Rich Text and User-Provided HTML' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Render rich-looking paragraphs from plain text",
      "language": "csharp",
      "blurb": "The renderer accepts a bounded number of bounded plain-text paragraphs, rejects unsupported controls, snapshots the sequence, and HTML-encodes every paragraph. It provides formatting without accepting an HTML language that would require a sanitizer.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic static class PlainTextArticleRenderer\n{\n    public static string Render(IEnumerable<string> paragraphs)\n    {\n        ArgumentNullException.ThrowIfNull(paragraphs);\n        var snapshot = paragraphs.Take(21).ToArray();\n        if (snapshot.Length is < 1 or > 20 || snapshot.Any(paragraph =>\n                string.IsNullOrEmpty(paragraph) || paragraph.Length > 1_000 ||\n                Encoding.UTF8.GetByteCount(paragraph) > 4_000 || paragraph.Any(character =>\n                    char.IsControl(character) && character is not '\\r' and not '\\n' and not '\\t')) ||\n            snapshot.Sum(paragraph => paragraph.Length) > 10_000)\n        {\n            throw new ArgumentException(\"Article paragraphs rejected.\", nameof(paragraphs));\n        }\n        return string.Concat(snapshot.Select(paragraph =>\n            $\"<p>{HtmlEncoder.Default.Encode(paragraph)}</p>\"));\n    }\n}\n"
    },
    {
      "title": "Render a user label with an approved link destination",
      "language": "csharp",
      "blurb": "The destination is parsed as an absolute HTTPS URI, credentials, fragments, nondefault ports, and unapproved hosts are rejected, and both the canonical URI and visible label are HTML-encoded before entering quoted attribute and text contexts.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic static class HelpLinkRenderer\n{\n    public static string Render(string label, string destination)\n    {\n        if (string.IsNullOrEmpty(label) || label.Length > 80 ||\n            Encoding.UTF8.GetByteCount(label) > 160 || label.Any(char.IsControl) ||\n            !Uri.TryCreate(destination, UriKind.Absolute, out var uri) ||\n            uri.Scheme != Uri.UriSchemeHttps || uri.IdnHost != \"help.example.com\" ||\n            !string.IsNullOrEmpty(uri.UserInfo) || !string.IsNullOrEmpty(uri.Fragment) ||\n            !uri.IsDefaultPort)\n        {\n            throw new ArgumentException(\"Help link rejected.\");\n        }\n        var href = HtmlEncoder.Default.Encode(uri.AbsoluteUri);\n        var text = HtmlEncoder.Default.Encode(label);\n        return $\"<a href=\\\"{href}\\\" rel=\\\"noopener noreferrer\\\">{text}</a>\";\n    }\n}\n"
    }
  ]
};
