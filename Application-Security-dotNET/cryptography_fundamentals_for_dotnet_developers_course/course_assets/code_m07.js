window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Key Management, Secret Storage, and Rotation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Validate immutable key-version metadata",
      "language": "csharp",
      "blurb": "The factory makes invalid lifecycle states unrepresentable by validating the key identifier, positive version, ordered timestamps, and an application-owned maximum cryptoperiod.",
      "code": "public sealed class KeyVersionMetadata\n{\n    private static readonly TimeSpan MaximumCryptoperiod = TimeSpan.FromDays(365);\n\n    private KeyVersionMetadata(\n        string keyId,\n        int version,\n        DateTimeOffset activatesAt,\n        DateTimeOffset retiresAt)\n    {\n        KeyId = keyId;\n        Version = version;\n        ActivatesAt = activatesAt;\n        RetiresAt = retiresAt;\n    }\n\n    public string KeyId { get; }\n    public int Version { get; }\n    public DateTimeOffset ActivatesAt { get; }\n    public DateTimeOffset RetiresAt { get; }\n\n    public static KeyVersionMetadata Create(\n        string keyId,\n        int version,\n        DateTimeOffset activatesAt,\n        DateTimeOffset retiresAt)\n    {\n        if (!IsIdentifier(keyId))\n            throw new ArgumentException(\"Key identifier rejected.\", nameof(keyId));\n        if (version <= 0 ||\n            retiresAt <= activatesAt ||\n            retiresAt - activatesAt > MaximumCryptoperiod)\n        {\n            throw new ArgumentException(\"Key lifecycle rejected.\");\n        }\n        return new KeyVersionMetadata(keyId, version, activatesAt, retiresAt);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    },
    {
      "title": "Own and clear a 256-bit key without exposing internal storage",
      "language": "csharp",
      "blurb": "The owner copies validated key material, serializes copy and disposal under one lock, zeros its private buffer exactly once, and requires callers to provide their own destination storage.",
      "code": "using System.Security.Cryptography;\n\npublic sealed class AesKeyMaterial : IDisposable\n{\n    private readonly object _gate = new();\n    private byte[]? _key;\n\n    private AesKeyMaterial(byte[] key) => _key = key;\n\n    public static AesKeyMaterial Create(ReadOnlySpan<byte> key)\n    {\n        if (key.Length != 32)\n            throw new ArgumentException(\"A 256-bit key is required.\", nameof(key));\n        return new AesKeyMaterial(key.ToArray());\n    }\n\n    public void CopyTo(Span<byte> destination)\n    {\n        if (destination.Length < 32)\n            throw new ArgumentException(\"Destination is too small.\", nameof(destination));\n        lock (_gate)\n        {\n            ObjectDisposedException.ThrowIf(_key is null, this);\n            _key.CopyTo(destination);\n        }\n    }\n\n    public void Dispose()\n    {\n        lock (_gate)\n        {\n            if (_key is null) return;\n            CryptographicOperations.ZeroMemory(_key);\n            _key = null;\n        }\n        GC.SuppressFinalize(this);\n    }\n}\n"
    }
  ]
};
