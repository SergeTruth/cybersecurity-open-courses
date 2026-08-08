window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Temporary Files and Working Directories with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use an automatically cleaned temporary directory",
      "language": "python",
      "blurb": "The temporary workspace has an unpredictable name and is removed when the bounded processing scope ends.",
      "code": "import os\nimport stat\nfrom pathlib import Path\nfrom tempfile import TemporaryDirectory\n\nMAX_SOURCE_BYTES = 5_000_000\nMAX_RENDERED_BYTES = 20_000_000\n\ndef read_rendered_output(workspace_fd: int) -> bytes:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\n            \"secure rendered-output opening requires O_NOFOLLOW\"\n        )\n    descriptor = os.open(\n        \"output.pdf\",\n        os.O_RDONLY\n        | os.O_NOFOLLOW\n        | getattr(os, \"O_CLOEXEC\", 0)\n        | getattr(os, \"O_NONBLOCK\", 0),\n        dir_fd=workspace_fd,\n    )\n    with os.fdopen(descriptor, \"rb\") as output:\n        info = os.fstat(output.fileno())\n        if not stat.S_ISREG(info.st_mode) or not 0 <= info.st_size <= MAX_RENDERED_BYTES:\n            raise ValueError(\"rendered output object rejected\")\n        body = output.read(MAX_RENDERED_BYTES + 1)\n    if len(body) > MAX_RENDERED_BYTES:\n        raise ValueError(\"rendered output exceeded its byte limit\")\n    return body\n\ndef render_document(source: bytes, renderer) -> bytes:\n    if type(source) is not bytes or len(source) > MAX_SOURCE_BYTES:\n        raise ValueError(\"document source rejected\")\n    if not callable(renderer):\n        raise TypeError(\"renderer must be callable\")\n    with TemporaryDirectory(prefix=\"render-\") as temporary:\n        workspace = Path(temporary)\n        workspace_fd = os.open(\n            workspace,\n            os.O_RDONLY\n            | getattr(os, \"O_DIRECTORY\", 0)\n            | getattr(os, \"O_CLOEXEC\", 0)\n            | getattr(os, \"O_NOFOLLOW\", 0),\n        )\n        try:\n            input_path = workspace / \"input.bin\"\n            output_path = workspace / \"output.pdf\"\n            input_path.write_bytes(source)\n            renderer(\n                input_path=input_path,\n                output_path=output_path,\n                working_directory=workspace,\n            )\n            return read_rendered_output(workspace_fd)\n        finally:\n            os.close(workspace_fd)\n"
    },
    {
      "title": "Keep working-directory changes out of process state",
      "language": "python",
      "blurb": "Resolved source and output directories must be disjoint; neither may equal, contain, or be contained by the other.",
      "code": "from pathlib import Path\n\ndef compile_assets(compiler, project_root: Path, output_root: Path) -> None:\n    project = project_root.resolve(strict=True)\n    output = output_root.resolve(strict=False)\n    if (\n        project == output\n        or project in output.parents\n        or output in project.parents\n    ):\n        raise ValueError(\"output directory must be separate from source\")\n    output.mkdir(mode=0o700, parents=True, exist_ok=True)\n    compiler.compile(source=project, destination=output, cwd=project)\n"
    }
  ]
};
