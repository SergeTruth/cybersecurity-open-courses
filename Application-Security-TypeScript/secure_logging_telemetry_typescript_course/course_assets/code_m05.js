window.COURSE_CODE_MODULE = {
  "title": "Bind Trusted Correlation Context",
  "codeIntro": "The server generates the primary request identifier. A bounded inbound value can be retained separately when cross-system troubleshooting requires it.",
  "codeExamples": [
    {
      "title": "Server-controlled request context",
      "language": "typescript",
      "blurb": "The correlation value associates events; authenticated identity still comes from the trusted authentication context. AuthContext and Logger are application interfaces. Oversized raw inbound IDs are omitted before trimming; the normalized ID still has a separate 128-character limit. Neither inbound IDs nor log fields grant authority.",
      "code": `import { randomUUID } from "node:crypto";
import type { Request } from "express";

function boundedExternalRequestId(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length > 256) return undefined;
  const candidate = value.trim();
  return /^[A-Za-z0-9._:-]{1,128}$/.test(candidate)
    ? candidate
    : undefined;
}

function requestLogger(req: Request, auth: AuthContext): Logger {
  return logger.child({
    requestId: randomUUID(),
    externalRequestId: boundedExternalRequestId(req.headers["x-request-id"]),
    actorId: auth.userId,
    tenantId: auth.tenantId
  });
}`
    }
  ]
};
