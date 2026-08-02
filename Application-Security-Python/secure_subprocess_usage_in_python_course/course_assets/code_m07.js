window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Timeouts, Resource Controls, and Error Handling through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Enforce output and wall-clock limits concurrently",
      "language": "python",
      "blurb": "Nonblocking selector reads share one monotonic deadline with process completion; every failure kills and reaps the POSIX process group.",
      "code": "import os\nimport selectors\nimport signal\nimport subprocess\nfrom time import monotonic\n\ndef bounded_output(command: list[str], maximum: int = 1_000_000, seconds: float = 3.0) -> bytes:\n    if os.name != \"posix\" or seconds <= 0 or maximum < 0:\n        raise ValueError(\"POSIX process limits required\")\n    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, start_new_session=True)\n    assert process.stdout is not None\n    descriptor = process.stdout.fileno()\n    os.set_blocking(descriptor, False)\n    selector = selectors.DefaultSelector()\n    selector.register(descriptor, selectors.EVENT_READ)\n    deadline = monotonic() + seconds\n    output = bytearray()\n    try:\n        while selector.get_map():\n            remaining = deadline - monotonic()\n            if remaining <= 0:\n                raise TimeoutError(\"child deadline exceeded\")\n            for key, _ in selector.select(min(remaining, 0.1)):\n                chunk = os.read(key.fd, 65_536)\n                if not chunk:\n                    selector.unregister(key.fd)\n                elif len(output) + len(chunk) > maximum:\n                    raise ValueError(\"child output limit exceeded\")\n                else:\n                    output.extend(chunk)\n        try:\n            return_code = process.wait(timeout=max(0.001, deadline - monotonic()))\n        except subprocess.TimeoutExpired:\n            raise TimeoutError(\"child deadline exceeded\") from None\n        if return_code != 0:\n            raise RuntimeError(\"child failed\")\n        return bytes(output)\n    finally:\n        selector.close()\n        if process.poll() is None:\n            try:\n                os.killpg(process.pid, signal.SIGKILL)\n            except ProcessLookupError:\n                pass\n        process.wait()\n        process.stdout.close()\n"
    },
    {
      "title": "Apply operating-system limits through a fixed launcher",
      "language": "python",
      "blurb": "A Linux prlimit launcher caps CPU time, address space, output files, and descriptors before the fixed renderer begins work, without a thread-unsafe preexec hook.",
      "code": "import subprocess\n\ndef render_untrusted_document(source) -> subprocess.Popen[bytes]:\n    return subprocess.Popen(\n        [\n            \"/usr/bin/prlimit\",\n            \"--cpu=2:2\",\n            \"--as=268435456:268435456\",\n            \"--fsize=8388608:8388608\",\n            \"--nofile=32:32\",\n            \"--\",\n            \"/usr/bin/pdftotext\",\n            \"-\",\n            \"-\",\n        ],\n        stdin=source,\n        stdout=subprocess.PIPE,\n        stderr=subprocess.DEVNULL,\n        shell=False,\n        start_new_session=True,\n        close_fds=True,\n        env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n    )\n"
    }
  ]
};
