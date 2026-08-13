window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Authorization and Access Control' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Authorize document ownership and tenant isolation in one handler",
      "language": "csharp",
      "blurb": "The resource handler validates the stored resource identifiers, requires one canonical subject and tenant claim, and succeeds only when both ownership and tenant boundaries match.",
      "code": "using System.Security.Claims;\nusing Microsoft.AspNetCore.Authorization;\n\npublic sealed class DocumentOwnerRequirement : IAuthorizationRequirement;\n\npublic sealed record ProtectedDocument(\n    string Id,\n    string TenantId,\n    string OwnerId);\n\npublic sealed class DocumentOwnerHandler\n    : AuthorizationHandler<DocumentOwnerRequirement, ProtectedDocument>\n{\n    protected override Task HandleRequirementAsync(\n        AuthorizationHandlerContext context,\n        DocumentOwnerRequirement requirement,\n        ProtectedDocument resource)\n    {\n        ArgumentNullException.ThrowIfNull(context);\n        ArgumentNullException.ThrowIfNull(requirement);\n        if (context.User.Identity?.IsAuthenticated != true ||\n            resource is null ||\n            !IsIdentifier(resource.Id) ||\n            !IsIdentifier(resource.TenantId) ||\n            !IsIdentifier(resource.OwnerId))\n        {\n            return Task.CompletedTask;\n        }\n\n        var subjects = context.User.FindAll(\"sub\").Select(claim => claim.Value).Take(2).ToArray();\n        var tenants = context.User.FindAll(\"tenant_id\").Select(claim => claim.Value).Take(2).ToArray();\n        if (subjects.Length == 1 && tenants.Length == 1 &&\n            string.Equals(subjects[0], resource.OwnerId, StringComparison.Ordinal) &&\n            string.Equals(tenants[0], resource.TenantId, StringComparison.Ordinal))\n        {\n            context.Succeed(requirement);\n        }\n        return Task.CompletedTask;\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    },
    {
      "title": "Build a closed least-privilege authorization policy",
      "language": "csharp",
      "blurb": "The registration names one policy, requires authentication and an exact permission claim, and never treats a role label, substring, or client-provided Boolean as the authorization decision.",
      "code": "using Microsoft.AspNetCore.Authorization;\n\npublic static class OrderAuthorizationPolicies\n{\n    public const string ReadOrders = \"orders.read\";\n\n    public static IServiceCollection AddOrderAuthorization(\n        this IServiceCollection services)\n    {\n        ArgumentNullException.ThrowIfNull(services);\n        services.AddAuthorization(options =>\n        {\n            options.AddPolicy(ReadOrders, policy =>\n            {\n                policy.RequireAuthenticatedUser();\n                policy.RequireClaim(\"permission\", \"orders.read\");\n            });\n        });\n        return services;\n    }\n}\n"
    }
  ]
};
