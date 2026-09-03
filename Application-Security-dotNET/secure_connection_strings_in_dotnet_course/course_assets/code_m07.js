window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'EF Core, Migrations, and Runtime Usage' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Compose a tenant-scoped projection for EF Core",
      "language": "csharp",
      "blurb": "The query helper validates and snapshots the tenant and result limit, filters before projection, selects only public columns, applies deterministic ordering and an application-owned Take bound, and never returns tracked entity instances.",
      "code": "public sealed record OrderRow(\n    string Id,\n    string TenantId,\n    string Status,\n    long TotalCents,\n    DateTimeOffset CreatedUtc);\n\npublic sealed record OrderSummary(\n    string Id,\n    string Status,\n    long TotalCents);\n\npublic static class TenantOrderQuery\n{\n    public static IQueryable<OrderSummary> Apply(\n        IQueryable<OrderRow> orders,\n        string tenantId,\n        int take)\n    {\n        ArgumentNullException.ThrowIfNull(orders);\n        if (!IsIdentifier(tenantId) || take is < 1 or > 100)\n            throw new ArgumentException(\"Tenant order query rejected.\");\n        return orders\n            .Where(order => order.TenantId == tenantId)\n            .OrderByDescending(order => order.CreatedUtc)\n            .Select(order => new OrderSummary(order.Id, order.Status, order.TotalCents))\n            .Take(take);\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    },
    {
      "title": "Keep migration and runtime principals structurally separate",
      "language": "csharp",
      "blurb": "The immutable policy requires two distinct canonical identities, fixes their reviewed role names, permits schema changes only to the migration principal, and rejects any runtime DDL or migration traffic-serving capability.",
      "code": "public sealed class DatabasePrincipalSeparation\n{\n    private DatabasePrincipalSeparation(\n        string runtimeIdentity,\n        string migrationIdentity,\n        string runtimeRole,\n        string migrationRole)\n    {\n        RuntimeIdentity = runtimeIdentity;\n        MigrationIdentity = migrationIdentity;\n        RuntimeRole = runtimeRole;\n        MigrationRole = migrationRole;\n    }\n\n    public string RuntimeIdentity { get; }\n    public string MigrationIdentity { get; }\n    public string RuntimeRole { get; }\n    public string MigrationRole { get; }\n\n    public static DatabasePrincipalSeparation Create(\n        string runtimeIdentity,\n        string migrationIdentity,\n        bool runtimeCanDdl,\n        bool migrationCanServeTraffic)\n    {\n        if (!IsIdentifier(runtimeIdentity) || !IsIdentifier(migrationIdentity) ||\n            string.Equals(runtimeIdentity, migrationIdentity, StringComparison.Ordinal) ||\n            runtimeCanDdl || migrationCanServeTraffic)\n        {\n            throw new ArgumentException(\"Database principal separation rejected.\");\n        }\n        return new DatabasePrincipalSeparation(\n            runtimeIdentity, migrationIdentity, \"orders_runtime\", \"orders_migration\");\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    }
  ]
};
