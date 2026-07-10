window.COURSE_MODULE = {
  "title": "Course Summary: Private RAG Architecture Habits",
  "graphicAlt": "Draft visual summary for Course Summary: Private RAG Architecture Habits",
  "narration": "Private RAG architecture starts with source control and ends with governed operation. The system should preserve document boundaries during ingestion, keep chunks attached to metadata and provenance, and maintain lifecycle status so old, restricted, or tenant-specific content does not become anonymous text.\n\nPermissions must follow the user and workflow into retrieval. A private RAG system should filter by identity, tenant, document access, source eligibility, and application context before evidence reaches the model. Retrieved content should remain separate from trusted instructions and should be treated as evidence rather than authority.\n\nQuality control is ongoing. Teams should evaluate retrieval, groundedness, citations, freshness, no-answer behavior, and user feedback. Logs can improve operations, but they also need redaction, retention limits, and access controls because prompts and responses may contain sensitive material.\n\nFinally, operate the system over time. Plan refresh, deletion, backups, versioning, rollback, and incident response. A private RAG system succeeds when users can trust not only the answer, but also the source, permission boundary, and operational process behind it.\n\nThe practical habit is to design for review from the beginning. If a team can explain the source, access decision, retrieval path, answer evidence, and maintenance plan, the RAG system is much easier to improve safely.",
  "narrationPoints": [
    "Private RAG architecture starts with source control and ends with governed operation.",
    "Permissions must follow the user and workflow into retrieval.",
    "Quality control is ongoing.",
    "Finally, operate the system over time.",
    "The practical habit is to design for review from the beginning."
  ]
};
