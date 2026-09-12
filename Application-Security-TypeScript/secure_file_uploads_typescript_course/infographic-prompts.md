# Narration infographics

Created on 11 September 2026 with the built-in ImageGen tool using the imagegen skill. One narration-specific illustration was generated for each of the eight instructional modules. Final assets are opaque RGB PNGs at 1920 x 1080 with white backgrounds, large labels, and predominantly illustrated content.

Generated images were resized and flattened over white for final course delivery. Generated originals remain in the tool output directory. The module pages use the existing template image-expansion behavior and graphicAlt metadata. The nine-SCO manifest retains its original identifiers and quiz mastery score, with each image listed in its own module resource.

Narration, MP3s, VTTs, code examples, runtime files, and the final quiz were left unchanged. No quiz image, audio, or captions were created. No browser or Whisper checks were performed, and no ZIP or backup files were made.

The actual generation prompts and targeted refinements follow.

## m01 - File Uploads Cross Several Trust Boundaries

Final asset: course_assets/m01.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "AN UPLOAD CROSSES MANY TRUST BOUNDARIES".
Main scene: an amber uploaded document with attached tags "NAME", "TYPE", "SIZE" and label "UNTRUSTED BYTES + METADATA". A visible application trust boundary leads into five large linked stations: "PARSE" (multipart splitter), "RESTRICTED STORAGE" (locked temporary container), "VALIDATE + PROCESS" (inspection gate and isolated gear), "PUBLISH" (explicit approval gate), "DELIVER" (download endpoint).
Only an approved green branch may pass the publication gate. A failed branch from checks terminates at a red stop well away from delivery. A pending amber object remains in restricted storage.
A blue authenticated user shield sits above the boundary with the caption "AUTHENTICATION ≠ FILE VALIDATION".
Below are three large supporting icons: a server-owned destination pin labeled "SERVER CHOOSES LOCATION"; a resource-permission shield labeled "AUTHORIZE OPERATIONS"; a broom and bounded temporary folder labeled "CLEAN UP PARTIAL WORK".
Footer: "RECEIVING BYTES DOES NOT MAKE THEM TRUSTED".
Do not imply that storage automatically publishes files or that successful parsing, a login, or a TypeScript assertion proves safe content. Illustrate an overall pipeline, not a literal recommended universal middleware order.
```

## m02 - Define a Narrow Upload Contract Before Accepting Bytes

Final asset: course_assets/m02.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "DEFINE THE CONTRACT BEFORE ACCEPTING BYTES".
A large incoming upload stream meets two visible controls BEFORE a bounded ingestion container: a user-and-resource permission shield labeled "AUTHORIZE TARGET", and a policy gate labeled "UPLOAD CONTRACT".
The policy gate has four large pictorial controls: "ALLOWED FORMATS", "FILE + PART COUNTS", "ACTUAL BYTE LIMITS", "QUOTAS + RETENTION". Use gauges, counters, and format silhouettes, not specific numerical recommendations.
A small sender-declared size tag has a caution symbol labeled "CLAIMS ARE NOT MEASUREMENTS". A real byte counter on the flowing stream feeds a limit meter; excess data branches to a stop and a partial-file cleanup bin.
Below, two alternative ingestion illustrations: "BOUNDED BUFFER" shows limited RAM plus a concurrency cap; "BOUNDED STREAM" shows backpressure and a limited temporary disk. These are alternatives, not sequential mandatory steps.
A scoped direct-upload ticket points only to a private server-chosen object, with label "DIRECT UPLOAD ≠ PUBLICATION".
Footer: "LIMIT WORK WHILE IT ARRIVES".
Keep authenticating the actor separate from authorizing the target and file validation. A signed upload permission is not proof of eventual content safety. No long HTTP headers or code.
```

## m03 - Treat Filenames and Extensions as Metadata, Not Storage Authority

