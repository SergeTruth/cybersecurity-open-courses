window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Claims, Scopes, Audiences, and Authorization' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Authorize a tenant action on the validated bearer identity",
      "language": "csharp",
      "blurb": "Use after the configured JWT handler. Reject ambiguous/missing identity claims and do not combine claims across authentication schemes. This is action authorization, not ownership of arbitrary records.",
      "code": "using System.Security.Claims;\n\n// Trusted host: authenticate the reviewed Bearer scheme before calling this helper.\n// AuthenticationType is configured as \"Bearer\" by that scheme, not read from input.\n// This grants an action in a tenant, NOT ownership of every object in that tenant.\npublic static class TokenActionPolicy\n{\n    public static bool CanAccess(ClaimsPrincipal user, string tenantId)\n    {\n        if (user is null || !ValidId(tenantId)) return false;\n        var identities = user.Identities.Where(i => i.IsAuthenticated && i.AuthenticationType == \"Bearer\").Take(2).ToArray();\n        if (identities.Length != 1) return false;\n        var identity = identities[0];\n        var tenants = identity.FindAll(\"tid\").Take(2).ToArray();\n        var subjects = identity.FindAll(\"sub\").Take(2).ToArray();\n        var scopes = identity.FindAll(\"scp\").Take(2).ToArray();\n        return tenants.Length == 1 && subjects.Length == 1 && scopes.Length == 1 &&\n            ValidId(tenants[0].Value) && ValidId(subjects[0].Value) &&\n            tenants[0].Value == tenantId && scopes[0].Value.Length <= 2048 &&\n            scopes[0].Value.Split(' ', StringSplitOptions.RemoveEmptyEntries).Contains(\"orders.read\", StringComparer.Ordinal);\n    }\n    private static bool ValidId(string? value) => value is { Length: > 0 and <= 128 } &&\n        value.All(c => char.IsAsciiLetterOrDigit(c) || c is '-' or '_');\n}\n"
    },
    {
      "title": "Apply ownership as well as tenant scope",
      "language": "csharp",
      "blurb": "The immutable document comes from a trusted repository; tenant and owner are stored metadata, not request-supplied assertions. The requested action still needs its bearer scope policy.",
      "code": "using System.Security.Claims;\npublic sealed record StoredDocument(Guid Id, string TenantId, string OwnerId);\npublic static bool OwnsDocument(ClaimsPrincipal user, StoredDocument document)\n{\n    var ids = user.Identities.Where(i => i.IsAuthenticated && i.AuthenticationType == \"Bearer\").Take(2).ToArray();\n    if (ids.Length != 1 || document.Id == Guid.Empty) return false;\n    var tenants = ids[0].FindAll(\"tid\").Take(2).ToArray();\n    var subjects = ids[0].FindAll(\"sub\").Take(2).ToArray();\n    return tenants.Length == 1 && subjects.Length == 1 &&\n        tenants[0].Value.Length is > 0 and <= 128 && subjects[0].Value.Length is > 0 and <= 128 &&\n        tenants[0].Value == document.TenantId && subjects[0].Value == document.OwnerId;\n}\n// Repository updates must enforce these predicates atomically with any protected mutation.\n"
    }
  ]
};
