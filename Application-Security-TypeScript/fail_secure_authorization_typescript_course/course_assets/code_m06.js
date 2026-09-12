window.COURSE_CODE_MODULE = {
  "title": "Make Middleware Fall-Through Impossible",
  "codeIntro": "The evaluator is awaited, its runtime result is parsed, and every non-allow path calls the error continuation once and returns. The successful continuation sits outside the exception boundary.",
  "codeExamples": [
    {
      "title": "Single-completion Express-style guard",
      "language": "typescript",
      "blurb": "This is a common route precondition, not the object-authorization boundary. The protected application service must still authenticate its opaque context and authorize the exact resource, action, state, and version immediately before the side effect.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type HttpRequest = Readonly<{ requestId: string }>;
type HttpResponse = unknown;
type NextFunction = (error?: Error) => void;

type RouteDecision =
  | Readonly<{ kind: "allow"; evaluationId: string }>
  | Readonly<{ kind: "deny"; evaluationId: string }>
  | Readonly<{
      kind: "indeterminate";
      category: "dependency_failure" | "invalid_response" | "missing_context";
    }>;

interface CommonRouteEvaluator {
  // Authenticates the request and evaluates only the documented route-level
  // prerequisite. It returns runtime data because interfaces are erased.
  evaluate(request: HttpRequest): Promise<unknown>;
}

class AuthorizationHttpError extends Error {
  readonly status: 403 | 503;
  readonly category: "denied" | "unavailable";

  constructor(status: 403 | 503, category: "denied" | "unavailable") {
    super(status === 403 ? "operation forbidden" : "authorization unavailable");
    this.name = "AuthorizationHttpError";
    this.status = status;
    this.category = category;
    Object.freeze(this);
  }
}

function dataProperty(record: object, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(record, name);
  if (descriptor === undefined || !("value" in descriptor) ||
      !descriptor.enumerable) throw new TypeError("invalid decision");
  return descriptor.value;
}

function parseRouteDecision(value: unknown): RouteDecision {
  try {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("invalid decision");
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("invalid decision");
    }
    const kind = dataProperty(value, "kind");
    const keys = Reflect.ownKeys(value);
    if (kind === "allow" || kind === "deny") {
      const evaluationId = dataProperty(value, "evaluationId");
      if (keys.length !== 2 || !keys.includes("kind") ||
          !keys.includes("evaluationId") ||
          typeof evaluationId !== "string" ||
          !/^eval_[a-f0-9]{32}$/u.test(evaluationId)) {
        throw new TypeError("invalid decision");
      }
      return Object.freeze({ kind, evaluationId });
    }
    if (kind === "indeterminate") {
      const category = dataProperty(value, "category");
      if (keys.length !== 2 || !keys.includes("kind") ||
          !keys.includes("category") ||
          (category !== "dependency_failure" &&
            category !== "invalid_response" &&
            category !== "missing_context")) {
        throw new TypeError("invalid decision");
      }
      return Object.freeze({ kind, category });
    }
    throw new TypeError("invalid decision");
  } catch {
    return Object.freeze({ kind: "indeterminate", category: "invalid_response" });
  }
}

function buildCommonRouteGuard(evaluator: CommonRouteEvaluator) {
  const evaluate = evaluator.evaluate.bind(evaluator);

  return async function requireCommonAuthorization(
    request: HttpRequest,
    _response: HttpResponse,
    next: NextFunction
  ): Promise<void> {
    let decision: RouteDecision;
    try {
      decision = parseRouteDecision(await evaluate(request));
    } catch {
      next(new AuthorizationHttpError(503, "unavailable"));
      return;
    }

    if (decision.kind === "deny") {
      next(new AuthorizationHttpError(403, "denied"));
      return;
    }
    if (decision.kind === "indeterminate") {
      next(new AuthorizationHttpError(503, "unavailable"));
      return;
    }

    // Keep next() outside the try block: if downstream throws synchronously,
    // this guard must not catch it and invoke the continuation a second time.
    next();
  };
}`
    }
  ]
};
