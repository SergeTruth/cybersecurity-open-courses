window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply File Upload Safety with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Identify upload content from bounded bytes",
      "language": "python",
      "blurb": "The validator checks a small file signature and actual stream length instead of accepting the browser's filename or content type.",
      "code": "from io import BufferedReader\n\nSIGNATURES = {b\"%PDF-\": \"application/pdf\", b\"\\x89PNG\\r\\n\\x1a\\n\": \"image/png\"}\n\ndef identify_upload(stream: BufferedReader, maximum: int = 8_000_000) -> tuple[str, bytes]:\n    data = stream.read(maximum + 1)\n    if len(data) > maximum:\n        raise ValueError(\"upload is too large\")\n    media_type = next((kind for magic, kind in SIGNATURES.items() if data.startswith(magic)), None)\n    if media_type is None:\n        raise ValueError(\"unsupported file content\")\n    return media_type, data\n"
    },
    {
      "title": "Retain quarantined content until publication commits",
      "language": "python",
      "blurb": "A clean upload is removed from quarantine only after public storage succeeds; failures retain a durable recovery state.",
      "code": "def scan_and_publish(quarantine, public_store, scanner, upload_id: str) -> None:\n    handle = quarantine.open(upload_id)\n    try:\n        verdict = scanner.inspect(handle)\n        if verdict != \"clean\":\n            quarantine.mark_failed(upload_id, reason=\"scan_rejected\")\n            raise ValueError(\"upload was not accepted\")\n        handle.seek(0)\n        try:\n            public_store.put(upload_id, handle)\n        except BaseException:\n            quarantine.mark_failed(upload_id, reason=\"publication_failed\")\n            raise\n        else:\n            quarantine.delete(upload_id)\n    finally:\n        handle.close()\n"
    }
  ]
};
