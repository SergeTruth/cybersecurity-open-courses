window.COURSE_MODULE = {
  "title": "Validating AI Findings and Avoiding False Confidence",
  "graphicAlt": "An AI claim is checked against code and verification results before human judgment accepts or rejects it.",
  "narration": "AI output can contain true positives, false positives, false negatives, incomplete reasoning, outdated advice, and hallucinated APIs. A confident answer is not the same as a correct answer. Reviewers should be especially cautious with vague reassurance such as this looks secure. That statement has little value unless it explains what was checked, what assumptions were made, what files were considered, and what evidence supports the conclusion.\n\nA meaningful finding should identify affected code, the security assumption, potential impact, and verification steps. Ask the assistant to provide confidence level, assumptions, affected files, data flow, and ways to test or inspect the claim. For example, if AI says object-level authorization may be missing, it should point to the route, the object identifier, the database query, and the absent ownership or tenant condition. That gives the reviewer something concrete to confirm or reject.\n\nAI-suggested fixes also require review. A proposed patch may be syntactically plausible but incompatible with the framework, inconsistent with team standards, or risky in a different way. Validate important claims with tests, static analysis, dependency scanning, secret scanning, manual review, runtime checks, and peer discussion. The human reviewer remains responsible for approval decisions, and the evidence should outlive the conversation with the assistant.",
  "narrationPoints": [
    "AI output can contain true positives.",
    "A meaningful finding should identify affected code.",
    "AI-suggested fixes also require review.",
    "Reviewers should be especially cautious with vague.",
    "Ask the assistant to provide confidence level.",
    "Validate important claims with tests."
  ]
};
