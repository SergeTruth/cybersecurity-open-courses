window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Configuring Data Protection for Deployment' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Give replicas one application identity and key repository",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Invoke on every replica using the same trusted volume, application name, and certificate policy. The volume must be shared storage with correct concurrency semantics, not a disposable container layer.",
      "code": "using Microsoft.AspNetCore.DataProtection;\nusing System.Security.Cryptography.X509Certificates;\npublic static void ConfigureReplica(IServiceCollection services, DirectoryInfo sharedRing, X509Certificate2 certificate)\n{\n    if (!certificate.HasPrivateKey) throw new InvalidOperationException(\"Key unavailable.\");\n    services.AddDataProtection().SetApplicationName(\"Orders.Production\")\n        .PersistKeysToFileSystem(sharedRing).ProtectKeysWithCertificate(certificate);\n}\n"
    },
    {
      "title": "Test cross-replica interoperability",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12, Microsoft.AspNetCore.App. Pass providers built independently from the same reviewed deployment configuration. This detects different application names, purposes, key rings, or inaccessible decryption certificates without a web server.",
      "code": "using Microsoft.AspNetCore.DataProtection;\npublic static void AssertReplicaInteroperability(IDataProtectionProvider first, IDataProtectionProvider second)\n{\n    const string purpose = \"Orders.DeploymentProbe.v1\";\n    var token = first.CreateProtector(purpose).Protect(\"nonsecret-probe\");\n    if (second.CreateProtector(purpose).Unprotect(token) != \"nonsecret-probe\")\n        throw new InvalidOperationException(\"Replica protection mismatch.\");\n}\n"
    }
  ]
};
