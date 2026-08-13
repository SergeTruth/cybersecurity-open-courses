window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Secure API and Minimal API Practices' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Reject unknown JSON members for minimal API commands",
      "language": "csharp",
      "blurb": "The JSON configuration keeps case-sensitive names, rejects comments, trailing commas, unknown members, and deep payloads so over-posted fields fail before endpoint logic runs.",
      "code": "using System.Text.Json;\nusing System.Text.Json.Serialization;\n\npublic static class StrictMinimalApiJson\n{\n    public static IServiceCollection AddStrictMinimalApiJson(\n        this IServiceCollection services)\n    {\n        ArgumentNullException.ThrowIfNull(services);\n        services.ConfigureHttpJsonOptions(options =>\n        {\n            options.SerializerOptions.PropertyNameCaseInsensitive = false;\n            options.SerializerOptions.ReadCommentHandling = JsonCommentHandling.Disallow;\n            options.SerializerOptions.AllowTrailingCommas = false;\n            options.SerializerOptions.MaxDepth = 8;\n            options.SerializerOptions.UnmappedMemberHandling =\n                JsonUnmappedMemberHandling.Disallow;\n        });\n        return services;\n    }\n}\n"
    },
    {
      "title": "Map a minimal API endpoint with explicit policy and rate limits",
      "language": "csharp",
      "blurb": "The route uses a fixed authorization policy and limiter, validates a closed command before returning a bounded response DTO, and does not expose persistence entities directly.",
      "code": "using System.Text;\nusing Microsoft.AspNetCore.Builder;\nusing Microsoft.AspNetCore.Routing;\n\npublic sealed record CreateOrderRequest(\n    string CustomerId,\n    string Description);\n\npublic sealed record CreateOrderResponse(\n    string OrderId,\n    string Status);\n\npublic static class OrderEndpoints\n{\n    public static RouteHandlerBuilder MapCreateOrder(IEndpointRouteBuilder routes)\n    {\n        ArgumentNullException.ThrowIfNull(routes);\n        return routes.MapPost(\"/orders\", (CreateOrderRequest request) =>\n        {\n            if (request is null ||\n                !IsIdentifier(request.CustomerId) ||\n                !IsDescription(request.Description))\n                return Results.BadRequest();\n            return Results.Created(\n                \"/orders/generated\",\n                new CreateOrderResponse(\"generated\", \"accepted\"));\n        })\n        .RequireAuthorization(\"orders.write\")\n        .RequireRateLimiting(\"api\");\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n\n    private static bool IsDescription(string value) =>\n        !string.IsNullOrWhiteSpace(value) &&\n        Encoding.UTF8.GetByteCount(value) <= 512 &&\n        string.Equals(value, value.Trim(), StringComparison.Ordinal) &&\n        !value.Any(char.IsControl);\n}\n"
    }
  ]
};
