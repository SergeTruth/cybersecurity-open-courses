window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'File Names, Paths, and Storage Isolation' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Treat the original filename as bounded display text",
      "language": "csharp",
      "blurb": "The value object rejects empty, oversized, control-bearing, slash, backslash, colon, surrounding-whitespace, and dot-segment names. It is explicitly display metadata and never becomes a storage path.",
      "code": "using System.Text;\n\npublic sealed class UploadDisplayName\n{\n    private UploadDisplayName(string value) => Value = value;\n\n    public string Value { get; }\n\n    public static UploadDisplayName Create(string value)\n    {\n        if (string.IsNullOrEmpty(value) || value.Length > 120 ||\n            Encoding.UTF8.GetByteCount(value) > 240 || value.Any(char.IsControl) ||\n            value != value.Trim() || value is \".\" or \"..\" ||\n            value.Contains('/', StringComparison.Ordinal) ||\n            value.Contains('\\\\', StringComparison.Ordinal) ||\n            value.Contains(':', StringComparison.Ordinal))\n        {\n            throw new ArgumentException(\"Upload display name rejected.\", nameof(value));\n        }\n        return new UploadDisplayName(value);\n    }\n}\n"
    },
    {
      "title": "Generate an opaque quarantine storage identity",
      "language": "csharp",
      "blurb": "The factory obtains 192 random bits from the platform CSPRNG, emits canonical lowercase hexadecimal, and derives a fixed-prefix quarantine key. No user filename, tenant text, or caller-selected path participates in storage placement.",
      "code": "using System.Security.Cryptography;\n\npublic sealed class QuarantineStorageIdentity\n{\n    private QuarantineStorageIdentity(string objectId)\n    {\n        ObjectId = objectId;\n        StorageKey = $\"quarantine/{objectId}.pending\";\n    }\n\n    public string ObjectId { get; }\n    public string StorageKey { get; }\n\n    public static QuarantineStorageIdentity Create()\n    {\n        var objectId = Convert.ToHexStringLower(RandomNumberGenerator.GetBytes(24));\n        return new QuarantineStorageIdentity(objectId);\n    }\n}\n"
    }
  ]
};
