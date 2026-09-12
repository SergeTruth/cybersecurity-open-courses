window.COURSE_CODE_MODULE = {
  "title": "Enforce the condition inside the mutation",
  "codeIntro": "Conceptual SQL and TypeScript. Named placeholders represent bound parameters; actual syntax and returned-row metadata vary by database.",
  "codeExamples": [
    {
      "title": "Condition and decrement form one operation",
      "language": "sql",
      "blurb": "The item identifier is unique within the tenant. Quantity is non-null. This statement assumes the database provides documented atomic conditional-update semantics; handle transaction conflicts according to that database.",
      "code": "UPDATE inventory\nSET quantity = quantity - 1\nWHERE tenant_id = :tenantId\n  AND id = :itemId\n  AND quantity > 0;"
    },
    {
      "title": "Check whether the transition occurred",
      "language": "typescript",
      "blurb": "The repository implements the statement above and reports success after commit. Authorization and input validation happen separately. Zero can mean missing, inaccessible, or unavailable according to the API's disclosure policy.",
      "code": "const result = await repository.decrementIfAvailable({\n  tenantId: auth.tenantId,\n  itemId\n});\nif (result.affectedRows !== 1) {\n  throw new AvailabilityConflictError();\n}\n// If a reservation row is also required, use one transaction\n// for both writes as shown in Module 4."
    }
  ]
};
