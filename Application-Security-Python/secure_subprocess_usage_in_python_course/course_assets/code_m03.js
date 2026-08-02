window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Avoiding Shell Interpretation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Launch a fixed executable without a shell",
      "language": "python",
      "blurb": "The executable and every argument are separate values, an option terminator protects a filename beginning with a dash, and no shell parses the command.",
      "code": "import subprocess\n\ndef image_dimensions(filename: str) -> tuple[int, int]:\n    if not filename or \"/\" in filename or \"\\x00\" in filename:\n        raise ValueError(\"image filename rejected\")\n    completed = subprocess.run(\n        [\"/usr/bin/identify\", \"-format\", \"%w %h\", \"--\", filename],\n        shell=False,\n        capture_output=True,\n        text=True,\n        timeout=5,\n        check=True,\n        env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n    )\n    width, height = map(int, completed.stdout.split())\n    if not 1 <= width <= 20_000 or not 1 <= height <= 20_000:\n        raise ValueError(\"image dimensions rejected\")\n    return width, height\n"
    },
    {
      "title": "Keep fixed shell syntax separate from untrusted input",
      "language": "python",
      "blurb": "When a shell pipeline is genuinely required, the application owns the script and passes caller data through standard input rather than interpolating it into shell text.",
      "code": "import subprocess\n\nLINE_COUNT_SCRIPT = \"set -eu; LC_ALL=C wc -l\"\n\ndef count_lines(content: bytes) -> int:\n    if len(content) > 1_000_000:\n        raise ValueError(\"input exceeded its byte limit\")\n    completed = subprocess.run(\n        [\"/bin/sh\", \"-c\", LINE_COUNT_SCRIPT],\n        input=content,\n        stdout=subprocess.PIPE,\n        stderr=subprocess.DEVNULL,\n        timeout=3,\n        check=True,\n        env={\"PATH\": \"/usr/bin:/bin\"},\n    )\n    return int(completed.stdout)\n"
    }
  ]
};
