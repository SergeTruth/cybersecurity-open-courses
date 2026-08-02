window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "A summary pipeline runs from bounded bytes through safe parser, exact schema, normalized domain value, authorized effect, minimal serialization, private logging, regression tests, and monitoring.",
  "narration": "Secure JSON and YAML processing means treating structured data as untrusted until it is parsed with safe settings, validated against explicit expectations, normalized, authorized where needed, and used only for its intended purpose. Syntax validity is only the first step. The application still needs to know what the data means and what authority it should have.\n\nJSON risks often come from assumptions about shape, fields, size, numeric behavior, null handling, and business meaning. YAML risks often come from overly flexible parsing, unsafe loader choices, complex features, and configuration trust mistakes. Both formats are useful, but neither should be allowed to control program behavior beyond the design.\n\nStrong Python applications use safe parser choices, clear trust boundaries, schema validation, allowlisted fields, type normalization, size limits, robust error handling, careful object mapping, and privacy-aware logging. Configuration should be separated from user data, and privileged settings should be reviewed, owned, and constrained.\n\nThe goal is not avoiding JSON or YAML. The goal is making structured data processing explicit, bounded, and defensible. When teams test boundary cases, review parser choices, manage dependencies, and keep sensitive data out of logs and responses, they reduce repeated mistakes and build systems that are easier to operate safely over time.",
  "narrationPoints": [
    "The application still needs to know what the data means and what authority it should have.",
    "Both formats are useful, but neither should be allowed to control program behavior beyond the design.",
    "Configuration should be separated from user data, and privileged settings should be reviewed, owned, and constrained.",
    "The goal is making structured data processing explicit, bounded, and defensible.",
    "JSON risks often come from assumptions about shape, fields, size, numeric behavior, null handling, and business meaning.",
    "YAML risks often come from overly flexible parsing, unsafe loader choices, complex features, and configuration trust mistakes."
  ]
};
