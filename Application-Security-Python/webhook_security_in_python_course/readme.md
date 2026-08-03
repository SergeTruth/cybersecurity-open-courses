# SCORM Course Template v8

This template is designed for modular SCORM-style courses where course content is dropped into `course_assets` instead of being embedded directly in each module HTML file.

## Course Asset Pattern

Each course should copy `C:\bot\template_v8` into a new course directory and work directly in that course directory.

Use this asset layout:

```text
index.html
course_assets/
  course.js
  modules.js
  m01.js
  m01.mp3
  m01.vtt
```

For additional modules, continue the same numbering pattern:

```text
m02.js
m02.mp3
m02.vtt
```

The final quiz normally only needs a module data asset for its title, such as:

```text
m06.js
```

Do not create quiz audio, captions, narration text, or graphics unless the course specifically requires them.

`index.html` may be used as a helper redirect to `m01.html` for local preview or simple hosting. It is not the SCORM launch target. In `imsmanifest.xml`, every module must have its own organization item and its own launchable SCO resource pointing to that module's HTML file.

Do not bundle fonts with generated courses. The template uses system font stacks that are available on common modern operating systems, so there are no font file dependencies or font license files to package.

## Required Course Assets

`course.js` contains course-level metadata. It should define `window.COURSE`:

```javascript
window.COURSE = {
  "title": "Course Title"
};
```

`modules.js` contains the module list used for standalone preview. It is loaded with a normal `<script>` tag, so it works in direct `file://` preview. In an LMS-launched multi-SCO course, the runtime suppresses the sidebar and the LMS owns movement between SCOs. Example:

```javascript
window.COURSE_MODULES = [
  { label: "Module 1 Title", href: "m01.html" },
  { label: "Module 2 Title", href: "m02.html" },
  { label: "Final Quiz", href: "m06.html" }
];
```

## Multi-SCO Navigation And State

Every module is a separate SCO. The LMS must launch each SCO; one SCO must not navigate directly to another SCO's HTML file. Keep Previous, Next, and sidebar links preview-only:

- Generated Previous and Next anchors use `href="#"` plus `data-preview-href="m##.html"`.
- `navigation.js` activates those preview destinations only when no SCORM API is present.
- When an LMS API is present, `navigation.js` removes or disables cross-SCO controls and does not build the sidebar. Learners use the LMS navigation controls.
- Do not replace the guarded links with direct `href="m##.html"` links. A direct link bypasses the LMS launch and can report the next module's activity against the SCO that was originally launched.

SCORM 1.2 runtime data is also per SCO. Each SCO keeps its own `cmi.suspend_data`, lesson status, location, score, and interaction records. The local fallback key must include both the course identifier and current module identifier. Do not merge another SCO's suspend snapshot into the current SCO or maintain a course-wide completion array in one SCO's state.

`m01.js` contains the visible module title, optional graphic alternative text, narration text, and narration summary points used by the Key Points fallback card. The file should define `window.COURSE_MODULE` as a formatted object:

```javascript
window.COURSE_MODULE = {
  "title": "Module 1 Title",
  "graphicAlt": "Accessible description of the module illustration.",
  "narration": "Narration text goes here.",
  "narrationPoints": [
    "Concise summary point.",
    "Second summary point.",
    "Third summary point."
  ]
};
```

`narrationPoints` is rendered as a Key Points card when the matching module PNG is absent or fails to load. When the PNG loads successfully, the image card is shown and the Key Points card stays hidden. Keep the points concise, concrete, and faithful to the narration. They may also be used as source metadata for offline graphic generation, but they are not a replacement for `graphicAlt`; accessibility text should still live in `graphicAlt` when a module graphic exists.

`m01.png` is optional. When `course_assets/m01.png` exists and loads successfully, the module image card is displayed. When the PNG is absent or fails to load, the image card stays hidden and the Key Points card displays the module's `narrationPoints`.

`m01.mp3` contains narration audio.

`m01.vtt` contains closed captions for the narration audio.

## Optional Code Examples

