window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating at the Boundary",
  "codeExamples": [
    {
      "title": "Code Example: Validating at the Boundary",
      "language": "python",
      "code": "from dataclasses import dataclass\n\n\nclass ValidationError(ValueError):\n    pass\n\n\n@dataclass(frozen=True)\nclass Signup:\n    email: str\n    age: int\n\n\ndef parse_signup(raw: dict) -> Signup:\n    email = raw.get(\"email\")\n    age = raw.get(\"age\")\n\n    if not isinstance(email, str):\n        raise ValidationError(\"email is required\")\n\n    email = email.strip().lower()\n    if \"@\" not in email or len(email) > 254:\n        raise ValidationError(\"email is invalid\")\n\n    if not isinstance(age, int) or not 13 <= age <= 120:\n        raise ValidationError(\"age must be between 13 and 120\")\n\n    return Signup(email=email, age=age)\n\n\nsignup = parse_signup({\"email\": \"User@example.com \", \"age\": 30})\nprint(signup)"
    }
  ]
};
