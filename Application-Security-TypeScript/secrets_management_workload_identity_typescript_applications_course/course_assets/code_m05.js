window.COURSE_CODE_MODULE = {
  "title": "Types and configuration validation",
  "codeIntro": "TypeScript can clarify interfaces, but runtime values still need access controls and careful handling.",
  "codeExamples": [
    {
      "title": "A type alias adds no confidentiality",
      "language": "typescript",
      "blurb": "The alias is erased at runtime. Validate a value without printing it; do not pass the result to browser code or telemetry.",
      "code": "type Secret = string;\n\nfunction requireDatabasePassword(): Secret {\n  const value = process.env.DB_PASSWORD;\n  if (!value) {\n    throw new Error(\"Database credential is unavailable\");\n  }\n  return value;\n}"
    }
  ]
};
