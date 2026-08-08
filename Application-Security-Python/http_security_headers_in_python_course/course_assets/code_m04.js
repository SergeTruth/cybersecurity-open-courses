window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Content Security Policy Fundamentals with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Issue a CSP nonce per response",
      "language": "python",
      "blurb": "A fresh nonce is placed in both the template context and a narrowly constructed Content Security Policy.",
      "code": "import secrets\n\ndef csp_for_response(template_context: dict, response):\n    if not isinstance(template_context, dict) or \"csp_nonce\" in template_context:\n        raise ValueError(\"template context rejected\")\n    nonce = secrets.token_urlsafe(24)\n    template_context[\"csp_nonce\"] = nonce\n    response.headers[\"Content-Security-Policy\"] = (\n        \"default-src 'self'; object-src 'none'; base-uri 'none'; \"\n        f\"script-src 'self' 'nonce-{nonce}'\"\n    )\n    return response\n"
    },
    {
      "title": "Roll out CSP in report-only mode",
      "language": "python",
      "blurb": "A percentage gate selects report-only observation while never sending conflicting enforced and report-only policies together.",
      "code": "MAX_CSP_BYTES = 8_192\n\ndef apply_csp_rollout(response, policy: str, enforce: bool) -> None:\n    if (\n        not isinstance(policy, str)\n        or not policy\n        or len(policy.encode(\"utf-8\")) > MAX_CSP_BYTES\n        or any(character in policy for character in \"\\r\\n\\x00\")\n        or type(enforce) is not bool\n    ):\n        raise ValueError(\"CSP rollout policy rejected\")\n    header = \"Content-Security-Policy\" if enforce else \"Content-Security-Policy-Report-Only\"\n    other = \"Content-Security-Policy-Report-Only\" if enforce else \"Content-Security-Policy\"\n    response.headers.pop(other, None)\n    response.headers[header] = policy\n"
    }
  ]
};
