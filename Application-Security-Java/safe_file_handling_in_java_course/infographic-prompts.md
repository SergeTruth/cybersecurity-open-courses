# Safe File Handling in Java: illustration prompts

Generated with the built-in ImageGen tool. Final module assets are opaque RGB PNGs at 1920 x 1080 pixels, on white backgrounds. Source narration was preserved. These are authoring notes, not runtime dependencies.

## m01: Why File Handling Security Matters

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "File access is a security boundary". Center a large Java service icon inside a navy shield, with four gates around it labeled "Read", "Write", "Process", "Serve". Outside the shield show private report, uploaded archive, temporary file, and secrets-vault objects. Arrows from legitimate file objects must pass through the relevant gates; a red arrow toward the secrets vault ends at a closed stop before the vault. Bottom three large illustrated controls: identity badge "Authorized", resource gauge "Bounded", magnifier over event log "Observable". No implication an API name alone enforces security.

### Refinement

Use case: precise-object-edit. Change only the red blocked path: delete ALL red dashed segments between the red X stop sign and the Secrets vault. The solid red arrow must end at the stop sign, followed by empty WHITE space before the vault. Preserve everything else: large labels, illustrated objects, typography, white background and widescreen composition.

## m02: File-Handling Architecture and Trust Boundaries

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Map the file lifecycle". Main broad illustrated pipeline: user/API envelope → Java service → isolated temporary workspace → private storage → authorized download client. Use short exact labels "Source", "Service", "Temporary", "Private storage", "Download". Draw dashed vertical trust boundaries between components. Below, separate distinct storage compartments labeled "Public assets", "Logs", "Configuration", "Secrets"; no shared unrestricted bucket. A policy clipboard oversees source sensitivity, access and retention with only the three large labels "Purpose", "Access", "Retention". Lifecycle and separation are the key visual, not a wall of text.

## m03: Java File APIs, Paths, and Boundary Thinking

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "A Path is not a permission". Two parallel routes. Top amber raw path string card labeled "Raw path" points into a red stop before a filesystem. Bottom preferred route: object-ID badge "File ID" → metadata record "Lookup" → authorization gate "Authorize" → server-controlled file location "Storage". Under the storage icon a compact component-aware path diagram shows fixed base plus a resolved child staying inside a blue boundary, labeled "Check the boundary". At bottom separate folder/OS/link icons caption "Filesystem behavior matters". Do not show normalization as sufficient authorization or symlink protection.

## m04: Path Traversal Prevention and Storage Boundaries

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Contain the path. Authorize the object.". Use two sequential large gates: blue folder boundary gate "Storage boundary" then identity-and-document gate "Object authorization". One green path passes both gates to a private document. At the first gate an amber "../" path and an absolute-path icon terminate at red stops labeled "Outside root". At the second gate an in-root document marked "Other tenant" terminates at a red stop labeled "Not yours". The successful document stays within a blue storage enclosure. Footer caption "Inside the directory ≠ allowed access". No bypass arrows.

## m05: Filenames, Metadata, and File Type Decisions

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Separate identity, name, and type". Three spacious illustrated panels: first a server-generated key with a storage cabinet labeled "Storage ID"; second a filename luggage-tag linked to an eye/display and an encoding shield labeled "Display metadata"; third a file passing through three distinct checks illustrated as extension tag, file signature magnifier, and structure parser labeled "Type evidence". An amber original filename cannot directly become the storage key: show a short blocked arrow ending at red stop. Bottom caption "A name is not proof". No long filenames or tiny code; keep metadata sensitivity visually evident with a small locked record.

## m06: Safe Reads, Writes, Temporary Files, and Race Conditions

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Write safely through every state". Center a controlled temporary folder labeled "Isolated temp" containing an incomplete dotted document "Writing". A completed checked document follows a gated publication arrow labeled "Publish complete". A failure branch terminates at a cleanup bin "Clean up", not at the published document. Above show a timeline "Check" then a changing link/path between "Use", with a red caution caption "Check-then-use race". Below show three large control icons "Generated names", "Narrow writes", "Atomic where supported". Keep application code in a distinct locked read-only cabinet; do not suggest all file moves are atomic.

