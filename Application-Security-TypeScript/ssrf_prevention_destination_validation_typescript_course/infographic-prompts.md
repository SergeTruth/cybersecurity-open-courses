# Module infographic prompts

Generated with built-in ImageGen for SSRF Prevention and Destination Validation in TypeScript. Each image illustrates its module narration, uses a white background and large typography, and is delivered as an opaque RGB 1920 × 1080 PNG. Generated source images remain in the ImageGen output directory. Only instructional modules receive images; the final quiz remains media-free. Narration, MP3s, and VTTs were not regenerated.

The ImageGen skill guided module-specific generation, visual inspection, and targeted technical refinements. Final selected images were resized and flattened onto white for course delivery.

## m01 — SSRF Is an Outbound Trust-Boundary Failure

Output: course_assets/m01.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "SSRF MISUSES THE SERVER'S NETWORK REACH".
Main illustration: a client outside a network boundary submits an untrusted destination token to an application server inside the boundary. Label the server's extra capability "SERVER NETWORK ACCESS". From the server, a green route passes a prominent "DESTINATION POLICY" gate to an "APPROVED SERVICE". A red attempted route toward "INTERNAL SERVICES" and "SENSITIVE ENDPOINTS" ends at a red stop, not a live connection. The client must not gain direct access to these protected destinations.
Three supporting effect icons show "STATE CHANGES", "RESOURCE USE", and "TRUSTED-NETWORK ACCESS" under a shared warning "HIDDEN RESPONSE ≠ HARMLESS".
At the bottom, a URL-parser gear and a TypeScript type tag are contrasted with a permission shield, labeled "PARSING + TYPES ≠ AUTHORIZATION".
Footer "PERMIT THE DESTINATION ACTUALLY REACHED".
Explain excessive client control of a server-side outbound capability visually, not with a fictional attack story. Do not imply fetch itself is inherently insecure or authentication alone authorizes targets.

## m02 — Avoid Arbitrary URLs When the Feature Can Be Narrower

Output: course_assets/m02.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "EXPOSE AN OPERATION, NOT AN OPEN FETCHER".
Large left-to-right flow: client provides "INTEGRATION ID + BUSINESS DATA" → an authorization shield labeled "USER + TENANT + ACTION" → server-managed integration cabinet → a scoped outbound request to "APPROVED PROVIDER".
The cabinet contains four large graphical fields only: "FIXED BASE URL", "CREDENTIAL REFERENCE", "ALLOWED METHOD", "LIMITS". Label the cabinet "SERVER-CONTROLLED CONFIG".
An arbitrary URL supplied by the client takes a red branch to a stop BEFORE the cabinet, labeled "NO ARBITRARY TARGET".
Lower panel: a logical "PROVIDER + OBJECT ID" maps to a fixed provider origin, while path/query business values enter a separate data channel. Show a lock on the origin labeled "INPUT CANNOT REPLACE ORIGIN".
An amber bounded box labeled "PUBLIC-URL FEATURES NEED STRICT LIMITS" contains protocol, destination, time, and byte-limit icons.
Footer "OPAQUE ID ≠ PERMISSION".
Do not let any client route bypass authorization or dictate credentials. The integration identifier and destination policy must each be authorized.

## m03 — Parse URLs Structurally and Allow Only Expected Protocols

Output: course_assets/m03.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "PARSE COMPONENTS, THEN APPLY POLICY".
Main scene: a neutral "CANDIDATE URL" card enters "Node URL" parsing gear, producing large separate component tiles "PROTOCOL", "CREDENTIALS", "HOSTNAME", "PORT", "PATH + QUERY", "FRAGMENT".
Three prominent policy gates beneath the tiles: "ALLOW REQUIRED PROTOCOLS", "EXACT HOST + PORT RULES", "REJECT EMBEDDED CREDENTIALS". Their accepted output is a document labeled "READY FOR DNS + IP CHECKS", NOT a connected socket. Unsupported inputs end in a red rejection marker.
A small default-port dial attaches to PORT with label "COMPARE EFFECTIVE PORT".
A fragment tag is disconnected from the network arrow and labeled "NOT SENT IN HTTP".
Lower contrast: a string magnifier with "RAW PREFIX MATCH" crossed out beside a structured hostname component with an exact-match symbol.
Footer "VALID URL ≠ AUTHORIZED DESTINATION".
Keep Node URL as a structural parser, not a security approval function. Do not show path, query, or fragment as hostname proof. All labels large; no full code listing or invented ports.

### Final refinement

Preserve the white background, title, URL parser, six component tiles, lower prefix-match comparison, footer, and overall typography. Correct the policy decision flow only. Rename the rule REJECT EMBEDDED CREDENTIALS to "NO EMBEDDED CREDENTIALS" and make that rule an amber condition card rather than a rejection outcome. Replace the merged green rule-output line with a compact central decision labeled "ALL RULES PASS?". A green YES arrow from that decision must lead to READY FOR DNS + IP CHECKS. A red NO arrow from the same decision must lead to REJECT. Remove the red arrow currently leaving READY FOR DNS + IP CHECKS; no rejection arrow should originate from an already-approved result. No component may skip the combined decision. Reposition only this decision area as needed for large legible text; do not add any new details.

