# Validation: Safe File Handling in Java

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
| m01 | 103.62 |
| m02 | 94.18 |
| m03 | 94.50 |
| m04 | 94.74 |
| m05 | 95.06 |
| m06 | 83.78 |
| m07 | 87.70 |
| m08 | 93.14 |
| m09 | 98.42 |
| m10 | 104.18 |
| **Total** | **949.32** |

No browser, LMS-server, Whisper, or human-listening validation was performed. Static checks do not prove live-LMS compatibility or speech-level caption alignment.

