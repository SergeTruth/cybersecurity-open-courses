window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Keep Data Separate from Instructions",
  "codeExamples": [
    {
      "title": "Validate a Request Payload at the Boundary",
      "language": "javascript",
      "code": `class ValidationError extends Error {}

function parseSignupRequest(raw) {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw) ||
      Object.getPrototypeOf(raw) !== Object.prototype ||
      !Object.hasOwn(raw, "email") || !Object.hasOwn(raw, "displayName") ||
      !Object.hasOwn(raw, "role")) {
    throw new ValidationError("request body must be a plain JSON object");
  }
  const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
  const displayName = typeof raw.displayName === "string" ? raw.displayName.trim() : "";
  const role = typeof raw.role === "string" ? raw.role.trim() : "";
  const errors = [];

  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email) || email.length > 254) {
    errors.push("email must pass a basic address sanity check");
  }
  if (!/^[A-Za-z][A-Za-z0-9 _.-]{1,39}$/.test(displayName)) {
    errors.push("displayName must be 2 to 40 safe characters");
  }
  if (!new Set(["viewer", "editor"]).has(role)) {
    errors.push("role must be viewer or editor");
  }
  if (errors.length > 0) throw new ValidationError(errors.join("; "));
  return { email, displayName, role };
}

console.log(parseSignupRequest({
  email: " NewUser@example.com ", displayName: "New User", role: "viewer",
}));
`
    },
    {
      "title": "Convert Query Strings into Typed Values",
      "language": "javascript",
      "code": `const SORTS = new Map([
  ["name", "p.name"], ["newest", "p.created_at"], ["price", "p.price_cents"],
]);
const DIRECTIONS = new Map([["asc", "ASC"], ["desc", "DESC"]]);

function parseCanonicalLimit(value) {
  const text = value === undefined ? "25" : value;
  if (typeof text !== "string" || !/^[1-9][0-9]*$/.test(text)) {
    throw new Error("limit must be canonical decimal text");
  }
  const limit = Number(text);
  if (!Number.isSafeInteger(limit) || limit > 50) {
    throw new Error("limit must be an integer from 1 to 50");
  }
  return limit;
}

function parseProductSearch(query) {
  const term = typeof query.q === "string" ? query.q.trim() : "";
  const sort = typeof query.sort === "string" ? query.sort.trim() : "name";
  const direction = typeof query.direction === "string" ? query.direction.trim() : "asc";
  const sortColumn = SORTS.get(sort);
  const sortDirection = DIRECTIONS.get(direction);
  const limit = parseCanonicalLimit(query.limit);

  if (!/^[A-Za-z0-9 ._-]{1,80}$/.test(term)) throw new Error("q is invalid");
  if (sortColumn === undefined || sortDirection === undefined) {
    throw new Error("sort option is unsupported");
  }
  return { term, sortColumn, sortDirection, limit };
}

async function searchProducts(db, query) {
  const input = parseProductSearch(query);
  const sql = "SELECT id, name, price_cents FROM products p " +
    "WHERE p.name ILIKE $1 ORDER BY " + input.sortColumn + " " +
    input.sortDirection + " LIMIT $2";
  return db.query(sql, ["%" + input.term + "%", input.limit]);
}

for (const invalidLimit of ["0x10", "1e1"]) {
  try {
    parseCanonicalLimit(invalidLimit);
    throw new Error("unexpected acceptance");
  } catch (error) {
    if (!error.message.includes("canonical")) throw error;
  }
}
`
    }
  ]
};
