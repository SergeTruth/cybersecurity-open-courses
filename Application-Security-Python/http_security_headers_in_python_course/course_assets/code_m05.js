window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Framing, Embedding, and Clickjacking Resistance with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Control framing by route sensitivity",
      "language": "python",
      "blurb": "Sensitive pages deny all framing while the approved embed surface names its permitted parent in CSP.",
      "code": "def frame_policy(route_name: str) -> dict[str, str]:\n    if route_name == \"partner_widget\":\n        return {\"Content-Security-Policy\": \"frame-ancestors https://portal.partner.example\"}\n    return {\n        \"Content-Security-Policy\": \"frame-ancestors 'none'\",\n        \"X-Frame-Options\": \"DENY\",\n    }\n"
    },
    {
      "title": "Protect a state-changing page from embedding",
      "language": "python",
      "blurb": "The response combines framing policy with a SameSite cookie so clickjacking defenses do not depend on one header alone.",
      "code": "def protect_account_response(response, session_id: str):\n    response.headers[\"Content-Security-Policy\"] = \"frame-ancestors 'none'\"\n    response.headers[\"X-Frame-Options\"] = \"DENY\"\n    response.set_cookie(\n        \"session\", session_id, secure=True, httponly=True, samesite=\"Lax\", path=\"/\"\n    )\n    return response\n"
    }
  ]
};
