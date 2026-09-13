window.COURSE_MODULE = {
  "title": "Schema Validation, DTOs, and Business Rules",
  "graphicAlt": "Schema checks, actor and tenant authorization, business rules and explicit field mapping are separate gates before constructing a domain object; privileged input fields are rejected.",
  "narration": "Safe deserialization is not complete when the parser returns an object. The application still needs to decide whether the data is expected, complete, authorized, and meaningful. Use request DTOs, message DTOs, schemas, or explicit input models to define the expected shape. Validate required fields, types, lengths, ranges, formats, enum values, nested structures, array sizes, and version fields before business logic runs.\n\nA public JSON request should usually become a small DTO first, not a fully trusted entity object. A queue message should describe one business event with a known schema and version. A file import should have clear column or field definitions. Reject unsupported message types, unknown versions, malformed payloads, oversized objects, unexpected structures, and values that do not match the workflow. Validation protects application assumptions, not just parser stability.\n\nSchema validation supports security, but it does not replace authentication, authorization, object ownership checks, tenant checks, or business-state checks. A payload can be well formed and still request an action the caller is not allowed to perform. A message can pass schema validation and still refer to the wrong tenant. A DTO can contain a valid status value that is invalid for the current workflow state. Business rules must be enforced after shape validation.\n\nAvoid mass assignment by mapping only allowed fields into domain objects or persistence models. Keep public API shapes separate from internal domain objects when sensitive fields exist. Version serialized messages so producers and consumers can evolve safely. Explicit mapping gives developers a place to review which external fields are allowed to influence internal state and which fields must remain server-controlled.",
  "narrationPoints": [
    "Safe deserialization is not complete.",
    "A public JSON request should usually become a small DTO.",
    "Schema validation supports security.",
    "Avoid mass assignment by mapping only allowed fields.",
    "Use request DTOs.",
    "Validate required fields."
  ]
};
