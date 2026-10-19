window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'HTTP Exposure, Function URLs, and API Gateway' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Use an IAM-authenticated function URL",
      "language": "json",
      "blurb": "CloudFormation template for an existing function alias. Authentication remains AWS_IAM; the calling role also needs the approved invocation permissions. No permissive public resource-policy statement is added.",
      "code": "{\n  \"AWSTemplateFormatVersion\": \"2010-09-09\",\n  \"Resources\": {\n    \"PrivateUrl\": {\n      \"Type\": \"AWS::Lambda::Url\",\n      \"Properties\": {\n        \"TargetFunctionArn\": \"arn:aws:lambda:us-east-1:123456789012:function:orders-reader:production\",\n        \"AuthType\": \"AWS_IAM\",\n        \"InvokeMode\": \"BUFFERED\"\n      }\n    }\n  }\n}\n"
    },
    {
      "title": "Grant a caller only URL invocation on one function",
      "language": "json",
      "blurb": "Caller IAM identity-policy fragment. Current Lambda URLs require InvokeFunctionUrl plus InvokeFunction; the latter is restricted to URL invocation. IAM authentication does not replace order-level authorization inside the function.",
      "code": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": \"lambda:InvokeFunctionUrl\",\n      \"Resource\": \"arn:aws:lambda:us-east-1:123456789012:function:orders-reader:production\",\n      \"Condition\": {\n        \"StringEquals\": {\n          \"lambda:FunctionUrlAuthType\": \"AWS_IAM\"\n        }\n      }\n    },\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": \"lambda:InvokeFunction\",\n      \"Resource\": \"arn:aws:lambda:us-east-1:123456789012:function:orders-reader:production\",\n      \"Condition\": {\n        \"Bool\": {\n          \"lambda:InvokedViaFunctionUrl\": \"true\"\n        }\n      }\n    }\n  ]\n}\n"
    }
  ]
};
