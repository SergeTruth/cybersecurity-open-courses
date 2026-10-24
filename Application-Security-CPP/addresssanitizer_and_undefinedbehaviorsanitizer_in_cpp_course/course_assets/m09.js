window.COURSE_MODULE = {
  "title": "Course Summary: Practical Sanitizer Habits",
  "graphicAlt": "Repeatable sanitizer builds and meaningful tests lead to root-cause fixes and regression prevention within broader safety practice.",
  "narration": "Practical sanitizer use is built from durable habits. Enable ASan and UBSan early enough that developers see memory-access and undefined-behavior defects while changes are still understandable. Keep the build configuration visible, repeatable, and separate from ordinary production release builds.\n\nRun tests that exercise meaningful paths. Sanitizers can only report behavior they observe, so unit tests, integration tests, boundary tests, and targeted longer-running jobs all have a role. Read reports for root cause. The first failing line may show the symptom, but the durable fix often involves ownership, lifetime, bounds, initialization, or numeric assumptions elsewhere.\n\nFix the design issue rather than merely quieting the report. Prefer RAII, containers, bounded views, deliberate initialization, and explicit contracts. Add regression tests around corrected behavior. Treat sanitizer findings as engineering defects and keep suppressions rare, specific, documented, and reviewed.\n\nFinally, place sanitizers inside a broader C++ safety program. They support review, static analysis, safer abstractions, modernization, and CI governance. Used this way, ASan and UBSan help teams find defects earlier, fix them more confidently, and maintain trust in the codebase over time.\n\nThe lasting habit is consistency. Keep sanitizer jobs reproducible, reports actionable, and ownership of fixes clear. When developers trust the signal, sanitizer findings become part of normal engineering practice rather than an occasional emergency cleanup effort.",
  "narrationPoints": [
    "Practical sanitizer use is built from durable habits.",
    "Keep the build configuration visible, repeatable, and separate from ordinary production release builds.",
    "The first failing line may show the symptom, but the durable fix often involves ownership, lifetime, bounds, initialization, or numeric assumptions elsewhere.",
    "Treat sanitizer findings as engineering defects and keep suppressions rare, specific, documented, and reviewed.",
    "Used this way, ASan and UBSan help teams find defects earlier, fix them more confidently, and maintain trust in the codebase over time.",
    "When developers trust the signal, sanitizer findings become part of normal engineering practice rather than an occasional emergency cleanup effort."
  ]
};
