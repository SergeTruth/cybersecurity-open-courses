window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Open a relative file beneath a directory descriptor",
      "language": "bash",
      "blurb": "Linux/POSIX and Python 3.12+: a trusted root and application-owned entries exclude attacker-created hard links. Descriptor-relative no-follow opens reject symlinks; nonblocking open permits rejecting FIFOs, and actual reads are capped.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\npython3 - \"${1:?root required}\" \"${2:?relative path required}\" <<'PY'\nimport os, stat, sys\nroot, relative = sys.argv[1:]\nparts = relative.split(\"/\")\nif not parts or any(part in {\"\", \".\", \"..\"} for part in parts):\n    raise SystemExit(\"path rejected\")\nfd = os.open(root, os.O_RDONLY | os.O_DIRECTORY)\ntry:\n    for part in parts[:-1]:\n        child = os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=fd)\n        os.close(fd); fd = child\n    target = os.open(parts[-1], os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=fd)\n    with os.fdopen(target, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_size > 1_000_000:\n            raise ValueError(\"file rejected\")\n        body = stream.read(1_000_001)\n        if len(body) > 1_000_000:\n            raise ValueError(\"file grew beyond limit\")\n        sys.stdout.buffer.write(body)\nfinally:\n    os.close(fd)\nPY\n"
    },
    {
      "title": "Map public document identifiers to owned paths",
      "language": "bash",
      "blurb": "Callers select an opaque identifier; an application mapping chooses the relative storage name instead of accepting path syntax.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ndocument_path() {\n  case \"${1-}\" in\n    handbook) printf '%s\\n' '/srv/docs/public/handbook.pdf' ;;\n    privacy) printf '%s\\n' '/srv/docs/public/privacy.pdf' ;;\n    support) printf '%s\\n' '/srv/docs/public/support.pdf' ;;\n    *) return 64 ;;\n  esac\n}\n\npath=\"$(document_path \"${1:?document id required}\")\"\n[[ -f \"$path\" && ! -L \"$path\" ]] || exit 66\nexec /usr/bin/wc -c -- \"$path\"\n"
    }
  ]
};