Instructional modules can include a code example card by adding a matching code asset:

```text
course_assets/code_m01.js
```

The card stays hidden unless the matching `code_m##.js` file exists and defines usable examples. When visible, the code example card renders under the audio player card. The code asset should define `window.COURSE_CODE_MODULE`:

```javascript
window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Short setup text for the examples.",
  "codeExamples": [
    {
      "title": "Example title",
      "language": "python",
      "blurb": "Short explanation of what the learner should notice.",
      "code": `print("example")`
    }
  ]
};
```

Use `code_m01.js` for `m01.html`, `code_m02.js` for `m02.html`, and so on. Do not create code assets for modules that do not need examples.

The built-in syntax highlighter supports common course languages, including:

```text
python
java
javascript
c
cpp or c++
bash
go
```

It also includes basic support for TypeScript, PowerShell, C#, Rust, SQL, JSON, YAML, HTML/XML, CSS, Dockerfile, and assembly. The highlighter is intentionally lightweight and dependency-free; it is for readable instructional examples, not compiler-grade parsing.

## Pocket TTS Narration Settings

Use Pocket TTS from:

```text
C:\bot\aitts
```

Use the Python environment bundled with Pocket TTS when it is available:

```text
C:\bot\aitts\.venv\Scripts\python.exe
```

Generate narration from the final `COURSE_MODULE.narration` text. Write MP3 files directly into `course_assets` as `m01.mp3`, `m02.mp3`, and so on. Do not create or retain intermediate WAV files in the course folder or in temporary work folders.

Pocket TTS may produce audio tensors or WAV-format bytes internally. Pipe or convert that audio directly to MP3 with ffmpeg, then discard any in-memory or temporary WAV representation before delivery.

Example CLI discovery:

```powershell
C:\bot\aitts\.venv\Scripts\python.exe -m pocket_tts --help
```

## Captions

Each narrated module should have a matching `.vtt` file:

```text
m01.mp3
m01.vtt
```

The audio player loads `course_assets/m01.vtt` automatically when the module uses `data-audio="m01"`.

## Persistent Learner Display Controls

The audio player card includes persistent controls for captions, narration text, playback speed, header visibility, image visibility, and code example visibility. These preferences are stored per course.

The `Hide Header` button visually hides the `.title-card` on instructional modules and stores that preference for the course, similar to `CC Off` and `Hide Narration`. The title card remains available to assistive technology.

The `Hide Image` button is shown only when the current module has a successfully loaded `course_assets/m##.png`. It hides the main `.graphic-card` for the course. The `Hide Code Examples` button hides the `.code-example-card` for the course. Code example cards are still only available on modules that include a matching `course_assets/code_m##.js` file; the learner preference does not force an empty code card to appear.

Keep the header visible by default. A visible title/header is not a separate SCORM requirement, but it supports accessibility by giving each slide a clear page heading, course context, LMS status, and progress state. If a course is changed to hide headers by default, preserve equivalent orientation elsewhere, such as a visible current module label, and keep an accessible heading available to assistive technology.

Module graphics expand to a fixed full-screen viewport overlay when activated. Activating the image again collapses it, and Escape also closes the expanded image.

## SCORM Persistence And Error Reporting

Treat every LMS write as fallible. `LMSSetValue()` and `LMSCommit()` can return a failure result or throw through a nonconforming LMS adapter. The wrapper must contain those exceptions, call `LMSGetLastError()` when a SCORM operation reports failure, and expose only a sanitized failure result to the course runtime.

Progress and quiz code must check every write and commit result. Display `Progress: completed` or a saved quiz state only after the required SCO values and commit succeed. If persistence fails, retain the per-SCO local fallback when available and show a clear message such as `Progress could not be saved`; do not continue to claim that the LMS saved the result. A local fallback is recovery data, not proof of LMS persistence.

## imsmanifest.xml

Every generated course must use a multi-SCO manifest:

