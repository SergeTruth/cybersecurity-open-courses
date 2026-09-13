window.COURSE_MODULE = {
  "title": "Filters, Allowlists, and Legacy Deserialization Controls",
  "graphicAlt": "A legacy deserialization boundary constrains allowed classes, graph structure, arrays, references and byte volume, rejects unknown input, and points toward DTO migration.",
  "narration": "When legacy native Java deserialization cannot be removed immediately, filtering is damage reduction. Java serialization filters, including ObjectInputFilter-style controls, can help restrict incoming streams. Useful controls may include allowed classes, rejected classes, maximum depth, maximum array size, maximum references, maximum bytes, and other resource limits supported by the runtime and design. The filter should make the expected object graph explicit.\n\nFilters should be context-specific. One broad global permission to deserialize many classes is much less useful than a narrow filter tied to a single workflow. A class allowlist should answer which exact classes are valid here and why. Reject-by-default behavior is safer than accepting undecided or unknown classes. If a stream contains a class outside the expected set, the safest response is usually to reject the input and record a safe operational signal.\n\nFilters reduce risk, but they do not make risky designs fully safe. Deserialization inputs still need authentication, authorization, size limits, monitoring, and safe failure behavior. If a file import, session restore, cache read, or message consumer uses object streams, that path should be documented, tested, owned, and included in incident response planning. Filter configuration also needs review when dependencies, runtime versions, or serialized classes change.\n\nTreat filtering as migration support rather than a reason to keep object streams forever. A good near-term plan narrows classes and resource limits. A better long-term plan replaces untrusted object deserialization with constrained data formats, DTOs, schemas, and explicit mapping. Teams should know which legacy paths remain, why they remain, and what must happen before they can be retired.",
  "narrationPoints": [
    "When legacy native Java deserialization cannot be removed.",
    "Filters should be context-specific.",
    "Filters reduce risk.",
    "Treat filtering as migration support rather than a reason.",
    "The filter should make the expected object graph explicit.",
    "A class allowlist should answer."
  ]
};
