# Narration infographics

Created on 11 September 2026 with the built-in ImageGen tool using the imagegen skill. One narration-specific illustration was generated for each of the eight instructional modules. Final assets are opaque RGB PNGs at 1920 x 1080, with white backgrounds, large labels, and predominantly illustrated content.

Generated images were resized and flattened over white for final course delivery. Generated originals remain in the tool output directory. The module pages use the existing template image-expansion behavior and graphicAlt metadata. The nine-SCO manifest retains its original identifiers and quiz mastery score, with each image listed in its own module resource.

Narration, MP3s, VTTs, code examples, and the final quiz were left unchanged. No quiz image, audio, or captions were created. No browser or Whisper checks were performed, and no ZIP or backup files were made.

The actual generation prompts and targeted refinements follow.

## m01 - Start with the Security Property, Not the Algorithm

Final asset: course_assets/m01.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "START WITH THE SECURITY PROPERTY".
Across the upper two thirds, show four large illustrated purpose cards:
"CONFIDENTIALITY" with a document inside a lockbox, labeled "ENCRYPTION".
"INTEGRITY + AUTHENTICITY" with an unchanged message and shared-secret verification seal, labeled "MAC".
"PUBLIC VERIFICATION" with a private signing key applying a seal and a distinct public verification key checking it, labeled "DIGITAL SIGNATURE".
"PASSWORD VERIFICATION" with a password entering a costly hashing machine and a stored verifier, labeled "PASSWORD HASH".
The cards are different tools, not sequential stages. Do not show MAC or signature as encrypting the message, and do not show a password being recovered from its verifier.
Below, two compact visual contrasts: a reversible text/bytes conversion labeled "ENCODING ≠ ENCRYPTION"; a fingerprint digest labeled "HASHING ≠ ENCRYPTION".
A supporting shield pair reads "AUTHORIZATION + TLS". Footer: "CHOOSE THE GUARANTEE BEFORE THE ALGORITHM".
Use only these labels; no algorithm names or code. The narration emphasizes mature constructions, trust boundaries, and different security goals.
```

## m02 - Use Authenticated Encryption for Protected Application Data

Final asset: course_assets/m02.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "AUTHENTICATE BEFORE RELEASING PLAINTEXT".
A large sealed encrypted-record packet labeled "CIPHERTEXT + NONCE + TAG" has attached version tabs labeled "FORMAT + KEY VERSION".
It enters a gate labeled "AUTHENTICATED DECRYPTION". A key enters the gate from above. A separate trusted-record/tenant-context icon enters the gate labeled "EXPECTED CONTEXT". Beneath context, a visible tag icon reads "BOUND, NOT SECRET".
The gate has two separate outcomes: a green "VERIFIED" branch opens to a plaintext document labeled "RELEASE"; a red "FAILED" branch ends at a large stop labeled "NO PLAINTEXT". Absolutely no continuation from the failed branch.
Represent provisional bytes inside a closed holding area within the gate, not outside it.
Below are separate permission shield and replay-clock/state icons labeled "AUTHORIZE ACCESS" and "CHECK REPLAY RULES". Footer: "AUTHENTICATION IS NOT AUTHORIZATION".
The authenticated associated data must come from the expected authorized operation and stable encoding, not arbitrary attacker context. Do not draw metadata as permission to choose arbitrary algorithms or secrets. This visual shows cryptographic release; authorization remains a separate required application control.
```

## m03 - Generate Keys, Nonces, and Tokens with Cryptographic Randomness

