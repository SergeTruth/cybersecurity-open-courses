window.COURSE_MODULE = {
  "title": "Safe Formatting, Logging, and Output",
  "graphicAlt": "Program-controlled formats and destination-specific encoders keep data separate from structure while logs receive minimized metadata.",
  "narration": "String output must respect context. The same value may need different treatment when written to logs, JSON, XML, HTML, shell arguments, SQL parameters, file paths, UI messages, or diagnostic events. A string that is harmless as plain text can have structural meaning in a different output format.\n\nFormatting should separate data from structure. Program-controlled format strings and structured output APIs make intent clearer than building complex output by repeated concatenation. When a target format has an encoder or escaping API, use the context-appropriate mechanism rather than inventing partial escaping rules.\n\nFormat strings should be controlled by the program, not supplied by untrusted input. This is defensive guidance about ownership of formatting templates. User-controlled data should be treated as data and inserted through APIs that preserve that boundary.\n\nLogs deserve special discipline. They are often copied, indexed, exported, retained, and read by many people and systems. Logs should avoid credentials, tokens, private data, and excessive raw input. When a value is sensitive, log that the field was present, missing, malformed, or rejected without printing the sensitive content itself.\n\nUser-facing errors should be safe and actionable. Operators need enough information to fix configuration and data issues, but error text should not reveal secrets, internal parsing details, or data that belongs in restricted channels. Output rules should be documented for each destination context.",
  "narrationPoints": [
    "The same value may need different treatment when written to logs, JSON, XML, HTML, shell arguments, SQL parameters, file paths, UI messages, or diagnostic events.",
    "When a target format has an encoder or escaping API, use the context-appropriate mechanism rather than inventing partial escaping rules.",
    "Format strings should be controlled by the program, not supplied by untrusted input.",
    "User-controlled data should be treated as data and inserted through APIs that preserve that boundary.",
    "Logs should avoid credentials, tokens, private data, and excessive raw input.",
    "Operators need enough information to fix configuration and data issues, but error text should not reveal secrets, internal parsing details, or data that belongs in restricted channels."
  ]
};
