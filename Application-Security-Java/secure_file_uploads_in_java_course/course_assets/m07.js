window.COURSE_MODULE = {
  "title": "Access Control, Downloads, and Metadata Protection",
  "graphicAlt": "Private-file retrieval requires object-level user and tenant authorization for downloads, previews, metadata and scoped time-limited URLs, separate from upload permission.",
  "narration": "File security does not end when the upload succeeds. Upload authorization and download authorization are separate decisions. A user who can upload a document for one case, tenant, or account should not automatically be able to download every file in storage. Before serving a file, generating a signed URL, creating a preview, or exposing metadata, the application should enforce object-level authorization against the business model.\n\nAvoid predictable public URLs for private files. Storage keys, object identifiers, and signed URLs need careful control because they can become access paths. A signed URL may be appropriate for a short-lived private download, but it should be scoped, time-limited, and generated only after authorization. A public bucket or web root may be appropriate for truly public assets, but it is usually a poor default for customer documents, support attachments, tax forms, resumes, or internal imports.\n\nMetadata can be sensitive too. Original filename, uploader identity, upload time, file size, content type, scan status, tenant ID, storage key, processing result, and retention state can reveal business information. Metadata endpoints and previews should follow the same authorization model as downloads. Do not reflect untrusted filenames into headers, HTML, templates, logs, or JSON responses without proper handling.\n\nDownload responses should use appropriate headers for the use case, including safe content disposition and content type behavior where relevant. The application should avoid surprising inline rendering of untrusted content when download is safer. File deletion, ownership transfer, sharing, export, preview generation, and retention should follow explicit authorization rules. Retrieval is often where sensitive data exposure occurs, so treat it as a first-class part of upload security.",
  "narrationPoints": [
    "File security does not end when the upload succeeds.",
    "Avoid predictable public URLs for private files.",
    "Metadata can be sensitive too.",
    "Download responses should use appropriate headers.",
    "A signed URL may be appropriate for a short-lived private.",
    "Metadata endpoints and previews should follow the same."
  ]
};
