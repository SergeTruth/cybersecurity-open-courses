window.COURSE_CODE_MODULE = {
  "title": "Code Example: Validating Multiple Input Sources",
  "codeExamples": [
    {
      "title": "Code Example: Validating Multiple Input Sources",
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

function parsePositiveDecimalText(value, name, maximum) {
  if (typeof value !== "string" || !/^[1-9][0-9]*$/.test(value)) {
    throw new ValidationError(name + " must be canonical positive decimal text");
  }
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number > maximum) {
    throw new ValidationError(name + " must be an integer from 1 to " + maximum);
  }
  return number;
}

function parseShortText(value, name, maximum) {
  if (typeof value !== "string") {
    throw new ValidationError(name + " must be text");
  }
  const text = value.trim();
  if (text.length === 0 || text.length > maximum) {
    throw new ValidationError(name + " must be 1 to " + maximum + " characters");
  }
  return text;
}

function parseStoredProfile(serialized) {
  let stored;
  try {
    stored = JSON.parse(serialized);
  } catch {
    throw new ValidationError("stored profile is not valid JSON");
  }
  if (typeof stored !== "object" || stored === null || Array.isArray(stored) ||
      !Object.hasOwn(stored, "displayName")) {
    throw new ValidationError("stored profile has an invalid shape");
  }
  return { displayName: parseShortText(stored.displayName, "displayName", 80) };
}

const query = new URLSearchParams("?pageSize=25");
const pageSize = parsePositiveDecimalText(query.get("pageSize"), "pageSize", 100);
const profile = parseStoredProfile('{"displayName":"Ada"}');
console.log({ pageSize, displayName: profile.displayName });
assert(pageSize === 25, "canonical decimal query input should parse");

for (const invalid of ["0x1e", "3e1"]) {
  expectValidationError(() => parsePositiveDecimalText(invalid, "pageSize", 100));
}

expectValidationError(() => parseStoredProfile("{not-json"));
`
    }
  ]
};
