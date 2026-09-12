window.COURSE_CODE_MODULE = {
  "title": "Atomic State Enforcement",
  "codeIntro": "One conditional write combines object authorization, tenant scope, workflow state, optimistic version, and server-owned audit values. The repository returns the updated record or a uniform conflict when any predicate no longer holds.",
  "codeExamples": [
    {
      "title": "Condition approval on identity, relationship, state, and version",
      "language": "typescript",
      "blurb": "A trusted builder captures the application-owned writer and clock. The adapter contract is one UPDATE-WHERE-RETURNING operation; a preceding read cannot replace the tenant, active approver membership, eligible-approver, state, deletion, and version predicates at the mutation point.",
      "code": `// src/approvals/approve.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_DATE_EPOCH_MS = 8_640_000_000_000_000;

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

type ApproveCommand = Readonly<{
  approvalId: string;
  expectedVersion: number;
}>;

type ApprovalView = Readonly<{
  id: string;
  state: "approved";
  approvedAt: string;
  version: number;
}>;

type ApprovalFilter = Readonly<{
  id: string;
  tenantId: string;
  deletedAt: null;
  state: "pending";
  version: number;
  eligibleApproverIds: Readonly<{ has: string }>;
  approverMembership: Readonly<{
    userId: string;
    tenantId: string;
    role: "approver";
    state: "active";
  }>;
}>;

type ApprovalReturning = Readonly<{
  id: true;
  tenantId: true;
  deletedAt: true;
  state: true;
  approvedBy: true;
  approvedAt: true;
  version: true;
}>;

const APPROVAL_RETURNING: ApprovalReturning = Object.freeze({
  id: true,
  tenantId: true,
  deletedAt: true,
  state: true,
  approvedBy: true,
  approvedAt: true,
  version: true
});

interface ApprovalWriter {
  updateOneIfMatching(command: Readonly<{
    where: ApprovalFilter;
    data: Readonly<{
      state: "approved";
      approvedBy: string;
      approvedAt: string;
      version: Readonly<{ increment: 1 }>;
    }>;
    returning: ApprovalReturning;
  }>): Promise<unknown | null>;
}

interface Clock {
  nowEpochMs(): number;
}

class ForbiddenError extends Error {}
class ApprovalConflictError extends Error {}
class RepositoryContractError extends Error {}

function parseApproveCommand(input: unknown): ApproveCommand {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("approval command rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("approval command rejected");
  }
  const allowedKeys = new Set(["approvalId", "expectedVersion"]);
  let keyCount = 0;
  for (const key in value) {
    if (!Object.hasOwn(value, key) ||
        !allowedKeys.has(key) ||
        ++keyCount > allowedKeys.size) {
      throw new TypeError("approval command rejected");
    }
  }
  const approvalId = value.approvalId;
  const expectedVersion = value.expectedVersion;
  if (keyCount !== allowedKeys.size ||
      typeof approvalId !== "string" ||
      !IDENTIFIER.test(approvalId) ||
      typeof expectedVersion !== "number" ||
      !Number.isSafeInteger(expectedVersion) ||
      expectedVersion < 0 ||
      expectedVersion >= Number.MAX_SAFE_INTEGER) {
    throw new TypeError("approval command rejected");
  }
  return Object.freeze({ approvalId, expectedVersion });
}

function buildApprovalService(writer: ApprovalWriter, clock: Clock) {
  return async function approve(
    principal: unknown,
    input: unknown
  ): Promise<ApprovalView> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.roles.includes("approver")) throw new ForbiddenError();
    const command = parseApproveCommand(input);
    const nowEpochMs = clock.nowEpochMs();
    if (!Number.isSafeInteger(nowEpochMs) ||
        nowEpochMs < 0 ||
        nowEpochMs > MAX_DATE_EPOCH_MS) {
      throw new RepositoryContractError("invalid clock result");
    }
    const approvedAt = new Date(nowEpochMs).toISOString();
    const updated = await writer.updateOneIfMatching({
      where: {
        id: command.approvalId,
        tenantId: principal.tenantId,
        deletedAt: null,
        state: "pending",
        version: command.expectedVersion,
        eligibleApproverIds: { has: principal.userId },
        approverMembership: {
          userId: principal.userId,
          tenantId: principal.tenantId,
          role: "approver",
          state: "active"
        }
      },
      data: {
        state: "approved",
        approvedBy: principal.userId,
        approvedAt,
        version: { increment: 1 }
      },
      returning: APPROVAL_RETURNING
    });
    if (updated === null) {
      throw new ApprovalConflictError("approval unavailable");
    }
    if (typeof updated !== "object" || Array.isArray(updated)) {
      throw new RepositoryContractError("invalid approval result");
    }
    const value = updated as Record<string, unknown>;
    if (value.id !== command.approvalId ||
        value.tenantId !== principal.tenantId ||
        value.deletedAt !== null ||
        value.state !== "approved" ||
        value.approvedBy !== principal.userId ||
        value.approvedAt !== approvedAt ||
        value.version !== command.expectedVersion + 1) {
      throw new RepositoryContractError("invalid approval result");
    }
    return Object.freeze({
      id: command.approvalId,
      state: "approved",
      approvedAt,
      version: command.expectedVersion + 1
    });
  };
}`
    }
  ]
};
