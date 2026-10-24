window.COURSE_MODULE = {
  "title": "Environment Variables, .env Files, and Runtime Loading",
  "graphicAlt": "Runtime delivery and local development use documented variables with environment separation and no full environment dumps.",
  "narration": "Environment-based configuration is normal in Node.js projects. process.env is widely used, and .env files are common during local development. The lesson is not to ban those workflows. The lesson is to use them intentionally. Real .env files containing sensitive values should not be committed to source control, and repositories should provide a .env.example file or documented variable list that names required configuration without containing production secrets.\n\nDevelopment, test, staging, and production should use different values where appropriate. A developer may need a local database URL, but should not need production credentials. A test environment may need mock service endpoints, but production should not accidentally inherit them. Environment variables are a delivery mechanism, not a complete configuration governance system or secrets management system. They do not automatically provide approval, rotation, auditing, least privilege, or redaction.\n\nBe careful with inherited variables, missing variables, unexpected variables, and platform differences. A value may exist on a developer's workstation but not in CI. A boolean string may be interpreted incorrectly. A shell variable may override what the deployment intended. Startup code should avoid dumping the full environment to logs or error reports. Operators need clear validation failures, not secrets printed into log platforms.",
  "narrationPoints": [
    "Real .env files containing sensitive values should not be committed to source control, and repositories should provide a .env.example file or documented variable list that names required configuration without containing production secrets.",
    "A test environment may need mock service endpoints, but production should not accidentally inherit them.",
    "Operators need clear validation failures, not secrets printed into log platforms.",
    "Environment-based configuration is normal in Node.js projects. process.env is widely used, and .env files are common during local development.",
    "Environment variables are a delivery mechanism, not a complete configuration governance system or secrets management system.",
    "Startup code should avoid dumping the full environment to logs or error reports."
  ]
};
