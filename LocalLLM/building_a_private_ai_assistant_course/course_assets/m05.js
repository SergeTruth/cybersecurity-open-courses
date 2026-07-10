window.COURSE_MODULE = {
  "title": "Private Knowledge and Retrieval",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "A private knowledge base may contain local documents, notes, PDFs, markdown, policies, internal guides, code, or other approved sources. Ingestion should preserve ownership, classification, version, date, and access rules.\n\nRetrieval-augmented generation, or RAG, selects relevant source passages and places them in the model's context. It does not retrain the model or guarantee that the answer follows the sources.\n\nEmbeddings represent text for similarity search. Chunk size, overlap, metadata, document structure, embedding model, query wording, and retrieval count affect what is found. A vector database is not an authority by itself.\n\nGrounded answers should cite source context close enough for users to verify. Preserve document title, section, page or anchor, version, and access path. The interface should distinguish retrieved text from model interpretation.\n\nRespect source permissions during indexing and retrieval. A user should not receive a passage merely because it exists in the shared index. Apply document-level or chunk-level authorization where the use case requires it.\n\nEvaluate retrieval separately from generation. Ask whether the correct passage was found, whether irrelevant text entered context, and whether the answer accurately reflected the source. Review stale documents, duplicates, conflicting versions, and deletion.\n\nRetrieved content is untrusted input. Documents may contain instructions that conflict with system policy or attempt to redirect tools. Separate source text from control instructions and constrain any actions that follow retrieval.",
  "narrationPoints": [
    "A private knowledge base may contain local documents, notes, PDFs, markdown, policies, internal guides, code, or other approved sources.",
    "Retrieval-augmented generation, or RAG, selects relevant source passages and places them in the model's context.",
    "Embeddings represent text for similarity search.",
    "Grounded answers should cite source context close enough for users to verify.",
    "Respect source permissions during indexing and retrieval.",
    "Evaluate retrieval separately from generation."
  ]
};