Second refinement:
Make exactly two connector removals. First remove the downward green arrow from PATH + QUERY to COMPARE EFFECTIVE PORT: path and query do not determine the port. Leave PORT connected to COMPARE EFFECTIVE PORT. Second remove the green line leaving the bottom of NOT SENT IN HTTP and joining the ALL RULES PASS merge; FRAGMENT → NOT SENT IN HTTP must remain a standalone informational branch. Preserve all other text, diagrams, layout, YES/NO decision arrows, and colors. The policy merge has only protocol, embedded-credential, hostname and effective-port rule inputs.

## m04 — Resolve Hostnames and Validate Every Destination Address

Output: course_assets/m04.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "CHECK EVERY ADDRESS THE CLIENT CAN USE".
Upper flow: an approved hostname token → a resolver matching the transport environment → a fan-out of four address-result cards, two labeled "IPv4" and two "IPv6". Every card goes through a shared "PARSE + CLASSIFY ALL" gate. Show three candidate cards with green checks and one with a red denial; the ENTIRE candidate set then stops at "ANY DENIED → REJECT DESTINATION". No green candidate from this mixed set may reach a socket. Label the resolver "MATCH THE CONNECTION RESOLVER".
A separate compact success example shows an all-green candidate set passing the same all-address policy to "APPROVED CANDIDATES".
Lower icons list forbidden classes using only the large group labels "LOOPBACK + PRIVATE", "LINK-LOCAL + SPECIAL", "DEPLOYMENT EXCLUSIONS".
A direct "IP LITERAL" token bypasses DNS only, joining the CLASSIFICATION gate; it must never bypass policy.
Support labels "IPv4 + IPv6 + MAPPED FORMS" and "ERROR OR NO RESULT → DENY".
Footer "ONE SAFE ANSWER IS NOT ENOUGH".
No literal IP examples. Globally numbered addresses are not automatically authorized for every deployment. Do not portray DNS resolution alone as approval.

## m05 — Revalidate Redirects and Account for DNS Changes

Output: course_assets/m05.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "AUTHORIZE EVERY HOP AND THE ACTUAL SOCKET".
Two large illustrated panels.
Left heading "REDIRECTS": first approved target returns a Location document; it flows back into a gate labeled "REPEAT ALL DESTINATION CHECKS" before any next connection. Show a permitted next hop in green and a denied next hop stopping in red. A hop-count dial labeled "BOUND THE CHAIN" and a closed-route icon labeled "DISABLE IF UNNEEDED". The loop must not bypass parsing, protocol, host, port, DNS or address checks. Use a gate subtitle "URL + DNS + IP POLICY".
Right heading "DNS CHECK → CONNECTION": hostname → resolution/classification → a sealed token labeled "APPROVED ADDRESS" → controlled transport → socket. An independent unchecked second lookup attempts to enter the socket path but is blocked at a red stop labeled "NO UNCHECKED RE-LOOKUP".
Above that socket route, a separate identity ribbon goes from the original hostname to the controlled transport labeled "KEEP TLS HOSTNAME + HTTP HOST". It conveys identity, not a second uncontrolled network route.
Footer "BIND THE CONNECTION TO THE APPROVED ADDRESS".
Do not replace the URL hostname with a bare IP or disable certificate verification. Draw no direct path from an unchecked target to the socket.

### Final refinement

Edit only the REDIRECTS panel on the left. Remove the downward curved arrow from INITIAL REQUEST directly to REPEAT ALL DESTINATION CHECKS, and remove its NEXT HOP FROM LOCATION label. The only input into the repeated-check gate must come from REDIRECT RESPONSE. Keep INITIAL REQUEST → REDIRECT RESPONSE. Replace the specific URL in the Location response with the exact neutral text "Location: next URL". Replace the URL in the green allowed-next-hop card with "POLICY PASSES", retaining ALLOWED NEXT HOP. Replace the URL in the red blocked-next-hop card with "POLICY FAILS", retaining BLOCKED NEXT HOP. This makes the two cards alternative validation outcomes, not invented rewrites of a URL. Preserve the right DNS/connection panel, all other text, colors, white background, title, footer and large typography.

## m06 — Constrain the HTTP Request and Outbound Network Capability

