window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authentication, Tokens, and Secret Handling through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Apply a bearer token without exposing it to configuration logs",
      "language": "python",
      "blurb": "A provider resolves one approved reference, provider failures are bounded, and the token must match a strict printable bearer-token shape before it reaches the outbound header.",
      "code": "import re\nfrom typing import Protocol\n\nBEARER_TOKEN = re.compile(r\"[A-Za-z0-9._~+/-][A-Za-z0-9._~+/-]{31,4095}={0,8}\")\n\nclass TokenProvider(Protocol):\n    def read_text(self, reference: str) -> str: ...\n\nclass TokenProviderError(RuntimeError):\n    pass\n\ndef validated_bearer_token(value: object) -> str:\n    if not isinstance(value, str) or BEARER_TOKEN.fullmatch(value) is None:\n        raise ValueError(\"API token rejected\")\n    return value\n\ndef authorization_headers(provider: TokenProvider) -> dict[str, str]:\n    try:\n        token = provider.read_text(\"vault://production/partner-api/access-token\")\n    except Exception:\n        raise TokenProviderError(\"API token provider failed\") from None\n    token = validated_bearer_token(token)\n    return {\"Authorization\": f\"Bearer {token}\", \"Accept\": \"application/json\"}\n"
    },
    {
      "title": "Validate an OAuth token response before caching",
      "language": "python",
      "blurb": "The parser requires one token type, a bounded lifetime, and a strict printable token shape before returning the secret-bearing response to the token cache.",
      "code": "import re\nfrom dataclasses import dataclass\n\nBEARER_TOKEN = re.compile(r\"[A-Za-z0-9._~+/-][A-Za-z0-9._~+/-]{31,4095}={0,8}\")\n\n@dataclass(frozen=True)\nclass AccessToken:\n    value: str\n    expires_in: int\n\ndef validated_bearer_token(value: object) -> str:\n    if not isinstance(value, str) or BEARER_TOKEN.fullmatch(value) is None:\n        raise ValueError(\"access token rejected\")\n    return value\n\ndef parse_token_response(document: object) -> AccessToken:\n    if not isinstance(document, dict) or set(document) != {\"access_token\", \"token_type\", \"expires_in\"}:\n        raise ValueError(\"token response shape rejected\")\n    value, token_type, lifetime = document[\"access_token\"], document[\"token_type\"], document[\"expires_in\"]\n    if token_type != \"Bearer\" or type(lifetime) is not int or not 60 <= lifetime <= 3600:\n        raise ValueError(\"token metadata rejected\")\n    return AccessToken(validated_bearer_token(value), lifetime)\n"
    }
  ]
};
