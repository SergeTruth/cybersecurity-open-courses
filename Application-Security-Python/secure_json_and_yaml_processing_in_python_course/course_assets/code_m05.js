window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Schema Validation and Type Normalization through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Normalize a strictly versioned object into a dataclass",
      "language": "python",
      "blurb": "The boundary requires an integer version exactly equal to one, every field, non-Boolean numeric types, a normalized email, and an immutable typed result.",
      "code": "from dataclasses import dataclass\nimport re\n\nEMAIL = re.compile(r\"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}\")\n\n@dataclass(frozen=True)\nclass Signup:\n    email: str\n    age: int\n    marketing: bool\n\ndef normalize_signup(value: object) -> Signup:\n    if not isinstance(value, dict) or set(value) != {\"version\", \"email\", \"age\", \"marketing\"}:\n        raise ValueError(\"signup shape rejected\")\n    version = value[\"version\"]\n    email = value[\"email\"].strip().casefold() if isinstance(value[\"email\"], str) else \"\"\n    if type(version) is not int or version != 1 or EMAIL.fullmatch(email) is None:\n        raise ValueError(\"signup identity rejected\")\n    if type(value[\"age\"]) is not int or not 13 <= value[\"age\"] <= 120:\n        raise ValueError(\"signup age rejected\")\n    if type(value[\"marketing\"]) is not bool:\n        raise ValueError(\"signup preference rejected\")\n    return Signup(email, value[\"age\"], value[\"marketing\"])\n"
    },
    {
      "title": "Validate nested YAML routes explicitly",
      "language": "python",
      "blurb": "Each route has an exact key set, bounded path, approved method, and Boolean authentication requirement; arbitrary nested mappings cannot pass through unchanged.",
      "code": "import re\n\nROUTE_PATH = re.compile(r\"/[a-z0-9/_-]{1,80}\")\n\ndef validate_routes(document: object) -> tuple[dict[str, object], ...]:\n    if not isinstance(document, dict) or set(document) != {\"routes\"}:\n        raise ValueError(\"route document rejected\")\n    routes = document[\"routes\"]\n    if not isinstance(routes, list) or not 1 <= len(routes) <= 50:\n        raise ValueError(\"route list rejected\")\n    validated = []\n    for route in routes:\n        if not isinstance(route, dict) or set(route) != {\"path\", \"method\", \"authenticated\"}:\n            raise ValueError(\"route shape rejected\")\n        if not isinstance(route[\"path\"], str) or ROUTE_PATH.fullmatch(route[\"path\"]) is None:\n            raise ValueError(\"route path rejected\")\n        if route[\"method\"] not in {\"GET\", \"POST\"} or type(route[\"authenticated\"]) is not bool:\n            raise ValueError(\"route policy rejected\")\n        validated.append(dict(route))\n    return tuple(validated)\n"
    }
  ]
};
