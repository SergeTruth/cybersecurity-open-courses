window.COURSE_MODULE = {
  "title": "Rust Integer Types, Ranges, and Intent",
  "graphicAlt": "Integer type choice reflects signedness, fixed-width external contracts, and platform-sized indexing needs.",
  "narration": "Rust offers signed and unsigned integers in several widths, plus pointer-sized `usize` and `isize`. The right type depends on what the value means. A count, length, array index, protocol field, database identifier, user-visible value, and signed delta may all be numbers, but they do not all carry the same design requirements.\n\nSigned types communicate that values below zero may be meaningful. That can fit deltas, balances, offsets, temperatures, or calculations where negative values are expected. Unsigned types communicate non-negative quantities, but unsigned does not automatically mean safe. A value can be non-negative and still be too large, in the wrong unit, or invalid for the operation.\n\nFixed-width types are useful when layout, serialization, storage, or protocol compatibility matters. A file format might define a field as `u16`, a network message might carry a `u32`, and an embedded interface might require exact width. In those cases, the type choice documents the external contract.\n\n`usize` is appropriate for indexing and memory sizes because it matches the platform's addressable memory model. But it should not become the default for every number. A port, retry count, percentage, database ID, or protocol version may deserve a domain-specific type or a fixed-width representation instead.\n\nDefensive Rust chooses integer types that express intent. If a type is too broad, review becomes harder because invalid values can flow farther into the program. If a type is too narrow, conversion and overflow edges become more likely. The best choice makes valid range, signedness, platform assumptions, and boundary behavior easy to understand.",
  "narrationPoints": [
    "Rust offers signed and unsigned integers in several widths.",
    "Signed types communicate that values below zero may.",
    "Fixed-width types are useful.",
    "`usize` is appropriate for indexing and memory sizes.",
    "Defensive Rust chooses integer types that express intent.",
    "But it should not become the default for every number."
  ]
};
