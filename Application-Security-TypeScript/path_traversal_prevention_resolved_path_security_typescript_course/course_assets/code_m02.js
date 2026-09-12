window.COURSE_CODE_MODULE = {
  "title": "Resolve an Authorized Storage Object",
  "codeIntro": "The request carries only an attachment ID. Authentication and tenant-scoped authorization mint a short-lived storage capability; request code never receives a pathname.",
  "codeExamples": [
    {
      "title": "Resolve and consume an authorized storage capability",
      "language": "typescript",
      "blurb": "The repository derives tenant and subject from an authenticated principal, checks the download permission and object state, and validates stored metadata before minting the capability. The storage adapter rechecks the capability version and opens through its protected root; it does not accept caller paths. The display name remains response metadata and still needs the application's reviewed Content-Disposition encoder.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type RequestContext = unknown;
type StorageCategory = "attachments" | "exports";

const principalKey = Symbol("authenticated principal");
const attachmentKey = Symbol("authorized attachment");
const authenticatedPrincipals = new WeakSet<object>();
const authorizedAttachments = new WeakSet<object>();

class AuthenticatedPrincipal {
  readonly tenantId: string;
  readonly subjectId: string;

  constructor(
    key: typeof principalKey,
    tenantId: string,
    subjectId: string
  ) {
    if (key !== principalKey ||
        !/^tenant_[a-f0-9]{32}$/.test(tenantId) ||
        !/^subject_[a-f0-9]{32}$/.test(subjectId)) {
      throw new TypeError("invalid authenticated principal");
    }
    this.tenantId = tenantId;
    this.subjectId = subjectId;
    authenticatedPrincipals.add(this);
    Object.freeze(this);
  }
}

class AuthorizedAttachment {
  readonly #id: string;
  readonly #category: StorageCategory;
  readonly #storedName: string;
  readonly #version: number;
  readonly displayName: string;

  constructor(
    key: typeof attachmentKey,
    record: Readonly<{
      id: string;
      category: StorageCategory;
      storedName: string;
      version: number;
      displayName: string;
    }>
  ) {
    if (key !== attachmentKey ||
        !/^att_[a-f0-9]{32}$/.test(record.id) ||
        (record.category !== "attachments" && record.category !== "exports") ||
        !/^[a-f0-9]{64}\.bin$/.test(record.storedName) ||
        !Number.isSafeInteger(record.version) || record.version < 1 ||
        !/^[A-Za-z0-9][A-Za-z0-9._() -]{0,127}$/.test(record.displayName)) {
      throw new TypeError("invalid authorized attachment");
    }
    this.#id = record.id;
    this.#category = record.category;
    this.#storedName = record.storedName;
    this.#version = record.version;
    this.displayName = record.displayName;
    authorizedAttachments.add(this);
    Object.freeze(this);
  }

  storageRecord(key: typeof attachmentKey): Readonly<{
    id: string;
    category: StorageCategory;
    storedName: string;
    version: number;
  }> {
    if (key !== attachmentKey || !authorizedAttachments.has(this)) {
      throw new TypeError("invalid attachment capability");
    }
    return Object.freeze({
      id: this.#id,
      category: this.#category,
      storedName: this.#storedName,
      version: this.#version
    });
  }
}

interface AuthenticationBoundary {
  requirePrincipal(context: RequestContext): AuthenticatedPrincipal;
}

interface AuthorizedAttachmentRepository {
  // One trusted query applies tenant, subject, action, state, and version.
  requireDownload(
    principal: AuthenticatedPrincipal,
    attachmentId: string
  ): Promise<AuthorizedAttachment>;
}

interface ProtectedDownloadStorage {
  // Revalidates the capability and opens by category and server name beneath
  // protected storage. The returned body is already-open, bounded read data.
  readAuthorized(
    record: Readonly<{
      id: string;
      category: StorageCategory;
      storedName: string;
      version: number;
    }>,
    maxBytes: number
  ): Promise<Uint8Array>;
}

type Download = Readonly<{
  body: Uint8Array;
  displayName: string;
}>;

function parseAttachmentId(value: unknown): string {
  if (typeof value !== "string" || !/^att_[a-f0-9]{32}$/.test(value)) {
    throw new TypeError("invalid attachment identifier");
  }
  return value;
}

// Call once at trusted bootstrap; collaborators are never request parameters.
function buildAttachmentDownload(
  authentication: AuthenticationBoundary,
  repository: AuthorizedAttachmentRepository,
  storage: ProtectedDownloadStorage
): (context: RequestContext, attachmentId: unknown) => Promise<Download> {
  if (typeof authentication !== "object" || authentication === null ||
      typeof authentication.requirePrincipal !== "function" ||
      typeof repository !== "object" || repository === null ||
      typeof repository.requireDownload !== "function" ||
      typeof storage !== "object" || storage === null ||
      typeof storage.readAuthorized !== "function") {
    throw new TypeError("invalid download composition");
  }
  const requirePrincipal = authentication.requirePrincipal.bind(authentication);
  const requireDownload = repository.requireDownload.bind(repository);
  const readAuthorized = storage.readAuthorized.bind(storage);

  return async (
    context: RequestContext,
    attachmentId: unknown
  ): Promise<Download> => {
    const principal = requirePrincipal(context);
    if (!(principal instanceof AuthenticatedPrincipal) ||
        !authenticatedPrincipals.has(principal)) {
      throw new TypeError("invalid authenticated principal");
    }
    const attachment = await requireDownload(
      principal,
      parseAttachmentId(attachmentId)
    );
    if (!(attachment instanceof AuthorizedAttachment) ||
        !authorizedAttachments.has(attachment)) {
      throw new TypeError("invalid attachment capability");
    }
    const body = await readAuthorized(
      attachment.storageRecord(attachmentKey),
      10 * 1024 * 1024
    );
    if (!(body instanceof Uint8Array) || body.byteLength > 10 * 1024 * 1024) {
      throw new Error("download failed");
    }
    return Object.freeze({
      body: body.slice(),
      displayName: attachment.displayName
    });
  };
}`
    }
  ]
};
