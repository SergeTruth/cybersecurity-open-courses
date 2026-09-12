# Module infographic prompts

Generated with the built-in ImageGen tool. Final course assets are opaque RGB PNGs, normalized to 1920 × 1080 on white. The prompts use each module's existing narration as their source. The final quiz has no illustration.

## m01 — course_assets/m01.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "THE SERVER IS THE SECURITY BOUNDARY".
Main composition: a clearly marked server trust boundary. Outside it, large browser, mobile app, and command-line client icons send request envelopes. Label this area "CLIENT PROPOSES". Show a disabled button switched on, an edited JSON envelope, and a bypass arrow around a UI screen, all still reaching the same server gate. Label the boundary gate "SERVER DECIDES". Inside, show a verified identity badge, a policy shield, business-rule gears, and a protected database connected in that order. One large label below: "EVERY REQUEST IS CHECKED".
Along the bottom show three compact pictorial pairs: product-and-quantity request → server price calculator; document ID request → permission shield; approval request → current-state lock. Labels: "PRICE", "ACCESS", "STATE".
Technical invariants: clients may propose choices but cannot grant themselves privilege. All custom-client paths must enter the server checks; none bypass them. Keep the server gate dominant. The image should communicate that UI restrictions improve usability and independent server enforcement protects resources.

## m02 — course_assets/m02.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "BUILD TRUSTED SERVER CONTEXT".
Show a left-to-right credential verification process: session/token ticket → large verification gate → trusted context badge → downstream authorization shield. Label stations "CREDENTIALS", "VERIFY", "AuthContext", "AUTHORIZE".
Surround the verification gate with five simple icon labels: "SIGNATURE / SESSION", "ISSUER", "AUDIENCE", "EXPIRY", "REVOCATION". Treat checks as applicable to the authentication protocol.
Below the gate, authoritative server sources—a session store, identity provider, and application database—feed user, tenant, role, and entitlement cards inside the trusted context. Labels "VERIFIED SOURCES", "USER", "TENANT", "ROLES", "ENTITLEMENTS".
At the bottom left show a separate red client request claiming "role: admin" and "tenantId"; block its arrow to trusted context with a red X and label "CLAIMS DO NOT GRANT PRIVILEGE".
At the bottom right show a valid identity badge facing a still-locked resource and label "IDENTITY ≠ PERMISSION".
Keep pictures dominant and context origin visibly trustworthy. Do not imply decoding alone verifies a token.

### Final refinement

Correct only the red untrusted-claims path in this infographic. Currently the red arrow from the bottom-left client enters the SESSION STORE and emerges from the APPLICATION DATABASE; this is misleading. Remove that entire red arrow route. Instead draw a short red arrow from the client-claims card ending immediately in a large red stop/X in the white gap BEFORE the VERIFIED SOURCES panel. No red arrow may enter, overlap, or originate from any verified source or reach AuthContext. Keep the three blue arrows from VERIFIED SOURCES into VERIFY exactly as they are. Keep all other layout, illustration, text, large typography, white background, and the green trusted flow unchanged.

## m03 — course_assets/m03.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "VALIDATE AT THE SERVER BOUNDARY".
Four incoming envelope icons labeled "PATH", "QUERY", "BODY", "HEADERS" converge on a large box marked "UNKNOWN INPUT". It passes through a schema filter labeled "RUNTIME VALIDATION". A rejected malformed object follows a red branch to "CLIENT ERROR"; a clean green object follows the success branch to "VALIDATED DTO". Downstream code receives only the validated object.
Around the filter use six large compact tags: "SHAPE", "RANGE", "LENGTH", "ENUM", "NESTING", "EXTRA KEYS". Include a deliberate normalization gear before the final validation check, labeled "NORMALIZE DELIBERATELY".
Show a TypeScript type assertion badge "as T" with a crossed shield, labeled "NO RUNTIME CHECK".
Along the bottom are three independent large question icons/cards: "VALIDATION" with "ACCEPTABLE FORM?", "AUTHORIZATION" with "PERMITTED CALLER?", "BUSINESS RULES" with "ALLOWED NOW?". Distinguish these decisions visually; do not imply that validating shape establishes permission.

