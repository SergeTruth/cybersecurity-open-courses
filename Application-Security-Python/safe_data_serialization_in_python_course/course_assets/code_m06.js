window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply YAML, XML, and Advanced Format Features with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Validate YAML as ordinary configuration data",
      "language": "python",
      "blurb": "Requires PyYAML. Safe loading is followed by duplicate-key rejection, an exact mapping schema, scalar type checks, and a source-size limit.",
      "code": "import yaml\n\nclass UniqueKeySafeLoader(yaml.SafeLoader):\n    pass\n\ndef construct_mapping_without_duplicates(loader, node, deep=False):\n    loader.flatten_mapping(node)\n    mapping = {}\n    for key_node, value_node in node.value:\n        key = loader.construct_object(key_node, deep=deep)\n        if key in mapping:\n            raise ValueError(f\"duplicate YAML field: {key}\")\n        mapping[key] = loader.construct_object(value_node, deep=deep)\n    return mapping\n\nUniqueKeySafeLoader.add_constructor(\n    yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,\n    construct_mapping_without_duplicates,\n)\n\ndef parse_service_yaml(raw: bytes) -> dict[str, object]:\n    if len(raw) > 131_072:\n        raise ValueError(\"YAML input is too large\")\n    value = yaml.load(raw, Loader=UniqueKeySafeLoader)\n    if not isinstance(value, dict) or set(value) != {\"service\", \"replicas\"}:\n        raise ValueError(\"YAML schema mismatch\")\n    if not isinstance(value[\"service\"], str) or type(value[\"replicas\"]) is not int:\n        raise TypeError(\"YAML field types are invalid\")\n    if not 1 <= value[\"replicas\"] <= 20:\n        raise ValueError(\"replica count is outside policy\")\n    return value\n"
    },
    {
      "title": "Parse fully constrained XML without external entities",
      "language": "python",
      "blurb": "Requires defusedxml. The bounded parser requires two flat, attribute-free children with no unexpected text or tails.",
      "code": "from defusedxml.ElementTree import fromstring\n\ndef parse_status_xml(raw: bytes) -> dict[str, str]:\n    if len(raw) > 64_000:\n        raise ValueError(\"XML input is too large\")\n    root = fromstring(raw)\n    if (\n        root.tag != \"status\"\n        or root.attrib\n        or len(root) != 2\n        or (root.text and root.text.strip())\n    ):\n        raise ValueError(\"XML root structure rejected\")\n    fields = {}\n    for child in root:\n        if child.attrib or len(child) or (child.tail and child.tail.strip()):\n            raise ValueError(\"XML child structure rejected\")\n        text = child.text or \"\"\n        if child.tag not in {\"code\", \"message\"} or not 1 <= len(text) <= 200:\n            raise ValueError(\"XML child value rejected\")\n        if child.tag in fields:\n            raise ValueError(\"duplicate XML child\")\n        fields[child.tag] = text\n    if set(fields) != {\"code\", \"message\"}:\n        raise ValueError(\"XML fields rejected\")\n    return fields\n"
    }
  ]
};
