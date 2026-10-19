window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secure Data Access, File Handling, and Deserialization' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Resolve a basename in application-owned private storage",
      "language": "csharp",
      "blurb": "Rejects traversal, absolute paths, alternate streams, separators, and reserved device names. The trusted caller must authorize the selected object and own a directory whose contents cannot be changed by untrusted actors; lexical validation does not secure hostile directories.",
      "code": "// Preconditions: baseDirectory is an absolute, application-owned private directory.\n// Untrusted users cannot create entries, hard links, symlinks, or reparse points in it.\n// This is a lexical basename resolver, not a safe-open primitive for hostile storage.\npublic static string ResolveIntroductionApplicationM07SecureDataAccessFileStoragePath(string baseDirectory, string fileName)\n{\n    if (!Path.IsPathFullyQualified(baseDirectory)) throw new ArgumentException(\"Absolute storage root required.\");\n    if (fileName is not { Length: > 0 and <= 128 } || fileName is \".\" or \"..\" ||\n        fileName[0] == '.' || fileName.EndsWith('.') ||\n        !fileName.All(c => char.IsAsciiLetterOrDigit(c) || c is '.' or '-' or '_'))\n        throw new ArgumentException(\"Invalid storage basename.\");\n    var stem = fileName.Split('.')[0];\n    var devices = new[] { \"CON\", \"PRN\", \"AUX\", \"NUL\", \"COM1\", \"COM2\", \"COM3\", \"COM4\", \"COM5\", \"COM6\", \"COM7\", \"COM8\", \"COM9\", \"LPT1\", \"LPT2\", \"LPT3\", \"LPT4\", \"LPT5\", \"LPT6\", \"LPT7\", \"LPT8\", \"LPT9\" };\n    if (devices.Contains(stem, StringComparer.OrdinalIgnoreCase)) throw new ArgumentException(\"Reserved basename.\");\n    return Path.Combine(Path.GetFullPath(baseDirectory), fileName);\n}\n"
    },
    {
      "title": "Validate Secure Data Access, File Handling, and Deserialization upload metadata",
      "language": "csharp",
      "blurb": "Checks matching extension/type pairs and declared size only. Client metadata is not proof of file type or a hard byte limit; streaming limits, safe parsing, authorization, and server-owned storage are mandatory separate steps.",
      "code": "// A cheap metadata precheck only. Never use the submitted filename as a storage path.\npublic static bool AcceptIntroductionApplicationM07SecureDataAccessFileUpload(string fileName, string contentType, long length)\n{\n    if (fileName is not { Length: > 0 and <= 128 } ||\n        !fileName.All(c => char.IsAsciiLetterOrDigit(c) || c is '.' or '-' or '_') ||\n        length <= 0 || length > 32 * 1024L * 1024L) return false;\n    return (Path.GetExtension(fileName).ToLowerInvariant(), contentType) switch\n    {\n        (\".pdf\", \"application/pdf\") or (\".png\", \"image/png\") or (\".txt\", \"text/plain\") => true,\n        _ => false\n    };\n}\n// Before processing: cap ACTUAL streamed bytes, validate content using the approved parser,\n// authorize the upload, and store under a server-generated name in private storage.\n"
    }
  ]
};
