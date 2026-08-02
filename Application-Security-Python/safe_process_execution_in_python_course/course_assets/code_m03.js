window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Avoiding Shell Interpretation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Launch a fixed executable without a shell",
      "language": "python",
      "blurb": "The executable and each argument are separate values, and shell interpretation is explicitly disabled.",
      "code": "import subprocess\n\ndef image_dimensions(path: str) -> subprocess.CompletedProcess[str]:\n    return subprocess.run(\n        [\"/usr/bin/identify\", \"-format\", \"%w %h\", \"--\", path],\n        shell=False,\n        text=True,\n        capture_output=True,\n        timeout=5,\n        check=True,\n    )\n"
    },
    {
      "title": "Use a fixed shell program only for fixed syntax",
      "language": "python",
      "blurb": "When shell features are genuinely required, both the script and interpreter are application-owned and user data enters through standard input.",
      "code": "import subprocess\n\nLINE_COUNT_SCRIPT = \"set -eu; wc -l\"\n\ndef count_lines(content: bytes) -> int:\n    result = subprocess.run(\n        [\"/bin/sh\", \"-c\", LINE_COUNT_SCRIPT],\n        input=content,\n        capture_output=True,\n        timeout=3,\n        check=True,\n    )\n    return int(result.stdout)\n"
    }
  ]
};
