window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Review, Logging, and Remediation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Regression-test several rendering contexts",
      "language": "python",
      "blurb": "Attacker-shaped values are tested in text, quoted attribute, URL, and JSON-data paths so one successful encoding strategy is not assumed safe everywhere.",
      "code": "import pytest\n\nATTACKS = (\n    \"<script>alert(1)</script>\",\n    '\" onmouseover=\"alert(2)',\n    \"javascript:alert(3)\",\n    \"</script><img src=x onerror=alert(4)>\",\n)\n\n@pytest.mark.parametrize(\"payload\", ATTACKS)\ndef test_profile_page_has_no_executable_payload(client, payload: str) -> None:\n    response = client.get(\"/profile\", query_string={\"name\": payload, \"next\": payload})\n    text = response.get_data(as_text=True)\n    assert response.status_code == 200\n    assert \"<script>alert\" not in text\n    assert \"onmouseover=\\\"alert\" not in text\n    assert \"javascript:alert\" not in text\n"
    },
    {
      "title": "Aggregate CSP reports into finite categories",
      "language": "python",
      "blurb": "Known directives and dispositions become metric labels, while attacker-selected strings map to other and blocked URLs remain out of telemetry dimensions.",
      "code": "KNOWN_DIRECTIVES = {\"default-src\", \"script-src\", \"script-src-elem\", \"style-src\", \"img-src\", \"connect-src\"}\nKNOWN_DISPOSITIONS = {\"enforce\", \"report\"}\n\ndef observe_csp_report(metrics, report: object) -> None:\n    if not isinstance(report, dict):\n        raise ValueError(\"CSP report rejected\")\n    directive = report.get(\"violated-directive\")\n    disposition = report.get(\"disposition\")\n    if not isinstance(directive, str) or not isinstance(disposition, str):\n        raise ValueError(\"CSP report fields rejected\")\n    metrics.increment(\n        \"csp_violation\",\n        tags={\n            \"directive\": directive if directive in KNOWN_DIRECTIVES else \"other\",\n            \"disposition\": disposition if disposition in KNOWN_DISPOSITIONS else \"other\",\n        },\n    )\n"
    }
  ]
};
