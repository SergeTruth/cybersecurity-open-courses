window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Upload and Download Safety with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Stream an upload into application-controlled storage",
      "language": "python",
      "blurb": "The server bounds actual bytes and removes its partial destination whenever reading, validation, or writing fails before completion.",
      "code": "from hashlib import sha256\nfrom pathlib import Path\nfrom uuid import uuid4\n\ndef store_upload(stream, directory: Path, maximum: int = 5_000_000) -> tuple[Path, str]:\n    destination = directory / uuid4().hex\n    digest = sha256()\n    total = 0\n    created = False\n    try:\n        output = destination.open(\"xb\")\n        created = True\n        with output:\n            while chunk := stream.read(64 * 1024):\n                total += len(chunk)\n                if total > maximum:\n                    raise ValueError(\"upload exceeds the byte limit\")\n                digest.update(chunk)\n                output.write(chunk)\n        return destination, digest.hexdigest()\n    except BaseException:\n        if created:\n            destination.unlink(missing_ok=True)\n        raise\n"
    },
    {
      "title": "Authorize before opening a download",
      "language": "python",
      "blurb": "The repository evaluates tenant and subject access first, then a trusted storage identifier is opened by the storage service.",
      "code": "def open_authorized_download(repository, storage, tenant_id: str, subject_id: str, file_id: str):\n    record = repository.get_authorized_file(\n        tenant_id=tenant_id,\n        subject_id=subject_id,\n        file_id=file_id,\n        permission=\"download\",\n    )\n    if record is None:\n        raise FileNotFoundError(\"file not found\")\n    return storage.open_read(record.storage_key)\n"
    }
  ]
};
