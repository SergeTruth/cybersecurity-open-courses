window.COURSE_CODE_MODULE = {
  "title": "Keep Untrusted Data Inside the Record",
  "codeIntro": "The event name and severity remain server-controlled. A structured serializer represents the bounded username as a field value rather than part of the log-line grammar.",
  "codeExamples": [
    {
      "title": "Structured login failure",
      "language": "typescript",
      "blurb": "Reject overlong raw text before normalization. The 1,024-code-unit input bound limits normalization work; the output is capped at 128 Unicode code points without splitting a surrogate pair. This is a telemetry representation, not an authentication identifier. Downstream exporters and viewers must still encode it for their output formats.",
      "code": `function boundedUsername(value: unknown): string {
  if (typeof value !== "string" || value.length === 0 ||
      value.length > 1024) return "invalid";
  return Array.from(value.normalize("NFKC")).slice(0, 128).join("");
}

function recordLoginFailure(usernameInput: unknown, requestId: string): void {
  logger.warn({
    event: "login.failed",
    username: boundedUsername(usernameInput),
    requestId,
    outcome: "deny"
  });
}

// Avoid record syntax built from request-controlled text:
// logger.warn(\`Login failed for username=\${usernameInput}\`);`
    }
  ]
};
