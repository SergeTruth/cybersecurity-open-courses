window.COURSE_MODULE = {
  "title": "Course Summary: Parse Configuration by Contract",
  "graphicAlt": "A contract guides loading, parsing, validation, precedence and controlled application.",
  "narration": "The safer workflow for configuration parsing is contract first. Define the schema, required fields, optional fields, defaults, allowed values, duplicate handling, unknown-key behavior, versioning, and failure behavior before parser details become complicated.\n\nLoad safely and parse predictably. Apply file size and line limits, handle missing or unreadable sources deliberately, reject ambiguous syntax, and create a structured intermediate representation before applying settings. Then validate every field for type, range, format, units, and context.\n\nApply defaults and overrides intentionally. Know which source wins when built-in defaults, files, environment variables, command-line overrides, deployment values, and runtime settings all exist. Protect sensitive settings by validating them without exposing them in logs.\n\nFinally, fail safely and keep behavior covered by tests and review. Ask what contract is expected, which fields are required, which defaults apply, how duplicates and unknown keys are handled, what precedence order controls final values, whether paths and secrets are handled safely, and what happens when parsing fails.",
  "narrationPoints": [
    "The safer workflow for configuration parsing is contract first.",
    "Then validate every field for type, range, format, units, and context.",
    "Then validate every field for type, range, format, units.",
    "Know which source wins when built-in defaults, files, environment variables, command-line overrides, deployment values.",
    "Ask what contract is expected, which fields are required, which defaults apply, how duplicates and unknown keys are handled."
  ]
};
