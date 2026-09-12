window.COURSE_CODE_MODULE = {
  "title": "A request can lose its observed precondition",
  "codeIntro": "Conceptual TypeScript. This example deliberately separates the balance check from the debit and is unsafe as a concurrency control.",
  "codeExamples": [
    {
      "title": "Unsafe: a stale balance can authorize a later debit",
      "language": "typescript",
      "blurb": "Another writer can change the authoritative balance between these operations. A debit implementation needs its own atomic balance predicate or an appropriate transaction.",
      "code": "// UNSAFE if debitAccount does not enforce the condition itself.\nconst account = await loadAccount(id);\nif (account.balance >= amount) {\n  await debitAccount(id, amount);\n}"
    }
  ]
};
