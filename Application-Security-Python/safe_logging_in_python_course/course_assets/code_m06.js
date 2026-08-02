window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Log Injection, Integrity, and Trust with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Neutralize control characters in legacy text logs",
      "language": "python",
      "blurb": "When a text sink is unavoidable, CR, LF, tab, and other controls are escaped and the field is bounded.",
      "code": "def safe_log_text(value: object, maximum: int = 200) -> str:\n    text = str(value)[:maximum]\n    pieces = []\n    for character in text:\n        code = ord(character)\n        pieces.append(character if code >= 0x20 and not 0x7F <= code <= 0x9F else f\"\\\\u{code:04x}\")\n    return \"\".join(pieces)\n"
    },
    {
      "title": "Write one JSON object per event",
      "language": "python",
      "blurb": "Compact JSON encoding keeps event boundaries explicit and disallows non-finite numbers that downstream tooling may interpret inconsistently.",
      "code": "import json\n\ndef encode_log_event(event: dict[str, object]) -> str:\n    if \"event\" not in event or not isinstance(event[\"event\"], str):\n        raise ValueError(\"event name is required\")\n    return json.dumps(\n        event,\n        ensure_ascii=True,\n        allow_nan=False,\n        separators=(\",\", \":\"),\n        sort_keys=True,\n    ) + \"\\n\"\n"
    }
  ]
};
