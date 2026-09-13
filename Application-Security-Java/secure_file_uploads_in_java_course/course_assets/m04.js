window.COURSE_MODULE = {
  "title": "File Type Validation and Filename Safety",
  "graphicAlt": "Original names and declared types are only clues; signature and structure checks support an allowlist, while generated storage identifiers are separate from encoded display filenames.",
  "narration": "File validation is about reducing ambiguity. Do not trust the Content-Type header by itself because clients can control or spoof it. Do not trust a file extension by itself because extensions can be missing, misleading, doubled, or chosen to bypass a weak check. A filename ending in .jpg does not prove the content is a safe image, and a browser-provided MIME type does not prove the content is what the business expects.\n\nUse allowlists for the extensions and file types required by the specific business function. Then validate using multiple signals where appropriate: extension, declared type, file signature, parser behavior, size expectations, and content expectations. The depth of inspection should match the risk. A profile image workflow might verify image structure and dimensions. A document upload workflow might require stricter scanning and processing controls. Validation reduces risk, but it should not become an excuse to accept every file type.\n\nOriginal filenames from MultipartFile, Part, or similar APIs are untrusted client-supplied metadata. They may contain confusing Unicode characters, double extensions, reserved names, path separators, very long values, hidden-file patterns, control-like characters, or platform-specific surprises. Do not use the original name as a filesystem path or object storage key. Generate a server-side storage name or object key, and store the original filename only as metadata when the application needs to display it.\n\nDisplayed filenames still need care. Set length limits, restrict characters where appropriate, and escape or encode filenames before placing them in HTML, JSON, logs, headers, templates, or audit views. Preserve user-friendly names only as untrusted display text. The safest pattern is to separate user-facing metadata from storage identity: the user may see a cleaned original name, while the system stores and retrieves the object through a generated identifier.",
  "narrationPoints": [
    "File validation is about reducing ambiguity.",
    "Use allowlists for the extensions and file types required.",
    "Original filenames from MultipartFile.",
    "Displayed filenames still need care.",
    "Do not trust a file extension by itself.",
    "Then validate using multiple signals."
  ]
};
