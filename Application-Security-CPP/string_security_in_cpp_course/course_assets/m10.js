window.COURSE_MODULE = {
  "title": "Course Summary: A String Security Roadmap",
  "graphicAlt": "String security follows representation, ownership, validation, output context and boundary testing from source to destination.",
  "narration": "String security is a roadmap, not a single safe function call. Treat strings as structured data with a source, owner, lifetime, length, encoding, validation rule, and output context. When those properties are implicit, mistakes become much easier to miss.\n\nPrefer std::string for owned text when the application needs to keep data. Use std::string_view only when lifetime is clear. Do not confuse text with binary data, and do not assume that null termination, byte count, capacity, and displayed character count all mean the same thing.\n\nValidate length, format, allowed characters, encoding, and domain rules before using strings in parsing, policy decisions, file paths, logs, or output. Normalize before security-sensitive comparison where the application requires canonical text, and document the form that is expected.\n\nOutput discipline matters. Format strings should be controlled by the program, structured output should use context-appropriate escaping, and logs should avoid secrets and sensitive personal data. Sensitive strings need special handling around copying, access, lifetime, cleanup expectations, and redaction.\n\nFinally, isolate legacy APIs behind small wrappers, test boundary cases, use diagnostics, and review string flows deliberately. Secure string handling is ordinary engineering discipline: make assumptions visible, constrain data before trust, and verify behavior at the boundaries where strings matter most.",
  "narrationPoints": [
    "Treat strings as structured data with a source, owner, lifetime, length, encoding, validation rule, and output context.",
    "Prefer std::string for owned text when the application needs to keep data.",
    "Validate length, format, allowed characters, encoding, and domain rules before using strings in parsing, policy decisions, file paths, logs, or output.",
    "Format strings should be controlled by the program, structured output should use context-appropriate escaping, and logs should avoid secrets and sensitive personal data.",
    "Finally, isolate legacy APIs behind small wrappers, test boundary cases, use diagnostics, and review string flows deliberately.",
    "Secure string handling is ordinary engineering discipline: make assumptions visible, constrain data before trust, and verify behavior at the boundaries where strings matter most."
  ]
};
