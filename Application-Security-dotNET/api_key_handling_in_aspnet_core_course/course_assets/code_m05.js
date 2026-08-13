window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secure Storage and Validation of API Keys' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Issue API keys while returning storage evidence separately",
      "language": "csharp",
      "blurb": "The issuer hardwires 256 random bits, returns one prefixed bearer key, and writes a peppered HMAC-SHA-256 digest into caller-owned storage instead of bundling secret and storage evidence together.",
      "code": "using System.Security.Cryptography;\nusing System.Text;\nusing Microsoft.AspNetCore.WebUtilities;\n\npublic static class ApiKeyIssuer\n{\n    public static string Issue(\n        ReadOnlySpan<byte> applicationPepper,\n        Span<byte> storageDigest)\n    {\n        if (applicationPepper.Length is < 32 or > 64)\n            throw new ArgumentException(\"Pepper length rejected.\", nameof(applicationPepper));\n        if (storageDigest.Length != SHA256.HashSizeInBytes)\n            throw new ArgumentException(\"Digest destination rejected.\", nameof(storageDigest));\n\n        Span<byte> random = stackalloc byte[32];\n        Span<byte> encoded = stackalloc byte[64];\n        try\n        {\n            RandomNumberGenerator.Fill(random);\n            var key = \"ak_live_\" + WebEncoders.Base64UrlEncode(random);\n            var written = Encoding.ASCII.GetBytes(key, encoded);\n            _ = HMACSHA256.HashData(applicationPepper, encoded[..written], storageDigest);\n            return key;\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(random);\n            CryptographicOperations.ZeroMemory(encoded);\n        }\n    }\n}\n"
    },
    {
      "title": "Verify canonical prefixed API keys against peppered digests",
      "language": "csharp",
      "blurb": "The consumer requires the exact prefix and Base64URL length, validates pepper and digest sizes, computes HMAC-SHA-256 over the canonical ASCII key, and compares in fixed time.",
      "code": "using System.Security.Cryptography;\nusing System.Text;\n\npublic static class StoredApiKeyVerifier\n{\n    public static bool Matches(\n        string presentedKey,\n        ReadOnlySpan<byte> applicationPepper,\n        ReadOnlySpan<byte> storedDigest)\n    {\n        if (!IsCanonical(presentedKey) ||\n            applicationPepper.Length is < 32 or > 64 ||\n            storedDigest.Length != SHA256.HashSizeInBytes)\n        {\n            return false;\n        }\n\n        Span<byte> keyBytes = stackalloc byte[64];\n        Span<byte> actual = stackalloc byte[SHA256.HashSizeInBytes];\n        try\n        {\n            var written = Encoding.ASCII.GetBytes(presentedKey, keyBytes);\n            _ = HMACSHA256.HashData(applicationPepper, keyBytes[..written], actual);\n            return CryptographicOperations.FixedTimeEquals(actual, storedDigest);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(keyBytes);\n            CryptographicOperations.ZeroMemory(actual);\n        }\n    }\n\n    private static bool IsCanonical(string value) =>\n        value is { Length: 51 } &&\n        value.StartsWith(\"ak_live_\", StringComparison.Ordinal) &&\n        value.AsSpan(8).ContainsAnyExcept(\n            \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_\".AsSpan()) == false;\n}\n"
    }
  ]
};
