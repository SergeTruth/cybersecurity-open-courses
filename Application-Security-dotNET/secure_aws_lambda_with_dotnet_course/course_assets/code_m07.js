window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Networking, VPC Access, and Service Boundaries' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Remove default internet egress from the Lambda security group",
      "language": "json",
      "blurb": "CloudFormation resource excerpt for pre-existing reviewed VPC and database security-group IDs. The explicit egress rule prevents the new group from retaining the default allow-all rule. Review any additional attached groups, whose rules are additive.",
      "code": "{\n  \"Type\": \"AWS::EC2::SecurityGroup\",\n  \"Properties\": {\n    \"GroupDescription\": \"Orders Lambda to database only\",\n    \"VpcId\": \"vpc-0123456789abcdef0\",\n    \"SecurityGroupEgress\": [\n      {\n        \"IpProtocol\": \"tcp\",\n        \"FromPort\": 5432,\n        \"ToPort\": 5432,\n        \"DestinationSecurityGroupId\": \"sg-0123456789abcdef0\"\n      }\n    ]\n  }\n}\n"
    },
    {
      "title": "Attach only reviewed private subnets and a narrow security group",
      "language": "json",
      "blurb": "AWS Lambda VpcConfig property fragment. These identifiers are deployment-owned placeholders. Private subnets do not imply unrestricted internet access; separately provision approved endpoints, DNS, database ingress, and any required NAT. IAM still governs AWS API access.",
      "code": "{\n  \"SubnetIds\": [\n    \"subnet-0123456789abcdef0\",\n    \"subnet-0123456789abcdef1\"\n  ],\n  \"SecurityGroupIds\": [\n    \"sg-0123456789abcdef1\"\n  ],\n  \"Ipv6AllowedForDualStack\": false\n}\n"
    }
  ]
};
