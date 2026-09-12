# Narration infographics

Created with the built-in ImageGen tool using the imagegen skill, one illustration per instructional module. Final course assets are opaque RGB PNGs at 1920 x 1080, with white backgrounds and large labels. Generated source images were resized and flattened over white for delivery; generated originals remain in the tool output directory.

The prompts below are the actual generation prompts and targeted refinements. Narration, audio, captions, and the final quiz are unchanged. No quiz image was created.

## m01 - Parsing Is Not Trust

Final asset: course_assets/m01.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "PARSING IS NOT TRUST".
Upper illustration: "HTTP", "QUEUE", "IMPORT", and "STORED JSON" source icons converge into external bytes. A "BYTE LIMIT" gate comes BEFORE a "JSON PARSER" gear. The parser produces an amber tray of ordinary values represented by an object, an array, a number and a null tile. Label the tray "READABLE, STILL UNVERIFIED".
Next the values pass through a "RUNTIME CONTRACT" gate to a small green object. A separate shield labeled "DOMAIN + AUTHORIZATION" governs any final database write or message send. Invalid values end at a red stop BEFORE protected effects.
Below, contrast a syntactically readable document with an authorized operation, captioned "SYNTAX ≠ ACCEPTANCE ≠ PERMISSION".
A signed-message seal and logged-in user badge remain upstream of validation with the shared label "AUTHENTICATED INPUT STILL NEEDS CHECKS".
Footer "TURN EXTERNAL DATA INTO A CONSTRAINED VALUE".
Do not portray JSON parsing as requiring an object or establishing the schema. Do not imply every check has one universal placement; this diagram highlights separate guarantees and controlled rejection.
```

## m02 - TypeScript Types Disappear at Runtime

Final asset: course_assets/m02.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "TYPES DISAPPEAR; RUNTIME CHECKS MUST REMAIN".
Two large contrasting lanes.
Upper lane "COMPILE TIME": TypeScript interface, type assertion "as Request", and generic type "T" appear as lightweight annotation tags entering compilation. After compilation, a JavaScript runtime receives an unverified object; the annotation tags fade away. A red warning reads "NO INPUT VALIDATION ADDED".
Lower lane "RUNTIME": an amber external value labeled "unknown" enters an executable schema gate labeled "CHECK VALUES", then a green returned object labeled "VALIDATED OUTPUT" reaches a typed service. Rejected input branches to a stop. A cast-only bypass around the schema must be blocked.
Along the bottom a schema document and internal type document are linked with label "ONE ALIGNED CONTRACT". A settings dial shows "COERCION + UNKNOWN FIELDS" as behavior to review.
Footer "AN ASSERTION IS NOT EVIDENCE".
Use generic architectural imagery, not invented vendor code. unknown improves compiler discipline but does not validate by itself. Runtime validation does the checking; internal types should match the actual returned value.
```

## m03 - Define Strict Schemas for Object Shape and Values

Final asset: course_assets/m03.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "DEFINE THE WHOLE INPUT CONTRACT".
Main illustration: a bounded object container passes through a schema inspection gate. Inside the gate, large visual checks represent "REQUIRED / OPTIONAL / NULL", "RANGES + FORMATS", "ARRAYS + ELEMENTS", and "NESTED OBJECTS". A string ruler, finite-number gauge, array count, nested-object frame, and dictionary-key filter illustrate bounded values without long examples.
A separate three-way policy selector labeled "UNKNOWN PROPERTY POLICY" has alternatives "REJECT", "STRIP", "CONTROLLED EXTENSIONS". They are mutually chosen policies, not sequential transformations.
The selected policy and schema produce a distinct green object labeled "RETURNED VALUE". A bold green arrow sends ONLY this returned object to "DOWNSTREAM CODE".
The original amber request body attempts a bypass around the gate but ends at a red stop labeled "DO NOT REUSE RAW BODY".
A small update card has public fields "DISPLAY NAME" and "TIMEZONE", while "ROLE" and "TENANT" remain behind a server-controlled lock outside that public card.
Footer "USE THE VALUE YOU VALIDATED".
Do not depict strip behavior as universal; defaults vary. Missing and null are distinct. Strictness means explicit contract policy, not always the same unknown-field choice.
```

## m04 - Separate Structural Validation from Semantic Rules

Final asset: course_assets/m04.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "SHAPE, MEANING, AND PERMISSION ARE DIFFERENT".
Main protected flow with four large illustrated stages:
"STRUCTURE" shows typed fields fitting an input form.
"DOMAIN RULES" shows two individually valid calendar values checked together, with a simple "START ≤ END" relationship. A separate trusted-settings/database source supplies current context to this stage.
"AUTHORIZATION" shows an authenticated actor and a resource joined through a permission shield; a cross-tenant request is stopped.
"COMMIT INVARIANTS" shows a database with a transaction/conditional-write lock, preventing a stale state from being written.
Between the domain check and commit, a small concurrent-update arrow changes a state card; the commit gate must recheck the critical invariant, not blindly trust an earlier snapshot.
All failure branches stop before a protected write.
Lower contrast: a correctly shaped resource ID is beside a permission key with "VALID ID ≠ OWNERSHIP".
Footer "VALIDATE STRUCTURE, ESTABLISH MEANING, AUTHORIZE EFFECTS".
The schema may express local cross-field rules, but external-state rules use trusted service context. Authorization and storage invariants must not be portrayed as automatic consequences of schema validity.
```

