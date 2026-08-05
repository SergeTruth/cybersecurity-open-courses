window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating at the Boundary",
  "codeExamples": [
    {
      "title": "Code Example: Validating at the Boundary",
      "language": "python",
      "code": String.raw`# Course examples require Python 3.10 or newer.
import unicodedata
from dataclasses import dataclass


class ValidationError(ValueError):
    pass


@dataclass(frozen=True)
class Signup:
    email: str
    age: int


def normalize_email(value: object) -> str:
    if type(value) is not str:
        raise ValidationError("email is required")
    if len(value) > 254 or not value.isascii():
        raise ValidationError("email failed a basic address sanity check")

    email = value.strip()
    if (
        len(email) > 254
        or email.count("@") != 1
        or any(
            character.isspace()
            or unicodedata.category(character) in {"Cc", "Cs", "Zl", "Zp"}
            for character in email
        )
    ):
        raise ValidationError("email failed a basic address sanity check")

    local_part, domain = email.split("@")
    if (
        not local_part
        or not domain
        or len(local_part) > 64
        or domain.startswith(".")
        or domain.endswith(".")
    ):
        raise ValidationError("email failed a basic address sanity check")

    # This lightweight example is intentionally ASCII-only. Use a dedicated
    # SMTPUTF8 and IDNA-aware validator when internationalized mail is allowed.
    # Preserve the local part; this application normalizes only the domain.
    normalized_domain = domain.lower()
    normalized_email = f"{local_part}@{normalized_domain}"
    if len(normalized_domain) > 253 or len(normalized_email) > 254:
        raise ValidationError("email failed a basic address sanity check")
    return normalized_email


def parse_signup(raw: object) -> Signup:
    required_fields = {"email", "age"}
    if type(raw) is not dict or set(raw) != required_fields:
        raise ValidationError("signup must contain exactly email and age")

    email = normalize_email(raw["email"])
    age = raw["age"]
    if type(age) is not int or not 13 <= age <= 120:
        raise ValidationError("age must be an integer from 13 to 120")

    return Signup(email=email, age=age)


signup = parse_signup({"email": "User@Example.COM ", "age": 30})
print(signup)
`
    }
  ]
};
