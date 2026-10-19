window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secrets, Environment Variables, and Configuration' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Put a secret reference, not secret material, in configuration",
      "language": "json",
      "blurb": "AWS Lambda Environment property fragment. The function resolves this fixed ARN through the AWS SDK using its execution role. Never treat a request-supplied ARN as authorization to retrieve a secret; do not log resolved values.",
      "code": "{\n  \"Variables\": {\n    \"ORDERS_SECRET_ARN\": \"arn:aws:secretsmanager:us-east-1:123456789012:secret:orders/runtime-AbCdEf\",\n    \"ORDERS_REGION\": \"us-east-1\"\n  }\n}\n"
    },
    {
      "title": "Limit secret retrieval to one approved secret",
      "language": "json",
      "blurb": "IAM identity-policy fragment for a workload that needs this secret. A customer-managed KMS key additionally requires narrowly scoped kms:Decrypt permission and key policy. Rotation and a bounded SDK call/caching policy are required in application code.",
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": \"secretsmanager:GetSecretValue\",\n      \"Resource\": \"arn:aws:secretsmanager:us-east-1:123456789012:secret:orders/runtime-AbCdEf\"\n    }\n  ]\n}\n"
    }
  ]
};
