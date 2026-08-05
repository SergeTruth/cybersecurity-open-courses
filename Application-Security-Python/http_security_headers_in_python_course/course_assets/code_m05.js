window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Framing, Embedding, and Clickjacking Resistance with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Control framing by route sensitivity",
      "language": "python",
      "blurb": "The framing helper updates only the frame-ancestors directive so route-specific embedding policy does not erase the rest of the central CSP.",
      "code": "def set_csp_directive(policy: str, name: str, value: str) -> str:\n    directives = []\n    target = name.casefold()\n    for raw_directive in policy.split(\";\"):\n        directive = raw_directive.strip()\n        if not directive:\n            continue\n        directive_name = directive.split(None, 1)[0].casefold()\n        if directive_name != target:\n            directives.append(directive)\n    directives.append(f\"{name} {value}\")\n    return \"; \".join(directives)\n\ndef apply_frame_policy(response, route_name: str):\n    if route_name == \"partner_widget\":\n        ancestors = \"https://portal.partner.example\"\n        response.headers.pop(\"X-Frame-Options\", None)\n    else:\n        ancestors = \"'none'\"\n        response.headers[\"X-Frame-Options\"] = \"DENY\"\n    response.headers[\"Content-Security-Policy\"] = set_csp_directive(\n        response.headers.get(\"Content-Security-Policy\", \"\"),\n        \"frame-ancestors\",\n        ancestors,\n    )\n    return response\n"
    },
    {
      "title": "Protect a state-changing page from embedding",
      "language": "python",
      "blurb": "The response composes framing policy with existing CSP directives and adds a SameSite cookie so clickjacking defenses do not depend on one header alone.",
      "code": "def protect_account_response(response, session_id: str):\n    response.headers[\"Content-Security-Policy\"] = set_csp_directive(\n        response.headers.get(\"Content-Security-Policy\", \"\"),\n        \"frame-ancestors\",\n        \"'none'\",\n    )\n    response.headers[\"X-Frame-Options\"] = \"DENY\"\n    response.set_cookie(\n        \"session\", session_id, secure=True, httponly=True, samesite=\"Lax\", path=\"/\"\n    )\n    return response\n"
    }
  ]
};
