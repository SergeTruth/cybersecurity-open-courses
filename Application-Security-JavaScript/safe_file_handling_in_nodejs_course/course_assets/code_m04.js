window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Filenames, Metadata, and File Type Decisions through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Normalize a filename only for safe display",
      "language": "javascript",
      "blurb": "The original filename is reduced to printable text for logs and user interfaces; it is never reused as a server-side storage pathname.",
      "code": "const MAXIMUM_SUPPLIED_NAME_BYTES = 4096;\n\nexport function displayFilename(value) {\n  const suppliedName = typeof value === \"string\" ? value : \"unnamed\";\n  if (Buffer.byteLength(suppliedName, \"utf8\") > MAXIMUM_SUPPLIED_NAME_BYTES) {\n    throw new RangeError(\"supplied filename exceeds input limit\");\n  }\n  const name = suppliedName.toWellFormed().normalize(\"NFC\")\n    .replace(/[\\u0000-\\u001f\\u007f]/g, \"\");\n  const leaf = name.split(/[\\\\/]/).at(-1).trim() || \"unnamed\";\n  return Array.from(leaf).slice(0, 120).join(\"\");\n}\n"
    },
    {
      "title": "Identify supported content from trusted leading bytes",
      "language": "javascript",
      "blurb": "The detector ignores extensions and caller-declared MIME values, matching a small approved signature set from bytes read by the application.",
      "code": "const signatures = [\n  { type: \"image/png\", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },\n  { type: \"application/pdf\", bytes: [0x25, 0x50, 0x44, 0x46, 0x2d] }\n];\n\nexport function identifyApprovedContent(prefix) {\n  if (!Buffer.isBuffer(prefix)) throw new TypeError(\"byte prefix required\");\n  return signatures.find((entry) => entry.bytes.every((byte, index) => prefix[index] === byte))?.type ?? null;\n}\n"
    }
  ]
};
