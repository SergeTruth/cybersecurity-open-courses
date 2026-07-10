window.COURSE_MODULE = {
  "title": "Why LLM Threat Modeling Matters",
  "graphicAlt": "LLM application architecture showing prompts, retrieved content, tools, data stores, and trust boundaries.",
  "narration": "LLM applications are still software systems, but they introduce design risks that traditional application diagrams often miss. They may process untrusted natural language, retrieve external content, call tools, summarize sensitive data, generate code, or make recommendations that affect business decisions.\n\nTraditional threat modeling still matters. Authentication, authorization, secrets handling, logging, data protection, and API security remain important. The difference is that LLM systems add new questions about instructions, context, model behavior, retrieved content, tool permissions, and downstream trust.\n\nA team should ask what instructions are trusted, what content is untrusted, what data the model can access, what tools it can call, and what happens if the model is manipulated, confused, or wrong. These questions turn AI risk into engineering work instead of vague anxiety.\n\nLLM threat modeling helps teams identify risks before they become production incidents. It creates a shared map of how the feature works, what could go wrong, which controls matter, and where testing or monitoring should focus.",
  "narrationPoints": [
    "LLM applications are still software systems, but they introduce design risks that traditional application diagrams often miss.",
    "Traditional threat modeling still matters.",
    "A team should ask what instructions are trusted, what content is untrusted, what data the model can access, what tools it can call, and what h...",
    "LLM threat modeling helps teams identify risks before they become production incidents."
  ]
};
