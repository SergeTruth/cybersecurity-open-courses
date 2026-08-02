window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Testing, and Review with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log file metadata without content or paths",
      "language": "python",
      "blurb": "The event contains an opaque file identifier, bounded media category, byte count, and outcome only.",
      "code": "MEDIA_CATEGORIES = {\"application/pdf\": \"document\", \"image/png\": \"image\"}\n\ndef file_event(logger, file_id: str, media_type: str, byte_count: int, outcome: str) -> None:\n    logger.info(\n        \"file_processed\",\n        extra={\n            \"file_id\": file_id,\n            \"category\": MEDIA_CATEGORIES.get(media_type, \"other\"),\n            \"bytes\": max(0, byte_count),\n            \"outcome\": outcome if outcome in {\"accepted\", \"rejected\"} else \"error\",\n        },\n    )\n"
    },
    {
      "title": "Verify cleanup after parser failure",
      "language": "python",
      "blurb": "The regression injects a parser error and confirms that neither the staging file nor its containing workspace survives.",
      "code": "from pathlib import Path\nimport pytest\n\ndef test_failed_processing_removes_workspace(tmp_path: Path, processor) -> None:\n    workspace = tmp_path / \"job-42\"\n    workspace.mkdir()\n    staged = workspace / \"upload.bin\"\n    staged.write_bytes(b\"malformed\")\n    with pytest.raises(ValueError):\n        processor.process(staged)\n    assert not staged.exists()\n    assert not workspace.exists()\n"
    }
  ]
};
