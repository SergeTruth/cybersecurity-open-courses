window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Browser Defenses and Security Headers through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Issue a per-response CSP nonce",
      "language": "python",
      "blurb": "A cryptographic nonce enters both the Content-Security-Policy header and server-owned script tag, allowing intended inline code without unsafe-inline.",
      "code": "import secrets\n\ndef apply_nonce_csp(response, render_template, context: dict[str, object]):\n    nonce = secrets.token_urlsafe(24)\n    response.body = render_template(\"account.html\", {**context, \"csp_nonce\": nonce})\n    response.headers[\"Content-Security-Policy\"] = (\n        \"default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; \"\n        f\"script-src 'self' 'nonce-{nonce}'\"\n    )\n    return response\n"
    },
    {
      "title": "Set a layered browser header policy",
      "language": "python",
      "blurb": "The response combines an enforced CSP with nosniff, framing restrictions, referrer control, and no-store for a sensitive page without treating headers as an encoding substitute.",
      "code": "def protect_account_response(response):\n    response.headers.update(\n        {\n            \"Content-Security-Policy\": \"default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'\",\n            \"X-Content-Type-Options\": \"nosniff\",\n            \"Referrer-Policy\": \"strict-origin-when-cross-origin\",\n            \"Cache-Control\": \"no-store\",\n            \"Permissions-Policy\": \"camera=(), microphone=(), geolocation=()\",\n        }\n    )\n    return response\n"
    }
  ]
};
