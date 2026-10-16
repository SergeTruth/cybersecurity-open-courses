window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Reject links and filesystem-device changes",
      "language": "bash",
      "blurb": "Linux/POSIX descriptor-relative no-follow opens keep components on the root device. This does not detect same-device bind mounts; trusted mount policy and an application-owned root are prerequisites.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\npython3 - \"${1:?root required}\" \"${2:?relative directory required}\" <<'PY'\nimport os, sys\nroot, relative = sys.argv[1:]\nparts = relative.split(\"/\")\nif any(p in {\"\", \".\", \"..\"} for p in parts): raise SystemExit(\"component rejected\")\nfd = os.open(root, os.O_RDONLY | os.O_DIRECTORY)\ndevice = os.fstat(fd).st_dev\ntry:\n    for part in parts:\n        next_fd = os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=fd)\n        os.close(fd); fd = next_fd\n        if os.fstat(fd).st_dev != device: raise PermissionError(\"mount boundary crossed\")\nfinally:\n    os.close(fd)\nPY\n"
    },
    {
      "title": "Inspect an already-opened object type",
      "language": "bash",
      "blurb": "The same opened regular-file descriptor is hashed with an actual-byte limit, including growth after opening. Nonblocking no-follow opening rejects FIFO and symlink targets before reading.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Linux/POSIX; trusted root and application-owned entries exclude hostile hard links.\npython3 - \"${1:?path required}\" <<'PY'\nimport hashlib, os, stat, sys\nfd = os.open(sys.argv[1], os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)\nwith os.fdopen(fd, \"rb\") as source:\n    if not stat.S_ISREG(os.fstat(source.fileno()).st_mode):\n        raise SystemExit(\"regular file required\")\n    digest = hashlib.sha256()\n    total = 0\n    while True:\n        block = source.read(min(65536, 1048577 - total))\n        if not block: break\n        total += len(block)\n        if total > 1048576: raise SystemExit(\"file too large\")\n        digest.update(block)\n    print(digest.hexdigest())\nPY\n"
    }
  ]
};
