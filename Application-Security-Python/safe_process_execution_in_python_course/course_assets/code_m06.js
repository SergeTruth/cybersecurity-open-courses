window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Variables, Secrets, and Credentials with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct a minimal child environment",
      "language": "python",
      "blurb": "A small locale and proxy-free environment replaces inherited process state, including credentials and behavior-changing Python variables.",
      "code": "def child_environment(service_origin: str) -> dict[str, str]:\n    if not service_origin.startswith(\"https://api.example/\"):\n        raise ValueError(\"service origin rejected\")\n    return {\n        \"LANG\": \"C.UTF-8\",\n        \"LC_ALL\": \"C.UTF-8\",\n        \"NO_PROXY\": \"*\",\n        \"SERVICE_ORIGIN\": service_origin,\n    }\n"
    },
    {
      "title": "Pass a credential through a dedicated descriptor",
      "language": "python",
      "blurb": "The secret is written to an inherited pipe descriptor instead of command arguments, broad environment state, or temporary files.",
      "code": "import os\nimport subprocess\n\ndef launch_with_token(token: bytes):\n    if not 1 <= len(token) <= 4096:\n        raise ValueError(\"token length rejected\")\n    read_fd, write_fd = os.pipe()\n    try:\n        process = subprocess.Popen(\n            [\"/usr/local/bin/report-client\", \"--token-fd\", str(read_fd)],\n            pass_fds=(read_fd,),\n            env={\"PATH\": \"/usr/local/bin:/usr/bin\", \"LANG\": \"C.UTF-8\"},\n        )\n        os.close(read_fd); read_fd = -1\n        with os.fdopen(write_fd, \"wb\") as writer:\n            write_fd = -1\n            writer.write(token)\n        return process\n    finally:\n        if read_fd >= 0: os.close(read_fd)\n        if write_fd >= 0: os.close(write_fd)\n"
    }
  ]
};
