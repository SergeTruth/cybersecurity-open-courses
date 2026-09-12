# Module infographic prompts

Generated with the built-in ImageGen tool from the existing module narration. Final assets are opaque RGB PNGs, normalized to 1920 × 1080 on white. The final quiz has no illustration.

## m01 — course_assets/m01.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "PROTECT THE DATA–CODE BOUNDARY".
Show two spacious horizontal comparison lanes.
Top red lane labeled "UNSAFE CONSTRUCTION": untrusted input envelope enters a plus-sign mixer together with a SQL program sheet. The mixer is labeled "CONCATENATION / INTERPOLATION"; its output is a corrupted SQL program containing a red inserted puzzle piece, which reaches a database parser. Use a red warning "DATA BECOMES SYNTAX". No attack payload text is needed.
Bottom green lane labeled "SAFE BINDING": a blue SQL program sheet marked "TRUSTED STRUCTURE" and a separate green sealed values container marked "BOUND VALUES" travel along distinct parallel channels into two separate input ports of a driver gateway, then into a protected database. The SQL sheet stays blue and unmodified; values stay green and visibly separate. Label the gateway "PARAMETER API".
At the bottom show three small-but-large-label icons for a browser check, a login badge, and a TypeScript badge, with the caption "THESE DO NOT BIND SQL".
Make it clear that an authenticated or typed input can still be untrusted. The key visual should be code and data crossing in the unsafe lane versus staying separate through the safe API.

## m02 — course_assets/m02.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "SEND STRUCTURE AND VALUES SEPARATELY".
Main composition: two large parallel pipelines into a database driver with two separate ports. Upper blue pipeline: fixed SQL document with three large placeholder slots "$1", "$2", "$3", labeled "STATEMENT TEXT". Lower green pipeline: a string card labeled "STRING", a numeric cube "NUMBER", and a calendar "DATE", labeled "PARAMETER VALUES". Pair each value with its corresponding placeholder using matching small 1, 2, 3 badges but never insert the value text into the SQL document.
The driver gate is labeled "DOCUMENTED BINDING API" and outputs a protected query execution at a database. A green sealed container illustrates that punctuation stays data.
At the bottom use three compact pictured concepts: a manual quote-replacement tool crossed out with "AVOID MANUAL ESCAPING"; a server-generated sequence of placeholders with "TRUSTED PLACEHOLDERS"; and a separate authorization shield with "PERMISSION STILL REQUIRED".
Large central takeaway: "BINDING KEEPS VALUES AS DATA".
Technical constraints: placeholder syntax varies across drivers, so do not imply "$1" is universal; this is a conceptual numbered-placeholder example. Do not imply permanent prepared-statement storage is necessary. Keep labels brief and the two-channel diagram dominant.

## m03 — course_assets/m03.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "CHECK WHAT THE DATABASE API DOES".
A large central review magnifying glass examines a database library gateway, with multiple access forms feeding it: driver, ORM, query builder, SQL tag, stored procedure. Five prominent icons with labels "DRIVER", "ORM", "BUILDER", "SQL TAG", "PROCEDURE".
The gateway has two clearly distinguished outcomes: green "BINDS VALUES" leading to a two-port code/data interface and protected database, and red "INSERTS TEXT" leading to a SQL sheet with an untrusted red fragment and warning.
Below, put four orange review-point tiles labeled "RAW", "UNSAFE", "LITERAL", "FRAGMENT", under one heading "REVIEW ESCAPE HATCHES". Do not mark every raw API automatically unsafe: show one small reviewed "RAW + BINDINGS" tile on the safe side with a green check.
A stored-procedure cylinder has a cutaway: bound arguments enter, but an internal red concatenation gear triggers a warning labeled "REVIEW DYNAMIC SQL".
Footer: "API SEMANTICS DETERMINE SAFETY".
Strong icons, sparse words. Similar-looking template syntax may bind data or build text; the illustration must not claim ORMs, tags, or procedures are automatically safe.

