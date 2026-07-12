window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Build SQL Safely",
  "codeExamples": [
    {
      "title": "Use Parameterized Queries",
      "language": "javascript",
      "code": `async function loadUserByEmail(pool, rawEmail) {
  if (typeof rawEmail !== "string") throw new Error("email is invalid");
  const email = rawEmail.trim().toLowerCase();
  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
    throw new Error("email is invalid");
  }
  const result = await pool.query(
    "SELECT id, email, display_name FROM users WHERE email = $1",
    [email],
  );
  return result.rows[0] || null;
}
`
    },
    {
      "title": "Allowlist Dynamic Sort Structure with Maps",
      "language": "javascript",
      "code": `const SORT_COLUMNS = new Map([
  ["created", "created_at"], ["name", "display_name"], ["email", "email"],
]);
const SORT_DIRECTIONS = new Map([["asc", "ASC"], ["desc", "DESC"]]);

function buildUserListQuery({
  sortBy = "created",
  direction = "desc",
  searchText = "",
  limit = 50,
} = {}) {
  const column = SORT_COLUMNS.get(sortBy);
  const order = SORT_DIRECTIONS.get(direction);
  if (column === undefined || order === undefined) {
    throw new Error("unsupported sort option");
  }
  if (typeof searchText !== "string" || searchText.length > 100 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("invalid query value");
  }
  return {
    text: "SELECT id, email, display_name FROM users " +
      "WHERE display_name ILIKE $1 ORDER BY " + column + " " + order +
      " LIMIT $2",
    values: ["%" + searchText + "%", limit],
  };
}

for (const inheritedName of ["constructor", "__proto__", "toString"]) {
  try {
    buildUserListQuery({ sortBy: inheritedName, direction: "asc" });
    throw new Error("expected inherited-name rejection");
  } catch (error) {
    if (!error.message.includes("unsupported")) throw error;
  }
}
`
    },
    {
      "title": "Keep Values Bound Even with Query Builders",
      "language": "javascript",
      "code": `async function findOrders(knex, { customerId, status }) {
  const allowedStatuses = new Set(["draft", "paid", "shipped"]);
  if (typeof customerId !== "string" || !allowedStatuses.has(status)) {
    throw new Error("order filter is invalid");
  }
  return knex("orders")
    .select("id", "status", "total_cents")
    .where({ customer_id: customerId })
    .andWhere("status", "=", status)
    .limit(50);
}
`
    }
  ]
};
