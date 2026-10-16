window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Create an archive from a NUL-delimited file list",
      "language": "bash",
      "blurb": "Position-sensitive tar options precede the NUL file list. Producer and archive statuses are checked before atomic publication within the trusted output filesystem.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Both roots and their contents remain application-owned throughout this operation.\nreadonly ROOT='/srv/export/ready'\nreadonly OUTPUT='/srv/export/out'\numask 077\nstage=\"$(mktemp -d -p \"$OUTPUT\" archive.XXXXXX)\"\ntrap 'rm -f -- \"$stage/documents.tar\"; rmdir -- \"$stage\"' EXIT\ntrap 'exit 130' INT\ntrap 'exit 143' TERM HUP\nset +e\nfind \"$ROOT\" -xdev -type f -size -10M -printf '%P\\0' \\\n  | tar --create --file=\"$stage/documents.tar\" --directory=\"$ROOT\" \\\n      --no-recursion --owner=0 --group=0 --numeric-owner --null --files-from=-\nstatuses=(\"${PIPESTATUS[@]}\")\nset -e\n((statuses[0] == 0 && statuses[1] == 0)) || exit 70\nmv -T -- \"$stage/documents.tar\" \"$OUTPUT/documents.tar\"\n"
    },
    {
      "title": "Extract regular tar members into private staging",
      "language": "bash",
      "blurb": "Linux/POSIX and Python 3.12+ with current security fixes: within a private, non-hostile destination, the data filter rejects dangerous members and the helper caps declared expansion and member count. Use an external CPU/time and storage quota for untrusted compressed inputs.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\npython3 - \"${1:?archive required}\" \"${2:?destination parent required}\" <<'PY'\nimport os, pathlib, shutil, tarfile, tempfile, sys\narchive, parent = sys.argv[1:]\nstage = None\ntry:\n    stage = pathlib.Path(tempfile.mkdtemp(prefix=\"extract-\", dir=parent))\n    os.chmod(stage, 0o700)\n    with open(archive, \"rb\") as source, tarfile.open(fileobj=source, mode=\"r:*\") as bundle:\n        members = []\n        expanded_bytes = 0\n        for member in bundle:\n            members.append(member)\n            if len(members) > 500:\n                raise ValueError(\"member limit\")\n            path = pathlib.PurePosixPath(member.name)\n            if path.is_absolute() or \"..\" in path.parts or not (member.isfile() or member.isdir()):\n                raise ValueError(\"member rejected\")\n            if member.size > 10_000_000:\n                raise ValueError(\"member too large\")\n            if member.isfile():\n                expanded_bytes += member.size\n                if expanded_bytes > 100_000_000:\n                    raise ValueError(\"archive expansion limit\")\n        bundle.extractall(stage, members=members, filter=\"data\")\n    print(stage)\nexcept BaseException:\n    if stage is not None:\n        shutil.rmtree(stage, ignore_errors=True)\n    raise\nPY\n"
    }
  ]
};
