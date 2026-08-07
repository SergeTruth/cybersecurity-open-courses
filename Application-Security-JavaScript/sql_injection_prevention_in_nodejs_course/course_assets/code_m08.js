window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Errors, Logging, Secrets, and Safe Responses through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Map database errors through a fixed client catalog",
      "language": "javascript",
      "blurb": "The API response uses approved status and message values, while SQL text, parameters, table names, and driver messages remain internal.",
      "code": "function safeErrorCode(error) {\n  try { return typeof error?.code === \"string\" ? error.code : undefined; }\n  catch { return undefined; }\n}\n\nexport function publicSqlError(error) {\n  const catalog = new Map([[\"23505\", [409, \"CONFLICT\", \"Resource conflict\"]], [\"23503\", [409, \"REFERENCE_CONFLICT\", \"Related resource conflict\"]],\n    [\"22P02\", [400, \"INVALID_VALUE\", \"Invalid request value\"]]]);\n  const [status, code, message] = catalog.get(safeErrorCode(error)) ??\n    [500, \"INTERNAL_ERROR\", \"Request failed\"];\n  return Object.freeze({\n    status, body: Object.freeze({ error: Object.freeze({ code, message }) })\n  });\n}\n"
    },
    {
      "title": "Create SQL telemetry without queries or values",
      "language": "javascript",
      "blurb": "The event records an allowlisted operation, model, duration bucket, row-count bucket, and outcome while excluding SQL text and bound values.",
      "code": "const operations = new Set([\"account.lookup\", \"invoice.list\", \"invoice.close\"]);\nconst maximumMeasuredDurationMs = 24 * 60 * 60 * 1000;\n\nexport function sqlOperationMetric(operation, elapsedMs, rowCount, failed) {\n  if (!operations.has(operation) ||\n      !Number.isSafeInteger(elapsedMs) || elapsedMs < 0 || elapsedMs > maximumMeasuredDurationMs ||\n      !Number.isSafeInteger(rowCount) || rowCount < 0 || typeof failed !== \"boolean\") {\n    throw new TypeError(\"validated SQL operation evidence required\");\n  }\n  return Object.freeze({\n    event: \"sql_operation\", operation, outcome: failed ? \"failure\" : \"success\",\n    duration: elapsedMs < 50 ? \"lt50ms\" : elapsedMs < 500 ? \"lt500ms\" : \"gte500ms\",\n    rows: rowCount === 0 ? \"zero\" : rowCount < 100 ? \"lt100\" : \"gte100\"\n  });\n}\n"
    }
  ]
};
