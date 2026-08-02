window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Cookies, Caching, and Sensitive Responses with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Issue a host-only secure session cookie",
      "language": "python",
      "blurb": "The cookie omits Domain, scopes Path, blocks script access, requires HTTPS, and limits cross-site sending.",
      "code": "def set_session_cookie(response, session_id: str) -> None:\n    response.set_cookie(\n        \"__Host-session\",\n        session_id,\n        secure=True,\n        httponly=True,\n        samesite=\"Lax\",\n        path=\"/\",\n        max_age=1800,\n    )\n"
    },
    {
      "title": "Prevent caching of sensitive responses",
      "language": "python",
      "blurb": "Account data receives no-store while a separate public asset path can use an explicit immutable cache policy.",
      "code": "def apply_cache_policy(response, sensitivity: str) -> None:\n    if sensitivity == \"private\":\n        response.headers[\"Cache-Control\"] = \"no-store\"\n        response.headers[\"Pragma\"] = \"no-cache\"\n    elif sensitivity == \"public-versioned\":\n        response.headers[\"Cache-Control\"] = \"public, max-age=31536000, immutable\"\n    else:\n        raise ValueError(\"unknown cache sensitivity\")\n"
    }
  ]
};
