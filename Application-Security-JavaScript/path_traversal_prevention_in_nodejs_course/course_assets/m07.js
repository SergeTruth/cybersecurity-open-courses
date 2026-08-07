window.COURSE_MODULE = {
  "title": "Uploads, Archives, Temporary Files, and Generated Output",
  "graphicAlt": "Security diagram for Path Traversal Prevention in Node.js, Uploads, Archives, Temporary Files, and Generated Output, showing the protected asset, trust boundary, enforcing component, and verification path with arrows from untrusted input to controlled output.",
  "narration": "Path traversal prevention is not limited to GET download endpoints. Uploaded filenames are untrusted and should not become storage paths. Archive entries can contain path-like names and should be validated before extraction or processing. Background jobs may receive filenames or object keys from queues, databases, or previous workflow steps. Every place that transforms external names into storage operations needs the same boundary discipline as a request handler.\n\nTemporary files should use isolated directories and generated names. Generated reports, exports, thumbnails, converted documents, and cached artifacts should be written only to intended output locations. Cleanup routines should not delete paths derived from untrusted input without the same boundary checks used for reads and writes. A cleanup job with broad deletion authority can be dangerous if it trusts names from stale records, queues, or user-controlled metadata.\n\nAvoid writing user-controlled content into executable application directories or public web roots. Server-generated storage keys and metadata records make it easier to connect files to business objects and authorization rules. If object storage is used, treat object keys as controlled storage identifiers, not arbitrary strings from callers. The same design should apply across upload intake, processing workers, scanners, preview generators, exports, downloads, and deletion.",
  "narrationPoints": [
    "Archive entries can contain path-like names and should be validated before extraction or processing.",
    "Temporary files should use isolated directories and generated names.",
    "Server-generated storage keys and metadata records make it easier to connect files to business objects and authorization rules.",
    "Generated reports, exports, thumbnails, converted documents, and cached artifacts should be written only to intended output locations.",
    "Cleanup routines should not delete paths derived from untrusted input without the same boundary checks used for reads and writes.",
    "The same design should apply across upload intake, processing workers, scanners, preview generators, exports, downloads, and deletion."
  ]
};
