window.COURSE_MODULE = {
  "title": "NoSQL Injection and Query Safety",
  "graphicAlt": "Validated values enter an application-owned shape with known fields and operators before a database operation.",
  "narration": "NoSQL injection occurs when untrusted input changes the meaning of a MongoDB filter, update, aggregation, or command. The practical rule is simple: do not pass request objects directly into database operations. An endpoint that expects an email string should not accept an object that changes operator logic. A report that accepts filters should not accept arbitrary fields, operators, or nested structures just because MongoDB can represent them.\n\nSafe query construction starts with application-controlled shape. Decide which fields may be filtered, which operators are supported, which values are valid, and which collection operation is allowed. User input should become a validated value for a specific business purpose, not free-form query structure. If a feature truly needs dynamic filters, define a narrow filter language and map it to known fields and known operators. Reject unsupported structures instead of trying to clean up unknown ones after the fact.\n\nSanitization can support defense, but it should not be the primary design. A sanitizer may miss a path, be bypassed by a new feature, or create false confidence. Review authentication queries, account lookup, tenant filters, search, admin tools, exports, reports, aggregations, and raw command paths carefully. Avoid server-side JavaScript or expression features unless there is a clear need and a strong review. The application should choose the query structure; the user should provide values inside that structure.",
  "narrationPoints": [
    "NoSQL injection occurs when untrusted input changes the meaning of a MongoDB filter, update, aggregation, or command.",
    "User input should become a validated value for a specific business purpose, not free-form query structure.",
    "Review authentication queries, account lookup, tenant filters, search, admin tools, exports, reports, aggregations, and raw command paths carefully.",
    "The application should choose the query structure; the user should provide values inside that structure.",
    "Avoid server-side JavaScript or expression features unless there is a clear need and a strong review.",
    "Sanitization can support defense, but it should not be the primary design."
  ]
};
