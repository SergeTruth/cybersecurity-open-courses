window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Concurrency, Resource Limits, Logging, and Monitoring' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Bound Lambda concurrency and execution resources",
      "language": "json",
      "blurb": "CloudFormation AWS::Lambda::Function resource excerpt for a managed .NET 8 ZIP deployment, not a generic ASP.NET container. The approved package must supply Orders.Function.FunctionHandler with the matching signature and required serializer. IAM, queue/DLQ, networking, and log-retention resources are separate reviewed stack inputs.",
      "code": "{\n  \"Type\": \"AWS::Lambda::Function\",\n  \"Properties\": {\n    \"FunctionName\": \"orders-reader\",\n    \"Runtime\": \"dotnet8\",\n    \"Architectures\": [\n      \"x86_64\"\n    ],\n    \"Handler\": \"Orders::Orders.Function::FunctionHandler\",\n    \"Role\": \"arn:aws:iam::123456789012:role/orders-reader-runtime\",\n    \"Code\": {\n      \"S3Bucket\": \"approved-orders-artifacts\",\n      \"S3Key\": \"orders/1.0.0/function.zip\",\n      \"S3ObjectVersion\": \"REPLACE_WITH_APPROVED_IMMUTABLE_VERSION\"\n    },\n    \"Timeout\": 10,\n    \"MemorySize\": 512,\n    \"EphemeralStorage\": {\n      \"Size\": 512\n    },\n    \"ReservedConcurrentExecutions\": 10,\n    \"LoggingConfig\": {\n      \"LogFormat\": \"JSON\",\n      \"ApplicationLogLevel\": \"INFO\",\n      \"SystemLogLevel\": \"WARN\"\n    }\n  }\n}\n"
    },
    {
      "title": "Bound cooperative work using the remaining invocation budget",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Pass ILambdaContext.RemainingTime from the real Lambda handler. Reserve time for response serialization. Cooperative cancellation is not proof a side effect did not commit; durable operation IDs are still needed for retries.",
      "code": "public static async Task<T> WithinInvocationBudget<T>(TimeSpan remainingTime, Func<CancellationToken, Task<T>> trustedOperation, CancellationToken shutdown)\n{\n    var reserve = TimeSpan.FromSeconds(1);\n    if (remainingTime <= reserve || remainingTime > TimeSpan.FromMinutes(15)) throw new TimeoutException(\"Invocation budget unavailable.\");\n    using var deadline = CancellationTokenSource.CreateLinkedTokenSource(shutdown);\n    deadline.CancelAfter(remainingTime - reserve);\n    var result = await trustedOperation(deadline.Token);\n    deadline.Token.ThrowIfCancellationRequested();\n    return result;\n}\n// Pass this token to bounded SDK calls and avoid retries that exceed the shared invocation budget.\n"
    }
  ]
};
