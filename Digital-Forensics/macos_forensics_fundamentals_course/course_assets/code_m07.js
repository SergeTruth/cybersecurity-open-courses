window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Build macOS File Timelines",
  "codeExamples": [
    {
      "title": "Create a File Metadata Timeline",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Users/alice/Downloads\" \"$ROOT/Users/alice/Desktop\" -type f -print0 |\n  xargs -0 stat -f '%Sm|%Sa|%Sc|%SB|%z|%Su|%Sg|%N' -t '%Y-%m-%dT%H:%M:%SZ' |\n  sort |\n  tee macos-file-timeline.txt"
    },
    {
      "title": "Review Quarantine Attributes",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Users/alice/Downloads\" -type f -print0 |\n  while IFS= read -r -d '' file; do\n    quarantine=$(xattr -p com.apple.quarantine \"$file\" 2>/dev/null || true)\n    if [ -n \"$quarantine\" ]; then\n      printf '%s\\t%s\\n' \"$quarantine\" \"$file\"\n    fi\n  done | tee quarantine-attributes.txt"
    },
    {
      "title": "Combine Metadata and Quarantine Leads",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\ntimeline = []\n\nfor line in Path(\"macos-file-timeline.txt\").read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    modified, accessed, changed, created, size, user, group, path = line.split(\"|\", 7)\n    timeline.append({\"time\": modified, \"source\": \"file_mtime\", \"path\": path, \"detail\": f\"{size} bytes {user}:{group}\"})\n\nfor line in Path(\"quarantine-attributes.txt\").read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    quarantine, path = line.split(\"\\t\", 1)\n    timeline.append({\"time\": \"\", \"source\": \"quarantine\", \"path\": path, \"detail\": quarantine})\n\nwith Path(\"combined-macos-timeline.csv\").open(\"w\", newline=\"\", encoding=\"utf-8\") as handle:\n    writer = csv.DictWriter(handle, fieldnames=[\"time\", \"source\", \"path\", \"detail\"])\n    writer.writeheader()\n    writer.writerows(timeline)"
    }
  ]
};
