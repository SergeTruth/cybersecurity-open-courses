window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Scope a working-directory change",
      "language": "bash",
      "blurb": "A subshell keeps cwd changes from the parent.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n( cd /srv/orders/import; [[ -f batch.json && ! -L batch.json ]]; /opt/orders/bin/import --input batch.json )\nprintf 'parent=%s\\n' \"$PWD\"\n"
    },
    {
      "title": "Create output exclusively",
      "language": "bash",
      "blurb": "O_EXCL rejects existing files, links, devices, and FIFOs. The destination directory must be application-owned.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Linux/POSIX, Python 3. The directory and its entries are application-owned.\npython3 - \"$@\" <<'PY'\nimport os, re, subprocess, sys\ndirectory = \"/srv/orders/results\"\nif len(sys.argv) != 1:\n    raise SystemExit(\"no operands accepted\")\nname = \"latest.txt\"\npath = os.path.join(directory, name)\nfd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)\ntry:\n    with os.fdopen(fd, \"wb\") as output:\n        subprocess.run([\"/opt/orders/bin/status\"], stdout=output, check=True, timeout=30,\n                       env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"})\n        output.flush()\n        os.fsync(output.fileno())\nexcept BaseException:\n    os.unlink(path)\n    raise\nPY\n"
    }
  ]
};