### Targeted refinement

```text
Use case: precise-object-edit. Edit target: the attached infographic. Preserve its 16:9 white background, large typography, illustration style, title, footer, and the first three panels. Change only two technically misleading areas:
1. In the rightmost COMMIT INVARIANTS panel, re-layout the outcomes so the RECHECK INVARIANTS WITH CURRENT STATE gate has TWO SEPARATE mutually exclusive branches: green PASS to WRITE COMMITTED, and red FAIL to INVARIANT VIOLATION / REJECT. There must be NO arrow or path from WRITE COMMITTED to REJECT. A failed invariant stops before any write. Side-by-side outcome boxes below the recheck gate are fine; make the arrows unambiguous.
2. In the lower comparison strip, replace the entire amber Permission Key card (including proj_123 and CORRECTLY SHAPED) with an authenticated actor + resource + permission shield illustration labeled RESOURCE PERMISSION. Keep the left valid-format resourceId card, the not-equal sign, and VALID ID ≠ OWNERSHIP. Do not depict permission as a resource ID string or key string.
Do not add prose or tiny text. Keep everything else unchanged.
```

## m05 - Control Discriminators, Polymorphism, and Dynamic Behavior

Final asset: course_assets/m05.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "CLOSED VARIANTS, SERVER-CONTROLLED BEHAVIOR".
Main visual: an external message with a "kind" discriminator reaches a gate labeled "SUPPORTED VARIANT + VERSION". It splits into exactly two allowed branches.
"EMAIL" branch has an email-destination field checked by "VALIDATE ENTIRE BRANCH".
"SMS" branch has a phone-destination field checked by "VALIDATE ENTIRE BRANCH".
Both validated branches enter a fixed server switch labeled "FIXED DISPATCH", then a distinct "AUTHORIZE OPERATION" shield before the matching send icon. No dispatch or send can bypass branch validation.
An unknown variant/version exits to a red stop labeled "REJECT UNKNOWN".
Below, a client-provided module/class/function selection token attempts to enter a dynamic loader but is blocked. Label "NO ARBITRARY LOADING".
A data-only object icon contrasts with an object-constructor machine, captioned "DATA DESCRIBES AN ALLOWED OPERATION".
Footer "A RECOGNIZED VARIANT DOES NOT GRANT PERMISSION".
Do not show payload-selected constructors, imports, or arbitrary reflective calls as accepted behavior. A closed runtime discriminator supports compiler narrowing only after the branch has been checked.
```

## m06 - Avoid Dangerous Object Hydration, Merging, and Coercion

Final asset: course_assets/m06.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "MAP VALIDATED FIELDS, NOT ENTIRE OBJECTS".
Upper main flow: a small green validated DTO with fields "DISPLAY NAME" and "TIMEZONE" passes an "EXPLICIT MAP" gate into an update command containing only those fields. A separate trusted-context lock supplies protected server fields. A large full persistence entity has additional "ROLE", "OWNER", and "AUDIT" fields locked away from external input.
A raw request object attempts "BROAD MERGE / HYDRATION" into the full entity; stop this red route before mutation.
Lower left a coercion comparison: the literal text '"false"' entering generic "Boolean()" produces "true", visibly marked as the WRONG textual-boolean contract. A separate documented parser lane takes '"false"' through "EXPLICIT RULES" and outputs the boolean "false". Show accepted spellings/ranges as policy icons, not a long code listing.
Lower right a JSON document flows to ordinary data; a later generic merge gets an amber key-handling warning labeled "REVIEW SENSITIVE KEYS". Caption "PARSING ALONE ≠ PROTOTYPE POLLUTION".
Footer "VALIDATE THE NORMALIZED RESULT".
Preserve the distinction between missing and null conceptually. Do not imply object spread or JSON.parse alone automatically pollutes prototypes; risk depends on later operation semantics. Show identifiers as strings, not converted numbers, if examples are needed.
```

### Targeted refinement

