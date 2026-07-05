window.COURSE_CODE_MODULE = {
  "title": "Cache Refresh Shape",
  "codeIntro": "This example sketches cache behavior without tying the service to one vendor or provider SDK.",
  "codeExamples": [
    {
      "title": "Use Cache Until Expiry, Then Refresh",
      "language": "go",
      "blurb": "The important behavior is explicit: valid cached values can be used, expired values must be refreshed or fail closed.",
      "code": "package secrets\n\nimport (\n    \"context\"\n    \"errors\"\n    \"sync\"\n    \"time\"\n)\n\ntype CachedSecret struct {\n    mu        sync.RWMutex\n    value     string\n    expiresAt time.Time\n    provider  Provider\n    name      string\n}\n\nfunc (c *CachedSecret) Get(ctx context.Context) (string, error) {\n    c.mu.RLock()\n    if c.value != \"\" && time.Now().Before(c.expiresAt) {\n        defer c.mu.RUnlock()\n        return c.value, nil\n    }\n    c.mu.RUnlock()\n\n    c.mu.Lock()\n    defer c.mu.Unlock()\n\n    value, err := c.provider.Get(ctx, c.name)\n    if err != nil {\n        return \"\", errors.New(\"secret refresh failed\")\n    }\n    c.value = value\n    c.expiresAt = time.Now().Add(15 * time.Minute)\n    return c.value, nil\n}"
    }
  ]
};
