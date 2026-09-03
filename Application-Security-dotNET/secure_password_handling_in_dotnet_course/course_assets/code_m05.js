window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Password Reset, Change, and Account Recovery' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Issue high-entropy password-reset tokens and store only their digest",
      "language": "csharp",
      "blurb": "The issuer hardwires the operating-system CSPRNG, writes the SHA-256 storage digest into caller-owned storage, returns only the bearer token, and clears temporary token bytes.",
      "code": "using System.Security.Cryptography;\nusing Microsoft.AspNetCore.WebUtilities;\n\npublic static class PasswordResetIssuer\n{\n    public static string Issue(Span<byte> storageDigest)\n    {\n        if (storageDigest.Length != SHA256.HashSizeInBytes)\n            throw new ArgumentException(\"A complete SHA-256 destination is required.\", nameof(storageDigest));\n        Span<byte> tokenBytes = stackalloc byte[32];\n        try\n        {\n            RandomNumberGenerator.Fill(tokenBytes);\n            _ = SHA256.HashData(tokenBytes, storageDigest);\n            return WebEncoders.Base64UrlEncode(tokenBytes);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(tokenBytes);\n        }\n    }\n}\n"
    },
    {
      "title": "Verify canonical password-reset tokens against stored digests",
      "language": "csharp",
      "blurb": "The verifier requires the exact 43-character Base64URL token form and a complete 32-byte trusted digest before decoding and comparing the complete SHA-256 digest in fixed time.",
      "code": "using System.Security.Cryptography;\nusing Microsoft.AspNetCore.WebUtilities;\n\npublic static class PasswordResetVerifier\n{\n    public static bool Matches(\n        string token,\n        ReadOnlySpan<byte> storedDigest)\n    {\n        if (!IsBase64UrlToken(token) ||\n            storedDigest.Length != SHA256.HashSizeInBytes)\n            return false;\n\n        byte[] tokenBytes;\n        try { tokenBytes = WebEncoders.Base64UrlDecode(token); }\n        catch (FormatException) { return false; }\n        if (tokenBytes.Length != 32 ||\n            WebEncoders.Base64UrlEncode(tokenBytes) != token)\n        {\n            CryptographicOperations.ZeroMemory(tokenBytes);\n            return false;\n        }\n\n        Span<byte> actual = stackalloc byte[SHA256.HashSizeInBytes];\n        try\n        {\n            _ = SHA256.HashData(tokenBytes, actual);\n            return CryptographicOperations.FixedTimeEquals(actual, storedDigest);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(tokenBytes);\n            CryptographicOperations.ZeroMemory(actual);\n        }\n    }\n\n    private static bool IsBase64UrlToken(string value) =>\n        value is { Length: 43 } && value.All(character =>\n            char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n\n}\n"
    }
  ]
};
