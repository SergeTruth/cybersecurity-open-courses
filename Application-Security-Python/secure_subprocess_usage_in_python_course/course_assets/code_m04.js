window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation, Allowlists, and Argument Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map service operations to fixed systemctl arguments",
      "language": "python",
      "blurb": "Finite action and service maps supply the complete systemctl argument vector; caller text cannot become an executable, option, or arbitrary unit name.",
      "code": "import subprocess\n\nACTIONS = {\n    \"inspect\": (\"status\", \"--no-pager\", \"--\"),\n    \"restart\": (\"restart\", \"--\"),\n}\nSERVICE_UNITS = {\n    \"image_worker\": \"orders-image-worker.service\",\n    \"report_worker\": \"orders-report-worker.service\",\n}\n\ndef run_service_operation(action: str, service: str) -> subprocess.CompletedProcess[bytes]:\n    arguments = ACTIONS.get(action)\n    unit = SERVICE_UNITS.get(service)\n    if arguments is None or unit is None:\n        raise ValueError(\"service operation rejected\")\n    return subprocess.run(\n        [\"/usr/bin/systemctl\", *arguments, unit],\n        shell=False,\n        stdin=subprocess.DEVNULL,\n        capture_output=True,\n        timeout=5,\n        check=True,\n        env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n    )\n"
    },
    {
      "title": "Validate a numeric argument before formatting it",
      "language": "python",
      "blurb": "The business range and exact integer type are checked before conversion, preventing Boolean values, option strings, or oversized work factors from reaching the child.",
      "code": "import subprocess\n\ndef resize_image(filename: str, width: int) -> None:\n    if type(width) is not int or not 16 <= width <= 4096:\n        raise ValueError(\"image width rejected\")\n    if not filename.endswith((\".png\", \".jpg\")) or \"/\" in filename or \"\\x00\" in filename:\n        raise ValueError(\"image filename rejected\")\n    subprocess.run(\n        [\"/usr/bin/convert\", \"--\", filename, \"-resize\", f\"{width}x{width}>\", \"thumbnail.png\"],\n        shell=False,\n        stdin=subprocess.DEVNULL,\n        stdout=subprocess.DEVNULL,\n        stderr=subprocess.DEVNULL,\n        timeout=10,\n        check=True,\n        env={\"PATH\": \"/usr/bin:/bin\"},\n    )\n"
    }
  ]
};
