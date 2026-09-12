window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Conceptual application interfaces, not a third-party library API. cryptoService wraps a vetted AEAD construction and owns algorithms, keys, nonce generation, record encoding, and authentication failure handling.",
  "codeExamples": [
    {
      "title": "Bind the authorized record context",
      "language": "typescript",
      "blurb": "The repository checks record and tenant access. Expected context comes from that authorized record, not from fields supplied beside the ciphertext. The service uses a stable context encoding and returns only authenticated plaintext. If freshness is required, enforce it separately.",
      "code": "const resource = await repository.findAuthorized(auth, recordId);\n\nconst plaintext = await cryptoService.decrypt({\n  record: resource.encryptedValue,\n  purpose: \"customer-secret\",\n  expectedAssociatedData: {\n    tenantId: resource.tenantId,\n    recordId: resource.id,\n    schemaVersion: resource.schemaVersion\n  }\n});\n\nreturn plaintext;\n// Decrypt either returns authenticated plaintext or throws.\n// Never stream provisional decipher.update() output to a caller."
    },
    {
      "title": "Centralize encryption policy",
      "language": "typescript",
      "blurb": "The service generates a valid nonce under the selected key's policy and returns a versioned library-approved representation, including every required nonce/tag field. Associated data is authenticated but not encrypted.",
      "code": "const encrypted = await cryptoService.encrypt({\n  plaintext,\n  purpose: \"customer-secret\",\n  associatedData: {\n    tenantId: resource.tenantId,\n    recordId: resource.id,\n    schemaVersion: resource.schemaVersion\n  }\n});\n// Callers do not select arbitrary algorithms, keys, or nonces."
    }
  ]
};