Final asset: course_assets/m03.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "SECURE RANDOMNESS IS ONLY THE START".
Upper-left, a platform random generator icon labeled "CRYPTOGRAPHIC RANDOMNESS" creates three distinct large objects: "KEY", "TOKEN", and "NONCE". A weak dice icon labeled "Math.random()" ends at a red stop.
Upper-right, a large key marked "SAME KEY" governs three independent writer/server icons. Each writer issues a different nonce tile labeled "N1", "N2", "N3". A duplicated "N1" on a red tile is blocked. Group label: "NO NONCE REUSE".
Lower two large alternative-method panels, not sequential steps:
"RANDOM NONCES" shows a collision-warning icon and a bounded-volume gauge labeled "COLLISION + USAGE LIMITS".
"COUNTER NONCES" shows coordinated servers, a durable counter, and restart/restore icons labeled "DURABLE UNIQUENESS".
A visible nonce tile can travel beside ciphertext with label "NONCE ≠ SECRET KEY".
Footer: "UNIQUENESS FOLLOWS THE KEY MATERIAL".
This applies to constructions requiring key-scoped nonce uniqueness such as GCM. Random does not guarantee uniqueness. Do not show UUID as a universal key or nonce. No numeric sizes or invented usage ceilings.
```

## m04 - Treat Passwords and Derived Keys Differently from Random Keys

Final asset: course_assets/m04.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "PASSWORDS AND RANDOM KEYS ARE DIFFERENT INPUTS".
Three clearly separated horizontal illustrated lanes:
"PASSWORD STORAGE": a human password plus a salt icon enter an expensive hashing machine labeled "Argon2id / scrypt", yielding a verifier record labeled "HASH + SALT + PARAMETERS". One-way arrow only; no password recovery.
"PASSWORD-DERIVED KEY": password and salt enter a cost/work-factor machine labeled "PASSWORD KDF", yielding a key beside a recovery-plan icon labeled "PLAN PASSWORD CHANGES".
"STRONG SECRET SUBKEYS": a strong random master secret enters a branching machine labeled "HKDF + PURPOSE". Two distinct output keys labeled "ENCRYPTION" and "MAC" have distinct context tags; no password feeds this lane.
Below, a salt shaker/data-tag icon reads "SALT IS NOT A SECRET KEY" and a crossed-out shortcut reads "FAST HASH ≠ PASSWORD HASH".
Footer: "USE THE DERIVATION THAT MATCHES THE INPUT".
Do not imply HKDF is a slow password hasher or that a password KDF makes weak human input a high-entropy random secret. Do not display exact cost values, tiny code, or illustrative password strings.
```

## m05 - Separate Data Keys from Master Keys with Envelope Encryption

Final asset: course_assets/m05.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "THE DATA KEY PROTECTS DATA; THE MASTER KEY PROTECTS THE DATA KEY".
Create two visually distinct zones with ample white space:
A controlled vault zone labeled "MANAGED KEY SERVICE" contains a large gold key labeled "KEK". The KEK stays INSIDE the vault. A wrapping machine inside that zone uses the KEK to protect a smaller blue "DEK", producing a closed envelope labeled "WRAPPED DEK".
A separate application-memory zone labeled "APPLICATION MEMORY" contains a temporary plaintext blue "DEK". It feeds an "ENCRYPT DATA" gear together with a plaintext document; the gear yields "CIPHERTEXT". Plaintext DEK is visible here with an amber hourglass labeled "SHORT EXPOSURE".
The storage zone contains only "CIPHERTEXT", "WRAPPED DEK", and "METADATA". A raw plaintext key attempting to enter storage ends at a red stop labeled "NO PLAINTEXT KEYS".
Use a few clean connectors that distinguish data encryption from key wrapping. Do not draw KEK directly encrypting bulk data or leaving the vault.
Bottom visual shows the same blue data key in a new protective envelope near a KEK-change symbol labeled "REWRAP WHEN SUPPORTED".
Footer: "SEPARATE KEY ACCESS FROM DATA STORAGE".
The DEK and KEK roles are central; envelope encryption commonly exposes plaintext DEKs transiently in application memory. Do not claim automatic memory erasure or automatic support for rewrapping.
```

## m06 - Design Rotation, Versioning, Revocation, and Migration Up Front

Final asset: course_assets/m06.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "ROTATION IS NOT THE SAME AS MIGRATION".
Upper half: three independent large comparison illustrations.
"NEW-WRITE ROTATION": a new green key encrypts new records; older blue records retain an old blue key for authorized historical reads.
"RE-ENCRYPTION": an old encrypted record changes to a new encrypted record through a controlled migration gear, labeled "CHANGE DATA PROTECTION".
"REWRAPPING": the same small DEK remains unchanged while its protective envelope changes from old KEK to new KEK, labeled "CHANGE KEY PROTECTION".
Bottom half: three large policy cards, not a simplistic reversible lifecycle loop.
"ACTIVE": key with separate encryption and decryption arrows.
"RETIRED": new-encryption arrow blocked, historical-read arrow permitted, labeled "READ BY POLICY".
"DESTROY": key with warning and a backups/records recovery checklist, labeled "CHECK RECOVERY FIRST".
A controlled version-registry book links key-version tabs to approved keys, labeled "VERSIONED ROUTING".
Footer: "ROTATION DOES NOT UNDO PAST EXPOSURE".
Do not imply routine rotation rewrites old data; do not imply rewrapping changes plaintext DEK; do not imply key destruction is reversible or copied keys vanish. Revocation semantics depend on the service; do not invent one universal revocation state.
```

