window.COURSE_MODULE = {
  "title": "Defining Expected Data",
  "graphicAlt": "Blank placeholder graphic for defining expected JavaScript data",
  "narration": "Strong validation starts with a clear contract. Before processing data, define what the application expects: type, length, format, range, required fields, optional fields, allowed values, nested objects, arrays, and business rules. If the contract is vague, validation usually becomes a collection of partial checks that are hard to test and easy to bypass accidentally.\n\nType checks alone are not enough. A value may be a string but still be too long, in the wrong format, or unacceptable for the current workflow. A number may parse successfully but exceed an allowed range. An array may contain the right general type but include too many items or unexpected nested objects. A boolean may be valid syntactically but not a field the user is allowed to set.\n\nBusiness rules complete the contract. A start date should come before an end date. A role value should come from an approved set. An account identifier should match the authenticated user or tenant context. A price, discount, or workflow state should follow the application's rules. Well-formed data can still be unsafe when it violates business meaning.\n\nContracts should be visible to developers, testers, and reviewers. Schema definitions, shared validation functions, API specifications, TypeScript interfaces paired with runtime schemas, and documented request models all help. The more explicit the contract, the easier it is to reject invalid input consistently and test the behavior when future changes arrive.",
  "narrationPoints": [
    "Strong validation starts with a clear contract.",
    "Type checks alone are not enough.",
    "Business rules complete the contract.",
    "Contracts should be visible to developers, testers, and reviewers."
  ]
};
