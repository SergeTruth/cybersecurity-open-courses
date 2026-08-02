window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Bias, Encoding, and Length Decisions through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Sample an allowed value without modulo bias",
      "language": "python",
      "blurb": "randbelow performs rejection sampling for a non-power-of-two range instead of reducing random bytes with a biased remainder operation.",
      "code": "import secrets\n\nALLOWED_PORTS = (2003, 2011, 2027, 2039, 2053, 2069, 2081)\n\ndef choose_ephemeral_service_port() -> int:\n    return ALLOWED_PORTS[secrets.randbelow(len(ALLOWED_PORTS))]\n"
    },
    {
      "title": "Convert an entropy requirement into token bytes",
      "language": "python",
      "blurb": "The helper rounds requested security bits upward to whole bytes, enforces a documented range, and reports the raw entropy separately from encoded length.",
      "code": "from dataclasses import dataclass\nfrom math import ceil\nimport secrets\n\n@dataclass(frozen=True)\nclass GeneratedToken:\n    value: str\n    entropy_bits: int\n\ndef token_for_entropy(required_bits: int = 192) -> GeneratedToken:\n    if type(required_bits) is not int or not 128 <= required_bits <= 512:\n        raise ValueError(\"token entropy requirement rejected\")\n    byte_count = ceil(required_bits / 8)\n    return GeneratedToken(secrets.token_urlsafe(byte_count), byte_count * 8)\n"
    }
  ]
};
