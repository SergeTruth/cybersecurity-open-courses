import path from "node:path";

const SORT_COLUMNS = new Map([
  ["created", "created_at"],
  ["name", "display_name"],
  ["email", "email"],
]);
const SORT_DIRECTIONS = new Map([["asc", "ASC"], ["desc", "DESC"]]);
const TICKET_FIELDS = new Set(["status", "ownerId"]);
const TICKET_STATUSES = new Set(["open", "pending", "closed"]);
const RULE_FIELDS = new Set(["purchaseTotal", "accountAgeDays"]);
const OPERATORS = new Map([
  ["equals", (actual, expected) => actual === expected],
  ["min", (actual, expected) => actual >= expected],
]);
const TEMPLATES = new Map([
  ["welcome", ({ displayName }) => `<p>Welcome, ${escapeHtml(displayName)}.</p>`],
  ["reset", ({ displayName }) => `<p>Hello ${escapeHtml(displayName)}, reset link sent.</p>`],
]);
const REPORT_MODULES = new Map([
  ["sales", "./reports/sales.js"],
  ["inventory", "./reports/inventory.js"],
]);
const APPROVED_URL_ORIGINS = new Set([
  "https://example.com",
  "https://profiles.example.com",
]);

function isPlainJsonObject(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function buildUserListQuery({
  sortBy = "created",
  direction = "desc",
  searchText = "",
  limit = 50,
} = {}) {
  const column = SORT_COLUMNS.get(sortBy);
  const order = SORT_DIRECTIONS.get(direction);
  if (column === undefined || order === undefined) {
    throw new Error("unsupported sort option");
  }
  if (typeof searchText !== "string" || searchText.length > 100 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new Error("invalid query value");
  }
  return {
    text: `SELECT id, email, display_name FROM users
            WHERE display_name ILIKE $1
            ORDER BY ${column} ${order}
            LIMIT $2`,
    values: [`%${searchText}%`, limit],
  };
}

function parseStatus(value) {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !TICKET_STATUSES.has(value)) {
    throw new Error("status is invalid");
  }
  return value;
}

function parseOwnerId(value) {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || !/^[a-z0-9_]{8,32}$/.test(value)) {
    throw new Error("ownerId is invalid");
  }
  return value;
}

export function parseTicketFilter(raw) {
  /* Contract: raw is produced by a trusted JSON parser. */
  if (!isPlainJsonObject(raw)) {
    throw new Error("filter must be a plain JSON object");
  }
  for (const key of Object.keys(raw)) {
    if (!TICKET_FIELDS.has(key)) {
      throw new Error(`unsupported filter field: ${key}`);
    }
  }
  return {
    status: Object.hasOwn(raw, "status") ? parseStatus(raw.status) : undefined,
    ownerId: Object.hasOwn(raw, "ownerId") ? parseOwnerId(raw.ownerId) : undefined,
  };
}

export function buildTicketQuery(input) {
  const query = {};
  if (input.status !== undefined) query.status = input.status;
  if (input.ownerId !== undefined) query.owner_id = input.ownerId;
  return query;
}

function canonicalTimeZone(value) {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: value })
      .resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

export function parseUserId(value) {
  if (typeof value !== "string" || !/^[a-z0-9_]{8,32}$/.test(value)) {
    throw new Error("userId is invalid");
  }
  return value;
}

export function parseProfileUpdate(body) {
  /* Contract: body is produced by a trusted JSON parser. */
  if (!isPlainJsonObject(body) ||
      !Object.hasOwn(body, "displayName") || !Object.hasOwn(body, "timeZone")) {
    throw new Error("profile update must be a plain JSON object");
  }
  const keys = Object.keys(body);
  if (keys.length !== 2 ||
      keys.some((key) => !new Set(["displayName", "timeZone"]).has(key)) ||
      typeof body.displayName !== "string" || typeof body.timeZone !== "string") {
    throw new Error("profile fields are invalid");
  }
  const displayName = body.displayName.trim();
  const timeZone = canonicalTimeZone(body.timeZone.trim());
  if (displayName.length < 1 || displayName.length > 80 || timeZone === null) {
    throw new Error("profile values are invalid");
  }
  return { display_name: displayName, time_zone: timeZone };
}

