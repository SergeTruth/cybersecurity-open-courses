window.COURSE_MODULE = {
  "title": "Course Summary: Trust File Objects, Not Just Paths",
  "graphicAlt": "Safe file handling joins path provenance, trusted directories, object checks, link policy and cleanup tests.",
  "narration": "The central rule of this course is to trust file objects, not just paths. Paths are input. Directories are trust boundaries. The object actually opened or created is what the program should reason about when it reads, writes, replaces, traverses, or cleans up.\n\nUse practical review questions. Where did this path come from? Is the directory trusted? Can another actor modify entries there? Is the operation based on a path string or an opened object? Is link-following behavior intentional? Are permissions and ownership checked appropriately?\n\nCreation, replacement, temporary files, and cleanup need the same level of care. Create files safely, avoid repeated ambiguous path lookups, validate opened objects where possible, separate working files from final output, and document what traversal code does with links.\n\nFinally, keep the policy alive through tests and review. Exercise directory trust assumptions, link policy, replacement behavior, cleanup behavior, permissions, and failure paths. Symbolic-link safety comes from platform-aware contracts and maintainable file-handling design, not from one isolated function call.",
  "narrationPoints": [
    "The central rule of this course is to trust file objects, not just paths.",
    "Is the operation based on a path string or an opened object?",
    "Create files safely, avoid repeated ambiguous path lookups, validate opened objects where possible, separate working files from final output, and document what traversal code does with links.",
    "Where did this path come from?",
    "Symbolic-link safety comes from platform-aware contracts and maintainable file-handling design, not from one isolated function call."
  ]
};
