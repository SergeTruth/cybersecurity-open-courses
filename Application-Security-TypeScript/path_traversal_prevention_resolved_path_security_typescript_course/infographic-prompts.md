# Module infographic prompts

Generated with built-in ImageGen for Path Traversal Prevention and Resolved-Path Security in TypeScript. Each image illustrates its module narration, uses a white background and large typography, and is delivered as an opaque RGB 1920 × 1080 PNG. Generated source images remain in the ImageGen output directory. Only the instructional modules receive images; the final quiz remains media-free. Narration, MP3s, and VTTs were not regenerated.

The ImageGen skill guided module-specific generation, visual review, and targeted refinements. Final assets were resized and flattened onto white for course delivery.

## m01 — Path Traversal Is a Boundary Failure

Output: course_assets/m01.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "AUTHORIZE THE FILESYSTEM TARGET".
Large main illustration: an application receives an untrusted file-reference envelope. A guarded process selects an operation-specific root represented by a fenced storage directory, then resolves a candidate file. Show one candidate truly inside the authorized root with a green check and another candidate outside the fence with a red stop. Label "AUTHORIZED ROOT", "RESOLVED TARGET", "OUTSIDE ROOT".
Across the middle use six large connected pictorial stages: "SELECT ROOT", "NARROW INPUT", "RESOLVE", "CHECK CONTAINMENT", "ASSESS LINKS", "AUTHORIZE + USE". All actual file operations happen only after the checks.
At the bottom, show path.join and path.normalize as construction/rewriting tools rather than guards. Label them "path.join" and "path.normalize", with the large caption "PATH TRANSFORMS ≠ PERMISSION".
Add a small file-operation cluster with read, create, move and delete icons to show that traversal affects more than reads. Use short labels "READ", "CREATE", "MOVE", "DELETE".
The visual must communicate that harmless-looking input is not proof of an authorized target. Do not imply lexical resolution follows symlinks, or that joining a root automatically confines a path.

### Final refinement

Correct only the path example labels in this infographic. In the top UNTRUSTED FILE REFERENCE envelope replace the specific '../secrets.txt' string with 'FILE REFERENCE', so the top shows possible allowed and rejected targets conceptually. In stage 2 NARROW INPUT replace '../secrets.txt' with 'report.txt'; keep stage 3 '/app/data/report.txt', making that successful example consistent. In the bottom-left transforms diagram replace the input '../a/./b.txt' with 'a/./b.txt'; keep output 'a/b.txt'. Normalization must not appear to remove a leading parent escape. Preserve every other illustration, title, label, diagram, white background, colors, large typography, and layout.

## m02 — Prefer Storage Identifiers Over Arbitrary Paths

Output: course_assets/m02.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "ACCEPT OBJECT IDs, CONTROL STORAGE".
Left-to-right flow: client sends an opaque "OBJECT ID" token, which enters a server gate labeled "AUTHORIZE USER + TENANT". It then reaches a storage metadata card containing only four large fields "ROOT", "STORED NAME", "TENANT", "STATE". A trusted mapping routes that record into a file beneath a locked "CONTROLLED STORAGE" root. Mark the metadata path "SERVER-CONTROLLED MAP".
A red arbitrary-path request ends at a stop before the mapping.
In the bottom half, an upload file splits into two clearly separate branches: "ORIGINAL NAME" → a display-metadata tag labeled "UNTRUSTED METADATA"; and the file content → an application naming machine labeled "GENERATE STORED NAME" → private staging folder → final storage. Show a type/size policy shield on the upload content branch. No client filename arrow may directly set the stored path.
Large footer "OPAQUE ID ≠ AUTHORIZATION".
A stored-record icon with a small warning should remind that simply putting client data in a database does not make it trusted. Use the short label "VERIFY METADATA ORIGIN".
Keep the client referring to an object while the server chooses its location.

## m03 — Resolve Against a Trusted Root and Verify Containment Correctly

Output: course_assets/m03.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "RESOLVE, THEN CHECK CONTAINMENT".
Main blue pipeline: an absolute trusted-root folder and a requested relative-path token enter a gear labeled "path.resolve". The resulting candidate and resolved root enter a comparison gate labeled "path.relative".
The comparison gate branches into four large result cards: "CHILD PATH" with a green label "LEXICAL PASS"; "PARENT ESCAPE" with a red label "REJECT" and short examples ".." and "../file"; "ABSOLUTE RESULT" with a red label "REJECT"; "EMPTY RESULT" with an amber label "ROOT EQUALITY: OPERATION POLICY".
Below, a clear directory tree shows "/data" with two SIBLING folders "files" and "files-backup". Enclose only "files" as the authorized root. A file under files is inside; files-backup is visibly outside despite a shared name prefix. Caption "SHARED PREFIX ≠ CONTAINMENT".
Add two compact supporting symbols: a Windows/POSIX platform pair labeled "USE PLATFORM PATH RULES", and a link plus identity shield labeled "LINKS + AUTHORIZATION STILL MATTER".
Technical constraints: reject an exact parent component or a relative result beginning with parent plus separator, not every name containing two dots. Root equality is caller-specific. path.relative may produce an absolute result for different Windows drives. The green result is lexical containment only, not complete authorization.

