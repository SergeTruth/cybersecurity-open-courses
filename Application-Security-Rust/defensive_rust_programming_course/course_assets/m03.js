window.COURSE_MODULE = {
  "title": "Input Validation, Parsing, and Trust Boundaries",
  "graphicAlt": "External input is parsed and checked in context before becoming domain data for sensitive operations.",
  "narration": "Rust can enforce memory safety, but it cannot know whether an email address, file path, API parameter, tenant ID, serialized message, environment variable, or command-line option is valid for the application. Validity is a business and security decision. The application has to define it and enforce it consistently.\n\nExternal input should be treated as untrusted until it is parsed, validated, and converted into a type that represents the intended domain. That input may arrive through HTTP requests, files, command-line arguments, environment variables, queues, serialized data, databases, or other services. Internal systems can also produce invalid data when versions drift or assumptions change.\n\nParsing should happen at clear boundaries, close to where data enters. Defensive code avoids letting raw strings or unchecked values travel deep into the application and then become file paths, authorization subjects, resource selectors, database query inputs, downstream request parameters, or security-sensitive configuration. The sooner raw input becomes validated domain data, the simpler the rest of the code becomes.\n\nValidation should include shape, length, allowed values, encoding expectations, resource ownership, and contextual rules. A path-like value may need different checks than a display label. A tenant ID may need to match the authenticated subject's scope. A serialized message may need version-aware validation before it influences state.\n\nClear rejection behavior matters. Invalid input should be rejected predictably, without falling back to risky defaults or exposing excessive implementation detail. Defensive Rust code makes trust boundaries visible, validates data before sensitive use, and turns successful validation into simpler, safer downstream APIs.",
  "narrationPoints": [
    "Rust can enforce memory safety.",
    "External input should be treated as untrusted until it is.",
    "Parsing should happen at clear boundaries, close.",
    "Validation should include shape.",
    "Clear rejection behavior matters.",
    "A tenant ID may need to match the authenticated subject's."
  ]
};
