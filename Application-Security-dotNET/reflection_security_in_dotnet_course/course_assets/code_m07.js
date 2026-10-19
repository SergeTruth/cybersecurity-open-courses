window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Reflection Emit, Dynamic Code, and Runtime Generation' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Build dynamic code from fixed expressions only",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. No request string is parsed as code. This closed arithmetic expression illustrates dynamic generation with a checked-overflow policy and an AOT-compatible interpretation option.",
      "code": "using System.Linq.Expressions;\nusing System.Runtime.CompilerServices;\npublic static Func<int, int> BuildDoubleOperation()\n{\n    var value = Expression.Parameter(typeof(int), \"value\");\n    var body = Expression.MultiplyChecked(value, Expression.Constant(2));\n    return Expression.Lambda<Func<int, int>>(body, value)\n        .Compile(preferInterpretation: !RuntimeFeature.IsDynamicCodeSupported);\n}\n"
    },
    {
      "title": "Prefer static delegates when dynamic code is unnecessary",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. An explicit operation switch avoids Reflection.Emit, dynamic compilation, and arbitrary method selection. Unknown tokens fail before execution.",
      "code": "public static int RunArithmetic(string operation, int value)\n{\n    if (value is < -1000000 or > 1000000) throw new ArgumentOutOfRangeException(nameof(value));\n    return operation switch\n    {\n        \"double\" => checked(value * 2),\n        \"negate\" => checked(-value),\n        _ => throw new ArgumentException(\"Unknown operation.\")\n    };\n}\n"
    }
  ]
};
