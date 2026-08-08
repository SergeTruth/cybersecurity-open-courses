window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Deployment, Containers, and CI/CD Environments with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Detect secret-shaped build arguments",
      "language": "python",
      "blurb": "The image build wrapper rejects names that would make credentials part of build history, cache metadata, or artifacts.",
      "code": "import re\n\nALLOWED_BUILD_ARGUMENTS = frozenset(\n    {\"APP_ENV\", \"RELEASE_ID\", \"PUBLIC_ASSET_ORIGIN\"}\n)\nAPP_ENVIRONMENTS = frozenset({\"development\", \"staging\", \"production\"})\nPUBLIC_ASSET_ORIGINS = frozenset({\"https://assets.example.com\"})\nRELEASE_ID = re.compile(r\"[0-9a-f]{40}\", re.ASCII)\n\ndef validate_build_arguments(arguments: dict[str, str]) -> None:\n    if type(arguments) is not dict or not set(arguments) <= ALLOWED_BUILD_ARGUMENTS:\n        raise ValueError(\"build arguments contain an undocumented field\")\n    if any(type(value) is not str for value in arguments.values()):\n        raise TypeError(\"build argument values must be text\")\n    if (\n        \"APP_ENV\" in arguments\n        and arguments[\"APP_ENV\"] not in APP_ENVIRONMENTS\n    ):\n        raise ValueError(\"APP_ENV build argument is invalid\")\n    if (\n        \"RELEASE_ID\" in arguments\n        and RELEASE_ID.fullmatch(arguments[\"RELEASE_ID\"]) is None\n    ):\n        raise ValueError(\"RELEASE_ID build argument is invalid\")\n    if (\n        \"PUBLIC_ASSET_ORIGIN\" in arguments\n        and arguments[\"PUBLIC_ASSET_ORIGIN\"] not in PUBLIC_ASSET_ORIGINS\n    ):\n        raise ValueError(\"PUBLIC_ASSET_ORIGIN build argument is invalid\")\n"
    },
    {
      "title": "Import a constrained CI environment",
      "language": "python",
      "blurb": "The job reads only documented names and refuses a production deployment unless the CI system supplied its protected-context marker.",
      "code": "from collections.abc import Mapping\nimport re\n\nCI_ALLOWLIST = {\"CI_COMMIT_SHA\", \"CI_ENVIRONMENT\", \"CI_PROTECTED\"}\nCOMMIT_SHA = re.compile(r\"(?:[0-9a-f]{40}|[0-9a-f]{64})\\Z\")\nCI_ENVIRONMENTS = {\"development\", \"staging\", \"production\"}\n\ndef deployment_context(environment: Mapping[str, str]) -> dict[str, str]:\n    if not isinstance(environment, Mapping):\n        raise TypeError(\"CI environment mapping required\")\n    commit = environment.get(\"CI_COMMIT_SHA\")\n    deployment = environment.get(\"CI_ENVIRONMENT\")\n    protected = environment.get(\"CI_PROTECTED\")\n    if (\n        not isinstance(commit, str)\n        or COMMIT_SHA.fullmatch(commit) is None\n        or deployment not in CI_ENVIRONMENTS\n        or protected not in {\"true\", \"false\"}\n    ):\n        raise ValueError(\"CI deployment context rejected\")\n    if deployment == \"production\" and protected != \"true\":\n        raise PermissionError(\"production deployment requires a protected CI context\")\n    return {\n        \"CI_COMMIT_SHA\": commit,\n        \"CI_ENVIRONMENT\": deployment,\n        \"CI_PROTECTED\": protected,\n    }\n"
    }
  ]
};