## m04 — course_assets/m04.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "AUTHORIZE EVERY ACTION AND RESOURCE".
Large diagram: a trusted identity/tenant badge and requested document ID converge into a server-side scoped query filter labeled "TRUSTED SCOPE". Behind it are visibly separated "TENANT A" and "TENANT B" database compartments. The authorized query reaches only TENANT A; a red cross-tenant arrow to TENANT B stops at a lock.
The allowed resource then passes through a second gate labeled "CONTEXTUAL POLICY". Surround it with a few large icon labels "ACTION", "ROLE", "DELEGATION", "STATE". Show a missing-context route going to a red stop labeled "DENY BY DEFAULT".
Along the bottom a fan of operation icons—read, update, delete, download, export and bulk—each passes through the same policy shield. Use labels "READ", "UPDATE", "DELETE", "DOWNLOAD", "EXPORT", "BULK". For bulk show several individual record cards, each with its own check or stop.
One prominent comparison: "OPAQUE ID ≠ PERMISSION".
Technical constraints: derive tenant scope from verified context, never from an untrusted tenant claim. Scoped retrieval and contextual policy both matter. All routes and each bulk target require enforcement.

## m05 — course_assets/m05.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "THE SERVER DERIVES SENSITIVE VALUES".
Main upper flow: client shopping selection with only "PRODUCT", "QUANTITY", "SHIPPING" → server calculator receiving authoritative catalog and account data → price and availability result → protected order database. Label the calculator "AUTHORITATIVE DATA + RULES", the result "SERVER-CALCULATED TOTAL". An attempted client-set price tag is blocked before the result.
Lower flow: a simple "PROFILE EDIT" input offers "DISPLAY NAME". A red oversized request bag also contains "ROLE", "TENANT", "BALANCE", "ADMIN"; those extra fields hit a lock. A large "EXPLICIT ALLOWLIST" selector passes only display name into a narrow update.
Show three separate operation icons labeled "PROFILE CHANGE", "ROLE ASSIGNMENT", "OWNERSHIP TRANSFER", each with its own policy shield, making dedicated privileged operations visible.
Prominent central comparison: "WELL-FORMED ≠ AUTHORIZED".
Use pictures and arrows over words. Do not imply a client-submitted total controls the charge or arbitrary body fields can be spread into database updates.

### Final refinement

Change only the bottom-left heading in this infographic. Replace “PRIVILEGED OPERATIONS (SEPARATE POLICIES)” with “PURPOSE-SPECIFIC OPERATIONS” and a second large line “SEPARATE POLICIES”. This grouping includes ordinary profile changes as well as privileged role and ownership changes, so it must not label all of them privileged. Preserve every other label, diagram, icon, color, white background, composition, and large typography exactly.

## m06 — course_assets/m06.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "PROTECT SHARED STATE ATOMICALLY".
Create three large visual panels across a white canvas, each with a distinct pictorial mechanism.
Panel 1 "CURRENT STATE": a stale browser snapshot of an approval button faces a server workflow state machine. A "REJECTED" record cannot move to "APPROVED": show a red blocked arrow. A valid current-state transition shows a green arrow.
Panel 2 "SAFE RETRIES": three repeated request envelopes carry the same "KEY A" and flow to a persistent idempotency record, producing only one operation result. Label "PERSIST + ENFORCE". A uniqueness lock reinforces one logical event.
Panel 3 "ATOMIC CHANGE": two simultaneous requests reach one remaining inventory item. Inside a single guarded database operation, "CHECK + CHANGE" are enclosed together. Exactly one request is green "SUCCESS"; the other is orange "CONFLICT". The final count is "0", never negative.
Along the bottom, four big tool icons labeled "CONDITIONAL WRITE", "VERSION CHECK", "LOCK", "TRANSACTION + CONSTRAINTS". These are alternative or complementary mechanisms chosen for the invariant; do not imply any transaction at any isolation level automatically removes a race.
Bottom banner: "AUTHORIZE → VERIFY STATE → CHANGE ATOMICALLY".
Keep labels large, diagrams uncluttered, and duplicate requests clearly tied to one logical operation.

### Final refinement

Edit only the left CURRENT STATE panel; preserve the SAFE RETRIES panel, ATOMIC CHANGE panel, four bottom mechanism cards, footer, title, style, and all their text exactly. Redesign CURRENT STATE into two clearly separate examples. Upper example: a small browser labeled 'STALE VIEW' showing 'PENDING' and an Approve button sends a request to a server record labeled 'CURRENT: REJECTED'; a large red stop/X blocks approval with caption 'APPROVAL BLOCKED'. The server rejected state has NO outgoing arrow and NO link to a pending state. Lower example: a separate simple green permitted-transition diagram 'PENDING' → 'APPROVED', labeled 'VALID TRANSITION'. Use large legible type, white background, and visibly separate these examples. Remove the existing REJECTED → PENDING arrow and the green browser bypass arrow completely.