## m04 — course_assets/m04.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "MAP STRUCTURE. BIND VALUES.".
Create two clear, visually distinct flows.
Upper flow labeled "STRUCTURAL CHOICES": client chooses "name" or "created" from two large selection tokens. These enter a locked server mapping cabinet with exact pairs "name → display_name" and "created → created_at". A separate two-position direction selector maps "asc → ASC" and "desc → DESC". Only these fixed mapped output tokens reach a SQL structure board. An arbitrary unknown choice takes a red branch to "REJECT".
Surround the locked mapping with four icon labels "COLUMNS", "TABLES", "OPERATORS", "DIRECTIONS". Show all as examples of SQL grammar requiring controlled choices.
Lower flow labeled "DATA VALUES": search text, a date, and an ID value in three green envelopes travel into ordinary placeholder ports in a binding API. Label "VALUE PARAMETERS".
Between the flows show a large red crossed-out attempt to fit a placeholder token into a column-name-shaped slot, labeled "VALUE PLACEHOLDER ≠ SQL IDENTIFIER".
At the bottom a quotation-mark tool and policy shield caption "QUOTING ≠ ALLOWLIST".
Technical constraints: identifiers stored as ordinary data can be bound; SQL table/column identifiers are structure. A syntactically quoted identifier still needs an operation-specific allowed choice.

### Final refinement

Improve readability by editing only two areas of this infographic. First, in the lower-right 'EXECUTE WITH BOUND VALUES (SAFE)' panel, remove the small multiline SQL listing and replace it with a large blue SQL document icon and three large green value capsules aligned with three '?' placeholder slots; retain the large shield/check and use the simple label 'BOUND EXECUTION'. Second, replace the small paragraph in the bottom-right box with the large two-line text 'ONLY APPROVED / IDENTIFIERS' (render as two lines, omit slash). Keep the rest of the illustration, title, mapping examples, main equations, palette, and white background unchanged. All replacement text should be large, bold and comfortably readable at 1080p.

## m05 — course_assets/m05.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "BUILD COMPLEX QUERIES IN TWO CHANNELS".
Show an illustrated query assembly workbench with two parallel rails.
Blue upper rail "TRUSTED CLAUSES": fixed application-authored predicate blocks for "STATUS", "OWNER", "DATE" are selected by trusted builder gears and joined using large "AND" connectors. Each block contains only a placeholder symbol, never a request value.
Green lower rail "BOUND VALUES": matching status, owner-ID, and date-value capsules are appended to a parameter tray. A trusted counter gear produces placeholder positions "$1", "$2", "$3" from the tray's length.
Both rails reach separate ports of one "DATABASE API" gate. They must remain visibly distinct all the way to the API; no raw value arrow may enter the clause rail.
Across the bottom show three large handling cards: "MULTI-VALUE LOOKUP" with either array binding or a row of placeholders; "EMPTY LIST" with an explicit no-rows result rather than a removed filter; "PAGINATION" with bounded numeric controls and a range-check shield.
A small report icon splits into "MAPPED STRUCTURE" and "BOUND DATA".
Footer "KNOWN FRAGMENTS + SEPARATE PARAMETERS".
Use diagrams over text. Depict empty-list no rows as this example's chosen behavior, not a universal database behavior. No concatenation of actual values into SQL.

### Final refinement

Correct the placeholder/value representation in this infographic while preserving its layout and other panels. In the upper TRUSTED CLAUSES rail, replace the '?' under STATUS with '$1', under OWNER with '$2', and under DATE with '$3'. In the lower PARAMETER TRAY, replace '$1', '$2', '$3' with three green actual-value capsules labeled 'ACTIVE', '42', and 'DATE'. Widen the tray slightly if needed. The lower green pipe carries values only. Add a thin blue or dashed blue arrow from the TRUSTED COUNTER upward to the clause placeholders with the large label 'POSITIONS', making clear that the counter derives placeholder positions for SQL, not SQL tokens passed as parameter data. Preserve all remaining text, bottom cards, two-port API, palette, white background, large typography and main title.

## m06 — course_assets/m06.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "EACH CONTROL HAS A DISTINCT JOB".
A secure database operation passes through four large sequential gates, all equally legible: "VALIDATION" with ruler/checklist, "AUTHORIZATION" with subject/resource shield, "BUSINESS RULES" with workflow gears, "PARAMETER BINDING" with separate code/value channels. Under each gate use one short large descriptor: "FORM + LIMITS", "ACTION + SCOPE", "ALLOWED STATE", "SYNTAX SAFETY".
A trusted tenant badge feeds the authorization gate; an attempted cross-tenant record request is blocked even though it carries a green bound-value tag.
The database beyond the gates is partitioned into limited zones, with a small service key opening only one compartment. Label "LEAST PRIVILEGE" and show an administrator master key crossed out for routine application use.
At the bottom an error response splits into two paths: a simple client notice labeled "STABLE CLIENT ERROR" and protected diagnostics passing through a redaction filter to a log labeled "PROTECTED DIAGNOSTICS".
Central or footer takeaway "BOUND ≠ AUTHORIZED".
Do not show least privilege or hidden errors as repairing unsafe SQL construction. Binding, validation, authorization, business rules, narrow privileges and error handling are complementary with different purposes.

