window.COURSE_MODULE = {
  "title": "Defining Review Scope",
  "graphicAlt": "A review defines its repository, branch, component, and goals; excluded code remains outside and sensitive data is restricted to approved handling.",
  "narration": "Before using AI on a codebase, define the review scope. Scope identifies which repositories, branches, components, languages, frameworks, services, and deployment paths are authorized for review. It also identifies what is excluded. Exclusions matter because they prevent the review from drifting into unrelated systems, third-party code, experimental branches, or sensitive areas that require separate approval. A clear scope turns the review from an open-ended scan into an accountable engineering activity.\n\nScope should include the review goals. A review may focus on authentication, authorization, input handling, dependency risk, cryptography, secrets exposure, file handling, API behavior, or a recent change in a pull request. The goal affects what evidence matters and what prompts are useful. It also keeps the AI interaction focused. Asking for every possible problem in an entire repository tends to produce shallow output. Asking targeted questions against a scoped component produces results that are easier to verify.\n\nAI usage rules are part of scope. Decide whether the review uses a local model, a private enterprise AI system, or a cloud service. Decide what code, configuration, logs, secrets, customer data, and proprietary details can be shared. Sensitive files may need to be excluded or sanitized. The reviewer should know the data handling expectations before sending any content to an AI system. Good scope protects the organization while still giving the reviewer enough context to do useful work.",
  "narrationPoints": [
    "Before using AI on a codebase, define the review scope.",
    "Scope should include the review goals.",
    "AI usage rules are part of scope."
  ]
};
