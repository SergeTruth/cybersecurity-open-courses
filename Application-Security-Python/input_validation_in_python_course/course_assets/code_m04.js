window.COURSE_CODE_MODULE = {
  "title": "Code Example: Runtime Model Validation",
  "codeExamples": [
    {
      "title": "Code Example: Runtime Model Validation",
      "language": "python",
      "code": String.raw`from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationError


class Registration(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

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
