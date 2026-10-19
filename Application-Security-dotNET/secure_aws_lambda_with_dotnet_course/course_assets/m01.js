window.COURSE_MODULE = {
  "title": "AWS Lambda Security Model for .NET Developers",
  "graphicAlt": "A .NET Lambda function validates events within boundaries shaped by permissions, package configuration and operations.",
  "narration": "AWS Lambda is serverless compute, but serverless does not remove application security responsibility. A .NET function still validates input, enforces authorization decisions, protects secrets, handles errors safely, and produces logs that are useful without exposing sensitive data.\n\nA Lambda function is shaped by more than handler code. The security result depends on the function code, handler design, event source, IAM role, resource-based policy, deployment package, dependencies, configuration, secrets, networking, logs, and operational process. Each of those pieces can change what the function can do and what data it can reach.\n\nLambda functions can process HTTP requests, queue messages, storage events, stream records, scheduled events, and service events. Each trigger creates a trust boundary. The function should not assume that data is safe only because it arrived through an AWS integration. It should validate the event and make decisions from trusted context.\n\nSecurity responsibility is shared across developer code, AWS platform configuration, IAM, deployment automation, monitoring, and incident response. A secure baseline starts by asking what invokes the function, what identity the function runs as, what data it reads or writes, what secrets it receives, and how retries and failures behave.",
  "narrationPoints": [
    "A .NET function still validates input, enforces authorization decisions, protects secrets, handles errors safely.",
    "AWS Lambda is serverless compute, but serverless does not remove application security responsibility.",
    "The security result depends on the function code, handler design, event source, IAM role, resource-based policy.",
    "The function should not assume that data is safe only because it arrived through an AWS integration.",
    "Security responsibility is shared across developer code, AWS platform configuration, IAM, deployment automation, monitoring."
  ]
};