- Create one sibling `<item>` in the organization for every module, including the final quiz.
- Create one launchable `<resource>` for every module.
- Give every item and resource a unique identifier. Use the consistent mapping `ITEM-M01` to `RES-M01`, `ITEM-M02` to `RES-M02`, and so on.
- Set every resource to `type="webcontent"` and `adlcp:scormtype="sco"`.
- Point each resource directly to its matching module HTML file: `RES-M01` uses `href="m01.html"`, `RES-M02` uses `href="m02.html"`, and so on.
- Do not point multiple organization items at one course-wide resource.
- Do not use `index.html` as a SCO launch target. If the helper redirect is packaged, it may be listed once under `RES-M01`.
- Do not add direct links between SCO HTML files for LMS navigation. The organization hierarchy is the LMS navigation model; internal module links are preview-only.

The package root must include these SCORM 1.2 schemas copied from the v8 template:

```text
adlcp_rootv1p2.xsd
imscp_rootv1p1p2.xsd
imsmd_rootv1p2p1.xsd
ims_xml.xsd
```

Use all three manifest namespace mappings in `xsi:schemaLocation`:

```xml
<manifest
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_rootv1p2p1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  identifier="MANIFEST-COURSE"
  version="1.0"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
```

`ims_xml.xsd` is a local dependency imported by the other schemas. The four XSD files are package-root support files and do not need to be listed as runtime dependencies in every SCO resource.

Use this structure, extending the same pattern through the final module:

```xml
<organizations default="ORG-COURSE">
  <organization identifier="ORG-COURSE">
    <title>Course Title</title>
    <item identifier="ITEM-M01" identifierref="RES-M01">
      <title>Module 1 Title</title>
    </item>
    <item identifier="ITEM-M02" identifierref="RES-M02">
      <title>Module 2 Title</title>
    </item>
    <item identifier="ITEM-M06" identifierref="RES-M06">
      <title>Final Quiz</title>
    </item>
  </organization>
</organizations>

<resources>
  <resource identifier="RES-M01" type="webcontent" adlcp:scormtype="sco" href="m01.html">
    <file href="m01.html"/>
    <file href="base.css"/>
    <file href="base.js"/>
    <file href="navigation.js"/>
    <file href="audio-controls.js"/>
    <file href="syntax-highlighter.js"/>
    <file href="quiz-engine.js"/>
    <file href="scorm-wrapper.js"/>
    <file href="course_assets/course.js"/>
    <file href="course_assets/modules.js"/>
    <file href="course_assets/m01.js"/>
    <file href="course_assets/m01.mp3"/>
    <file href="course_assets/m01.vtt"/>
  </resource>

  <resource identifier="RES-M02" type="webcontent" adlcp:scormtype="sco" href="m02.html">
    <file href="m02.html"/>
    <file href="base.css"/>
    <file href="base.js"/>
    <file href="navigation.js"/>
    <file href="audio-controls.js"/>
    <file href="syntax-highlighter.js"/>
    <file href="quiz-engine.js"/>
    <file href="scorm-wrapper.js"/>
    <file href="course_assets/course.js"/>
    <file href="course_assets/modules.js"/>
    <file href="course_assets/m02.js"/>
    <file href="course_assets/m02.mp3"/>
    <file href="course_assets/m02.vtt"/>
  </resource>

  <resource identifier="RES-M06" type="webcontent" adlcp:scormtype="sco" href="m06.html">
    <file href="m06.html"/>
    <file href="base.css"/>
    <file href="base.js"/>
    <file href="navigation.js"/>
    <file href="quiz-engine.js"/>
    <file href="scorm-wrapper.js"/>
    <file href="course_assets/course.js"/>
    <file href="course_assets/modules.js"/>
    <file href="course_assets/m06.js"/>
  </resource>
</resources>
```

Each resource must list the files that its module page actually loads and that exist in the finished course folder. Instructional SCOs normally include the matching module HTML, shared CSS and runtime JavaScript, `course_assets/course.js`, `course_assets/modules.js`, `course_assets/m##.js`, MP3, and VTT. Include `course_assets/m##.png` when that PNG exists and the module HTML points at it. Include `course_assets/code_m##.js` only when that code asset exists. Do not list `base.html`, `quiz.html`, `placeholder.png`, or other template/source-only files unless the generated package intentionally ships and loads those exact files.

