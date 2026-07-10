window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Context and Integrity",
  "codeExamples": [
    {
      "title": "Create a Case Folder and Hash Collected Evidence",
      "language": "shell",
      "code": "CASE=case-2026-06-27\nEVIDENCE=/Volumes/Evidence/macbook-collection\n\nmkdir -p \"$CASE\"\n\nfind \"$EVIDENCE\" -type f -print0 |\n  sort -z |\n  xargs -0 shasum -a 256 |\n  tee \"$CASE/evidence-sha256.txt\"\n\nstat -f 'name=%N size=%z modified=%Sm' \"$EVIDENCE\" |\n  tee \"$CASE/evidence-source-stat.txt\""
    },
    {
      "title": "Record Collection Scope and Analyst Notes",
      "language": "shell",
      "code": "CASE=case-2026-06-27\n\n{\n  printf 'case_id=%s\\n' \"$CASE\"\n  printf 'analyst=%s\\n' \"$USER\"\n  printf 'started_utc=%s\\n' \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"\n  printf 'scope=%s\\n' 'authorized macOS forensic review'\n  printf 'source=%s\\n' '/Volumes/Evidence/macbook-collection'\n} | tee \"$CASE/case-notes.txt\""
    }
  ]
};
