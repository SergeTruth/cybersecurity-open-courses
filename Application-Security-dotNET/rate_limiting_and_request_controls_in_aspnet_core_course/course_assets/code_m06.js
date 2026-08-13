window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Rejection Behavior, Queues, and Client Communication' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Create a bounded 429 response with Retry-After",
      "language": "csharp",
      "blurb": "The response accepts only a positive application-bounded delay, rounds it up to whole seconds without overflow, emits a fixed low-detail body, and keeps Retry-After separate from attacker-controlled text.",
      "code": "public sealed record RateLimitRejection(\n    int StatusCode,\n    int RetryAfterSeconds,\n    string Code);\n\npublic static class RateLimitRejectionResponse\n{\n    public static RateLimitRejection Create(TimeSpan retryAfter)\n    {\n        if (retryAfter <= TimeSpan.Zero || retryAfter > TimeSpan.FromHours(1))\n            throw new ArgumentOutOfRangeException(nameof(retryAfter));\n        var seconds = checked((int)Math.Ceiling(retryAfter.TotalSeconds));\n        return new RateLimitRejection(429, seconds, \"rate_limit_exceeded\");\n    }\n}\n"
    },
    {
      "title": "Keep limiter queues small and oldest-first",
      "language": "csharp",
      "blurb": "The immutable policy admits only bounded queue capacity and a short wait ceiling, always uses oldest-first service, and rejects configurations that would turn rate limiting into an unbounded memory queue or long-lived request backlog.",
      "code": "public sealed class LimiterQueuePolicy\n{\n    private LimiterQueuePolicy(int queueLimit, TimeSpan maximumWait)\n    {\n        QueueLimit = queueLimit;\n        MaximumWait = maximumWait;\n        ProcessingOrder = \"oldest-first\";\n    }\n\n    public int QueueLimit { get; }\n    public TimeSpan MaximumWait { get; }\n    public string ProcessingOrder { get; }\n\n    public static LimiterQueuePolicy Create(int queueLimit, TimeSpan maximumWait)\n    {\n        if (queueLimit is < 0 or > 100 || maximumWait < TimeSpan.Zero ||\n            maximumWait > TimeSpan.FromSeconds(10) || queueLimit == 0 && maximumWait != TimeSpan.Zero ||\n            queueLimit > 0 && maximumWait == TimeSpan.Zero)\n        {\n            throw new ArgumentException(\"Limiter queue policy rejected.\");\n        }\n        return new LimiterQueuePolicy(queueLimit, maximumWait);\n    }\n}\n"
    }
  ]
};
