window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe YAML Parsing Principles through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Apply an exact schema after safe YAML loading",
      "language": "python",
      "blurb": "Safe loading prevents arbitrary object construction, while explicit shape and value checks keep scalars, collections, and unknown configuration fields within policy.",
      "code": "import yaml\n\ndef parse_service_yaml(raw: bytes) -> dict[str, object]:\n    if not 1 <= len(raw) <= 16_384:\n        raise ValueError(\"YAML byte limit rejected\")\n    document = yaml.safe_load(raw.decode(\"utf-8\"))\n    if not isinstance(document, dict) or set(document) != {\"replicas\", \"region\", \"features\"}:\n        raise ValueError(\"service YAML shape rejected\")\n    if type(document[\"replicas\"]) is not int or not 1 <= document[\"replicas\"] <= 20:\n        raise ValueError(\"replica count rejected\")\n    if document[\"region\"] not in {\"us-east\", \"us-west\"}:\n        raise ValueError(\"service region rejected\")\n    features = document[\"features\"]\n    if not isinstance(features, list) or len(features) > 10 or any(item not in {\"audit\", \"metrics\"} for item in features):\n        raise ValueError(\"service feature list rejected\")\n    return document\n"
    },
    {
      "title": "Reject YAML aliases before construction",
      "language": "python",
      "blurb": "A token pass enforces alias and token budgets before safe loading, reducing amplification from alias-heavy documents as well as ordinary oversized input.",
      "code": "import yaml\nfrom yaml.tokens import AliasToken\n\ndef load_yaml_with_budgets(raw: bytes) -> object:\n    if len(raw) > 32_768:\n        raise ValueError(\"YAML document too large\")\n    text = raw.decode(\"utf-8\")\n    token_count = 0\n    alias_count = 0\n    for token in yaml.scan(text, Loader=yaml.SafeLoader):\n        token_count += 1\n        alias_count += isinstance(token, AliasToken)\n        if token_count > 4000 or alias_count > 20:\n            raise ValueError(\"YAML complexity budget exceeded\")\n    return yaml.safe_load(text)\n"
    }
  ]
};
