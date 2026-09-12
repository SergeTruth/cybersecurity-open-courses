window.COURSE_CODE_MODULE = {
  "title": "Explicit Policy Enforcement",
  "codeIntro": "The pure policy explains the domain decision, while the repository operation repeats every mutable policy fact in the final conditional write. The read-time decision is useful for clarity but is never treated as a durable authorization grant.",
  "codeExamples": [
    {
      "title": "Explain policy, then preserve it through the write",
      "language": "typescript",
      "blurb": "A trusted builder captures the application repository. The service evaluates a validated read-only candidate for a visible decision, snapshots mutable relationship data, then supplies the expected version and authenticated identity to an atomic writer that rechecks tenant, relationship, lifecycle state, and version. It returns an exact frozen projection.",
      "code": `// src/projects/edit-project.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const UNSAFE_PROJECT_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;

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

type EditProjectCommand = Readonly<{
  projectId: string;
  expectedVersion: number;
  name: string;
}>;

interface ProjectRepository {
  findVisible(
    principal: AuthenticatedPrincipal,
    projectId: string
  ): Promise<Project | null>;

  updateNameIfEditable(command: Readonly<{
    projectId: string;
    tenantId: string;
    userId: string;
    expectedVersion: number;
    name: string;
  }>): Promise<Project | null>;
}

class NotFoundError extends Error {}
class RepositoryContractError extends Error {}

function canEditProject(
  principal: AuthenticatedPrincipal,
  project: Project
): boolean {
  if (principal.tenantId !== project.tenantId) return false;
  if (project.state !== "active") return false;
  return project.ownerId === principal.userId ||
    project.administratorIds.includes(principal.userId);
}

function buildEditProject(repository: ProjectRepository) {
 return async function editProject(
  principal: unknown,
  input: unknown
 ): Promise<Project> {
  assertAuthenticatedPrincipal(principal);
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("edit command rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("edit command rejected");
  }
  const allowedKeys = new Set(["projectId", "expectedVersion", "name"]);
  let keyCount = 0;
  for (const key in value) {
    if (!Object.hasOwn(value, key) ||
        !allowedKeys.has(key) ||
        ++keyCount > allowedKeys.size) {
      throw new TypeError("edit command rejected");
    }
  }
  const projectId = value.projectId;
  const expectedVersion = value.expectedVersion;
  const name = value.name;
  if (keyCount !== allowedKeys.size ||
      typeof projectId !== "string" ||
      typeof expectedVersion !== "number" ||
      typeof name !== "string") {
    throw new TypeError("edit command rejected");
  }
  const command: EditProjectCommand = Object.freeze({
    projectId,
    expectedVersion,
    name
  });
  if (typeof command.projectId !== "string" ||
      !IDENTIFIER.test(command.projectId) ||
      typeof command.expectedVersion !== "number" ||
      !Number.isSafeInteger(command.expectedVersion) ||
      command.expectedVersion < 0 ||
      command.expectedVersion >= Number.MAX_SAFE_INTEGER ||
      typeof command.name !== "string" ||
      command.name.length < 1 ||
      command.name.length > 100 ||
      command.name !== command.name.normalize("NFC").trim() ||
      UNSAFE_PROJECT_NAME.test(command.name)) {
    throw new TypeError("edit command rejected");
  }

  const candidate = await repository.findVisible(
    principal,
    command.projectId
  );
  if (candidate === null) throw new NotFoundError();
  if (typeof candidate !== "object" ||
      Array.isArray(candidate) ||
      typeof candidate.id !== "string" ||
      candidate.id !== command.projectId ||
      typeof candidate.tenantId !== "string" ||
      candidate.tenantId !== principal.tenantId ||
      candidate.deletedAt !== null ||
      typeof candidate.ownerId !== "string" ||
      !IDENTIFIER.test(candidate.ownerId) ||
      !Array.isArray(candidate.administratorIds) ||
      candidate.administratorIds.length > 1000 ||
      candidate.administratorIds.some(id =>
        typeof id !== "string" || !IDENTIFIER.test(id)
      ) ||
      typeof candidate.name !== "string" ||
      candidate.name.length < 1 ||
      candidate.name.length > 100 ||
      candidate.name !== candidate.name.normalize("NFC").trim() ||
      UNSAFE_PROJECT_NAME.test(candidate.name) ||
      (candidate.state !== "active" && candidate.state !== "archived") ||
      typeof candidate.version !== "number" ||
      !Number.isSafeInteger(candidate.version) ||
      candidate.version < 0 ||
      candidate.version >= Number.MAX_SAFE_INTEGER) {
    throw new RepositoryContractError("unexpected project read result");
  }
  if (candidate.version !== command.expectedVersion ||
      !canEditProject(principal, candidate)) {
    throw new NotFoundError();
  }

  // Copy mutable repository values before awaiting another collaborator.
  const expectedOwnerId = candidate.ownerId;
  const expectedAdministratorIds = Object.freeze([
    ...candidate.administratorIds
  ]);
  const expectedCandidateVersion = candidate.version;

  const updated = await repository.updateNameIfEditable({
    projectId: candidate.id,
    tenantId: principal.tenantId,
    userId: principal.userId,
    expectedVersion: expectedCandidateVersion,
    name: command.name
  });
  if (updated === null) throw new NotFoundError();
  if (typeof updated !== "object" ||
      Array.isArray(updated) ||
      typeof updated.id !== "string" ||
      updated.id !== candidate.id ||
      typeof updated.tenantId !== "string" ||
      updated.tenantId !== principal.tenantId ||
      updated.deletedAt !== null ||
      typeof updated.ownerId !== "string" ||
      updated.ownerId !== expectedOwnerId ||
      !Array.isArray(updated.administratorIds) ||
      updated.administratorIds.length !==
        expectedAdministratorIds.length ||
      updated.administratorIds.some((id, index) =>
        typeof id !== "string" ||
        !IDENTIFIER.test(id) ||
        id !== expectedAdministratorIds[index]
      ) ||
      typeof updated.name !== "string" ||
      updated.name !== command.name ||
      updated.state !== "active" ||
      typeof updated.version !== "number" ||
      !Number.isSafeInteger(updated.version) ||
      updated.version !== expectedCandidateVersion + 1) {
    throw new RepositoryContractError("unexpected project update result");
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
