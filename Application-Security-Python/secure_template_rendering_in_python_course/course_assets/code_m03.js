window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Autoescaping and Context-Aware Output through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Render HTML text with Jinja autoescaping",
      "language": "python",
      "blurb": "A server-owned template and HTML-aware environment escape untrusted text automatically, while StrictUndefined prevents missing data from silently changing the page.",
      "code": "from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape\n\ndef template_environment(template_root: str) -> Environment:\n    return Environment(\n        loader=FileSystemLoader(template_root),\n        autoescape=select_autoescape(enabled_extensions=(\"html\", \"xml\"), default_for_string=True),\n        undefined=StrictUndefined,\n    )\n\ndef render_profile(environment: Environment, display_name: str) -> str:\n    if not 1 <= len(display_name) <= 80:\n        raise ValueError(\"display name rejected\")\n    return environment.get_template(\"profile.html\").render(display_name=display_name)\n"
    },
    {
      "title": "Canonicalize an approved profile route for an attribute",
      "language": "python",
      "blurb": "The function accepts a local relative path or an explicit HTTPS URL for the application, rejects network-path references and metadata, validates one decoded identifier, and reconstructs a canonical link.",
      "code": "import re\nimport unicodedata\nfrom urllib.parse import quote, unquote, urlsplit, urlunsplit\n\nPROFILE_ID = re.compile(r\"[A-Za-z0-9_-]{1,40}\")\nMAX_PROFILE_URL_LENGTH = 512\n\ndef has_disallowed_url_character(value: str) -> bool:\n    return any(\n        character.isspace()\n        or unicodedata.category(character) in {\"Cc\", \"Cf\", \"Zl\", \"Zp\"}\n        for character in value\n    )\n\ndef approved_profile_link(candidate: str) -> str:\n    if (\n        type(candidate) is not str\n        or not 1 <= len(candidate) <= MAX_PROFILE_URL_LENGTH\n        or has_disallowed_url_character(candidate)\n    ):\n        raise ValueError(\"profile link rejected\")\n    parsed = urlsplit(candidate)\n    location = (parsed.scheme, parsed.netloc)\n    if location not in {(\"\", \"\"), (\"https\", \"app.example.com\")}:\n        raise ValueError(\"profile link authority rejected\")\n    if (\n        parsed.username is not None\n        or parsed.password is not None\n        or parsed.query\n        or parsed.fragment\n    ):\n        raise ValueError(\"profile link metadata rejected\")\n    parts = parsed.path.split(\"/\")\n    if len(parts) != 3 or parts[:2] != [\"\", \"profiles\"]:\n        raise ValueError(\"profile route rejected\")\n    profile_id = unquote(parts[2])\n    if PROFILE_ID.fullmatch(profile_id) is None:\n        raise ValueError(\"profile identifier rejected\")\n    path = \"/profiles/\" + quote(profile_id, safe=\"\")\n    return urlunsplit((parsed.scheme, parsed.netloc, path, \"\", \"\"))\n"
    }
  ]
};
