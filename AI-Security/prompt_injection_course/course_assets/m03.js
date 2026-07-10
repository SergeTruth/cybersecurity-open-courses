window.COURSE_MODULE = {
  "title": "Direct vs. Indirect Prompt Injection",
  "graphicAlt": "Comparison of direct user-entered prompt injection and indirect prompt injection hidden in external content.",
  "narration": "Direct prompt injection happens when a user directly enters instructions intended to override or manipulate the application's behavior. The input comes from the user interaction itself.\n\nIndirect prompt injection happens when malicious or manipulative instructions are hidden in content the model later processes, such as a web page, email, ticket, document, repository file, or retrieved knowledge base entry.\n\nIndirect injection is especially dangerous because the person using the AI system may not see the instruction. The model may treat untrusted external content as valid guidance unless the surrounding application clearly limits how that content can influence behavior.\n\nThe risk becomes more serious when the LLM can call tools, read sensitive data, send messages, update tickets, inspect repositories, or modify systems. The issue is not only whether the model can be influenced, but what capabilities are reachable after influence occurs.",
  "narrationPoints": [
    "Direct prompt injection happens when a user directly enters instructions intended to override or manipulate the application's behavior.",
    "Indirect prompt injection happens when malicious or manipulative instructions are hidden in content the model later processes, such as a web p...",
    "Indirect injection is especially dangerous because the person using the AI system may not see the instruction.",
    "The risk becomes more serious when the LLM can call tools, read sensitive data, send messages, update tickets, inspect repositories, or modify..."
  ]
};
