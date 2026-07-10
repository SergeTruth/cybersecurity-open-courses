window.COURSE_MODULE = {
  "title": "What Private RAG Architecture Solves",
  "graphicAlt": "Draft visual summary for What Private RAG Architecture Solves",
  "narration": "Private retrieval-augmented generation is an architecture pattern for grounding AI responses in controlled source material. Instead of relying only on what a model already learned during training, the system retrieves documents, policies, procedures, tickets, product notes, code guidance, or other approved knowledge and provides that material as context for the answer.\n\nThe private part adds requirements that a simple demonstration may ignore. A demo can upload a few files and return a plausible response. A production private RAG system has to preserve source ownership, classification, ingestion date, access rules, tenant boundaries, freshness, citations, logging, deletion expectations, and operational support.\n\nRAG does not make information automatically correct or automatically authorized. Retrieved material is evidence for the model to consider, not an unlimited source of authority. The architecture still needs rules about which source wins when guidance conflicts, how stale material is handled, and when the system should decline to answer or ask for review.\n\nGood private RAG design makes source visibility part of the user experience and the operating model. Users and reviewers should be able to understand where an answer came from, why those sources were selected, and whether the content is current enough for the task.\n\nThe value of private RAG is not just better answers. It is accountable answers. The system is strongest when retrieval, permissions, provenance, and lifecycle controls are designed together so users can trust the answer and the boundary behind it.",
  "narrationPoints": [
    "Private retrieval-augmented generation is an architecture pattern for grounding AI responses in controlled source material.",
    "The private part adds requirements that a simple demonstration may ignore.",
    "RAG does not make information automatically correct or automatically authorized.",
    "Good private RAG design makes source visibility part of the user experience and the operating model.",
    "The value of private RAG is not just better answers."
  ]
};
