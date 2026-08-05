window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Review, Monitoring, and Remediation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Test the production error boundary",
      "language": "python",
      "blurb": "The regression checks both the stable public body and the absence of traceback, path, and secret markers.",
      "code": "def test_internal_error_is_not_disclosed(client, monkeypatch):\n    monkeypatch.setattr(\"app.orders.load\", lambda _id: (_ for _ in ()).throw(RuntimeError(\"secret=/tmp/key\")))\n    response = client.get(\"/orders/42\")\n    body = response.get_data(as_text=True)\n    assert response.status_code == 500\n    assert \"incident_id\" in response.get_json()\n    assert \"Traceback\" not in body and \"/tmp/key\" not in body and \"secret\" not in body\n"
    },
    {
      "title": "Monitor failure categories instead of messages",
      "language": "python",
      "blurb": "Metrics use application-specific exception classes and finite labels; the helper reports telemetry failure without replacing the primary error path.",
      "code": "class DependencyTimedOut(Exception):\n    pass\n\nclass AuthorizationDenied(Exception):\n    pass\n\nclass InvalidRequest(Exception):\n    pass\n\nERROR_CATEGORIES = {\n    DependencyTimedOut: \"timeout\",\n    AuthorizationDenied: \"denied\",\n    InvalidRequest: \"invalid_input\",\n}\n\ndef observe_failure(metrics, error: Exception) -> bool:\n    category = next(\n        (name for kind, name in ERROR_CATEGORIES.items() if isinstance(error, kind)),\n        \"internal\",\n    )\n    try:\n        metrics.increment(\"operation_failure\", tags={\"category\": category})\n    except Exception:\n        return False\n    return True\n"
    }
  ]
};
