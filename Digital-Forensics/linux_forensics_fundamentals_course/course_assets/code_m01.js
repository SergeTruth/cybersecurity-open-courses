window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Context and Integrity",
  "codeExamples": [
    {
      "title": "Hash a Collected Image Before Analysis",
      "language": "shell",
      "code": "CASE=case-2026-06-26\nIMAGE=/mnt/evidence/linux-disk.img\n\nmkdir -p \"$CASE\"\nsha256sum \"$IMAGE\" | tee \"$CASE/evidence-hashes.txt\"\nstat --printf 'name=%n\\nsize=%s\\nmodified=%y\\n' \"$IMAGE\" | tee \"$CASE/evidence-stat.txt\""
    },
    {
      "title": "Create a Minimal Case Note",
      "language": "shell",
      "code": "CASE=case-2026-06-26\n\n{\n  printf 'case_id=%s\\n' \"$CASE\"\n  printf 'analyst=%s\\n' \"$USER\"\n  printf 'started_utc=%s\\n' \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"\n  printf 'scope=%s\\n' 'authorized Linux forensic review'\n} | tee \"$CASE/case-notes.txt\""
    }
  ]
};
