window.COURSE_CODE_MODULE = {
  "title": "Use a Typed, Finite Event Vocabulary",
  "codeIntro": "A discriminated union documents the emitted fields; runtime checks and explicit projection establish the actual boundary. Actor, tenant, and resource identifiers must originate from the authorized operation, not an arbitrary request object.",
  "codeExamples": [
    {
      "title": "Event-specific contracts",
      "language": "typescript",
      "blurb": "The producer validates the selected variant and copies only approved primitive fields into a fresh record. Extra source properties, including serialization hooks, are never forwarded. The illustrative identifier policy accepts 1–128 ASCII characters; adapt it to the application's canonical identifier format.",
      "code": `type SecurityEvent =
  | Readonly<{
      event: "authorization.denied";
      actorId: string;
      tenantId: string;
      resourceType: "document";
      resourceId: string;
      action: "delete";
      outcome: "deny";
    }>
  | Readonly<{
      event: "document.delete.failed";
      requestId: string;
      resourceId: string;
      errorCategory: "dependency" | "internal";
      outcome: "error";
    }>;

function eventIdentifier(value: unknown): string {
  if (typeof value !== "string" || value.length > 128 ||
      !/^[A-Za-z0-9][A-Za-z0-9._:@/-]*$/.test(value)) {
    throw new Error("Invalid security event identifier");
  }
  return value;
}

function projectSecurityEvent(candidate: unknown): SecurityEvent {
  if (candidate === null || typeof candidate !== "object" ||
      Array.isArray(candidate)) {
    throw new Error("Invalid security event");
  }
  // Producers supply data objects, not executable getters or proxies.
  const event = candidate as Record<string, unknown>;
  switch (event.event) {
    case "authorization.denied":
      if (event.resourceType !== "document" || event.action !== "delete" ||
          event.outcome !== "deny") throw new Error("Invalid security event");
      return Object.freeze({
        event: "authorization.denied",
        actorId: eventIdentifier(event.actorId),
        tenantId: eventIdentifier(event.tenantId),
        resourceType: "document",
        resourceId: eventIdentifier(event.resourceId),
        action: "delete",
        outcome: "deny"
      });
    case "document.delete.failed": {
      const category = event.errorCategory;
      if ((category !== "dependency" && category !== "internal") ||
          event.outcome !== "error") throw new Error("Invalid security event");
      return Object.freeze({
        event: "document.delete.failed",
        requestId: eventIdentifier(event.requestId),
        resourceId: eventIdentifier(event.resourceId),
        errorCategory: category,
        outcome: "error"
      });
    }
    default:
      throw new Error("Invalid security event");
  }
}

function emitSecurityEvent(candidate: unknown): void {
  logger.info(projectSecurityEvent(candidate));
}`
    }
  ]
};
