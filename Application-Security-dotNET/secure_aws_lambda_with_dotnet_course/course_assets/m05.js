window.COURSE_MODULE = {
  "title": "Event Sources, Input Validation, and Data Boundaries",
  "graphicAlt": "Queue, object and service events pass source, shape, tenant and size validation before producing side effects.",
  "narration": "Event sources are trust boundaries. Common sources include SQS, SNS, EventBridge, S3, DynamoDB Streams, Kinesis, API Gateway, Application Load Balancer, scheduled events, and custom service integrations. Each source has its own event shape, delivery behavior, identity context, and failure model.\n\nEvent data should be validated for shape, type, size, required fields, allowed values, tenant context, source expectation, and business rules. A .NET handler should make invalid events fail safely before side effects such as database writes, object updates, messages, notifications, or external service calls.\n\nDo not assume that an event is trustworthy only because it arrived through an AWS service. The event may represent user input, partner input, batch data, uploaded content, scheduled work, or data copied from another system. The source helps describe the path; it does not remove validation responsibility.\n\nS3 and file-like events require review of bucket policy, object naming, file size, content type, scanning workflow, retention, and cleanup behavior. The function should know which objects it expects to process and how to handle unexpected metadata or missing objects.\n\nQueue and stream events require review of batch size, partial failure behavior, ordering expectations, replay behavior, and poison-message handling. Raw event logging should be avoided when the event may contain personal data, secrets, tokens, customer records, or regulated content.",
  "narrationPoints": [
    "Each source has its own event shape, delivery behavior, identity context, and failure model.",
    "A .NET handler should make invalid events fail safely before side effects such as database writes, object updates, messages, notifications.",
    "The event may represent user input, partner input, batch data, uploaded content, scheduled work.",
    "S3 and file-like events require review of bucket policy, object naming, file size, content type, scanning workflow.",
    "Raw event logging should be avoided when the event may contain personal data, secrets, tokens, customer records."
  ]
};
