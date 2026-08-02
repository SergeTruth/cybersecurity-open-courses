window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Allowlisted Identifiers and Storage Abstraction with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map an opaque identifier through an authorized record",
      "language": "python",
      "blurb": "The caller supplies a UUID, while tenant ownership and the application-generated storage key come from the database.",
      "code": "from uuid import UUID\n\ndef storage_key_for_download(repository, tenant_id: str, supplied_id: str) -> str:\n    file_id = UUID(supplied_id)\n    record = repository.find_file(file_id=file_id, tenant_id=tenant_id)\n    if record is None or record.status != \"available\":\n        raise FileNotFoundError(\"file is unavailable\")\n    if \"/\" in record.storage_key or \"\\\\\" in record.storage_key:\n        raise RuntimeError(\"invalid stored key\")\n    return record.storage_key\n"
    },
    {
      "title": "Construct object-store keys from trusted segments",
      "language": "python",
      "blurb": "Tenant and object identifiers are validated independently before the server constructs a storage key.",
      "code": "import re\n\nIDENTIFIER = re.compile(r\"[a-z0-9][a-z0-9-]{0,62}\\Z\")\n\ndef object_key(tenant_id: str, object_id: str) -> str:\n    if not IDENTIFIER.fullmatch(tenant_id) or not IDENTIFIER.fullmatch(object_id):\n        raise ValueError(\"storage identifier rejected\")\n    return f\"tenants/{tenant_id}/objects/{object_id}\"\n"
    }
  ]
};
