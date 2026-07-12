window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating an API Request",
  "codeExamples": [
    {
      "title": "Code Example: Validating an API Request",
      "language": "python",
      "code": String.raw`from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict, PositiveInt, field_validator


app = FastAPI()


class ProfileUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    display_name: str
    timezone: str

    @field_validator("display_name")
    @classmethod
    def validate_display_name(cls, value: str) -> str:
        normalized = value.strip()
        if not 1 <= len(normalized) <= 60:
            raise ValueError("display_name must be 1 to 60 characters")
        return normalized

    @field_validator("timezone")
    @classmethod
    def validate_timezone(cls, value: str) -> str:
        normalized = value.strip()
        try:
            ZoneInfo(normalized)
        except (ValueError, ZoneInfoNotFoundError):
            raise ValueError("timezone must be an IANA timezone") from None
        return normalized


@app.patch("/users/{user_id}/profile")
def update_profile(user_id: PositiveInt, update: ProfileUpdate):
    return {
        "user_id": user_id,
        "display_name": update.display_name,
        "timezone": update.timezone,
    }
`
    }
  ]
};
