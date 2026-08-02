window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply MIME, Referrer, Permissions, and Isolation Headers with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Set MIME, referrer, and feature policies",
      "language": "python",
      "blurb": "Each header controls a distinct browser behavior and uses an explicit policy suitable for a private application.",
      "code": "def add_browser_policies(response):\n    response.headers.update({\n        \"X-Content-Type-Options\": \"nosniff\",\n        \"Referrer-Policy\": \"strict-origin-when-cross-origin\",\n        \"Permissions-Policy\": \"camera=(), microphone=(), geolocation=()\",\n    })\n    return response\n"
    },
    {
      "title": "Isolate a cross-origin application",
      "language": "python",
      "blurb": "The document and its resources receive compatible COOP, COEP, and CORP policies after the deployment is reviewed for breakage.",
      "code": "def add_cross_origin_isolation(response, resource_kind: str):\n    if resource_kind == \"document\":\n        response.headers[\"Cross-Origin-Opener-Policy\"] = \"same-origin\"\n        response.headers[\"Cross-Origin-Embedder-Policy\"] = \"require-corp\"\n    else:\n        response.headers[\"Cross-Origin-Resource-Policy\"] = \"same-site\"\n    return response\n"
    }
  ]
};
