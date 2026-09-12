window.COURSE_CODE_MODULE = {
  "title": "Validate claims before populating Express context",
  "codeIntro": "Conceptual server-side TypeScript. This example assumes one trusted issuer with a space-delimited scope claim and an application-specific tenantId. Establish the issuer's authority to assert those claims outside the token.",
  "codeExamples": [
    {
      "title": "Map external data into a narrow context",
      "language": "typescript",
      "blurb": "Call only after full token-policy verification. Identifier validators enforce the issuer contract. Scope tokens use the configured profile's syntax; permissions are still enforced separately.",
      "code": "interface AuthContext {\n  subjectId: string;\n  tenantId: string;\n  scopes: readonly string[];\n}\n\nfunction validateAndMapClaims(\n  claims: Record<string, unknown>\n): AuthContext {\n  const { sub, tenantId, scope } = claims;\n  if (typeof sub !== \"string\" || !isValidSubjectId(sub) ||\n      typeof tenantId !== \"string\" || !isValidTenantId(tenantId) ||\n      typeof scope !== \"string\" ||\n      scope.length > policy.maxScopeCharacters) {\n    throw new InvalidClaimsError();\n  }\n  const scopes = scope === \"\" ? [] : scope.split(\" \");\n  if (scopes.length > policy.maxScopes ||\n      !scopes.every(isValidScopeToken)) {\n    throw new InvalidClaimsError();\n  }\n  return { subjectId: sub, tenantId, scopes };\n}"
    },
    {
      "title": "Continue only after the authentication boundary succeeds",
      "language": "typescript",
      "blurb": "verifyAccessJwt enforces the complete policy shown in Module 3. extractExpectedBearerToken must reject missing or ambiguous credentials and enforce limits. Register req.auth through Express type augmentation in the real app.",
      "code": "async function authenticate(req, res, next) {\n  try {\n    const token = extractExpectedBearerToken(req, policy.maxTokenBytes);\n    const verified = await verifyAccessJwt(\n      token, trustedKeySource, accessTokenPolicy\n    );\n    req.auth = validateAndMapClaims(verified.payload);\n  } catch (error) {\n    // Converts known failures to safe 401 or infrastructure errors.\n    // The error handler must not resume the protected route.\n    return next(toSafeAuthenticationError(error));\n  }\n  return next();\n}"
    }
  ]
};