## m07 - Protect Keys at Runtime and Test Cryptographic Failure Paths

Final asset: course_assets/m07.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "PROTECT KEYS AND TEST THE FAILURE PATH".
Upper half: workload identity badge passes a narrowly scoped permission gate into a managed key-service vault, labeled "SCOPED KEY ACCESS". Three separate environment boxes read "DEV", "TEST", "PROD", each holding a different key.
Blocked red leak paths end at source repository, browser bundle, and log icons under label "NO KEY MATERIAL". Do not show a key successfully entering any of these destinations.
A safe operational event card shows only three large labels "KEY VERSION", "OUTCOME", "REQUEST ID", with label "SANITIZED METADATA".
Lower half: three test inputs, "TAMPERED DATA", "WRONG CONTEXT", and "KEY UNAVAILABLE", enter a failure-handling gate. Its single red output ends at a stop next to crossed-out plaintext document and write/send icons, labeled "NO PLAINTEXT. NO SIDE EFFECTS." No fallback path to a development key.
A separate historical-data test illustration shows an old encrypted record checked with an allowed old key and a controlled migration gear, label "TEST ROTATION + RECOVERY".
Footer: "A WORKING ENCRYPT CALL IS NOT ENOUGH".
No actual secret bytes, passwords, full encrypted records, stack traces, or cryptographic internals in logs. Keep labels large and output paths unambiguous.
```

### Targeted refinement

```text
Use case: precise-object-edit. Input image is the edit target. Change only the three red leak routes in the upper-right quadrant: DELETE each short red arrow segment AFTER its large red X, leaving clear white space between each X and the destination card (SOURCE REPOSITORY, BROWSER BUNDLE, LOGS). The red dashed paths must terminate at their X marks; absolutely no arrowhead or line may continue into the three NO KEY MATERIAL cards. Preserve all other content, labels, illustration styles, positions, white background, and 16:9 dimensions exactly.
```

## m08 - Course Summary: Design for Cryptography and Key Change Together

Final asset: course_assets/m08.png

### Generation prompt

```text
Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript cryptographic design and key lifecycle course.
Create a highly visual polished 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match this course series: large crisp illustrated objects with subtle depth, navy headings, blue/teal flows, green accepted actions, amber cautions, red rejected actions. Use pictures more than text and ONLY LARGE bold sans-serif typography (title about 64px, labels at least 32px at 1920px width). Generous whitespace and safe margins. Use simple clear arrows; no arrows continuing beyond rejection. No paragraphs, fine print, tiny code listings, decorative filler, hackers, watermark, logos, or invented API behavior. Render only the requested short labels; do not add explanatory text.

Title: "DESIGN CRYPTOGRAPHY AND KEY CHANGE TOGETHER".
A coherent summary architecture with four large stations along one clear left-to-right path:
"CHOOSE THE PROPERTY": a document with confidentiality lock, integrity seal, and identity shield;
"PROTECT THE DATA": secure-randomness generator and authenticated-encryption gear with a distinct nonce tag;
"CONTROL THE KEYS": a managed KEK vault protecting a wrapped DEK, plus small bounded application-memory area for the temporary DEK;
"PLAN KEY CHANGE": current and historical encrypted records with version tabs, rotation arrows, and a recovery checklist.
A separate lower support band has three large illustrated checkpoints: "AUTHORIZE ACCESS", "VERIFY BEFORE RELEASE", "TEST FAILURES + RECOVERY".
A red tampered document reaches a stop, ending before any released plaintext or protected effect.
Include one compact password-verifier machine icon labeled "PASSWORDS NEED PASSWORD HASHING" outside the data-encryption flow.
Footer: "SAFE TODAY. READABLE WHEN AUTHORIZED TOMORROW".
Do not show encryption alone as authorization, rotation as undoing compromise, or keys stored unwrapped alongside ciphertext. Avoid crowding and all tiny code; the message is coordinated cryptographic and lifecycle responsibility.
```

