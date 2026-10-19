window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Execution Roles, IAM, and Least Privilege' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Scope execution permissions to the operation and resource",
      "language": "json",
      "blurb": "IAM identity-policy fragment for an orders-reader workload. Replace fixed account/region/resource identifiers through reviewed deployment configuration. This is not its trust policy and grants no invocation permission.",
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"dynamodb:GetItem\"\n      ],\n      \"Resource\": \"arn:aws:dynamodb:us-east-1:123456789012:table/orders\"\n    }\n  ]\n}\n"
    },
    {
      "title": "Keep Lambda role assumption separate from permissions",
      "language": "json",
      "blurb": "IAM role trust-policy fragment. Only the Lambda service assumes this execution role. Restrict iam:PassRole in the deployment identity separately; application identities must not be able to attach broader roles.",
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"Service\": \"lambda.amazonaws.com\"\n      },\n      \"Action\": \"sts:AssumeRole\"\n    }\n  ]\n}\n"
    }
  ]
};
