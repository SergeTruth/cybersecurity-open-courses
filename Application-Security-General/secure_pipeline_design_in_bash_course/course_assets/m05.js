window.COURSE_MODULE = {
  "title": "Quoting, Arguments, and Controlled Pipeline Inputs",
  "graphicAlt": "Validated path, filter and environment values remain distinct arguments rather than becoming a constructed command string.",
  "narration": "Pipelines often include variable values: file paths, search terms, service names, environment labels, report names, branch names, and patterns. Those values should be treated as data first. If a value is meant to be literal, it should not accidentally become shell syntax, a glob pattern, or multiple arguments.\n\nQuoting helps preserve argument boundaries. A path with spaces should remain one path. A branch name should remain data. A report name should not become a pattern unless the script intentionally supports pattern behavior. When values enter pipeline commands, the script should make their role clear.\n\nValidation decides which values the pipeline supports. Paths, names, filter values, and modes should be checked before they influence command behavior. If a pipeline supports a limited set of filters or report types, allowlist those options. If a value is unsupported, reject it before the pipeline runs.\n\nAvoid building command strings from uncontrolled input. If the pipeline needs optional arguments, build them as structured arguments where possible. If the pipeline needs a filter value, define the safe form of that value and pass it as data. This keeps pipeline behavior reviewable and reduces accidental interpretation.\n\nFilenames and metadata deserve the same care as direct user input. They may come from tools, repositories, storage systems, or CI/CD platforms, but they can still be unexpected. A secure pipeline treats those values as data crossing a boundary before they shape execution.",
  "narrationPoints": [
    "Pipelines often include variable values: file paths, search terms, service names, environment labels, report names, branch names, and patterns.",
    "A path with spaces should remain one path.",
    "Paths, names, filter values, and modes should be checked before they influence command behavior.",
    "If the pipeline needs optional arguments, build them as structured arguments where possible.",
    "Filenames and metadata deserve the same care as direct user input.",
    "If a value is meant to be literal, it should not accidentally become shell syntax, a glob pattern, or multiple arguments."
  ]
};