```text
Use case: precise-object-edit. Edit target: attached course infographic. Preserve title, footer, white 16:9 background, upper valid DTO to explicit map to update command to entity flow, trusted context, and the two false-string coercion examples.
Simplify the lower middle panel: remove the entire small ACCEPTED VALUES (EXAMPLES) list, its checkmarks and OTHER VALUES REJECTED. Replace it with a single large settings/checklist icon and only the large labels "DEFINE ACCEPTED VALUES" and "REJECT EVERYTHING ELSE". Do not enumerate "1", "0", "yes", "no", or numeric examples. Enlarge the adjoining missing/null symbols and use only "MISSING ≠ NULL" beneath them; remove their fine-print explanations.
Remove the hooded-person illustration overlapping the raw request, keeping the raw request object and stopped broad-merge route.
In the lower right amber sensitive-keys panel, remove the three small literal key-name boxes; enlarge the key-and-warning illustration and keep "REVIEW SENSITIVE KEYS" as its only text. Preserve PARSING ALONE ≠ PROTOTYPE POLLUTION and the generic parse-to-data-to-merge sequence.
Keep all typography large and the technical distinctions unchanged. No new text or objects.
```

## m07 - Bound Parser Resources and Test the Entire Boundary

Final asset: course_assets/m07.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "BOUND THE WORK BEFORE TRUSTING THE VALUE".
Upper illustrated pipeline: HTTP/message/import sources → "BYTE + EXPANSION LIMITS" gate → "PARSER" gear → "SCHEMA LIMITS" gate → "ACCEPTED VALUE" → "DOMAIN + AUTHORIZATION" shield → a protected write/send icon.
The first gate visibly caps raw and decompressed size BEFORE parsing. Schema-limit icons represent string length, collection count, property count, and nesting. A small parser-depth shield reads "ENFORCE DEPTH AT THE RIGHT LAYER".
A rejected-input arrow leads to a large red stop in front of crossed-out write and send icons, captioned "REJECTION MEANS NO SIDE EFFECTS".
Lower test bench shows four large grouped test cards: "MALFORMED + WRONG TYPE", "NESTED + OVERSIZED", "VARIANTS + COERCION", "UNAUTHORIZED RESOURCE".
A timer beside a blocked synchronous-parser gear has the warning "A TIMER CANNOT INTERRUPT BLOCKING PARSING".
Footer "TEST EVERY ENTRY POINT AND THE RETURNED VALUE".
Do not imply a later schema limit prevents all allocation during parsing, or that a same-event-loop timer can preempt synchronous work. Use pictorial limits and tests, not fine-print lists.
```

## m08 - Course Summary: Parse, Validate, Map, Then Trust Narrowly

Final asset: course_assets/m08.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secure-deserialization and schema-validation course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green accepted values, amber review points, red rejected inputs. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace and safe margins. Clear, accurate arrows and no bypass routes. No paragraphs, fine print, tiny code listings, watermarks, decorative filler, exploit payloads, or invented API behavior. Render quoted labels exactly and do not add explanatory prose.

Title: "PARSE, VALIDATE, MAP, THEN TRUST NARROWLY".
A coherent summary architecture in two rows with a single clear reading path, using large icons:
"BOUND + PARSE" turns limited external bytes into an amber unknown value;
"RUNTIME SCHEMA" checks the complete contract;
"RETURNED VALUE" is a small green data object;
"DOMAIN + AUTHORIZATION" combines trusted-context checks and permission, as visibly separate symbols;
"EXPLICIT MAP" makes a narrow command;
"PROTECTED EFFECT" reaches a database through a commit-invariant lock.
Order can snake between the two rows; connectors must be unambiguous. A red bypass from original input toward the protected effect stops before reaching it. Every rejection path must stop before side effects.
Below, three support icons read "CLOSED BEHAVIOR", "RESOURCE LIMITS", "TEST DENIALS".
A large persistence entity is pictured outside the accepted-input boundary with its protected fields locked, captioned "DTO ≠ FULL ENTITY".
Footer "A SMALL VALIDATED VALUE, NOT AUTOMATIC TRUST".
Do not imply parsing, a TypeScript cast, a known discriminator, or a schema-valid ID grants authority. Runtime validation, domain meaning, authorization, explicit mapping and storage enforcement remain distinct responsibilities.
```

### Targeted refinement

```text
Use case: precise-object-edit. Edit target: attached infographic. Make exactly one change: in the red BYPASS ATTEMPT route below the main pipeline, DELETE the curved red arrow segment that continues upward from the red X into the PROTECTED EFFECT / COMMIT INVARIANT panel. The dashed red bypass path must END at the large red X, with completely empty white space from that X to the protected-effect card. No red arrowhead or connector may reach the protected-effect card. This represents a rejected bypass with no side effect. Preserve every other icon, label, position, white background, 16:9 composition, and large typography unchanged.
```

