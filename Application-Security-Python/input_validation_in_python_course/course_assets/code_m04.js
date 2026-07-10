window.COURSE_CODE_MODULE = {
  "title": "Code Example: Runtime Model Validation",
  "codeExamples": [
    {
      "title": "Code Example: Runtime Model Validation",
      "language": "python",
      "code": "from pydantic import BaseModel, ConfigDict, EmailStr, Field, ValidationError\n\n\nclass Registration(BaseModel):\n    model_config = ConfigDict(extra=\"forbid\")\n\n    email: EmailStr\n    age: int = Field(ge=13, le=120)\n    marketing_opt_in: bool = False\n\n\ntry:\n    registration = Registration.model_validate(\n        {\n            \"email\": \"student@example.com\",\n            \"age\": 22,\n            \"marketing_opt_in\": True,\n        }\n    )\nexcept ValidationError as error:\n    print(error.errors())\nelse:\n    print(registration.model_dump())"
    }
  ]
};
