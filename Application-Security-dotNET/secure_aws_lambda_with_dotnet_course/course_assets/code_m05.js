window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Event Sources, Input Validation, and Data Boundaries' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Validate a queue message body before domain processing",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Call this on the Body of an SQS record delivered by the approved event-source mapping. It validates data, not the event producer identity; the queue resource policy and execution role establish that boundary.",
      "code": "using System.Text.Json;\npublic sealed record OrderMessage(Guid OrderId, int Quantity);\npublic static OrderMessage ParseOrderMessage(byte[] utf8)\n{\n    if (utf8 is null || utf8.Length is 0 or > 4096) throw new JsonException(\"Message byte limit.\");\n    using var document = JsonDocument.Parse(utf8, new JsonDocumentOptions { MaxDepth = 2 });\n    var root = document.RootElement;\n    if (root.ValueKind != JsonValueKind.Object) throw new JsonException(\"Object required.\");\n    var names = new HashSet<string>(StringComparer.Ordinal);\n    foreach (var p in root.EnumerateObject())\n        if (!names.Add(p.Name) || p.Name is not (\"orderId\" or \"quantity\")) throw new JsonException(\"Unexpected member.\");\n    if (names.Count != 2 || root.GetProperty(\"orderId\").ValueKind != JsonValueKind.String ||\n        !Guid.TryParseExact(root.GetProperty(\"orderId\").GetString(), \"D\", out var id) || id == Guid.Empty ||\n        root.GetProperty(\"quantity\").ValueKind != JsonValueKind.Number ||\n        !root.GetProperty(\"quantity\").TryGetInt32(out var quantity) || quantity is < 1 or > 100)\n        throw new JsonException(\"Invalid order message.\");\n    return new(id, quantity);\n}\n"
    },
    {
      "title": "Bound SQS batches and enable partial-failure responses",
      "language": "json",
      "blurb": "CloudFormation resource excerpt to merge into the reviewed stack. The standard queue, execution role permissions, visibility timeout, DLQ, and function already exist. The handler must return ReportBatchItemFailures responses and be idempotent.",
      "code": "{\n  \"Type\": \"AWS::Lambda::EventSourceMapping\",\n  \"Properties\": {\n    \"FunctionName\": \"arn:aws:lambda:us-east-1:123456789012:function:orders-reader:production\",\n    \"EventSourceArn\": \"arn:aws:sqs:us-east-1:123456789012:orders-events\",\n    \"BatchSize\": 10,\n    \"MaximumBatchingWindowInSeconds\": 0,\n    \"FunctionResponseTypes\": [\n      \"ReportBatchItemFailures\"\n    ],\n    \"ScalingConfig\": {\n      \"MaximumConcurrency\": 5\n    },\n    \"Enabled\": true\n  }\n}\n"
    }
  ]
};
