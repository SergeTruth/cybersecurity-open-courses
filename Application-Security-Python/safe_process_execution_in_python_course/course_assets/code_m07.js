window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Least Privilege, Isolation, and Resource Controls with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Terminate an entire process group after timeout",
      "language": "python",
      "blurb": "The child starts a new session; timeout handling signals the group, waits briefly, then confirms forced termination.",
      "code": "import os\nimport signal\nimport subprocess\n\ndef run_bounded(command: list[str]) -> int:\n    process = subprocess.Popen(command, start_new_session=True)\n    try:\n        return process.wait(timeout=10)\n    except subprocess.TimeoutExpired:\n        os.killpg(process.pid, signal.SIGTERM)\n        try:\n            return process.wait(timeout=2)\n        except subprocess.TimeoutExpired:\n            os.killpg(process.pid, signal.SIGKILL)\n            return process.wait(timeout=2)\n"
    },
    {
      "title": "Refuse to run under an unexpected identity",
      "language": "python",
      "blurb": "A privileged launcher must transition before this worker starts; the application verifies its effective account and restrictive umask.",
      "code": "import os\nimport pwd\n\ndef verify_process_identity(expected_user: str) -> None:\n    actual = pwd.getpwuid(os.geteuid()).pw_name\n    if actual != expected_user or os.geteuid() == 0:\n        raise PermissionError(\"process identity violates least-privilege policy\")\n    previous = os.umask(0o077)\n    os.umask(previous)\n    if previous & 0o077 != 0o077:\n        raise PermissionError(\"process umask is too permissive\")\n"
    }
  ]
};
