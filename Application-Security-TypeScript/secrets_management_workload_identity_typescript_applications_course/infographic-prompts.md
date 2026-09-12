# Module infographic prompts

Generated with built-in ImageGen for Secrets Management and Workload Identity in TypeScript Applications. Each image illustrates its module narration, uses a white background and large typography, and is delivered as an opaque RGB 1920 × 1080 PNG. Generated source images remain in the ImageGen output directory. Only instructional modules receive images; the final quiz remains media-free. Narration, MP3s, and VTTs were not regenerated.

The ImageGen skill guided module-specific generation, visual inspection, and targeted technical refinements. Final selected images were resized and flattened onto white for course delivery.

## m01 — Secrets Are Portable Authority

Output: course_assets/m01.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "SECRETS ARE PORTABLE AUTHORITY".
Main visual: a reusable key or bearer-token card is copied into two identical tokens held by two different process icons. Both point toward the same credential-check lock protecting a database/API capability. Mark this as the amber risk "A COPY CAN CARRY THE SAME POWER". Do not suggest the receiver can reliably distinguish holders of the same bearer credential.
Below, four large risk-reduction dials with icons and only these labels: "FEWER CREDENTIALS", "SHORTER LIFETIME", "NARROWER PRIVILEGE", "FEWER COPIES".
A compact source-to-operations strip shows credential copies spreading toward a repository, build artifact, log, and browser bundle; those distribution paths are crossed out.
Include a small contrasting certificate/key pair: an open document labeled "PUBLIC CERTIFICATE" and a locked key labeled "PRIVATE KEY".
A final platform identity badge points to a short-lived token, captioned "PREFER WORKLOAD IDENTITY".
Footer "PROVE THE WORKLOAD, LIMIT ITS AUTHORITY".
Do not classify a public certificate as a secret. Do not imply workload identity removes authorization needs or that secret storage alone prevents misuse by a holder.

## m02 — Prefer Workload Identity Over Long-Lived Application Keys

Output: course_assets/m02.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "LET THE RUNTIME ESTABLISH WORKLOAD IDENTITY".
Main five-step left-to-right flow: "TRUSTED RUNTIME" with a container/server icon → "WORKLOAD IDENTITY" badge → "CREDENTIAL PROVIDER" broker → "SHORT-LIVED CREDENTIAL" token with a clock → receiving service's "AUTHORIZATION" gate → a narrowly bounded resource. Identity is a named principal, not itself a password. The runtime and provider issue or broker credentials, and the target service separately authorizes access.
Below, a federation trust gate accepts an issuer assertion only through three large checks labeled "ISSUER", "AUDIENCE", "WORKLOAD CLAIMS", then enters an exchange arrow labeled "SERVICE CREDENTIAL".
Beside it, a Kubernetes service-account badge connects to a cloud through a required bridge labeled "TRUST INTEGRATION". No direct service-account-to-cloud bypass.
Footer "SHORT-LIVED STILL MEANS SENSITIVE".
A small crossed-out permanent key label reads "NO PERMANENT APP KEY".
Do not depict removing trust as instantly invalidating every issued token. Do not confuse an OIDC assertion with an access token valid for all APIs. Keep this diagram provider-neutral.

## m03 — Use Credential Provider Chains Instead of Hand-Rolled Secret Loading

Output: course_assets/m03.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "KEEP THE PROVIDER ATTACHED TO THE CLIENT".
Main scene: a TypeScript service client stays connected to a credential-provider gear with a circular refresh arrow. The provider supplies a fresh clock-marked token when needed. Label "ACQUIRE + RENEW". Contrast with an expiring token trapped in a static configuration box, crossed out and labeled "NO FROZEN TOKEN SNAPSHOT".
Lower left: four potential credential-source tiles labeled "ENVIRONMENT", "DEVELOPER LOGIN", "FEDERATION", "PLATFORM IDENTITY" feed a selector labeled "DEPLOYED PROVIDER ORDER". Caption "ORDER VARIES BY SDK". These are possible sources, not a universal numbered order.
The selector has an amber warning "EARLIER SOURCE MAY WIN", with a developer-file icon trying to appear in production.
Lower right: a production identity gate labeled "SELECT PRODUCTION PROVIDER" leads to an approved principal badge. If identity is unavailable, a red branch stops at "FAIL VISIBLY", with no fallback to a permanent key. A safe audit card labeled "VERIFY EFFECTIVE PRINCIPAL" shows only ID and provider metadata, never a token.
Footer "VERIFY WHO THE CLIENT ACTUALLY BECOMES".
No vendor-specific invented SDK calls or claims that every provider chain uses the same precedence.

