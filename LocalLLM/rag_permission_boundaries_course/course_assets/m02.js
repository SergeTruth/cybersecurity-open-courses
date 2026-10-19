window.COURSE_MODULE = {
  "title": "RAG Architecture and Trust Zones",
  "graphicAlt": "Explicit ingestion, request, generation and operational zones reveal which identities and stores hold sensitive content.",
  "narration": "A RAG system is a pipeline, not a single component. Source repositories feed connectors. Connectors run ingestion jobs. Ingestion creates document records, chunks, embeddings, indexes, and metadata. At request time, an application receives user context, retrieves candidate content, assembles model context, generates an answer, and may write logs, traces, transcripts, or cache entries.\n\nEvery stage has a trust boundary. A source repository may have its own permissions. An ingestion service may run as a privileged connector. A vector index may store derived representations of sensitive content. A retriever may filter by tenant, project, classification, or document-level access. A model prompt may contain the final selected chunks. A user interface may expose citations, excerpts, exports, or summaries.\n\nSensitive information can appear in unexpected places. Embeddings can represent sensitive meaning. Intermediate prompts can contain retrieved snippets. Debug logs can capture request context. Cached responses can preserve private answers. Exported transcripts can move content outside the original repository. Architecture reviews should trace data from source to final answer and then through logs, caches, backups, and administrative tools.\n\nTrust zones should be explicit before production. Teams should know which services are trusted to read source content, which identities they use, where data is transformed, which stores retain sensitive fragments, and which controls prevent a service identity from silently bypassing user permissions. Clear trust zones make later testing and incident response much easier.",
  "narrationPoints": [
    "A RAG system is a pipeline, not a single component.",
    "Every stage has a trust boundary.",
    "Sensitive information can appear in unexpected places.",
    "Trust zones should be explicit before production."
  ]
};
