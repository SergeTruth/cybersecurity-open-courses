window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating an API Request",
  "codeExamples": [
    {
      "title": "Code Example: Validating an API Request",
      "language": "python",
      "code": "from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel, ConfigDict, Field\n\n\napp = FastAPI()\n\n\nclass ProfileUpdate(BaseModel):\n    model_config = ConfigDict(extra=\"forbid\")\n\n    display_name: str = Field(min_length=1, max_length=60)\n    timezone: str = Field(pattern=r\"^[A-Za-z_]+/[A-Za-z_]+$\")\n\n\n@app.patch(\"/users/{user_id}/profile\")\ndef update_profile(user_id: int, update: ProfileUpdate):\n    if user_id <= 0:\n        raise HTTPException(status_code=404, detail=\"user not found\")\n\n    return {\n        \"user_id\": user_id,\n        \"display_name\": update.display_name.strip(),\n        \"timezone\": update.timezone,\n    }"
    }
  ]
};
