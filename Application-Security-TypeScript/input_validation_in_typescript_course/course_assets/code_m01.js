window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Bridge Unknown Input to Trusted Types",
  "codeExamples": [
    {
      "title": "Parse Unknown Input into a Trusted Object",
      "language": "typescript",
      "code": "type Signup = {\n  email: string;\n  age: number;\n};\n\ntype ParseResult<T> =\n  | { ok: true; value: T }\n  | { ok: false; errors: string[] };\n\nexport function parseSignup(raw: unknown): ParseResult<Signup> {\n  const errors: string[] = [];\n\n  if (typeof raw !== \"object\" || raw === null || Array.isArray(raw)) {\n    return { ok: false, errors: [\"payload must be an object\"] };\n  }\n\n  const record = raw as Record<string, unknown>;\n  const email = typeof record.email === \"string\" ? record.email.trim().toLowerCase() : \"\";\n  const age = typeof record.age === \"number\" ? record.age : Number(record.age);\n\n  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email) || email.length > 254) {\n    errors.push(\"email is invalid\");\n  }\n  if (!Number.isInteger(age) || age < 13 || age > 120) {\n    errors.push(\"age must be an integer from 13 to 120\");\n  }\n\n  return errors.length > 0 ? { ok: false, errors } : { ok: true, value: { email, age } };\n}"
    },
    {
      "title": "Keep Raw and Trusted Values Separate",
      "language": "typescript",
      "code": "async function handleSignupRequest(body: unknown) {\n  const parsed = parseSignup(body);\n\n  if (!parsed.ok) {\n    return { status: 400, body: { errors: parsed.errors } };\n  }\n\n  // Downstream code receives the validated shape, not the original unknown payload.\n  await createAccount(parsed.value);\n  return { status: 201, body: { created: true } };\n}\n\nasync function createAccount(signup: Signup): Promise<void> {\n  await users.insert({\n    email: signup.email,\n    minimumAgeConfirmed: signup.age >= 13,\n  });\n}"
    }
  ]
};
