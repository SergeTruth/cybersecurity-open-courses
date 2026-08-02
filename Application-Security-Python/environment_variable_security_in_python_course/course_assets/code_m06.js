window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Deployment, Containers, and CI/CD Environments with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Detect secret-shaped build arguments",
      "language": "python",
      "blurb": "The image build wrapper rejects names that would make credentials part of build history, cache metadata, or artifacts.",
      "code": "import re\n\nSECRET_NAME = re.compile(r\"(?:PASSWORD|TOKEN|SECRET|PRIVATE_KEY|API_KEY)$\", re.IGNORECASE)\n\ndef validate_build_arguments(arguments: dict[str, str]) -> None:\n    forbidden = sorted(name for name in arguments if SECRET_NAME.search(name))\n    if forbidden:\n        raise ValueError(f\"runtime secrets cannot be build arguments: {forbidden}\")\n"
    },
    {
      "title": "Import a constrained CI environment",
      "language": "python",
      "blurb": "The job reads only documented names and refuses a production deployment unless the CI system supplied its protected-context marker.",
      "code": "CI_ALLOWLIST = {\"CI_COMMIT_SHA\", \"CI_ENVIRONMENT\", \"CI_PROTECTED\"}\n\ndef deployment_context(environment: dict[str, str]) -> dict[str, str]:\n    context = {name: environment[name] for name in CI_ALLOWLIST if name in environment}\n    if context.get(\"CI_ENVIRONMENT\") == \"production\" and context.get(\"CI_PROTECTED\") != \"true\":\n        raise PermissionError(\"production deployment requires a protected CI context\")\n    return context\n"
    }
  ]
};
