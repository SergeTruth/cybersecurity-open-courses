window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secrets, Sensitive Data, and Encryption with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Configure MongoDB client-side field encryption",
      "language": "javascript",
      "blurb": "The encrypted-fields map requires a valid BSON UUID for each field and rejects byte-identical keys; provision distinct taxId and notes data keys through the key manager.",
      "code": "function assertMongoDataKeyId(keyId) {\n  const bsonType = keyId?._bsontype;\n  const bytes = keyId?.buffer;\n  const length = typeof keyId?.length === \"function\" ? keyId.length() : keyId?.position ?? bytes?.byteLength;\n  if ((bsonType !== \"Binary\" && bsonType !== \"UUID\") || keyId.sub_type !== 4 ||\n      !ArrayBuffer.isView(bytes) || length !== 16 || bytes.byteLength < length) {\n    throw new TypeError(\"MongoDB BSON UUID data key required\");\n  }\n  return keyId;\n}\n\nexport function customerEncryptionOptions(keyVaultNamespace, keyIds, kmsProviders) {\n  const taxIdKey = assertMongoDataKeyId(keyIds?.taxId);\n  const notesKey = assertMongoDataKeyId(keyIds?.notes);\n  const bytes = key => Buffer.from(key.buffer.buffer, key.buffer.byteOffset, 16);\n  if (bytes(taxIdKey).equals(bytes(notesKey))) throw new TypeError(\"each encrypted field requires a distinct data key\");\n  return { keyVaultNamespace, kmsProviders, encryptedFieldsMap: {\n    \"app.customers\": { fields: [\n      { path: \"taxId\", bsonType: \"string\", keyId: taxIdKey, queries: { queryType: \"equality\" } },\n      { path: \"notes\", bsonType: \"string\", keyId: notesKey }\n    ] }\n  } };\n}\n"
    },
    {
      "title": "Label a managed MongoDB deployment without parsing its URI",
      "language": "javascript",
      "blurb": "Diagnostics accept an opaque configuration reference and return approved metadata, so replica-set hosts, credentials, and URI options never enter logs.",
      "code": "export function databaseDeploymentLabel(connectionReference, approvedDeployments) {\n  if (typeof connectionReference !== \"string\") throw new TypeError(\"connection reference required\");\n  const deployment = approvedDeployments.get(connectionReference);\n  if (!deployment || typeof deployment.label !== \"string\" || deployment.tlsRequired !== true) {\n    throw new Error(\"database deployment not approved\");\n  }\n  return { deployment: deployment.label, tlsRequired: true };\n}\n"
    }
  ]
};
