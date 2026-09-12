window.COURSE_CODE_MODULE = {
  "title": "A narrow secret accessor",
  "codeIntro": "Conceptual TypeScript pseudocode for server-side retrieval. Replace the illustrated APIs with your platform SDK.",
  "codeExamples": [
    {
      "title": "Authenticate using identity; retrieve one approved secret",
      "language": "typescript",
      "blurb": "The deployment supplies a fixed secret identifier. Do not accept arbitrary secret names from HTTP requests. Store policy must also restrict this identity.",
      "code": "const credential = getPlatformCredential();\nconst secrets = new SecretClient({ credential });\n\nasync function getDatabasePassword(): Promise<string> {\n  const result = await secrets.getSecret(\n    deployment.databaseSecretId\n  );\n  if (!result.value) {\n    throw new Error(\"Database credential is unavailable\");\n  }\n  return result.value;\n}"
    },
    {
      "title": "Handle retrieval failure without dumping SDK errors",
      "language": "typescript",
      "blurb": "The application-owned telemetryQueue.tryEnqueue contract is synchronous, nonblocking, bounded, and returns a boolean; slow sinks run outside this operation. A full or failing queue increments only a local saturating counter. No telemetry exception can replace the fixed dependency error. Monitor the counter separately and configure SDK tracing to exclude credentials and headers.",
      "code": "let droppedDependencyEvents = 0;\n\nfunction recordDependencyFailure(): void {\n  try {\n    if (telemetryQueue.tryEnqueue(Object.freeze({\n      event: \"database_dependency_unavailable\"\n    })) === true) return;\n  } catch {\n    // No raw SDK or telemetry exception is forwarded.\n  }\n  droppedDependencyEvents = Math.min(\n    droppedDependencyEvents + 1, Number.MAX_SAFE_INTEGER\n  );\n}\n\ntry {\n  const password = await getDatabasePassword();\n  await connectDatabase({ password });\n} catch {\n  recordDependencyFailure();\n  throw new Error(\"Database dependency is unavailable\");\n}"
    }
  ]
};