Final asset: course_assets/m03.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "A FILENAME IS METADATA, NOT AN ADDRESS".
Two clearly separated lanes begin at an amber upload document.
Upper lane "DISPLAY METADATA": the original-name tag enters a length ruler and escaping/header-safety shield, ending at a displayed download label. Labels are "BOUND + ESCAPE" and "DISPLAY NAME". No arrow from the original name may reach a filesystem or object-storage destination.
Lower lane "STORAGE IDENTITY": a server identifier generator creates a blue opaque ID; it goes through "EXCLUSIVE CREATE" into a folder marked "TRUSTED ROOT" and a private object-container alternative marked "SERVER-OWNED KEY". A lock protects the directory structure.
A red attempted shortcut from original-name metadata toward storage ENDS at a stop labeled "NO CLIENT-CHOSEN PATH".
Below, a separate replacement-permission shield reads "REPLACE ONLY WHEN AUTHORIZED". A tenant/resource record connects to the stored ID with caption "OWNERSHIP FROM TRUSTED RECORDS".
Footer: "OPAQUE NAMES DO NOT REPLACE ACCESS CONTROL".
Show the two storage alternatives without implying both are required. Do not display traversal payloads or treat filename cleaning, path joining, or random identifiers as complete authorization.
```

### Targeted refinement

```text
Use case: precise-object-edit. The attached infographic is the edit target. Make one precise correction: remove the vertical green arrow from the bottom STORED ID box upward into EXCLUSIVE CREATE. Leave clear white space there. The bottom authorized-replacement and tenant/resource ownership row must remain a separate relationship, not feed an existing ID into exclusive new-object creation. Preserve the blue new-ID to EXCLUSIVE CREATE flow, all other labels, icons, colors, white background, layout, and 16:9 proportions. Do not add new elements.
```

## m04 - Validate File Type Using Multiple Signals

Final asset: course_assets/m04.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "FILE TYPE NEEDS MORE THAN A LABEL".
Upper three large evidence panels converge into one decision gate labeled "FEATURE POLICY".
"CLIENT HINTS": amber filename-extension and declared-media-type tags, both marked with question symbols.
"CONTENT SIGNALS": a magnifying glass examining byte-pattern blocks, not a long hex dump.
"BOUNDED DECODING": a parser gear, dimensions ruler, and structure checklist.
The policy gate has a green accepted output and a red rejected output that ends at a stop. Do not depict any single input panel as sufficient proof of safety.
Lower illustration labeled "NARROW IMAGE WORKFLOW": an image file enters a bounded decoder, then a server-controlled encoder, then a distinct derived image tagged "CHECK THE OUTPUT". A metadata filter discards unnecessary tags into a cleanup bin. Large short labels: "DECODE", "RE-ENCODE", "DERIVED IMAGE".
A separate PDF/document/archive cluster with amber caution reads "FORMAT-SPECIFIC RULES".
Footer: "NO SINGLE CHECK PROVES SAFETY".
Do not turn re-encoding into a universal sanitizer. Client MIME, magic-byte signatures, successful decoding, and a clean malware scan are evidence with limits. Favor iconography and short text.
```

## m05 - Store Uploads Where They Cannot Become Application Code

Final asset: course_assets/m05.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "ISOLATE STORAGE. CONTROL DELIVERY.".
Upper architecture: a private upload storage vault stands clearly separate from application source, template files, and executable-code icons. A red path attempting to place an uploaded document into application code ends at a stop labeled "NEVER APPLICATION CODE". A publication gate separates "PRIVATE / PENDING" storage from "APPROVED CONTENT".
Lower protected download flow: a user/resource shield labeled "AUTHORIZE DOWNLOAD" leads to a trusted attachment record, then a server-owned storage-key lookup, then a response-policy gate, then a download icon.
The response gate uses large pictorial tags labeled "TYPE", "DISPOSITION", "CACHE". A nearby browser shield is labeled "nosniff". A separate browser window on an isolated island reads "ISOLATE HIGH-RISK INLINE CONTENT".
A signed-download ticket with clock and scope ring is labeled "SCOPED + SHORT-LIVED". Do not depict ticket expiry or logout as universal instant revocation.
Footer: "SAFE STORAGE DOES NOT MEAN SAFE RENDERING".
Attachment disposition and nosniff are partial delivery controls, not proof a downloaded file is harmless. No forbidden path reaches code or an unauthorized download. Keep no more than these labels and use large illustrations.
```

## m06 - Process Archives, Images, and Documents with Resource Limits

Final asset: course_assets/m06.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "BOUND THE WORK AFTER THE UPLOAD".
Upper comparison: a small compressed file expands toward a huge stack of pages and pixels, but a resource-budget gate controls the expansion. Label "SMALL INPUT ≠ SMALL WORK".
The gate has four large gauges or icons labeled "PIXELS + PAGES", "EXPANSION + DEPTH", "CPU + MEMORY", "TIME + OUTPUT".
Lower-left: an archive enters a fresh restricted extraction folder labeled "CONTAIN EVERY ENTRY". Several entry paths end INSIDE the folder. A path/link attempting to leave the folder stops at a red X with empty space beyond. No literal malicious filename or exploit strings.
Lower-right: a low-privilege processing worker sits within an isolation boundary, with restricted filesystem and blocked unnecessary-network icons. Label "ISOLATE PROCESSORS". A timeout control visibly stops a worker gear; partial output goes to a cleanup bin labeled "STOP + CLEAN UP".
A derived-output document then faces a separate inspection gate labeled "VALIDATE DERIVED OUTPUT".
Footer: "REQUEST LIMITS ARE NOT PROCESSING LIMITS".
No publication after mere process success. Do not imply a same-event-loop timer can interrupt blocking work or that sandboxing decides allowed formats. Emphasize enforced budgets, containment, restricted workers, and bounded outputs.
```

