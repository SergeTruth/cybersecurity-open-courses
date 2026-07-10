window.COURSE_MODULE = {
  "title": "Why Prompt Injection Matters",
  "graphicAlt": "Trusted instructions and untrusted content entering an LLM application context with trust boundaries marked.",
  "narration": "Large language model applications often combine user input, system instructions, retrieved documents, tool outputs, and application logic. That mix creates a trust-boundary problem that traditional web application diagrams may not show clearly.\n\nNatural language is not just content for the model to summarize. It can also look like instructions. If an attacker can place instructions where the model will read them, the model may follow directions that conflict with the developer's intent.\n\nPrompt injection matters because it can influence model behavior, expose sensitive information, produce unsafe outputs, or cause connected tools to act in unintended ways. The business impact depends on what the application allows the model to see and do.\n\nThis is not magic, and it is not only a model problem. It is a system design problem. Teams need to understand where trusted instructions, untrusted content, model output, tools, data, and user approval meet.",
  "narrationPoints": [
    "Large language model applications often combine user input, system instructions, retrieved documents, tool outputs, and application logic.",
    "Natural language is not just content for the model to summarize.",
    "Prompt injection matters because it can influence model behavior, expose sensitive information, produce unsafe outputs, or cause connected too...",
    "This is not magic, and it is not only a model problem."
  ]
};
