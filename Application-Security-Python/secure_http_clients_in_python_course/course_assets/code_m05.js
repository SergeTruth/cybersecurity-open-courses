window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authentication, Tokens, and Secret Handling through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Apply a bearer token without exposing it to configuration logs",
      "language": "python",
      "blurb": "A provider resolves one approved reference, rejects control characters, and places the token only in the outbound authorization header.",
      "code": "from typing import Protocol\n\nclass TokenProvider(Protocol):\n    def read_text(self, reference: str) -> str: ...\n\ndef authorization_headers(provider: TokenProvider) -> dict[str, str]:\n    token = provider.read_text(\"vault://production/partner-api/access-token\")\n    if not 32 <= len(token) <= 4096 or any(character in token for character in \"\\r\\n\\x00\"):\n        raise ValueError(\"API token rejected\")\n    return {\"Authorization\": f\"Bearer {token}\", \"Accept\": \"application/json\"}\n"
    },
    {
      "title": "Validate an OAuth token response before caching",
      "language": "python",
      "blurb": "The parser requires one token type, a bounded lifetime, and an exact top-level shape before returning the secret-bearing response to the token cache.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass AccessToken:\n    value: str\n    expires_in: int\n\ndef parse_token_response(document: object) -> AccessToken:\n    if not isinstance(document, dict) or set(document) != {\"access_token\", \"token_type\", \"expires_in\"}:\n        raise ValueError(\"token response shape rejected\")\n    value, token_type, lifetime = document[\"access_token\"], document[\"token_type\"], document[\"expires_in\"]\n    if not isinstance(value, str) or not 32 <= len(value) <= 4096:\n        raise ValueError(\"access token rejected\")\n    if token_type != \"Bearer\" or type(lifetime) is not int or not 60 <= lifetime <= 3600:\n        raise ValueError(\"token metadata rejected\")\n    return AccessToken(value, lifetime)\n"
    }
  ]
};