### Targeted refinement

```text
Use case: precise-object-edit. The attached infographic is the edit target. Make two related control-flow corrections while preserving all labels, title, footer, white background, large type, and illustration style:
1. Redraw the upper flow in this exact order: small ZIP input -> RESOURCE BUDGET GATE (keep all four labeled gauges) -> bounded stack of decoded pages/images. Place the gate BEFORE the growing stack and make the stack visibly constrained by a frame/limit bar. The budget is enforced while processing, not a check after everything is allocated. Keep SMALL INPUT ≠ SMALL WORK under this row. Remove the current arrow exiting off the right edge.
2. Treat the three lower cards as independent complementary controls. Remove the teal arrow connecting CONTAIN EVERY ENTRY to ISOLATE PROCESSORS, and remove the green arrow connecting ISOLATE PROCESSORS to VALIDATE DERIVED OUTPUT. Keep the archive's red escape path ending at its red X with blank space after it. Preserve the internal worker cleanup route and internal output-validation flow.
No added paragraphs, fine print, or new labels.
```

## m07 - Scan, Quarantine, Authorize, and Test the Complete Lifecycle

Final asset: course_assets/m07.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "PROMOTE ONLY THE OBJECT THAT PASSED".
Main state flow: an uploaded object with prominent "v1" identity badge enters a locked amber zone "QUARANTINE". Within the zone, a "VALIDATE" checklist and "REQUIRED SCAN" inspection gate check that same v1 object. A successful result passes a gate labeled "CHECKED VERSION" to green "APPROVED v1". No public download arrow may leave quarantine.
A separate red failed result ends at a stop labeled "REJECTED". An amber clock or unavailable-scanner icon ends in a locked "PENDING" box, not approved content.
Beside the approved v1 object, a changed object marked "v2" is blocked from reusing the approval. Label "CHANGED BYTES NEED NEW CHECKS". This should clearly show approval bound to the exact content, not merely its filename.
Along the bottom, permission shields accompany three pairs of action icons labeled "UPLOAD + REPLACE", "VIEW + DOWNLOAD", "DELETE + SHARE". A scoped cleanup bin reads "CLEAN UP FAILED WORK".
Footer: "A CLEAN SCAN IS ONE CHECK, NOT A GUARANTEE".
Do not turn scanner outage into implicit success. No arrows leaving stops or pending boxes into approved content. Keep all states and directions clear, with minimal text.
```

## m08 - Course Summary: Treat Uploads as Untrusted Content for Their Entire Lifetime

Final asset: course_assets/m08.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-file-uploads course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green permitted actions, amber untrusted inputs or cautions, red rejected actions. Images dominate over words. Use ONLY LARGE bold sans-serif typography: title around 64px and labels at least 32px at 1920px width. Generous whitespace, safe margins, minimal labels, clear noncrossing connectors. No paragraphs, tiny code, fine print, logos, watermarks, decorative filler, hacker figures, or exploit payloads. Render requested quoted labels exactly. Reject arrows must END at stop symbols with empty space after them, never continue to a protected destination.

Title: "UNTRUSTED FOR THE ENTIRE FILE LIFETIME".
A clear summary architecture in two rows with one unambiguous reading path and five large illustrated stations:
"AUTHORIZE + LIMIT" shows authenticated actor/resource permission and an actual-byte gauge.
"VALIDATE CONTENT" shows different evidence signals meeting a narrow policy gate.
"ISOLATE + PROCESS" shows private storage and a bounded low-privilege worker.
"PROMOTE CHECKED VERSION" shows an immutable object badge passing a release gate only after required checks.
"SERVE BY POLICY" shows resource authorization, server-selected response controls, and a deliberate download.
An amber filename/type tag stays outside the authority controls, labeled "METADATA IS NOT AUTHORITY".
A red rejected object ends at a stop before publication; a pending object remains locked.
Below, three large supporting icons read "SERVER-OWNED DESTINATIONS", "BOUNDED RESOURCES", "TEST FAILURES + CLEANUP".
Footer: "THE APPLICATION OWNS EVERY TRUST DECISION".
Do not show a file choosing its destination, execution context, permissions, or public availability. Keep this visual distinct from the first module by emphasizing coordinated ownership of decisions over the entire lifetime. No tiny text, code, or unnecessary labels.
```

### Targeted refinement

```text
Use case: text-localization. Input image is the edit target. Replace only the text "25 MB" beneath the gauge in the AUTHORIZE + LIMIT card with "BYTE LIMIT". Keep the replacement in large bold navy sans-serif type. Preserve all other text, icons, arrows, layout, white background, dimensions, and colors unchanged. There must be no specific numeric upload limit anywhere in the image.
```

