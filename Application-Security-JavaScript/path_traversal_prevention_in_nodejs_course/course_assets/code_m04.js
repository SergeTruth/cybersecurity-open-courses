window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safer Design with Identifiers and Allowlists with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Map public identifiers to server-owned paths",
      "language": "javascript",
      "blurb": "The route accepts an opaque identifier, while the application chooses the stored filename from a trusted catalog.",
      "code": "import path from \"node:path\";\n\nexport function documentPath(documentId, catalog, storageRoot) {\n  const rawGetRecordCapability = catalog?.get;\n  const getRecord = typeof rawGetRecordCapability === \"function\"\n    ? rawGetRecordCapability.bind(catalog)\n    : null;\n  if (typeof documentId !== \"string\" || !/^[a-f0-9]{32}$/.test(documentId) ||\n      !getRecord || typeof storageRoot !== \"string\" || storageRoot.length < 1) {\n    throw new TypeError(\"document id, trusted catalog, and storage root required\");\n  }\n  const record = getRecord(documentId);\n  const storageName = record?.storageName;\n  if (typeof storageName !== \"string\" ||\n      !/^[a-f0-9]{64}\\.bin$/.test(storageName)) {\n    return null;\n  }\n  return path.join(storageRoot, storageName);\n}\n"
    },
    {
      "title": "Generate an upload filename independently",
      "language": "javascript",
      "blurb": "The storage name is random and extensionless; the original client filename remains untrusted display metadata.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nconst MAXIMUM_ORIGINAL_NAME_BYTES = 4096;\n\nexport function newUploadRecord(originalName) {\n  const suppliedName = typeof originalName === \"string\" ? originalName : \"upload\";\n  if (Buffer.byteLength(suppliedName, \"utf8\") > MAXIMUM_ORIGINAL_NAME_BYTES) {\n    throw new RangeError(\"original filename exceeds input limit\");\n  }\n  const cleaned = suppliedName.toWellFormed().normalize(\"NFC\")\n    .replace(/[\\u0000-\\u001f\\u007f]/g, \"\");\n  const displayName = Array.from(cleaned).slice(0, 120).join(\"\") || \"upload\";\n  return Object.freeze({\n    id: randomBytes(16).toString(\"hex\"),\n    storageName: randomBytes(32).toString(\"hex\") + \".bin\",\n    displayName\n  });\n}\n"
    }
  ]
};
