window.COURSE_MODULE = {
  "title": "Testing the Model, Application, and Integrations",
  "graphicAlt": "Assessment covers model behavior, application controls and integrations, tracing how a possible failure may cross layers and affect real systems.",
  "narration": "AI red teaming may examine multiple layers. Model-level testing evaluates behavior such as unsafe responses, hallucinations, refusal consistency, bias-related concerns, or other response quality issues within the agreed assessment scope.\n\nApplication-level testing evaluates prompts, user workflows, guardrails, retrieval behavior, input handling, output handling, user experience, and how the product frames model uncertainty. This layer is where model output meets product design.\n\nIntegration testing examines tools, APIs, plugins, permissions, data access, monitoring, logging, and downstream actions. Integration design often determines whether a model failure remains low impact or turns into a meaningful system risk.\n\nEffective assessments look for how failures move from one layer into another. A finding is stronger when it explains which layer failed, how other layers responded, and what control would reduce the risk.",
  "narrationPoints": [
    "AI red teaming may examine multiple layers.",
    "Application-level testing evaluates prompts, user workflows, guardrails, retrieval behavior, input handling, output handling, user experience,...",
    "Integration testing examines tools, APIs, plugins, permissions, data access, monitoring, logging, and downstream actions.",
    "Effective assessments look for how failures move from one layer into another."
  ]
};
