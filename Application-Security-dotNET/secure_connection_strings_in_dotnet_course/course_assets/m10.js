window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Connection String Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Secure Connection String Baseline.",
  "narration": "A secure connection string baseline for .NET starts by treating connection strings as sensitive configuration. Keep credential-bearing values out of source code, sample files, logs, build artifacts, support screenshots, public configuration, and client-side assets.\n\nSeparate development, testing, staging, and production configuration. Understand configuration precedence, use placeholders in samples, and make it difficult for developers, pipelines, or deployments to connect to the wrong environment by accident.\n\nUse controlled secret stores or platform mechanisms in production. Prefer passwordless or managed identity patterns where they fit, but continue to apply least privilege to database identities and provider settings. Secret storage does not replace database authorization.\n\nReview provider options that affect transport, certificate trust, authentication mode, pooling, timeouts, and application labels. Protect EF Core migration and tooling workflows so they do not require unnecessary production credentials or leak migration connection strings in pipeline output.\n\nFinally, redact diagnostics and operational artifacts, inventory connection strings, plan rotation and revocation, clean up stale access, and prepare incident response. Secure connection string handling is a lifecycle discipline that connects configuration, database permissions, deployment, logging, and operations.",
  "narrationPoints": [
    "A secure connection string baseline for .NET starts by treating connection strings as sensitive configuration.",
    "Understand configuration precedence, use placeholders in samples, and make it difficult for developers, pipelines, or deployments to connect to the wrong environment by accident.",
    "Use controlled secret stores or platform mechanisms in production.",
    "Review provider options that affect transport, certificate trust, authentication mode, pooling, timeouts, and application labels.",
    "Secure connection string handling is a lifecycle discipline that connects configuration, database permissions, deployment, logging, and operations."
  ]
};
