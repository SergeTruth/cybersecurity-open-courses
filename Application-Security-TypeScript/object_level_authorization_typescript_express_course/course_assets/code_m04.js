window.COURSE_CODE_MODULE = {
  "title": "Scoped Data Access",
  "codeIntro": "The database boundary validates trusted scope again and expresses the complete object relationship in selection and mutation predicates. The displayed interfaces are the full local contracts used to type-check these focused fragments.",
  "codeExamples": [
    {
      "title": "Insecure: arbitrary lookup",
      "language": "typescript",
      "blurb": "This complete fragment compiles, but the query remains intentionally insecure because its only predicate is a client-influenced identifier.",
      "code": `// src/projects/insecure-project-reader.ts
type Project = Readonly<{ id: string; tenantId: string; name: string }>;

interface UnscopedProjectTable {
  findUnique(query: Readonly<{
    where: Readonly<{ id: string }>;
  }>): Promise<Project | null>;
}

async function insecureProjectLookup(
  table: UnscopedProjectTable,
  projectId: string
): Promise<Project | null> {
  return table.findUnique({ where: { id: projectId } });
}`
    },
    {
      "title": "Select through tenant and object relationships",
      "language": "typescript",
      "blurb": "A trusted composition-root builder captures the application-owned reader. Its query combines the primary key, trusted tenant, lifecycle state, and a permitted owner, administrator, or reader relationship. The service hides inaccessible objects as not found and returns an exact detached projection.",
      "code": `// src/projects/readable-project.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_PROJECT_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;
const MAX_RELATION_IDENTIFIERS = 1000;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type Project = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  administratorIds: readonly string[];
  readerIds: readonly string[];
  deletedAt: null;
  name: string;
  state: "active" | "archived";
  version: number;
}>;

type ReadableProjectFilter = Readonly<{
  id: string;
  tenantId: string;
  deletedAt: null;
  OR: readonly [
    Readonly<{ ownerId: string }>,
    Readonly<{ administratorIds: Readonly<{ has: string }> }>,
    Readonly<{
      readers: Readonly<{ some: Readonly<{ userId: string }> }>;
    }>
  ];
}>;

interface ProjectReader {
  findFirst(
    query: Readonly<{ where: ReadableProjectFilter }>
  ): Promise<Project | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function buildReadableProjectLoader(table: ProjectReader) {
 return async function loadReadableProject(
  principal: unknown,
  projectId: unknown
 ): Promise<Project> {
  assertAuthenticatedPrincipal(principal);
  if (typeof projectId !== "string" || !IDENTIFIER.test(projectId)) {
    throw new TypeError("project ID rejected");
  }

  const project = await table.findFirst({
    where: {
      id: projectId,
      tenantId: principal.tenantId,
      deletedAt: null,
      OR: [
        { ownerId: principal.userId },
        { administratorIds: { has: principal.userId } },
        { readers: { some: { userId: principal.userId } } }
      ]
    }
  });
  if (project === null) throw new NotFoundError();
  if (typeof project !== "object" ||
      Array.isArray(project) ||
      typeof project.id !== "string" ||
      project.id !== projectId ||
      typeof project.tenantId !== "string" ||
      project.tenantId !== principal.tenantId ||
      project.deletedAt !== null ||
      typeof project.ownerId !== "string" ||
      !IDENTIFIER.test(project.ownerId) ||
      !Array.isArray(project.administratorIds) ||
      !Array.isArray(project.readerIds) ||
      project.administratorIds.length > MAX_RELATION_IDENTIFIERS ||
      project.readerIds.length > MAX_RELATION_IDENTIFIERS ||
      project.administratorIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      project.readerIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      (project.ownerId !== principal.userId &&
        !project.administratorIds.includes(principal.userId) &&
        !project.readerIds.includes(principal.userId)) ||
      typeof project.name !== "string" ||
      project.name.length < 1 ||
      project.name.length > 100 ||
      project.name !== project.name.normalize("NFC").trim() ||
      UNSAFE_PROJECT_NAME.test(project.name) ||
      (project.state !== "active" && project.state !== "archived") ||
      typeof project.version !== "number" ||
      !Number.isSafeInteger(project.version) ||
      project.version < 0) {
    throw new RepositoryContractError("project repository contract violated");
  }
  // Return an exact, detached projection rather than an ORM-owned object.
  return Object.freeze({
    id: project.id,
    tenantId: project.tenantId,
    ownerId: project.ownerId,
    administratorIds: Object.freeze([...project.administratorIds]),
    readerIds: Object.freeze([...project.readerIds]),
    deletedAt: project.deletedAt,
    name: project.name,
    state: project.state,
    version: project.version
  });
 };
}`
    },
    {
      "title": "Bind edit authorization to the atomic mutation",
      "language": "typescript",
      "blurb": "A trusted builder captures the only writer adapter. It performs one UPDATE-WHERE-RETURNING operation that repeats principal provenance, tenant, owner-or-administrator relationship, active state, and optimistic version. Its data projection can change only the validated name and version; the returned identity is verified and copied into an exact frozen result.",
      "code": `// src/projects/project-writer.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_PROJECT_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;
const MAX_RELATION_IDENTIFIERS = 1000;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type Project = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  administratorIds: readonly string[];
  deletedAt: null;
  name: string;
  state: "active" | "archived";
  version: number;
}>;

type EditableProjectFilter = Readonly<{
  id: string;
  tenantId: string;
  deletedAt: null;
  state: "active";
  version: number;
  OR: readonly [
    Readonly<{ ownerId: string }>,
    Readonly<{ administratorIds: Readonly<{ has: string }> }>
  ];
}>;

type AuthorizedNameUpdate = Readonly<{
  projectId: string;
  tenantId: string;
  userId: string;
  expectedVersion: number;
  name: string;
}>;

interface ProjectWriterTable {
  updateOneIfMatching(command: Readonly<{
    where: EditableProjectFilter;
    data: Readonly<{
      name: string;
      version: Readonly<{ increment: 1 }>;
    }>;
  }>): Promise<Project | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function parseAuthorizedNameUpdate(input: unknown): AuthorizedNameUpdate {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("authorized update command rejected");
  }
  const value = input as Record<string, unknown>;
  const keys = Object.keys(value);
  const projectId = value.projectId;
  const tenantId = value.tenantId;
  const userId = value.userId;
  const expectedVersion = value.expectedVersion;
  const name = value.name;
  if (keys.length !== 5 ||
      keys.some(key => ![
        "projectId", "tenantId", "userId", "expectedVersion", "name"
      ].includes(key)) ||
      typeof projectId !== "string" ||
      typeof tenantId !== "string" ||
      typeof userId !== "string" ||
      typeof expectedVersion !== "number" ||
      typeof name !== "string") {
    throw new TypeError("authorized update command rejected");
  }
  return Object.freeze({
    projectId,
    tenantId,
    userId,
    expectedVersion,
    name
  });
}

function buildEditableProjectWriter(table: ProjectWriterTable) {
 return async function updateNameIfEditable(
  principal: unknown,
  input: unknown
 ): Promise<Project> {
  assertAuthenticatedPrincipal(principal);
  const command = parseAuthorizedNameUpdate(input);
  if (typeof command.tenantId !== "string" ||
      typeof command.userId !== "string" ||
      typeof command.projectId !== "string" ||
      typeof command.expectedVersion !== "number" ||
      typeof command.name !== "string" ||
      command.tenantId !== principal.tenantId ||
      command.userId !== principal.userId ||
      !IDENTIFIER.test(command.projectId) ||
      !Number.isSafeInteger(command.expectedVersion) ||
      command.expectedVersion < 0 ||
      command.expectedVersion >= Number.MAX_SAFE_INTEGER ||
      command.name.length < 1 ||
      command.name.length > 100 ||
      command.name !== command.name.normalize("NFC").trim() ||
      UNSAFE_PROJECT_NAME.test(command.name)) {
    throw new TypeError("authorized update command rejected");
  }

  // The adapter executes one UPDATE ... WHERE ... RETURNING operation.
  const updated = await table.updateOneIfMatching({
    where: {
      id: command.projectId,
      tenantId: principal.tenantId,
      deletedAt: null,
      state: "active",
      version: command.expectedVersion,
      OR: [
        { ownerId: principal.userId },
        { administratorIds: { has: principal.userId } }
      ]
    },
    data: {
      name: command.name,
      version: { increment: 1 }
    }
  });

  if (updated === null) throw new NotFoundError();
  if (typeof updated !== "object" ||
      Array.isArray(updated) ||
      typeof updated.id !== "string" ||
      updated.id !== command.projectId ||
      typeof updated.tenantId !== "string" ||
      updated.tenantId !== principal.tenantId ||
      updated.deletedAt !== null ||
      typeof updated.ownerId !== "string" ||
      !IDENTIFIER.test(updated.ownerId) ||
      !Array.isArray(updated.administratorIds) ||
      updated.administratorIds.length > MAX_RELATION_IDENTIFIERS ||
      updated.administratorIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      (updated.ownerId !== principal.userId &&
        !updated.administratorIds.includes(principal.userId)) ||
      typeof updated.name !== "string" ||
      updated.name !== command.name ||
      updated.state !== "active" ||
      typeof updated.version !== "number" ||
      !Number.isSafeInteger(updated.version) ||
      updated.version !== command.expectedVersion + 1) {
    throw new RepositoryContractError("unexpected mutation result");
  }
  return Object.freeze({
    id: updated.id,
    tenantId: updated.tenantId,
    ownerId: updated.ownerId,
    administratorIds: Object.freeze([...updated.administratorIds]),
    deletedAt: updated.deletedAt,
    name: updated.name,
    state: updated.state,
    version: updated.version
  });
 };
}`
    }
  ]
};
