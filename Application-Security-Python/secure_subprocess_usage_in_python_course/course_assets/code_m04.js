window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation, Allowlists, and Argument Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map service operations to fixed systemctl arguments",
      "language": "python",
      "blurb": "Finite action and service maps supply the complete systemctl argument vector; caller text cannot become an executable, option, or arbitrary unit name.",
      "code": "import subprocess\n\nACTIONS = {\n    \"inspect\": (\"status\", \"--no-pager\", \"--\"),\n    \"restart\": (\"restart\", \"--\"),\n}\nSERVICE_UNITS = {\n    \"image_worker\": \"orders-image-worker.service\",\n    \"report_worker\": \"orders-report-worker.service\",\n}\n\nclass ServiceOperationError(RuntimeError):\n    pass\n\ndef run_service_operation(action: str, service: str) -> subprocess.CompletedProcess[bytes]:\n    if not isinstance(action, str) or not isinstance(service, str):\n        raise ValueError(\"service operation rejected\")\n    arguments = ACTIONS.get(action)\n    unit = SERVICE_UNITS.get(service)\n    if arguments is None or unit is None:\n        raise ValueError(\"service operation rejected\")\n    try:\n        return subprocess.run(\n            [\"/usr/bin/systemctl\", *arguments, unit],\n            shell=False,\n            stdin=subprocess.DEVNULL,\n            capture_output=True,\n            timeout=5,\n            check=True,\n            env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n        )\n    except Exception:\n        raise ServiceOperationError(\"service operation failed\") from None\n"
    },
    {
      "title": "Validate a numeric argument before formatting it",
      "language": "python",
      "blurb": "The business range and exact integer type are checked before conversion, preventing Boolean values, option strings, or oversized work factors from reaching the child.",
      "code": "import re\nimport subprocess\n\nIMAGE_FILENAME_RE = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\\.(?:png|jpg|jpeg|webp)\\Z\", re.IGNORECASE)\n\nclass ImageResizeError(RuntimeError):\n    pass\n\ndef resize_image(filename: str, width: int) -> None:\n    if type(width) is not int or not 16 <= width <= 4096:\n        raise ValueError(\"image width rejected\")\n    if not isinstance(filename, str) or not IMAGE_FILENAME_RE.fullmatch(filename):\n        raise ValueError(\"image filename rejected\")\n    try:\n        subprocess.run(\n            [\"/usr/bin/convert\", \"--\", filename, \"-resize\", f\"{width}x{width}>\", \"thumbnail.png\"],\n            shell=False,\n            stdin=subprocess.DEVNULL,\n            stdout=subprocess.DEVNULL,\n            stderr=subprocess.DEVNULL,\n            timeout=10,\n            check=True,\n            env={\"PATH\": \"/usr/bin:/bin\"},\n        )\n    except Exception:\n        raise ImageResizeError(\"image resize failed\") from None\n"
    }
  ]
};
