window.COURSE_MODULE = {
  "title": "Private RAG and Knowledge Control",
  "graphicAlt": "Preview bullet summary visual for private RAG and knowledge control.",
  "narration": "Private retrieval-augmented generation, often called private RAG, can help AI systems answer from approved internal material. It can also create new responsibilities. Source documents must be ingested, chunked, embedded, indexed, retrieved, cited, updated, expired, and permissioned. Treating RAG as only a vector database misses the governance work that makes the knowledge trustworthy.\n\nKnowledge control starts with source ownership and provenance. Teams should know where a document came from, who owns it, when it was ingested, what version it represents, and whether it is current. Metadata matters because the AI system may retrieve fragments without the original context that humans normally use to judge authority, audience, and freshness.\n\nPermissions must survive retrieval. A user should not receive content through an AI answer that they could not access through the source system. Tenant boundaries, document-level permissions, collection-level permissions, and query-time enforcement all matter. It is not enough to protect the storage location if retrieval ignores the access rules.\n\nRAG quality also depends on lifecycle discipline. Old guidance can be retrieved as current. Chunks can lose important qualifiers. Conflicting sources can appear side by side. Sensitive documents can enter the wrong collection. A sovereign AI program needs reviewable ingestion, retrieval testing, source citations where appropriate, expiration rules, and update workflows. Retrieved text is context and evidence; it should not be treated as unlimited authority over policy, law, or operational judgment.",
  "narrationPoints": [
    "Private retrieval-augmented generation, often called private RAG, can help AI systems answer from approved internal material.",
    "Knowledge control starts with source ownership and provenance.",
    "Permissions must survive retrieval.",
    "RAG quality also depends on lifecycle discipline."
  ]
};
