# Safe Serialization in Java: illustration prompts

Generated with the built-in ImageGen tool. Final module assets are opaque RGB PNGs at 1920 x 1080 pixels, on white backgrounds. Source narration was preserved. These are authoring notes, not runtime dependencies.

## m01: Why Serialization Security Matters

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Serialization crosses a trust boundary". Make one dominant left-to-right transformation: external data documents from API, Queue and Cache enter a large guarded parser aperture, become a small explicit DTO, then pass a second gate into a Java application. Shield checkpoints visibly separate bytes, object shape, and authorized behavior. A red arbitrary-object tangle branch terminates at a stop BEFORE entering the application. Allowed labels: "API", "Queue", "Cache", "Parse", "Validate", "Authorize", "Application", "Data is not permission". Emphasize transformation is a security boundary, not harmless conversion.

## m02: Serialization Formats and Trust Boundaries

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Keep provenance across every hop". Three large sources flow through queue, database and cache containers into the SAME amber untrusted payload at a security boundary. Then a narrow green DTO passes a contract gate to the service. Use simple source icons, message envelopes, disk stacks, key-value tiles, and an owner tag. The intermediaries must NOT magically turn amber untrusted data green. Allowed labels: "Producer", "Queue", "Database", "Cache", "Contract", "Explicit DTO", "Service", "Internal is not trusted".

## m03: Native Java Serialization and ObjectInputStream Risk

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Object graphs can carry behavior". Left half: serialized object bundle feeding a reconstruction chamber with interlinked class blocks, gears and callback hooks; a hazard halo shows hidden complexity. Right half: clean preferred path with small data card through validation and authorization gates to an internally constructed domain object. No exploit code. Allowed labels: "Native object graph", "Classes", "Callbacks", "Library behavior", "Prefer narrow data", "Validate", "Authorize", "Construct internally". Visually distinguish risky native reconstruction from controlled construction.

## m04: Filters, Allowlists, and Legacy Deserialization Controls

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Constrain legacy deserialization". Large legacy object-input machine enclosed by four guardrails: exact class allowlist as selected blocks fitting a stencil, graph depth as bounded branches, arrays and references as counted blocks, total bytes as capped container. Unknown block stops at an X outside the machine. To the right a migration arrow leads to a simple DTO card. Allowed labels: "Legacy boundary", "Allowed classes", "Graph limits", "Byte limits", "Reject unknown", "Authenticate", "Monitor", "Migrate to DTOs". Filters are interim defense, not a universal safe stamp.

## m05: JSON, XML, YAML, and Polymorphic Type Handling

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "A data format is not a safety guarantee". Three oversized format cards JSON, XML, YAML each face a different risky attachment: arbitrary class selector, external network fetch, rich object construction. All three unwanted attachments end at red stops. Below, a safe common lane contains a simple DTO, schema gate, and bounded input container. Allowed labels: "JSON", "XML", "YAML", "Arbitrary types", "External resources", "Object construction", "Explicit DTOs", "Schema", "Limits". No tiny sample payloads. Do not imply only one format can have each risk; these are representative parser capabilities.

### Refinement

Edit this infographic, preserving all titles, labels, objects, white background, colors and layout. Remove ONLY the three green downward connectors beneath the red risk panels, the entire shared horizontal green collection pipe, and its downward arrow into Schema. Leave pure white space in that gap. Keep each red risk panel leading only to its red stop. Keep the separate bottom green sequence Explicit DTOs -> Schema -> Limits -> checkmark exactly as an independent safe-design sequence. There must be no path from red risky capabilities into the green safe lane.

## m06: Schema Validation, DTOs, and Business Rules

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Valid shape is not authorization". Strong single left-to-right main flow: input document, schema gate checking shapes/types, separate authorization gate with actor and tenant keys, separate business-rule state gate, explicit field mapping stencil, trusted domain object. Unknown privileged fields peel off before mapping and stop. Allowed labels: "Input", "Schema", "Authorization", "Business rules", "Explicit mapping", "Domain object", "Reject extra power". Green success path only through ALL gates. Never let schema validation alone open the destination.

## m07: Resource Limits, Parser Safety, and Denial of Service

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Bound work before it grows". Central parser protected by visual caps on incoming payload size, nesting depth, array count and processing time. Heap memory, worker threads and queue illustrated as finite trays, not infinite clouds. A streaming conveyor stays inside a bounded box, with backpressure valve. Oversized branch ends at a red stop, while small green normal messages keep moving. Allowed labels: "Size", "Depth", "Count", "Time", "Bounded streaming", "Backpressure", "Safe rejection", "Keep service available".

## m08: Secrets, Sensitive Fields, Logging, and Data Exposure

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Serialize only what each audience needs". Central rich internal entity is partitioned into green public fields and red sensitive fields. A narrow explicit output stencil lets only selected green fields reach an API response. Parallel safe minimal events reach a log, and failed messages reach a protected retained storage box. Red sensitive fields remain isolated with no outgoing flow to responses or logs. Allowed labels: "Internal entity", "Explicit output", "API response", "Minimal logs", "Protected failures", "Secrets stay out", "Limit retention". Clear redaction/minimization BEFORE outputs and storage.

### Refinement

Refine this infographic without changing its composition, arrows, white background or large type. In Internal entity, Explicit output and API response, replace the field label name with title and replace role with status. These are illustrative document fields, not an exposed internal security role. In the Minimal logs panel, replace its entire three-label field list with eventId, action, outcome, retaining simple large icons. Keep id and createdAt elsewhere, and keep the four red sensitive fields and Secrets stay out stop exactly. Do not add any new text. The picture must distinguish a narrow response contract from a separate minimal event schema; do not log a name or security role by default.

## m09: Testing, Code Review, CI/CD, and Incident Response

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Test the boundary and its aftermath". Four large visual stations connected in a review loop: inventory magnifier over parser entry points; test rig rejecting malformed, deep and unauthorized payloads; CI pipeline reviewing dependencies and parser settings; incident containment box covering queues, caches and secrets. Each station gets one bold heading, with few short labels. Allowed labels: "Inventory", "Test", "Review changes", "Respond", "Malformed", "Oversized", "Unauthorized", "Queues", "Caches", "Secrets". Avoid fictional scenarios; show actual engineering workflow.

## m10: Course Summary and Practical Checklist

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.

Title: "Safe serialization is a complete workflow". Five large linked shields arranged around a central explicit data contract: know the producer and format, constrain parsing/types, validate and authorize separately, bound resources, minimize every copy. A small legacy object graph sits behind a guarded fence with a migration arrow to the central contract. Allowed labels: "Inventory", "Constrain", "Validate + authorize", "Limit work", "Minimize copies", "Explicit contract", "Legacy migration". End with a large protected service icon, no blanket claim that JSON or filters alone are safe.

### Refinement

Make one exact label correction only. Under the server stack with the green shield on the far right, replace the word Inventory with Protected service, on two large lines if needed. Keep the top-center Inventory label unchanged. Preserve every other word, arrow, icon, layout, color and the white background.

