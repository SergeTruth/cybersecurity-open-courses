window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating at the Boundary",
  "codeExamples": [
    {
      "title": "Code Example: Validating at the Boundary",
      "language": "python",
      "code": String.raw`from dataclasses import dataclass


class ValidationError(ValueError):
    pass


@dataclass(frozen=True)
class Signup:
    email: str
    age: int


def normalize_email(value: object) -> str:
    if type(value) is not str:
        raise ValidationError("email is required")

    email = value.strip()
    if (
        len(email) > 254
        or email.count("@") != 1
        or any(
            character.isspace()
            or ord(character) < 32
            or ord(character) == 127
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

    # Preserve the local part; this application normalizes only the domain.
    return f"{local_part}@{domain.lower()}"


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
