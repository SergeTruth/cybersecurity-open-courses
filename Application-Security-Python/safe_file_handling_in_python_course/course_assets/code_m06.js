window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Temporary Files and Working Directories with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use an automatically cleaned temporary directory",
      "language": "python",
      "blurb": "The temporary workspace has an unpredictable name and is removed when the bounded processing scope ends.",
      "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\n\ndef render_document(source: bytes, renderer) -> bytes:\n    with TemporaryDirectory(prefix=\"render-\") as temporary:\n        workspace = Path(temporary)\n        input_path = workspace / \"input.bin\"\n        output_path = workspace / \"output.pdf\"\n        input_path.write_bytes(source)\n        renderer(input_path=input_path, output_path=output_path, working_directory=workspace)\n        return output_path.read_bytes()\n"
    },
    {
      "title": "Keep working-directory changes out of process state",
      "language": "python",
      "blurb": "Resolved source and output directories must be disjoint; neither may equal, contain, or be contained by the other.",
      "code": "from pathlib import Path\n\ndef compile_assets(compiler, project_root: Path, output_root: Path) -> None:\n    project = project_root.resolve(strict=True)\n    output = output_root.resolve(strict=False)\n    if (\n        project == output\n        or project in output.parents\n        or output in project.parents\n    ):\n        raise ValueError(\"output directory must be separate from source\")\n    output.mkdir(mode=0o700, parents=True, exist_ok=True)\n    compiler.compile(source=project, destination=output, cwd=project)\n"
    }
  ]
};
