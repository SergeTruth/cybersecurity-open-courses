# Module infographic prompts

Generated with built-in ImageGen for Context-Aware XSS Prevention in TypeScript. Each image illustrates its module narration, uses a white background and large typography, and is delivered as an opaque RGB 1920 × 1080 PNG. Generated source images remain in the ImageGen output directory. Only instructional modules receive images; the final quiz remains media-free. Narration, MP3s, and VTTs were not regenerated.

The ImageGen skill guided module-specific generation, visual inspection, and targeted technical refinements. Final selected images were resized and flattened onto white for course delivery.

## m01 — XSS Is a Context and Interpretation Problem

Output: course_assets/m01.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "XSS IS AN INTERPRETATION BOUNDARY".
Main visual: several small source icons "REQUEST", "DATABASE", "BROWSER STATE" converge into one untrusted data token. It splits into two contrasting browser operations.
Green path: "textContent" gate leads to a browser text node displaying the literal characters "<b>Hello</b>" as plain, uniformly weighted visible text. Label "DATA STAYS TEXT".
Amber/red path: "innerHTML" parsing gear leads to a browser showing bold Hello, without angle brackets. Label "DATA BECOMES MARKUP" and a red warning "UNTRUSTED HTML IS RISKY". The harmless b example illustrates parser behavior, NOT script execution; do not show it executing code.
Below, three compact icons labeled "REFLECTED", "STORED", "DOM-BASED" lead conceptually to the same magnifying-glass model "SOURCE → TRANSFORM → SINK".
Footer: "ASK WHAT INTERPRETS THE VALUE NEXT".
A small TypeScript type tag beside a shield has "TYPE ≠ RUNTIME SAFETY".
Keep the contrast between inert text and HTML interpretation immediately visible.

## m02 — Prefer Safe Rendering APIs Before Reaching for Encoding

Output: course_assets/m02.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "USE APIs THAT KEEP DATA AS DATA".
Four large illustrated panels with limited labels.
"TEXT": an external message card passes through "textContent" or "createTextNode" into an ordinary element showing plain text. Caption "TEXT NODES".
"STRUCTURE": developer-controlled element blocks assemble with "createElement" into a DOM tree; external text enters only a text node. Caption "KNOWN STRUCTURE".
"EVENTS": a click icon connects through "addEventListener" to a developer-authored function block. Caption "FIXED HANDLERS".
"URLs": a destination token must pass a shield "URL POLICY" before a link property labeled "href". Caption "VALIDATE DESTINATIONS".
Along the bottom, an amber strip with an HTML parser icon: "RAW HTML NEEDS A REVIEWED SANITIZER".
A red tangled HTML-string construction icon is crossed out. Footer "A DOM SETTER IS NOT UNIVERSALLY SAFE".
Do not portray all properties or setAttribute as safe; URL and other active properties have their own behavior. No long code snippets.

## m03 — Encode for the Exact Output Context

Output: course_assets/m03.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "MATCH ENCODING TO THE OUTPUT CONTEXT".
Five large, spacious context cards around one central browser parser selector. This is a mapping, not a sequence that encodes the same value five times.
"HTML TEXT" → a template shield labeled "AUTOESCAPE".
"QUOTED ATTRIBUTE" → a quoted field labeled "SAFE SERIALIZATION"; small fixed-name padlock labeled "FIXED NAME".
"URL COMPONENT" → a URL builder labeled "URLSearchParams"; attach a separate destination-policy shield labeled "URL POLICY".
"JAVASCRIPT" → a data packet bypassing a crossed-out script-string factory, labeled "STRUCTURED DATA".
"CSS" → controlled style swatches labeled "KNOWN PROPERTY + ALLOWED VALUE".
Make the different grammars visually distinct with a text node, quoted tag slot, link, script page, and style palette.
Across the bottom a large generic "escape()" stamp is crossed out beside "NO UNIVERSAL ESCAPE".
Technical qualifications: HTML encoding is for defined HTML data positions, not every grammar. URL percent encoding does not authorize the destination. Untrusted JavaScript/CSS source generation should be avoided in favor of structured alternatives. Keep labels large and avoid literal executable examples.

## m04 — Treat URLs and Attributes as Their Own Security Contexts

