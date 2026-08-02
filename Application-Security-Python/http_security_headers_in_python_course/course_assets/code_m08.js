window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Rollout, Monitoring, and Maintenance with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Regression-test security headers",
      "language": "python",
      "blurb": "The test asserts route-specific values and guards against simultaneous report-only and enforced CSP during rollout.",
      "code": "def test_account_headers(client):\n    response = client.get(\"/account\")\n    assert response.headers[\"Strict-Transport-Security\"].startswith(\"max-age=\")\n    assert response.headers[\"X-Content-Type-Options\"] == \"nosniff\"\n    assert \"frame-ancestors 'none'\" in response.headers[\"Content-Security-Policy\"]\n    assert response.headers[\"Cache-Control\"] == \"no-store\"\n    assert \"Content-Security-Policy-Report-Only\" not in response.headers\n"
    },
    {
      "title": "Validate CSP reports and map metrics to finite categories",
      "language": "python",
      "blurb": "Malformed, oversized, or invalid reports receive a controlled 400 response, while unexpected directive and disposition values map to other before reaching metric tags.",
      "code": "import json\n\nKNOWN_CSP_DIRECTIVES = {\n    \"base-uri\", \"connect-src\", \"default-src\", \"font-src\", \"form-action\",\n    \"frame-ancestors\", \"frame-src\", \"img-src\", \"media-src\", \"object-src\",\n    \"script-src\", \"script-src-elem\", \"style-src\", \"style-src-elem\",\n}\nKNOWN_CSP_DISPOSITIONS = {\"enforce\", \"report\"}\n\ndef record_csp_report(request, metrics) -> tuple[str, int]:\n    if request.content_type != \"application/csp-report\":\n        return \"invalid report\", 400\n    if request.content_length is None or request.content_length > 16_384:\n        return \"invalid report\", 400\n    raw = request.get_data(cache=False, as_text=False)\n    if len(raw) > 16_384:\n        return \"invalid report\", 400\n    try:\n        document = json.loads(raw)\n        report = document[\"csp-report\"]\n    except (UnicodeDecodeError, json.JSONDecodeError, KeyError, TypeError):\n        return \"invalid report\", 400\n    if not isinstance(document, dict) or not isinstance(report, dict):\n        return \"invalid report\", 400\n    directive = report.get(\"violated-directive\")\n    disposition = report.get(\"disposition\")\n    if not isinstance(directive, str) or not isinstance(disposition, str):\n        return \"invalid report\", 400\n    metrics.increment(\n        \"csp_violation\",\n        tags={\n            \"directive\": directive if directive in KNOWN_CSP_DIRECTIVES else \"other\",\n            \"disposition\": disposition if disposition in KNOWN_CSP_DISPOSITIONS else \"other\",\n        },\n    )\n    return \"\", 204\n"
    }
  ]
};
