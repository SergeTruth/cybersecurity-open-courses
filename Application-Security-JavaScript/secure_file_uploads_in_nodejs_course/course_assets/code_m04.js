window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply File Type Validation and Filename Safety through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Match approved upload signatures from file bytes",
      "language": "javascript",
      "blurb": "The server reads signatures from the quarantined object and treats names and multipart Content-Type values only as non-authoritative hints.",
      "code": "export function detectUploadType(prefix) {\n  if (!Buffer.isBuffer(prefix)) throw new TypeError(\"byte prefix required\");\n  if (prefix.length >= 8 &&\n      prefix[0] === 0x89 && prefix[1] === 0x50 && prefix[2] === 0x4e &&\n      prefix[3] === 0x47 && prefix[4] === 0x0d && prefix[5] === 0x0a &&\n      prefix[6] === 0x1a && prefix[7] === 0x0a) {\n    return \"image/png\";\n  }\n  if (prefix.length >= 3 &&\n      prefix[0] === 0xff && prefix[1] === 0xd8 && prefix[2] === 0xff) {\n    return \"image/jpeg\";\n  }\n  if (prefix.length >= 5 &&\n      prefix[0] === 0x25 && prefix[1] === 0x50 && prefix[2] === 0x44 &&\n      prefix[3] === 0x46 && prefix[4] === 0x2d) {\n    return \"application/pdf\";\n  }\n  return null;\n}\n"
    },
    {
      "title": "Generate storage identity independently of the filename",
      "language": "javascript",
      "blurb": "The storage key uses cryptographic randomness and a server-selected suffix, while a separately sanitized display name is retained only as metadata.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nconst MAXIMUM_ORIGINAL_NAME_BYTES = 4096;\n\nconst uploadSuffixes = new Map([\n  [\"image/png\", \".png\"],\n  [\"image/jpeg\", \".jpg\"],\n  [\"application/pdf\", \".pdf\"]\n]);\n\nexport function uploadObjectIdentity(originalName, detectedType) {\n  const suffix = uploadSuffixes.get(detectedType);\n  if (!suffix) throw new TypeError(\"unsupported detected type\");\n  const suppliedName = typeof originalName === \"string\" ? originalName : \"upload\";\n  if (Buffer.byteLength(suppliedName, \"utf8\") > MAXIMUM_ORIGINAL_NAME_BYTES) {\n    throw new RangeError(\"original filename exceeds input limit\");\n  }\n  const leaf = suppliedName.toWellFormed().normalize(\"NFC\")\n    .split(/[\\\\/]/).at(-1).replace(/[\\u0000-\\u001f\\u007f]/g, \"_\");\n  const displayName = Array.from(leaf).slice(0, 120).join(\"\") || \"upload\";\n  return Object.freeze({\n    storageKey: randomBytes(24).toString(\"hex\") + suffix,\n    displayName\n  });\n}\n"
    }
  ]
};
