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
      "code": "import subprocess\n\nLINE_COUNT_SCRIPT = \"set -eu; wc -l\"\nMAX_LINE_COUNT_INPUT_BYTES = 1_000_000\n\nclass LineCountError(RuntimeError):\n    pass\n\ndef count_lines(content: bytes) -> int:\n    if type(content) is not bytes or len(content) > MAX_LINE_COUNT_INPUT_BYTES:\n        raise ValueError(\"line-count input rejected\")\n    try:\n        result = subprocess.run(\n            [\"/bin/sh\", \"-c\", LINE_COUNT_SCRIPT],\n            input=content,\n            capture_output=True,\n            timeout=3,\n            check=True,\n            env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n        )\n        output = result.stdout.decode(\"ascii\", \"strict\").strip()\n        if not output or len(output) > 16 or not output.isdecimal():\n            raise ValueError(\"line-count output rejected\")\n        count = int(output, 10)\n    except (OSError, subprocess.SubprocessError, UnicodeDecodeError, ValueError):\n        raise LineCountError(\"line count failed\") from None\n    if not 0 <= count <= MAX_LINE_COUNT_INPUT_BYTES:\n        raise LineCountError(\"line count failed\")\n    return count\n"
    }
  ]
};
