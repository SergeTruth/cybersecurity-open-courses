window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Quarantine is a lifecycle state backed by access controls. The repository and scanner interfaces here are conceptual application contracts.",
  "codeExamples": [
    {
      "title": "Bind approval to the checked object version",
      "language": "typescript",
      "blurb": "The scanner receives the pinned immutable version. Timeout, failure, or detection never produces ready state. The atomic promotion method checks that all required results belong to the same version and that publication remains authorized. Service-level cleanup and retry policy must handle stale quarantine records.",
      "code": "const object = await repository.getQuarantinedVersion(uploadId);\nconst format = await validatePinnedVersion(object);\nconst scan = await scanPinnedVersion(object);\n\nif (scan.status !== \"clean\") {\n  await repository.keepUnavailable(object.id, object.version, scan.status);\n  return;\n}\n\nawait repository.promoteIfAllChecksPass({\n  uploadId: object.id,\n  expectedVersion: object.version,\n  formatResult: format,\n  scanResult: scan,\n  recheckPublicationPermission: true\n});\n// A thrown scanner error must also leave the object unavailable.\n// Clean means the required scan passed, not proof of complete safety."
    }
  ]
};
