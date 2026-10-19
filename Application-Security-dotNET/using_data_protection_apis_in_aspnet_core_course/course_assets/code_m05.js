window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Key Rings, Key Lifetime, and Rotation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Configure a durable encrypted key ring",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Bootstrap-only configuration. The directory is a trusted ACL-protected volume and the certificate is obtained from the deployment secret store. Explicit persistence requires explicit at-rest encryption.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography.X509Certificates;\npublic static void ConfigureKeyRing(IServiceCollection services, DirectoryInfo approvedDirectory, X509Certificate2 keyEncryptionCertificate)\n{\n    if (!keyEncryptionCertificate.HasPrivateKey) throw new InvalidOperationException(\"Decryption key unavailable.\");\n    services.AddDataProtection().SetApplicationName(\"Orders.Production\")\n        .SetDefaultKeyLifetime(TimeSpan.FromDays(90))\n        .PersistKeysToFileSystem(approvedDirectory)\n        .ProtectKeysWithCertificate(keyEncryptionCertificate);\n}\n// Provision directory ownership, backup, certificate validity, and key access before startup.\n"
    },
    {
      "title": "Distinguish key rotation from destructive deletion",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Run only in an authenticated administrative workflow. Future activation gives replicas time to observe the new key; old keys must remain available for existing payloads.",
      "code": "using Microsoft.AspNetCore.DataProtection.KeyManagement;\npublic static Guid ScheduleProtectionKeyRotation(IKeyManager manager)\n{\n    var activation = DateTimeOffset.UtcNow.AddDays(2);\n    var key = manager.CreateNewKey(activation, activation.AddDays(90));\n    return key.KeyId;\n}\n// Never delete prior keys as a routine rotation step. Test old-payload decryption on every replica.\n"
    }
  ]
};
