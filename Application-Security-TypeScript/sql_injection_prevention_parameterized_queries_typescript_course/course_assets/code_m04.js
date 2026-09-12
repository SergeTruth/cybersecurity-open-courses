window.COURSE_CODE_MODULE = {
  "title": "Map Dynamic Structure",
  "codeIntro": "This PostgreSQL-style example is checked with TypeScript 7.0.2 under strict settings. After the HTTP adapter enforces a URL-byte limit, the request may select only closed application-owned sort tokens; tenant and result-limit values still travel through parameters.",
  "codeExamples": [
    {
      "title": "Map sort structure and return a bounded preview",
      "language": "typescript",
      "blurb": "Frozen maps live beside the query and are never accepted from callers. Only mapped column and direction fragments enter SQL text; authenticated tenant scope and the sentinel limit remain bound values. A unique tiebreaker makes limiting deterministic, and the result reports truncation instead of silently presenting a partial list as complete.",
      "code": `// src/users/list-users.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_DISPLAY_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

const SORT_COLUMNS = Object.freeze({
  name: "display_name",
  created: "created_at"
} as const);

const SORT_DIRECTIONS = Object.freeze({
  ascending: "ASC",
  descending: "DESC"
} as const);

declare class AuthenticatedPrincipal {
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type ListOptions = Readonly<{
  sort: keyof typeof SORT_COLUMNS;
  direction: keyof typeof SORT_DIRECTIONS;
  limit: number;
}>;

type UserListItem = Readonly<{
  id: string;
  displayName: string;
  createdAt: string;
}>;

type UserListPreview = Readonly<{
  items: readonly UserListItem[];
  truncated: boolean;
}>;

interface ParameterizedDatabase {
  // The trusted adapter uses the driver's binding API and translates expected
  // driver failures into sanitized application-domain errors.
  query(
    sqlText: string,
    values: readonly unknown[]
  ): Promise<unknown>;
}

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

function parseListOptions(input: unknown): ListOptions {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("query options rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  const keys = Reflect.ownKeys(value);
  if ((prototype !== Object.prototype && prototype !== null) ||
      keys.length !== 3 ||
      keys.some(key =>
        typeof key !== "string" ||
        (key !== "sort" && key !== "direction" && key !== "limit")
      )) {
    throw new TypeError("query options rejected");
  }
  const sort = value.sort;
  const direction = value.direction;
  const limit = value.limit;
  if (typeof sort !== "string" ||
      !Object.hasOwn(SORT_COLUMNS, sort) ||
      typeof direction !== "string" ||
      !Object.hasOwn(SORT_DIRECTIONS, direction) ||
      typeof limit !== "number" ||
      !Number.isSafeInteger(limit) ||
      limit < 1 ||
      limit > 100) {
    throw new TypeError("query options rejected");
  }
  return Object.freeze({
    sort: sort as ListOptions["sort"],
    direction: direction as ListOptions["direction"],
    limit
  });
}

function buildUserListPreview(database: ParameterizedDatabase) {
  return async function previewUsers(
    principal: unknown,
    input: unknown
  ): Promise<UserListPreview> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.permissions.includes("users:list")) {
      throw new ForbiddenError();
    }
    const options = parseListOptions(input);
    const column = SORT_COLUMNS[options.sort];
    const direction = SORT_DIRECTIONS[options.direction];
    const fetchLimit = options.limit + 1;
    // Schema contract: created_at is PostgreSQL timestamptz.
    const sqlText =
      "SELECT id, tenant_id, display_name, created_at FROM users " +
      "WHERE tenant_id = $1 AND deleted_at IS NULL ORDER BY " +
      column + " " + direction + ", id ASC LIMIT $2";
    const raw = await database.query(
      sqlText,
      Object.freeze([principal.tenantId, fetchLimit])
    );
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new DatabaseContractError("invalid database result");
    }
    const rows = (raw as Record<string, unknown>).rows;
    if (!Array.isArray(rows) || rows.length > fetchLimit) {
      throw new DatabaseContractError("invalid database result");
    }
    const returnedIds = new Set<string>();
    const users: UserListItem[] = [];
    for (const row of rows) {
      if (typeof row !== "object" || row === null || Array.isArray(row)) {
        throw new DatabaseContractError("invalid database result");
      }
      const value = row as Record<string, unknown>;
      const id = value.id;
      const displayName = value.display_name;
      const created = databaseTimestamp(value.created_at);
      if (typeof id !== "string" ||
          !IDENTIFIER.test(id) ||
          returnedIds.has(id) ||
          value.tenant_id !== principal.tenantId ||
          typeof displayName !== "string" ||
          displayName.length < 1 ||
          displayName.length > 80 ||
          displayName !== displayName.normalize("NFC").trim() ||
          UNSAFE_DISPLAY_NAME.test(displayName)) {
        throw new DatabaseContractError("invalid database result");
      }
      returnedIds.add(id);
      users.push(Object.freeze({
        id,
        displayName,
        createdAt: created.text
      }));
    }
    return Object.freeze({
      items: Object.freeze(users.slice(0, options.limit)),
      truncated: users.length > options.limit
    });
  };
}`
    }
  ]
};
