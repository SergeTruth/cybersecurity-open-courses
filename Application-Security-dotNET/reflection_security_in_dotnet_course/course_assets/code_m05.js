window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Assembly Loading, Plugins, and Dependency Boundaries' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Load only a deployment-owned plugin artifact",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Administrative bootstrap only: the path and its complete dependency set must already be authenticated by the release process and reside in immutable application-owned storage. AssemblyLoadContext manages loading; it is not a sandbox or approval verifier.",
      "code": "using System.Runtime.Loader;\npublic static AssemblyLoadContext LoadDeployedPlugin()\n{\n    // Fixed reviewed deployment layout; never replace this with an upload or request path.\n    var path = Path.Combine(AppContext.BaseDirectory, \"plugins\", \"Orders.Formatting.dll\");\n    var context = new AssemblyLoadContext(\"Orders.Formatting\", isCollectible: true);\n    try { context.LoadFromAssemblyPath(path); return context; }\n    catch { context.Unload(); throw; }\n}\n// Untrusted plugins require a separately privileged process/service, not this loader.\n"
    },
    {
      "title": "Request plugin unloading without claiming immediate cleanup",
      "language": "csharp",
      "blurb": ".NET 8 / C# 12. Trusted lifecycle code first stops plugin work and releases instances, delegates, and Assembly references. Unload requests collection; it cannot forcibly stop plugin threads or revoke capabilities.",
      "code": "using System.Runtime.Loader;\npublic static WeakReference RequestPluginUnload(AssemblyLoadContext context)\n{\n    if (!context.IsCollectible) throw new InvalidOperationException(\"Context is not collectible.\");\n    var reference = new WeakReference(context);\n    context.Unload();\n    return reference;\n}\n// A test may observe reference.IsAlive after dropping all strong references and collecting.\n// Production shutdown must own and stop plugin work before reaching this point.\n"
    }
  ]
};
