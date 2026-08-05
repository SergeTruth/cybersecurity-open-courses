window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Object Mapping, Mass Assignment, and Configuration Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map public profile fields explicitly",
      "language": "python",
      "blurb": "The constructor rejects unknown keys and maps validated public values one by one, preventing password hashes, roles, or internal flags from being mass-assigned.",
      "code": "from dataclasses import dataclass\nimport unicodedata\n\n@dataclass(frozen=True)\nclass ProfileUpdate:\n    display_name: str\n    locale: str\n\ndef has_control_character(value: str) -> bool:\n    return any(unicodedata.category(character)[0] == \"C\" for character in value)\n\ndef profile_update(document: object) -> ProfileUpdate:\n    if not isinstance(document, dict) or set(document) != {\"display_name\", \"locale\"}:\n        raise ValueError(\"profile update shape rejected\")\n    name, locale = document[\"display_name\"], document[\"locale\"]\n    if not isinstance(name, str):\n        raise ValueError(\"display name rejected\")\n    display_name = name.strip()\n    if not 1 <= len(display_name) <= 80 or has_control_character(display_name):\n        raise ValueError(\"display name rejected\")\n    if not isinstance(locale, str) or locale not in {\"en-US\", \"en-CA\", \"fr-CA\"}:\n        raise ValueError(\"locale rejected\")\n    return ProfileUpdate(display_name, locale)\n"
    },
    {
      "title": "Accept only a finite application configuration",
      "language": "python",
      "blurb": "The recursive structure is expressed as exact mappings and scalar types, so undeclared nested values cannot become driver options, code paths, or secrets.",
      "code": "def validate_application_config(document: object) -> dict[str, object]:\n    if not isinstance(document, dict) or set(document) != {\"database\", \"logging\"}:\n        raise ValueError(\"application configuration rejected\")\n    database = document[\"database\"]\n    logging = document[\"logging\"]\n    if not isinstance(database, dict) or set(database) != {\"host_ref\", \"pool_size\"}:\n        raise ValueError(\"database configuration rejected\")\n    host_ref = database[\"host_ref\"]\n    pool_size = database[\"pool_size\"]\n    if not isinstance(host_ref, str) or host_ref != \"config://production/orders-db\":\n        raise ValueError(\"database reference rejected\")\n    if type(pool_size) is not int or not 1 <= pool_size <= 20:\n        raise ValueError(\"database pool size rejected\")\n    if not isinstance(logging, dict) or set(logging) != {\"level\"}:\n        raise ValueError(\"logging configuration rejected\")\n    level = logging[\"level\"]\n    if not isinstance(level, str) or level not in {\"INFO\", \"WARNING\"}:\n        raise ValueError(\"logging configuration rejected\")\n    return {\"database\": {\"host_ref\": host_ref, \"pool_size\": pool_size}, \"logging\": {\"level\": level}}\n"
    }
  ]
};