For a final quiz SCO, include the matching quiz HTML, shared files used by the quiz, `course_assets/course.js`, `course_assets/modules.js`, and `course_assets/m##.js`. Omit quiz PNG, MP3, and VTT assets unless they intentionally exist.

Before finishing a course, verify that every item has exactly one matching resource, every module has its own item and resource, every resource launches the corresponding HTML file, all identifiers are unique, every `<file href="...">` entry exists, all four XSD files exist at the package root, and the manifest validates against the local schemas. Also verify that LMS-hosted pages cannot navigate directly to another SCO and that a failed LMS write or commit displays a persistence warning instead of a saved/completed state.

## Updating Older Courses To v8

Older generated courses are usually close to v8 in content, but not in structure. They often already have module HTML files, images, MP3 narration, VTT captions, visible titles, narration text, and a final quiz. The problem is that earlier templates and AI drift may have placed those items under different element names, card layouts, inline scripts, data attributes, or helper JavaScript blocks.

Treat migration as extraction and rebuild, not as a markup patch. Copy `C:\bot\template_v8` into a new upgraded course folder, then move normalized course content into the v8 asset pattern. This is usually safer than editing the old module files in place because v8 expects a stable runtime, stable script order, stable asset names, LMS-owned multi-SCO navigation, and checked persistence results.

Recommended migration workflow:

```text
1. Inventory the old course.
2. Identify the course title, module order, module titles, narration text, image files, MP3 files, VTT files, optional code examples, and quiz questions.
3. Copy C:\bot\template_v8 into a new target directory.
4. Generate fresh m01.html, m02.html, etc. from v8 base.html and quiz.html.
5. Create course_assets/course.js for the course title.
6. Create course_assets/modules.js for the sidebar order.
7. Create one course_assets/m##.js file for each module.
8. Reuse existing m##.mp3 and m##.vtt assets when they already match the narration.
9. Reuse or rename existing graphics as m##.png only when a module should display an image.
10. Rebuild imsmanifest.xml as multi-SCO, with one organization item and one launchable resource per module, listing only files that actually exist, and retain all four SCORM 1.2 XSDs at the package root.
```

For each instructional module, normalize the content into this shape:

```javascript
window.COURSE_MODULE = {
  "title": "Module title",
  "graphicAlt": "Accessible description of the module illustration.",
  "narration": "Full narration text.",
  "narrationPoints": [
    "Short key point.",
    "Another short key point."
  ]
};
```

Final quiz modules should normally use only:

```javascript
window.COURSE_MODULE = {
  "title": "Final Quiz"
};
```

MP3 and VTT files can usually be reused. Keep the old `m##.mp3` and `m##.vtt` when the narration text has not meaningfully changed and the captions already match the audio. Regenerate audio and captions only when the narration text is rewritten, the old audio was generated with unwanted settings, the captions are missing, or the VTT timing is known to be wrong.

Optional code examples can be migrated into `course_assets/code_m##.js` when they are part of the instructional content. Preserve the example title, language, explanatory blurb, and code block. Include the code asset in `imsmanifest.xml` only when it exists.

When old courses have drifted markup, look for content by meaning rather than by exact selector. The course title may be in the title card, document title, manifest title, or an inline script. Module titles may be in `h1`, nav labels, manifest items, module metadata, or module-specific scripts. Narration may be in a narration card, an OST card, a hidden transcript block, an inline JavaScript string, or an older `course-data.js`. Graphics may be in an image card, infographic card, or `course_assets`. The migration goal is to preserve the instructional content, not the old DOM shape.

Remove obsolete files and references during migration:

```text
modules.json
title.txt
m01.title
m01.txt
m01_graphic_alt.txt
course-data.js
old builder scripts
unused generated specs
WAV files
quiz PNG, MP3, or VTT files unless the quiz intentionally uses media
```

