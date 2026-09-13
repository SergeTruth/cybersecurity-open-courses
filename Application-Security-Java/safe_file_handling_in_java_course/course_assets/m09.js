window.COURSE_MODULE = {
  "title": "Serving Downloads, Testing, Logging, and Review",
  "graphicAlt": "An authorized private download and safe response are paired with denial tests and minimal event logging; sensitive values are excluded before storage.",
  "narration": "Serving a file is an authorization decision, not just a filesystem operation. Verify object-level authorization before serving private files, previews, exports, reports, attachments, or generated documents. Public static files and private downloads should use separate storage and routing patterns. Avoid predictable public URLs for private files. A download route should know which business object is being served and why this caller is allowed to receive it.\n\nResponse behavior matters. Headers should handle content type, content disposition, caching, and sniffing behavior appropriately for the use case. Avoid reflecting untrusted filenames into headers, HTML, templates, logs, or JSON without proper handling. Error responses should not reveal internal paths, storage keys, stack traces, server paths, bucket details, or sensitive metadata. Safe responses tell the caller what they need to know without teaching them about the storage layout.\n\nTests should cover allowed files, rejected paths, boundary enforcement, unauthorized access, large files, cleanup paths, failed operations, archive extraction boundaries, and concurrent behavior where relevant. Include tests for traversal and authorization boundaries, not just happy-path reads and writes. Pull request review should ask where files can be read from, where files can be written, who can retrieve them, how limits are enforced, and what happens when something fails.\n\nLogging should capture useful events such as file created, read, served, rejected, deleted, expired, quarantined, or failed. Logs should not expose file contents, secrets, tokens, full sensitive paths, authorization headers, cookies, private signed URLs, storage credentials, internal server paths, or unnecessary personal data. Safe file handling should be visible in tests, logs, dashboards, runbooks, and incident response, but without turning operational evidence into a new exposure path.",
  "narrationPoints": [
    "Serving a file is an authorization decision.",
    "Response behavior matters.",
    "Tests should cover allowed files.",
    "Logging should capture useful events.",
    "Verify object-level authorization.",
    "Public static files and private downloads should use."
  ]
};
