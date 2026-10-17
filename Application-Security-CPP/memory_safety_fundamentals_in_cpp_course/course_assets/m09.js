window.COURSE_MODULE = {
  "title": "Course Summary: Safer C++ Memory Habits",
  "graphicAlt": "Summarize ownership/lifetime, RAII/bounds, valid state and layered tooling within incremental modernization.",
  "narration": "Safer C++ memory habits are durable because they make ordinary engineering work easier to review. Start with ownership clarity. A maintainer should be able to tell who owns an object, who may borrow it, and when that access ends. Keep borrowed access short-lived, avoid hidden lifetime extension, and make transfer of responsibility explicit.\n\nUse RAII as the default cleanup model. Prefer standard containers, smart pointers with clear intent, and bounded views that keep data and size together. Validate boundaries before parsing, copying, transforming, or allocating. Initialize deliberately so objects enter valid states and remain valid through their lifetime. Choose types that make misuse harder, and make unsafe conversions visible rather than routine.\n\nModernization works best when it is incremental and risk-based. Prioritize modules that handle external input, complex ownership, concurrency, or legacy raw-memory interfaces. Add tests and tooling before large changes. Avoid blind rewrites that remove known behavior without proving safer replacement behavior. The practical goal is to make the safer path the natural path for new code, while steadily reducing the highest-risk patterns in existing systems.\n\nFor teams, the lasting habit is shared vocabulary. When engineers consistently discuss ownership, lifetime, bounds, initialization, and tooling in reviews, memory safety stops being a specialist topic and becomes part of normal professional C++ practice.",
  "narrationPoints": [
    "Safer C++ memory habits are durable because they make ordinary engineering work easier to review.",
    "Keep borrowed access short-lived, avoid hidden lifetime extension, and make transfer of responsibility explicit.",
    "Prefer standard containers, smart pointers with clear intent, and bounded views that keep data and size together.",
    "Choose types that make misuse harder, and make unsafe conversions visible rather than routine.",
    "Prioritize modules that handle external input, complex ownership, concurrency, or legacy raw-memory interfaces.",
    "When engineers consistently discuss ownership, lifetime, bounds, initialization, and tooling in reviews, memory safety stops being a specialist topic and becomes part of normal professional C++ practice."
  ]
};
