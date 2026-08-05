window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating Multiple Input Sources",
  "codeExamples": [
    {
      "title": "Code Example: Validating Multiple Input Sources",
      "language": "python",
      "code": String.raw`import json
import os
import re
import unicodedata


class ValidationError(ValueError):
    pass


MAX_JSON_BYTES = 16_384
MIN_JSON_INTEGER = -(2**63)
MAX_JSON_INTEGER = 2**63 - 1
BIDI_CONTROL_CODE_POINTS = frozenset(
    {
        0x061C,  # ARABIC LETTER MARK
        0x200E,  # LEFT-TO-RIGHT MARK
        0x200F,  # RIGHT-TO-LEFT MARK
        0x202A,  # LEFT-TO-RIGHT EMBEDDING
        0x202B,  # RIGHT-TO-LEFT EMBEDDING
        0x202C,  # POP DIRECTIONAL FORMATTING
        0x202D,  # LEFT-TO-RIGHT OVERRIDE
        0x202E,  # RIGHT-TO-LEFT OVERRIDE
        0x2066,  # LEFT-TO-RIGHT ISOLATE
        0x2067,  # RIGHT-TO-LEFT ISOLATE
        0x2068,  # FIRST STRONG ISOLATE
        0x2069,  # POP DIRECTIONAL ISOLATE
    }
)
USERNAME_PATTERN = re.compile(
    r"[A-Za-z0-9][A-Za-z0-9_.-]{0,39}", flags=re.ASCII
)


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


def single_line_text(value: object, *, name: str, maximum: int) -> str:
    if type(value) is not str:
        raise ValidationError(f"{name} must be text")
    if not 1 <= len(value) <= maximum:
        raise ValidationError(f"{name} must be 1 to {maximum} characters")

    text = value.strip()
    if (
        not text
        or len(text) > maximum
        or any(
            unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
            or ord(character) in BIDI_CONTROL_CODE_POINTS
            for character in text
        )
    ):
        raise ValidationError(f"{name} must be 1 to {maximum} characters")
    return text


def username_text(value: object) -> str:
    if type(value) is not str:
        raise ValidationError("username must be text")
    if not 1 <= len(value) <= 40:
        raise ValidationError("username has invalid characters or length")
    username = value.strip()
    if USERNAME_PATTERN.fullmatch(username) is None:
        raise ValidationError("username has invalid characters or length")
    return username


def unique_json_object(pairs: list[tuple[str, object]]) -> dict:
    result = {}
    for name, value in pairs:
        if name in result:
            raise ValidationError("JSON member names must be unique")
        result[name] = value
    return result


def reject_nonstandard_number(_value: str) -> None:
    raise ValidationError("JSON numbers must use standard JSON syntax")


def bounded_json_integer(value: str) -> int:
    # Enforce the application contract before invoking arbitrary-precision int().
    if len(value) > 20:
        raise ValidationError("JSON integer is outside the allowed range")
    try:
        number = int(value, 10)
    except ValueError:
        raise ValidationError("JSON integer is invalid") from None
    if not MIN_JSON_INTEGER <= number <= MAX_JSON_INTEGER:
        raise ValidationError("JSON integer is outside the allowed range")
    return number


def parse_json_object(text: object) -> dict:
    if type(text) is not str:
        raise ValidationError("JSON input must be text")
    if len(text) > MAX_JSON_BYTES:
        raise ValidationError("JSON input is too large")
    try:
        if len(text.encode("utf-8")) > MAX_JSON_BYTES:
            raise ValidationError("JSON input is too large")
        payload = json.loads(
            text,
            object_pairs_hook=unique_json_object,
            parse_int=bounded_json_integer,
            parse_constant=reject_nonstandard_number,
        )
    except (UnicodeEncodeError, ValueError, RecursionError):
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

username = username_text(payload["username"])
display_name = single_line_text(
    payload["display_name"], name="display_name", maximum=80
)

print(page_size, username, display_name)
`
    }
  ]
};
