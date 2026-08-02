window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation and Allowlisted Operations with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map user actions to reviewed commands",
      "language": "python",
      "blurb": "The request can select only a known operation; it never supplies an executable, flag, or command fragment directly.",
      "code": "COMMANDS = {\n    \"status\": (\"/usr/bin/systemctl\", \"is-active\", \"example-worker.service\"),\n    \"version\": (\"/usr/local/bin/example-worker\", \"--version\"),\n}\n\ndef command_for(action: str) -> tuple[str, ...]:\n    try:\n        return COMMANDS[action]\n    except KeyError:\n        raise PermissionError(\"process operation is not approved\") from None\n"
    },
    {
      "title": "Stop option parsing before a user value",
      "language": "python",
      "blurb": "The fixed double-dash marker prevents a filename beginning with a hyphen from becoming a tool option.",
      "code": "import subprocess\n\ndef hash_file(filename: str) -> str:\n    if \"\\x00\" in filename:\n        raise ValueError(\"filename contains NUL\")\n    result = subprocess.run(\n        [\"/usr/bin/sha256sum\", \"--\", filename],\n        text=True,\n        capture_output=True,\n        timeout=10,\n        check=True,\n    )\n    return result.stdout.split(maxsplit=1)[0]\n"
    }
  ]
};
