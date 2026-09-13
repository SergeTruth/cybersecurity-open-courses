window.COURSE_MODULE = {
  "title": "Numeric Conversions and Cast Review",
  "graphicAlt": "Fallible conversion checks whether a source value fits the target range; casts and signedness changes deserve review.",
  "narration": "Many integer bugs appear during conversion rather than during arithmetic. A value may be parsed as one type, stored as another, sent over a protocol as a fixed-width field, converted to `usize` for indexing, or cast across signed and unsigned representations. Each transition is a chance for meaning to drift.\n\nWidening conversions are usually easier to reason about than narrowing conversions because the target type can represent more values. Narrowing conversions require review because the target may not represent every valid source value. Signedness changes also need attention because a value that means one thing as signed data may mean something very different as unsigned data.\n\nThe `as` operator can be concise, but it can also hide truncation, reinterpretation, or unexpected boundary behavior. That does not mean every `as` cast is wrong. It means cast sites are review points. The reviewer should understand the source range, the target range, and why the conversion preserves the value's meaning.\n\nFallible conversion patterns such as `TryFrom` make boundary failures explicit. Instead of silently forcing a value into a target type, the code can return an error, reject the input, choose a fallback, or apply a documented policy. That is especially useful at parser, FFI, serialization, indexing, and allocation boundaries.\n\nDefensive Rust validates ranges before conversion. If a parsed value will become an index, a length, a retry count, a timeout, a port, or a protocol field, validate the allowed range in the domain first. Conversion should preserve a decision already made, not smuggle an unchecked value into a more dangerous context.",
  "narrationPoints": [
    "Many integer bugs appear during conversion rather than.",
    "Widening conversions are usually easier to reason about.",
    "The `as` operator can be concise.",
    "Fallible conversion patterns such as `TryFrom` make.",
    "Defensive Rust validates ranges before conversion.",
    "Narrowing conversions require review."
  ]
};
