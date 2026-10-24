window.COURSE_MODULE = {
  "title": "Traversal, Cleanup, and Recursive Operations",
  "graphicAlt": "An explicit traversal policy keeps recursive cleanup within its trusted tree.",
  "narration": "Directory traversal, cleanup, backup, log rotation, import, export, and recursive operations all need a symbolic-link policy. The code should define whether links are followed, ignored, reported, copied as link objects, or restricted by directory policy.\n\nRecursive operations can easily cross the intended boundary if link behavior is unclear. A cleanup routine meant to remove files under one tree should preserve that tree's boundary. A backup routine should know whether it captures link objects or the objects they reference. A log rotation job should know what kind of entry it is rotating.\n\nThe policy should be documented before processing file trees. If a tool follows links in one mode but not another, tests and usage documentation should make that distinction clear. Hidden traversal behavior becomes hard to review and hard to operate safely.\n\nCleanup deserves special attention because it modifies or removes filesystem entries. The program should know whether it is deleting a link object, a file object, or a directory entry inside a trusted tree. It should avoid relying on ambiguous path state during recursive removal.\n\nReviewers should trace traversal decisions from input path to directory entry handling, recursive descent, final operation, error handling, and cleanup. That makes it clear whether the operation remains inside the intended scope.",
  "narrationPoints": [
    "The code should define whether links are followed, ignored, reported, copied as link objects, or restricted by directory policy.",
    "Recursive operations can easily cross the intended boundary if link behavior is unclear.",
    "Hidden traversal behavior becomes hard to review and hard to operate safely.",
    "The program should know whether it is deleting a link object, a file object, or a directory entry inside a trusted tree.",
    "Reviewers should trace traversal decisions from input path to directory entry handling, recursive descent, final operation, error handling, and cleanup."
  ]
};
