window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating Multiple Input Sources",
  "codeExamples": [
    {
      "title": "Code Example: Validating Multiple Input Sources",
      "language": "python",
      "code": String.raw`import json
import os


class ValidationError(ValueError):
    pass


def positive_int(value: object, *, name: str, maximum: int) -> int:
    # Canonical decimal: ASCII digits, no sign, whitespace, or leading zero.
    if (
        type(value) is not str
        or not value
        or len(value) > len(str(maximum))
        or not "1" <= value[0] <= "9"
        or any(not "0" <= character <= "9" for character in value[1:])
    ):
        raise ValidationError(f"{name} must be canonical decimal text")

    number = int(value, 10)
    if number > maximum:
        raise ValidationError(f"{name} must be between 1 and {maximum}")
    return number


def short_text(value: object, *, name: str, maximum: int) -> str:
    if type(value) is not str:
        raise ValidationError(f"{name} must be text")

    text = value.strip()
    if not text or len(text) > maximum:
        raise ValidationError(f"{name} must be 1 to {maximum} characters")
    return text


def parse_json_object(text: object) -> dict:
    if type(text) is not str:
        raise ValidationError("JSON input must be text")
    try:
        payload = json.loads(text)
    except (ValueError, RecursionError):
        raise ValidationError("input is not valid JSON") from None
    if type(payload) is not dict:
        raise ValidationError("JSON input must be an object")
    return payload


page_size = positive_int(
    os.getenv("PAGE_SIZE", "25"), name="PAGE_SIZE", maximum=100
)
payload = parse_json_object(
    '{"username": "alice", "display_name": "Alice"}'
)
if set(payload) != {"username", "display_name"}:
    raise ValidationError("profile fields are invalid")

username = short_text(payload["username"], name="username", maximum=40)
display_name = short_text(
    payload["display_name"], name="display_name", maximum=80
)

print(page_size, username, display_name)
`
    }
  ]
};
