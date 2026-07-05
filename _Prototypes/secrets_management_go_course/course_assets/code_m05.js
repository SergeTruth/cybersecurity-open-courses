window.COURSE_CODE_MODULE = {
  "title": "Provider Interface Pattern",
  "codeIntro": "A small interface keeps provider-specific SDK code at the edge and makes tests safer.",
  "codeExamples": [
    {
      "title": "Context-Aware Secret Provider",
      "language": "go",
      "blurb": "Application code can depend on a provider contract instead of a specific managed-store SDK.",
      "code": "package secrets\n\nimport (\n    \"context\"\n    \"time\"\n)\n\ntype Provider interface {\n    Get(ctx context.Context, name string) (string, error)\n}\n\nfunc LoadDatabasePassword(parent context.Context, provider Provider) (string, error) {\n    ctx, cancel := context.WithTimeout(parent, 3*time.Second)\n    defer cancel()\n\n    return provider.Get(ctx, \"prod/database/password\")\n}"
    }
  ]
};
