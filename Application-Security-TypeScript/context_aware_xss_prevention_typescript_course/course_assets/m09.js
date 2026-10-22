window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7f0cef01fa",
  "questions": {
    "q1": {
      "options": {
        "A": "textContent inserts character data without interpreting the message as browser markup or executable HTML.",
        "B": "Choosing a text sink does not validate domain rules such as allowed length or business meaning.",
        "C": "textContent displays markup literally rather than sanitizing and preserving an allowed rich-HTML subset.",
        "D": "Text insertion does not parse, rewrite, or authorize URL destinations appearing in the supplied message."
      }
    },
    "q2": {
      "options": {
        "A": "Context-specific handling is needed regardless of whether data came from a database, request, or another source.",
        "B": "Parser behavior depends on the actual insertion context; universal automatic reversal does not explain the security boundary.",
        "C": "HTML, script, CSS, and URL parsers apply different rules, so defenses must fit the specific sink.",
        "D": "A TypeScript string type does not establish safe syntax, semantics, or permitted values in another language context."
      }
    },
    "q3": {
      "options": {
        "A": "Decoding link labels as HTML would introduce another parsing boundary rather than validate the destination.",
        "B": "Safe serialization prevents certain syntax mistakes, while URL policy must still restrict protocols, origins, and destinations.",
        "C": "A compile-time assertion does not validate the parsed URL or establish that the destination is permitted.",
        "D": "Inline handler attributes introduce executable source contexts instead of resolving link destination policy."
      }
    },
    "q4": {
      "options": {
        "A": "HTML encoding does not universally make external values safe inside an event-handler JavaScript source string.",
        "B": "Moving external data into a style attribute creates another sensitive context without avoiding the core parsing issue.",
        "C": "A trusted-looking type assertion does not change the runtime safety of dynamically constructed handler source.",
        "D": "Registering fixed behavior separately keeps external values as data rather than compiling them into event-handler code."
      }
    },
    "q5": {
      "options": {
        "A": "Ordinary paragraph text should use a text-safe sink without requiring preservation of user-supplied HTML.",
        "B": "URL percent encoding addresses URL components rather than enforcing an allowed rich-markup policy.",
        "C": "Intentional rich HTML needs a maintained parser-based sanitizer configured for the product's reviewed allowed markup.",
        "D": "A sanitizer for one field does not justify disabling default escaping throughout the application."
      }
    },
    "q6": {
      "options": {
        "A": "Normal interpolation generally treats external values as text, while raw HTML requires deliberate trust or sanitization.",
        "B": "Raw-HTML APIs can render formatting, but that capability creates the parsing boundary that needs protection.",
        "C": "Framework text escaping does not automatically authorize URL schemes or validate CSS semantics in other contexts.",
        "D": "Authenticated users can still supply malicious markup, so authentication is not proof of content safety."
      }
    },
    "q7": {
      "options": {
        "A": "Autoescaping protects variable insertion as text and is particularly relevant to non-static external values.",
        "B": "Disabling HTML escaping does not establish allowed URL protocols and can remove unrelated output protection.",
        "C": "One rich-text sanitizer can operate without globally disabling the template engine's escaping behavior.",
        "D": "A narrowly reviewed rich-content path should not weaken default handling of unrelated text throughout the product."
      }
    },
    "q8": {
      "options": {
        "A": "A TypeScript assertion does not invoke a sanitizer or execute any content transformation.",
        "B": "The assertion changes static treatment only; it does not establish encoding, sanitization, provenance, or runtime safety.",
        "C": "Trusted Types enforcement requires browser policy configuration and compatible sink handling beyond a type assertion.",
        "D": "An asserted type does not prove where a value originated or whether its source applied appropriate controls."
      }
    },
    "q9": {
      "options": {
        "A": "CSP can reduce some execution paths but does not replace correct handling at browser injection boundaries.",
        "B": "CSP restricts permitted active content rather than converting untrusted strings into sanitized HTML.",
        "C": "A strong CSP adds protection while safe sinks, context-aware handling, and sanitization remain necessary.",
        "D": "CSP does not determine whether form fields satisfy application-specific validation and business rules."
      }
    },
    "q10": {
      "options": {
        "A": "Enforcement can centralize conversions at covered sinks, but the policies that create trusted values still need review.",
        "B": "Trusted Types does not automatically infer the provenance and trustworthiness of all application data.",
        "C": "Browser support and policy correctness still matter, and sanitizers and complementary protections require maintenance.",
        "D": "Trusted Types addresses covered injection sinks rather than universally controlling cookie access or setting HttpOnly."
      }
    }
  }
};
