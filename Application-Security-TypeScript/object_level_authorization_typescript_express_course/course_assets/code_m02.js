window.COURSE_CODE_MODULE = {
  "title": "Authorization Policy Model",
  "codeIntro": "These are focused source-file fragments from one sample project. They are checked as ES modules with TypeScript 7.0.2, target ES2022, strict, noImplicitReturns, noUncheckedIndexedAccess, and exactOptionalPropertyTypes. Framework adapters target Express 5.2.1. Database examples declare their complete local contracts instead of depending on an unnamed ORM version.",
  "codeExamples": [
    {
      "title": "Read-only subject-action-object policy contract",
      "language": "typescript",
      "blurb": "The authentication module owns the nominal principal type. TypeScript makes the policy contract deeply read-only at compile time; the trusted repository boundary must still copy, validate, and freeze runtime values where they cross trust boundaries. Request-body identity fields are never accepted.",
      "code": `// src/domain/project-policy-input.ts
declare class AuthenticatedPrincipal {
  readonly userId: string;
  readonly tenantId: string;
  readonly roles: readonly ("member" | "project-admin")[];
  private readonly authenticationBrand: void;
}
declare function assertAuthenticatedPrincipal(
  value: unknown
): asserts value is AuthenticatedPrincipal;

type ProjectAction = "read" | "edit" | "archive";

type ProjectSnapshot = Readonly<{
  id: string;
  tenantId: string;
  ownerId: string;
  administratorIds: readonly string[];
  state: "active" | "archived";
  version: number;
}>;

type ProjectPolicyInput = Readonly<{
  subject: AuthenticatedPrincipal;
  action: ProjectAction;
  project: ProjectSnapshot;
}>;`
    }
  ]
};
