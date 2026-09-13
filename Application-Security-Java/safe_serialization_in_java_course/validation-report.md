# Validation: Safe Serialization in Java

Checked 2026-09-12 after the in-place v9 migration.

- Shared v9 validator: **PASS**, zero errors and warnings.
- Mocked LMSSetValue/LMSCommit failure handling: **PASS**; failures show a not-saved state.
- Eleven sibling organization items map exactly to eleven unique matching launchable SCO resources; all listed dependencies exist. Final quiz is media-free.
- Seven runtime files and four SCORM schema files match `C:\bot\template_v9` byte for byte.
- Original course title, navigation order, module titles, narration text, narrationPoints, all ten quiz questions, answer key and 80% passing score are unchanged.
- All ten instructional MP3, VTT and PNG files differ from their pre-migration versions.
- MP3: alba, mono, 24 kHz, 128 kbps. Synthesis prepends 0.5 seconds of silence; decoded first 0.45 seconds are silent to within 0.00001 full scale.
- VTT: exact narration text, cues begin at 0.5 seconds; timing is estimated from measured duration, not forced aligned.
- Illustrations: ten opaque RGB PNGs at 1920 x 1080, visually inspected and refined as documented in `infographic-prompts.md`.
- No WAV, ZIP, backup, temporary MP3, obsolete template stub, placeholder or quiz-media files remain in the course.

## Measured MP3 durations

| Module | Seconds |
| --- | ---: |
| m01 | 96.26 |
| m02 | 94.18 |
| m03 | 84.34 |
| m04 | 86.74 |
| m05 | 83.14 |
| m06 | 78.34 |
| m07 | 82.66 |
| m08 | 90.90 |
| m09 | 89.38 |
| m10 | 102.74 |
| **Total** | **888.68** |

No browser, LMS-server, Whisper, or human-listening validation was performed. Static checks do not prove live-LMS compatibility or speech-level caption alignment.

