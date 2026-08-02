window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Sensitive Data, Secrets, and Privacy through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Keep sensitive intermediate data off named paths",
      "language": "python",
      "blurb": "A TemporaryFile holds the plaintext through an already-open descriptor, is overwritten before close, and never exposes a reusable pathname to other components.",
      "code": "import os\nimport tempfile\n\ndef transform_sensitive_value(plaintext: bytes, transform) -> bytes:\n    if not 1 <= len(plaintext) <= 1_000_000:\n        raise ValueError(\"sensitive input size rejected\")\n    with tempfile.TemporaryFile(mode=\"w+b\") as temporary:\n        temporary.write(plaintext)\n        temporary.flush()\n        temporary.seek(0)\n        result = transform(temporary)\n        temporary.seek(0)\n        remaining = len(plaintext)\n        block = b\"\\x00\" * 65_536\n        while remaining:\n            written = min(remaining, len(block))\n            temporary.write(block[:written])\n            remaining -= written\n        temporary.flush()\n        os.fsync(temporary.fileno())\n    return result\n"
    },
    {
      "title": "Describe temporary work without logging its path",
      "language": "python",
      "blurb": "The audit event contains a job identifier, purpose, size class, and outcome while excluding generated names, filesystem locations, source content, and secret values.",
      "code": "TEMP_PURPOSES = {\"document_render\", \"upload_scan\", \"report_export\"}\nTEMP_OUTCOMES = {\"created\", \"processed\", \"rejected\", \"cleanup_failed\"}\n\ndef record_temporary_event(logger, purpose: str, outcome: str, byte_count: int) -> None:\n    safe_purpose = purpose if purpose in TEMP_PURPOSES else \"other\"\n    safe_outcome = outcome if outcome in TEMP_OUTCOMES else \"other\"\n    size = \"empty\" if byte_count == 0 else \"small\" if byte_count <= 1_000_000 else \"large\"\n    logger.info(\n        \"temporary_object_event\",\n        extra={\"purpose\": safe_purpose, \"outcome\": safe_outcome, \"size_class\": size},\n    )\n"
    }
  ]
};
