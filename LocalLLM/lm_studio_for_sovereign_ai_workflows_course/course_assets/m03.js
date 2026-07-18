window.COURSE_MODULE = {
  "title": "Choosing Models for Local Workloads",
  "graphicAlt": "Draft visual summary for Choosing Models for Local Workloads",
  "narration": "The best local model is not universal. Model choice should follow the task, the data sensitivity, the hardware available, the expected output format, and the level of review required. A model that is strong for brainstorming may not be the best choice for structured extraction, code assistance, or careful policy drafting.\n\nHardware fit is central. Local model performance depends on available memory, accelerator support where present, CPU speed, storage performance, and context length. If the model does not fit the machine well, the user experience may be slow, unstable, or too constrained for the workflow.\n\nQuantized models can make local use more practical by reducing memory needs. That tradeoff may change speed, output quality, or reasoning behavior. The right question is not whether quantization is good or bad. The question is whether the model configuration meets the workflow's quality and reliability needs.\n\nSmaller models can be excellent for drafts, routing, simple transformations, study help, and routine assistance. Larger models may help with deeper reasoning or more complex synthesis when the local hardware supports them. Either way, the model should earn trust through testing.\n\nEvaluation should use the learner's own prompt sets. Try representative requests, compare outputs, note failures, and choose based on evidence. A local AI workflow is strongest when model selection is based on actual use, not reputation alone. Keep notes about why a model was accepted, rejected, or reserved for a narrow task.",
  "narrationPoints": [
    "The best local model is not universal.",
    "Hardware fit is central.",
    "Quantized models can make local use more practical by reducing memory needs.",
    "Smaller models can be excellent for drafts, routing, simple transformations, study help, and routine assistance.",
    "Evaluation should use the learner's own prompt sets."
  ]
};
