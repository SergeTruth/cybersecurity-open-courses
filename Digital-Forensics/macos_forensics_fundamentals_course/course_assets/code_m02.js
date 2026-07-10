window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Map macOS Evidence Locations",
  "codeExamples": [
    {
      "title": "Inventory High-Value macOS Directories",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfor path in Applications Users Library System private/var; do\n  printf '\\n[%s]\\n' \"$ROOT/$path\"\n  find \"$ROOT/$path\" -maxdepth 2 -type f -print 2>/dev/null | head -50\ndone"
    },
    {
      "title": "Separate System Library and User Library Artifacts",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\nfind \"$ROOT/Library\" -maxdepth 3 \\( -name '*.plist' -o -name '*.log' \\) -type f \\\n  -print 2>/dev/null | sort | tee system-library-artifacts.txt\n\nfind \"$ROOT/Users\" -path '*/Library/*' \\( -name '*.plist' -o -name '*.sqlite*' -o -name '*.log' \\) \\\n  -type f -print 2>/dev/null | sort | tee user-library-artifacts.txt"
    },
    {
      "title": "Summarize Mounted Evidence Layout",
      "language": "python",
      "code": "from pathlib import Path\n\nroot = Path(\"/Volumes/Evidence/MacintoshHD\")\nfor name in [\"Applications\", \"Users\", \"Library\", \"System\", \"private/var\"]:\n    path = root / name\n    count = sum(1 for item in path.rglob(\"*\") if item.is_file()) if path.exists() else 0\n    print({\"path\": str(path), \"files\": count})"
    }
  ]
};
