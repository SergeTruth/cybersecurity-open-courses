window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Testing, and Review with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log file metadata without content or paths",
      "language": "python",
      "blurb": "The event accepts only an opaque bounded file identifier, media category, byte count, and outcome so caller-provided paths are not logged.",
      "code": "import re\n\nMEDIA_CATEGORIES = {\"application/pdf\": \"document\", \"image/png\": \"image\"}\nOPAQUE_FILE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\nMAX_LOGGED_BYTES = 10_000_000_000\n\ndef file_event(logger, file_id: str, media_type: str, byte_count: int, outcome: str) -> None:\n    if not isinstance(file_id, str) or OPAQUE_FILE_ID.fullmatch(file_id) is None:\n        raise ValueError(\"file_id must be an opaque identifier\")\n    if type(byte_count) is not int or not 0 <= byte_count <= MAX_LOGGED_BYTES:\n        raise ValueError(\"byte_count is outside the logging policy\")\n    category = MEDIA_CATEGORIES.get(media_type, \"other\") if isinstance(media_type, str) else \"other\"\n    bounded_outcome = outcome if isinstance(outcome, str) and outcome in {\"accepted\", \"rejected\"} else \"error\"\n    logger.info(\n        \"file_processed\",\n        extra={\n            \"file_id\": file_id,\n            \"category\": category,\n            \"bytes\": byte_count,\n            \"outcome\": bounded_outcome,\n        },\n    )\n"
    },
    {
      "title": "Verify cleanup after parser failure",
      "language": "python",
      "blurb": "The regression injects a parser error and confirms that neither the staging file nor its containing workspace survives.",
      "code": "from pathlib import Path\nimport pytest\n\ndef test_failed_processing_removes_workspace(tmp_path: Path, processor) -> None:\n    workspace = tmp_path / \"job-42\"\n    workspace.mkdir()\n    staged = workspace / \"upload.bin\"\n    staged.write_bytes(b\"malformed\")\n    with pytest.raises(ValueError):\n        processor.process(staged)\n    assert not staged.exists()\n    assert not workspace.exists()\n"
    }
  ]
};
