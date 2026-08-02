window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Framework and Deployment Patterns with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Serve only repository-selected files in Flask",
      "language": "python",
      "blurb": "The route treats the URL segment as an object identifier and gives send_file a path retrieved from an authorization-aware service.",
      "code": "from flask import abort, send_file\n\ndef download_file(file_id: str, current_user, files):\n    record = files.find_for_subject(file_id=file_id, subject_id=current_user.id)\n    if record is None:\n        abort(404)\n    stream = files.open(record.storage_key)\n    return send_file(\n        stream,\n        as_attachment=True,\n        download_name=record.safe_download_name,\n        mimetype=record.media_type,\n    )\n"
    },
    {
      "title": "Delete through an application storage interface",
      "language": "python",
      "blurb": "The route passes opaque identifiers to storage policy instead of translating a user path into a recursive filesystem operation.",
      "code": "def delete_user_document(document_id: str, subject, repository, storage) -> None:\n    document = repository.lock_authorized_document(\n        document_id=document_id,\n        subject_id=subject.id,\n        permission=\"delete\",\n    )\n    if document is None:\n        raise FileNotFoundError(\"document not found\")\n    storage.delete_object(document.storage_key)\n    repository.mark_deleted(document.id)\n"
    }
  ]
};
