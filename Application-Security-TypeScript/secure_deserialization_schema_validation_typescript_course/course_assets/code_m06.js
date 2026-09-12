window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Separate a public input contract from entity mutation. The first example uses the profile contract from module 3; the second is an executable, deliberately narrow coercion function.",
  "codeExamples": [
    {
      "title": "Map only permitted fields",
      "language": "typescript",
      "blurb": "parseProfileUpdate is the runtime adapter from module 3. auth.userId comes from verified authentication. The schema rejects null; omission leaves a field unchanged. The repository must perform only this authorized, scoped update.",
      "code": "const input = parseProfileUpdate(req.body);\nawait requirePermission(auth, auth.userId, \"profile:update\");\n\nconst update: { displayName?: string; timezone?: string } = {};\nif (input.displayName !== undefined) {\n  update.displayName = input.displayName;\n}\nif (input.timezone !== undefined) {\n  update.timezone = input.timezone;\n}\nawait profileRepository.update(auth.userId, update);\n// Never replace this with Object.assign(existingUser, req.body)."
    },
    {
      "title": "An explicit textual boolean contract",
      "language": "typescript",
      "blurb": "Only actual booleans and the exact lowercase strings true and false are accepted. Empty strings, numbers, whitespace, and other spellings are rejected by this example policy.",
      "code": "function parseBooleanText(value: unknown): boolean {\n  if (value === true || value === \"true\") return true;\n  if (value === false || value === \"false\") return false;\n  throw new Error(\"Invalid boolean\");\n}\n\n// Boolean(\"false\") evaluates to true; it is not this contract."
    }
  ]
};
