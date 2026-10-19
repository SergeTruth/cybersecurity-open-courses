window.COURSE_MODULE = {
  "title": "Output Encoding and XSS",
  "narration": "Cross-site scripting, or XSS, occurs when untrusted content executes in a user browser context. Reflected XSS involves input that is immediately reflected in a response. Stored XSS involves content saved by the application and later shown to users. DOM-based XSS happens when client-side code reads data and writes it into the page through an unsafe path. Output encoding is one of the central defenses because it prevents untrusted data from being interpreted as browser-executable content.\n\nEncoding is not the only layer. Input validation can reject values that should never be accepted. Safe sinks help because they treat data as text rather than markup or code. Dangerous sinks, such as assigning untrusted content to raw HTML insertion APIs or building scripts as strings, can bypass normal protections. Content Security Policy can reduce impact in some situations, but it should be treated as a defense-in-depth layer, not a substitute for correct output handling.\n\nSecure framework use matters. Many XSS issues appear when developers step outside safe framework patterns: disabling escaping, using raw HTML rendering, trusting markdown output, manually manipulating the DOM, or mixing server-rendered and client-rendered content without understanding the boundary. A good review asks where untrusted data reaches the browser, what context it lands in, which encoder or safe sink is used, and whether any helper bypasses the default protection.",
  "graphicAlt": "Immediate, stored and client-side data need context-matched sinks, with validation and CSP as supporting layers.",
  "narrationPoints": [
    "Cross-site scripting, or XSS, occurs when untrusted content executes in a user browser context.",
    "Encoding is not the only layer.",
    "Secure framework use matters."
  ]
};