export async function updateProfile(collection, rawUserId, body) {
  const userId = parseUserId(rawUserId);
  const fields = parseProfileUpdate(body);
  return collection.updateOne({ user_id: userId }, { $set: fields });
}

function resolveContainedPath(root, fileName) {
  const resolved = path.posix.resolve(root, fileName);
  const relative = path.posix.relative(root, resolved);
  if (relative.startsWith("..") || path.posix.isAbsolute(relative)) {
    throw new Error("file path escapes approved directory");
  }
  return resolved;
}

export function buildResizeInvocation({
  inputName,
  size,
  workDirectory,
  inputRoot = "/srv/app/uploads",
  privateWorkRoot = "/srv/app/private-resize",
}) {
  const imageName = /^[A-Za-z0-9][A-Za-z0-9_-]{0,100}\.(?:png|jpe?g)$/i;
  const geometries = new Map([
    ["small", "320x320"],
    ["medium", "800x800"],
    ["large", "1600x1600"],
  ]);
  if (typeof inputName !== "string" || !imageName.test(inputName)) {
    throw new Error("image file name is invalid");
  }
  const geometry = geometries.get(size);
  if (geometry === undefined) throw new Error("resize policy rejected the request");
  const inputPath = resolveContainedPath(path.posix.resolve(inputRoot), inputName);
  const approvedWorkRoot = path.posix.resolve(privateWorkRoot);
  if (typeof workDirectory !== "string" || !path.posix.isAbsolute(workDirectory)) {
    throw new Error("work directory is invalid");
  }
  const relativeWork = path.posix.relative(
    approvedWorkRoot,
    path.posix.resolve(workDirectory),
  );
  if (relativeWork === "" || relativeWork.startsWith("..") ||
      path.posix.isAbsolute(relativeWork)) {
    throw new Error("work directory is outside the private root");
  }
  const outputPath = path.posix.join(
    path.posix.resolve(workDirectory),
    "result.png",
  );
  if (!path.posix.isAbsolute(inputPath) || !path.posix.isAbsolute(outputPath) ||
      inputPath.startsWith("-") || outputPath.startsWith("-")) {
    throw new Error("image path is unsafe");
  }
  return {
    file: "/usr/bin/magick",
    args: [inputPath, "-resize", geometry, outputPath],
    options: {
      shell: false,
      timeout: 10_000,
      maxBuffer: 64 * 1024,
      windowsHide: true,
    },
  };
}

export function safeExternalUrl(value) {
  if (typeof value !== "string") {
    throw new Error("URL must be a string");
  }
  const url = new URL(value, "https://example.com");
  if (url.username !== "" || url.password !== "" ||
      !APPROVED_URL_ORIGINS.has(url.origin)) {
    throw new Error("URL destination is not approved");
  }
  return url.href;
}

function escapeHtml(value) {
  if (typeof value !== "string") throw new Error("template data must be text");
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;",
  })[character]);
}

export function renderEmail(templateName, data) {
  const template = TEMPLATES.get(templateName);
  if (template === undefined) throw new Error("unsupported template");
  return template(data);
}

export function evaluateRule(rule, facts) {
  if (!isPlainJsonObject(rule) || !isPlainJsonObject(facts) ||
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

export function selectReportModule(reportName) {
  const moduleName = REPORT_MODULES.get(reportName);
  if (moduleName === undefined) throw new Error("unsupported report type");
  return moduleName;
}

export function sanitizeArticleHtml(DOMPurify, rawHtml) {
  if (typeof rawHtml !== "string" || typeof DOMPurify?.sanitize !== "function") {
    throw new Error("invalid sanitizer input");
  }
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ["p", "strong", "em", "ul", "ol", "li", "a"],
    ALLOWED_ATTR: ["href", "title"],
  });
}
