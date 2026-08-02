window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply User-Generated Content, Markdown, and Rich Text through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Sanitize rendered Markdown with a finite HTML policy",
      "language": "python",
      "blurb": "Markdown output is treated as untrusted HTML and cleaned with explicit elements, attributes, and protocols before becoming template markup.",
      "code": "import bleach\nimport markdown\nfrom markupsafe import Markup\n\nALLOWED_TAGS = {\"p\", \"ul\", \"ol\", \"li\", \"strong\", \"em\", \"code\", \"pre\", \"a\"}\nALLOWED_ATTRIBUTES = {\"a\": [\"href\", \"title\", \"rel\"]}\n\ndef safe_markdown(source: str) -> Markup:\n    if len(source.encode(\"utf-8\")) > 50_000:\n        raise ValueError(\"Markdown input too large\")\n    rendered = markdown.markdown(source, extensions=[])\n    cleaned = bleach.clean(\n        rendered,\n        tags=ALLOWED_TAGS,\n        attributes=ALLOWED_ATTRIBUTES,\n        protocols={\"https\"},\n        strip=True,\n    )\n    return Markup(cleaned)\n"
    },
    {
      "title": "Rewrite rich-text links after sanitization",
      "language": "python",
      "blurb": "A link callback restricts protocols and adds application-owned rel attributes so sanitized user content cannot create script URLs or opener relationships.",
      "code": "from urllib.parse import urlsplit\nimport bleach\n\ndef link_policy(attributes: dict[tuple[str | None, str], str], _new: bool = False):\n    href_key = (None, \"href\")\n    href = attributes.get(href_key, \"\")\n    parsed = urlsplit(href)\n    if parsed.scheme not in {\"https\"} or not parsed.hostname:\n        attributes.pop(href_key, None)\n    attributes[(None, \"rel\")] = \"nofollow noreferrer noopener\"\n    return attributes\n\ndef sanitize_rich_text(html_source: str) -> str:\n    if len(html_source) > 100_000:\n        raise ValueError(\"rich text too large\")\n    cleaned = bleach.clean(html_source, tags={\"p\", \"strong\", \"em\", \"a\"}, attributes={\"a\": [\"href\"]}, strip=True)\n    return bleach.linkify(cleaned, callbacks=[link_policy], skip_tags={\"pre\", \"code\"})\n"
    }
  ]
};
