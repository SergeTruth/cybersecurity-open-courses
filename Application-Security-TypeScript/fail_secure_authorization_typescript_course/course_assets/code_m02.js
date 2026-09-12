window.COURSE_CODE_MODULE = {
  "title": "Preserve Decision Meaning",
  "codeIntro": "The internal decision union has exactly one granting variant. Denial and evaluation failure retain distinct, bounded operational categories while both stop execution.",
  "codeExamples": [
    {
      "title": "Exhaustive internal decision enforcement",
      "language": "typescript",
      "blurb": "Only trusted local code may construct this union after runtime validation. Raw policy-service objects never enter requireAllowed, and client errors never receive rule details or dependency exception text.",
      "code": `// TypeScript 7.0.2, ES2022, strict mode.
type DenialCategory =
  | "policy_denied"
  | "resource_not_visible"
  | "invalid_state";

type IndeterminateCategory =
  | "deadline"
  | "dependency_failure"
  | "invalid_response"
  | "missing_context";

type AuthorizationDecision =
  | Readonly<{ kind: "allow"; evaluationId: string }>
  | Readonly<{
      kind: "deny";
      category: DenialCategory;
      evaluationId: string;
    }>
  | Readonly<{
      kind: "indeterminate";
      category: IndeterminateCategory;
    }>;

class ForbiddenError extends Error {
  constructor() {
    super("operation forbidden");
    this.name = "ForbiddenError";
  }
}

class AuthorizationUnavailableError extends Error {
  readonly category: IndeterminateCategory;

  constructor(category: IndeterminateCategory) {
    super("authorization unavailable");
    this.name = "AuthorizationUnavailableError";
    this.category = category;
    Object.freeze(this);
  }
}

function requireAllowed(decision: AuthorizationDecision): void {
  switch (decision.kind) {
    case "allow":
      return;
    case "deny":
      throw new ForbiddenError();
    case "indeterminate":
      throw new AuthorizationUnavailableError(decision.category);
    default: {
      const unreachable: never = decision;
      void unreachable;
      throw new AuthorizationUnavailableError("invalid_response");
    }
  }
}`
    }
  ]
};
