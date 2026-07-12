window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Build Document Queries Explicitly",
  "codeExamples": [
    {
      "title": "Reject Unexpected Object Shape and Operators",
      "language": "javascript",
      "code": `const FILTER_FIELDS = new Set(["status", "ownerId"]);
const TICKET_STATUSES = new Set(["open", "pending", "closed"]);

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

function parseTicketFilter(raw) {
  /* Contract: raw is produced by a trusted JSON parser. */
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    throw new Error("filter must be an object");
  }
  const prototype = Object.getPrototypeOf(raw);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new Error("filter must be a plain JSON object");
  }
  for (const key of Object.keys(raw)) {
    if (!FILTER_FIELDS.has(key)) throw new Error("unsupported filter field: " + key);
  }
  return {
    status: Object.hasOwn(raw, "status") ? parseStatus(raw.status) : undefined,
    ownerId: Object.hasOwn(raw, "ownerId") ? parseOwnerId(raw.ownerId) : undefined,
  };
}
`
    },
    {
      "title": "Translate Client Filters into Application-Owned Queries",
      "language": "javascript",
      "code": `function buildTicketQuery(input) {
  const query = {};
  if (input.status !== undefined) query.status = input.status;
  if (input.ownerId !== undefined) query.owner_id = input.ownerId;
  return query;
}

async function listTickets(collection, rawFilter) {
  const input = parseTicketFilter(rawFilter);
  return collection.find(buildTicketQuery(input)).limit(50).toArray();
}
`
    },
    {
      "title": "Use Explicit Update Fields and Runtime Timezone Data",
      "language": "javascript",
      "code": `function canonicalTimeZone(value) {
  try {
    return new Intl.DateTimeFormat("en-US", { timeZone: value })
      .resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

function parseUserId(value) {
  if (typeof value !== "string" || !/^[a-z0-9_]{8,32}$/.test(value)) {
    throw new Error("userId is invalid");
  }
  return value;
}

function parseProfileUpdate(body) {
  /* Contract: body is produced by a trusted JSON parser. */
  if (typeof body !== "object" || body === null || Array.isArray(body) ||
      Object.getPrototypeOf(body) !== Object.prototype ||
      !Object.hasOwn(body, "displayName") || !Object.hasOwn(body, "timeZone")) {
    throw new Error("profile update must be a plain JSON object");
  }
  const keys = Object.keys(body);
  if (keys.length !== 2 || keys.some((key) => !new Set(["displayName", "timeZone"]).has(key)) ||
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

async function updateProfile(collection, rawUserId, body) {
  const userId = parseUserId(rawUserId);
  const fields = parseProfileUpdate(body);
  return collection.updateOne({ user_id: userId }, { $set: fields });
}
`
    }
  ]
};
