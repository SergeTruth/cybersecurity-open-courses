window.COURSE_MODULE = {
  "title": "Map the LLM System",
  "graphicAlt": "System map showing users, application logic, prompts, retrieval, vector storage, model provider, tools, logs, memory, and downstream systems.",
  "narration": "A good LLM threat model starts with a system map. If the diagram is vague, the threat model will be vague too. The team needs enough detail to see where data moves, where decisions happen, and where trust changes.\n\nCommon components include users, the application front end, orchestration logic, system prompts, user prompts, retrieved documents, embeddings, vector databases, plugins or tools, APIs, model providers, logs, memory, and downstream systems.\n\nData may flow from users into prompts, from documents into retrieval systems, from model outputs into tools, and from tools back into the model. The system may also write logs, store conversation history, cache embeddings, or send events to monitoring tools.\n\nEach crossing between users, applications, models, tools, and data stores may create a trust boundary. Marking those boundaries helps the team decide where validation, authorization, isolation, approval, monitoring, and data minimization should be applied.",
  "narrationPoints": [
    "A good LLM threat model starts with a system map.",
    "Common components include users, the application front end, orchestration logic, system prompts, user prompts, retrieved documents, embeddings...",
    "Data may flow from users into prompts, from documents into retrieval systems, from model outputs into tools, and from tools back into the model.",
    "Each crossing between users, applications, models, tools, and data stores may create a trust boundary."
  ]
};
