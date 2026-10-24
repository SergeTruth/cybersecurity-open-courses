window.COURSE_MODULE = {
  "title": "Loading Configuration Safely",
  "graphicAlt": "Loading checks size, encoding and complete reads before passing configuration onward.",
  "narration": "Safe configuration parsing begins with safe loading. The program should define what happens when the file is missing, cannot be opened, is unreadable, is too large, or is only partially read. Those cases should not be surprising side paths; they are part of the parser contract.\n\nFile size and line length limits protect parser assumptions. A configuration file may be generated incorrectly, truncated, concatenated, or edited by hand. Explicit limits keep memory use, buffer handling, and parse time under control before the data reaches deeper logic.\n\nUnexpected binary data, embedded null bytes, or invalid text for the expected encoding should be handled predictably. A byte sequence that is valid for one parser may be invalid for another. The loader and parser should agree on whether configuration is treated as text, structured bytes, or a specific encoded format.\n\nPartial reads should not become trusted configuration state. If the loader cannot read the full configuration source, the program should avoid applying a half-loaded result unless the format explicitly supports incremental records and the parser can validate each record independently.\n\nPermissions and location awareness also matter. The parser should know which file it intended to load, which deployment layer provided it, and whether failure should stop startup, fall back to defaults, or keep a prior known-good configuration. That behavior should be documented rather than guessed.",
  "narrationPoints": [
    "The program should define what happens when the file is missing, cannot be opened, is unreadable, is too large.",
    "Explicit limits keep memory use, buffer handling, and parse time under control before the data reaches deeper logic.",
    "Unexpected binary data, embedded null bytes, or invalid text for the expected encoding should be handled predictably.",
    "Partial reads should not become trusted configuration state.",
    "The parser should know which file it intended to load, which deployment layer provided it, and whether failure should stop startup."
  ]
};
