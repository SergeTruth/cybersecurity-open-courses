window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Atomically replace a file beneath a trusted directory",
      "language": "bash",
      "blurb": "Within a trusted non-hostile directory, descriptor-relative replacement synchronizes the file and directory. Descriptor 3 carries bounded payload bytes independently of the heredoc containing Python source.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\npython3 - \"${1:?directory required}\" 3<&0 <<'PY'\nimport os, secrets, sys\nroot_fd = os.open(sys.argv[1], os.O_RDONLY | os.O_DIRECTORY)\nname = \".settings-\" + secrets.token_hex(12)\ntry:\n    fd = os.open(name, os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW, 0o600, dir_fd=root_fd)\n    with os.fdopen(fd, \"wb\") as out:\n        with os.fdopen(3, \"rb\", closefd=False) as payload:\n            out.write(payload.read(65537))\n        if out.tell() > 65536: raise ValueError(\"output too large\")\n        out.flush(); os.fsync(out.fileno())\n    os.replace(name, \"settings.json\", src_dir_fd=root_fd, dst_dir_fd=root_fd)\n    os.fsync(root_fd)\nfinally:\n    try: os.unlink(name, dir_fd=root_fd)\n    except FileNotFoundError: pass\n    os.close(root_fd)\nPY\n"
    },
    {
      "title": "Create report output exclusively",
      "language": "bash",
      "blurb": "Exclusive creation rejects every existing entry. Failed or timed-out direct producers remove incomplete output from the application-owned directory.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Linux/POSIX, Python 3. The directory and its entries are application-owned.\npython3 - \"$@\" <<'PY'\nimport os, re, subprocess, sys\ndirectory = \"/srv/reports/out\"\nif len(sys.argv) != 2 or not re.fullmatch(r\"report-[0-9]{8}\\.json\", sys.argv[1]):\n    raise SystemExit(\"report name rejected\")\nname = sys.argv[1]\npath = os.path.join(directory, name)\nfd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600)\ntry:\n    with os.fdopen(fd, \"wb\") as output:\n        subprocess.run([\"/opt/reports/bin/generate-report\",\"--format\",\"json\"], stdout=output, check=True, timeout=30,\n                       env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"})\n        output.flush()\n        os.fsync(output.fileno())\nexcept BaseException:\n    os.unlink(path)\n    raise\nPY\n"
    }
  ]
};
