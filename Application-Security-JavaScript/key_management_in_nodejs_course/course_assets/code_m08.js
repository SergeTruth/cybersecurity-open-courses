window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Public-Key Systems, JWKS, Certificates, and Trust Distribution with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Select a JWKS key by immutable metadata",
      "language": "javascript",
      "blurb": "The selector requires a unique kid and checks use, algorithm, and key type before constructing a public key.",
      "code": "import { createPublicKey } from \"node:crypto\";\n\nexport function selectJwksVerificationKey(jwks, header) {\n  if (header?.alg !== \"EdDSA\" || typeof header.kid !== \"string\") throw new TypeError(\"unsupported token header\");\n  const matches = jwks.keys.filter((key) => key.kid === header.kid);\n  if (matches.length !== 1) throw new Error(\"verification key not uniquely identified\");\n  const jwk = matches[0];\n  if (jwk.use !== \"sig\" || jwk.alg !== \"EdDSA\" || jwk.kty !== \"OKP\" || jwk.crv !== \"Ed25519\") throw new Error(\"JWK policy failed\");\n  return createPublicKey({ key: jwk, format: \"jwk\" });\n}\n"
    },
    {
      "title": "Check a certificate against an approved fingerprint",
      "language": "javascript",
      "blurb": "Certificate parsing does not establish application trust; the expected SHA-256 fingerprint comes from managed policy.",
      "code": "import { X509Certificate, timingSafeEqual } from \"node:crypto\";\n\nexport function certificateMatchesPin(pem, expectedHex) {\n  const expectedText = String(expectedHex ?? \"\");\n  if (!/^[a-f0-9]{64}$/i.test(expectedText)) return false;\n  const cert = new X509Certificate(pem);\n  const actual = Buffer.from(cert.fingerprint256.replaceAll(\":\", \"\"), \"hex\");\n  const expected = Buffer.from(expectedText, \"hex\");\n  return timingSafeEqual(actual, expected);\n}\n"
    }
  ]
};
