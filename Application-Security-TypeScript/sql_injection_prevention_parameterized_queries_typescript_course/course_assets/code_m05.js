window.COURSE_CODE_MODULE = {
  "title": "Compose Filters and Parameters Separately",
  "codeIntro": "This PostgreSQL-style report boundary is checked with TypeScript 7.0.2 under strict settings. After the HTTP adapter bounds request-target bytes, each supported filter contributes fixed application-authored SQL, while all tenant, status, time, and limit values remain in the parameter collection.",
  "codeExamples": [
    {
      "title": "Build a bounded report preview with stable placeholders",
      "language": "typescript",
      "blurb": "A strict parser rejects unknown fields, noncanonical timestamps, oversized reporting windows, unsupported status values, and excessive limits. The authenticated tenant and report permission are server-owned, placeholders follow the value array, and one sentinel row produces an explicit truncation signal.",
      "code": `// src/orders/run-order-report.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const ORDER_STATUSES = Object.freeze([
  "pending", "paid", "fulfilled", "cancelled"
] as const);
const MAX_REPORT_WINDOW_MS = 31 * 24 * 60 * 60 * 1000;
const MAX_DATE_EPOCH_MS = 8_640_000_000_000_000;

type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled";

function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" &&
    ORDER_STATUSES.includes(value as OrderStatus);
}

declare class AuthenticatedPrincipal {
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

interface Clock {
  nowEpochMs(): number;
}

interface ParameterizedDatabase {
  // The trusted adapter uses the driver's binding API and translates expected
  // driver failures into sanitized application-domain errors.
  query(
    sqlText: string,
    values: readonly unknown[]
  ): Promise<unknown>;
}

type ReportFilters = Readonly<{
  status: OrderStatus | undefined;
  createdAfter: string;
  createdBefore: string;
  limit: number;
}>;

type OrderReportRow = Readonly<{
  id: string;
  status: OrderStatus;
  createdAt: string;
}>;

type OrderReportPreview = Readonly<{
  items: readonly OrderReportRow[];
  truncated: boolean;
}>;

class ForbiddenError extends Error {}
class DatabaseContractError extends Error {}

function databaseTimestamp(input: unknown): Readonly<{
  text: string;
  epoch: number;
}> {
  if (input instanceof Date) {
    try {
      const epoch = Date.prototype.getTime.call(input);
      if (Number.isFinite(epoch)) {
        return Object.freeze({
          text: new Date(epoch).toISOString(),
          epoch
        });
      }
    } catch {
      // Fall through to the stable contract error.
    }
  }
  if (typeof input === "string") {
    const epoch = Date.parse(input);
    if (Number.isFinite(epoch) &&
        new Date(epoch).toISOString() === input) {
      return Object.freeze({ text: input, epoch });
    }
  }
  throw new DatabaseContractError("invalid database result");
}

function canonicalTimestamp(input: unknown): Readonly<{
  text: string;
  epoch: number;
}> {
  if (typeof input !== "string" || input.length !== 24) {
    throw new TypeError("report filters rejected");
  }
  const epoch = Date.parse(input);
  if (!Number.isFinite(epoch) || new Date(epoch).toISOString() !== input) {
    throw new TypeError("report filters rejected");
  }
  return Object.freeze({ text: input, epoch });
}

function parseReportFilters(
  input: unknown,
  nowEpochMs: number
): ReportFilters {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("report filters rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  const keys = Reflect.ownKeys(value);
  if ((prototype !== Object.prototype && prototype !== null) ||
      keys.length < 3 ||
      keys.length > 4 ||
      keys.some(key =>
        typeof key !== "string" ||
        (key !== "status" &&
          key !== "createdAfter" &&
          key !== "createdBefore" &&
          key !== "limit")
      )) {
    throw new TypeError("report filters rejected");
  }
  const status = value.status;
  if (status !== undefined && !isOrderStatus(status)) {
    throw new TypeError("report filters rejected");
  }
  const after = canonicalTimestamp(value.createdAfter);
  const before = canonicalTimestamp(value.createdBefore);
  const limit = value.limit;
  if (after.epoch >= before.epoch ||
      before.epoch > nowEpochMs ||
      before.epoch - after.epoch > MAX_REPORT_WINDOW_MS ||
      typeof limit !== "number" ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100) {
    throw new TypeError("report filters rejected");
  }
  return Object.freeze({
    status: status as OrderStatus | undefined,
    createdAfter: after.text,
    createdBefore: before.text,
    limit
  });
}

function buildOrderReportPreview(
  database: ParameterizedDatabase,
  clock: Clock
) {
  return async function runOrderReportPreview(
    principal: unknown,
    input: unknown
  ): Promise<OrderReportPreview> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.permissions.includes("orders:report")) {
      throw new ForbiddenError();
    }
    const nowEpochMs = clock.nowEpochMs();
    if (!Number.isSafeInteger(nowEpochMs) ||
        nowEpochMs < 0 ||
        nowEpochMs > MAX_DATE_EPOCH_MS) {
      throw new DatabaseContractError("invalid clock result");
    }
    const filters = parseReportFilters(input, nowEpochMs);
    const clauses = [
      "tenant_id = $1",
      "created_at >= $2",
      "created_at < $3"
    ];
    const values: unknown[] = [
      principal.tenantId,
      filters.createdAfter,
      filters.createdBefore
    ];
    if (filters.status !== undefined) {
      values.push(filters.status);
      clauses.push("status = $" + values.length);
    }
    const fetchLimit = filters.limit + 1;
    values.push(fetchLimit);
    // Schema contract: created_at is PostgreSQL timestamptz.
    const sqlText =
      "SELECT id, tenant_id, status, created_at FROM orders WHERE " +
      clauses.join(" AND ") +
      " ORDER BY created_at DESC, id DESC LIMIT $" + values.length;
    const raw = await database.query(sqlText, Object.freeze([...values]));
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new DatabaseContractError("invalid database result");
    }
    const rows = (raw as Record<string, unknown>).rows;
    if (!Array.isArray(rows) || rows.length > fetchLimit) {
      throw new DatabaseContractError("invalid database result");
    }
    const seen = new Set<string>();
    const result: OrderReportRow[] = [];
    for (const row of rows) {
      if (typeof row !== "object" || row === null || Array.isArray(row)) {
        throw new DatabaseContractError("invalid database result");
      }
      const value = row as Record<string, unknown>;
      const id = value.id;
      const status = value.status;
      const created = databaseTimestamp(value.created_at);
      if (typeof id !== "string" ||
          !IDENTIFIER.test(id) ||
          seen.has(id) ||
          value.tenant_id !== principal.tenantId ||
          !isOrderStatus(status) ||
          created.epoch < Date.parse(filters.createdAfter) ||
          created.epoch >= Date.parse(filters.createdBefore) ||
          (filters.status !== undefined && status !== filters.status)) {
        throw new DatabaseContractError("invalid database result");
      }
      seen.add(id);
      result.push(Object.freeze({
        id,
        status,
        createdAt: created.text
      }));
    }
    return Object.freeze({
      items: Object.freeze(result.slice(0, filters.limit)),
      truncated: result.length > filters.limit
    });
  };
}`
    }
  ]
};