## m04 — Manage the Secrets You Still Need

Output: course_assets/m04.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "MANAGE THE SECRETS YOU STILL NEED".
Main flow: an application workload identity badge authenticates through a least-privilege gate to a managed secret vault. The gate reads "READ REQUIRED SECRET ONLY". Inside the vault show named compartments with exactly one approved compartment highlighted; other secrets and administration controls are locked. The application receives an abstract masked key through a fixed accessor labeled "FIXED SECRET ID" and uses it at a required external service.
A red client-requested arbitrary secret-name token ends at a stop before the accessor.
A permanent master-key bootstrap is crossed out with label "NO STATIC SECRET ZERO".
Two lower supporting panels: a cache with clock and circular refresh arrow labeled "BOUNDED CACHE + REFRESH"; and a managed signing device labeled "MANAGED CRYPTO" with a private key visibly remaining inside, while only a signature leaves.
Footer "THE STORE PROTECTS CUSTODY; THE APP CONTROLS USE".
A small file-permission lock may represent files only when needed, but prioritize the identity, vault, fixed accessor and cache relationships. Do not imply a TypeScript Secret type enforces confidentiality or that returning a reusable password makes it non-reusable.

### Final refinement

Preserve this infographic layout, colors, white background, title, vault contents, lower panels and footer. Change the label above the masked key leaving the vault from FIXED SECRET ID to "APP USES SECRET". This object is the retrieved confidential value, not its identifier. Place the label "FIXED SECRET ID" above the green request arrow that enters the vault from the READ REQUIRED SECRET ONLY authorization gate, using large legible type. Do not add secret values or change arrows. Keep the workload identity authorizing a narrowly named retrieval and the application using the returned secret.

## m05 — Keep Secrets Out of Code, Logs, Images, and Client Bundles

Output: course_assets/m05.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "STOP SECRETS FROM BECOMING COPIES".
Four large illustrated panels on white, little text.
"REPOSITORIES": source files and sample configuration receive unmistakable placeholders, while a real key icon is blocked at a red stop. Caption "PLACEHOLDERS, NOT KEYS".
"BUILD ARTIFACTS": a stack of container-image layers shows a key retained in an older layer despite deletion in a later layer. Caption "LATER DELETION ≠ ERASURE". A separate ephemeral build-secret mount feeds only a build command, not the image output.
"BROWSER BUNDLES": a browser openly displays a bundled key icon with a red warning. Caption "DELIVERED TO USERS = VISIBLE". A secure alternative routes a user action through an "AUTHORIZE ACTION" server gate before a server-held credential is used; no browser-held confidential key.
"TELEMETRY": a safe-field filter admits only "KEY ID" and "VERSION" metadata to a log; key/token/value objects stop outside. Caption "METADATA, NOT VALUES".
Footer "ENVIRONMENT VARIABLES DELIVER SECRETS; THEY DO NOT MANAGE THEM".
Do not imply environment variables are encryption or always prohibited. Do not portray secret scanning or deleting a latest commit as revocation.

## m06 — Design Rotation, Expiration, and Failure Behavior

Output: course_assets/m06.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "ROTATION MUST REACH RUNNING CONSUMERS".
Upper conceptual rotation timeline, explicitly labeled "WHEN OVERLAP IS SUPPORTED": "ACTIVATE NEW" with new key B → "BOUNDED OVERLAP" with keys A and B → "REFRESH CONSUMERS" with running app, cache and connection-pool icons → "VERIFY ADOPTION" with safe version metadata → "REVOKE OLD" with key A blocked and key B active. Arrow order is important. The old credential is not revoked before consumers migrate in this routine-overlap diagram.
Middle contrasting icons: a changed vault version and an unchanged process cache separated by "STORE UPDATED ≠ CONSUMER UPDATED". Show a refresh arrow reaching the process/pool.
Lower three large resilience cards: "REFRESH BEFORE EXPIRY" with token and clock; "BOUNDED RETRIES" with backoff clock; "NO PERMISSIVE FALLBACK" with a permanent emergency key crossed out.
A brief lower label "CACHED USE ONLY WHILE VALID + PERMITTED".
Footer "TEST REFRESH, POOLS, EXPIRATION, AND REVOCATION".
Do not claim every service supports overlapping keys or that password rotation necessarily terminates established sessions. Do not imply repeated token refresh can fix authorization denial.

## m07 — Apply Least Privilege, Isolation, and Testing

