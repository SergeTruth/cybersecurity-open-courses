window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authentication and Session Handling with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Authenticate a server-side session",
      "language": "javascript",
      "blurb": "The cookie contains an opaque identifier; the server loads an unexpired session and returns its trusted subject and tenant context.",
      "code": "function validSessionIdentity(value) {\n  return typeof value === \"string\" && value.length > 0 && value.length <= 256 &&\n    value.trim() === value && !/[\\u0000-\\u001f\\u007f]/.test(value);\n}\n\nexport function createSessionAuthenticator(clock = () => new Date()) {\n  if (typeof clock !== \"function\") throw new TypeError(\"trusted session clock required\");\n  return async function authenticateSession(request, sessions) {\n    const rawFindByHashCapability = sessions?.findByHash;\n    const findByHash = typeof rawFindByHashCapability === \"function\"\n      ? rawFindByHashCapability.bind(sessions)\n      : null;\n    const rawTouchCapability = sessions?.touch;\n    const touch = typeof rawTouchCapability === \"function\"\n      ? rawTouchCapability.bind(sessions)\n      : null;\n    if (!findByHash || !touch) throw new TypeError(\"session store contract invalid\");\n    const now = clock();\n    const nowMs = now instanceof Date ? now.getTime() : Number.NaN;\n    if (!Number.isSafeInteger(nowMs) || nowMs < 0) {\n      throw new TypeError(\"invalid session clock\");\n    }\n    const cookieId = request?.cookies?.session;\n    if (typeof cookieId !== \"string\" || !/^[a-f0-9]{64}$/.test(cookieId)) return null;\n    const session = await findByHash(cookieId);\n    const revokedAt = session?.revokedAt;\n    const expiresAt = session?.expiresAt;\n    const expiresAtMs = expiresAt instanceof Date ? expiresAt.getTime() : Number.NaN;\n    const sessionId = session?.id;\n    const subjectId = session?.subjectId;\n    const tenantId = session?.tenantId;\n    if (!session || (revokedAt !== null && revokedAt !== undefined) ||\n        !Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs ||\n        !validSessionIdentity(sessionId) || !validSessionIdentity(subjectId) ||\n        !validSessionIdentity(tenantId)) return null;\n    await touch(sessionId, new Date(nowMs));\n    return Object.freeze({ subjectId, tenantId, sessionId });\n  };\n}\n\nexport const authenticateSession = createSessionAuthenticator();"
    },
    {
      "title": "Issue a hardened session cookie",
      "language": "javascript",
      "blurb": "The response sets a secure, HTTP-only, same-site cookie with a bounded lifetime and a narrowly scoped path.",
      "code": "export function setSessionCookie(response, opaqueId, maxAgeMs = 30 * 60 * 1000) {\n  const rawCookie = response?.cookie;\n  if (typeof opaqueId !== \"string\" || !/^[a-f0-9]{64}$/.test(opaqueId) ||\n      typeof rawCookie !== \"function\") {\n    throw new TypeError(\"valid session id and response required\");\n  }\n  if (!Number.isSafeInteger(maxAgeMs) ||\n      maxAgeMs < 60_000 || maxAgeMs > 8 * 60 * 60 * 1000) {\n    throw new RangeError(\"invalid session lifetime\");\n  }\n  const cookie = rawCookie.bind(response);\n  return cookie(\"session\", opaqueId, Object.freeze({\n    httpOnly: true,\n    secure: true,\n    sameSite: \"lax\",\n    path: \"/\",\n    maxAge: maxAgeMs\n  }));\n}\n"
    }
  ]
};
