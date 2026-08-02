window.COURSE_MODULE = {
  "title": "What Safe File Handling Means",
  "graphicAlt": "Diagram for What Safe File Handling Means, showing upload stream, quarantine directory, content validator, private storage, authorization gate, and download response; labeled arrows identify file lifecycle and isolation controls and the point where unsafe input or behavior is rejected.",
  "narration": "Safe file handling is the discipline of controlling how Python applications receive, name, store, read, write, process, serve, and delete files. That includes web uploads, API attachments, command-line scripts, data pipelines, automation jobs, background workers, and internal tools. A file operation may look simple in code, but it can affect confidentiality, integrity, availability, auditability, and user trust.\n\nFile handling is security-sensitive because files carry more than bytes. A filename may influence storage decisions. A path may cross a directory boundary. Metadata may reveal private information. Permissions may expose data to the wrong process. File contents may be parsed by complex libraries. Downstream processing may transform, index, preview, scan, export, or serve the file in a different trust context.\n\nIt helps to distinguish filenames, paths, file contents, metadata, permissions, storage locations, and downstream processing. A filename is a label, not proof of safety. A path is an instruction about location, not merely text. Content type and extension are hints, not guarantees. Storage location controls who can reach the file. Processing determines what the application later does with the content.\n\nFiles often cross trust boundaries. A user upload moves from an untrusted client into server-side storage. A scheduled job may process files dropped by another team. A data pipeline may parse documents from a partner system. Safe file handling is therefore part of application design, not only input validation. The goal is to make file operations explicit, bounded, authorized, observable, and maintainable.",
  "narrationPoints": [
    "Safe file handling is the discipline of controlling how Python applications receive, name, store, read, write, process, serve, and delete files.",
    "File contents may be parsed by complex libraries.",
    "Content type and extension are hints, not guarantees.",
    "A user upload moves from an untrusted client into server-side storage.",
    "The goal is to make file operations explicit, bounded, authorized, observable, and maintainable.",
    "Files often cross trust boundaries."
  ]
};
