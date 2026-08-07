window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Code Review, and CI/CD Workflow through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Test that attack strings remain parameter values",
      "language": "javascript",
      "blurb": "A recording client proves the SQL text is constant and a syntactically valid, attack-shaped email appears only in the driver's parameter array.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerParameterizedLookupTest(findAccount) {\n  if (typeof findAccount !== \"function\") throw new TypeError(\"account lookup required\");\n  test(\"valid attack-shaped email remains a parameter\", async () => {\n    let query;\n    const client = {\n      query: async (value) => { query = value; return { rows: [] }; }\n    };\n    const payload = \"x'or'1'='1@example.com\";\n    await findAccount(client, \"tenant-1\", payload);\n    assert.equal(query.text.includes(payload), false);\n    assert.deepEqual(query.values, [\"tenant-1\", payload]);\n  });\n}"
    },
    {
      "title": "Flag unsafe SQL construction during review",
      "language": "javascript",
      "blurb": "The source audit identifies template interpolation and string concatenation at driver query calls while leaving final enforcement to an AST-based CI rule.",
      "code": "const MAXIMUM_SQL_REVIEW_BYTES = 1024 * 1024;\n\nexport function suspiciousSqlLines(source) {\n  if (typeof source !== \"string\" ||\n      Buffer.byteLength(source, \"utf8\") > MAXIMUM_SQL_REVIEW_BYTES) {\n    throw new TypeError(\"bounded SQL source text required\");\n  }\n  return Object.freeze(source.split(/\\r?\\n/).flatMap((line, index) => {\n    const queryCall = /\\.(?:query|execute)\\s*\\(/.test(line);\n    const dynamicSql = line.includes(\"$\" + \"{\") ||\n      /[\"'][^\"']*(?:SELECT|UPDATE|DELETE|INSERT)[^\"']*[\"']\\s*\\+/i.test(line);\n    return queryCall && dynamicSql\n      ? [Object.freeze({ line: index + 1, preview: Array.from(line.trim()).slice(0, 160).join(\"\") })]\n      : [];\n  }));\n}\n"
    }
  ]
};
