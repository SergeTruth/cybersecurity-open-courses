window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating File Input",
  "codeExamples": [
    {
      "title": "Code Example: Validating File Input",
      "language": "python",
      "code": "import json\nfrom pathlib import Path\n\n\nclass ValidationError(ValueError):\n    pass\n\n\nBASE_DIR = Path(\"/srv/app/uploads\").resolve()\nMAX_BYTES = 1_000_000\n\n\ndef resolve_upload_path(filename: str) -> Path:\n    if not isinstance(filename, str) or not filename:\n        raise ValidationError(\"filename is required\")\n\n    candidate = (BASE_DIR / filename).resolve()\n    try:\n        candidate.relative_to(BASE_DIR)\n    except ValueError:\n        raise ValidationError(\"filename escapes the upload directory\") from None\n\n    if candidate.suffix.lower() != \".json\":\n        raise ValidationError(\"only JSON files are accepted\")\n    return candidate\n\n\ndef load_customer_import(filename: str) -> list[dict]:\n    path = resolve_upload_path(filename)\n    if path.stat().st_size > MAX_BYTES:\n        raise ValidationError(\"file is too large\")\n\n    data = json.loads(path.read_text(encoding=\"utf-8\"))\n    customers = data.get(\"customers\") if isinstance(data, dict) else None\n    if not isinstance(customers, list):\n        raise ValidationError(\"customers must be a list\")\n\n    return customers"
    }
  ]
};
