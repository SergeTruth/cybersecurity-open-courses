window.COURSE_MODULE = {
  "title": "JavaScript and JSON Output",
  "narration": "JavaScript output needs special care because the destination is executable code. Untrusted data placed into a script context can become code if it is not represented correctly. Quotation marks, backslashes, line breaks, template delimiters, and closing script sequences can all affect parsing. The safer pattern is to avoid concatenating data into scripts. Keep data separate from code and use framework-supported data binding, DOM APIs that treat values as text, or safe serialization patterns.\n\nJSON should be produced with a proper serializer. Serializers understand quoting, escaping, data types, arrays, objects, and null values. Hand-building JSON strings is brittle because one unexpected quote, backslash, or control character can break structure or create an injection path when the JSON is embedded into another context. Even serialized JSON needs attention when placed inside an HTML page or script block because the surrounding context may add additional requirements.\n\nData-in-script patterns should be minimized and reviewed carefully. If a server renders initial state into a page, make sure the framework provides a safe mechanism or the output is encoded for the exact script context. Avoid inline script injection by separating static code from dynamic data. Prefer external scripts with data passed through safe channels, such as JSON endpoints, data attributes handled by the framework, or text-only DOM APIs. The design goal is simple: data should stay data, and code should stay code.",
  "graphicAlt": "Dynamic data uses serialization and reviewed embedding through safe bindings rather than string-built executable code.",
  "narrationPoints": [
    "JavaScript output needs special care because the destination is executable code.",
    "JSON should be produced with a proper serializer.",
    "Data-in-script patterns should be minimized and reviewed carefully."
  ]
};
