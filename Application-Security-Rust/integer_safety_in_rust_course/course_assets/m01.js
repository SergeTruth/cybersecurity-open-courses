window.COURSE_MODULE = {
  "title": "Why Integer Safety Matters",
  "graphicAlt": "Integers influence sizes, identities, timing, and protocols; each use needs meaningful ranges and units.",
  "narration": "Integer mistakes are easy to underestimate because numbers look simple. In real systems, integers often represent lengths, counts, offsets, capacities, identifiers, timestamps, prices, limits, indexes, retry counters, and protocol fields. When the meaning of a number is unclear, the program can make the wrong decision while still compiling cleanly.\n\nNumeric mistakes can affect correctness, reliability, and security. A limit may be calculated incorrectly. A count may wrap. A signed value may be treated as non-negative. A large parsed value may drive an excessive allocation. A truncated identifier may point to the wrong record. A protocol length may be trusted before it is validated.\n\nRust gives developers strong tools, but it does not remove the need for numeric design. The language provides explicit integer types, checked operations, fallible conversions, safe collections, and type-driven APIs. Those tools are most effective when developers choose types based on meaning and validate values before they cross trust boundaries.\n\nInteger safety is also a review practice. Reviewers should ask what a number represents, what range is valid, what unit it uses, whether negative values are meaningful, whether conversion can fail, what happens at minimum and maximum values, and whether arithmetic behavior has been selected deliberately.\n\nThe defensive goal is to make numeric assumptions explicit and reviewable. A Rust codebase should show where numbers come from, how they are validated, how they are converted, how arithmetic failure is handled, and how numeric values influence memory, authorization, parsing, billing, scheduling, or operational behavior.",
  "narrationPoints": [
    "Integer mistakes are easy to underestimate.",
    "Numeric mistakes can affect correctness.",
    "Rust gives developers strong tools.",
    "Integer safety is also a review practice.",
    "Aim to make numeric assumptions explicit and reviewable.",
    "A limit may be calculated incorrectly."
  ]
};
