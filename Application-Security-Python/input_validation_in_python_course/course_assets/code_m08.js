window.COURSE_CODE_MODULE = {
  "title": "Code Example: Testing Boundaries",
  "codeExamples": [
    {
      "title": "Code Example: Testing Boundaries",
      "language": "python",
      "code": String.raw`# Requires Python 3.10+ and pytest 9.x:
# python -m pip install "pytest>=9,<10"
# Save this example as test_validation.py, then run:
# python -m pytest -q test_validation.py
import pytest


class ValidationError(ValueError):
    pass


def validate_quantity(value: object) -> int:
    # bool is an int subclass, so isinstance(value, int) is too permissive.
    if type(value) is not int:
        raise ValidationError("quantity must be an integer")
    if not 1 <= value <= 100:
        raise ValidationError("quantity must be between 1 and 100")
    return value


@pytest.mark.parametrize("value", [1, 50, 100])
def test_valid_quantities(value):
    assert validate_quantity(value) == value


@pytest.mark.parametrize("value", [0, 101, "5", None, True, False])
def test_invalid_quantities(value):
    with pytest.raises(ValidationError):
        validate_quantity(value)
`
    }
  ]
};
