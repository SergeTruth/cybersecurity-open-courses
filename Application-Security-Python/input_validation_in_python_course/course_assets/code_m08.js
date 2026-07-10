window.COURSE_CODE_MODULE = {
  "title": "Code Example: Testing Boundaries",
  "codeExamples": [
    {
      "title": "Code Example: Testing Boundaries",
      "language": "python",
      "code": "import pytest\n\n\nclass ValidationError(ValueError):\n    pass\n\n\ndef validate_quantity(value: object) -> int:\n    if not isinstance(value, int):\n        raise ValidationError(\"quantity must be an integer\")\n    if not 1 <= value <= 100:\n        raise ValidationError(\"quantity must be between 1 and 100\")\n    return value\n\n\n@pytest.mark.parametrize(\"value\", [1, 50, 100])\ndef test_valid_quantities(value):\n    assert validate_quantity(value) == value\n\n\n@pytest.mark.parametrize(\"value\", [0, 101, \"5\", None])\ndef test_invalid_quantities(value):\n    with pytest.raises(ValidationError):\n        validate_quantity(value)"
    }
  ]
};
