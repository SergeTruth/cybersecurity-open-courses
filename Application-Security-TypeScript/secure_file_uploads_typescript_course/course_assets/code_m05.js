window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Conceptual download integration. Repository and streaming helpers are application contracts; header construction must use the chosen framework's safe APIs.",
  "codeExamples": [
    {
      "title": "Authorize, then choose delivery semantics",
      "language": "typescript",
      "blurb": "findAuthorizedReadyAttachment must check current resource/tenant permission and ready state. The stream helper resolves a server-owned key and exact version. It must never turn an external request parameter into a filesystem path. Safe disposition construction validates and encodes the display name.",
      "code": "const attachment = await repository.findAuthorizedReadyAttachment(\n  auth,\n  attachmentId\n);\n\nreturn streamStoredVersion(attachment.storageKey, attachment.version, {\n  headers: {\n    \"Content-Type\": attachment.validatedMediaType,\n    \"Content-Disposition\": buildAttachmentDisposition(\n      attachment.safeDisplayName\n    ),\n    \"X-Content-Type-Options\": \"nosniff\",\n    \"Cache-Control\": \"private, no-store\"\n  }\n});\n// This is a private download-only policy, not an inline-view policy.\n// Attachment and nosniff do not make opening untrusted files harmless."
    }
  ]
};
