window.COURSE_CODE_MODULE = {
  "title": "Binding Plus Authorization Scope",
  "codeIntro": "This PostgreSQL-style boundary is checked with TypeScript 7.0.2 under strict settings. Parameterization prevents syntax injection, while verified identity, permission, tenant, ownership, lifecycle, cardinality, and result checks enforce the separate authorization contract.",
  "codeExamples": [
    {
      "title": "Bind a lookup and enforce tenant plus object scope",
      "language": "typescript",
      "blurb": "The client supplies only a canonical document identifier. The verified principal supplies tenant, subject, and permissions; one fixed query limits retrieval to an owned document unless a trusted tenant-wide permission is present. The returned row is revalidated before an exact frozen projection leaves the boundary.",
      "code": `// src/documents/read-document.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_TITLE =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  readonly permissions: readonly string[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

interface ParameterizedDatabase {
  // The trusted adapter uses the driver's binding API and translates expected
  // driver failures into sanitized application-domain errors.
  query(
    sqlText: string,
    values: readonly unknown[]
  ): Promise<unknown>;
}

type DocumentView = Readonly<{
  id: string;
  title: string;
  version: number;
}>;

class ForbiddenError extends Error {}
class NotFoundError extends Error {}
class DatabaseContractError extends Error {}

function parseDocumentId(input: unknown): string {
  if (typeof input !== "string" || !IDENTIFIER.test(input)) {
    throw new TypeError("document identifier rejected");
  }
  return input;
}

function buildDocumentReader(database: ParameterizedDatabase) {
  return async function readDocument(
    principal: unknown,
    input: unknown
  ): Promise<DocumentView> {
    assertAuthenticatedPrincipal(principal);
    const mayReadOwn = principal.permissions.includes("documents:read:own");
    const mayReadTenant = principal.permissions.includes(
      "documents:read:tenant"
    );
    if (!mayReadOwn && !mayReadTenant) throw new ForbiddenError();
    const documentId = parseDocumentId(input);
    const raw = await database.query(
      "SELECT id, tenant_id, owner_id, title, version, state, deleted_at " +
        "FROM documents WHERE id = $1 AND tenant_id = $2 " +
        "AND deleted_at IS NULL AND state = 'active' " +
        "AND (owner_id = $3 OR $4::boolean) LIMIT 2",
      Object.freeze([
        documentId,
        principal.tenantId,
        principal.userId,
        mayReadTenant
      ])
    );
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      throw new DatabaseContractError("invalid database result");
    }
    const rows = (raw as Record<string, unknown>).rows;
    if (!Array.isArray(rows) || rows.length > 1) {
      throw new DatabaseContractError("invalid database result");
    }
    if (rows.length === 0) throw new NotFoundError();
    const row = rows[0];
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new DatabaseContractError("invalid database result");
    }
    const value = row as Record<string, unknown>;
    const title = value.title;
    const version = value.version;
    if (value.id !== documentId ||
        value.tenant_id !== principal.tenantId ||
        typeof value.owner_id !== "string" ||
        !IDENTIFIER.test(value.owner_id) ||
        (!mayReadTenant && value.owner_id !== principal.userId) ||
        typeof title !== "string" ||
        title.length < 1 ||
        title.length > 120 ||
        title !== title.normalize("NFC").trim() ||
        UNSAFE_TITLE.test(title) ||
        typeof version !== "number" ||
        !Number.isSafeInteger(version) ||
        version < 0 ||
        value.state !== "active" ||
        value.deleted_at !== null) {
      throw new DatabaseContractError("invalid database result");
    }
    return Object.freeze({ id: documentId, title, version });
  };
}`
    }
  ]
};
