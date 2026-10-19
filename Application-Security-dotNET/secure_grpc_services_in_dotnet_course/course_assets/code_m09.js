window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Observability, Reflection, Transcoding, and Deployment Review' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Lock down Observability, Reflection, Transcoding, and Deployment Review serializer options",
      "language": "csharp",
      "blurb": "The JSON options reject comments, trailing commas, and unexpected case-insensitive binding behavior.",
      "code": "using System.Text.Json;\n\npublic static JsonSerializerOptions CreateSecureGrpcM09ObservabilityReflectionTranscodingDeploymentJsonOptions() => new()\n{\n    PropertyNameCaseInsensitive = false,\n    ReadCommentHandling = JsonCommentHandling.Disallow,\n    AllowTrailingCommas = false,\n    MaxDepth = 9\n};\n\npublic static T ParseSecureGrpcM09ObservabilityReflectionTranscodingDeploymentJson<T>(string json)\n{\n    return JsonSerializer.Deserialize<T>(json, CreateSecureGrpcM09ObservabilityReflectionTranscodingDeploymentJsonOptions())\n           ?? throw new JsonException(\"observability reflection transcoding deployment review produced no value.\");\n}\n"
    },
    {
      "title": "Disable dangerous Observability, Reflection, Transcoding, and Deployment Review XML features",
      "language": "csharp",
      "blurb": "The XML settings prevent DTD processing and external resolver access before reading untrusted XML.",
      "code": "using System.Xml;\n\npublic static XmlReader CreateSecureGrpcM09ObservabilityReflectionTranscodingDeploymentXmlReader(Stream stream)\n{\n    var settings = new XmlReaderSettings\n    {\n        DtdProcessing = DtdProcessing.Prohibit,\n        XmlResolver = null,\n        MaxCharactersFromEntities = 0,\n        MaxCharactersInDocument = 18 * 1024\n    };\n    return XmlReader.Create(stream, settings);\n}\n"
    }
  ]
};
