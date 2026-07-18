window.COURSE_MODULE = {
  "title": "Parsing and Type Conversion Safely",
  "graphicAlt": "Blank placeholder image for Parsing and Type Conversion Safely.",
  "narration": "Many C# validation failures begin as conversion assumptions. TryParse patterns for int, decimal, DateTime, DateTimeOffset, Guid, and enums give applications a way to handle invalid input without treating ordinary bad data as an exception path. A failed parse can become a clear validation error. A successful parse, however, is only the first step. The parsed value still needs range, context, and business checks before it is trusted.\n\nCulture-specific parsing matters because numbers and dates are represented differently across locales. A comma can be a thousands separator in one culture and a decimal separator in another. Date strings can swap month and day depending on format expectations. For APIs, invariant or explicitly documented formats are usually safer than accepting whatever the server culture happens to interpret. For user-facing forms, the application should be explicit about accepted formats and normalize carefully.\n\nEnums deserve special attention. Binding a numeric value into an enum can produce a value that is technically representable but not intended by the business workflow. Flags enums can also allow combinations that are invalid for a particular action. Validation should check that the enum value is defined and allowed in context. Treat enum parsing as the beginning of a rule, not the end.\n\nOverflow and range checks are part of safe conversion. A value can parse as a decimal and still be too large for a transaction. An integer can parse and still be outside a safe page size. A DateTimeOffset can parse and still be too far in the past or future. Safe parsing asks three questions: can the value be converted, is it within acceptable technical limits, and does it make sense for the operation being performed.",
  "narrationPoints": [
    "Many C# validation failures begin as conversion assumptions.",
    "TryParse patterns for int, decimal, DateTime, DateTimeOffset, Guid, and enums give applications a way to handle invalid input without treating ordinary bad data as.",
    "A failed parse can become a clear validation error.",
    "A successful parse, however, is only the first step.",
    "The parsed value still needs range, context, and business checks before it is trusted.",
    "Culture-specific parsing matters because numbers and dates are represented differently across locales."
  ]
};
