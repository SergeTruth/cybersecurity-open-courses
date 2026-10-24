window.COURSE_MODULE = {
  "title": "File Paths and Resource Arguments",
  "graphicAlt": "Path input passes length/shape review, explicit base-resolution gate, role/scope verification, then specific resource operation.",
  "narration": "File paths, directory paths, resource names, and identifiers are common command-line values. They deserve validation before the program opens, creates, deletes, modifies, or logs resources. A path-like value is not safe just because it arrived as an argument string.\n\nStart with basic shape. Empty values, overly long values, unsupported characters, unexpected separators, or values outside the accepted naming rules should be rejected according to the tool's contract. Length limits should be applied before copying into internal buffers or building derived paths.\n\nCurrent working directory assumptions should be explicit. A relative path can refer to different resources depending on where the process was launched. If the tool expects paths relative to a workspace, configuration directory, or explicit root, the parser and resource layer should agree on that rule.\n\nNormalization and canonicalization decisions should be deliberate. Some tools preserve the user's path text for display. Others resolve paths before comparing or enforcing intended scope. The important part is to apply the rule before resource-changing operations and to avoid mixing unresolved and resolved interpretations.\n\nExpected file modes and locations also matter. A value meant to name an existing input file is different from a value meant to name a new output file or a directory. The parser and validation layer should make those resource roles clear before the program acts.",
  "narrationPoints": [
    "File paths, directory paths, resource names, and identifiers are common command-line values.",
    "Length limits should be applied before copying into internal buffers or building derived paths.",
    "A relative path can refer to different resources depending on where the process was launched.",
    "The important part is to apply the rule before resource-changing operations and to avoid mixing unresolved and resolved interpretations.",
    "The parser and validation layer should make those resource roles clear before the program acts."
  ]
};