## m04 — Separate URL Decoding, Path Parsing, and Validation

Output: course_assets/m04.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "CHECK THE REPRESENTATION YOU USE".
Show a horizontal interpretation pipeline: "HTTP INPUT" envelope → "FRAMEWORK PARSING" window → "DOCUMENTED DECODING" decoder → one single clean token labeled "VALIDATED VALUE" → "PATH RESOLUTION" gear → filesystem target icon. Keep the token's color and shape identical from validation through resolution.
A red side path attempts an extra decode after the validation point, visibly changing the token shape; stop it with a red X and label "NO EXTRA DECODE AFTER CHECK".
A decoding-error branch ends at "REJECT".
Above the framework/decoder pair, a documentation magnifier labeled "KNOW FRAMEWORK BEHAVIOR" shows these are the actual configured parsing steps, not an instruction to blindly decode again.
Along the bottom use three distinct large decision cards: "FILENAME GRAMMAR" with "ACCEPTABLE NAME?"; "CONTAINMENT" with "INSIDE ROOT?"; "AUTHORIZATION" with "PERMITTED OBJECT?".
Include one simple logical-name card "report.pdf" passing a narrow filename grammar filter. Next to it, a nested-folder icon caption "NESTED PATHS NEED CONTAINMENT".
Footer "ONE DOCUMENTED INTERPRETATION".
Do not suggest repeatedly decoding improves safety or that a filename regex replaces containment. Keep the focus on a checked value reaching the filesystem without a later semantic transformation.

### Final refinement

Edit this infographic while preserving its white background, large typography, title, main layout, and all three bottom panels. Fix the upper pipeline so it is a conceptual representation diagram, not an incorrect concrete string transformation. In the DOCUMENTED DECODING box, remove all percent-encoded characters and show only a decoder gear and the large label "DECODE ONCE". Replace "report.pdf" inside the green VALIDATED VALUE token with "CHECKED VALUE". Replace "report.pdf" in the final filesystem target with a matching green token labeled "CHECKED VALUE". In the red EXTRA DECODE box, remove "../../etc/passwd" and use a visibly different red token labeled "CHANGED VALUE". The red side branch is the forbidden transformation after validation, not a claim that report.pdf decodes to a malicious path. Keep the bottom filename-grammar example report.pdf unchanged. Do not add additional text or code.

## m05 — Symlinks, Junctions, and Real Filesystem Paths

Output: course_assets/m05.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "LEXICAL PATHS CAN HIDE REAL ESCAPES".
Upper illustration: a storage directory tree enclosed within "TRUSTED ROOT". A candidate file appears lexically inside through an intermediate folder labeled "LINK / JUNCTION". A curved red filesystem-resolution arrow leaves the enclosure and reaches an outside file. Caption "LEXICALLY INSIDE • REALLY OUTSIDE". The root and candidate must be clearly drawn as path objects, with the red redirect originating at the intermediate link.
Below show two separate workflows.
"EXISTING TARGET": canonicalize both root and candidate through an "fs.realpath" gear, then a "path.relative" comparison gate checks the real containment. An outside canonical target is rejected.
"NEW TARGET": an existing parent folder passes canonical containment and ownership checks; a server naming machine contributes a new filename, producing a proposed child under that controlled parent. Show "VERIFY PARENT" and "GENERATE CHILD NAME". Do not send the nonexistent child through realpath.
Footer warning "REALPATH DOES NOT REMOVE RACES".
Support with two large lock icons labeled "CONTROL DIRECTORY WRITERS" and "REVIEW WINDOWS REPARSE POINTS".
Technical constraints: realpath is useful for relevant existing targets but does not solve concurrent replacement or every hard-link/mount issue. Avoid promising universal race-free access.

### Final refinement

Keep the infographic layout, white background, colors and large labels unchanged. Correct every outside target example currently written "/etc/passwd" to "/external/report.pdf" (including the upper red outside-root file card and the lower red canonical-path result). The intermediate directory link represents /app/data/uploads/link pointing to /external, so /app/data/uploads/link/report.pdf resolves to /external/report.pdf. Do not imply a directory link changes the leaf filename. Keep "report.pdf" as the candidate filename. In the lower candidate label write "/app/data/uploads/link/report.pdf" exactly, wrapping after a slash if needed without adding a duplicate slash. Preserve the new-target workflow, containment rejection, and race warning.

## m06 — Avoid Check-Then-Use Gaps and Dangerous File Operations

