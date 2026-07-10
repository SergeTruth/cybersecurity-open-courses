window.COURSE_MODULE = {
  "title": "What Can Go Wrong?",
  "graphicAlt": "LLM connected to tools and data with permission boundaries showing possible impacts and containment controls.",
  "narration": "Prompt injection can lead to several kinds of harm. A model might reveal information it should not disclose, ignore application instructions, summarize content incorrectly, produce misleading outputs, or take unsafe actions through connected tools.\n\nThe risk increases when an LLM application has access to email, files, tickets, cloud systems, databases, code repositories, customer records, or business workflows. In those designs, model behavior can influence real actions or sensitive resources.\n\nTeams should distinguish model confusion from system impact. A strange answer may be low impact in a simple chatbot. The same behavior can be high impact if the application passes model output to tools, workflow automation, approvals, or downstream systems.\n\nThe most important question is not only whether the model can be tricked. It is what the application allows the model to do after it is tricked. Strong system design limits the damage when the model processes hostile or confusing input.",
  "narrationPoints": [
    "Prompt injection can lead to several kinds of harm.",
    "The risk increases when an LLM application has access to email, files, tickets, cloud systems, databases, code repositories, customer records,...",
    "Teams should distinguish model confusion from system impact.",
    "The most important question is not only whether the model can be tricked."
  ]
};