Output: course_assets/m06.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "BOUND THE REQUEST AND THE NETWORK REACH".
Main protected pipeline: an "AUTHORIZED OPERATION" packet passes through three large illustrated stations before reaching an approved service.
Station one "REQUEST LIMITS": method selector, clock, byte gauge, compressed-to-expanded size gauge. Large labels "METHOD", "TIME", "BODY + RESPONSE", "DECOMPRESSION".
Station two "SCOPED CREDENTIALS": a key vault supplies only a provider-specific key after authorization. A separate incoming cookie/token bundle is blocked, labeled "NO INBOUND CREDENTIAL COPYING".
Station three "CONTROLLED EGRESS": a proxy/service-mesh router and firewall enforce the destination before the outbound arrow reaches the service. Label "POLICY AT THE FINAL ROUTER".
Below, a layered network illustration shows restricted workload routes with closed paths to sensitive internal services. Caption "EGRESS CONTAINMENT".
A small sanitized-log card masks token content, labeled "REDACT SECRETS".
Footer "LIMITS DO NOT REPLACE DESTINATION AUTHORIZATION".
No implication that proxies are automatically safe or that a firewall knows business authorization. The component selecting the final socket destination must enforce compatible policy. Prefer icons over lists.

## m07 — Centralize, Test, Review, and Observe Outbound Requests

Output: course_assets/m07.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "MAKE OUTBOUND POLICY VISIBLE AND TESTABLE".
Upper architecture: three callers labeled "WEBHOOK", "IMPORTER", "PREVIEW" each supply an "EXPLICIT POLICY" token to one narrow service labeled "OUTBOUND REQUEST SERVICE". Inside the service show four large icons labeled "PARSE", "ADDRESS CHECKS", "REDIRECTS", "BUDGETS". Only the service's controlled outbound arrow reaches a socket. A direct bypass attempt is blocked. Caption "REVIEW INPUT → SOCKET".
Lower left a controlled test bench with resolver and transport simulators is labeled "DETERMINISTIC TESTS". Five large test cards: "MIXED DNS", "DENIED REDIRECT", "TIME + BYTE LIMITS", "IPv6 + MAPPED", "CROSS-TENANT".
Lower right an observability panel labeled "SANITIZED OUTCOMES" has three representative large status badges: "POLICY DENIAL", "DNS FAILURE", "LIMIT REACHED". Show secrets and response bodies staying outside the log sink behind a red stop.
Footer "CENTRALIZE MECHANICS, KEEP POLICY EXPLICIT".
Avoid unrestricted client-option controls in the central wrapper. Stored integrations still require authorization. The visual should highlight maintained policy and deterministic testing rather than an offensive payload catalog.

## m08 — Course Summary: Validate the Destination Actually Reached

Output: course_assets/m08.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript SSRF prevention course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal data flows, green approved operations, amber review points, red blocked hazards. Pictures and diagrams dominate. Use only LARGE bold sans-serif typography: title around 64px, all labels at least 32px at 1920px width. Generous whitespace, safe margins, readable arrows. No paragraphs, fine print, tiny code, watermark, decoration, or invented IP addresses. Quoted labels must render exactly. Do not add exploit payloads. Technical relationships and control boundaries must be unambiguous.

Title: "VALIDATE THE DESTINATION ACTUALLY REACHED".
Create a sparse end-to-end summary as six large stages along a clear left-to-right path, with each stage dominated by an illustration:
"AUTHORIZE OPERATION" with an integration-ID permission shield;
"PARSE + POLICY" with URL component tiles and hostname/port lock;
"CHECK ALL ADDRESSES" with an IPv4/IPv6 candidate fan;
"BIND CONNECTION" with one approved-address token linked to a controlled socket;
"BOUND REQUEST" with scoped key, clock and byte gauge;
"ENFORCE EGRESS" with a final network gate leading to a permitted service.
Below the main path, a clearly marked redirect arrow loops from a Location document back to PARSE + POLICY, labeled "EACH REDIRECT RESTARTS VALIDATION". It must not skip any following checks.
A hostname identity ribbon attached to the connection stage reads "PRESERVE TLS + HOST IDENTITY".
Three bottom supporting icons labeled "TEST CHANGING STATES", "LOG SAFE OUTCOMES", "REVIEW EVERY CLIENT".
Large footer "THE CONNECTED ENDPOINT IS THE SECURITY DECISION".
The six stages represent coordinated controls, not an implication that credential or time budgets are first decided after opening a socket. Network enforcement and request constraints apply during connection/use. Do not draw bypass routes or imply a parsed URL authorizes a network destination.

### Final refinement

Preserve the title, white background, six-stage layout, large type, footer and lower support cards. Make three targeted corrections. In stage 3 replace the bottom OTHER ADDRESSES row and gray dots with a red stop marker and the large label "ANY DENIED → STOP"; preserve the IPv4 and IPv6 rows. In stage 5 change "REQUEST SIZE LIMIT" to "BYTE LIMITS" so it covers request and response budgets. Change only the starting segment of the amber redirect loop: remove its connection to stage 5, extend it to start at the bottom of PERMITTED SERVICE in stage 6, then flow left through EACH REDIRECT RESTARTS VALIDATION and Location back to stage 2. This represents a remote redirect response; it must not look as if the local request-budget control creates the redirect. Preserve the existing leftward direction and stage-2 reentry. Do not add any other content.

