window.COURSE_MODULE = {
  "title": "Migration from Unsafe String Usage",
  "graphicAlt": "String migration inventories and prioritizes call sites, adds tests, reviews replacement semantics, and rolls out gradually instead of blindly replacing function names.",
  "narration": "Migrating legacy string code should be deliberate. Start by inventorying call sites and grouping them by behavior: copying, concatenation, formatting, parsing, path construction, protocol fields, logging, and dynamic allocation. This gives the team a map of where risk and complexity are concentrated.\n\nPrioritize paths where string behavior affects trust, parsing, storage, configuration, external input, or resource selection. A low-risk display-only buffer may not need the same urgency as a parser that controls application state. Migration should focus first on code where hidden assumptions have the highest impact.\n\nAdd tests before replacement. Existing behavior may be flawed, but it is still behavior the system may depend on. Boundary tests, truncation tests, empty-string tests, malformed-input tests, and ownership tests help reveal whether the new API changes semantics intentionally or accidentally.\n\nAvoid blind mechanical replacement. A new function may have different truncation behavior, termination guarantees, return values, error codes, allocation ownership, or portability. Replacing names without reviewing semantics can make the code look modern while changing the program in unintended ways.\n\nMigrate incrementally with approved conventions. Introduce project wrappers where they clarify repeated behavior. Document how truncation is handled. Update review checklists. Keep changes small enough to test and understand. The point is not a cosmetic rename; the point is to make string behavior explicit and repeatable.",
  "narrationPoints": [
    "Start by inventorying call sites and grouping them by behavior: copying, concatenation, formatting, parsing, path construction.",
    "Migration should focus first on code where hidden assumptions have the highest impact.",
    "Boundary tests, truncation tests, empty-string tests, malformed-input tests.",
    "Replacing names without reviewing semantics can make the code look modern.",
    "The point is not a cosmetic rename; the point is to make string behavior explicit and repeatable."
  ]
};
