window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Rotation, Testing, Monitoring, and Incident Response with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reload rotating configuration atomically",
      "language": "python",
      "blurb": "A complete validated snapshot replaces the old one under a lock so readers never observe a partially updated environment.",
      "code": "from threading import RLock\n\nclass SettingsStore:\n    def __init__(self, initial):\n        self._lock = RLock()\n        self._settings = initial\n\n    def replace_from(self, environment: dict[str, str], loader) -> None:\n        candidate = loader(environment)\n        with self._lock:\n            self._settings = candidate\n\n    def current(self):\n        with self._lock:\n            return self._settings\n"
    },
    {
      "title": "Test that a child cannot inherit a secret",
      "language": "python",
      "blurb": "The regression launches a Python child with the production environment builder and asserts that a sentinel secret is absent.",
      "code": "import json\nimport subprocess\nimport sys\n\ndef assert_secret_not_inherited(build_environment) -> None:\n    parent = {\"APP_ENV\": \"test\", \"DATABASE_PASSWORD\": \"sentinel-secret\"}\n    child = subprocess.run(\n        [sys.executable, \"-c\", \"import os,json; print(json.dumps(dict(os.environ)))\"],\n        env=build_environment(parent),\n        text=True,\n        capture_output=True,\n        timeout=5,\n        check=True,\n    )\n    assert \"sentinel-secret\" not in child.stdout\n"
    }
  ]
};
