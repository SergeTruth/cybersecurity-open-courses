window.COURSE_MODULE = {
  "title": "Retrieval-Time Authorization",
  "graphicAlt": "Current permissions constrain candidates before ranking, and only authorized selected evidence enters model context.",
  "narration": "Retrieval-time authorization is a core security control in permission-aware RAG. The system should filter candidates using the current caller's permissions before any retrieved text enters the model context. Once sensitive content is placed into the prompt or context window, the system has already crossed an important boundary.\n\nThe retriever should apply tenant, project, repository, document, classification, and ACL filters based on trusted request context. It should also handle deleted, deprecated, stale, or incomplete records. If a record lacks the metadata required to make a confident permission decision, deny-by-default behavior is safer than guessing. Ambiguity should lead to exclusion, not exposure.\n\nRanking should not reintroduce content that policy already excluded. In a well-designed pipeline, authorization decisions constrain the candidate set before relevance ranking selects the best allowed results. This keeps relevance from competing against policy. It also makes the system easier to reason about during review: first decide what is allowed, then decide what is useful.\n\nRetrieval logs should support investigation without leaking the content they are meant to protect. Teams may need to know which source identifiers were allowed, which policy checks applied, and why a result was excluded, but they do not always need raw chunk text in logs. Permission checks should be tested like core application logic because retrieval is the point where private source material becomes model context.",
  "narrationPoints": [
    "Retrieval-time authorization is a core security control in permission-aware RAG.",
    "The retriever should apply tenant, project, repository, document, classification, and ACL filters based on trusted request context.",
    "Ranking should not reintroduce content that policy already excluded.",
    "Retrieval logs should support investigation without leaking the content they are meant to protect."
  ]
};
