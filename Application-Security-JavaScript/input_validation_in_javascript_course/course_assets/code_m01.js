window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating at the Boundary",
  "codeExamples": [
    {
      "title": "Code Example: Validating at the Boundary",
      "language": "javascript",
      "code": "class ValidationError extends Error {}\n\nfunction parseSignup(raw) {\n  const errors = [];\n\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    throw new ValidationError(\"payload must be an object\");\n  }\n\n  const email = typeof raw.email === \"string\" ? raw.email.trim().toLowerCase() : \"\";\n  const age = Number(raw.age);\n\n  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email) || email.length > 254) {\n    errors.push(\"email is invalid\");\n  }\n\n  if (!Number.isInteger(age) || age < 13 || age > 120) {\n    errors.push(\"age must be an integer between 13 and 120\");\n  }\n\n  if (errors.length > 0) {\n    throw new ValidationError(errors.join(\"; \"));\n  }\n\n  return { email, age };\n}\n\nconst signup = parseSignup({ email: \"User@example.com \", age: \"30\" });\nconsole.log(signup);"
    }
  ]
};
