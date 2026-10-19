window.COURSE_MODULE = {
  "title": "RAG Permission Boundary Foundations",
  "graphicAlt": "Source access context follows the pipeline and authorized evidence reaches the model while retained copies remain governed.",
  "narration": "Retrieval-augmented generation, or RAG, helps an AI system answer from source material instead of relying only on the model's trained knowledge. That source material may be documents, tickets, messages, wiki pages, contracts, support cases, or records from internal systems. The value is clear: users can ask natural language questions and receive answers grounded in organizational knowledge.\n\nThe permission challenge is just as important. A user may be allowed to ask a question, but not allowed to see every document that could answer it. If retrieval ignores permissions, the model can receive content the user should never have accessed. The model is not always the original source of the exposure. The exposure can come from ingestion, metadata loss, index design, retrieval filtering, prompt construction, logs, caches, or output formatting.\n\nPermission-aware RAG treats retrieved content as evidence, not unrestricted authority. The system should preserve access boundaries from the source repository through ingestion, chunking, indexing, retrieval, generation, and final response. It should also preserve enough context for operations teams to audit what happened later.\n\nThis course focuses on defensive design. The goal is to build RAG systems where identity, metadata, indexing, retrieval, generation, logging, testing, and governance work together. A safe system is not created by a prompt alone. It is created by a full pipeline that respects permissions at every stage.",
  "narrationPoints": [
    "Retrieval-augmented generation, or RAG, helps an AI system answer from source material instead of relying only on the model's trained knowledge.",
    "The permission challenge is just as important.",
    "Permission-aware RAG treats retrieved content as evidence, not unrestricted authority.",
    "This course focuses on defensive design."
  ]
};
