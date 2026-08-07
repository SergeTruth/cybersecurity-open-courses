window.COURSE_MODULE = {
  "title": "Serving Downloads and Static Files Safely",
  "graphicAlt": "Layered architecture view of Serving Downloads and Static Files Safely for Safe File Handling in Node.js, placing the protected asset at the center and surrounding it with identity, validation, resource, lifecycle, and monitoring controls.",
  "narration": "Serving a file is an authorization decision, not just a filesystem operation. A file may be stored safely, but if the download route trusts a path or ID without checking ownership, tenant, role, or workflow state, storage controls can be bypassed. Verify object-level authorization before serving private files, previews, exports, reports, attachments, or generated documents. Public static files and private downloads should use separate storage and routing patterns.\n\nAvoid predictable public URLs for private files. Signed URLs, temporary links, and object storage policies can be useful, but they should be scoped, time-limited, and logged where appropriate. Do not expose directory listings unless they are intentionally required and reviewed. Error responses should not reveal internal paths, storage keys, stack traces, bucket names, tenant identifiers, or sensitive metadata. A failed request should not become a storage map for an attacker.\n\nResponse headers matter because browsers make decisions based on them. Set content type, content disposition, caching, and sniffing behavior deliberately. Avoid reflecting untrusted filenames into headers or HTML without proper handling. Downloads such as invoices, support attachments, avatars, exports, and administrative reports all need retrieval rules that match their sensitivity. File security continues every time a file is served, previewed, cached, or linked.",
  "narrationPoints": [
      "Public static files and private downloads should use separate storage and routing patterns.",
      "Error responses should not reveal internal paths, storage keys, stack traces, bucket names, tenant identifiers, or sensitive metadata.",
      "File security continues every time a file is served, previewed, cached, or linked.",
      "Verify object-level authorization before serving private files, previews, exports, reports, attachments, or generated documents.",
      "A file may be stored safely, but if the download route trusts a path or ID without checking ownership, tenant, role, or workflow state, storage controls can be bypassed.",
      "Serving a file is an authorization decision, not just a filesystem operation."
  ]
};
