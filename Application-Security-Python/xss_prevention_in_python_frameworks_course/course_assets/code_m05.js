window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply User-Generated Content and Sanitization through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Sanitize user-authored rich text",
      "language": "python",
      "blurb": "An allowlist keeps a small formatting vocabulary and HTTPS links, removes unknown markup, and marks only the sanitizer result as template-ready HTML.",
      "code": "import bleach\nfrom markupsafe import Markup\n\nMAX_BIOGRAPHY_BYTES = 20_000\n\ndef sanitized_biography(source: str) -> Markup:\n    if type(source) is not str:\n        raise TypeError(\"biography must be text\")\n    if len(source.encode(\"utf-8\")) > MAX_BIOGRAPHY_BYTES:\n        raise ValueError(\"biography too large\")\n    cleaned = bleach.clean(\n        source,\n        tags={\"p\", \"strong\", \"em\", \"ul\", \"ol\", \"li\", \"a\"},\n        attributes={\"a\": [\"href\", \"title\"]},\n        protocols={\"https\"},\n        strip=True,\n    )\n    return Markup(cleaned)\n"
    },
    {
      "title": "Sanitize Markdown after conversion",
      "language": "python",
      "blurb": "Markdown parsing does not make embedded HTML safe, so rendered output passes through the same finite HTML policy before display.",
      "code": "import bleach\nimport markdown\nfrom markupsafe import Markup\n\ndef render_comment_markdown(source: str) -> Markup:\n    if type(source) is not str:\n        raise TypeError(\"comment Markdown must be text\")\n    if len(source.encode(\"utf-8\")) > 30_000:\n        raise ValueError(\"comment Markdown too large\")\n    rendered = markdown.markdown(source, extensions=[])\n    cleaned = bleach.clean(\n        rendered,\n        tags={\"p\", \"blockquote\", \"strong\", \"em\", \"code\", \"pre\"},\n        attributes={},\n        protocols=set(),\n        strip=True,\n    )\n    return Markup(cleaned)\n"
    }
  ]
};
