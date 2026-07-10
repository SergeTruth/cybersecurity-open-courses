window.COURSE_CODE_MODULE = {
  "title": "Code Example: A Complete Validation Pattern",
  "codeExamples": [
    {
      "title": "Code Example: A Complete Validation Pattern",
      "language": "python",
      "code": "ALLOWED_STATUSES = {\"draft\", \"submitted\", \"approved\", \"rejected\"}\nALLOWED_TRANSITIONS = {\n    \"draft\": {\"submitted\"},\n    \"submitted\": {\"approved\", \"rejected\"},\n    \"approved\": set(),\n    \"rejected\": set(),\n}\n\n\nclass ValidationError(ValueError):\n    pass\n\n\ndef validate_ticket_update(current_status: str, payload: dict) -> dict:\n    unexpected = set(payload) - {\"title\", \"status\"}\n    if unexpected:\n        raise ValidationError(f\"unexpected fields: {sorted(unexpected)}\")\n\n    title = payload.get(\"title\")\n    status = payload.get(\"status\")\n\n    if not isinstance(title, str) or not 1 <= len(title.strip()) <= 120:\n        raise ValidationError(\"title must be 1 to 120 characters\")\n\n    if status not in ALLOWED_STATUSES:\n        raise ValidationError(\"status is not allowed\")\n\n    if status not in ALLOWED_TRANSITIONS.get(current_status, set()):\n        raise ValidationError(\"status transition is not allowed\")\n\n    return {\"title\": title.strip(), \"status\": status}"
    }
  ]
};
