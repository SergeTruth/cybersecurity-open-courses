window.COURSE_MODULE = {
  "title": "Course Summary: Permission-Aware RAG",
  "graphicAlt": "Permission-aware RAG preserves access metadata, verifies callers, authorizes before context assembly and reviews outputs, copies and negative tests.",
  "narration": "Permission-aware RAG is a full-system design practice. It begins with classifying source data and understanding who is allowed to use it. Ingestion should capture origin, owner, tenant, classification, ACLs, lifecycle state, update time, and deletion status. Chunking and indexing should preserve those references so searchable records do not lose their permission context.\n\nAt request time, the system needs trusted identity, tenant, role, group, project, and service context. Retrieval should authorize candidates before any source text enters the model context. Deny-by-default behavior protects records with missing or ambiguous metadata. Ranking should work only within the set of allowed candidates, never as a way around policy.\n\nGeneration-time controls should preserve the same boundary. Retrieved content is evidence, not a policy override. Responses should summarize or cite only sources the user may access, handle conflicting sources carefully, and avoid exposing sensitive fragments through formatting, citations, exports, or logs. Tenant isolation should cover indexes, caches, prompts, transcripts, admin tools, analytics, and backups.\n\nDurable safety comes from repeatable engineering and operations: test realistic users, revoked access, stale indexes, deleted documents, missing metadata, and cross-tenant cases. Audit enough context to investigate decisions without over-collecting sensitive text. Review the system as data, policies, users, and source repositories change.",
  "narrationPoints": [
    "Permission-aware RAG is a full-system design practice.",
    "At request time, the system needs trusted identity, tenant, role, group, project, and service context.",
    "Generation-time controls should preserve the same boundary.",
    "Durable safety comes from repeatable engineering and operations: test realistic users, revoked access, stale indexes, deleted documents, missing..."
  ]
};
