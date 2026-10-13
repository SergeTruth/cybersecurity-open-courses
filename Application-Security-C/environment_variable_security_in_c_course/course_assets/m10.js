window.COURSE_MODULE = {
  "title": "Course Summary: Environment-Safe C Habits",
  "graphicAlt": "Four environment-safe practices—validate input, own configuration, limit inheritance and protect secrets—rest on a tested, documented contract.",
  "narration": "Environment-safe C starts with a basic habit: treat environment variables as process input. They may be useful, expected, and operationally convenient, but they are not automatically trusted. A value should not drive sensitive behavior until the program has parsed and validated it according to its intended meaning.\n\nRead environment values deliberately. Copy them when needed, convert them into typed application-owned configuration, enforce limits, and define what happens when values are missing or malformed. The rest of the program should use the validated configuration rather than repeatedly consulting raw environment state.\n\nAvoid basing trust or privilege decisions only on the environment. In services, helpers, scheduled tasks, and privileged components, inherited state should be minimized and documented. Use controlled configuration, verified identity, explicit policy, and least privilege for higher-impact decisions.\n\nConstrain environment-derived paths, search behavior, and child process inheritance. Prefer explicit trusted locations for sensitive operations. Build child environments intentionally. Protect secrets from logging, diagnostic exposure, and unnecessary propagation.\n\nFinally, keep the environment contract visible. Tests should cover malformed and missing values. Review should trace every variable to its effect. Documentation should list supported settings and sensitivity. Operational controls should remove drift. These habits turn environment variables from hidden process state into predictable, reviewable configuration.",
  "narrationPoints": [
    "Environment-safe C starts with a basic habit: treat environment variables as process input.",
    "The rest of the program should use the validated configuration rather than repeatedly consulting raw environment state.",
    "Use controlled configuration, verified identity, explicit policy, and least privilege for higher-impact decisions.",
    "Protect secrets from logging, diagnostic exposure, and unnecessary propagation.",
    "Review should trace every variable to its effect."
  ]
};
