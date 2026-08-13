window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Common Crypto Mistakes in .NET Applications' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Reject ambiguous or noncanonical cryptographic envelopes",
      "language": "csharp",
      "blurb": "The gate admits only the reviewed algorithm, a canonical key identifier, exact canonical Base64 nonce and tag fields, and a bounded canonical ciphertext representation.",
      "code": "public sealed record CryptoEnvelopeInput(\n    string Algorithm,\n    string KeyId,\n    string Nonce,\n    string Tag,\n    string Ciphertext);\n\npublic static class CryptoEnvelopePolicy\n{\n    private const int MaximumCiphertextBytes = 1024 * 1024;\n\n    public static bool IsCanonical(CryptoEnvelopeInput envelope)\n    {\n        if (envelope is null ||\n            envelope.Algorithm != \"A256GCM\" ||\n            !IsIdentifier(envelope.KeyId))\n        {\n            return false;\n        }\n\n        return HasCanonicalSize(envelope.Nonce, 12, 12) &&\n               HasCanonicalSize(envelope.Tag, 16, 16) &&\n               HasCanonicalSize(envelope.Ciphertext, 1, MaximumCiphertextBytes);\n    }\n\n    private static bool HasCanonicalSize(\n        string value,\n        int minimumBytes,\n        int maximumBytes)\n    {\n        if (string.IsNullOrEmpty(value) || value.Length > ((maximumBytes + 2) / 3) * 4)\n            return false;\n        try\n        {\n            var bytes = Convert.FromBase64String(value);\n            return bytes.Length >= minimumBytes &&\n                   bytes.Length <= maximumBytes &&\n                   Convert.ToBase64String(bytes) == value;\n        }\n        catch (FormatException)\n        {\n            return false;\n        }\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    },
    {
      "title": "Generate capped per-key AES-GCM nonce sequences",
      "language": "csharp",
      "blurb": "A key owner can maintain one sequence per key version; the sequence combines a random per-instance prefix with an atomic counter and refuses to exceed the reviewed messages-per-key limit.",
      "code": "using System.Buffers.Binary;\nusing System.Security.Cryptography;\n\npublic sealed class AesGcmNonceSequence\n{\n    private const long MaximumMessagesPerKey = 1_000_000;\n    private readonly byte[] _prefix = RandomNumberGenerator.GetBytes(4);\n    private long _counter;\n\n    public byte[] Next()\n    {\n        var value = Interlocked.Increment(ref _counter);\n        if (value is <= 0 or > MaximumMessagesPerKey)\n            throw new InvalidOperationException(\"Per-key nonce budget exhausted.\");\n\n        var nonce = new byte[12];\n        _prefix.CopyTo(nonce, 0);\n        BinaryPrimitives.WriteInt64BigEndian(nonce.AsSpan(4), value);\n        return nonce;\n    }\n}\n"
    }
  ]
};
