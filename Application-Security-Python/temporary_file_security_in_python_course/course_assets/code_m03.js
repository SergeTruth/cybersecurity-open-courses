window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Python Temporary File APIs and Safe Defaults through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use TemporaryFile for short-lived binary data",
      "language": "python",
      "blurb": "The operating system chooses and exclusively creates the object, and the context manager closes and removes it when processing ends.",
      "code": "import tempfile\n\ndef checksum_upload(stream, digest_factory, verify_staged_content) -> bytes:\n    digest = digest_factory()\n    total = 0\n    with tempfile.TemporaryFile(mode=\"w+b\") as temporary:\n        while chunk := stream.read(64 * 1024):\n            total += len(chunk)\n            if total > 20_000_000:\n                raise ValueError(\"upload exceeded its byte limit\")\n            temporary.write(chunk)\n            digest.update(chunk)\n        temporary.seek(0)\n        verify_staged_content(temporary)\n    return digest.digest()\n"
    },
    {
      "title": "Read rendered output through a no-follow descriptor",
      "language": "python",
      "blurb": "A private workspace isolates the renderer, then a descriptor-relative no-follow open validates and byte-limits the actual regular output object before returning data.",
      "code": "from pathlib import Path\nimport os\nimport stat\nimport tempfile\n\nMAX_RENDERED_BYTES = 20_000_000\n\ndef read_rendered_output(workspace_fd: int, name: str) -> bytes:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure rendered-output opening requires O_NOFOLLOW\")\n    descriptor = os.open(name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=workspace_fd)\n    with os.fdopen(descriptor, \"rb\") as output:\n        info = os.fstat(output.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_size > MAX_RENDERED_BYTES:\n            raise ValueError(\"rendered output object rejected\")\n        body = bytearray()\n        while chunk := output.read(64 * 1024):\n            body.extend(chunk)\n            if len(body) > MAX_RENDERED_BYTES:\n                raise ValueError(\"rendered output exceeded its byte limit\")\n    return bytes(body)\n\ndef render_document_bundle(source: bytes, renderer) -> bytes:\n    if len(source) > 5_000_000:\n        raise ValueError(\"document source too large\")\n    with tempfile.TemporaryDirectory(prefix=\"render-\") as directory:\n        workspace = Path(directory)\n        workspace_fd = os.open(workspace, os.O_RDONLY | getattr(os, \"O_DIRECTORY\", 0))\n        try:\n            input_path = workspace / \"input.bin\"\n            output_path = workspace / \"output.pdf\"\n            input_path.write_bytes(source)\n            renderer(input_path, output_path)\n            return read_rendered_output(workspace_fd, \"output.pdf\")\n        finally:\n            os.close(workspace_fd)\n"
    }
  ]
};
