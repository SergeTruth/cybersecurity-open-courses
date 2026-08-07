window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Avoiding Shell Interpretation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Launch a fixed executable without a shell",
      "language": "python",
      "blurb": "The executable and every argument are separate values, an option terminator protects a filename beginning with a dash, and no shell parses the command.",
      "code": "import re\nimport subprocess\n\nIMAGE_FILENAME_RE = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\\.(?:png|jpg|jpeg|webp)\\Z\", re.IGNORECASE)\n\nclass ImageInspectionError(RuntimeError):\n    pass\n\ndef image_dimensions(filename: str) -> tuple[int, int]:\n    if not isinstance(filename, str) or not IMAGE_FILENAME_RE.fullmatch(filename):\n        raise ValueError(\"image filename rejected\")\n    try:\n        completed = subprocess.run(\n            [\"/usr/bin/identify\", \"-format\", \"%w %h\", \"--\", filename],\n            shell=False,\n            capture_output=True,\n            text=True,\n            timeout=5,\n            check=True,\n            env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n        )\n        width_text, height_text = completed.stdout.split()\n        width, height = int(width_text), int(height_text)\n    except Exception:\n        raise ImageInspectionError(\"image inspection failed\") from None\n    if not 1 <= width <= 20_000 or not 1 <= height <= 20_000:\n        raise ValueError(\"image dimensions rejected\")\n    return width, height\n"
    },
    {
      "title": "Keep fixed shell syntax separate from untrusted input",
      "language": "python",
      "blurb": "When a shell pipeline is genuinely required, the application owns the script and passes caller data through standard input rather than interpolating it into shell text.",
      "code": "import subprocess\n\nLINE_COUNT_SCRIPT = \"set -eu; LC_ALL=C wc -l\"\n\nclass LineCountError(RuntimeError):\n    pass\n\ndef count_lines(content: bytes) -> int:\n    if type(content) is not bytes or len(content) > 1_000_000:\n        raise ValueError(\"input rejected\")\n    try:\n        completed = subprocess.run(\n            [\"/bin/sh\", \"-c\", LINE_COUNT_SCRIPT],\n            input=content,\n            stdout=subprocess.PIPE,\n            stderr=subprocess.DEVNULL,\n            timeout=3,\n            check=True,\n            env={\"PATH\": \"/usr/bin:/bin\"},\n        )\n        output = completed.stdout.decode(\"ascii\", \"strict\").strip()\n        line_count = int(output)\n    except Exception:\n        raise LineCountError(\"line count failed\") from None\n    if not 0 <= line_count <= 1_000_000:\n        raise ValueError(\"line count rejected\")\n    return line_count\n"
    }
  ]
};
