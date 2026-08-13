window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'ASP.NET Core Authentication Patterns for API Keys' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Authorize one tenant and one required API-key scope",
      "language": "csharp",
      "blurb": "The policy requires an authenticated principal, exactly one canonical tenant claim, bounded scope claims, and an exact scope token rather than substring matching.",
      "code": "using System.Security.Claims;\n\npublic static class ApiKeyClaimsAuthorization\n{\n    public static bool CanReadOrders(\n        ClaimsPrincipal principal,\n        string requestedTenant)\n    {\n        if (principal?.Identity?.IsAuthenticated != true ||\n            !IsIdentifier(requestedTenant))\n        {\n            return false;\n        }\n\n        var tenants = principal.FindAll(\"tenant_id\").Select(claim => claim.Value).Take(2).ToArray();\n        if (tenants.Length != 1 ||\n            !IsIdentifier(tenants[0]) ||\n            !string.Equals(tenants[0], requestedTenant, StringComparison.Ordinal))\n        {\n            return false;\n        }\n\n        var scopeClaims = principal.FindAll(\"scope\").Select(claim => claim.Value).Take(5).ToArray();\n        if (scopeClaims.Length is 0 or > 4 ||\n            scopeClaims.Any(value => value.Length > 512 || value.Any(char.IsControl)))\n        {\n            return false;\n        }\n\n        return scopeClaims\n            .SelectMany(value => value.Split(' ', StringSplitOptions.RemoveEmptyEntries))\n            .Any(scope => scope == \"orders.read\");\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) &&\n        value.Length <= 64 &&\n        value.All(character =>\n            character is >= 'A' and <= 'Z' or\n                         >= 'a' and <= 'z' or\n                         >= '0' and <= '9' or '-' or '_');\n}\n"
    },
    {
      "title": "Compare API-key digests without content-dependent equality",
      "language": "csharp",
      "blurb": "The verifier bounds raw key material, requires a complete SHA-256 digest, hashes into stack storage, compares the full value in fixed time, and clears the temporary digest.",
      "code": "using System.Security.Cryptography;\n\npublic static class ApiKeyDigestVerifier\n{\n    public static bool Matches(\n        ReadOnlySpan<byte> presentedKey,\n        ReadOnlySpan<byte> storedDigest)\n    {\n        if (presentedKey.Length is < 32 or > 512 ||\n            storedDigest.Length != SHA256.HashSizeInBytes)\n        {\n            return false;\n        }\n\n        Span<byte> actual = stackalloc byte[SHA256.HashSizeInBytes];\n        try\n        {\n            _ = SHA256.HashData(presentedKey, actual);\n            return CryptographicOperations.FixedTimeEquals(actual, storedDigest);\n        }\n        finally\n        {\n            CryptographicOperations.ZeroMemory(actual);\n        }\n    }\n}\n"
    }
  ]
};
