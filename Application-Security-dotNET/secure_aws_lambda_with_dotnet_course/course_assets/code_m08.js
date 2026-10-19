window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Idempotency, Retries, Failures, and Dead Letters' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Atomically record idempotency with the DynamoDB business write",
      "language": "json",
      "blurb": "DynamoDB TransactWriteItems request specimen for one validated order event. Replace values only from the authenticated event-processing boundary. The marker and state update commit together. A duplicate marker requires a trusted consistent read and input-binding check, not blind success; external side effects need an outbox.",
      "code": "{\n  \"ClientRequestToken\": \"11111111-2222-4333-8444-555555555555\",\n  \"TransactItems\": [\n    {\n      \"Put\": {\n        \"TableName\": \"processed-events\",\n        \"Item\": {\n          \"EventId\": {\n            \"S\": \"event-123\"\n          },\n          \"OrderId\": {\n            \"S\": \"order-456\"\n          },\n          \"Quantity\": {\n            \"N\": \"2\"\n          }\n        },\n        \"ConditionExpression\": \"attribute_not_exists(EventId)\"\n      }\n    },\n    {\n      \"Update\": {\n        \"TableName\": \"orders\",\n        \"Key\": {\n          \"OrderId\": {\n            \"S\": \"order-456\"\n          }\n        },\n        \"UpdateExpression\": \"SET #status = :next\",\n        \"ConditionExpression\": \"attribute_exists(OrderId) AND #status = :expected\",\n        \"ExpressionAttributeNames\": {\n          \"#status\": \"Status\"\n        },\n        \"ExpressionAttributeValues\": {\n          \":next\": {\n            \"S\": \"accepted\"\n          },\n          \":expected\": {\n            \"S\": \"pending\"\n          }\n        }\n      }\n    }\n  ]\n}\n"
    },
    {
      "title": "Return only failed SQS message identifiers",
      "language": "json",
      "blurb": "Standard-queue Lambda response specimen, not a deployment template. IDs must be the exact MessageId values from the current batch. Configure ReportBatchItemFailures as shown in module 5. For FIFO queues, stop on the first failure and report failed plus unprocessed messages to preserve ordering.",
      "code": "{\n  \"batchItemFailures\": [\n    {\n      \"itemIdentifier\": \"11111111-2222-4333-8444-555555555555\"\n    }\n  ]\n}\n"
    }
  ]
};
