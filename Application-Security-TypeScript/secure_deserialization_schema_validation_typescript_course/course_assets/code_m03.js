window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "This illustrative JSON Schema uses standard Draft 2020-12 keywords. Run it with a compatible runtime validator; it does not validate anything merely by being declared.",
  "codeExamples": [
    {
      "title": "A narrow profile-update schema",
      "language": "json",
      "blurb": "Both fields are optional, but at least one is required. Null and unknown fields are rejected. The timezone list is a deliberately limited example application policy; schema string length counts Unicode code points.",
      "code": "{\n  \"$schema\": \"https://json-schema.org/draft/2020-12/schema\",\n  \"type\": \"object\",\n  \"minProperties\": 1,\n  \"additionalProperties\": false,\n  \"properties\": {\n    \"displayName\": {\n      \"type\": \"string\",\n      \"minLength\": 1,\n      \"maxLength\": 100\n    },\n    \"timezone\": {\n      \"type\": \"string\",\n      \"enum\": [\n        \"UTC\",\n        \"America/New_York\",\n        \"Europe/London\"\n      ]\n    }\n  }\n}"
    },
    {
      "title": "Use the returned value",
      "language": "typescript",
      "blurb": "Conceptual schema-adapter API. parseProfileUpdate runs the profile runtime contract and returns its accepted output. If your validator uses a boolean result instead, an application adapter must establish the equivalent contract explicitly. Mapping and persistence are shown in module 6.",
      "code": "// Unsafe when the parser returns stripped or transformed data:\nProfileSchema.parse(req.body);\nawait database.update(req.body);\n\n// Preferred integration pattern:\nconst input = parseProfileUpdate(req.body);\nconst update = mapProfileUpdate(input);\nawait persistAuthorizedProfileUpdate(auth, update);"
    }
  ]
};
