window.COURSE_MODULE = {
  "title": "Workload Patterns and Routing Needs",
  "graphicAlt": "Blank placeholder image for a lesson on local LLM workload patterns and routing decisions.",
  "narration": "Local LLM workloads vary widely. Interactive chat is latency-sensitive because a person is waiting. Coding agents may issue many sequential calls while reading files, proposing edits, and retrying. Batch summarization can tolerate longer waits but may create bursts. Document analysis stresses context length. Embedding jobs may use different models and endpoints entirely.\n\nShort requests and long-context requests create different routing needs. A quick prompt may finish in seconds. A large document prompt may spend significant time in prompt processing before generation begins. If those requests are treated as identical, one backend can become clogged with long jobs while another could have served short interactive work quickly.\n\nConcurrency turns simple user behavior into real capacity pressure. Several people may each think they are making one request, while the service sees overlapping prompt processing, token generation, and streaming connections. A coding assistant or tool-using agent may keep a backend busy for minutes. Routing should consider how much work each server can accept before queueing or rejecting new requests.\n\nSession continuity and retries also matter. Stateless clients send full context with each request and can route to any compatible backend. Other workflows rely on cache behavior, temporary state, or tool context and may need sticky sessions. Retries can improve reliability after a backend failure, but blind retries are risky when a request triggered actions or external tool use.",
  "narrationPoints": [
    "Local LLM workloads vary widely.",
    "Short requests and long-context requests create different routing needs.",
    "Concurrency turns simple user behavior into real capacity pressure.",
    "Session continuity and retries also matter."
  ]
};
