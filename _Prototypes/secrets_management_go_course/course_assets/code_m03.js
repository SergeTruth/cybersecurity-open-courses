window.COURSE_CODE_MODULE = {
  "title": "Go Configuration Loading",
  "codeIntro": "These examples show startup validation without printing secret values.",
  "codeExamples": [
    {
      "title": "Required Secret Loader",
      "language": "go",
      "blurb": "Use os.LookupEnv so the loader can tell the difference between unset and intentionally empty values.",
      "code": "package config\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\ntype Config struct {\n    DBPassword string\n    APIToken   string\n}\n\nfunc requiredSecret(name string) (string, error) {\n    value, ok := os.LookupEnv(name)\n    if !ok || value == \"\" {\n        return \"\", fmt.Errorf(\"required secret %s is not configured\", name)\n    }\n    return value, nil\n}\n\nfunc Load() (Config, error) {\n    dbPassword, err := requiredSecret(\"DB_PASSWORD\")\n    if err != nil {\n        return Config{}, err\n    }\n    apiToken, err := requiredSecret(\"API_TOKEN\")\n    if err != nil {\n        return Config{}, err\n    }\n    return Config{DBPassword: dbPassword, APIToken: apiToken}, nil\n}"
    }
  ]
};
