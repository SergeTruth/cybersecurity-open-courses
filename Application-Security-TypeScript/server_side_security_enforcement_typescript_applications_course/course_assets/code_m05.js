window.COURSE_CODE_MODULE = {
  "title": "Server-Owned Values and Explicit Writes",
  "codeIntro": "The request carries only permitted choices. Trusted services derive price, tenant, subject, audit time, and resulting state, while the final persistence operation rechecks the authoritative product or profile facts it depends on.",
  "codeExamples": [
    {
      "title": "Consume an authoritative price quote atomically",
      "language": "typescript",
      "blurb": "A trusted builder captures the catalog, pricing, clock, and order store. The client supplies product, quantity, and a replay key; a bounded server quote is bound to the request, and one database transaction rechecks membership, product, inventory, and expiry while consuming the quote and inserting the order exactly once.",
      "code": `// src/orders/create-order.ts
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
const MAX_UNIT_PRICE_CENTS = 100_000_000;
const MAX_TOTAL_CENTS = 10_000_000_000;
const MAX_QUOTE_LIFETIME_MS = 5 * 60 * 1000;
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

type OrderInput = Readonly<{
  productId: string;
  quantity: number;
  operationId: string;
}>;
declare function parseOrderInput(input: unknown): OrderInput;

type ProductSnapshot = Readonly<{
  id: string;
  tenantId: string;
  state: "active";
  deletedAt: null;
  version: number;
}>;

type PriceQuote = Readonly<{
  quoteId: string;
  productId: string;
  tenantId: string;
  userId: string;
  productVersion: number;
  quantity: number;
  unitPriceCents: number;
  expiresAtEpochMs: number;
}>;

type Order = Readonly<{
  id: string;
  tenantId: string;
  userId: string;
  productId: string;
  quoteId: string;
  operationId: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  status: "pending";
  createdAt: string;
}>;

interface CatalogReader {
  findPurchasable(query: Readonly<{
    id: string;
    tenantId: string;
    state: "active";
    deletedAt: null;
  }>): Promise<unknown | null>;
}

interface PricingService {
  issueQuote(input: Readonly<{
    product: ProductSnapshot;
    userId: string;
    quantity: number;
  }>): Promise<unknown>;
}

interface OrderStore {
  // One transaction enforces unique (tenantId, userId, operationId), verifies
  // current customer membership, consumes the quote, rechecks product
  // version/state/deletion, reserves inventory, and inserts the order.
  consumeQuoteReserveInventoryAndInsert(command: Readonly<{
    where: Readonly<{
      operation: Readonly<{
        operationId: string;
        tenantId: string;
        userId: string;
      }>;
      membership: Readonly<{
        userId: string;
        tenantId: string;
        role: "customer";
        state: "active";
      }>;
      product: Readonly<{
        id: string;
        tenantId: string;
        deletedAt: null;
        state: "active";
        version: number;
        minimumAvailableQuantity: number;
      }>;
      quote: Readonly<{
        quoteId: string;
        tenantId: string;
        userId: string;
        productId: string;
        productVersion: number;
        quantity: number;
        unitPriceCents: number;
        consumedAt: null;
        expiresAfterDatabaseNow: true;
      }>;
    }>;
    effects: Readonly<{
      consumeQuote: Readonly<{ consumedAt: "database-now" }>;
      decrementAvailableQuantity: number;
      createOrder: Readonly<{
        operationId: string;
        tenantId: string;
        userId: string;
        productId: string;
        quoteId: string;
        quantity: number;
        unitPriceCents: number;
        totalCents: number;
        status: "pending";
        createdAt: "database-now";
      }>;
    }>;
  }>): Promise<unknown | null>;
}

interface Clock {
  nowEpochMs(): number;
}

class ForbiddenError extends Error {}
class NotFoundError extends Error {}
class OrderConflictError extends Error {}
class ServiceContractError extends Error {}

function validatedProduct(
  input: unknown,
  productId: string,
  tenantId: string
): ProductSnapshot {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new ServiceContractError("invalid catalog result");
  }
  const value = input as Record<string, unknown>;
  if (value.id !== productId ||
      value.tenantId !== tenantId ||
      value.state !== "active" ||
      value.deletedAt !== null ||
      typeof value.version !== "number" ||
      !Number.isSafeInteger(value.version) ||
      value.version < 0 ||
      value.version >= Number.MAX_SAFE_INTEGER) {
    throw new ServiceContractError("invalid catalog result");
  }
  return Object.freeze({
    id: productId,
    tenantId,
    state: "active",
    deletedAt: null,
    version: value.version
  });
}

function validatedQuote(
  input: unknown,
  product: ProductSnapshot,
  principal: AuthenticatedPrincipal,
  expectedQuantity: number,
  nowEpochMs: number
): PriceQuote {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new ServiceContractError("invalid pricing result");
  }
  const value = input as Record<string, unknown>;
  const quoteId = value.quoteId;
  const unitPriceCents = value.unitPriceCents;
  const expiresAtEpochMs = value.expiresAtEpochMs;
  if (typeof quoteId !== "string" ||
      !IDENTIFIER.test(quoteId) ||
      value.productId !== product.id ||
      value.tenantId !== principal.tenantId ||
      value.userId !== principal.userId ||
      value.productVersion !== product.version ||
      value.quantity !== expectedQuantity ||
      typeof unitPriceCents !== "number" ||
      !Number.isSafeInteger(unitPriceCents) ||
      unitPriceCents < 1 ||
      unitPriceCents > MAX_UNIT_PRICE_CENTS ||
      typeof expiresAtEpochMs !== "number" ||
      !Number.isSafeInteger(expiresAtEpochMs) ||
      expiresAtEpochMs <= nowEpochMs ||
      expiresAtEpochMs > nowEpochMs + MAX_QUOTE_LIFETIME_MS) {
    throw new ServiceContractError("invalid pricing result");
  }
  return Object.freeze({
    quoteId,
    productId: product.id,
    tenantId: principal.tenantId,
    userId: principal.userId,
    productVersion: product.version,
    quantity: expectedQuantity,
    unitPriceCents,
    expiresAtEpochMs
  });
}

function buildOrderCreator(
  catalog: CatalogReader,
  pricing: PricingService,
  orders: OrderStore,
  clock: Clock
) {
  return async function createOrder(
    principal: unknown,
    input: unknown
  ): Promise<Order> {
    assertAuthenticatedPrincipal(principal);
    if (!principal.roles.includes("customer")) throw new ForbiddenError();
    const request = parseOrderInput(input);
    const found = await catalog.findPurchasable({
      id: request.productId,
      tenantId: principal.tenantId,
      state: "active",
      deletedAt: null
    });
    if (found === null) throw new NotFoundError();
    const product = validatedProduct(
      found,
      request.productId,
      principal.tenantId
    );
    const nowEpochMs = clock.nowEpochMs();
    if (!Number.isSafeInteger(nowEpochMs) ||
        nowEpochMs < 0 ||
        nowEpochMs > MAX_DATE_EPOCH_MS - MAX_QUOTE_LIFETIME_MS) {
      throw new ServiceContractError("invalid clock result");
    }
    const quote = validatedQuote(
      await pricing.issueQuote({
        product,
        userId: principal.userId,
        quantity: request.quantity
      }),
      product,
      principal,
      request.quantity,
      nowEpochMs
    );
    const totalCents = quote.unitPriceCents * request.quantity;
    if (!Number.isSafeInteger(totalCents) ||
        totalCents > MAX_TOTAL_CENTS) {
      throw new OrderConflictError("order total outside policy");
    }
    const inserted = await orders.consumeQuoteReserveInventoryAndInsert({
      where: {
        operation: {
          operationId: request.operationId,
          tenantId: principal.tenantId,
          userId: principal.userId
        },
        membership: {
          userId: principal.userId,
          tenantId: principal.tenantId,
          role: "customer",
          state: "active"
        },
        product: {
          id: product.id,
          tenantId: principal.tenantId,
          deletedAt: null,
          state: "active",
          version: product.version,
          minimumAvailableQuantity: request.quantity
        },
        quote: {
          quoteId: quote.quoteId,
          tenantId: principal.tenantId,
          userId: principal.userId,
          productId: product.id,
          productVersion: product.version,
          quantity: request.quantity,
          unitPriceCents: quote.unitPriceCents,
          consumedAt: null,
          expiresAfterDatabaseNow: true
        }
      },
      effects: {
        consumeQuote: { consumedAt: "database-now" },
        decrementAvailableQuantity: request.quantity,
        createOrder: {
          operationId: request.operationId,
          tenantId: principal.tenantId,
          userId: principal.userId,
          productId: product.id,
          quoteId: quote.quoteId,
          quantity: request.quantity,
          unitPriceCents: quote.unitPriceCents,
          totalCents,
          status: "pending",
          createdAt: "database-now"
        }
      }
    });
    if (inserted === null) throw new OrderConflictError("order unavailable");
    if (typeof inserted !== "object" || Array.isArray(inserted)) {
      throw new ServiceContractError("invalid order result");
    }
    const value = inserted as Record<string, unknown>;
    const id = value.id;
    const createdAt = value.createdAt;
    const createdAtEpochMs = typeof createdAt === "string"
      ? Date.parse(createdAt)
      : Number.NaN;
    if (typeof id !== "string" ||
        !IDENTIFIER.test(id) ||
        value.tenantId !== principal.tenantId ||
        value.userId !== principal.userId ||
        value.productId !== product.id ||
        value.quoteId !== quote.quoteId ||
        value.operationId !== request.operationId ||
        value.quantity !== request.quantity ||
        value.unitPriceCents !== quote.unitPriceCents ||
        value.totalCents !== totalCents ||
        value.status !== "pending" ||
        typeof createdAt !== "string" ||
        !Number.isFinite(createdAtEpochMs) ||
        new Date(createdAtEpochMs).toISOString() !== createdAt) {
      throw new ServiceContractError("invalid order result");
    }
    return Object.freeze({
      id,
      tenantId: principal.tenantId,
      userId: principal.userId,
      productId: product.id,
      quoteId: quote.quoteId,
      operationId: request.operationId,
      quantity: request.quantity,
      unitPriceCents: quote.unitPriceCents,
      totalCents,
      status: "pending",
      createdAt
    });
  };
}`
    },
    {
      "title": "Allowlist and scope a profile update",
      "language": "typescript",
      "blurb": "The parser accepts only the two writable profile fields and a concurrency token. The captured writer repeats verified user, tenant, current membership, lifecycle, and version predicates in one update; role, ownership, audit, and tenant fields never enter its data projection.",
      "code": `// src/users/update-own-profile.ts
const UNSAFE_DISPLAY_NAME =
  /[\\p{Cc}\\p{Cs}\\p{Zl}\\p{Zp}\\p{Default_Ignorable_Code_Point}]/u;
const ALLOWED_LOCALES = new Set(["en-US", "en-GB", "fr-FR"] as const);

declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type ProfileUpdate = Readonly<{
  displayName: string;
  locale: "en-US" | "en-GB" | "fr-FR";
  expectedVersion: number;
}>;

type ProfileView = Readonly<{
  userId: string;
  displayName: string;
  locale: "en-US" | "en-GB" | "fr-FR";
  version: number;
}>;

interface ProfileWriter {
  updateOneIfActive(command: Readonly<{
    where: Readonly<{
      userId: string;
      tenantId: string;
      deletedAt: null;
      state: "active";
      version: number;
      membership: Readonly<{
        userId: string;
        tenantId: string;
        state: "active";
      }>;
    }>;
    data: Readonly<{
      displayName: string;
      locale: "en-US" | "en-GB" | "fr-FR";
      version: Readonly<{ increment: 1 }>;
    }>;
  }>): Promise<unknown | null>;
}

class ProfileConflictError extends Error {}
class RepositoryContractError extends Error {}

function parseProfileUpdate(input: unknown): ProfileUpdate {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new TypeError("profile update rejected");
  }
  const value = input as Record<string, unknown>;
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError("profile update rejected");
  }
  const allowedKeys = new Set([
    "displayName", "locale", "expectedVersion"
  ]);
  let keyCount = 0;
  for (const key in value) {
    if (!Object.hasOwn(value, key) ||
        !allowedKeys.has(key) ||
        ++keyCount > allowedKeys.size) {
      throw new TypeError("profile update rejected");
    }
  }
  const rawDisplayName = value.displayName;
  const locale = value.locale;
  const expectedVersion = value.expectedVersion;
  if (keyCount !== allowedKeys.size ||
      typeof rawDisplayName !== "string" ||
      rawDisplayName.length > 160 ||
      typeof locale !== "string" ||
      locale.length > 16 ||
      !ALLOWED_LOCALES.has(locale as ProfileUpdate["locale"]) ||
      typeof expectedVersion !== "number" ||
      !Number.isSafeInteger(expectedVersion) ||
      expectedVersion < 0 ||
      expectedVersion >= Number.MAX_SAFE_INTEGER) {
    throw new TypeError("profile update rejected");
  }
  const displayName = rawDisplayName.normalize("NFC").trim();
  if (displayName.length < 1 ||
      displayName.length > 80 ||
      UNSAFE_DISPLAY_NAME.test(displayName)) {
    throw new TypeError("profile update rejected");
  }
  return Object.freeze({
    displayName,
    locale: locale as ProfileUpdate["locale"],
    expectedVersion
  });
}

function buildOwnProfileUpdater(writer: ProfileWriter) {
  return async function updateOwnProfile(
    principal: unknown,
    input: unknown
  ): Promise<ProfileView> {
    assertAuthenticatedPrincipal(principal);
    const profile = parseProfileUpdate(input);
    const updated = await writer.updateOneIfActive({
      where: {
        userId: principal.userId,
        tenantId: principal.tenantId,
        deletedAt: null,
        state: "active",
        version: profile.expectedVersion,
        membership: {
          userId: principal.userId,
          tenantId: principal.tenantId,
          state: "active"
        }
      },
      data: {
        displayName: profile.displayName,
        locale: profile.locale,
        version: { increment: 1 }
      }
    });
    if (updated === null) throw new ProfileConflictError();
    if (typeof updated !== "object" || Array.isArray(updated)) {
      throw new RepositoryContractError("invalid profile result");
    }
    const value = updated as Record<string, unknown>;
    if (value.userId !== principal.userId ||
        value.tenantId !== principal.tenantId ||
        value.deletedAt !== null ||
        value.state !== "active" ||
        value.displayName !== profile.displayName ||
        value.locale !== profile.locale ||
        value.version !== profile.expectedVersion + 1) {
      throw new RepositoryContractError("invalid profile result");
    }
    return Object.freeze({
      userId: principal.userId,
      displayName: profile.displayName,
      locale: profile.locale,
      version: profile.expectedVersion + 1
    });
  };
}`
    }
  ]
};
