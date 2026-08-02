window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Child Processes, Python Runtime Behavior, and Inherited State with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Pass a minimal child-process environment",
      "language": "python",
      "blurb": "The child receives a fixed locale and one operation-specific endpoint rather than a copy of the parent process environment.",
      "code": "import subprocess\n\ndef run_health_probe(api_origin: str) -> subprocess.CompletedProcess[str]:\n    child_environment = {\"LANG\": \"C.UTF-8\", \"API_ORIGIN\": api_origin}\n    return subprocess.run(\n        [\"/usr/local/bin/service-health\", \"--format\", \"json\"],\n        env=child_environment,\n        text=True,\n        capture_output=True,\n        timeout=10,\n        check=False,\n    )\n"
    },
    {
      "title": "Resolve approved executables before launch",
      "language": "python",
      "blurb": "The executable must resolve to an expected absolute path; a caller-controlled PATH cannot select a different program.",
      "code": "from pathlib import Path\nimport shutil\n\nAPPROVED_EXECUTABLES = {\"convert\": Path(\"/usr/bin/convert\"), \"identify\": Path(\"/usr/bin/identify\")}\n\ndef executable_for(operation: str) -> Path:\n    expected = APPROVED_EXECUTABLES.get(operation)\n    if expected is None:\n        raise ValueError(\"operation is not approved\")\n    resolved = shutil.which(expected.name, path=str(expected.parent))\n    if resolved is None or Path(resolved).resolve() != expected:\n        raise RuntimeError(\"approved executable is unavailable\")\n    return expected\n"
    }
  ]
};
