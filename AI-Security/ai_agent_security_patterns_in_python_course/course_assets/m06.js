window.COURSE_MODULE = {
  "title": "Memory, Retrieval, and Data Handling",
  "graphicAlt": "Illustration for a lesson on memory, retrieval, and data handling in agent systems.",
  "narration": "Memory and retrieval give agents continuity, but they also create hidden data stores if not governed deliberately. Conversation memory, long-term memory, user preferences, retrieved documents, embeddings, vector stores, temporary context, prompt logs, summaries, and tool results can all contain sensitive data. These stores may influence future behavior even after the original task has ended. Security teams should treat them as application data, not as harmless model scaffolding.\n\nData classification should apply to prompts, memories, embeddings, summaries, and retrieved content. Personal data, customer data, secrets, source code, regulated information, and business-sensitive context need access controls, retention decisions, and deletion paths. Summaries can be sensitive too. A summary may omit exact text while still preserving confidential facts, relationships, decisions, or identifiers that should not persist beyond the task.\n\nAccess-controlled retrieval must preserve authorization and tenant separation from ingestion through response generation. If a user cannot access a document through the source system, the agent should not expose the content through retrieval, memory, or answer synthesis. Metadata such as tenant, organization, source, owner, classification, timestamp, and deletion status helps the retrieval layer make correct decisions before content enters the model context.\n\nMemory should also handle staleness and conflict. A user preference may change. A document may be replaced. A prior conversation may include a mistaken assumption. A vector store may retain content after the source changed. Secure agents need retention and refresh rules, mechanisms to remove or correct memory, and user-visible ways to understand what the agent is relying on. Useful memory is bounded, governed, and reviewable.",
  "narrationPoints": [
    "Memory and retrieval give agents continuity.",
    "Data classification should apply to prompts.",
    "Access-controlled retrieval must preserve authorization.",
    "Memory should also handle staleness and conflict.",
    "Security teams should treat them as application data.",
    "A summary may omit exact text."
  ]
};
