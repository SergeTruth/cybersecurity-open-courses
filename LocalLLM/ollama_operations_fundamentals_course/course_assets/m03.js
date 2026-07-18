window.COURSE_MODULE = {
  "title": "Model Management and Storage Planning",
  "graphicAlt": "Preview bullet summary visual for model management and storage planning.",
  "narration": "Models should be managed as operational assets, not random files that accumulate over time. Names and tags help identify what is being used, but they are not a complete inventory. Teams still need documentation that explains which models are required, which are experimental, which are approved for shared use, which are deprecated, and which can be removed safely.\n\nStorage planning matters because model files can be large. A quick experiment may consume meaningful disk space, and several experiments can fill a workstation or shared server faster than expected. When storage runs out, model pulls can fail, applications can break, logs may stop writing, and operators may waste time figuring out which files are safe to delete.\n\nPulling a model for a personal test is different from approving a model for a team workflow. Shared use should include basic review: why the model is needed, what hardware it requires, what license or usage expectations apply, who owns it, and how it will be updated or retired. That review does not need to be heavy, but it should be visible.\n\nGood inventory discipline prevents confusion across machines. Operators should know where models are stored, how much space they consume, which hosts need which models, and what cleanup routine exists. Storage planning turns local AI from a collection of one-off downloads into a manageable environment.",
  "narrationPoints": [
    "Models should be managed as operational assets, not random files that accumulate over time.",
    "Storage planning matters because model files can be large.",
    "Pulling a model for a personal test is different from approving a model for a team workflow.",
    "Good inventory discipline prevents confusion across machines."
  ]
};
