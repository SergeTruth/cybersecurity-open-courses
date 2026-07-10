window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Map the Linux Filesystem",
  "codeExamples": [
    {
      "title": "Identify Distribution and Release",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\ncat \"$ROOT/etc/os-release\"\ncat \"$ROOT/etc/issue\" 2>/dev/null || true\nfind \"$ROOT/etc\" -maxdepth 1 \\( -name '*release' -o -name '*version' \\) -type f -print"
    },
    {
      "title": "Inventory High-Value Directories",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfor path in etc var/log home root tmp opt usr/local; do\n  printf '\\n[%s]\\n' \"$ROOT/$path\"\n  find \"$ROOT/$path\" -maxdepth 2 -xdev -type f -printf '%TY-%Tm-%Td %TH:%TM %s %p\\n' 2>/dev/null | head -50\ndone"
    },
    {
      "title": "Summarize Mounted Evidence Layout",
      "language": "python",
      "code": "from pathlib import Path\n\nroot = Path(\"/mnt/evidence/rootfs\")\nfor name in [\"etc\", \"var/log\", \"home\", \"root\", \"tmp\", \"opt\"]:\n    path = root / name\n    files = sum(1 for item in path.rglob(\"*\") if item.is_file()) if path.exists() else 0\n    print(f\"{path}: {files} files\")"
    }
  ]
};
