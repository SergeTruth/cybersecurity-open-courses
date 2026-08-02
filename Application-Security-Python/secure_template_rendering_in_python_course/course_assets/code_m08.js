window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Review, Logging, and Remediation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Regression-test escaping in text and attributes",
      "language": "python",
      "blurb": "The test renders attacker-shaped input and verifies that executable markup is absent while the escaped content remains visible to the user.",
      "code": "from jinja2 import DictLoader, Environment, select_autoescape\n\ndef test_profile_template_escapes_untrusted_values() -> None:\n    environment = Environment(\n        loader=DictLoader({\"profile.html\": '<a title=\"{{ bio }}\">{{ name }}</a>'}),\n        autoescape=select_autoescape(default_for_string=True),\n    )\n    rendered = environment.get_template(\"profile.html\").render(\n        bio='\" onmouseover=\"alert(1)',\n        name=\"<script>alert(2)</script>\",\n    )\n    assert \"<script>\" not in rendered\n    assert \"onmouseover=\\\"alert\" not in rendered\n    assert \"&lt;script&gt;\" in rendered\n"
    },
    {
      "title": "Record finite template-security failures",
      "language": "python",
      "blurb": "Telemetry identifies the server-owned template and bounded failure category without logging template context, rendered HTML, cookies, or user-supplied source.",
      "code": "TEMPLATE_IDS = {\"profile\", \"report_summary\", \"invoice\"}\nTEMPLATE_FAILURES = {\"undefined_value\", \"unsafe_url\", \"sanitization_rejected\", \"render_timeout\"}\n\ndef record_template_failure(logger, metrics, template_id: str, category: str) -> None:\n    safe_template = template_id if template_id in TEMPLATE_IDS else \"other\"\n    safe_category = category if category in TEMPLATE_FAILURES else \"other\"\n    logger.warning(\n        \"template_render_rejected\",\n        extra={\"template_id\": safe_template, \"category\": safe_category},\n    )\n    metrics.increment(\"template_render_failures\", tags={\"template\": safe_template, \"category\": safe_category})\n"
    }
  ]
};
