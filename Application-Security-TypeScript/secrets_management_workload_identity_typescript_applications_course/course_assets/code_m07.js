window.COURSE_CODE_MODULE = {
  "title": "Verify effective identity and denied access",
  "codeIntro": "Conceptual integration-test pseudocode. Use an isolated test environment with synthetic data and your platform's test controls.",
  "codeExamples": [
    {
      "title": "Test the principal and the permission boundary",
      "language": "typescript",
      "blurb": "The harness reads approved service metadata, never token values. It maps only documented platform authorization denials to ACCESS_DENIED and an unavailable intended provider to INTENDED_PROVIDER_UNAVAILABLE; transport or programming errors retain distinct failures. The unrelated secret must exist. A healthy test-only canary monitor records every attempted fallback provider and authenticated canary principal, including attempts before failed startup. Revocation timing and cache clearing follow platform behavior.",
      "code": "expect(await harness.effectivePrincipal())\n  .toEqual(expectedWorkloadIdentity);\nawait expect(harness.readAllowedResource()).resolves.toBeDefined();\nawait expect(harness.readUnrelatedSecret()).rejects.toMatchObject({\n  code: \"ACCESS_DENIED\"\n});\n// A dependency outage must not count as an authorization denial.\nawait expect(harness.readAllowedResource()).resolves.toBeDefined();\n\nawait harness.expireTestCredential();\nawait expect(harness.readAllowedResource()).resolves.toBeDefined();\nexpect(await harness.effectivePrincipal())\n  .toEqual(expectedWorkloadIdentity);\n\n// This checks monitor health/coverage, then starts a fresh capture.\nawait harness.verifyCanaryMonitorAndResetCapture();\nawait harness.disableIntendedProviderAndClearCache();\nawait expect(harness.startFreshProcessWithFallbackCanaries())\n  .rejects.toMatchObject({ code: \"INTENDED_PROVIDER_UNAVAILABLE\" });\nexpect(await harness.fallbackCanaryUsage()).toStrictEqual({\n  attemptedProviderIds: [],\n  authenticatedPrincipalIds: []\n});"
    }
  ]
};
