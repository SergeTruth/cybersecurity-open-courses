window.COURSE_MODULE = {
  "title": "Environment Separation, Deployment, and CI/CD Controls",
  "graphicAlt": "Build, preview and production scopes keep credentials distinct, with reviewed changes and code and configuration rollback planning.",
  "narration": "Configuration is part of release management. Development, test, staging, and production should have clearly separated values and credentials. Production configuration should not be copied into local development or broad test environments unless there is a documented, controlled need. A code change and a configuration change may be deployed together, but only one may be visible in a pull request. That is why high-risk configuration changes need review, approval, logging, and rollback planning.\n\nCI/CD systems may hold powerful deployment credentials, registry tokens, cloud permissions, secret-management access, and environment variables. Avoid exposing production configuration to untrusted pull requests, forks, preview builds, or broad build jobs. Scope variables and credentials to the workflow, branch, environment, repository, or deployment target that needs them. Build jobs that only install dependencies should not automatically inherit production deployment secrets.\n\nContainers and serverless platforms make configuration delivery convenient, but they can also hide drift. Avoid baking secrets into images or build artifacts. Promotion between environments should make configuration differences visible rather than relying on undocumented console settings. Rollback plans should account for both code and configuration changes. If a release fails because of a setting, operators need to know whether to roll back code, revert configuration, rotate a secret, or all three.",
  "narrationPoints": [
    "Production configuration should not be copied into local development or broad test environments unless there is a documented, controlled need.",
    "CI/CD systems may hold powerful deployment credentials, registry tokens, cloud permissions, secret-management access, and environment variables.",
    "If a release fails because of a setting, operators need to know whether to roll back code, revert configuration, rotate a secret, or all three.",
    "Build jobs that only install dependencies should not automatically inherit production deployment secrets.",
    "That is why high-risk configuration changes need review, approval, logging, and rollback planning.",
    "Scope variables and credentials to the workflow, branch, environment, repository, or deployment target that needs them."
  ]
};
