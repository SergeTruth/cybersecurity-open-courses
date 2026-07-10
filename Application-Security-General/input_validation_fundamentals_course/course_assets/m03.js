window.COURSE_MODULE = {
  "title": "Defining Expected Input",
  "graphicAlt": "Blank placeholder graphic for expected input contracts",
  "narration": "Good validation begins with clear expectations. Before writing validation logic, define what acceptable input looks like. That definition should include data type, length, format, allowed range, required and optional fields, allowed values, and relationships between fields. Without a clear contract, validation often becomes a patchwork of checks that are hard to maintain and easy to bypass accidentally.\n\nType and format are only the beginning. A date may be syntactically valid but outside the allowed business window. A numeric value may parse correctly but exceed a safe or sensible range. A string may match a pattern but refer to a value the current user is not allowed to select. Real validation includes both technical shape and business meaning.\n\nRelationships between fields matter. A start date should usually come before an end date. A shipping method may depend on destination country. A discount code may apply only to certain product categories. An account identifier may need to match the authenticated user or tenant context. These checks are validation and authorization-adjacent business rules, and they should be explicit.\n\nClear contracts make validation easier to review and test. Schemas, request models, typed objects, and documented API contracts help developers, testers, and security reviewers understand what the system expects. When the contract is visible, invalid input becomes easier to reject consistently, and future changes are less likely to create ambiguous behavior.",
  "narrationPoints": [
    "Good validation begins with clear expectations.",
    "Type and format are only the beginning.",
    "Relationships between fields matter.",
    "Clear contracts make validation easier to review and test."
  ]
};
