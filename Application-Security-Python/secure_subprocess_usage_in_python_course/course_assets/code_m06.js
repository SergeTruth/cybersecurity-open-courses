window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Environment Variables, Secrets, and Inherited State through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Construct a minimal child environment",
      "language": "python",
      "blurb": "The child receives only application-owned locale, path, and mode values; a caller-supplied PATH, preload variable, credential, or debugging flag cannot be inherited.",
      "code": "def child_environment(environment: str) -> dict[str, str]:\n    modes = {\"production\": \"prod\", \"staging\": \"stage\"}\n    mode = modes.get(environment)\n    if mode is None:\n        raise ValueError(\"child environment rejected\")\n    return {\n        \"PATH\": \"/usr/bin:/bin\",\n        \"LANG\": \"C.UTF-8\",\n        \"LC_ALL\": \"C.UTF-8\",\n        \"APP_MODE\": mode,\n    }\n"
    },
    {
      "title": "Deliver a secret to an application-owned verifier through stdin",
      "language": "python",
      "blurb": "The credential reaches a separately deployed application helper through a bounded input pipe, remaining absent from argv, environment, output, and diagnostic logs.",
      "code": "import subprocess\n\ndef verify_with_secret(secret: bytes, challenge: str) -> bool:\n    if not 16 <= len(secret) <= 4096 or \"\\x00\" in challenge or not 1 <= len(challenge) <= 128:\n        raise ValueError(\"verification input rejected\")\n    completed = subprocess.run(\n        [\"/opt/orders/bin/credential-check\", \"--challenge\", challenge, \"--secret-stdin\"],\n        input=secret,\n        stdout=subprocess.DEVNULL,\n        stderr=subprocess.DEVNULL,\n        shell=False,\n        timeout=3,\n        check=False,\n        env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C\"},\n    )\n    return completed.returncode == 0\n"
    }
  ]
};
