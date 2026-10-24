window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Connections, Authentication, and TLS with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Create a TLS-validated MongoDB client",
      "language": "javascript",
      "blurb": "The MongoDB driver parses single-host, SRV, and replica-set seed-list URIs while explicit options require TLS and bound pool behavior.",
      "code": "export function createProductionMongoClient(MongoClient, config) {\n  if (typeof config?.mongoUri !== \"string\" || !/^mongodb(?:\\+srv)?:\\/\\//.test(config.mongoUri)) {\n    throw new TypeError(\"MongoDB URI required\");\n  }\n  if (config.environment === \"production\" && config.tlsCaFile == null) throw new Error(\"production CA file required\");\n  return new MongoClient(config.mongoUri, {\n    tls: true, tlsCAFile: config.tlsCaFile, tlsAllowInvalidCertificates: false,\n    tlsAllowInvalidHostnames: false, maxPoolSize: 20, minPoolSize: 2,\n    connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000, appName: \"accounts-api\"\n  });\n}\n"
    },
    {
      "title": "Redact a MongoDB connection failure",
      "language": "javascript",
      "blurb": "The safe diagnostic preserves a driver code and operation name without returning or logging the connection URI.",
      "code": "export function mongoConnectionDiagnostic(error) {\n  const allowedCodes = new Set([\"ETIMEDOUT\", \"ECONNREFUSED\", \"ENOTFOUND\", \"MongoServerSelectionError\"]);\n  const code = allowedCodes.has(error?.code) ? error.code :\n    allowedCodes.has(error?.name) ? error.name : \"MONGO_CONNECTION_FAILED\";\n  return { event: \"mongo_connect_failed\", code, retryable: code === \"ETIMEDOUT\" || code === \"MongoServerSelectionError\" };\n}\n"
    }
  ]
};
