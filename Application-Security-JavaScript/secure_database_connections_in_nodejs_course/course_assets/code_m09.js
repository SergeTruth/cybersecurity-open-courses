window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Code Review, CI/CD, Migrations, and Operational Governance through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Require separate migration and runtime identities",
      "language": "javascript",
      "blurb": "The deployment gate accepts exact own-data role evidence, requires distinct bounded role names, a validated approval identifier, and exact false values for cross-boundary capabilities.",
      "code": "const deploymentRoleFields = new Set([\n  \"runtimeRole\", \"migrationRole\", \"migrationApprovalId\",\n  \"runtimeCanDdl\", \"migrationCanServeTraffic\"\n]);\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function validateDatabaseDeploymentRoles(config) {\n  const selected = exactDataRecord(config, deploymentRoleFields);\n  if (!selected) throw new TypeError(\"database role configuration required\");\n  const runtimeRole = selected.runtimeRole;\n  const migrationRole = selected.migrationRole;\n  const migrationApprovalId = selected.migrationApprovalId;\n  const runtimeCanDdl = selected.runtimeCanDdl;\n  const migrationCanServeTraffic = selected.migrationCanServeTraffic;\n  const role = /^[a-z][a-z0-9_-]{2,63}$/;\n  const approval = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;\n  if (typeof runtimeRole !== \"string\" || typeof migrationRole !== \"string\" ||\n      !role.test(runtimeRole) || !role.test(migrationRole) ||\n      runtimeRole === migrationRole) {\n    throw new Error(\"database roles must be separate\");\n  }\n  if (typeof migrationApprovalId !== \"string\" ||\n      !approval.test(migrationApprovalId) ||\n      runtimeCanDdl !== false || migrationCanServeTraffic !== false) {\n    throw new Error(\"database role boundary invalid\");\n  }\n  return true;\n}\n"
    },
    {
      "title": "Test pool cleanup after an operation error",
      "language": "javascript",
      "blurb": "A recording client proves that the operation runs inside the transaction and that rollback and release follow its failure in the required order.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerPoolReleaseTest(withTransaction) {\n  if (typeof withTransaction !== \"function\") {\n    throw new TypeError(\"transaction helper required\");\n  }\n  test(\"failed operation rolls back and releases\", async () => {\n    const calls = [];\n    const client = {\n      query: async (sql) => calls.push(sql),\n      release: () => calls.push(\"release\")\n    };\n    await assert.rejects(() => withTransaction(\n      { connect: async () => client },\n      async () => { calls.push(\"operation\"); throw new Error(\"operation failed\"); }\n    ), /operation failed/);\n    assert.deepEqual(calls, [\"BEGIN\", \"operation\", \"ROLLBACK\", \"release\"]);\n  });\n}"
    }
  ]
};
