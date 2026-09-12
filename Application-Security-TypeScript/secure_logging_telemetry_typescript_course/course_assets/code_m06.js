window.COURSE_CODE_MODULE = {
  "title": "Categorize Errors Without Copying Requests",
  "codeIntro": "The event exposes only stable diagnostic fields. Raw exceptions are deliberately absent from this interface; the client receives a separate safe response.",
  "codeExamples": [
    {
      "title": "Deliberate diagnostic event",
      "language": "typescript",
      "blurb": "Neither error.name nor error.stack is a safe field automatically: stacks include messages that may contain credentials. This minimal event omits both. Any separate diagnostic stack pipeline needs explicit sanitization, bounds, and sensitive-data policy; protected storage alone is insufficient. Identifiers follow the illustrative ASCII policy in module 2.",
      "code": `type ErrorCategory =
  | "validation"
  | "authorization"
  | "dependency_timeout"
  | "dependency_unavailable"
  | "internal";

function isErrorCategory(value: unknown): value is ErrorCategory {
  return value === "validation" || value === "authorization" ||
    value === "dependency_timeout" || value === "dependency_unavailable" ||
    value === "internal";
}

function diagnosticIdentifier(value: unknown): string {
  if (typeof value !== "string" || value.length > 128 ||
      !/^[A-Za-z0-9][A-Za-z0-9._:@/-]*$/.test(value)) {
    throw new Error("Invalid diagnostic identifier");
  }
  return value;
}

function recordRenderFailure(
  category: unknown,
  requestId: unknown,
  documentId: unknown
): void {
  if (!isErrorCategory(category)) throw new Error("Invalid error category");
  logger.error(Object.freeze({
    event: "document.render.failed",
    errorCategory: category,
    requestId: diagnosticIdentifier(requestId),
    documentId: diagnosticIdentifier(documentId),
    outcome: "error"
  }));
}

// Never pass error.message, error.name, error.stack, or error.cause.
// The HTTP response uses a separate caller-safe message.`
    }
  ]
};