Manifest cleanup is part of the migration. Rebuild `imsmanifest.xml` as multi-SCO, with one organization item and one uniquely identified launchable resource per module. Each item must reference its matching resource, and each resource must launch its matching `m##.html`. The LMS owns navigation between those SCOs; retain the v8 preview-only link guards and per-SCO state handling. Include `index.html` only as a real helper file if it exists; never use it as a SCO launch target. List the real runtime, CSS, and asset files used by each module. Do not list old files, missing files, source-only files, or nonexistent final quiz media. Copy the four v8 SCORM 1.2 XSDs to the package root and retain the full `xsi:schemaLocation` mapping.

Before calling the migration complete, check:

```text
- Every module HTML file loads course_assets/course.js.
- Every module HTML file loads course_assets/modules.js.
- Every instructional module loads its matching course_assets/m##.js.
- Every instructional module has matching m##.mp3 and m##.vtt files and usable narrationPoints in m##.js, and has m##.png only when an image should display.
- The final quiz has no narration card, image card, audio player, MP3, VTT, or PNG unless explicitly required.
- No obsolete transition assets remain.
- No bundled font files or font license files are included.
- Every module, including the final quiz, has its own organization item and SCO resource.
- Every item references the resource for the same module, and every resource launches its matching m##.html.
- Every file listed in imsmanifest.xml exists.
- The four SCORM 1.2 XSDs exist at the package root and imsmanifest.xml validates against them.
- LMS-hosted SCOs expose no direct cross-SCO links; standalone preview links still work.
- Suspend and local fallback state are per SCO, and LMS write or commit failures produce a visible not-saved warning.
```

## Sample Prompt For Batch Upgrading Courses To v8

Use this when a directory contains multiple older generated courses and you want Codex to upgrade all of them to the current v8 template without manually migrating each course:

