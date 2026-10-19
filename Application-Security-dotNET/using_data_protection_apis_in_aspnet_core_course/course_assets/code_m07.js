window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Protecting Keys at Rest and Managing Access' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Retain decryption certificates while rotating the encryption certificate",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Bootstrap-only. Use the new certificate for new key-ring files, and retain the old private certificate until every old encrypted key-ring entry has an approved migration or retirement plan.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography.X509Certificates;\npublic static void ConfigureCertificateRollover(IServiceCollection services, DirectoryInfo ring, X509Certificate2 current, X509Certificate2 previous)\n{\n    if (!current.HasPrivateKey || !previous.HasPrivateKey) throw new InvalidOperationException(\"Key unavailable.\");\n    services.AddDataProtection().SetApplicationName(\"Orders.Production\")\n        .PersistKeysToFileSystem(ring).ProtectKeysWithCertificate(current)\n        .UnprotectKeysWithAnyCertificate(current, previous);\n}\n"
    },
    {
      "title": "Make a designated secondary read existing keys only",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. After provisioning the shared encrypted ring, secondary instances can disable automatic generation. This setting is not filesystem access control; deployment permissions must separately restrict key writes.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography.X509Certificates;\npublic static void ConfigureReadOnlyReplica(IServiceCollection services, DirectoryInfo ring, X509Certificate2 certificate)\n{\n    if (!certificate.HasPrivateKey) throw new InvalidOperationException(\"Key unavailable.\");\n    services.AddDataProtection().SetApplicationName(\"Orders.Production\")\n        .PersistKeysToFileSystem(ring).ProtectKeysWithCertificate(certificate)\n        .DisableAutomaticKeyGeneration();\n}\n"
    }
  ]
};
