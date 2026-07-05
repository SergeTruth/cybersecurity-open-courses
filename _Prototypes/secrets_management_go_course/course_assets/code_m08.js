window.COURSE_CODE_MODULE = {
  "title": "Testing With Fake Providers",
  "codeIntro": "Unit tests should exercise secret behavior without calling production providers or using real credentials.",
  "codeExamples": [
    {
      "title": "Fake Provider for Unit Tests",
      "language": "go",
      "blurb": "A fake provider gives deterministic test values and can simulate missing secrets or provider errors.",
      "code": "package secrets_test\n\nimport (\n    \"context\"\n    \"errors\"\n    \"testing\"\n)\n\ntype fakeProvider map[string]string\n\nfunc (f fakeProvider) Get(ctx context.Context, name string) (string, error) {\n    value, ok := f[name]\n    if !ok {\n        return \"\", errors.New(\"secret not found\")\n    }\n    return value, nil\n}\n\nfunc TestLoadDatabasePassword(t *testing.T) {\n    provider := fakeProvider{\n        \"prod/database/password\": \"test-only-password\",\n    }\n\n    value, err := LoadDatabasePassword(context.Background(), provider)\n    if err != nil {\n        t.Fatal(err)\n    }\n    if value == \"\" {\n        t.Fatal(\"expected a non-empty test secret\")\n    }\n}"
    }
  ]
};
