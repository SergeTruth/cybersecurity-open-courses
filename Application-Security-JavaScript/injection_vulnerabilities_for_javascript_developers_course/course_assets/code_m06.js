window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Keep Templates and Logic Application-Owned",
  "codeExamples": [
    {
      "title": "Use Explicit Numeric Rule Data Instead of eval",
      "language": "javascript",
      "code": `const RULE_FIELDS = new Set(["purchaseTotal", "accountAgeDays"]);
const OPERATORS = new Map([
  ["equals", (actual, expected) => actual === expected],
  ["min", (actual, expected) => actual >= expected],
]);

function evaluateRule(rule, facts) {
  if (typeof rule !== "object" || rule === null ||
      typeof facts !== "object" || facts === null ||
      Object.getPrototypeOf(rule) !== Object.prototype ||
      Object.getPrototypeOf(facts) !== Object.prototype ||
      !Object.hasOwn(rule, "field") || !Object.hasOwn(rule, "operator") ||
      !Object.hasOwn(rule, "value") ||
      typeof rule.field !== "string" || !RULE_FIELDS.has(rule.field) ||
      typeof rule.operator !== "string" ||
      typeof rule.value !== "number" || !Number.isFinite(rule.value) ||
      !Object.hasOwn(facts, rule.field)) {
    throw new Error("invalid rule");
  }
  const actual = facts[rule.field];
  if (typeof actual !== "number" || !Number.isFinite(actual)) {
    throw new Error("invalid fact value");
  }
  const operation = OPERATORS.get(rule.operator);
  if (operation === undefined) throw new Error("unsupported rule operator");
  return operation(actual, rule.value);
}

console.log(evaluateRule(
  { field: "purchaseTotal", operator: "min", value: 100 },
  { purchaseTotal: 125 },
));
`
    },
    {
      "title": "Choose Templates by Map Key",
      "language": "javascript",
      "code": `const TEMPLATES = new Map([
  ["welcome", ({ displayName }) => "<p>Welcome, " + escapeHtml(displayName) + ".</p>"],
  ["reset", ({ displayName }) => "<p>Hello " + escapeHtml(displayName) + ", reset link sent.</p>"],
]);

function escapeHtml(value) {
  if (typeof value !== "string") throw new Error("template data must be text");
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;",
  })[character]);
}

function renderEmail(templateName, data) {
  const template = TEMPLATES.get(templateName);
  if (template === undefined) throw new Error("unsupported template");
  return template(data);
}
`
    },
    {
      "title": "Avoid Dynamic Imports from User Input",
      "language": "javascript",
      "code": `const REPORT_MODULES = new Map([
  ["sales", "./reports/sales.js"],
  ["inventory", "./reports/inventory.js"],
]);

function selectReportModule(reportName) {
  const moduleName = REPORT_MODULES.get(reportName);
  if (moduleName === undefined) throw new Error("unsupported report type");
  return moduleName;
}

async function loadReportHandler(rawReportName) {
  const moduleName = selectReportModule(rawReportName);
  const module = await import(moduleName);
  return module.default;
}
`
    }
  ]
};
