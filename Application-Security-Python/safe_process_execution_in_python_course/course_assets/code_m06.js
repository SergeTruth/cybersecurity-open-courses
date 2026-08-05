window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Variables, Secrets, and Credentials with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct a minimal child environment",
      "language": "python",
      "blurb": "A small locale and proxy-free environment replaces inherited process state; the service origin is parsed, bounded, canonicalized, and checked for control characters before it enters child state.",
      "code": "from urllib.parse import urlsplit\nimport unicodedata\n\nEXPECTED_SERVICE_HOST = \"api.example\"\nMAX_SERVICE_ORIGIN_LENGTH = 200\n\ndef has_control_character(value: str) -> bool:\n    return any(unicodedata.category(character) in {\"Cc\", \"Cf\"} for character in value)\n\ndef approved_service_origin(service_origin: str) -> str:\n    if not isinstance(service_origin, str) or not 1 <= len(service_origin) <= MAX_SERVICE_ORIGIN_LENGTH:\n        raise ValueError(\"service origin rejected\")\n    if has_control_character(service_origin):\n        raise ValueError(\"service origin rejected\")\n    parsed = urlsplit(service_origin)\n    try:\n        port = parsed.port\n    except ValueError:\n        raise ValueError(\"service origin rejected\") from None\n    if (\n        parsed.scheme != \"https\"\n        or parsed.hostname != EXPECTED_SERVICE_HOST\n        or parsed.username is not None\n        or parsed.password is not None\n        or port not in (None, 443)\n        or parsed.path not in (\"\", \"/\")\n        or parsed.query\n        or parsed.fragment\n    ):\n        raise ValueError(\"service origin rejected\")\n    return \"https://api.example/\"\n\ndef child_environment(service_origin: str) -> dict[str, str]:\n    return {\n        \"LANG\": \"C.UTF-8\",\n        \"LC_ALL\": \"C.UTF-8\",\n        \"NO_PROXY\": \"*\",\n        \"SERVICE_ORIGIN\": approved_service_origin(service_origin),\n    }\n"
    },
    {
      "title": "Pass a credential through a dedicated descriptor",
      "language": "python",
      "blurb": "The secret is written to an inherited pipe descriptor instead of command arguments, broad environment state, or temporary files.",
      "code": "import os\nimport subprocess\n\ndef launch_with_token(token: bytes):\n    if not isinstance(token, bytes) or not 1 <= len(token) <= 4096:\n        raise ValueError(\"token length rejected\")\n    read_fd, write_fd = os.pipe()\n    process = None\n    try:\n        process = subprocess.Popen(\n            [\"/usr/local/bin/report-client\", \"--token-fd\", str(read_fd)],\n            pass_fds=(read_fd,),\n            env={\"PATH\": \"/usr/local/bin:/usr/bin\", \"LANG\": \"C.UTF-8\"},\n        )\n        os.close(read_fd); read_fd = -1\n        with os.fdopen(write_fd, \"wb\") as writer:\n            write_fd = -1\n            writer.write(token)\n        return process\n    except Exception:\n        if process is not None and process.poll() is None:\n            process.kill()\n            process.wait()\n        raise\n    finally:\n        if read_fd >= 0: os.close(read_fd)\n        if write_fd >= 0: os.close(write_fd)\n"
    }
  ]
};
