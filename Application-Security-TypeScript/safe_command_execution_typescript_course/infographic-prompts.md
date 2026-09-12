# Module infographic prompts

Generated with the built-in ImageGen tool from the existing module narration. Final assets are opaque RGB PNGs, normalized to 1920 × 1080 on white. The final quiz has no illustration.

## m01 — course_assets/m01.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "OWN THE PROCESS EXECUTION BOUNDARY".
Main composition: a client request envelope labeled "REQUESTED OPERATION" enters a narrow guarded service gate labeled "VALIDATE + AUTHORIZE". The gate selects a fixed operation recipe, which launches a large child-process engine. Around that engine arrange six large illustrated controls, each connected to the engine: "EXECUTABLE" with a locked program icon; "ARGUMENTS" with separate labeled blocks; "ENVIRONMENT" with a filtered variable container; "WORKING DIRECTORY" with a locked folder; "PRIVILEGE" with a small scoped key; "RESOURCE LIMITS" with a timer and gauge.
A separate red generic command box from the client is blocked before the service gate, labeled "ARBITRARY COMMAND".
Beneath the main diagram, show two distinct interpretation hazards side by side: a shell terminal parsing a command string, labeled "SHELL GRAMMAR"; and a program parsing options/configuration, labeled "TARGET GRAMMAR". Do not imply removing the shell removes target argument interpretation.
Footer: "APPLICATION CODE OWNS PROCESS STRUCTURE".
Keep the process engine and six controls dominant. Show external input limited to a narrow operation rather than controlling the launch recipe.

### Final refinement

Change only the three blue argument blocks in the top ARGUMENTS card. Replace '--input', '--mode', '--safe' with 'OPTION', 'VALUE', 'OPERAND', respectively. There is no universal --safe flag; these are conceptual argument-structure labels. Keep every other object, text, layout, white background, color, and large typography exactly unchanged.

## m02 — course_assets/m02.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "PREFER DIRECT PROCESS EXECUTION".
Create two clear horizontal paths.
Upper amber/red path labeled "exec": a command string enters a terminal labeled "SHELL PARSER" then reaches a target program. Around the shell show three large recognizable symbols with labels "PIPES", "REDIRECTION", "SUBSTITUTION". A red external-input fragment attempts to become command structure here.
Lower blue/green path labeled "execFile / spawn": a locked fixed executable icon and separate argument blocks enter a direct launch gate labeled "shell: false", then reach a target program. The lower path has no shell parser; a crossed-out shell icon sits off the route. Keep each argument visibly separate.
After the target program in the lower path show a second checkpoint labeled "TARGET ARGUMENT RULES", emphasizing that direct execution still requires approved options and operands.
Along the bottom, two large tool cards: "execFile" with a bounded output buffer icon and caption "BUFFERED OUTPUT"; "spawn" with a controlled stream icon and caption "STREAMS + BACKPRESSURE". A third platform/script icon labeled "VERIFY PLATFORM BEHAVIOR".
Footer: "REMOVE SHELL PARSING • CONTROL THE TARGET".
Do not claim execFile/spawn can never invoke a shell or scripts. The illustrated direct path explicitly uses shell:false and an approved executable. Do not imply a trusted fixed shell command is inherently injection; the risk is request-controlled command text.

### Final refinement

Refine this instructional infographic while preserving its overall layout, title, colors, white background, bottom API cards, and platform panel. Replace the destructive shell payload text in EXTERNAL INPUT with the large neutral label 'REQUEST TEXT'. Replace '/usr/bin/convert' with 'FIXED TOOL PATH'. Replace the three example argument strings with 'OPTION', 'VALUE', 'OPERAND'. In the lower direct-execution lane, reorder the stages to be APPROVED EXECUTABLE → SEPARATE ARGUMENTS → TARGET ARGUMENT RULES → shell:false DIRECT LAUNCH → TARGET PROGRAM → EXPECTED BEHAVIOR. Keep the target argument rules checklist but place it BEFORE process launch because validation and approval must precede execution. Adjust the width of those middle stages to fit while maintaining large readable labels. Do not add actual runnable command examples. Everything else remains unchanged.

## m03 — course_assets/m03.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "CONTROL WHICH CODE CAN RUN".
Show three client logical-operation tokens "CONVERT", "INSPECT", "COMPILE" entering a locked server mapping cabinet. Inside the cabinet they map to three approved executable icons. Label the cabinet "CLOSED TOOL MAP" and the outputs "TRUSTED EXECUTABLE PATHS". An unknown token follows a short red branch to "REJECT".
The approved program then passes a deployment check gate with a file-ownership shield and a verified installation folder. Label "VERIFY OWNERSHIP + LOCATION". A missing-program icon follows a red branch to "FAIL CLOSED".
Show an untrusted PATH search as a row of same-name program icons with a red question mark; label "NO SILENT PATH FALLBACK".
Along the bottom show a trusted interpreter icon surrounded by three powerful code-selection inputs: "SCRIPT", "PLUGIN", "CONFIGURATION". Each input must pass an approval lock before reaching the interpreter; no bypass arrows. Label the group "CODE SELECTION EXTENDS BEYOND THE EXECUTABLE".
Footer: "OPERATION KEY → APPROVED PROGRAM".
Keep labels large and illustrate that syntactically valid executable names are not permission. Do not portray arbitrary configuration as always executable, but show it as potentially selecting code.

