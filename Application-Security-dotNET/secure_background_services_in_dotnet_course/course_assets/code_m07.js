window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Cancellation, Timeouts, and Resource Protection' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Own a linked cancellation deadline",
      "language": "csharp",
      "blurb": "The deadline validates a short application maximum, links caller cancellation with an internal timer, exposes its token through a synchronized boundary, and releases the timer exactly once without invoking arbitrary cancellation callbacks during disposal.",
      "code": "public sealed class JobExecutionDeadline : IDisposable\n{\n    private readonly object _gate = new();\n    private CancellationTokenSource? _source;\n\n    private JobExecutionDeadline(CancellationTokenSource source) => _source = source;\n\n    public CancellationToken Token\n    {\n        get\n        {\n            lock (_gate)\n            {\n                var source = _source ??\n                    throw new ObjectDisposedException(nameof(JobExecutionDeadline));\n                return source.Token;\n            }\n        }\n    }\n\n    public static JobExecutionDeadline Start(TimeSpan timeout, CancellationToken callerToken)\n    {\n        if (timeout < TimeSpan.FromMilliseconds(100) || timeout > TimeSpan.FromSeconds(30))\n            throw new ArgumentOutOfRangeException(nameof(timeout));\n        var source = CancellationTokenSource.CreateLinkedTokenSource(callerToken);\n        source.CancelAfter(timeout);\n        return new JobExecutionDeadline(source);\n    }\n\n    public void Dispose()\n    {\n        lock (_gate)\n        {\n            _source?.Dispose();\n            _source = null;\n        }\n    }\n}\n"
    },
    {
      "title": "Share one asynchronous resource cleanup operation",
      "language": "csharp",
      "blurb": "The lease owns a stream, starts disposal under a private lock, returns the same task to every concurrent caller, and therefore closes the resource once while all callers observe the actual asynchronous cleanup result.",
      "code": "public sealed class JobResourceLease : IAsyncDisposable\n{\n    private readonly Stream _stream;\n    private readonly object _gate = new();\n    private Task? _disposeTask;\n\n    public JobResourceLease(Stream stream)\n    {\n        ArgumentNullException.ThrowIfNull(stream);\n        _stream = stream;\n    }\n\n    public ValueTask DisposeAsync()\n    {\n        lock (_gate)\n        {\n            _disposeTask ??= DisposeCoreAsync();\n            return new ValueTask(_disposeTask);\n        }\n    }\n\n    private async Task DisposeCoreAsync() =>\n        await _stream.DisposeAsync().ConfigureAwait(false);\n}\n"
    }
  ]
};
