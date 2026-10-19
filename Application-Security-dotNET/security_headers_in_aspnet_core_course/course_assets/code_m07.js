window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Permissions Policy and Browser Feature Controls' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Apply the BrowserFeatures response policy",
      "language": "csharp",
      "blurb": "Call on the actual HTML response before headers start. Values are reviewed application policy, not request data. Merge CSP directives centrally instead of letting independent helpers overwrite one another; test browser support and application compatibility.",
      "code": "public static void SetBrowserFeaturesHeaders(IHeaderDictionary headers)\n{\n    headers[\"Permissions-Policy\"] = \"camera=(), microphone=(), geolocation=()\";\n}\n"
    },
    {
      "title": "Regression-test the BrowserFeatures header values",
      "language": "csharp",
      "blurb": "In-process test helper; no web server required. The deployment integration suite must also verify the final externally served response after proxies and error handlers.",
      "code": "public static void AssertBrowserFeaturesHeaders(Action<IHeaderDictionary> apply)\n{\n    var headers = new HeaderDictionary();\n    apply(headers);\n    if (headers[\"Permissions-Policy\"].ToString() != \"camera=(), microphone=(), geolocation=()\") throw new InvalidOperationException(\"Header policy missing or changed.\");\n}\n"
    }
  ]
};
