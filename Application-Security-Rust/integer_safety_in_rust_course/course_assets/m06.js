window.COURSE_MODULE = {
  "title": "Parsing External Numeric Input",
  "graphicAlt": "Numeric parsing is followed by range, unit, field-relationship, and default-policy validation.",
  "narration": "External numbers should not be trusted just because they parse. Numeric input can come from files, network messages, APIs, command-line arguments, environment variables, database rows, configuration, or serialized payloads. A successful parse only says the text or bytes could be interpreted as a number.\n\nValidation is a separate step. A parsed value may be negative when only positive values are allowed, too large for a limit, measured in the wrong unit, inconsistent with another field, outside a business rule, or inappropriate for the current tenant or operation. The application must decide whether the value is allowed.\n\nDefaults and missing values need explicit policy. A missing timeout might mean use a safe default, reject the request, or inherit a configuration value. A missing limit might be safer than an unbounded limit, but that behavior should be deliberate. Silent defaults can become security surprises when callers misunderstand them.\n\nRelated fields should be validated together. A count may parse successfully while a payload length disagrees with it. A start offset and length may each be valid alone but invalid as a range. A rate limit and time window may combine into an unreasonable amount of work. Defensive validation checks relationships, not only individual fields.\n\nA strong Rust pattern is to parse into a temporary representation, validate range and meaning, and then convert into a domain type. After that conversion, downstream code can rely on the type's invariant instead of repeating raw numeric checks everywhere.",
  "narrationPoints": [
    "External numbers should not be trusted just.",
    "Validation is a separate step.",
    "Defaults and missing values need explicit policy.",
    "Related fields should be validated together.",
    "A strong Rust pattern is to parse into a temporary.",
    "The application must decide whether the value is allowed."
  ]
};
