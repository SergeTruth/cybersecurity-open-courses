window.COURSE_MODULE = {
  "title": "Defining Expected Data",
  "graphicAlt": "Blank placeholder graphic for expected Python data contracts",
  "narration": "Strong validation starts before writing code. Define the expected data contract first. That contract should cover type, length, format, range, required fields, optional fields, allowed values, nested structures, and business rules. Without a clear contract, validation tends to become scattered checks that are hard to test and easy to miss during maintenance.\n\nType is only part of the contract. A value may be an integer but still outside the allowed range. A string may match a pattern but be too long for storage or business use. A list may contain dictionaries, but each item may need required keys and allowed values. Python makes nested dictionaries and lists easy to pass around, so nested validation needs deliberate attention.\n\nBusiness rules matter as much as technical shape. A date range should make sense. A status transition should be allowed for the current workflow. An account identifier should match the authenticated tenant or user context. A discount value should obey policy. If validation only checks that fields exist, it may allow well-formed requests that still violate the application model.\n\nClear contracts make validation easier to share across teams. API schemas, Pydantic models, dataclasses with explicit runtime checks, Django forms, serializer classes, and documented request models can all express expectations. The best contract is visible enough for developers, testers, and reviewers to understand what is accepted and what should be rejected before processing.",
  "narrationPoints": [
    "Strong validation starts before writing code.",
    "Type is only part of the contract.",
    "Business rules matter as much as technical shape.",
    "Clear contracts make validation easier to share across teams."
  ]
};
