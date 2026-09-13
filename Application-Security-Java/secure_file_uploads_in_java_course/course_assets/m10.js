window.COURSE_MODULE = {
  "title": "Course Summary and Practical Checklist",
  "graphicAlt": "A secure upload lifecycle combines defined use cases, bounded intake, content validation, storage isolation, safe processing, retrieval authorization, monitoring and cleanup.",
  "narration": "Secure Java upload handling starts with defining allowed use cases before accepting files. Identify who can upload, what file types are allowed, why the files are needed, how large they can be, where they are stored, how long they are retained, who can retrieve them, and what processing is required. Require appropriate authentication and authorization for both uploads and downloads. Treat file upload as a formal security boundary, not a convenience endpoint.\n\nConfigure multipart handling with explicit limits for file size, request size, part count, memory threshold, temporary location, timeouts, and rate. Validate file type with allowlists and multiple signals where appropriate. Generate server-side storage names and treat original filenames as untrusted metadata. Store files outside executable, classpath, deployment, source, and public web-root locations unless public access is the explicit design and the controls support it.\n\nUse quarantine, scanning, and isolated processing for higher-risk files. Process untrusted content with least privilege, timeouts, resource limits, constrained temporary directories, and safe failure behavior. Apply object-level authorization to downloads, previews, signed URLs, and metadata. Protect upload systems with quotas, rate limits, cleanup jobs, monitoring, safe error responses, and operational ownership.\n\nA practical first-week plan is clear: inventory upload endpoints, confirm allowed types and sizes, review multipart limits, check storage paths, verify generated filenames, add download authorization checks, review logging for sensitive data, test scanner failure paths, and document the response path for suspicious or exposed files. Then build upload review into pull requests, tests, CI/CD, deployment review, and incident response so the controls stay current as the feature grows.",
  "narrationPoints": [
    "Secure Java upload handling starts with defining allowed.",
    "Configure multipart handling with explicit limits for file.",
    "Use quarantine, scanning, and isolated processing.",
    "A practical first-week plan is clear: inventory upload.",
    "Validate file type with allowlists and multiple signals.",
    "Protect upload systems with quotas."
  ]
};
