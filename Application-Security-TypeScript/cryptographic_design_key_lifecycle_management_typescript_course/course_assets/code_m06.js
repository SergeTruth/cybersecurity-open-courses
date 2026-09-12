window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Illustrative version-aware application records and lookup. Exact representation belongs to the selected library/format; this is not a specification for a new cryptographic protocol.",
  "codeExamples": [
    {
      "title": "Retain the fields required by the selected format",
      "language": "typescript",
      "blurb": "This illustrative version exposes a separate tag, so the tag is required here. Other approved formats may combine nonce, ciphertext, and tag in an opaque payload. Base64 or hex fields are encodings only. The wrapper must validate lengths, decode strictly, bound sizes, and authenticate the required context.",
      "code": "type EncryptedRecord = {\n  formatVersion: 1;\n  keyVersion: string;\n  nonce: string;\n  ciphertext: string;\n  tag: string;\n};\n// TypeScript does not validate stored records at runtime.\n// No assumption that CURRENT_KEY decrypts every historical record."
    },
    {
      "title": "Select only approved historical uses",
      "language": "typescript",
      "blurb": "Conceptual registry and format adapters. parseBoundedEncryptedRecord validates untrusted stored structure. resolve maps identifiers to approved keys and fixed format implementations, with allowed-use checks. Stored labels never become URLs, paths, or arbitrary secret names. The returned plaintext is authenticated against trusted expected context.",
      "code": "const record = parseBoundedEncryptedRecord(storedValue);\nconst approved = keyRegistry.resolve({\n  formatVersion: record.formatVersion,\n  keyVersion: record.keyVersion,\n  purpose: \"customer-secret\",\n  environment: \"production\",\n  use: \"decrypt\"\n});\n\nconst plaintext = await approved.decryptAuthenticated(\n  record, trustedExpectedContext\n);\n// Retired-for-encryption keys may permit historical decrypt by policy.\n// Rewrapping and bulk re-encryption are distinct migration operations."
    }
  ]
};
