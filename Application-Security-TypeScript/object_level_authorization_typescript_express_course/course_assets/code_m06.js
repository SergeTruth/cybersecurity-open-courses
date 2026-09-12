window.COURSE_CODE_MODULE = {
  "title": "Relationships and Collections",
  "codeIntro": "Nested selection binds the child to its real parent and an authorized project relationship. Bulk input is bounded before allocation, every returned identity is matched exactly, and all conditional writes commit or roll back together.",
  "codeExamples": [
    {
      "title": "Select a nested resource through its authorized parent",
      "language": "typescript",
      "blurb": "A trusted builder captures the application-owned reader. The lookup validates both identifiers and requires the task ID, claimed project ID, trusted tenant, active parent, and an owner, administrator, or reader relationship in one query.",
      "code": `// src/tasks/readable-task.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_TASK_TITLE =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type Task = Readonly<{
  id: string;
  projectId: string;
  title: string;
  project: Readonly<{
    tenantId: string;
    ownerId: string;
    administratorIds: readonly string[];
    readerIds: readonly string[];
    deletedAt: null;
    state: "active" | "archived";
  }>;
}>;

type ReadableTaskFilter = Readonly<{
  id: string;
  projectId: string;
  project: Readonly<{
    tenantId: string;
    deletedAt: null;
    state: "active";
    OR: readonly [
      Readonly<{ ownerId: string }>,
      Readonly<{ administratorIds: Readonly<{ has: string }> }>,
      Readonly<{
        readers: Readonly<{ some: Readonly<{ userId: string }> }>;
      }>
    ];
  }>;
}>;

interface TaskReader {
  findFirst(
    query: Readonly<{ where: ReadableTaskFilter }>
  ): Promise<Task | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function buildReadableTaskLoader(table: TaskReader) {
 return async function loadReadableTask(
  principal: unknown,
  projectId: unknown,
  taskId: unknown
 ): Promise<Task> {
  assertAuthenticatedPrincipal(principal);
  if (typeof projectId !== "string" ||
      typeof taskId !== "string" ||
      !IDENTIFIER.test(projectId) ||
      !IDENTIFIER.test(taskId)) {
    throw new TypeError("nested resource identifier rejected");
  }

  const task = await table.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        tenantId: principal.tenantId,
        deletedAt: null,
        state: "active",
        OR: [
          { ownerId: principal.userId },
          { administratorIds: { has: principal.userId } },
          { readers: { some: { userId: principal.userId } } }
        ]
      }
    }
  });
  if (task === null) throw new NotFoundError();
  if (typeof task !== "object" ||
      Array.isArray(task) ||
      typeof task.id !== "string" ||
      task.id !== taskId ||
      typeof task.projectId !== "string" ||
      task.projectId !== projectId ||
      typeof task.title !== "string" ||
      task.title.length < 1 ||
      task.title.length > 200 ||
      task.title !== task.title.normalize("NFC").trim() ||
      UNSAFE_TASK_TITLE.test(task.title) ||
      typeof task.project !== "object" ||
      task.project === null ||
      typeof task.project.tenantId !== "string" ||
      task.project.tenantId !== principal.tenantId ||
      task.project.deletedAt !== null ||
      typeof task.project.ownerId !== "string" ||
      !IDENTIFIER.test(task.project.ownerId) ||
      !Array.isArray(task.project.administratorIds) ||
      !Array.isArray(task.project.readerIds) ||
      task.project.administratorIds.length > 1000 ||
      task.project.readerIds.length > 1000 ||
      task.project.administratorIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      task.project.readerIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      task.project.state !== "active" ||
      (task.project.ownerId !== principal.userId &&
        !task.project.administratorIds.includes(principal.userId) &&
        !task.project.readerIds.includes(principal.userId))) {
    throw new RepositoryContractError("unexpected nested resource");
  }
  return Object.freeze({
    id: task.id,
    projectId: task.projectId,
    title: task.title,
    project: Object.freeze({
      tenantId: task.project.tenantId,
      ownerId: task.project.ownerId,
      administratorIds: Object.freeze([
        ...task.project.administratorIds
      ]),
      readerIds: Object.freeze([...task.project.readerIds]),
      deletedAt: task.project.deletedAt,
      state: task.project.state
    })
  });
 };
}`
    },
    {
      "title": "Authorize an exact bounded set and archive atomically",
      "language": "typescript",
      "blurb": "A trusted builder captures the transaction-capable database adapter. The boundary rejects malformed, duplicate, empty, or oversized batches before querying, validates the exact resolved set, and repeats identity, tenant, relationship, state, and version predicates inside one rollback-capable transaction.",
      "code": `// src/projects/archive-projects.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_BULK_PROJECTS = 50;

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type ProjectForArchive = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  administratorIds: readonly string[];
  deletedAt: null;
  state: "active" | "archived";
  version: number;
}>;

type ArchiveProjectFilter = Readonly<{
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

type ArchiveCandidateFilter = Readonly<{
  id: Readonly<{ in: readonly string[] }>;
  tenantId: string;
  deletedAt: null;
  state: "active";
  OR: readonly [
    Readonly<{ ownerId: string }>,
    Readonly<{ administratorIds: Readonly<{ has: string }> }>
  ];
}>;

interface ArchiveTransaction {
  project: {
    updateMany(command: Readonly<{
      where: ArchiveProjectFilter;
      data: Readonly<{
        state: "archived";
        version: Readonly<{ increment: 1 }>;
      }>;
    }>): Promise<Readonly<{ count: number }>>;
  };
}

interface ArchiveDatabase {
  findMany(query: Readonly<{
    where: ArchiveCandidateFilter;
  }>): Promise<readonly ProjectForArchive[]>;

  transaction<T>(
    operation: (transaction: ArchiveTransaction) => Promise<T>
  ): Promise<T>;
}

class ForbiddenError extends Error {}
class ArchiveConflictError extends Error {}

function parseProjectIds(input: unknown): readonly string[] {
  if (!Array.isArray(input) ||
      input.length < 1 ||
      input.length > MAX_BULK_PROJECTS) {
    throw new TypeError("project batch rejected");
  }

  const seen = new Set<string>();
  const identifiers: string[] = [];
  for (const value of input) {
    if (typeof value !== "string" ||
        !IDENTIFIER.test(value) ||
        seen.has(value)) {
      throw new TypeError("project batch rejected");
    }
    seen.add(value);
    identifiers.push(value);
  }
  return Object.freeze(identifiers);
}

function canArchiveProject(
  principal: AuthenticatedPrincipal,
  project: ProjectForArchive
): boolean {
  return project.tenantId === principal.tenantId &&
    project.state === "active" &&
    (project.ownerId === principal.userId ||
      project.administratorIds.includes(principal.userId));
}

function buildProjectArchiver(database: ArchiveDatabase) {
 return async function archiveProjects(
  principal: unknown,
  input: unknown
 ): Promise<void> {
  assertAuthenticatedPrincipal(principal);
  const projectIds = parseProjectIds(input);
  const requested = new Set(projectIds);
  const projects = await database.findMany({
    where: {
      id: { in: projectIds },
      tenantId: principal.tenantId,
      deletedAt: null,
      state: "active",
      OR: [
        { ownerId: principal.userId },
        { administratorIds: { has: principal.userId } }
      ]
    }
  });

  if (!Array.isArray(projects) || projects.length !== projectIds.length) {
    throw new ForbiddenError();
  }
  const resolved = new Set<string>();
  for (const project of projects) {
    if (typeof project !== "object" ||
        project === null ||
        Array.isArray(project) ||
        typeof project.id !== "string" ||
        !requested.has(project.id) ||
        resolved.has(project.id) ||
        typeof project.tenantId !== "string" ||
        project.deletedAt !== null ||
        typeof project.ownerId !== "string" ||
        !IDENTIFIER.test(project.ownerId) ||
        typeof project.version !== "number" ||
        !Number.isSafeInteger(project.version) ||
        project.version < 0 ||
        project.version >= Number.MAX_SAFE_INTEGER ||
        !Array.isArray(project.administratorIds) ||
        project.administratorIds.length > 1000 ||
        project.administratorIds.some((id: unknown) =>
          typeof id !== "string" || !IDENTIFIER.test(id)
        ) ||
        !canArchiveProject(principal, project)) {
      throw new ForbiddenError();
    }
    resolved.add(project.id);
  }
  if (resolved.size !== requested.size) throw new ForbiddenError();

  const expectedProjects = Object.freeze(projects.map(project =>
    Object.freeze({ id: project.id, version: project.version })
  ));

  // Throwing inside this callback rolls back every preceding member update.
  await database.transaction(async transaction => {
    for (const project of expectedProjects) {
      const result = await transaction.project.updateMany({
        where: {
          id: project.id,
          tenantId: principal.tenantId,
          deletedAt: null,
          state: "active",
          version: project.version,
          OR: [
            { ownerId: principal.userId },
            { administratorIds: { has: principal.userId } }
          ]
        },
        data: {
          state: "archived",
          version: { increment: 1 }
        }
      });
      if (typeof result !== "object" ||
          result === null ||
          Array.isArray(result) ||
          !Number.isSafeInteger(result.count) ||
          result.count !== 1) {
        throw new ArchiveConflictError(
          "project authorization changed during archive"
        );
      }
    }
  });
 };
}`
    }
  ]
};
