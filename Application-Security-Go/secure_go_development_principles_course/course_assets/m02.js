window.COURSE_MODULE = {
  "title": "Types, Errors, and Safer Defaults",
  "graphicAlt": "Checked types and small interfaces reduce uncertainty; explicit error handling and tested defaults make safe behavior predictable.",
  "narration": "Go's type system supports defensive design when teams use it deliberately. Concrete types can make important meanings visible. Typed constants can limit supported states. Explicit conversions can force a developer to acknowledge a change in representation. Small interfaces can describe the exact behavior a caller needs rather than granting broad access to an entire object.\n\nBroad interfaces and ambiguous data structures deserve review. A value of type interface{} or any may be necessary near generic boundaries, but it should not become a way to avoid thinking about shape, meaning, and ownership. Type assertions should be checked and close to the boundary where uncertainty exists. Once data is validated, the rest of the application should work with clearer types.\n\nError returns are also security-relevant control flow. An ignored error can turn a failed parse, failed permission check, failed write, failed cleanup, or failed network operation into misleading success. The secure habit is not to panic on every error. It is to decide what each failure means, preserve invariants, return safe responses, and log useful information without exposing sensitive values.\n\nZero values are one of Go's strengths, but they still need context. A zero timeout, empty allowlist, nil map, empty token, or missing configuration value may be safe in one package and risky in another. Defaults should be documented and tested so ordinary use is predictable.\n\nSafer defaults reduce maintenance burden. Constructors, option structs, validation functions, and package APIs should make secure use easier than risky use. The less special knowledge a caller needs, the more reliable the code becomes under deadline pressure.",
  "narrationPoints": [
    "Go's type system supports defensive design when teams use it deliberately.",
    "Broad interfaces and ambiguous data structures deserve review.",
    "Error returns are also security-relevant control flow.",
    "Zero values are one of Go's strengths, but they still need context.",
    "Safer defaults reduce maintenance burden."
  ]
};
