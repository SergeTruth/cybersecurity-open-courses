window.COURSE_MODULE = {
  "title": "External Input, Parsed Lengths, and Dynamic Sizes",
  "graphicAlt": "Untrusted file fields for count and offset pass through parsing, conversion, consistency checks, and allocation limits before indexing storage.",
  "narration": "External data often controls sizes, indexes, offsets, element counts, or serialized lengths. Values can come from files, protocols, APIs, command-line arguments, environment variables, configuration, databases, or user interfaces. They should be considered untrusted until the program has parsed and validated them.\n\nValidation should happen before the value influences allocation, indexing, copying, transformation, or parsing of later fields. A length in a file header does not prove that the file contains that many bytes. An index in a request does not prove that the referenced element exists. A count in configuration does not prove that the service should allocate that much memory.\n\nDefensive maximums are part of bounds safety. Even when a number fits in the machine type, it may be too large for the application, tenant, device, request, or resource budget. Clear caps prevent unreasonable work and give operators predictable failure behavior when input is outside policy.\n\nCross-field consistency matters. A record count should match the available records. A declared length should fit within the remaining data. An offset should point into the expected region. A unit should be recognized before conversion. Values that are individually plausible can still be inconsistent together.\n\nKeep parsing, validation, and memory access separate. The code should first turn bytes or text into a value, then check syntax and domain rules, then convert into the application type, then access memory or perform work. Separating those steps makes safe failure easier to test and review.",
  "narrationPoints": [
    "External data often controls sizes, indexes, offsets, element counts, or serialized lengths.",
    "A length in a file header does not prove that the file contains that many bytes.",
    "A count in configuration does not prove that the service should allocate that much memory.",
    "A record count should match the available records.",
    "An offset should point into the expected region.",
    "Separating those steps makes safe failure easier to test and review."
  ]
};
