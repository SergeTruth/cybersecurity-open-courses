window.COURSE_MODULE = {
  "title": "Command-Line Input as a Trust Boundary",
  "graphicAlt": "Terminal/script/scheduler inputs converge on parser boundary, then type/range/path validation gate, then resource-changing operation.",
  "narration": "Command-line arguments are input, and input deserves a trust-boundary mindset. A C tool may be launched by a person at a terminal, but it may also be launched by scripts, schedulers, build systems, service wrappers, package hooks, tests, or other automation. The source may be familiar while the actual values are still uncertain.\n\nCommand-line values can influence program behavior quickly. They may select files, choose directories, set counts, control logging, enable features, change output paths, decide whether resources are created or removed, or affect memory allocation and buffer handling. That makes parser behavior part of the program's safety story.\n\nEven internal tools should parse defensively. Internal does not mean perfectly controlled. Automation changes over time, environment assumptions drift, and wrapper scripts can pass through values from another source. A tool that is reliable in one workflow can become fragile when reused in a larger system.\n\nSafe parsing starts before action. The parser should identify what arguments are present, what each one means, which values are required, and whether those values satisfy type, range, length, path, and format rules. Only after that should the program perform file changes, resource operations, memory work, or persistent state updates.\n\nThe goal is not to make command-line interfaces complicated. The goal is to make them explicit. A reviewable parser contract tells developers what the tool accepts, what it rejects, and how it behaves when input is missing, ambiguous, or invalid.",
  "narrationPoints": [
    "Command-line arguments are input, and input deserves a trust-boundary mindset.",
    "A tool that is reliable in one workflow can become fragile when reused in a larger system.",
    "Only after that should the program perform file changes, resource operations, memory work.",
    "Only after that should the program perform file changes, resource operations, memory work, or persistent state updates.",
    "A reviewable parser contract tells developers what the tool accepts, what it rejects, and how it behaves when input is missing, ambiguous."
  ]
};
