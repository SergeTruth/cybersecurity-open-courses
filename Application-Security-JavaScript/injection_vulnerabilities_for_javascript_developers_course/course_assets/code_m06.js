window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Keep Templates and Logic Application-Owned",
  "codeExamples": [
    {
      "title": "Use Explicit Rule Data Instead of eval",
      "language": "javascript",
      "code": "const OPERATORS = {\n  equals: (actual, expected) => actual === expected,\n  min: (actual, expected) => Number(actual) >= Number(expected),\n};\n\nfunction evaluateRule(rule, facts) {\n  const operation = OPERATORS[rule.operator];\n  if (!operation) {\n    throw new Error(\"unsupported rule operator\");\n  }\n\n  const actual = facts[rule.field];\n  return operation(actual, rule.value);\n}\n\nconst allowed = evaluateRule(\n  { field: \"purchaseTotal\", operator: \"min\", value: 100 },\n  { purchaseTotal: 125 },\n);"
    },
    {
      "title": "Choose Templates by Allowlisted Name",
      "language": "javascript",
      "code": "const templates = {\n  welcome: ({ displayName }) => `<p>Welcome, ${escapeHtml(displayName)}.</p>`,\n  reset: ({ displayName }) => `<p>Hello ${escapeHtml(displayName)}, reset link sent.</p>`,\n};\n\nfunction escapeHtml(value) {\n  return String(value).replace(/[&<>\"']/g, (character) => ({\n    \"&\": \"&amp;\",\n    \"<\": \"&lt;\",\n    \">\": \"&gt;\",\n    '\"': \"&quot;\",\n    \"'\": \"&#39;\",\n  })[character]);\n}\n\nfunction renderEmail(templateName, data) {\n  const template = templates[templateName];\n  if (!template) throw new Error(\"unsupported template\");\n  return template(data);\n}"
    },
    {
      "title": "Avoid Dynamic Imports from User Input",
      "language": "javascript",
      "code": "const reportHandlers = {\n  sales: () => import(\"./reports/sales.js\"),\n  inventory: () => import(\"./reports/inventory.js\"),\n};\n\nasync function loadReportHandler(rawReportName) {\n  const loader = reportHandlers[rawReportName];\n  if (!loader) {\n    throw new Error(\"unsupported report type\");\n  }\n\n  const module = await loader();\n  return module.default;\n}"
    }
  ]
};
