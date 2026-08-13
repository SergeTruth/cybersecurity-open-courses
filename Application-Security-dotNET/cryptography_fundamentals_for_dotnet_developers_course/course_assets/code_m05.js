window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Asymmetric Cryptography, Signatures, and Certificates' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Verify bounded signatures with RSA-PSS",
      "language": "csharp",
      "blurb": "The verifier accepts a trusted RSA public-key object, bounds untrusted inputs, and fixes both SHA-256 and PSS rather than accepting attacker-selected algorithms.",
      "code": "using System.Security.Cryptography;\n\npublic static class ReleaseSignatureVerifier\n{\n    private const int MaximumArtifactBytes = 4 * 1024 * 1024;\n    private const int MaximumSignatureBytes = 1024;\n\n    public static bool Verify(\n        RSA publicKey,\n        ReadOnlySpan<byte> artifact,\n        ReadOnlySpan<byte> signature)\n    {\n        ArgumentNullException.ThrowIfNull(publicKey);\n        if (artifact.Length > MaximumArtifactBytes ||\n            signature.Length is 0 or > MaximumSignatureBytes)\n        {\n            return false;\n        }\n\n        return publicKey.VerifyData(\n            artifact,\n            signature,\n            HashAlgorithmName.SHA256,\n            RSASignaturePadding.Pss);\n    }\n}\n"
    },
    {
      "title": "Bind certificate acceptance to time, server usage, and an SPKI pin",
      "language": "csharp",
      "blurb": "The policy checks the certificate validity window, requires the server-authentication EKU, hashes the complete subject-public-key information, and compares a trusted 32-byte pin in fixed time.",
      "code": "using System.Security.Cryptography;\nusing System.Security.Cryptography.X509Certificates;\n\npublic static class PinnedServerCertificate\n{\n    private const string ServerAuthenticationOid = \"1.3.6.1.5.5.7.3.1\";\n\n    public static bool IsApproved(\n        X509Certificate2 certificate,\n        ReadOnlySpan<byte> expectedSpkiSha256,\n        DateTimeOffset now)\n    {\n        ArgumentNullException.ThrowIfNull(certificate);\n        if (expectedSpkiSha256.Length != SHA256.HashSizeInBytes ||\n            now < certificate.NotBefore.ToUniversalTime() ||\n            now > certificate.NotAfter.ToUniversalTime() ||\n            !HasServerAuthenticationEku(certificate))\n        {\n            return false;\n        }\n\n        var spki = certificate.PublicKey.ExportSubjectPublicKeyInfo();\n        Span<byte> actual = stackalloc byte[SHA256.HashSizeInBytes];\n        try\n        {\n            _ = SHA256.HashData(spki, actual);\n            return CryptographicOperations.FixedTimeEquals(actual, expectedSpkiSha256);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(actual);\n        }\n    }\n\n    private static bool HasServerAuthenticationEku(X509Certificate2 certificate) =>\n        certificate.Extensions\n            .OfType<X509EnhancedKeyUsageExtension>()\n            .SelectMany(extension => extension.EnhancedKeyUsages.Cast<Oid>())\n            .Any(oid => oid.Value == ServerAuthenticationOid);\n}\n"
    }
  ]
};
