window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply HTTPS, HSTS, and Transport Assumptions with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Apply HSTS only on verified HTTPS responses",
      "language": "python",
      "blurb": "The middleware trusts a deployment-provided secure flag and adds a conservative host-only HSTS baseline to HTTPS responses, including errors.",
      "code": "HSTS = \"max-age=31536000\"\n\ndef add_transport_policy(response, request_is_secure: bool):\n    if type(request_is_secure) is not bool:\n        raise TypeError(\"secure-request evidence must be Boolean\")\n    if request_is_secure:\n        response.headers[\"Strict-Transport-Security\"] = HSTS\n    return response\n"
    },
    {
      "title": "Validate an HSTS rollout policy",
      "language": "python",
      "blurb": "Preload and subdomain coverage require deliberate configuration instead of appearing accidentally in a generic header string.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass HSTSPolicy:\n    max_age: int\n    include_subdomains: bool\n    preload: bool\n\ndef render_hsts(policy: HSTSPolicy) -> str:\n    if (\n        type(policy) is not HSTSPolicy\n        or type(policy.max_age) is not int\n        or type(policy.include_subdomains) is not bool\n        or type(policy.preload) is not bool\n    ):\n        raise TypeError(\"validated HSTS policy required\")\n    if not 0 <= policy.max_age <= 63_072_000:\n        raise ValueError(\"unsupported HSTS max-age\")\n    if policy.preload and (policy.max_age < 31_536_000 or not policy.include_subdomains):\n        raise ValueError(\"preload requires long-lived subdomain coverage\")\n    parts = [f\"max-age={policy.max_age}\"]\n    parts += [\"includeSubDomains\"] if policy.include_subdomains else []\n    parts += [\"preload\"] if policy.preload else []\n    return \"; \".join(parts)\n"
    }
  ]
};
