window.COURSE_MODULE = {
  "title": "Safer Text Processing and Filtering",
  "graphicAlt": "Human-readable layouts require documented assumptions; structured records still pass validation and unexpected-input tests.",
  "narration": "Many Bash pipelines rely on text-processing tools such as grep, awk, sed, cut, sort, and similar utilities. These tools are valuable, but they depend on assumptions about input format. When those assumptions are not documented or tested, the pipeline becomes brittle.\n\nHuman-readable output is often not a stable machine interface. A tool may add a column, change spacing, localize labels, include headers, or alter output between versions. A script that depends on a visual layout may keep running while selecting the wrong field or missing important records.\n\nDelimiters and columns deserve careful review. A delimiter may appear inside a value. An empty field may be meaningful. Whitespace may be collapsed or preserved differently than expected. Sorting and matching may depend on locale or encoding. These are not edge cases when a pipeline supports production automation.\n\nWhere available, prefer structured output. Formats designed for machines are easier to validate than free-form text. Even then, the script should check required fields and handle missing or unexpected data. Structured output reduces ambiguity, but it does not remove the need for validation.\n\nWhen human-readable output must be parsed, document the assumption and test it. Include no-match cases, malformed lines, empty fields, unexpected values, and representative production-like samples. If a parsing decision can affect deployment, monitoring, reporting, or data movement, it deserves tests before production use.\n\nSecure filtering is not about avoiding classic shell tools. It is about using them with clear input expectations, explicit failure handling, and an understanding that text shape is part of the contract.",
  "narrationPoints": [
    "Many Bash pipelines rely on text-processing tools such as grep, awk, sed, cut, sort, and similar utilities.",
    "Human-readable output is often not a stable machine interface.",
    "Whitespace may be collapsed or preserved differently than expected.",
    "Formats designed for machines are easier to validate than free-form text.",
    "When human-readable output must be parsed, document the assumption and test it.",
    "Secure filtering is not about avoiding classic shell tools."
  ]
};
