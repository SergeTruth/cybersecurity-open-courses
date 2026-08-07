window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS, Certificate Validation, and Encrypted Transport through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Build a certificate-validating PostgreSQL TLS policy",
      "language": "javascript",
      "blurb": "The factory validates and snapshots a reviewed host-to-CA mapping, so each connection selects its server name and trust anchor together with certificate verification enabled.",
      "code": "import { X509Certificate, createHash } from \"node:crypto\";\n\nconst databaseHostname = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;\n\nfunction authorityRecord(hostname, caPem) {\n  if (typeof hostname !== \"string\" || !databaseHostname.test(hostname) ||\n      typeof caPem !== \"string\" || Buffer.byteLength(caPem, \"utf8\") > 64 * 1024) {\n    throw new TypeError(\"reviewed database authority invalid\");\n  }\n  const certificate = new X509Certificate(caPem);\n  if (certificate.ca !== true) throw new TypeError(\"database authority must be a CA certificate\");\n  const fingerprint = createHash(\"sha256\").update(certificate.raw).digest(\"hex\");\n  return Object.freeze({ caPem, fingerprint });\n}\n\nexport function createPostgresTlsOptions(reviewedAuthorities) {\n  if (!(reviewedAuthorities instanceof Map)) {\n    throw new TypeError(\"reviewed database authority map required\");\n  }\n  const authorityCount = Object.getOwnPropertyDescriptor(\n    Map.prototype, \"size\"\n  ).get.call(reviewedAuthorities);\n  if (authorityCount < 1 || authorityCount > 16) {\n    throw new TypeError(\"reviewed database authority map required\");\n  }\n  const authorities = new Map();\n  for (const [hostname, caPem] of Map.prototype.entries.call(reviewedAuthorities)) {\n    authorities.set(hostname, authorityRecord(hostname, caPem));\n  }\n  return function postgresTlsOptions(hostname) {\n    const authority = typeof hostname === \"string\" ? authorities.get(hostname) : null;\n    if (!authority) throw new Error(\"approved database host required\");\n    return Object.freeze({\n      ca: authority.caPem, servername: hostname, rejectUnauthorized: true, minVersion: \"TLSv1.2\",\n      authoritySha256: authority.fingerprint\n    });\n  };\n}\n"
    },
    {
      "title": "Verify a pinned database certificate key when policy requires it",
      "language": "javascript",
      "blurb": "The verifier requires one canonical SHA-256 pin, hashes the peer public key, and compares the result after ordinary certificate-chain and hostname checks succeed.",
      "code": "import { createHash, timingSafeEqual } from \"node:crypto\";\n\nexport function verifyDatabaseSpki(peer, expectedSha256) {\n  const authorized = peer?.authorized;\n  const suppliedSpki = peer?.spki;\n  if (authorized !== true || !Buffer.isBuffer(suppliedSpki) ||\n      suppliedSpki.length < 1 || suppliedSpki.length > 16 * 1024) {\n    throw new Error(\"TLS peer not authorized\");\n  }\n  if (typeof expectedSha256 !== \"string\" || !/^[a-f0-9]{64}$/.test(expectedSha256)) {\n    throw new TypeError(\"canonical SHA-256 database key pin required\");\n  }\n  const spki = Buffer.from(suppliedSpki);\n  const actual = createHash(\"sha256\").update(spki).digest();\n  const expected = Buffer.from(expectedSha256, \"hex\");\n  if (!timingSafeEqual(actual, expected)) throw new Error(\"database key pin mismatch\");\n  return true;\n}\n"
    }
  ]
};
