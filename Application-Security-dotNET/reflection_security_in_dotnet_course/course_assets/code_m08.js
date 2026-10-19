window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Trimming, Native AOT, and Reflection Compatibility' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Declare trimming requirements for reflection",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. The annotation propagates the public-constructor requirement to callers. It describes linker dependencies, not authorization to instantiate an arbitrary request-selected type.",
      "code": "using System.Diagnostics.CodeAnalysis;\npublic sealed class ApprovedReport { public ApprovedReport() { } }\npublic static object CreateReviewedReport() => CreateWithPreservedConstructor(typeof(ApprovedReport));\nprivate static object CreateWithPreservedConstructor(\n    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)] Type type)\n    => Activator.CreateInstance(type) ?? throw new InvalidOperationException(\"Construction failed.\");\n// Exercise the deployment's actual trimmed/AOT publish in CI; a regular build is not that test.\n"
    },
    {
      "title": "Replace reflective dispatch with an AOT-friendly closed set",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. No runtime type-name lookup, emitted assembly, or reflection-selected member is required for these reviewed operations.",
      "code": "public static string StaticDispatch(string token) => token switch\n{\n    \"health\" => \"ready\",\n    \"version\" => \"1\",\n    _ => throw new ArgumentException(\"Unknown operation.\")\n};\n"
    }
  ]
};