## m07 — course_assets/m07.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "ENFORCE, TEST, OBSERVE".
Three equally strong visual zones connected into an assurance loop.
"ENFORCE": a small architectural stack with credential-check middleware, schema filter, service/policy shield, scoped repository, and database invariant lock. Use short large labels "IDENTITY", "VALIDATION", "POLICY", "SCOPE", "INVARIANTS". Several alternate route arrows all enter the same controls; none bypass policy.
"TEST": direct API request tools bypass a browser screen and probe the server. Four large negative-test cards: "CROSS-TENANT", "OVER-POSTING", "REPLAY", "CONCURRENCY". Show two result-check icons labeled "RESPONSE" and "DATABASE STATE". Label the whole test path "BYPASS THE UI".
"OBSERVE": a security event stream flows through a redaction filter into a protected audit log and a metrics chart. Safe event tags "SUBJECT", "ACTION", "OUTCOME". Red crossed-out secret icons labeled "PASSWORDS", "TOKENS", "SECRETS".
One strong footer "EXPLICIT POLICIES • SECURE DEFAULTS".
Use imagery over text and large labels only. The observation flow must show removal of sensitive values before storage.

### Final refinement

Edit only the incoming blue arrows in the left ENFORCE panel. Currently the four external caller icons enter VALIDATION, POLICY, SCOPE, and INVARIANTS separately, wrongly implying skipped security checks. Remove all those separate entry arrows. Merge the four caller icons into one shared blue vertical input bus to the left of the five-stage stack, then route a single arrow into the TOP of IDENTITY. Every caller must then travel through IDENTITY → VALIDATION → POLICY → SCOPE → INVARIANTS → database. NO external arrow may enter a later stage. Keep the icons and stack intact; adjust only their spacing if required for the bus. Preserve the entire TEST and OBSERVE panels, all typography, all labels, all other colors, white background, and footer exactly.

## m08 — course_assets/m08.png

Use case: infographic-diagram.
Asset type: instructional course module illustration.
Create a highly visual 16:9 widescreen infographic for 1920x1080 delivery. Opaque pure white background. Match the previous course series with crisp illustrated objects, confident navy headings, blue and teal structure, green approval and red blocked paths. Lean heavily on pictures and diagrams rather than text. Use only LARGE bold sans-serif type: title about 64px, labels at least 32px at 1920px width. Keep generous white space and safe margins. No paragraphs, small captions, watermarks, decorative filler, or code listings. Render quoted labels exactly. Correct arrow direction and technical meaning are essential.
Title: "MAKE THE SERVER THE SOURCE OF TRUTH".
A final course summary illustrated as a coherent secure architecture, with a custom client outside a clear trust boundary and a protected database inside. The client sends an operation request through five large server stations: "AUTHENTICATE", "VALIDATE", "AUTHORIZE", "DERIVE", "COMMIT SAFELY". Use identity badge, schema filter, resource lock, calculator/gears, and atomic database icons. Keep all five stations readable and causally connected.
Under the server pipeline place four large supporting pillars with icons: "TRUSTED CONTEXT", "EXPLICIT FIELDS", "ATOMIC INVARIANTS", "TEST + OBSERVE".
At the right, the protected database contains locked price, role, owner, and workflow symbols. A second path from a command-line custom client bypasses the UI but must converge before all server checks. Label this path "CUSTOM CLIENT".
At the bottom, two big outcome images: blocked cross-tenant/privilege request with red X, and approved scoped operation with green check. Footer "EVERY PATH • EVERY REQUEST".
Technical message: independent server decisions protect identity, authorization, business rules and state invariants even when every interface assumption is bypassed. Keep the summary more visual than textual, with no tiny detail.

### Final refinement

Edit only the two small three-line cards in the bottom outcome panels. In the red BLOCKED panel replace the card text 'TENANT: B / ROLE: ADMIN / AMOUNT: 9999' with three large labels 'TENANT OVERRIDE', 'ROLE OVERRIDE', 'PRICE OVERRIDE'. In the green APPROVED panel replace 'TENANT: A / ROLE: USER / AMOUNT: 100' with 'VERIFIED SUBJECT', 'ALLOWED RESOURCE', 'DERIVED VALUE'. Enlarge the cards slightly if needed for large readable labels, while keeping their adjacent icons and outcome headings. These labels clarify that approval relies on server-established facts, not client-provided identity or price. Preserve the entire upper server architecture, exact five-stage pipeline, footer, white background, visual style, and all other text unchanged.

