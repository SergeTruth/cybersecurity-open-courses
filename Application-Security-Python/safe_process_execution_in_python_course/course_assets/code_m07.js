window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Least Privilege, Isolation, and Resource Controls with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Terminate an entire process group after timeout",
      "language": "python",
      "blurb": "In this POSIX-specific pattern, the child starts a new session; timeout handling signals the group, makes bounded wait/reap attempts, and preserves cleanup failures.",
      "code": "import os\nimport signal\nimport subprocess\n\ndef require_posix_process_group() -> None:\n    if os.name != \"posix\":\n        raise NotImplementedError(\"process-group termination requires POSIX\")\n\ndef signal_process_group(process: subprocess.Popen, signal_number: int) -> OSError | None:\n    try:\n        os.killpg(process.pid, signal_number)\n    except ProcessLookupError:\n        return None\n    except OSError as error:\n        return error\n    return None\n\ndef run_bounded(command: list[str]) -> int:\n    require_posix_process_group()\n    process = subprocess.Popen(command, start_new_session=True)\n    cleanup_error = None\n    try:\n        return process.wait(timeout=10)\n    except subprocess.TimeoutExpired:\n        cleanup_error = signal_process_group(process, signal.SIGTERM)\n        try:\n            return_code = process.wait(timeout=2)\n        except subprocess.TimeoutExpired:\n            second_error = signal_process_group(process, signal.SIGKILL)\n            if cleanup_error is None:\n                cleanup_error = second_error\n            try:\n                return_code = process.wait(timeout=2)\n            except subprocess.TimeoutExpired as timeout_error:\n                if cleanup_error is not None:\n                    raise cleanup_error\n                raise timeout_error\n        if cleanup_error is not None:\n            raise cleanup_error\n        return return_code\n"
    },
    {
      "title": "Refuse to run under an unexpected identity",
      "language": "python",
      "blurb": "A POSIX privileged launcher must transition before this worker starts; the application verifies its effective account and restrictive umask.",
      "code": "import os\n\ndef require_posix_identity_api() -> None:\n    if os.name != \"posix\":\n        raise NotImplementedError(\"POSIX identity verification requires pwd and geteuid\")\n\ndef verify_process_identity(expected_user: str) -> None:\n    require_posix_identity_api()\n    import pwd\n\n    actual = pwd.getpwuid(os.geteuid()).pw_name\n    if actual != expected_user or os.geteuid() == 0:\n        raise PermissionError(\"process identity violates least-privilege policy\")\n    previous = os.umask(0o077)\n    os.umask(previous)\n    if previous & 0o077 != 0o077:\n        raise PermissionError(\"process umask is too permissive\")\n"
    }
  ]
};