Output: course_assets/m06.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "A PATH CHECK IS NOT AN ATOMIC OPEN".
Upper timeline with three separated moments: "CHECK" shows a directory link pointing to an allowed file; "REPLACEMENT GAP" shows another writer swapping that link; "USE" shows a later open reaching a different file, with a red warning. The image is a conceptual race diagram, not an exploit recipe.
Lower safer-design panel: a protected parent folder with a permission lock labeled "CONTROL DIRECTORY WRITERS" feeds an "OPEN ONCE" handle icon. Subsequent operations remain attached to the same open handle, labeled "USE THE HANDLE". Beside it, a new-file workflow uses "CONTROLLED PARENT" → "SERVER NAME" → "EXCLUSIVE CREATE", with an existing destination blocked.
A platform-specific no-follow control has the explicit label "SCOPE VARIES BY PLATFORM"; do not imply it protects every intermediate component or is universally available.
At the right, a stricter-contract shield guards large operation icons "DELETE", "OVERWRITE", "RENAME", "RECURSIVE". A root folder faces a red stop labeled "REJECT ROOT WHEN CHILD REQUIRED".
Footer "OPERATION-SPECIFIC SAFEGUARDS".
Technical constraints: no-follow and handles have scoped guarantees; the application must control writable parents and use OS-specific designs for stronger requirements. Do not show path-string validation alone as atomic.

## m07 — Apply the Pattern Across Downloads, Uploads, Archives, and Reviews

Output: course_assets/m07.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "APPLY THE BOUNDARY TO EVERY FILE FLOW".
Four large illustrated panels.
"DOWNLOAD": object ID → user/tenant authorization shield → controlled storage map → containment/link check → file open. Use short labels "AUTHORIZE", "MAP", "CHECK", "OPEN".
"UPLOAD": incoming file → type/size/content policy filter → server naming machine → private staging → controlled final folder. A separate original-name tag stays outside the path-routing chain as "DISPLAY METADATA".
"ARCHIVE": one archive opens to three entry-path cards. EVERY card passes its own destination containment gate before reaching a fenced extraction root. A fourth escaping or link entry is rejected according to policy. A large gauge labels "ENTRY + EXPANDED-SIZE LIMITS".
"REVIEW + TEST": a magnifying glass inventories read, write, delete, rename, copy, and stream icons. Show a small test grid with labels "ROOT EQUALITY", "SHARED PREFIX", "LINKS", "CROSS-TENANT", "ALTERNATE ROUTES", "WRITES + DELETES".
Footer "CHECK EVERY OBJECT AND EVERY ARCHIVE ENTRY".
Technical constraints: checking an archive's outer filename does not secure internal entry paths. Upload content checks do not authorize destination paths. Keep all flow arrows in logical order and large type throughout.

## m08 — Course Summary: Authorize the Resolved Filesystem Target

Output: course_assets/m08.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match the recent course series with large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior, amber review points, and red blocked hazards. Lean on pictures and diagrams rather than text. Use only LARGE bold sans-serif typography: title about 64px, labels at least 32px at 1920px width. Keep generous whitespace and safe margins. No paragraphs, fine print, tiny code listings, decorative filler, or watermarks. Render quoted labels exactly. Arrow direction, filesystem relationships and technical qualifications are essential.
Title: "AUTHORIZE THE RESOLVED FILESYSTEM TARGET".
A coherent final architecture: client "OBJECT ID" enters an "AUTHORIZE" gate, then a "SERVER MAP" cabinet chooses one "TRUSTED ROOT". For operations that accept a path, a separate small route labeled "DECODED RELATIVE PATH" joins at a lexical resolution/check gate; do not let this path bypass object authorization before any operation.
The main sequence after selecting the root is "LEXICAL CHECK" → "REAL TARGET / PARENT" → "CONTROLLED OPEN" → a protected file. Show identity and permission shields governing the entire sequence.
Under the sequence place four large supporting pillars with icons: "NARROW INPUT", "LINK + RACE DESIGN", "LEAST PRIVILEGE", "STRICT WRITE POLICY".
A red path that escapes the root and a cross-tenant request each end at a rejection marker. A string-transform tool marked "normalize" is pictured separately from the authorization shield to show distinct responsibilities.
Footer "THE TARGET MATTERS, NOT THE SPELLING".
Keep the summary highly visual and sparse. Make clear that canonical-target checks depend on whether the target already exists; the REAL TARGET / PARENT stage covers that choice. Do not imply realpath alone or an opaque identifier guarantees access.

### Final refinement

Preserve the infographic title, white background, main flow, lower four pillars, rejection markers and footer. Remove the ENTIRE upper bypass route: the blue line starting above the client, its DECODED RELATIVE PATH box, its normalize box, all connecting lines, and the downward arrow into REAL TARGET / PARENT. Leave no bypass connector at all. In that top whitespace place a small standalone comparison with no arrows to the operational flow: a gear labeled "normalize", a large "≠" symbol, and a shield labeled "AUTHORIZE". This is an isolated conceptual reminder that string transformation is not authorization. Keep exactly one operational left-to-right route: CLIENT OBJECT ID → AUTHORIZE → SERVER MAP → TRUSTED ROOT → LEXICAL CHECK → REAL TARGET / PARENT → CONTROLLED OPEN → PROTECTED FILE. Preserve the existence-dependent target-versus-parent labels. Do not add any new route from the client around the authorization gate.

