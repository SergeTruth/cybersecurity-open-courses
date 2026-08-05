window.COURSE_MODULE = {
  "title": "Input Parsing and Boundary Validation",
  "graphicAlt": "Parsing boundary showing canonical decimal text consumed completely, signs and suffixes rejected, and only values inside the protocol range converted to uint32_t.",
  "narration": "Numeric input from files, protocols, command lines, environment variables, configuration, APIs, databases, and user interfaces should be treated as untrusted until it is parsed and validated. The fact that a field contains digits does not prove that it is meaningful for the program. The value still needs syntax checks, range checks, unit checks, and domain checks.\n\nA useful pattern is to parse into a type large enough to evaluate the value safely, then validate before converting into the application type. For example, an external field might be parsed into a wider signed type so the code can detect negative values, overly large values, empty fields, malformed text, and unsupported units before narrowing the result.\n\nValidation should reject values that do not fit the domain. That includes negative counts, unexpectedly huge limits, numbers with the wrong unit, missing fields, duplicated fields, partially parsed values, and values that are individually valid but inconsistent with related fields. The correct maximum is usually an application rule, not simply the maximum of the C++ type.\n\nSeparate parsing, validation, conversion, and use. When those steps are mixed together, it becomes harder to see which assumptions have already been checked. A clean sequence makes it easier to test failures, log useful diagnostics, and avoid using a partly validated value in a memory-sensitive calculation.",
  "narrationPoints": [
    "The value still needs syntax checks, range checks, unit checks, and domain checks.",
    "Numeric input from files, protocols, command lines, environment variables, configuration, APIs, databases, and user interfaces should be treated as untrusted until it is parsed and validated.",
    "A useful pattern is to parse into a type large enough to evaluate the value safely, then validate before converting into the application type.",
    "Validation should reject values that do not fit the domain.",
    "A clean sequence makes it easier to test failures, log useful diagnostics, and avoid using a partly validated value in a memory-sensitive calculation.",
    "When those steps are mixed together, it becomes harder to see which assumptions have already been checked."
  ]
};
