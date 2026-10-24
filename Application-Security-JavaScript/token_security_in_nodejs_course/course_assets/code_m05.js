window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply JWTs, Claims, Signatures, and Validation through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Select a JWT key only from an untrusted header",
      "language": "javascript",
      "blurb": "Header parsing is limited to choosing an approved key identifier and algorithm; no claims are trusted before signature verification succeeds.",
      "code": "export function selectJwtVerificationKey(decodedHeader, keySet) {\n  if (decodedHeader?.alg !== \"EdDSA\" || !/^[a-z0-9._-]{3,64}$/i.test(decodedHeader.kid ?? \"\")) throw new Error(\"JWT header policy rejected\");\n  const key = keySet.get(decodedHeader.kid);\n  if (!key || key.use !== \"sig\" || key.alg !== \"EdDSA\") throw new Error(\"approved JWT key unavailable\");\n  return key.publicKey;\n}\n"
    },
    {
      "title": "Verify JWT signature and registered claims together",
      "language": "javascript",
      "blurb": "The concrete jose verifier requires the access-token claims, validates expiration and token age, and checks bounded identity/scope types before returning authorization context.",
      "code": "// Node.js ESM; tested with jose 6.1.0. Install: npm install jose@6.1.0\nimport { jwtVerify } from \"jose\";\nexport async function verifyAccessJwt(token, key, policy) {\n  // key and expected issuer/audience are application-owned, not token-supplied.\n  if (typeof token !== \"string\" || token.length > 16_384 ||\n      typeof policy?.issuer !== \"string\" || !policy.issuer ||\n      typeof policy.audience !== \"string\" || !policy.audience) throw new TypeError(\"JWT policy invalid\");\n  const { payload, protectedHeader } = await jwtVerify(token, key, {\n    algorithms: [\"EdDSA\"], issuer: policy.issuer, audience: policy.audience,\n    clockTolerance: 30, maxTokenAge: \"15m\",\n    requiredClaims: [\"iss\", \"aud\", \"sub\", \"exp\", \"iat\", \"jti\", \"client_id\"]\n  });\n  const text = value => typeof value === \"string\" && value.length > 0 && value.length <= 256 &&\n    !/[\\u0000-\\u0020\\u007f]/.test(value);\n  if (!text(payload.sub) || !text(payload.jti) || !text(payload.client_id) ||\n      !Number.isSafeInteger(payload.exp) || !Number.isSafeInteger(payload.iat) || payload.exp <= payload.iat ||\n      (payload.scope != null && (typeof payload.scope !== \"string\" || payload.scope.length > 2048 ||\n        !/^[\\x21\\x23-\\x5b\\x5d-\\x7e]+(?: [\\x21\\x23-\\x5b\\x5d-\\x7e]+)*$/.test(payload.scope))) ||\n      ![\"at+jwt\", \"application/at+jwt\"].includes(protectedHeader.typ)) throw new Error(\"access-token claims incomplete\");\n  return Object.freeze({ subjectId: payload.sub, tokenId: payload.jti, scope: payload.scope ?? \"\", expiresAt: payload.exp });\n}\n"
    }
  ]
};
