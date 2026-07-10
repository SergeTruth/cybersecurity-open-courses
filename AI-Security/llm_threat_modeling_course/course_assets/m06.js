window.COURSE_MODULE = {
  "title": "Select Controls and Mitigations",
  "graphicAlt": "Layered LLM controls including least privilege, instruction separation, validation, approval, logging, monitoring, testing, and fallback behavior.",
  "narration": "LLM threat modeling should lead to controls. A useful model is one that changes the design, test plan, monitoring plan, or operating process in a practical way.\n\nUseful mitigations may include access control, least privilege for tools, separation of trusted instructions from untrusted content, input filtering, output validation, retrieval safeguards, human approval for sensitive actions, secure secret handling, rate limits, monitoring, logging, red teaming, user warnings, and fallback behavior.\n\nPrompt wording may help guide behavior, but it should not be the only security boundary. The surrounding application should limit what the model can access, what actions it can trigger, and what outputs downstream systems are allowed to trust.\n\nLayered controls are stronger because they assume some defenses may fail. Authorization should still be enforced outside the model. Tool permissions should be scoped. Outputs should be validated before use. Sensitive actions should have review, logging, and rollback paths.",
  "narrationPoints": [
    "LLM threat modeling should lead to controls.",
    "Useful mitigations may include access control, least privilege for tools, separation of trusted instructions from untrusted content, input fil...",
    "Prompt wording may help guide behavior, but it should not be the only security boundary.",
    "Layered controls are stronger because they assume some defenses may fail."
  ]
};
