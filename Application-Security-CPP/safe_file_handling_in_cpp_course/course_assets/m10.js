window.COURSE_MODULE = {
  "title": "Course Summary: A Safe File Handling Roadmap",
  "graphicAlt": "File-handling roadmap from trusted storage roots and validated relative names through descriptor-based opening, metadata checks, bounded parsing, atomic replacement, private temporary storage, RAII cleanup, and adversarial regression testing.",
  "narration": "Safe file handling is a roadmap, not a single library call. Start by treating paths as input. Define allowed locations for reading, writing, temporary files, and output replacement. Centralize that policy so callers do not invent local string checks. Validate paths and file contents separately because they answer different safety questions.\n\nOpen files with the narrowest mode that fits the operation. Read defensively with size limits, streaming when appropriate, and clear text or binary expectations. Parse structure before trusting meaning, and pass only validated data into business logic. When writing, plan for partial failure, intentional truncation, careful permissions, and late errors during flush or close.\n\nTemporary files should be created with race-resistant patterns and cleaned up through a clear lifecycle. Symlinks, metadata, permissions, and platform differences should be documented instead of treated as invisible details. RAII should carry routine cleanup, while error handling preserves invariants and avoids leaking sensitive information.\n\nFinally, make file safety reviewable. Log with restraint. Test missing, malformed, large, restricted, and platform-specific cases. Ask who controls each path and file. Ask what happens on failure. Good file handling is durable because its assumptions are visible, narrow, and continuously checked.",
  "narrationPoints": [
    "Validate paths and file contents separately because they answer different safety questions.",
    "Safe file handling is a roadmap, not a single library call.",
    "Read defensively with size limits, streaming when appropriate, and clear text or binary expectations.",
    "When writing, plan for partial failure, intentional truncation, careful permissions, and late errors during flush or close.",
    "RAII should carry routine cleanup, while error handling preserves invariants and avoids leaking sensitive information.",
    "Good file handling is durable because its assumptions are visible, narrow, and continuously checked."
  ]
};
