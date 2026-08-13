window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Randomness, Nonces, IDs, and Key Generation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Issue opaque bearer tokens from the operating-system CSPRNG",
      "language": "csharp",
      "blurb": "The production issuer hardwires RandomNumberGenerator, uses 256 bits of entropy, and emits an unpadded URL-safe representation without exposing a deterministic injection point.",
      "code": "using System.Security.Cryptography;\nusing Microsoft.AspNetCore.WebUtilities;\n\npublic static class BearerTokenIssuer\n{\n    private const int TokenBytes = 32;\n\n    public static string Issue()\n    {\n        Span<byte> bytes = stackalloc byte[TokenBytes];\n        try\n        {\n            RandomNumberGenerator.Fill(bytes);\n            return WebEncoders.Base64UrlEncode(bytes);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(bytes);\n        }\n    }\n}\n"
    },
    {
      "title": "Generate unbiased bounded choices and AES keys",
      "language": "csharp",
      "blurb": "The helpers reject application-defeating bounds, use rejection-sampled GetInt32 for choices, and generate a full 256-bit AES key from the platform CSPRNG.",
      "code": "using System.Security.Cryptography;\n\npublic static class SecureRandomValues\n{\n    private const int MaximumChoices = 1_000_000;\n\n    public static int ChooseIndex(int count)\n    {\n        if (count is <= 0 or > MaximumChoices)\n            throw new ArgumentOutOfRangeException(nameof(count));\n        return RandomNumberGenerator.GetInt32(count);\n    }\n\n    public static byte[] GenerateAes256Key() =>\n        RandomNumberGenerator.GetBytes(32);\n}\n"
    }
  ]
};
