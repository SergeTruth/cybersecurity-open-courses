window.COURSE_MODULE = {
  "title": "Input, Parsing, Numeric, and Resource Assumptions",
  "graphicAlt": "Parsing, domain validation, and resource limits are separate stages; invalid input is rejected before costly work.",
  "narration": "Rust can parse data safely, but parsed does not mean trusted. External input may arrive from files, network requests, APIs, environment variables, command-line arguments, serialized messages, databases, queues, or configuration. A value can be syntactically valid and still be out of range, unauthorized, inconsistent, too large, incorrectly encoded, or inappropriate for the requested operation.\n\nParsing and validation are separate responsibilities. Parsing says that bytes or text can be interpreted as a value. Validation says that the value is allowed in this domain, for this tenant, in this unit, at this boundary, under this policy. Treating those as the same step is a common source of weak assumptions.\n\nIndexes, lengths, offsets, capacities, and allocation sizes deserve special review. Direct indexing may panic if shape assumptions are wrong. Unchecked casts can change meaning across signedness or width. Arithmetic used to calculate sizes can overflow or produce values that are technically valid but operationally unreasonable.\n\nResource assumptions are security assumptions. Unbounded payloads, retries, queues, allocations, recursion depth, file reads, or request fan-out can reduce availability even in memory-safe code. Defensive Rust sets explicit limits, checks conversions and arithmetic, rejects unsupported sizes early, and fails safely before data reaches sensitive logic.\n\nInternal data should not be trusted forever simply because it crossed one boundary earlier. Data can be stale, migrated incorrectly, loaded from a compromised source, or passed through a different component with different assumptions. Good validation strategy is layered: validate at external boundaries, convert to domain types, and re-check critical assumptions before high-impact operations.",
  "narrationPoints": [
    "Rust can parse data safely.",
    "Parsing and validation are separate responsibilities.",
    "Indexes, lengths, offsets, capacities, and allocation sizes.",
    "Resource assumptions are security assumptions.",
    "Internal data should not be trusted forever simply.",
    "Good validation strategy is layered: validate at external."
  ]
};
