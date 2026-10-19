window.COURSE_MODULE = {
  "title": "Context Matters",
  "narration": "Different output contexts interpret characters differently. In an HTML body, angle brackets can start tags and ampersands can start entities. In an HTML attribute, quotes can end the attribute value. In JavaScript, quotes, backslashes, line breaks, and closing script sequences may change code structure. In URLs, reserved characters can change paths, parameters, fragments, or schemes. A single encoder cannot safely cover every destination because each destination has its own grammar.\n\nCSS, JSON, XML, CSV, logs, and reports all have their own rules. CSS values can interact with browser parsing and external references. JSON should be produced through serializers, not hand-built strings. XML has entity rules and structural concerns. CSV may be opened by spreadsheet software that interprets certain cell prefixes as formulas. Logs and reports may later be rendered in web interfaces, searched, copied, or exported into other tools. Output can move through multiple contexts over its lifetime.\n\nThe practical habit is to identify the destination before encoding. Ask: where is this value going next? Is it plain HTML text, an attribute, a URL component, JavaScript data, JSON, a style value, a report cell, or a log field? Then use an encoder or safe API designed for that destination. Context-specific thinking prevents the common mistake of applying one familiar escaping function everywhere and assuming the result is safe.",
  "graphicAlt": "The same data enters different grammars, requiring destination-specific safe APIs and encoders.",
  "narrationPoints": [
    "Different output contexts interpret characters differently.",
    "CSS, JSON, XML, CSV, logs, and reports all have their own rules.",
    "The practical habit is to identify the destination before encoding."
  ]
};
