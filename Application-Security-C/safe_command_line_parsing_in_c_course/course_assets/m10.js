window.COURSE_MODULE = {
  "title": "Course Summary: Parse, Validate, Then Act",
  "graphicAlt": "Five ordered stages: define interface -> parse without side effects -> validate values/relationships -> reject ambiguity -> act on validated config.",
  "narration": "The workflow for safer command-line parsing is simple: define the contract, parse without side effects, validate every value, reject ambiguity, report errors clearly, and act only after input is acceptable. That sequence keeps uncertain arguments from driving program behavior too early.\n\nReview the contract before the implementation. Which arguments are required? Which options take values? Are duplicates allowed? What defaults apply? Which options conflict or depend on each other? What ranges apply to numeric values? What paths or resources may be referenced?\n\nThen review the parser flow. Does parsing perform file changes or resource operations? Are unknown options rejected consistently? Are missing values detected? Are command-line strings checked before copy or comparison? What happens when validation fails?\n\nFinally, make the behavior repeatable with tests and tools. Cover valid cases, invalid cases, boundary cases, malformed cases, duplicate handling, missing values, and regression scenarios. A safe command-line tool is not one that trusts its launch environment; it is one that turns input into a validated internal configuration before doing real work.",
  "narrationPoints": [
    "The workflow for safer command-line parsing is simple: define the contract, parse without side effects, validate every value.",
    "Which options conflict or depend on each other.",
    "Are command-line strings checked before copy or comparison.",
    "Does parsing perform file changes or resource operations.",
    "A safe command-line tool is not one that trusts its launch environment."
  ]
};
