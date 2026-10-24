window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Expiration, Rotation, Revocation, and Replay Resistance through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Claim token-expiration work from authenticated context",
      "language": "javascript",
      "blurb": "The authenticated scheduler validates the event identifier, then claims replay state and expires the token within one durable transaction so failed effects remain retryable.",
      "code": "export async function handleTokenExpiration(event, context, store) {\n  if (context?.authentication !== \"mTLS\" || context.principalId !== \"scheduler.token-expiration\") throw new Error(\"scheduler authentication required\");\n  if (typeof event?.id !== \"string\" || !/^[a-z0-9-]{16,80}$/i.test(event.id) || event.type !== \"token.expire\" ||\n      typeof event.tokenId !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(event.tokenId) ||\n      !Number.isSafeInteger(event.expectedVersion) || event.expectedVersion < 0) throw new TypeError(\"expiration event invalid\");\n  return store.transaction(async (transaction) => {\n    const claimed = await transaction.claimEvent({ scope: \"token-expiration\", id: event.id, expiresAt: Date.now() + 86_400_000 });\n    if (!claimed) return { duplicate: true };\n    await transaction.expireToken(event.tokenId, event.expectedVersion);\n    return { duplicate: false };\n  });\n}\n"
    },
    {
      "title": "Check durable revocation during token use",
      "language": "javascript",
      "blurb": "Authorization checks signature-derived identity, token version, and a durable revocation record instead of relying only on local process memory.",
      "code": "// claims are signature-verified data, not the output of an unverified JWT decode.\nexport async function activeTokenContext(claims, revocations, now = Date.now()) {\n  const identity = value => typeof value === \"string\" && value.length > 0 && value.length <= 256 &&\n    !/[\\u0000-\\u0020\\u007f]/.test(value);\n  if (!Number.isFinite(now) || !identity(claims?.sub) || !identity(claims?.jti) ||\n      !Number.isSafeInteger(claims.exp) || claims.exp <= 0 || claims.exp > Number.MAX_SAFE_INTEGER / 1000 || claims.exp * 1000 <= now ||\n      !Number.isSafeInteger(claims.ver) || claims.ver < 0 ||\n      (claims.scope != null && (typeof claims.scope !== \"string\" || claims.scope.length > 2048 || /[\\u0000-\\u001f\\u007f]/.test(claims.scope)))) return null;\n  const request = Object.freeze({ tokenId: claims.jti, subjectId: claims.sub, version: claims.ver });\n  const scope = claims.scope ?? \"\", expiresAt = claims.exp * 1000;\n  const revoked = await revocations.contains(request);\n  if (typeof revoked !== \"boolean\") throw new Error(\"revocation provider contract invalid\");\n  if (revoked || expiresAt <= Date.now()) return null;\n  return Object.freeze({ subjectId: request.subjectId, tokenId: request.tokenId, scope });\n}\n"
    }
  ]
};
