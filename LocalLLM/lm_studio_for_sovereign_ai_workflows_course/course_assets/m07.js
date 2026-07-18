window.COURSE_MODULE = {
  "title": "Evaluation, Quality, and Model Comparison",
  "graphicAlt": "Draft visual summary for Evaluation, Quality, and Model Comparison",
  "narration": "Local models should be evaluated against real workflow needs. A model that sounds fluent may still miss instructions, invent details, ignore formatting, overstate certainty, or fail on domain-specific language. Evaluation turns model selection from guesswork into evidence.\n\nRepeatable prompt sets are a practical starting point. Create representative prompts for the work the model will actually support: drafting, summarization, extraction, coding assistance, comparison, or review. Run the same prompts across candidate models and note what changes.\n\nQuality is more than whether the output is pleasant to read. Track hallucinations, missing constraints, formatting problems, unsafe assumptions, refusal behavior where appropriate, latency, stability, and how often a human must repair the result. These observations help the team choose a model that fits the workflow.\n\nAcceptance criteria should match task risk. A brainstorming assistant can tolerate more uncertainty than a workflow that influences customer communication, compliance review, security review, or operational decisions. Higher-risk workflows need stronger human review and clearer quality gates.\n\nDocument the findings. Record which model was tested, what prompts were used, what settings mattered, what failed, and what the model is approved to do. Good evaluation makes local AI workflows easier to defend, improve, and retire when they no longer fit. It also helps users avoid repeating the same model comparison from scratch. Evaluation notes should be plain enough that another maintainer can understand the decision later.",
  "narrationPoints": [
    "Local models should be evaluated against real workflow needs.",
    "Repeatable prompt sets are a practical starting point.",
    "Quality is more than whether the output is pleasant to read.",
    "Acceptance criteria should match task risk.",
    "Document the findings."
  ]
};