### Final refinement

Correct only the bottom error-handling flow. Currently STABLE CLIENT ERROR feeds REDACTION FILTER then PROTECTED DIAGNOSTICS, implying server diagnostics are sourced from the client response. Remove the arrow from STABLE CLIENT ERROR to REDACTION FILTER. Split the incoming dashed red server-failure path into two independent branches: one to STABLE CLIENT ERROR and one to REDACTION FILTER → PROTECTED DIAGNOSTICS. Put a large label 'SERVER ERROR' at the branch point if space permits. Keep the main gates, tenant examples, database, privilege keys, footer, all other labels, white background and style unchanged. Maintain large readable typography.

## m07 — course_assets/m07.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "TRACE, REVIEW, TEST THE BOUNDARY".
Three large visual zones.
"TRACE": a magnifying glass follows three color-coded provenance paths into a data-access call: blue "FIXED SQL", green "BOUND VALUES", teal "MAPPED STRUCTURE". A red raw-input fragment trying to enter the SQL path is blocked.
"REVIEW": a source-code scanner flags four orange review markers "CONCATENATION", "INTERPOLATION", "RAW METHODS", "FRAGMENTS". A wrapper box opens under inspection to show its internal data flow. A documentation book has label "VERIFY API CONTRACT".
"TEST": parameter-value cards showing "O'Reilly", "Unicode", "EMPTY", and "ARRAYS" enter a driver test harness. A sort selection card marked "UNKNOWN SORT" is rejected by a mapping lock. Two large checked result panels read "RESULTS" and "DATABASE STATE". A tiny pictorial pair of a driver mock and a real database demonstrates both levels, using only labels "DRIVER" and "DATABASE".
Footer: "ASSERT STATEMENT / PARAMETER SEPARATION".
Make unexpected punctuation visibly ordinary data, not an attack recipe. Do not imply a particular set of payloads proves complete safety. Static rules focus review; actual API behavior and integration results matter.

## m08 — course_assets/m08.png

Use case: infographic-diagram.
Asset type: a narrated TypeScript security course module illustration.
Create a highly visual professional 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Use large illustrated objects, clear diagrams, generous whitespace, navy headings, blue/teal structure, green safe paths, and red blocked hazards. Match the visual style of the recent course infographics. Lean heavily on imagery rather than text. Use only large bold sans-serif typography: about 64px title and 32px minimum labels at 1920px width. Do not add paragraphs, fine print, tiny code listings, watermarks, or decorative filler. Render quoted labels exactly, with clear spacing and safe margins. Technical arrow direction and boundary meaning matter more than decorative complexity.
Title: "KEEP SQL STRUCTURE TRUSTED".
A cohesive summary diagram with two main protected routes into a database API.
Blue route "SQL STRUCTURE": application-authored query blocks plus a locked server mapping for limited structural choices form a trusted SQL document. Client structural choices must pass through the mapping; an unlisted choice ends at a red stop. Label the mapping "CLOSED ALLOWLIST".
Green route "DATA VALUES": untrusted value envelopes pass into the parameter collection, labeled "BIND VALUES". They stay separate from the SQL document until two separate driver ports.
The database API gate label is "DOCUMENTED SAFE API". A red raw-concatenation shortcut is blocked before reaching either SQL structure or the database.
Below the main diagram use four supporting shields with large labels "VALIDATE", "AUTHORIZE", "LEAST PRIVILEGE", "REVIEW + TEST".
The protected database holds a blue SQL program shape unchanged beside green data capsules. Footer "VALUES MUST NEVER REWRITE THE PROGRAM".
Focus on the invariant across drivers, ORMs, builders, and procedures. Use large clear icons and sparse text. Do not imply arbitrary SQL identifiers can be ordinary value parameters.

