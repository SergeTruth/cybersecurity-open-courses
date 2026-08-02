window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Configuration, Environment Variables, and Boundaries with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Resolve a secret reference through a provider",
      "language": "python",
      "blurb": "Configuration contains a reference while the provider supplies the secret only to the component that needs it.",
      "code": "from typing import Protocol\n\nclass SecretProvider(Protocol):\n    def read(self, reference: str) -> bytes: ...\n\ndef database_password(config: dict[str, str], provider: SecretProvider) -> bytes:\n    reference = config.get(\"database_password_ref\")\n    if not reference or not reference.startswith(\"vault://production/\"):\n        raise ValueError(\"approved secret reference required\")\n    return provider.read(reference)\n"
    },
    {
      "title": "Allow only an exact secret-free configuration schema",
      "language": "python",
      "blurb": "The validator accepts one explicit provider, database-reference structure, and finite Boolean feature map, so undeclared nested fields cannot carry embedded credentials or secrets.",
      "code": "APPROVED_DATABASE_HOSTS = {\"db.internal.example\"}\nAPPROVED_FEATURES = {\"audit_events\", \"new_checkout\", \"read_only_mode\"}\n\ndef validate_secret_boundaries(config: object) -> None:\n    if not isinstance(config, dict) or set(config) != {\"secret_provider\", \"database\", \"features\"}:\n        raise ValueError(\"configuration shape rejected\")\n    if config[\"secret_provider\"] != \"vault\":\n        raise ValueError(\"approved secret provider required\")\n\n    database = config[\"database\"]\n    if not isinstance(database, dict) or set(database) != {\"host\", \"port\", \"password_ref\"}:\n        raise ValueError(\"database configuration shape rejected\")\n    host = database[\"host\"]\n    if not isinstance(host, str) or host not in APPROVED_DATABASE_HOSTS:\n        raise ValueError(\"database host rejected\")\n    if type(database[\"port\"]) is not int or database[\"port\"] != 5432:\n        raise ValueError(\"database port rejected\")\n    password_ref = database[\"password_ref\"]\n    reference_prefix = \"vault://production/database/\"\n    if (\n        not isinstance(password_ref, str)\n        or not password_ref.startswith(reference_prefix)\n        or not password_ref.removeprefix(reference_prefix)\n    ):\n        raise ValueError(\"approved database secret reference required\")\n\n    features = config[\"features\"]\n    if not isinstance(features, dict) or set(features) - APPROVED_FEATURES:\n        raise ValueError(\"feature configuration shape rejected\")\n    if any(type(enabled) is not bool for enabled in features.values()):\n        raise ValueError(\"feature values must be Boolean\")\n"
    }
  ]
};