Output: course_assets/m04.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "SYNTAX SAFETY IS NOT BEHAVIOR POLICY".
Upper half is a large URL flow: candidate destination token → "PARSE URL" gear (with a trusted base anchor labeled "TRUSTED BASE IF NEEDED") → "ALLOW PROTOCOL" gate → "ALLOW DESTINATION" gate → "ASSIGN URL PROPERTY" link icon. Rejected protocol and rejected destination arrows must end at red stops; no route bypasses the two policy gates.
Lower half contains three illustrated compact cards.
"ATTRIBUTES": a developer-held fixed-name key opens a quoted value field. Label "FIXED SAFE NAMES".
"EVENTS": a crossed-out inline handler-string card contrasts with a click-to-function link labeled "addEventListener".
"STYLES": a palette of known theme tokens is accepted by one known style property. Label "ALLOWLIST PROPERTY + VALUE".
Footer "ENCODING PROTECTS SYNTAX • POLICY CONTROLS BEHAVIOR".
Do not imply that any parsed URL is allowed, that percent encoding authorizes a scheme, or that arbitrary DOM attributes are safe.

### Final refinement

Change only the small example in the lower-left ATTRIBUTES panel. Replace the tag "<a" with "<div" and the attribute name "href" with "title", producing a simple quoted text attribute example. Preserve the key labeled FIXED SAFE NAMES, panel layout, colors, typography, every upper URL gate and arrow, the events and styles panels, and the footer exactly. Do not alter any other text or add content. This distinguishes innocuous text attributes from URL-bearing properties.

## m05 — Sanitize Rich HTML Only When HTML Is Actually Required

Output: course_assets/m05.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "SANITIZE ONLY WHEN HTML IS REQUIRED".
Main flow left-to-right: an intentional rich-text document with bold/list/link formatting → a parser-based cleaning machine labeled "MAINTAINED HTML SANITIZER" → a policy checklist gate labeled "ALLOWED ELEMENTS + ATTRIBUTES + URLs" → a sealed rich-content document → a browser rich-content panel labeled "REVIEWED HTML SINK". Visually reject script-like active constructs into a red waste tray without any exploit code. Preserve benign formatting in the final panel.
A red side input attempts to append or decode untrusted content AFTER the sealed result; terminate it at a stop labeled "NO UNSAFE POST-PROCESSING".
A separate lower green lane shows "ORDINARY TEXT" → "textContent"; it bypasses HTML interpretation entirely, not the sanitizer into an HTML sink.
Two small crossed-out tools: "REGEX TAG STRIPPING" and "TYPE ASSERTION".
Footer "ENCODING ≠ SANITIZATION".
Technical constraints: the policy is configured in the sanitizer, not an independent magical safety machine. A TypeScript brand does no runtime sanitization. Do not suggest arbitrary markup is inherently safe after one generic cleaning step.

## m06 — Frameworks Help, but Escape Hatches Restore the Risk

Output: course_assets/m06.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "KEEP FRAMEWORK ESCAPE HATCHES EXCEPTIONAL".
Main illustration: a framework-shaped protective enclosure has a broad green default route labeled "NORMAL INTERPOLATION" → "AUTOESCAPING ON" → a browser text node. This route uses ordinary text.
A separate narrow amber door labeled "RAW HTML" leads through "REVIEWED SANITIZER" before a browser markup panel. A bypass around the sanitizer ends at a red stop. Other amber warning icons near the exception door read "TRUST BYPASS", "DISABLED ESCAPING", and "DIRECT DOM".
Lower left, a data-transfer panel shows a server state packet with two safe architecture alternatives labeled "SUPPORTED STATE TRANSFER" and "SEPARATE JSON RESPONSE". A crossed-out script-source concatenation icon reads "NO AD HOC SCRIPT STRINGS".
Lower right, a TypeScript type label "as SafeHtml" beside a crossed-out magic wand and shield reads "CAST ≠ SANITIZER".
Footer "DEFAULT PROTECTION ENDS AT THE ESCAPE HATCH".
Do not claim framework property binding validates every URL, and do not imply JSON.stringify alone is safe for every HTML script embedding context.

### Final refinement

Change only the content inside the upper-right second browser panel labeled BROWSER MARKUP. Remove the visible <h1> and </h1> tags and display only "Welcome" as a large, bold rendered heading. This panel represents the rendered output of reviewed rich HTML, not a code viewer. Preserve its label, all other text, all arrows, colors, white background, framework illustration, and every lower panel exactly.

## m07 — Review, Test, and Add Browser-Side Defense-in-Depth

