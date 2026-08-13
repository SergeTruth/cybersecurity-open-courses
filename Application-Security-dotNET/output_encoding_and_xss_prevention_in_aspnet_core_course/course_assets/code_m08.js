window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Validation, Sanitization, and Encoding: Different Jobs' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Keep validation and HTML encoding as separate steps",
      "language": "csharp",
      "blurb": "DisplayName establishes length, UTF-8, whitespace, and control-character rules while retaining text. HtmlDisplayName then applies the HTML text-context encoder at the rendering boundary, making each control's purpose explicit.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic sealed class DisplayName\n{\n    private DisplayName(string value) => Value = value;\n\n    public string Value { get; }\n\n    public static DisplayName Create(string value)\n    {\n        if (string.IsNullOrEmpty(value) || value.Length > 80 ||\n            Encoding.UTF8.GetByteCount(value) > 160 || value.Any(char.IsControl) ||\n            value != value.Trim())\n        {\n            throw new ArgumentException(\"Display name rejected.\", nameof(value));\n        }\n        return new DisplayName(value);\n    }\n}\n\npublic static class HtmlDisplayName\n{\n    public static string Encode(DisplayName name)\n    {\n        ArgumentNullException.ThrowIfNull(name);\n        return HtmlEncoder.Default.Encode(name.Value);\n    }\n}\n"
    },
    {
      "title": "Validate an image origin and encode its HTML contexts",
      "language": "csharp",
      "blurb": "The image URI must use HTTPS, the reviewed media host, its default port, and no credentials, query, or fragment. The alt text is independently bounded, then URI and text are encoded for quoted attribute values.",
      "code": "using System.Text;\nusing System.Text.Encodings.Web;\n\npublic static class ApprovedImageHtml\n{\n    public static string Render(string source, string alternativeText)\n    {\n        if (!Uri.TryCreate(source, UriKind.Absolute, out var uri) ||\n            uri.Scheme != Uri.UriSchemeHttps || uri.IdnHost != \"media.example.com\" ||\n            !uri.IsDefaultPort || !string.IsNullOrEmpty(uri.UserInfo) ||\n            !string.IsNullOrEmpty(uri.Query) || !string.IsNullOrEmpty(uri.Fragment) ||\n            string.IsNullOrEmpty(alternativeText) || alternativeText.Length > 200 ||\n            Encoding.UTF8.GetByteCount(alternativeText) > 400 || alternativeText.Any(char.IsControl))\n        {\n            throw new ArgumentException(\"Image HTML rejected.\");\n        }\n        return $\"<img src=\\\"{HtmlEncoder.Default.Encode(uri.AbsoluteUri)}\\\" \" +\n            $\"alt=\\\"{HtmlEncoder.Default.Encode(alternativeText)}\\\">\";\n    }\n}\n"
    }
  ]
};