```text
Upgrade all SCORM-style courses in [SOURCE_DIRECTORY] to the current v8 template.

Template:
C:\bot\template_v8

Output:
For each course found in [SOURCE_DIRECTORY], create an upgraded v8 course next to the original course using this naming pattern:
<original_course_folder_name>_v8

Do not modify the original course folders.
Do not create SCORM zip files.
Do not create course builders.
Do not create course spec JSON files.
Do not perform browser validation.
Do not perform Whisper checks.
Do not create or keep intermediate WAV files.

Upgrade strategy:
- Treat each course as an extraction-and-rebuild task.
- Copy C:\bot\template_v8 to the new upgraded course folder.
- Rebuild module HTML files from the v8 template files instead of patching old drifted HTML in place.
- Preserve the course content, module order, module titles, narration text, graphics, MP3 narration, VTT captions, and final quiz questions from the old course.
- Preserve optional code examples when they exist by converting them to course_assets/code_m##.js.
- Older courses may have different element names, card names, inline scripts, data attributes, or helper JavaScript files. Find content by meaning, not by exact selector.

For each course:
- Identify the course title from the manifest, title card, document title, navigation data, or other available source.
- Identify module order from imsmanifest.xml, navigation links, module filenames, or existing course data.
- Identify instructional modules and the final quiz.
- Extract each module title.
- Extract each module narration transcript.
- Extract or infer graphic alt text.
- Create concise narrationPoints for every instructional module so the Key Points fallback is available.
- Reuse existing MP3 and VTT assets when they match the narration and timing is not known to be wrong.
- Reuse existing PNG graphics when available, renaming or copying them to course_assets/m##.png.
- Convert any instructional code example cards or code blocks to course_assets/code_m##.js using window.COURSE_CODE_MODULE.
- If a module has no usable graphic, omit course_assets/m##.png so the Key Points card displays instead.
- Do not create quiz PNG, MP3, VTT, or narration assets unless the original quiz intentionally used media and the course requires it.

Use the v8 modular asset pattern:
- course_assets/course.js defines window.COURSE.
- course_assets/modules.js defines window.COURSE_MODULES.
- course_assets/m01.js, m02.js, etc. define window.COURSE_MODULE.
- Each instructional module JS includes title, narration, and narrationPoints. graphicAlt is optional when no module graphic exists.
- The final quiz module JS normally includes only title.
- course_assets/m01.png, m02.png, etc. contain optional module illustrations.
- course_assets/m01.mp3, m02.mp3, etc. contain narration audio.
- course_assets/m01.vtt, m02.vtt, etc. contain captions.
- Optional course_assets/code_m01.js, code_m02.js, etc. contain code examples.

Remove obsolete migrated artifacts from the upgraded course:
- modules.json
- title.txt
- m01.title
- m01.txt
- m01_graphic_alt.txt
- course-data.js
- old builder scripts
- unused generated specs
- WAV files
- nonexistent or unused quiz media assets

Manifest requirements:
- Build imsmanifest.xml as a multi-SCO manifest.
- Create one sibling organization item and one uniquely identified launchable SCO resource for every module, including the final quiz.
- Map ITEM-M## to RES-M## and set each RES-M## launch href to the matching m##.html file.
- Never reuse one course-wide resource for multiple module items.
- Let the LMS launch and navigate between SCOs. Keep module-to-module anchors inert in LMS mode and activate them only for standalone preview; do not introduce direct cross-SCO navigation.
- Keep `cmi.suspend_data` and local fallback data per SCO rather than restoring or merging a course-wide completion snapshot.
- Check every LMS write and commit result, consult the wrapper's sanitized last-error result after failure, and display a not-saved warning instead of completion when persistence fails.
- Include index.html only as a helper file if it exists; do not use it as a SCO launch target.
- In each resource, include every real runtime JS, CSS, existing image, MP3, VTT, and course_assets/*.js file used by that module.
- Include `course_assets/m##.png` when it exists; omit it when the module intentionally uses the Key Points fallback.
- Do not include missing files or obsolete source-only files such as `base.html`, `quiz.html`, or `placeholder.png` unless they are deliberately shipped and loaded.
- Do not include nonexistent quiz media assets.
- Copy `adlcp_rootv1p2.xsd`, `imscp_rootv1p1p2.xsd`, `imsmd_rootv1p2p1.xsd`, and `ims_xml.xsd` to the package root, retain the local three-namespace `xsi:schemaLocation`, and validate the manifest against those schemas.

Quality checks:
- Every upgraded course should have course_assets/course.js.
- Every upgraded course should have course_assets/modules.js.
- Every instructional module should have m##.html, m##.js, m##.mp3, and m##.vtt, with usable narrationPoints in m##.js. Include m##.png only when the module should display an image.
- Optional code example assets should use course_assets/code_m##.js and should be listed in imsmanifest.xml only when present.
- The final quiz should be SCORM quiz only unless the original course intentionally required media.
- No bundled font files or font license files should be present.
- Every module should have exactly one matching organization item and SCO resource.
- Every file listed in imsmanifest.xml must exist.
- LMS-hosted pages must not contain usable direct links to another SCO, while standalone preview navigation must remain usable.
- Forced LMSSetValue and LMSCommit failures must display a not-saved state and preserve the per-SCO local recovery copy when available.
- All four SCORM 1.2 schema files must exist and imsmanifest.xml must validate locally.
- Report a concise summary listing upgraded courses, reused media assets, regenerated or placeholder graphics, missing source content, and any courses that could not be upgraded cleanly.
```

## Sample Prompt For Creating A Course Prompt

Use this when you want Codex to produce a complete course-building prompt for a new topic without creating the course yet:

```text
Make an outline for a course about [topic].

Then make a complete prompt for Codex that builds the course using the v8 template.

The template lives in:
C:\bot\template_v8

The generated course should be created in:
C:\bot\<course_name>_course

