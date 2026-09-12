window.COURSE_CODE_MODULE = {
  "title": "Scoped Data Access and Policy",
  "codeIntro": "Trusted tenant scope enters the lookup itself. The returned row is validated against that scope, and an explicit policy then evaluates owner, reader, administrator, and sensitivity facts.",
  "codeExamples": [
    {
      "title": "Constrain retrieval before applying contextual policy",
      "language": "typescript",
      "blurb": "A trusted builder captures the application-owned reader. The client supplies only a bounded document identifier; the verified principal supplies tenant scope. Inaccessible objects are hidden as not found, and successful reads return an exact frozen projection.",
      "code": `// src/documents/read-document.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_TITLE =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly (
    "customer" | "approver" | "document-admin"
  )[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type DocumentRecord = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  isReader: boolean;
  title: string;
  sensitivity: "public" | "internal" | "restricted";
  deletedAt: null;
  state: "active";
  version: number;
}>;

type DocumentView = Readonly<{
  id: string;
  title: string;
  sensitivity: "public" | "internal" | "restricted";
  version: number;
}>;

type DocumentScope = Readonly<{
  id: string;
  tenantId: string;
  deletedAt: null;
  state: "active";
}>;

type DocumentSelection = Readonly<{
  id: true;
  tenantId: true;
  ownerId: true;
  isReader: true;
  title: true;
  sensitivity: true;
  deletedAt: true;
  state: true;
  version: true;
}>;

const DOCUMENT_SELECTION: DocumentSelection = Object.freeze({
  id: true,
  tenantId: true,
  ownerId: true,
  isReader: true,
  title: true,
  sensitivity: true,
  deletedAt: true,
  state: true,
  version: true
});

interface DocumentReader {
  // id is a database primary key; the adapter rejects duplicate cardinality.
  // isReader is computed with a database EXISTS predicate for readerUserId;
  // the relationship collection is never materialized into application memory.
  findUniqueInScope(query: Readonly<{
    where: DocumentScope;
    readerUserId: string;
    select: DocumentSelection;
  }>): Promise<unknown | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function validatedDocument(
  input: unknown,
  expectedId: string,
  expectedTenantId: string
): DocumentRecord {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new RepositoryContractError("invalid document result");
  }
  const value = input as Record<string, unknown>;
  const id = value.id;
  const tenantId = value.tenantId;
  const ownerId = value.ownerId;
  const isReader = value.isReader;
  const title = value.title;
  const sensitivity = value.sensitivity;
  const deletedAt = value.deletedAt;
  const state = value.state;
  const version = value.version;
  if (typeof id !== "string" ||
      id !== expectedId ||
      typeof tenantId !== "string" ||
      tenantId !== expectedTenantId ||
      typeof ownerId !== "string" ||
      !IDENTIFIER.test(ownerId) ||
      typeof isReader !== "boolean" ||
      typeof title !== "string" ||
      title.length < 1 ||
      title.length > 120 ||
      title !== title.normalize("NFC").trim() ||
      UNSAFE_TITLE.test(title) ||
      (sensitivity !== "public" &&
        sensitivity !== "internal" &&
        sensitivity !== "restricted") ||
      deletedAt !== null ||
      state !== "active" ||
      typeof version !== "number" ||
      !Number.isSafeInteger(version) ||
      version < 0) {
    throw new RepositoryContractError("invalid document result");
  }
  return Object.freeze({
    id,
    tenantId,
    ownerId,
    isReader,
    title,
    sensitivity,
    deletedAt,
    state,
    version
  });
}

function canReadDocument(
  principal: AuthenticatedPrincipal,
  document: DocumentRecord
): boolean {
  if (principal.tenantId !== document.tenantId) return false;
  if (document.ownerId === principal.userId) return true;
  if (principal.roles.includes("document-admin")) return true;
  if (document.sensitivity === "public") return true;
  return document.sensitivity !== "restricted" && document.isReader;
}

function buildDocumentReader(reader: DocumentReader) {
  return async function readDocument(
    principal: unknown,
    requestedId: unknown
  ): Promise<DocumentView> {
    assertAuthenticatedPrincipal(principal);
    if (typeof requestedId !== "string" ||
        !IDENTIFIER.test(requestedId)) {
      throw new TypeError("document identifier rejected");
    }
    const found = await reader.findUniqueInScope({
      where: {
        id: requestedId,
        tenantId: principal.tenantId,
        deletedAt: null,
        state: "active"
      },
      readerUserId: principal.userId,
      select: DOCUMENT_SELECTION
    });
    if (found === null) throw new NotFoundError();
    const document = validatedDocument(
      found,
      requestedId,
      principal.tenantId
    );
    if (!canReadDocument(principal, document)) {
      throw new NotFoundError();
    }
    return Object.freeze({
      id: document.id,
      title: document.title,
      sensitivity: document.sensitivity,
      version: document.version
    });
  };
}`
    }
  ]
};
