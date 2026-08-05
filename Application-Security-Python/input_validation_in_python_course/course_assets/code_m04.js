window.COURSE_CODE_MODULE = {
  "title": "Code Example: Runtime Model Validation",
  "codeExamples": [
    {
      "title": "Code Example: Runtime Model Validation",
      "language": "python",
      "code": String.raw`# Requires Python 3.10+ and Pydantic 2.x with its email extra:
# python -m pip install "pydantic[email]>=2,<3"
from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationError


class Registration(BaseModel):
    # A boundary value must not become invalid after successful validation.
    model_config = ConfigDict(extra="forbid", strict=True, frozen=True)

    email: EmailStr
    age: int = Field(ge=13, le=120)
    marketing_opt_in: bool = False


registration = Registration.model_validate(
    {
        "email": "student@example.com",
        "age": 22,
        "marketing_opt_in": True,
    }
)
print(registration.model_dump())


invalid_examples = [
    {"email": "student@example.com", "age": "22"},
    {"email": "student@example.com", "age": 22.0},
    {
        "email": "student@example.com",
        "age": 22,
        "marketing_opt_in": "yes",
    },
    {
        "email": "student@example.com",
        "age": 22,
        "marketing_opt_in": 1,
    },
]

for invalid in invalid_examples:
    try:
        Registration.model_validate(invalid)
    except ValidationError:
        pass
    else:
        raise AssertionError("strict model accepted a coerced value")
`
    }
  ]
};
