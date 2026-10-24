window.COURSE_MODULE = {
  "title": "Wrappers, Boundaries, and Safe Use",
  "graphicAlt": "A narrow wrapper centralizes validation, errors and resource ownership around a dependency.",
  "narration": "A dependency does not need to spread through the entire codebase. A narrow wrapper can centralize validation, error handling, ownership rules, resource cleanup, logging, metrics, and version-specific behavior. This is especially valuable for parsers, cryptographic libraries, compression libraries, image libraries, networking libraries, and platform APIs.\n\nWrappers reduce coupling. Application code can depend on a small internal interface instead of every detail of the third-party API. If the library changes, is replaced, or requires a configuration update, the team has fewer call sites to review. A wrapper can also hide functions that are not appropriate for the product, so engineers are guided toward the approved usage pattern.\n\nBoundary validation is part of safe use. Inputs should be checked before calling library functions when the application can make useful decisions about size, format, path location, encoding, or policy. Outputs and errors should be normalized so callers do not have to understand every library-specific return convention. Logging should reveal useful operational context without exposing sensitive data.\n\nResource ownership should be explicit. C++ integrations often involve handles, contexts, buffers, callbacks, and custom allocators. The wrapper should make lifetime, cleanup, thread-safety, and exception behavior clear. Good boundaries do not make a dependency perfect, but they make risky behavior easier to contain, test, monitor, and replace when the product evolves.",
  "narrationPoints": [
    "A narrow wrapper can centralize validation, error handling, ownership rules, resource cleanup, logging, metrics, and version-specific behavior.",
    "If the library changes, is replaced, or requires a configuration update, the team has fewer call sites to review.",
    "Inputs should be checked before calling library functions when the application can make useful decisions about size, format, path location, encoding, or policy.",
    "Outputs and errors should be normalized so callers do not have to understand every library-specific return convention.",
    "Good boundaries do not make a dependency perfect, but they make risky behavior easier to contain, test, monitor, and replace when the product evolves.",
    "The wrapper should make lifetime, cleanup, thread-safety, and exception behavior clear."
  ]
};
