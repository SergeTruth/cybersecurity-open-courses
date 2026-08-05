window.COURSE_MODULE = {
  "title": "Designing Safer Array APIs",
  "graphicAlt": "A safe API accepts input and output spans, reports bytes written separately, and rejects output that cannot contain the complete result.",
  "narration": "Many bounds problems are created by API shape. A function that accepts only a raw pointer asks callers and reviewers to infer the valid range from somewhere else. That may be acceptable for a narrow internal helper with a tightly controlled contract, but it is a poor default for code that crosses module boundaries.\n\nPrefer APIs that accept containers, spans, iterator ranges with clear rules, or explicit domain range objects. These shapes communicate whether the function owns data, borrows data, reads data, mutates data, or requires a specific extent. They also make it harder to accidentally separate data from the size that makes access valid.\n\nWhen raw buffers are unavoidable, pair them with explicit lengths or capacities and define the units. Say whether a value is bytes, elements, characters, or remaining capacity. Say whether the function reads, writes, appends, formats, or transforms. Say whether input and output ranges may overlap.\n\nOutput behavior deserves special care. If output does not fit, the API should define whether it fails, reports required size, truncates with explicit signaling, retries through a caller-provided buffer, or returns an owned result. Silent truncation and partial writes can create ambiguous downstream behavior.\n\nA safer API contract is easy to test and review. Reviewers can see the range, ownership, mutability, and failure behavior. Tests can cover empty input, short output, exact-fit output, and invalid ranges. Callers do not have to preserve a hidden rule that only exists in the original author's head.",
  "narrationPoints": [
    "Many bounds problems are created by API shape.",
    "Prefer APIs that accept containers, spans, iterator ranges with clear rules, or explicit domain range objects.",
    "Say whether the function reads, writes, appends, formats, or transforms.",
    "If output does not fit, the API should define whether it fails, reports required size, truncates with explicit signaling, retries through a caller-provided buffer, or returns an owned result.",
    "Reviewers can see the range, ownership, mutability, and failure behavior.",
    "Callers do not have to preserve a hidden rule that only exists in the original author's head."
  ]
};
