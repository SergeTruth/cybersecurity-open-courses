window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Conceptual integration with an established envelope-encryption service. No custom cipher or wrapping format is implemented by this excerpt.",
  "codeExamples": [
    {
      "title": "Keep the KEK handle separate from stored data",
      "language": "typescript",
      "blurb": "The service uses an approved DEK/KEK design, wraps the DEK, and returns only the protected envelope. Context binding and authorization apply to both unwrap and bulk decryption. Plaintext DEKs may exist transiently inside the application/service performing local encryption.",
      "code": "const kekHandle = keyPolicy.approvedWrappingKey({\n  purpose: \"customer-secret\",\n  environment: \"production\"\n});\n\nconst envelope = await envelopeService.encrypt({\n  kekHandle,\n  plaintext,\n  expectedContext: {\n    tenantId: resource.tenantId,\n    recordId: resource.id\n  }\n});\n\nawait repository.storeEnvelope(resource.id, envelope);\n// Store the wrapped DEK and ciphertext, never the plaintext DEK.\n// The KEK itself remains in the managed key infrastructure.\n// Do not dump service responses containing plaintext keys into logs."
    }
  ]
};