Output: course_assets/m07.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "TRACE THE FLOW, TEST THE BOUNDARY".
Upper half: source icons "REQUEST", "API", "DATABASE", "BROWSER STATE" → transformation gears → browser sink selector. A magnifying glass spans all three stages labeled "SOURCE → TRANSFORM → SINK".
Middle shows a prominent test bench with four large cards: "TEXT STAYS TEXT", "URL POLICY", "RICH HTML POLICY", "POST-PROCESSING". Paired server/browser icons caption "TEST BOTH RENDERERS".
Bottom has three separate defense-in-depth shield cards, not replacements for the primary controls:
"CSP" with a constrained script/resource icon and label "CONSTRAIN ACTIVE CONTENT".
"TRUSTED TYPES" with a gate at a covered DOM sink and label "REVIEWED POLICIES".
"HttpOnly" with a cookie shield and label "LIMIT COOKIE READS".
Footer in large type: "EXTRA LAYERS DO NOT FIX UNSAFE SINKS".
Keep the following semantic constraints in the imagery: a stored database value is still potentially untrusted; Trusted Types does not sanitize automatically; HttpOnly does not prevent XSS or all session actions. Show no universal-protection halo around any shield. No exploit strings.

### Final refinement

Preserve the white background, title, middle TEST BOTH RENDERERS section, and three DEFENSE IN DEPTH cards. Correct only the upper-right sink area and bottom banner. Rename the browser icon label BROWSER STATE to BROWSER SINKS. In its four branch boxes use these exact labels and colors: green "TEXT APIs"; amber "URL PROPERTIES"; amber "ATTRIBUTES"; amber "HTML PARSING". Remove innerText, textContent, setAttribute, and innerHTML labels from these four boxes. Do not use green for arbitrary attributes or URL properties; they require context-specific policy. Keep branch connectors. Simplify the bottom banner to the large warning icon and the single large text "EXTRA LAYERS DO NOT FIX UNSAFE SINKS"; remove the three additional small icons and their small explanatory text so the banner is spacious. Do not change anything else.

## m08 — Course Summary: Match the Defense to the Browser Context

Output: course_assets/m08.png

Use case: infographic-diagram.
Asset type: narration-specific illustration for a TypeScript security course.
Create a polished, highly visual 16:9 widescreen infographic for 1920x1080 delivery on an opaque pure WHITE background. Match a cohesive course series: crisp illustrated objects with subtle depth, navy headings, blue and teal data flows, green permitted operations, amber review points, red blocked hazards. Pictures and diagrams should dominate; use only LARGE bold sans-serif typography (title around 64px, all labels at least 32px at 1920px width). Generous whitespace and safe margins. No paragraphs, fine print, tiny code, watermark, or decorative filler. Render quoted labels exactly, with no extra prose. Technically faithful browser interpretation and unambiguous arrows matter more than decoration.

Title: "MATCH THE DEFENSE TO THE BROWSER CONTEXT".
Central browser-shaped decision hub labeled "WHAT INTERPRETS THIS NEXT?" receives untrusted data and routes to five large illustrated branches. Each branch is independent, not a sequence of all defenses.
"TEXT" → "TEXT API" → an inert text node.
"STRUCTURE" → "ELEMENTS / COMPONENTS" → a DOM tree.
"URL" → "CONSTRUCT + APPLY POLICY" → an allowed destination link.
"RICH HTML" → "MAINTAINED SANITIZER" → a bounded markup panel.
"JS / CSS" → "STRUCTURED ALTERNATIVES" → data packet, fixed handler, and allowlisted style icons; a source-string factory is crossed out.
A small context-encoding bridge labeled "GENERATING SOURCE? USE EXACT-CONTEXT ENCODING" connects conceptually to the interpretation boundary, not as an instruction to generate arbitrary JS/CSS.
Bottom supporting strip uses three large icons: "REVIEW ESCAPE HATCHES", "TEST EVERY PATH", "ADD BROWSER LAYERS".
Footer "TYPES AND GENERIC ESCAPING ARE NOT A SECURITY BOUNDARY".
Keep ordinary text separate from rich HTML, URL syntax separate from URL permission, and browser defense-in-depth separate from primary source-to-sink controls. Make this a sparse, visual course-summary architecture.

### Final refinement

Preserve this white-background infographic, its title, five-column layout, large typography, colors, other columns, and bottom review strip. Correct the URL column: replace the input string "javascript:alert(1)" with the neutral label "CANDIDATE URL". Keep the CONSTRUCT + APPLY POLICY gate and green allowed destination output. Add a short red side branch from that policy gate to a red X labeled "REJECT", making clear disallowed candidates stop and are not magically rewritten to https. Do not show any arrow from the rejected branch to the allowed destination. Also rename the central browser panel from WHAT INTERPRETS THIS NEXT? to "CONTEXT-AWARE RENDERING" because it receives the five correctly handled outputs. Keep the separate exact-context encoding reminder and its dashed conceptual connector. Change no other text or diagrams.

