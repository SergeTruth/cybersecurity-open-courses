window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Build SQL Safely",
  "codeExamples": [
    {
      "title": "Use Parameterized Queries",
      "language": "javascript",
      "code": "async function loadUserByEmail(pool, rawEmail) {\n  const email = String(rawEmail || \"\").trim().toLowerCase();\n  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {\n    throw new Error(\"email is invalid\");\n  }\n\n  const result = await pool.query(\n    \"SELECT id, email, display_name FROM users WHERE email = $1\",\n    [email],\n  );\n\n  return result.rows[0] || null;\n}"
    },
    {
      "title": "Allowlist Dynamic Sort Structure",
      "language": "javascript",
      "code": "const SORT_COLUMNS = Object.freeze({\n  created: \"created_at\",\n  name: \"display_name\",\n  email: \"email\",\n});\n\nconst SORT_DIRECTIONS = Object.freeze({\n  asc: \"ASC\",\n  desc: \"DESC\",\n});\n\nfunction buildUserListQuery({ sortBy = \"created\", direction = \"desc\" }) {\n  const column = SORT_COLUMNS[sortBy];\n  const order = SORT_DIRECTIONS[direction];\n\n  if (!column || !order) {\n    throw new Error(\"unsupported sort option\");\n  }\n\n  return `SELECT id, email, display_name FROM users ORDER BY ${column} ${order} LIMIT $1`;\n}"
    },
    {
      "title": "Keep Values Bound Even with Query Builders",
      "language": "javascript",
      "code": "async function findOrders(knex, { customerId, status }) {\n  const allowedStatuses = new Set([\"draft\", \"paid\", \"shipped\"]);\n  if (!allowedStatuses.has(status)) {\n    throw new Error(\"status is not allowed\");\n  }\n\n  return knex(\"orders\")\n    .select(\"id\", \"status\", \"total_cents\")\n    .where({ customer_id: customerId })\n    .andWhere(\"status\", \"=\", status)\n    .limit(50);\n}"
    }
  ]
};
