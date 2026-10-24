window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Schema Validation, Models, and Safe Updates with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Declare collection-level JSON Schema validation",
      "language": "javascript",
      "blurb": "MongoDB enforces required fields and rejects unknown properties as a defense in depth beneath application validation.",
      "code": "export const accountCollectionValidator = {\n  $jsonSchema: { bsonType: \"object\", required: [\"tenantId\", \"emailNormalized\", \"status\"],\n    additionalProperties: false, properties: {\n      _id: { bsonType: \"objectId\" }, tenantId: { bsonType: \"string\", minLength: 1, maxLength: 64 },\n      emailNormalized: { bsonType: \"string\", maxLength: 254 },\n      status: { enum: [\"active\", \"suspended\"] }, displayName: { bsonType: \"string\", maxLength: 100 },\n      locale: { enum: [\"en\", \"es\", \"fr\"] }, updatedAt: { bsonType: \"date\" }\n    }\n  }\n};\nexport const accountValidationOptions = { validator: accountCollectionValidator, validationLevel: \"strict\", validationAction: \"error\" };\n"
    },
    {
      "title": "Build a safe MongoDB update document",
      "language": "javascript",
      "blurb": "The mapper rejects extra or invalid fields, bounds raw display names, and builds the operators itself. This simple character policy excludes controls and format characters; joining controls require a separate contextual policy.",
      "code": "export function accountProfileUpdate(input) {\n  const allowed = new Set([\"displayName\", \"locale\"]);\n  if (!input || typeof input !== \"object\" || Array.isArray(input) || Object.keys(input).length > 2 ||\n      Object.keys(input).some(key => !allowed.has(key))) throw new TypeError(\"unexpected profile field\");\n  const update = {};\n  if (Object.hasOwn(input, \"displayName\")) {\n    if (typeof input.displayName !== \"string\" || !input.displayName.trim() || input.displayName.length > 100 ||\n        /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Cf}]/u.test(input.displayName)) throw new TypeError(\"display name invalid\");\n    update.displayName = input.displayName.trim();\n  }\n  if (Object.hasOwn(input, \"locale\")) {\n    if (![\"en\", \"es\", \"fr\"].includes(input.locale)) throw new TypeError(\"locale invalid\");\n    update.locale = input.locale;\n  }\n  if (!Object.keys(update).length) throw new TypeError(\"empty profile update\");\n  return { $set: update, $currentDate: { updatedAt: true } };\n}\n"
    }
  ]
};
