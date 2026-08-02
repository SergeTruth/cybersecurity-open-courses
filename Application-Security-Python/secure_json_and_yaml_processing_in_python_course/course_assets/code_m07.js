window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Resource Limits and Parser Robustness through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Enforce strict JSON depth and node budgets",
      "language": "python",
      "blurb": "Byte-bounded decoding rejects NaN and infinity before an iterative walk limits aggregate nodes and nesting depth.",
      "code": "import json\n\ndef reject_nonstandard_number(value: str):\n    raise ValueError(f\"non-standard JSON number rejected: {value}\")\n\ndef bounded_json_tree(raw: bytes, max_nodes: int = 2000, max_depth: int = 20) -> object:\n    if len(raw) > 64_000:\n        raise ValueError(\"JSON byte limit exceeded\")\n    document = json.loads(raw.decode(\"utf-8\"), parse_constant=reject_nonstandard_number)\n    pending = [(document, 0)]\n    nodes = 0\n    while pending:\n        value, depth = pending.pop()\n        nodes += 1\n        if nodes > max_nodes or depth > max_depth:\n            raise ValueError(\"JSON complexity limit exceeded\")\n        if isinstance(value, dict):\n            pending.extend((item, depth + 1) for item in value.values())\n        elif isinstance(value, list):\n            pending.extend((item, depth + 1) for item in value)\n    return document\n"
    },
    {
      "title": "Read a YAML stream through size and document limits",
      "language": "python",
      "blurb": "The stream is capped before parsing, only one document is accepted, and the loaded value must be a mapping with a finite key count.",
      "code": "import yaml\n\ndef read_one_yaml_document(stream) -> dict[str, object]:\n    raw = stream.read(32_769)\n    if not raw or len(raw) > 32_768:\n        raise ValueError(\"YAML stream size rejected\")\n    documents = list(yaml.safe_load_all(raw.decode(\"utf-8\")))\n    if len(documents) != 1 or not isinstance(documents[0], dict):\n        raise ValueError(\"one YAML mapping required\")\n    if len(documents[0]) > 100 or any(not isinstance(key, str) for key in documents[0]):\n        raise ValueError(\"YAML mapping budget rejected\")\n    return documents[0]\n"
    }
  ]
};
