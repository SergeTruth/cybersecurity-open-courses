window.COURSE_MODULE = {
  "title": "Attribute, URL, and CSS Contexts",
  "narration": "HTML attributes require different care from HTML body text. In a quoted attribute, a quote character can break out of the attribute if it is not encoded correctly. In an unquoted attribute, spaces and additional characters can create even more ambiguity. The safest pattern is to use quoted attributes, framework-supported binding mechanisms, and attribute-aware encoding. Avoid building attribute strings manually when the framework can set attributes safely.\n\nURL output is also context-specific. A full URL, a path segment, a query parameter, and a fragment are not identical contexts. Safe URL construction should use library functions that understand URL components rather than string concatenation. Validation matters too. Encoding a dangerous scheme does not necessarily make a navigation safe. Check allowed schemes such as HTTPS where appropriate, constrain destinations, and be careful with redirects, links, callback URLs, and user-controlled return paths.\n\nCSS contexts are easy to underestimate. Dynamic CSS values can interact with browser parsing, external references, and injection patterns in surprising ways. Prefer static styles and class toggles over inserting user-controlled values into style blocks or style attributes. When dynamic styling is necessary, constrain values to a narrow allowlist such as known class names, colors, lengths, or tokens. Encoding is important, but the best defense is often to avoid dynamic CSS from untrusted data altogether.",
  "graphicAlt": "Quoted attribute binding, URL construction and destination checks, and constrained style tokens address different output contexts.",
  "narrationPoints": [
    "HTML attributes require different care from HTML body text.",
    "URL output is also context-specific.",
    "CSS contexts are easy to underestimate."
  ]
};
