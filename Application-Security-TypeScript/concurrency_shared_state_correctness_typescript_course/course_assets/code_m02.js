window.COURSE_CODE_MODULE = {
  "title": "Recognize the read-check-write gap",
  "codeIntro": "Conceptual repository calls. The defect exists regardless of the ORM or database client used.",
  "codeExamples": [
    {
      "title": "Unsafe: replacing quantity from a stale snapshot",
      "language": "typescript",
      "blurb": "Two requests can both read quantity 1 and both store 0. The final quantity alone does not reveal that both requests may have accepted a sale.",
      "code": "const item = await repository.loadItem(itemId);\nif (item && item.quantity > 0) {\n  // UNSAFE: condition and mutation are independent.\n  await repository.replaceQuantity(itemId, item.quantity - 1);\n  return { reserved: true };\n}\nreturn { reserved: false };"
    }
  ]
};
