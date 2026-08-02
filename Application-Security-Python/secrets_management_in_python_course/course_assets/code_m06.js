window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secret Rotation and Lifecycle Management with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Support a bounded overlap during secret rotation",
      "language": "python",
      "blurb": "Fallback catches only a credential rejection and uses trusted, timezone-aware rotation metadata to enforce the retiring credential's deadline.",
      "code": "from collections.abc import Callable\nfrom dataclasses import dataclass\nfrom datetime import datetime, timezone\n\nclass CredentialRejected(Exception):\n    pass\n\n@dataclass(frozen=True)\nclass RotationSecrets:\n    current: str\n    retiring: str | None\n    overlap_ends_at: datetime | None\n\ndef connect_during_rotation(\n    connect: Callable[[str], object], secrets: RotationSecrets, now: datetime\n):\n    if now.tzinfo is None:\n        raise ValueError(\"timezone-aware current time is required\")\n    try:\n        return connect(secrets.current)\n    except CredentialRejected:\n        if (\n            secrets.retiring is None\n            or secrets.overlap_ends_at is None\n            or secrets.overlap_ends_at.tzinfo is None\n            or now.astimezone(timezone.utc) > secrets.overlap_ends_at.astimezone(timezone.utc)\n        ):\n            raise\n        return connect(secrets.retiring)\n"
    },
    {
      "title": "Invalidate a cached secret after rotation",
      "language": "python",
      "blurb": "Versioned cache entries are discarded as soon as the provider reports a different secret version.",
      "code": "class VersionedSecretCache:\n    def __init__(self):\n        self._entries: dict[str, tuple[str, bytes]] = {}\n\n    def update(self, name: str, version: str, value: bytes) -> None:\n        previous = self._entries.get(name)\n        if previous and previous[0] != version:\n            self._entries.pop(name)\n        self._entries[name] = (version, value)\n\n    def get(self, name: str, version: str) -> bytes | None:\n        entry = self._entries.get(name)\n        return entry[1] if entry and entry[0] == version else None\n"
    }
  ]
};