Output: course_assets/m07.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "SEPARATE IDENTITIES, TEST THEIR LIMITS".
Upper scene: separate compartments labeled "DEVELOPMENT", "PRODUCTION", and "DEPLOYMENT". Each contains its own identity badge and only its required resource/action. Cross-compartment requests end at red stops. Inside production, two separate workload badges have narrow routes to distinct permitted resources; no shared administrator key.
A deployment trust gate below accepts a CI job only after checks labeled "ISSUER + AUDIENCE", "REPOSITORY + JOB", "PROTECTED ENVIRONMENT". An untrusted pull-request code icon is blocked from deployment authority. Caption "FEDERATION DOES NOT MAKE EVERY BUILD TRUSTED".
Lower test bench uses four large cards: "ALLOWED ACCESS", "DENIED ACCESS", "REFRESH + REVOCATION", "NO IDENTITY FALLBACK". Show the denied-access test as an expected successful denial rather than permission being granted.
A small artifact magnifier and synthetic-token icon reads "TEST LEAKAGE WITH SYNTHETIC VALUES".
Footer "LEAST PRIVILEGE IS AN OPERATING REQUIREMENT".
Identity proves who requests access; resource permissions define what it may do. Developer login, deployment identity and runtime workload identity are distinct, even when SDK interfaces are shared.

### Final refinement

Preserve the infographic title, white background, upper three compartments, four lower test cards, colors and footer. Make these corrections. Replace the middle-left input box currently labeled UNTRUSTED PULL REQUEST / BLOCKED FROM DEPLOYMENT AUTHORITY with a neutral document-and-job icon labeled "CI JOB ASSERTION". Remove its internal red arrow and X. Keep its single blue arrow into DEPLOYMENT TRUST GATE, then the three trust checks before deployment authority. Do not depict a rejected request becoming authorized. In the upper-right DEPLOYMENT compartment change only the red denied label "TO PRODUCTION" to "TO PRODUCTION DATA" to distinguish deployment infrastructure permission from runtime data access. Finally remove the entire small prose paragraph at lower right and replace it with two large icons, an identity badge and a permission shield, separated by the large text "IDENTITY ≠ PERMISSION". Use no paragraph or fine print. Keep the federation warning banner and all other labels unchanged.

## m08 — Course Summary: Reduce Secrets and Strengthen Identity

Output: course_assets/m08.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript secrets-management and workload-identity course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal control flows, green approved operations, amber review points, red blocked hazards. Pictures dominate over words. Use only LARGE bold sans-serif typography (title about 64px; labels at least 32px at 1920px width). Generous whitespace, safe margins, simple unambiguous arrows. No paragraphs, fine print, tiny code, watermark, decorative filler, or actual credential strings. Represent all sensitive values using abstract keys or masked tokens. Render quoted labels exactly and do not add prose. Technical boundaries must be accurate.

Title: "REDUCE SECRETS, STRENGTHEN IDENTITY".
Main visual architecture on white: a workload identity badge feeds a supported provider, which renews a clock-marked short-lived credential. The credential passes a separate least-privilege authorization gate to the intended resource. Large labels: "WORKLOAD", "PROVIDER", "SHORT-LIVED", "LEAST PRIVILEGE", "REQUIRED RESOURCE".
A clearly separate necessary-secret branch shows the workload identity accessing a narrow secret-store compartment through a fixed accessor. Label "ONLY SECRETS STILL REQUIRED". The vault is not presented as eliminating the returned secret.
Below, a large credential-lifecycle loop uses five pictorial stages: "PROVISION", "DELIVER", "USE", "RENEW", "REVOKE", with an owner badge labeled "ASSIGN OWNERSHIP". All arrows run consistently around the lifecycle.
Four supporting icons with short labels: "PREVENT COPIES", "BOUND CACHES", "VERIFY PRINCIPAL", "TEST DENIALS".
Footer "THE STRONGEST SECRET IS OFTEN ONE YOU NO LONGER NEED".
Keep identity, credential, authorization, custody and delivery visually distinct. Show no global master key, no client-bundle credential, and no fallback to broader authority. Match the visual language of the earlier module infographics.

### Final refinement

Change only the arrows in the CREDENTIAL LIFECYCLE panel. Remove the long upper connector spanning PROVISION to REVOKE, including both of its arrowheads. Remove the curved self-loop to the right of REVOKE. Keep the straight one-way sequence ASSIGN OWNERSHIP → PROVISION → DELIVER → USE → RENEW → REVOKE. Revocation should be the end of this illustrated credential sequence. Do not change any labels, icons, panel sizes, colors, white background, main upper architecture, supporting controls, title or footer.