Requirements for the generated course prompt:
- Copy C:\bot\template_v8 to the target course directory.
- Work directly in the target directory.
- Do not create a course builder.
- Do not create a course spec JSON.
- Do not build a SCORM zip.
- Do not perform browser validation.
- Do not perform Whisper checks.
- Do not create or keep intermediate WAV files.
- Use the v8 modular asset pattern:
  - course_assets/course.js defines window.COURSE.
  - course_assets/modules.js defines window.COURSE_MODULES.
  - course_assets/m01.js, m02.js, etc. define window.COURSE_MODULE.
  - Each instructional module JS includes title, narration, and narrationPoints. graphicAlt is optional when no module graphic exists.
  - course_assets/m01.png, m02.png, etc. contain optional module illustrations. When the matching PNG is absent, the image card is hidden and narrationPoints appear in the Key Points card.
  - course_assets/m01.mp3, m02.mp3, etc. contain narration audio. Use Pocket TTS in C:\bot\aitts to generate narration audio. Make the MP3 directly in the course_assets dir.
  - course_assets/m01.vtt, m02.vtt, etc. contain captions.
  - Optional course_assets/code_m01.js, code_m02.js, etc. contain code examples when the course calls for them.
- If no custom graphics are available, omit m##.png for those modules so the Key Points card displays. Copy the template placeholder only when an intentional placeholder image should be shown.
- Do not create quiz PNG, MP3, VTT, or narration assets unless explicitly requested.
- Do not create modules.json, title.txt, m01.title, m01.txt, or m01_graphic_alt.txt.
- Build imsmanifest.xml as a multi-SCO manifest with one sibling organization item and one uniquely identified launchable SCO resource per module, including the final quiz.
- Map ITEM-M## to RES-M## and point each resource href at the corresponding m##.html file. Do not reuse a course-wide resource for multiple modules.
- Let the LMS launch and navigate between SCOs. Previous, Next, and sidebar destinations must be preview-only and must not navigate directly to another SCO while an LMS API is present.
- Keep suspend data and local fallback progress per SCO. Do not restore a course-wide completion list from another SCO's snapshot.
- Check every LMSSetValue and LMSCommit result. On failure, retain per-SCO local recovery state when possible and display that progress could not be saved; never display a saved/completed LMS state after a failed operation.
- Keep index.html as a helper redirect only; never use it as a SCO launch target.
- List the real dependencies used by each module inside that module's resource, and do not include nonexistent assets.
- Do not list `base.html`, `quiz.html`, `placeholder.png`, or template-only/source files in imsmanifest.xml unless those files are deliberately shipped and loaded.
- Include `course_assets/m##.png` in the matching module resource when that PNG file exists.
- Include optional code_m##.js files in only the matching module resource and only when they actually exist.
- Copy the four SCORM 1.2 schemas (`adlcp_rootv1p2.xsd`, `imscp_rootv1p1p2.xsd`, `imsmd_rootv1p2p1.xsd`, and `ims_xml.xsd`) to the package root, retain the local three-namespace `xsi:schemaLocation`, and validate imsmanifest.xml against them.
- There is a readme.md in the template dir.

Course structure requirements:
- Create approximately 5 to 10 instructional modules plus a final quiz.
- Include a dedicated course summary module near the end.
- Do not include knowledge checks inside instructional modules.
- Put all assessment questions into the final quiz module only.
- The final quiz should be a SCORM quiz only and should not contain narration, graphics, an audio player, MP3, VTT, or image cards.
- Randomize answer positions so the correct answer is not always the same letter.

Narration requirements:
- Narration quality is the most important part of the product.
- Do not simply copy the outline.
- Expand the outline into polished, professional instructional narration.
- Use a practical, real-world, engineering-focused tone where appropriate.
- Avoid fluff and generic marketing language.
- Write concise narrationPoints for every instructional module; they are the visible fallback when the module image is unavailable.

