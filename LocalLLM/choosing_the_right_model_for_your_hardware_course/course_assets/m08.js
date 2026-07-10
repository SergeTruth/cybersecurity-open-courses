window.COURSE_MODULE = {
  "title": "Testing and Comparing Models",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Create a small local benchmark set from real work. Include common cases, difficult cases, costly errors, expected formats, and privacy-safe examples. Write acceptance criteria before seeing model results.\n\nKeep the configuration reproducible: model, quantization, runtime, backend, context, prompt template, generation settings, hardware, drivers, and date. Changing several variables at once makes results difficult to interpret.\n\nRun important prompts more than once. Record accuracy, completeness, refusals, hallucinations, formatting, latency, prompt processing, generation speed, memory, temperature, failures, and recovery. Stability is a quality characteristic.\n\nEvaluate whether refusals are appropriate and whether the model invents facts, citations, code behavior, or security conclusions. A smooth answer can still be wrong. Use task-specific review or automated checks where they are valid.\n\nCompare total workflow value. A smaller model may finish more tasks correctly because it is fast, stable, and easy to retry. A larger model may reduce review on difficult tasks enough to justify its cost.\n\nKeep an evaluation log and define promotion or rollback criteria. Re-test when models, quantizations, runtimes, drivers, prompts, or hardware change. Choose based on evidence from the actual machine, not memory of an old leaderboard.",
  "narrationPoints": [
    "Create a small local benchmark set from real work.",
    "Keep the configuration reproducible: model, quantization, runtime, backend, context, prompt template, generation settings, hardware, drivers, and...",
    "Run important prompts more than once.",
    "Evaluate whether refusals are appropriate and whether the model invents facts, citations, code behavior, or security conclusions.",
    "Compare total workflow value.",
    "Keep an evaluation log and define promotion or rollback criteria."
  ]
};