## m04 — course_assets/m04.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "FIX THE ARGUMENT GRAMMAR".
Main flow: an unknown request object enters a schema-and-policy gate labeled "VALIDATE + AUTHORIZE", becomes a narrow operation card, then enters an application-owned argument assembler. Label "APPLICATION BUILDS argv".
Show the resulting argv as discrete large blocks: locked "FIXED OPTION", mapped "APPROVED MODE", bounded numeric "LIMIT", and a file "OPERAND". The sequence and option names come from the application. Green variable values fit only designated slots.
A separate client-supplied bag labeled "PASS-THROUGH FLAGS" ends at a red stop before the assembler.
Below, show a hyphen-prefixed file token "-name" reaching a target option parser and triggering an amber warning labeled "MAY BE AN OPTION". Beside it show a gate token "--" before a file operand, with the large label "ONLY IF THE TOOL SUPPORTS IT".
Three large validation icons at the bottom: "RANGE CHECK", "MODE ALLOWLIST", "SERVER PATH MAP".
Footer: "SEPARATE ARGUMENTS STILL NEED POLICY".
Technical invariants: a direct API removes shell parsing but the target still parses flags; '--' is not universally supported. Do not show a shell parser in the main flow or a client constructing arbitrary argv.

### Final refinement

Change only two text labels. In the FIXED OPTION block replace '--safe' with '--quiet'; this is an illustrative fixed flag, not a universal security switch. In the bottom SERVER PATH MAP strip replace '/data/ → /srv/data/' with 'FILE ID → CONTROLLED PATH', using large bold type, to show identifier mapping rather than raw path-prefix replacement. Keep all other objects, labels, layout, white background, typography, and colors unchanged.

## m05 — course_assets/m05.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "CONTROL THE PROCESS CONTEXT".
Three balanced illustrated zones on white.
"PATHS": a storage ID token maps on the server to a file inside an approved directory enclosure. A private temporary folder has an ownership lock. A link/junction icon and a swapping-file race icon face inspection shields, labeled "LINKS + RACES". A path escaping the enclosure ends at a red stop. Show controlled resolution, not a string-substring check.
"WORKING DIRECTORY": the child runs inside one locked application folder labeled "TRUSTED cwd". Automatic configuration/plugin search rays into nearby folders are examined by a magnifying glass, labeled "REVIEW AUTO-DISCOVERY". A client-chosen folder ends at a red stop.
"ENVIRONMENT": a large parent-variable container passes through a selective filter, producing a small child-variable container labeled "REQUIRED VARIABLES". Secret-key icons are removed into a blocked branch before the child. A command-line argument strip with a secret key is crossed out, labeled "KEEP SECRETS OUT OF argv".
Connect all three controlled inputs to one child-process icon along the bottom.
Footer: "PATHS • DIRECTORY • ENVIRONMENT".
Do not imply an absolute input path removes risks from a hostile working directory. Preserve necessary platform environment variables through deliberate trusted selection.

## m06 — course_assets/m06.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "BOUND THE WORK AND ITS LIFETIME".
Show a guarded processing station surrounded by five large controls.
Before launch: an input-size/cost gauge labeled "INPUT LIMITS" and a shared queue admitting only a few children labeled "CONCURRENCY CAP". A small scoped OS key opens only limited filesystem/network compartments, labeled "LEAST PRIVILEGE".
During work: a child-process icon runs beside a responsive circular event-loop icon labeled "ASYNC EXECUTION". A timer labeled "DEADLINE" and an output pipe with a byte-cap valve labeled "OUTPUT CAPS" govern the child. Show two output choices: a bounded buffer and a stream with backpressure, using labels "BUFFER" and "STREAM".
At exit: a process tree containing parent and descendant nodes is surrounded by a cancellation bracket labeled "TEST DESCENDANT CLEANUP". A cleanup broom clears private temporary files on three clearly marked outcomes "SUCCESS", "FAILURE", "CANCEL".
Use a small container/isolation outline with a policy lock, labeled "EXPLICIT ISOLATION POLICY"; do not imply any container automatically guarantees security.
Footer: "LIMIT TIME • OUTPUT • CONCURRENCY".
Technical constraints: killing one direct child may not stop descendants; depict this as a tested requirement, not automatic. Resource caps contain operational risk and do not prevent command injection.

### Final refinement