## m07: Permissions, Storage Isolation, Archives, and Secrets

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Separate storage. Limit authority.". Large central Java process with limited access arrows to one bounded writable runtime volume only. Surrounding compartments: locked "Read-only code", locked "Secrets", "Logs", "Uploads", "Temporary". Broad access to secrets and code is stopped before those compartments. On right an archive is unpacked inside a visibly fenced sandbox, through entry-path and expansion gauges labeled "Entry checks" and "Expansion limits". No extraction outside the sandbox. Bottom caption "Only required paths and operations". No malware details or exploit commands.

### Refinement

Use case: precise-object-edit. Correct only the two red blocked connections on the LEFT. Delete the red arrowheads and red line segments between each red X and its protected cabinet, leaving white gaps. Keep each red connection from the Java process ENDING at its red X. Add the large short label "No writes" by the upper blocked connection to Read-only code, and "No broad access" by the lower blocked connection to Secrets. The process may read its own code; only writes are prohibited there. Preserve every other part of the diagram, especially the sandbox, compartments, white background and large typography.

## m08: Streams, Size Limits, Resource Controls, and Cleanup

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Stream within a resource budget". Main visual is a file-data stream flowing through a narrow bounded buffer into storage; show packets moving instead of a whole file loaded into a memory box. Large control stations along the flow labeled "Size", "Time", "Concurrency", "Quota". A queue with a control valve shows "Backpressure". Lower row contrasts completed checked artifact with an interrupted partial artifact leading to a cleanup bin, labels "Complete" and "Clean partials". A closed file-handle icon caption "Close resources". No invented numeric limits and no claim streaming alone prevents exhaustion.

## m09: Serving Downloads, Testing, Logging, and Review

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Serve privately. Observe safely.". A private report leaves a locked store only through a large object-authorization gate to a download client. An unrelated-user badge stops at a red barrier before the gate. A separate response-header shield is labeled "Safe response", with no path disclosure. Below: two large testing cards "Allowed" green and "Denied" red feed a verification checklist; event envelopes "Created", "Served", "Rejected" feed a log filter. File contents, credentials and internal-path icons stop at the filter while approved event metadata enters the log. No red arrow continues past its stop.

### Refinement

Use case: precise-object-edit. Correct ONLY the sensitive-data exclusion panel on the lower right. Delete all dashed red connector lines originating from the Event log toward File contents, Credentials and Internal path. Those three sensitive icons and their red stops should be an independent exclusion group, NOT connected to the stored Event log. Add one large heading above the three sensitive rows: "Exclude before logging". Preserve the valid Created/Served/Rejected → Log filter → Event log flow and all other visual content, white background and large typography.

## m10: Course Summary and Practical Checklist

Use case: infographic-diagram.
Asset type: narration-specific illustration for a professional Java application-security course.
Create a highly visual 16:9 widescreen infographic for 1920x1080 display. Opaque pure WHITE background. Illustrated objects dominate, with subtle depth, navy headings, blue/teal flow, amber untrusted inputs, green permitted outcomes and red blocked outcomes. Use ONLY LARGE bold sans-serif text (title approximately 64px; labels at least 32px at 1920 width). Short labels and generous whitespace. No paragraphs, tiny code, small print, invented thresholds, branding, watermarks, fictional characters or decorative filler. Show security boundaries accurately. Every rejected arrow ENDS at a stop; never continue a rejected path toward a protected effect. Render only the specified short text labels.
Title "Safe file handling by design". Summary composition with a large private file vault in the center, surrounded by five distinct illustrated control stations connected by spokes: lifecycle map "Inventory", bounded folder plus ID "Contain", identity gate "Authorize", gauges and stream "Limit", cleanup bin plus test magnifier "Verify + clean up". Across the top, clearly separated compartments "Public", "Private", "Temporary", "Secrets". Across the bottom a single bold takeaway "Design the whole workflow". No chronological claim that cleanup comes before authorization; this is a control map.

