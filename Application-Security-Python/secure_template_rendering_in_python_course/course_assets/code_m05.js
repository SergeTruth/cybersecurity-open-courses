window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Jinja and Flask Template Rendering through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Select a Flask template from an allowlist",
      "language": "python",
      "blurb": "The route maps a finite view name to server-owned templates and passes untrusted data as context instead of accepting a template path or source string.",
      "code": "from flask import abort, render_template, request\n\nTEMPLATES = {\n    \"summary\": \"reports/summary.html\",\n    \"detail\": \"reports/detail.html\",\n}\n\ndef report_page():\n    view = request.args.get(\"view\", \"summary\")\n    template_name = TEMPLATES.get(view)\n    if template_name is None:\n        abort(404)\n    title = request.args.get(\"title\", \"Report\")\n    if not 1 <= len(title) <= 80:\n        abort(400)\n    return render_template(template_name, title=title)\n"
    },
    {
      "title": "Embed data with Jinja's JSON context filter",
      "language": "python",
      "blurb": "The server-owned template uses tojson for a script data value, avoiding HTML escaping alone or string concatenation inside JavaScript syntax.",
      "code": "from jinja2 import DictLoader, Environment, StrictUndefined, select_autoescape\n\nSCRIPT_TEMPLATE = \"\"\"<script nonce=\"{{ nonce }}\">window.PAGE_DATA = {{ data|tojson }};</script>\"\"\"\n\ndef render_page_data(data: dict[str, object], nonce: str) -> str:\n    if set(data) != {\"account_id\", \"theme\"} or data[\"theme\"] not in {\"light\", \"dark\"}:\n        raise ValueError(\"page data rejected\")\n    if not nonce.isascii() or not 20 <= len(nonce) <= 128:\n        raise ValueError(\"CSP nonce rejected\")\n    environment = Environment(\n        loader=DictLoader({\"data.html\": SCRIPT_TEMPLATE}),\n        autoescape=select_autoescape(default_for_string=True),\n        undefined=StrictUndefined,\n    )\n    return environment.get_template(\"data.html\").render(data=data, nonce=nonce)\n"
    }
  ]
};
