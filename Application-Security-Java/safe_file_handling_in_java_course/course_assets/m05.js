window.COURSE_MODULE = {
  "title": "Filenames, Metadata, and File Type Decisions",
  "graphicAlt": "A server-generated storage identifier is separated from an untrusted display filename, with extension, signature and structure treated as file-type evidence.",
  "narration": "Filenames are often overloaded. The same value may be used for display, storage, routing, download headers, logging, and processing decisions. Those are different purposes and should not collapse into one trusted string. A user-supplied filename is untrusted display data, not a safe storage path. Generate server-side filenames, object keys, or IDs for storage, and preserve the original filename only as metadata when the application truly needs it.\n\nOriginal filenames can contain long values, confusing Unicode, path separators, reserved names, hidden-file conventions, double extensions, control-like characters, and platform-specific surprises. Even when a framework exposes a convenient filename method, the value came from the client or another external source. Apply length limits and restrict displayed characters where appropriate. Escape or encode filenames before placing them into HTML, JSON, logs, response headers, templates, dashboards, or audit views.\n\nFile type decisions also need layered thinking. Do not trust a file extension or declared Content-Type by itself. Use allowlists for the types required by the business function, and validate with multiple signals where appropriate: extension, declared type, file signature, parser behavior, and expected structure. The depth of validation should match the risk. A public static asset workflow, a private report download, and an archive import job all have different needs.\n\nMetadata can be sensitive. Original filename, uploader, tenant ID, storage key, scan status, processing result, content type, file size, and retention state can reveal business information. Treat metadata as part of the file record, not as harmless decoration. A safe design separates storage identity, display metadata, access policy, and processing decisions so a mistake in one area does not automatically compromise the others.",
  "narrationPoints": [
    "Filenames are often overloaded.",
    "Original filenames can contain long values.",
    "File type decisions also need layered thinking.",
    "Metadata can be sensitive.",
    "Those are different purposes and should not collapse.",
    "Escape or encode filenames."
  ]
};
