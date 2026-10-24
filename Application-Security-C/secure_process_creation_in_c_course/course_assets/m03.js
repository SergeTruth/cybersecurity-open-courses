window.COURSE_MODULE = {
  "title": "Command Paths and Program Selection",
  "graphicAlt": "Explicit paths and expected-helper checks clarify executable selection.",
  "narration": "Program selection should be explicit because the chosen executable defines what code runs with the parent's intended authority and context. If the launcher relies on ambiguous path resolution, it may run a different program than the developer or operator expected.\n\nSearch path behavior can be convenient, but it creates review questions. Which directories are searched? In what order? Can the current working directory influence selection? Can deployment tooling or environment variables change the search path? A launcher that depends on search behavior should document and test that behavior.\n\nAbsolute paths and trusted install directories reduce uncertainty when they are managed carefully. A configured program path should be validated for source, location, expected role, and platform behavior before launch. The validation should match the operation being performed and the privileges of the parent.\n\nCurrent working directory assumptions are fragile. A service, scheduled job, build step, test harness, or wrapper script may start the same binary from different directories. A relative program name or relative path should not silently rely on whichever directory happened to be current.\n\nProgram identity can also include version expectations and compatibility. If a helper tool is required, the parent should know which tool it intended to run and how launch failures are reported. The review question is whether the path selection logic makes the intended executable clear enough to verify.",
  "narrationPoints": [
    "Program selection should be explicit because the chosen executable defines what code runs with the parent's intended authority and context.",
    "Search path behavior can be convenient, but it creates review questions.",
    "A configured program path should be validated for source, location, expected role, and platform behavior before launch.",
    "A relative program name or relative path should not silently rely on whichever directory happened to be current.",
    "The review question is whether the path selection logic makes the intended executable clear enough to verify."
  ]
};
