window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Test Injection Controls",
  "codeExamples": [
    {
      "title": "Test Query Structure and Bound Values",
      "language": "javascript",
      "code": "import { describe, expect, it } from \"vitest\";\n\ndescribe(\"buildUserListQuery\", () => {\n  it(\"maps sort options to allowlisted SQL structure\", () => {\n    const sql = buildUserListQuery({ sortBy: \"email\", direction: \"asc\" });\n    expect(sql).toContain(\"ORDER BY email ASC\");\n    expect(sql).toContain(\"LIMIT $1\");\n  });\n\n  it(\"rejects unsupported sort fields\", () => {\n    expect(() => buildUserListQuery({ sortBy: \"role\", direction: \"asc\" }))\n      .toThrow(\"unsupported sort option\");\n  });\n});"
    },
    {
      "title": "Test NoSQL Filter Shape",
      "language": "javascript",
      "code": "import { describe, expect, it } from \"vitest\";\n\ndescribe(\"parseTicketFilter\", () => {\n  it(\"rejects unknown fields\", () => {\n    expect(() => parseTicketFilter({ status: \"open\", role: \"admin\" }))\n      .toThrow(\"unsupported filter field\");\n  });\n\n  it(\"constructs an application-owned query object\", () => {\n    const query = buildTicketQuery(parseTicketFilter({ status: \"open\" }));\n    expect(query).toEqual({ status: \"open\" });\n  });\n});"
    }
  ]
};