Output only the final Codex prompt and brief pipeline notes.
```









Make an outline for a course called  TOPIC

Then make a complete prompt for Codex that builds the course using the v8 template. No fictional scenarios in the content.

Make narration as high quality as possible. The narration is the product. There should be multiple paragraphs of narration on each slide.

The template lives in:
C:\bot\template_v8

The generated course should be created in:
C:\bot\<course_name>_course

Requirements for the generated course prompt:
- Copy C:\bot\template_v8 to the target course directory.
- Work directly in the target directory.
- Do not create a course builder.
- Do not create a course spec JSON.
- Do not build a SCORM zip.
- Do not perform browser validation.
- Do not perform Whisper checks.
- Do not create or keep intermediate WAV files.
- Use the v8 modular asset pattern:
  - course_assets/course.js defines window.COURSE.
  - course_assets/modules.js defines window.COURSE_MODULES.
  - course_assets/m01.js, m02.js, etc. define window.COURSE_MODULE.
  - Each instructional module JS includes title, narration, and narrationPoints. graphicAlt is optional when no module graphic exists.
  - course_assets/m01.png, m02.png, etc. contain optional module illustrations. When the matching PNG is absent, the image card is hidden and narrationPoints appear in the Key Points card.
  - course_assets/m01.mp3, m02.mp3, etc. contain narration audio. Use Pocket TTS in C:\bot\aitts to generate narration audio. Make the MP3 directly in the course_assets dir. Prepend 0.5s of silence to audio tracks to prevent the first word from being truncated.
  - course_assets/m01.vtt, m02.vtt, etc. contain captions.
- If no custom graphics are available, omit m##.png for those modules so the Key Points card displays. Copy the template placeholder only when an intentional placeholder image should be shown.
- Do not create quiz PNG, MP3, VTT, or narration assets unless explicitly requested.
- Do not create modules.json, title.txt, m01.title, m01.txt, or m01_graphic_alt.txt.
- Build imsmanifest.xml as a multi-SCO manifest with one sibling organization item and one uniquely identified launchable SCO resource per module, including the final quiz.
- Map ITEM-M## to RES-M## and point each resource href at the corresponding m##.html file. Do not reuse a course-wide resource for multiple modules.
- Let the LMS launch and navigate between SCOs. Keep all Previous, Next, and sidebar destinations preview-only; they must not navigate directly to another SCO when a SCORM API is present.
- Keep `cmi.suspend_data` and local fallback progress per SCO, and check every LMS write and commit. A persistence failure must display a not-saved warning instead of completion while retaining the per-SCO local recovery copy when possible.
- Keep index.html as a helper redirect only; never use it as a SCO launch target.
- List the real dependencies used by each module inside that module's resource, and do not include nonexistent assets.
- Do not list `base.html`, `quiz.html`, `placeholder.png`, or template-only/source files in imsmanifest.xml unless those files are deliberately shipped and loaded.
- Include `course_assets/m##.png` in the matching module resource when that PNG file exists.
- Copy `adlcp_rootv1p2.xsd`, `imscp_rootv1p1p2.xsd`, `imsmd_rootv1p2p1.xsd`, and `ims_xml.xsd` to the package root, retain the local three-namespace `xsi:schemaLocation`, and validate the manifest against them.
- There is a readme.md in the template dir.
- Use python as much as possible instead of powershell, because powershell often fails when working on this project.
- Don't make any images

Course structure requirements:
- Create approximately 5 to 10 instructional modules plus a final quiz.
- The total narration duration when generated by tts should be about 10-20 mins long, trending towards 15.
- Include a dedicated course summary module near the end.
- Do not include knowledge checks inside instructional modules.
- Put all assessment questions into the final quiz module only.
- The final quiz should be a SCORM quiz only and should not contain narration, graphics, an audio player, MP3, VTT, or image cards.
- Randomize answer positions so the correct answer is not always the same letter.

Narration requirements:
- Narration quality is the most important part of the product.
- Do not simply copy the outline.
- Expand the outline into polished, professional instructional narration.
- Use a practical, real-world, engineering-focused tone where appropriate.
- Avoid fluff and generic marketing language.
- Write concise narrationPoints for every instructional module; they are the visible fallback when the module image is unavailable.

Output only the final Codex prompt and brief pipeline notes.
