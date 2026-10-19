window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Async/Await Safety and Deadlock Avoidance' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Use cancellation and bounds for Async/Await Safety and Deadlock Avoidance",
      "language": "csharp",
      "blurb": "A shared application-owned worker admits at most the configured number of operations and rejects overflow immediately; it does not accumulate unbounded waiting tasks. Cancellation is cooperative, so work must honor the token. Keep one worker per intended quota, not one per request, and drain operations during application shutdown.",
      "code": "public sealed class ThreadingConcurrencyM05AsyncAwaitSafetyDeadlockWorker\n{\n    private readonly SemaphoreSlim _gate = new(2);\n\n    public async Task RunAsync(Func<CancellationToken, Task> work, CancellationToken cancellationToken)\n    {\n        ArgumentNullException.ThrowIfNull(work);\n        if (!await _gate.WaitAsync(0, cancellationToken))\n            throw new InvalidOperationException(\"Worker capacity unavailable.\");\n        try\n        {\n            await work(cancellationToken);\n        }\n        finally\n        {\n            _gate.Release();\n        }\n    }\n}\n"
    },
    {
      "title": "Dispose Async/Await Safety and Deadlock Avoidance resources predictably",
      "language": "csharp",
      "blurb": "The async disposable pattern keeps cleanup explicit for background or resource-owning components.",
      "code": "public sealed class ThreadingConcurrencyM05AsyncAwaitSafetyDeadlockResource : IAsyncDisposable\n{\n    private readonly Stream _stream;\n\n    public ThreadingConcurrencyM05AsyncAwaitSafetyDeadlockResource(Stream stream) => _stream = stream;\n\n    public async ValueTask DisposeAsync()\n    {\n        await _stream.DisposeAsync();\n        GC.SuppressFinalize(this);\n    }\n}\n"
    }
  ]
};
