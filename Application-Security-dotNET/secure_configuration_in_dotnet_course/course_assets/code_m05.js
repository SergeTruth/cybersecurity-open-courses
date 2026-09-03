window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Strongly Typed Options and Configuration Validation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Load immutable order-processing options fail closed",
      "language": "csharp",
      "blurb": "The loader snapshots each setting once, parses canonical invariant integers, admits only reviewed currency and queue names, enforces independent application limits, and returns a type whose constructor cannot be bypassed by configuration binding.",
      "code": "using System.Globalization;\nusing Microsoft.Extensions.Configuration;\n\npublic sealed class OrderProcessingOptions\n{\n    private OrderProcessingOptions(string queueName, string currency, int maximumBatchSize)\n    {\n        QueueName = queueName;\n        Currency = currency;\n        MaximumBatchSize = maximumBatchSize;\n    }\n\n    public string QueueName { get; }\n    public string Currency { get; }\n    public int MaximumBatchSize { get; }\n\n    public static OrderProcessingOptions Load(IConfiguration configuration)\n    {\n        ArgumentNullException.ThrowIfNull(configuration);\n        var queueName = configuration[\"Orders:QueueName\"];\n        var currency = configuration[\"Orders:Currency\"];\n        var batchText = configuration[\"Orders:MaximumBatchSize\"];\n        if (queueName is not (\"orders-production\" or \"orders-staging\") ||\n            currency is not (\"USD\" or \"EUR\") ||\n            !int.TryParse(batchText, NumberStyles.None, CultureInfo.InvariantCulture, out var batchSize) ||\n            batchSize is < 1 or > 100 ||\n            batchText != batchSize.ToString(CultureInfo.InvariantCulture))\n        {\n            throw new InvalidOperationException(\"Order-processing options rejected.\");\n        }\n        return new OrderProcessingOptions(queueName, currency, batchSize);\n    }\n}\n"
    },
    {
      "title": "Project typed options into a fixed nonsecret diagnostic",
      "language": "csharp",
      "blurb": "The mapper accepts only the privately constructed options object and emits a closed immutable diagnostic containing queue, currency, and batch limit; it cannot receive arbitrary configuration keys or expose secret provider values.",
      "code": "public sealed class ValidatedWorkerOptions\n{\n    private ValidatedWorkerOptions(string queue, string currency, int batchSize)\n    {\n        Queue = queue;\n        Currency = currency;\n        BatchSize = batchSize;\n    }\n\n    public string Queue { get; }\n    public string Currency { get; }\n    public int BatchSize { get; }\n\n    public static ValidatedWorkerOptions Create(string queue, string currency, int batchSize)\n    {\n        if (queue is not (\"orders-production\" or \"orders-staging\") ||\n            currency is not (\"USD\" or \"EUR\") || batchSize is < 1 or > 100)\n        {\n            throw new ArgumentException(\"Worker options rejected.\");\n        }\n        return new ValidatedWorkerOptions(queue, currency, batchSize);\n    }\n}\n\npublic sealed record WorkerOptionsDiagnostic(\n    string Queue,\n    string Currency,\n    int MaximumBatchSize);\n\npublic static class WorkerOptionsDiagnostics\n{\n    public static WorkerOptionsDiagnostic From(ValidatedWorkerOptions options)\n    {\n        ArgumentNullException.ThrowIfNull(options);\n        return new WorkerOptionsDiagnostic(options.Queue, options.Currency, options.BatchSize);\n    }\n}\n"
    }
  ]
};
