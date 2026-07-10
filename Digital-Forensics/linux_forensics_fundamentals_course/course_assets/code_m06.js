window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Build File and Event Timelines",
  "codeExamples": [
    {
      "title": "Create a File Metadata Timeline",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT\" -xdev -type f \\\n  -printf '%T@|mtime|%TY-%Tm-%TdT%TH:%TM:%TS%Tz|%u|%g|%m|%s|%p\\n' 2>/dev/null | \\\n  sort -n > case-file-timeline.tsv"
    },
    {
      "title": "Find Recently Modified Executables and Dotfiles",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT/home\" \"$ROOT/root\" \"$ROOT/tmp\" \"$ROOT/var/tmp\" -xdev \\\n  \\( -perm -111 -o -name '.*' \\) \\\n  -type f -mtime -14 -printf '%TY-%Tm-%Td %TH:%TM %m %u:%g %s %p\\n' 2>/dev/null | sort"
    },
    {
      "title": "Merge Simple Timeline Rows",
      "language": "python",
      "code": "from pathlib import Path\n\nrows = []\nfor line in Path(\"case-file-timeline.tsv\").read_text(errors=\"replace\").splitlines():\n    epoch, kind, iso_time, user, group, mode, size, path = line.split(\"|\", 7)\n    rows.append((float(epoch), iso_time, kind, user, mode, size, path))\n\nfor _, iso_time, kind, user, mode, size, path in sorted(rows)[-25:]:\n    print(f\"{iso_time} {kind:5} {user:>8} {mode} {size:>9} {path}\")"
    }
  ]
};
