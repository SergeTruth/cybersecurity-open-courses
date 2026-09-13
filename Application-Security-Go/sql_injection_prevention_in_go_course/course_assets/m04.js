window.COURSE_MODULE = {
  "title": "Safe Dynamic Query Design",
  "graphicAlt": "Known caller choices map through an allowlist to trusted query fragments, while validated values remain bound arguments and unsupported choices are rejected.",
  "narration": "Real applications often need dynamic queries. A search page may include optional filters. A dashboard may sort by several fields. A reporting feature may switch between known report modes. Pagination may change limit and offset values. Dynamic behavior is normal, but it needs a design that keeps caller choices from becoming arbitrary SQL syntax.\n\nThe first rule is that dynamic values should still be parameterized. If a user selects a status, a date range, or a numeric limit, the selected value should travel as a parameter after validation. The fact that a query is assembled conditionally does not change the value-handling rule. Values remain values.\n\nDynamic structure is different. Column names, sort directions, table choices, selected fields, and report modes are part of the SQL shape. Those decisions should come from controlled allowlists selected by application logic. A caller can request a known option, and the application maps that option to a trusted fragment. The caller should not provide the fragment itself.\n\nOptional filters can be built from small known pieces. For example, an application can maintain a set of approved filter builders, each responsible for adding a known condition and its arguments. This keeps the allowed query shapes explicit. It also gives reviewers a concrete place to inspect limits, joins, filter combinations, and performance-sensitive paths.\n\nSearch and pagination also need reliability limits. Clear maximum page sizes, supported sort fields, bounded search behavior, and predictable empty-result handling protect both security and service stability. Safe dynamic query design is not about eliminating flexibility. It is about making flexibility visible, controlled, and testable.",
  "narrationPoints": [
    "Real applications often need dynamic queries.",
    "The first rule is that dynamic values should still be parameterized.",
    "Dynamic structure is different.",
    "Optional filters can be built from small known pieces.",
    "Search and pagination also need reliability limits."
  ]
};
