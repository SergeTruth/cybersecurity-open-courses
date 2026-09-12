window.COURSE_CODE_MODULE = {
  "title": "Credential providers",
  "codeIntro": "Conceptual TypeScript pseudocode. Use your platform's supported APIs and documented provider behavior.",
  "codeExamples": [
    {
      "title": "Keep credential acquisition behind the client",
      "language": "typescript",
      "blurb": "The client retains the provider so it can obtain fresh credentials. The exact constructor and option names vary by SDK.",
      "code": "const credential = createDefaultCredentialProvider();\nconst client = new ServiceClient({ credential });\n\nawait client.performAllowedOperation();"
    },
    {
      "title": "Make production identity selection deliberate",
      "language": "typescript",
      "blurb": "These provider names are illustrative. Validate deployment configuration at startup; production must fail if its required workload provider is unavailable.",
      "code": "const credential = deployment.environment === \"production\"\n  ? createWorkloadCredentialProvider({\n      identity: deployment.expectedIdentity\n    })\n  : createApprovedDeveloperCredentialProvider();\n\nconst client = new ServiceClient({ credential });"
    }
  ]
};
