window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a62d6c873f",
  "questions": {
    "q1": {
      "options": {
        "A": "Business-valid input can still contain characters special to a particular browser output context.",
        "B": "Browsers apply different interpretation rules to text, attributes, URLs, script, and markup.",
        "C": "Output context determines interpretation and potential execution rather than merely visual appearance.",
        "D": "Database storage does not establish that a value is safe for every rendering destination."
      }
    },
    "q2": {
      "options": {
        "A": "Persisted data can cross later boundaries when displayed to different users or components.",
        "B": "Stored rich text still needs a reviewed sanitization and display policy.",
        "C": "A saved value may reach new rendering contexts that require their own encoding rules.",
        "D": "The destination determines interpretation; storage does not guarantee that content remains plain text."
      }
    },
    "q3": {
      "options": {
        "A": "Standard Razor string rendering encodes HTML-sensitive characters for ordinary HTML display.",
        "B": "Rendering-time encoding does not enforce business validation before data is saved.",
        "C": "Normal encoding treats strings as data instead of automatically trusting stored HTML.",
        "D": "Client-side rendering code needs separate review beyond server-side Razor output behavior."
      }
    },
    "q4": {
      "options": {
        "A": "Raw helpers permit rendering and do not inherently prevent stored content from appearing.",
        "B": "Bypassing encoding can expose executable markup rather than make every value safer.",
        "C": "Raw output skips normal protection and requires narrowly controlled, reviewed content paths.",
        "D": "Ordinary string display can use Razor's standard encoded rendering without raw helpers."
      }
    },
    "q5": {
      "options": {
        "A": "HTML, script, URL, and style contexts do not interpret every character identically.",
        "B": "Each output destination needs handling suitable for its own syntax and interpretation rules.",
        "C": "Encoding prevents syntax confusion and does not establish caller identity or permissions.",
        "D": "Encoding is required at output boundaries rather than being only a database-storage concern."
      }
    },
    "q6": {
      "options": {
        "A": "Permitted markup needs specialized sanitization and a well-defined allowed-content policy.",
        "B": "Rich text can be stored and edited when its display and transformation rules are controlled.",
        "C": "Allowing intentional formatting requires distinguishing supported markup from unsafe executable content.",
        "D": "Formatting capability enlarges interpretation choices and does not automatically make content safer."
      }
    },
    "q7": {
      "options": {
        "A": "Sanitization is commonly relevant to rich browser content rather than only logs.",
        "B": "Sanitization and encoding address different stages and cannot be treated as identical operations.",
        "C": "Encoding controls representation and does not establish business acceptability of a value.",
        "D": "Sanitize allowed rich structure, then use encoding appropriate to the remaining output context."
      }
    },
    "q8": {
      "options": {
        "A": "A client can insert JSON string values into unsafe markup despite safe transport serialization.",
        "B": "Browser code chooses rendering sinks and can change how a returned value is interpreted.",
        "C": "API values commonly appear in pages, components, reports, and administrative interfaces.",
        "D": "Structured API output becomes risky when a client reinterprets untrusted data as executable structure."
      }
    },
    "q9": {
      "options": {
        "A": "CSP can constrain browser behavior but complements safe rendering and correct contextual encoding.",
        "B": "CSP governs browser content behavior rather than database record access.",
        "C": "Rich-text paths still need review even when a content security policy is configured.",
        "D": "CSP does not permanently repair every unsafe rendering path or browser-specific behavior."
      }
    },
    "q10": {
      "options": {
        "A": "Tenant access is an authorization decision rather than an output-encoding property.",
        "B": "Validation checks accepted domain values; encoding preserves their data meaning in a chosen destination.",
        "C": "Validation does not automatically select the correct encoder for every later output sink.",
        "D": "All users' rendering paths can handle untrusted data and need suitable controls."
      }
    },
    "q11": {
      "options": {
        "A": "Review every path that turns values into browser content, including shared helpers.",
        "B": "Build-only files do not cover the application's rendering and rich-content attack surface.",
        "C": "These sinks and reusable components can bypass or change normal browser output protections.",
        "D": "Migration filenames alone do not reveal how user-controlled values become browser content."
      }
    },
    "q12": {
      "options": {
        "A": "Popularity does not establish safe configuration or timely security maintenance.",
        "B": "Editors and UI libraries still require explicit decisions about allowed content and output sinks.",
        "C": "Such dependencies can directly parse or render content and influence browser execution.",
        "D": "Review dependency behavior, configuration, updates, and trust assumptions around content transformations."
      }
    }
  }
};
