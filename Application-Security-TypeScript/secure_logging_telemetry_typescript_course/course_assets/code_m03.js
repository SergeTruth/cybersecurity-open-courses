window.COURSE_CODE_MODULE = {
  "title": "Allowlist Safe Request Context",
  "codeIntro": "The helper reads one approved header and emits only selected metadata. It never forwards the complete header collection, cookie collection, or request body to telemetry.",
  "codeExamples": [
    {
      "title": "Explicit header selection",
      "language": "typescript",
      "blurb": "Express Request is imported explicitly. The fixed raw and output limits cannot be overridden by a caller. Oversized raw headers are omitted before trimming. Only the media-type token is retained: arbitrary Content-Type parameters are not useful to this event and could contain sensitive values. requestId is server-generated correlation context.",
      "code": `import type { Request } from "express";

type SafeRequestMetadata = Readonly<{
  contentType?: string;
  requestId: string;
}>;

function boundedMediaType(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length > 1024) return undefined;
  const mediaType = value.split(";", 1)[0]?.trim().toLowerCase();
  // This event needs only its finite application media-type vocabulary.
  switch (mediaType) {
    case "application/json":
    case "application/x-www-form-urlencoded":
    case "multipart/form-data":
      return mediaType;
    default:
      return undefined;
  }
}

function safeRequestMetadata(req: Request, requestId: string): SafeRequestMetadata {
  const contentType = boundedMediaType(req.headers["content-type"]);
  return Object.freeze(contentType === undefined
    ? { requestId }
    : { contentType, requestId });
}

// Do not pass req.headers, req.cookies, or req.body to the logger.`
    }
  ]
};
