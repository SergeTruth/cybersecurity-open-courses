window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'XPath, Queries, and Injection-Resistant Design' into concrete defensive .NET review patterns.",
  "codeExamples": [
    {
      "title": "Query XML with LINQ instead of concatenating XPath",
      "language": "csharp",
      "blurb": "Tenant and order identifiers are validated as data and compared directly against element values. No request value becomes XPath syntax, and duplicate or missing matches fail instead of selecting an attacker-shaped node.",
      "code": "using System.Xml;\nusing System.Xml.Linq;\n\npublic static class OrderXmlLookup\n{\n    public static XElement Find(XDocument document, string tenantId, string orderId)\n    {\n        ArgumentNullException.ThrowIfNull(document);\n        if (!IsIdentifier(tenantId) || !IsIdentifier(orderId))\n            throw new ArgumentException(\"XML lookup identifiers rejected.\");\n        var root = document.Root;\n        if (root is null || root.Name != \"orders\" || root.HasAttributes)\n            throw new XmlException(\"Orders document rejected.\");\n        var matches = root.Elements(\"order\").Where(order =>\n            (string?)order.Attribute(\"tenant\") == tenantId &&\n            (string?)order.Attribute(\"id\") == orderId).Take(2).ToArray();\n        return matches.Length == 1\n            ? new XElement(matches[0])\n            : throw new XmlException(\"XML order match was not unique.\");\n    }\n\n    private static bool IsIdentifier(string value) =>\n        !string.IsNullOrEmpty(value) && value.Length <= 64 &&\n        value.All(character => char.IsAsciiLetterOrDigit(character) || character is '-' or '_');\n}\n"
    },
    {
      "title": "Select XPath only from a reviewed catalog",
      "language": "csharp",
      "blurb": "A closed enum maps to complete application-owned XPath literals. Callers cannot supply predicates, functions, namespace prefixes, or path fragments, and the helper rejects rather than silently truncates a result above the application ceiling.",
      "code": "using System.Xml;\nusing System.Xml.Linq;\nusing System.Xml.XPath;\n\npublic enum ReviewedXmlReport { FailedJobs, PendingOrders }\n\npublic static class ReviewedXPath\n{\n    public static IReadOnlyList<XElement> Select(XDocument document, ReviewedXmlReport report)\n    {\n        ArgumentNullException.ThrowIfNull(document);\n        if (!Enum.IsDefined(report)) throw new ArgumentOutOfRangeException(nameof(report));\n        var expression = report switch\n        {\n            ReviewedXmlReport.FailedJobs => \"/operations/job[@state='failed']\",\n            ReviewedXmlReport.PendingOrders => \"/operations/order[@state='pending']\",\n            _ => throw new ArgumentOutOfRangeException(nameof(report))\n        };\n        var selected = document.XPathSelectElements(expression)\n            .Take(1_001)\n            .Select(element => new XElement(element))\n            .ToArray();\n        if (selected.Length > 1_000)\n            throw new XmlException(\"Reviewed XPath result limit exceeded.\");\n        return selected;\n    }\n}\n"
    }
  ]
};
