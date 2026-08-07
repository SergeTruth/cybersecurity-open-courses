window.COURSE_MODULE = {
  "title": "Dynamic SQL, Identifiers, Sorting, and Allowlists",
  "graphicAlt": "Trust-boundary map for Dynamic SQL, Identifiers, Sorting, and Allowlists in SQL Injection Prevention in Node.js, with distinct caller, application, platform, and external-service zones connected only through labeled validation and authorization checkpoints.",
  "narration": "Dynamic query behavior is where many prevention programs become sloppy. Some query parts are structure rather than values: table names, column names, sort directions, operators, SQL functions, joins, report modes, and filter types. Ordinary value parameters are not the right tool for all of those elements. If a user chooses sort by created date, the application should map that choice to a known column and direction, not paste arbitrary text into an ORDER BY clause.\n\nAllowlists are the main control for structural choices. Define the supported public options, then map each option to an application-controlled fragment. For example, a request value like createdDate can map internally to a known column, while a value like oldest can map to a known direction and tie-breaker. Unsupported choices should be rejected or handled with a safe default. The same model applies to report types, filter modes, status lists, date ranges, search options, and operation names.\n\nKeep dynamic SQL construction small, centralized, and easy to review. A scattered set of string fragments across route handlers is difficult to reason about. A compact mapping table or query helper with tests is much easier to inspect. Also avoid exposing internal table or column names as public API choices unless that is an intentional design decision. Public options should describe business behavior; the application should translate those options into safe database structure.",
  "narrationPoints": [
      "Dynamic query behavior is where many prevention programs become sloppy.",
      "Unsupported choices should be rejected or handled with a safe default.",
      "Also avoid exposing internal table or column names as public API choices unless that is an intentional design decision.",
      "Keep dynamic SQL construction small, centralized, and easy to review.",
      "Public options should describe business behavior; the application should translate those options into safe database structure.",
      "Some query parts are structure rather than values: table names, column names, sort directions, operators, SQL functions, joins, report modes, and filter types."
  ]
};
