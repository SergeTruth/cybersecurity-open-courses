window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating at the Boundary",
  "codeExamples": [
    {
      "title": "Code Example: Validating at the Boundary",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function expectValidationError(action) {
  try {
    action();
  } catch (error) {
    if (error instanceof ValidationError) {
      return;
    }
    throw error;
  }
  throw new Error("expected ValidationError");
}

function parseSignup(raw) {
  const errors = [];

  /* Contract: raw is a JSON-decoded request body with own data properties. */
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new ValidationError("payload must be an object");
  }

  const rawEmail = Object.hasOwn(raw, "email") && typeof raw.email === "string"
    ? raw.email.trim()
    : "";
  const separator = rawEmail.lastIndexOf("@");
  const email = separator > 0 && separator < rawEmail.length - 1
    ? rawEmail.slice(0, separator) + "@" + rawEmail.slice(separator + 1).toLowerCase()
    : rawEmail;
  const age = Object.hasOwn(raw, "age") ? raw.age : undefined;

  /* This is a lightweight sanity check, not complete email verification. */
  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email) || email.length > 254) {
    errors.push("email is invalid");
  }

  if (typeof age !== "number" || !Number.isInteger(age) || age < 13 || age > 120) {
    errors.push("age must be a JSON integer between 13 and 120");
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join("; "));
  }
  return { email, age };
}

const signup = parseSignup({ email: "User@Example.COM ", age: 30 });
assert(signup.email === "User@example.com", "only the email domain should be lowercased");

for (const nonNumber of ["0x1e", "3e1"]) {
  expectValidationError(() => parseSignup({
    email: "user@example.com", age: nonNumber,
  }));
}
expectValidationError(() => parseSignup(Object.create({
  email: "inherited@example.com", age: 30,
})));
`
    }
  ]
};
