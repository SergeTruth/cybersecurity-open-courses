window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Context-Aware Output Encoding through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Encode untrusted text for an HTML text node",
      "language": "python",
      "blurb": "HTML text encoding covers ampersands and angle brackets for one text-node context; the function does not claim the result is safe for JavaScript, CSS, or URLs.",
      "code": "from html import escape\n\ndef notification_text(message: str) -> str:\n    if not 1 <= len(message) <= 500:\n        raise ValueError(\"notification message rejected\")\n    return \"<p class=\\\"notice\\\">\" + escape(message, quote=True) + \"</p>\"\n"
    },
    {
      "title": "Map navigation to exact HTTPS or local account routes",
      "language": "python",
      "blurb": "The function accepts a local relative route or explicit HTTPS application URL, rejects network-path references and metadata, decodes the path, and maps it to one canonical account destination.",
      "code": "from urllib.parse import unquote, urlsplit, urlunsplit\n\nACCOUNT_ROUTES = {\n    \"/account/profile\": \"/account/profile\",\n    \"/account/security\": \"/account/security\",\n    \"/account/preferences\": \"/account/preferences\",\n}\n\ndef safe_account_url(candidate: str) -> str:\n    parsed = urlsplit(candidate)\n    try:\n        port = parsed.port\n    except ValueError as error:\n        raise ValueError(\"navigation port rejected\") from error\n    is_relative = parsed.scheme == \"\" and parsed.netloc == \"\"\n    is_https_application = (\n        parsed.scheme == \"https\"\n        and parsed.hostname == \"app.example.com\"\n        and port in {None, 443}\n    )\n    if not (is_relative or is_https_application):\n        raise ValueError(\"navigation authority rejected\")\n    if parsed.username is not None or parsed.password is not None:\n        raise ValueError(\"navigation credentials rejected\")\n    if parsed.query or parsed.fragment:\n        raise ValueError(\"navigation metadata rejected\")\n    canonical_path = ACCOUNT_ROUTES.get(unquote(parsed.path))\n    if canonical_path is None:\n        raise ValueError(\"navigation route rejected\")\n    scheme = \"https\" if is_https_application else \"\"\n    authority = \"app.example.com\" if is_https_application else \"\"\n    return urlunsplit((scheme, authority, canonical_path, \"\", \"\"))\n"
    }
  ]
};
