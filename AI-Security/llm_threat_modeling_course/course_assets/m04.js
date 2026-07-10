window.COURSE_MODULE = {
  "title": "Identify AI-Specific Threats",
  "graphicAlt": "Threats mapped to controls, including prompt injection, data disclosure, unsafe tool use, retrieval poisoning, memory poisoning, and output handling.",
  "narration": "LLM systems face both traditional and AI-specific threats. Traditional risks include broken access control, insecure APIs, secrets exposure, injection, misconfiguration, weak monitoring, and poor logging.\n\nAI-specific or AI-amplified risks include prompt injection, indirect prompt injection, sensitive data disclosure, insecure output handling, excessive agency, model manipulation, retrieval poisoning, memory poisoning, hallucination-driven decisions, unsafe tool use, and overreliance on model output.\n\nThe point is not to paste a generic top-ten list into a document. The point is to ask how these risks could appear in the actual system. A document summarizer, coding assistant, customer support agent, and procurement workflow may all have different assets, boundaries, and failure modes.\n\nGood threat modeling keeps the examples conceptual and defensive. The team names the risky pattern, identifies the affected workflow, estimates impact, and decides what controls or tests should reduce the risk.",
  "narrationPoints": [
    "LLM systems face both traditional and AI-specific threats.",
    "AI-specific or AI-amplified risks include prompt injection, indirect prompt injection, sensitive data disclosure, insecure output handling, ex...",
    "The point is not to paste a generic top-ten list into a document.",
    "Good threat modeling keeps the examples conceptual and defensive."
  ]
};
