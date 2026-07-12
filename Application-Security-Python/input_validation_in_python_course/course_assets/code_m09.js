window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "Code Example: A Complete Validation Pattern",
      "language": "python",
      "code": String.raw`ALLOWED_STATUSES = {"draft", "submitted", "approved", "rejected"}
ALLOWED_TRANSITIONS = {
    "draft": {"submitted"},
    "submitted": {"approved", "rejected"},
    "approved": set(),
    "rejected": set(),
}
TICKET_FIELDS = {"title", "status"}


class ValidationError(ValueError):
    pass


def validate_ticket_update(current_status: object, payload: object) -> dict:
    if type(current_status) is not str:
        raise ValidationError("current_status must be text")
    if current_status not in ALLOWED_STATUSES:
        raise ValidationError("current_status is not recognized")
    if type(payload) is not dict:
        raise ValidationError("payload must be an object")
    if set(payload) != TICKET_FIELDS:
        raise ValidationError("payload must contain exactly title and status")

    title = payload["title"]
    status = payload["status"]
    if type(title) is not str:
        raise ValidationError("title must be text")
    if type(status) is not str:
        raise ValidationError("status must be text")

    normalized_title = title.strip()
    if not 1 <= len(normalized_title) <= 120:
        raise ValidationError("title must be 1 to 120 characters")
    if status not in ALLOWED_STATUSES:
        raise ValidationError("status is not allowed")
    if status not in ALLOWED_TRANSITIONS[current_status]:
        raise ValidationError("status transition is not allowed")

    return {"title": normalized_title, "status": status}


def expect_validation_error(current_status: object, payload: object) -> None:
    try:
        validate_ticket_update(current_status, payload)
    except ValidationError:
        return
    raise AssertionError("expected ValidationError")


expect_validation_error("draft", None)
expect_validation_error("draft", {"title": "Example", "status": []})
expect_validation_error(
    "draft", {"title": "Example", "status": "submitted", "admin": True}
)
expect_validation_error("draft", {"title": "Example", "status": "approved"})
`
    }
  ]
};
