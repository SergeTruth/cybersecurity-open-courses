window.COURSE_MODULE = {
  "title": "File Descriptors, Handles, and I/O Redirection",
  "graphicAlt": "Only intended handles and standard streams cross the launch boundary, with unused ends closed.",
  "narration": "Open file descriptors and handles are part of the launch context. A child may inherit access to files, sockets, pipes, logs, temporary files, or other resources if the parent does not control inheritance. That access can affect confidentiality, integrity, cleanup, and resource lifetime.\n\nChildren should inherit only the resources they need. Standard input, output, and error should be set deliberately. A helper may need a pipe for input, a pipe for output, a log destination, or no inherited standard input at all. Leaving streams unspecified can make behavior depend on the launcher environment.\n\nClose-on-exec or non-inheritable handle behavior helps reduce accidental leakage where the platform supports it. The important design point is that inheritable resources should be opt-in and reviewable, not incidental side effects of whatever the parent had open.\n\nPipes and logs need cleanup plans. The parent should close unused ends, read or drain output according to the workflow, handle errors, and avoid leaving descriptors open longer than needed. Incorrect pipe handling can cause hangs, missing output, or resource leaks.\n\nOpen files and sockets may carry sensitive access. A child with an inherited descriptor may not need to know a path or credentials to use the resource. That is why descriptor inheritance should be reviewed alongside identity, permissions, and the child's role.\n\nI/O redirection should be explicit. Reviewers should be able to see where child input comes from, where output goes, whether errors are captured, and how those streams are cleaned up on success, failure, and timeout.",
  "narrationPoints": [
    "Open file descriptors and handles are part of the launch context.",
    "Standard input, output, and error should be set deliberately.",
    "Incorrect pipe handling can cause hangs, missing output, or resource leaks.",
    "A child with an inherited descriptor may not need to know a path or credentials to use the resource.",
    "Reviewers should be able to see where child input comes from, where output goes, whether errors are captured, and how those streams are cleaned up on success, failure, and timeout."
  ]
};
