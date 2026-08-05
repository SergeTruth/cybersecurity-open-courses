window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Allowlisted Identifiers and Storage Abstraction with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map an opaque identifier through an authorized record",
      "language": "python",
      "blurb": "The caller supplies a UUID, while tenant ownership and the application-generated storage key come from the database and are revalidated as one portable storage component before use.",
      "code": "from uuid import UUID\nimport re\n\nSAFE_STORAGE_KEY = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,127}\\Z\")\nWINDOWS_RESERVED = {\n    \"CON\", \"PRN\", \"AUX\", \"NUL\",\n    *(f\"COM{number}\" for number in range(1, 10)),\n    *(f\"LPT{number}\" for number in range(1, 10)),\n}\n\ndef validated_storage_key(value: str) -> str:\n    if not isinstance(value, str) or not SAFE_STORAGE_KEY.fullmatch(value):\n        raise RuntimeError(\"invalid stored key\")\n    basename = value.split(\".\", 1)[0].upper()\n    if basename in WINDOWS_RESERVED or value[-1] in {\".\", \" \"}:\n        raise RuntimeError(\"invalid stored key\")\n    return value\n\ndef storage_key_for_download(repository, tenant_id: str, supplied_id: str) -> str:\n    file_id = UUID(supplied_id)\n    record = repository.find_file(file_id=file_id, tenant_id=tenant_id)\n    if record is None or record.status != \"available\":\n        raise FileNotFoundError(\"file is unavailable\")\n    return validated_storage_key(record.storage_key)\n"
    },
    {
      "title": "Construct object-store keys from trusted segments",
      "language": "python",
      "blurb": "Tenant and object identifiers are validated independently before the server constructs a storage key.",
      "code": "import re\n\nIDENTIFIER = re.compile(r\"[a-z0-9][a-z0-9-]{0,62}\\Z\")\n\ndef object_key(tenant_id: str, object_id: str) -> str:\n    if not IDENTIFIER.fullmatch(tenant_id) or not IDENTIFIER.fullmatch(object_id):\n        raise ValueError(\"storage identifier rejected\")\n    return f\"tenants/{tenant_id}/objects/{object_id}\"\n"
    }
  ]
};
