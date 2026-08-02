window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Temporary Files in Processing Pipelines through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Report atomic replacement and durability separately",
      "language": "python",
      "blurb": "The result distinguishes failure before replacement, a committed replacement whose directory durability is unconfirmed, and a replacement confirmed durable by parent-directory synchronization.",
      "code": "from enum import Enum\nfrom pathlib import Path\nimport os\nimport tempfile\n\nclass ReplacementStatus(Enum):\n    FAILED_BEFORE_REPLACEMENT = \"failed_before_replacement\"\n    REPLACED_DURABILITY_UNCONFIRMED = \"replaced_durability_unconfirmed\"\n    REPLACED_AND_DURABLE = \"replaced_and_durable\"\n\ndef durable_replace(destination: Path, content: bytes) -> ReplacementStatus:\n    temporary: Path | None = None\n    try:\n        descriptor, temporary_name = tempfile.mkstemp(prefix=f\".{destination.name}.\", dir=destination.parent)\n        temporary = Path(temporary_name)\n        with os.fdopen(descriptor, \"wb\") as output:\n            output.write(content)\n            output.flush()\n            os.fsync(output.fileno())\n        os.replace(temporary, destination)\n    except OSError:\n        if temporary is not None:\n            temporary.unlink(missing_ok=True)\n        return ReplacementStatus.FAILED_BEFORE_REPLACEMENT\n\n    try:\n        directory_fd = os.open(destination.parent, os.O_RDONLY | getattr(os, \"O_DIRECTORY\", 0))\n        try:\n            os.fsync(directory_fd)\n        finally:\n            os.close(directory_fd)\n    except OSError:\n        return ReplacementStatus.REPLACED_DURABILITY_UNCONFIRMED\n    return ReplacementStatus.REPLACED_AND_DURABLE\n"
    },
    {
      "title": "Process staged input under actual byte limits",
      "language": "python",
      "blurb": "The pipeline streams into a generated file, validates actual bytes, rewinds the same descriptor for scanning, and removes every intermediate object through the directory context.",
      "code": "from pathlib import Path\nimport tempfile\n\ndef stage_and_scan(upload, scanner) -> str:\n    with tempfile.TemporaryDirectory(prefix=\"upload-\") as directory:\n        staged = Path(directory) / \"content.bin\"\n        total = 0\n        with staged.open(\"xb\") as output:\n            while chunk := upload.read(65_536):\n                total += len(chunk)\n                if total > 25_000_000:\n                    raise ValueError(\"upload exceeded its actual byte limit\")\n                output.write(chunk)\n        with staged.open(\"rb\") as source:\n            verdict = scanner(source)\n        if verdict not in {\"clean\", \"rejected\"}:\n            raise RuntimeError(\"scanner verdict rejected\")\n        return verdict\n"
    }
  ]
};