Change only two labels in this infographic. In the right process-tree panel, replace 'DOES NOT STOP DESCENDANTS' with 'MAY NOT STOP DESCENDANTS', maintaining large bold red text. The behavior depends on platform and process setup. In the left concurrency queue, replace the tiny counter 'MAX 3 / 3' with the single large word 'LIMIT', to illustrate a configured cap without an inconsistent count. Keep every other illustration, label, arrow, layout, color and white background exactly unchanged.

## m07 — course_assets/m07.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "REVIEW AND TEST THE ACTUAL LAUNCH".
Three spacious zones.
"TRACE": process API tiles "exec", "execFile", "spawn", "fork" and a wrapper box converge under a magnifying glass on the final launch. Four large inspected fields are "EXECUTABLE", "argv", "cwd", "ENVIRONMENT". The wrapper is open so its internal forwarding can be seen.
"TEST": a fake/instrumented launcher receives a narrow operation and captures exact process structure for assertions. Test cards include "UNKNOWN TOOL", "OPTION-LIKE NAME", "OVERSIZED INPUT", "EXTRA FLAGS". Two larger integration icons show "TIMEOUT + CANCEL" and "OUTPUT + CLEANUP". Use a platform pair labeled "SUPPORTED PLATFORMS".
"OBSERVE": a child-process result passes a sanitizing filter into a protected operations log. Only three large event tags survive: "OPERATION", "DURATION", "EXIT CATEGORY". Red blocked secret-key and raw-output icons are labeled "SECRETS" and "RAW CHILD OUTPUT". A separate stable client error card branches from the result before the logging route; the client response must not feed the diagnostics.
Footer: "ASSERT PROCESS STRUCTURE AND FAILURE BEHAVIOR".
Use imagery rather than lists of attack strings. Ensure fake/instrumented tests do not appear to run arbitrary client-selected programs.

### Final refinement

Edit only the OBSERVE panel. Keep CHILD PROCESS RESULT → SANITIZING FILTER → PROTECTED OPERATIONS LOG, and keep the separate downward branch from CHILD PROCESS RESULT → STABLE CLIENT ERROR → client icon. Remove the dashed red arrow from the client icon and the text 'DOES NOT FEED DIAGNOSTICS'. Remove the dashed red branch from the OPERATION/DURATION/EXIT CATEGORY tags to the SECRETS and RAW CHILD OUTPUT boxes. Instead, route one red rejection branch directly from SANITIZING FILTER down to those two excluded boxes, ending at red X/stop marks BEFORE storage, with one large label 'EXCLUDED'. This must show secrets and raw output being excluded at the filter, never extracted from or stored in the log. Preserve TRACE and TEST panels, title, footer, all other text and objects, large typography, colors and white background.

## m08 — course_assets/m08.png

Use case: infographic-diagram.
Asset type: narrated TypeScript security course module illustration.
Create a professional, highly visual 16:9 widescreen infographic for 1920x1080 delivery, on an opaque pure WHITE background. Match the recent course series: large crisp illustrated objects, navy headings, blue/teal control paths, green permitted behavior and red blocked hazards. Favor pictures, diagrams, and clear arrows over text. Use only LARGE bold sans-serif typography: title about 64px and labels at least 32px at 1920px width. Keep generous whitespace and safe margins. Do not add paragraphs, fine print, tiny command/code listings, decorative filler, or watermarks. Render quoted text exactly. Technical boundaries and arrow directions must be correct.
Title: "MAKE PROCESS EXECUTION NARROW AND EXPLICIT".
A clear summary architecture. At the left a requested capability reaches a two-choice design decision: a green in-process library puzzle piece labeled "LIBRARY WHEN SUITABLE", or an external-process route labeled "WHEN NEEDED". The external route enters a narrow service gate.
Inside the service, show four large stages: "APPROVED TOOL", "FIXED argv", "CONTROLLED CONTEXT", "BOUNDED RUN". Represent them with a locked executable, discrete argument blocks, grouped directory/environment/privilege icons, and a timer plus output gauge. All client-variable data passes validation and authorization before filling designated operand slots.
A red generic command terminal labeled "ARBITRARY COMMAND" stops outside the service.
Below, three supporting visual pillars: "DIRECT EXECUTION", "TARGET RULES", "TEST + CLEANUP". Show a process-tree cleanup icon in the final pillar.
Footer: "EXPOSE AN OPERATION, NOT A COMMAND INTERFACE".
Keep text sparse, objects large, background pure white. Do not equate no shell with fully trusted arguments; fixed program, target grammar, context, privilege, resources and cleanup remain visible.

### Final refinement

Make two small corrections. Remove the solid red arrow that runs from ARBITRARY COMMAND upward into the design-decision diamond. Keep only the dashed horizontal red arrow from ARBITRARY COMMAND ending at the red X outside the service. No arbitrary-command arrow may enter the permitted capability flow. In the BOUNDED RUN column replace 'CAPTURE OUTPUT' with 'OUTPUT CAP'. Preserve every other label, diagram, layout, color, white background, and large typography exactly.

