window.COURSE_CODE_MODULE = {
  "title": "Resolve keys inside the configured trust boundary",
  "codeIntro": "Conceptual pseudocode. Initialize the key resolver once at application startup using a maintained library's documented controls.",
  "codeExamples": [
    {
      "title": "Use a configured source and bounded refresh",
      "language": "typescript",
      "blurb": "The URL comes from trusted deployment configuration. Cache age and timeout values must follow issuer policy and operational requirements; never construct the URL from JWT headers.",
      "code": "const keyUrl = new URL(config.trustedJwksUrl);\nif (keyUrl.protocol !== \"https:\") {\n  throw new Error(\"Trusted key source must use HTTPS\");\n}\n\nconst trustedKeySource = createCachedJwksResolver({\n  url: keyUrl,\n  cacheMaxAgeMs: config.keyCacheMaxAgeMs,\n  timeoutMs: config.keyFetchTimeoutMs,\n  maxResponseBytes: config.maxKeySetBytes,\n  refreshCooldownMs: config.keyRefreshCooldownMs,\n  coalesceConcurrentRefreshes: true\n});\n\n// kid selects only within this trusted issuer's key set.\n// No matching key after bounded refresh => authentication fails."
    }
  ]
};
