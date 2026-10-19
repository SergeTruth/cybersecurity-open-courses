window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secrets, Configuration, and Sensitive Data Handling' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Protect Secrets, Configuration, and Sensitive Data Handling bytes with authenticated encryption",
      "language": "csharp",
      "blurb": "AES-GCM with a fresh 96-bit random nonce, a 128-bit tag, and a 64-KiB plaintext bound checked before allocation. This is a cryptographic primitive, not a complete storage envelope: use managed keys, enforce a per-key invocation budget and rotation, and bind record context as associated data in the storage protocol.",
      "code": "using System.Security.Cryptography;\n\npublic sealed record DefensiveProgrammingM06SecretsConfigurationSensitiveDataCiphertext(byte[] Nonce, byte[] Tag, byte[] Ciphertext);\n\npublic static class DefensiveProgrammingM06SecretsConfigurationSensitiveDataCrypto\n{\n    public static DefensiveProgrammingM06SecretsConfigurationSensitiveDataCiphertext Encrypt(ReadOnlySpan<byte> key, ReadOnlySpan<byte> plaintext)\n    {\n        if (key.Length is not (16 or 24 or 32) || plaintext.Length > 65536)\n            throw new ArgumentException(\"Key or plaintext limit rejected.\");\n        var nonce = RandomNumberGenerator.GetBytes(12);\n        var ciphertext = new byte[plaintext.Length];\n        var tag = new byte[16];\n        using var aes = new AesGcm(key, tagSizeInBytes: 16);\n        aes.Encrypt(nonce, plaintext, ciphertext, tag);\n        return new DefensiveProgrammingM06SecretsConfigurationSensitiveDataCiphertext(nonce, tag, ciphertext);\n    }\n}\n"
    },
    {
      "title": "Clear Secrets, Configuration, and Sensitive Data Handling secret buffers after use",
      "language": "csharp",
      "blurb": "Bounded PBKDF2-HMAC-SHA256 teaching primitive with 600,000 iterations and a separate random 16-byte salt per derived key. Persist algorithm, work factor, and salt with the encrypted record and benchmark admission limits. Clearing this temporary buffer cannot erase the original immutable string or the returned key; their lifetime still matters.",
      "code": "using System.Security.Cryptography;\nusing System.Text;\n\npublic static byte[] DeriveDefensiveProgrammingM06SecretsConfigurationSensitiveDataKey(string secret, byte[] salt)\n{\n    if (secret is not { Length: > 0 and <= 1024 } || salt is not { Length: 16 })\n        throw new ArgumentException(\"Passphrase or salt rejected.\");\n    var secretBytes = new UTF8Encoding(false, true).GetBytes(secret);\n    try\n    {\n        return Rfc2898DeriveBytes.Pbkdf2(secretBytes, salt, 600_000, HashAlgorithmName.SHA256, 32);\n    }\n    finally\n    {\n        CryptographicOperations.ZeroMemory(secretBytes);\n    }\n}\n"
    }
  ]
};
