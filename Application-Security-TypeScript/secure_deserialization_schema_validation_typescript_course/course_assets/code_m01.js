window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Review the transition from unverified input to an explicit runtime contract. Application helpers below describe integration responsibilities; they are not built-in TypeScript or validator APIs.",
  "codeExamples": [
    {
      "title": "Unsafe: an assertion supplies no runtime evidence",
      "language": "typescript",
      "blurb": "JSON syntax can be valid while AccountUpdate's required fields, value rules, and authorization requirements are unsatisfied.",
      "code": "// Unsafe boundary: do not use as an implementation.\nconst payload = JSON.parse(rawBody) as AccountUpdate;\nawait updateAccount(payload);"
    },
    {
      "title": "Make the accepted value explicit",
      "language": "typescript",
      "blurb": "Conceptual application flow. readBoundedJsonText must limit bytes while reading, including decoded size if compression is supported. AccountUpdateSchema must implement runtime checks and return the accepted object. Rejection stops this flow; service.applyAuthorized enforces semantics and commit invariants.",
      "code": "const rawBody = await readBoundedJsonText(request);\nconst candidate: unknown = JSON.parse(rawBody);\nconst input = AccountUpdateSchema.parse(candidate);\nawait requirePermission(auth, input.accountId, \"account:update\");\nconst command = mapPermittedAccountFields(input);\nawait service.applyAuthorized(auth, command);"
    }
  ]
};
