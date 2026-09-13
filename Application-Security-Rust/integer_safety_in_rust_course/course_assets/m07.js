window.COURSE_MODULE = {
  "title": "Domain Types and Numeric Invariants",
  "graphicAlt": "Validated numeric domain types encode units and invariants and prevent unrelated values from being mixed.",
  "narration": "Primitive integers are useful, but they often say too little. A `u32` could be a user ID, byte count, retry count, percentage, timeout, port, version, score, or protocol field. The type tells the compiler the representation, but it does not tell reviewers the domain meaning.\n\nDomain types make numeric meaning visible. A newtype can separate values that share the same representation but must not be mixed. A `UserId` and a `TenantId` might both be stored as integers, but a well-designed API should not let one silently stand in for the other.\n\nConstructors can validate ranges, units, and invariants once. A type can represent a bounded percentage, a positive count, a validated port, a nonzero size, a safe allocation limit, or a timeout in a specific unit. Once constructed, the value carries evidence that validation has happened.\n\nThis reduces scattered numeric checks. Instead of every caller asking whether a value is in range, the program can use a type that is only constructible when the range is valid. That makes the safe path easier and makes invalid states harder to express in normal code.\n\nDomain types also improve review. When a function accepts `ByteLimit` instead of a generic integer, reviewers know what unit and invariant matter. When a parser returns a validated type instead of a raw number, downstream code can focus on behavior rather than revalidating every numeric assumption.",
  "narrationPoints": [
    "Primitive integers are useful.",
    "Domain types make numeric meaning visible.",
    "Constructors can validate ranges.",
    "This reduces scattered numeric checks.",
    "Domain types also improve review.",
    "A newtype can separate values that share the same."
  ]
};
