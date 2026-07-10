window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating Multiple Input Sources",
  "codeExamples": [
    {
      "title": "Code Example: Validating Multiple Input Sources",
      "language": "python",
      "code": "import json\nimport os\n\n\nclass ValidationError(ValueError):\n    pass\n\n\ndef positive_int(value: str, *, name: str, maximum: int) -> int:\n    try:\n        number = int(value)\n    except (TypeError, ValueError):\n        raise ValidationError(f\"{name} must be an integer\") from None\n\n    if not 1 <= number <= maximum:\n        raise ValidationError(f\"{name} must be between 1 and {maximum}\")\n    return number\n\n\ndef short_text(value: object, *, name: str, maximum: int) -> str:\n    if not isinstance(value, str):\n        raise ValidationError(f\"{name} must be text\")\n\n    text = value.strip()\n    if not text or len(text) > maximum:\n        raise ValidationError(f\"{name} must be 1 to {maximum} characters\")\n    return text\n\n\npage_size = positive_int(os.getenv(\"PAGE_SIZE\", \"25\"), name=\"PAGE_SIZE\", maximum=100)\npayload = json.loads('{\"username\": \"alice\", \"display_name\": \"Alice\"}')\n\nusername = short_text(payload.get(\"username\"), name=\"username\", maximum=40)\ndisplay_name = short_text(payload.get(\"display_name\"), name=\"display_name\", maximum=80)\n\nprint(page_size, username, display_name)"
    }
  ]
};
