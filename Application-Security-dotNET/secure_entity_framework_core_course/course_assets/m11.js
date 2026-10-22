window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a32c9adab6",
  "questions": {
    "q1": {
      "options": {
        "A": "EF Core provides data access rather than automatically authorizing every requested user action.",
        "B": "The application still owns validation, resource permissions, response shaping, and safe operational configuration.",
        "C": "Connection settings and deployment identities still affect how EF Core reaches production data.",
        "D": "EF Core works with database providers and does not eliminate database security concerns."
      }
    },
    "q2": {
      "options": {
        "A": "Connection details can grant real data access and are not decorative metadata.",
        "B": "A disclosed credential can be reused outside its originally intended application process.",
        "C": "Exposed database access material may allow direct reads or privileged changes to sensitive records.",
        "D": "A file's name does not encrypt or protect credential values in a public repository."
      }
    },
    "q3": {
      "options": {
        "A": "Provider-supported parameter binding keeps input values separate from application-controlled query structure.",
        "B": "Safe query construction does not disable or replace resource authorization checks.",
        "C": "Clients should choose supported operations rather than supply arbitrary executable database fragments.",
        "D": "Queries can project selected fields instead of automatically returning every entity property."
      }
    },
    "q4": {
      "options": {
        "A": "EF Core can use application-defined queries without accepting client-supplied command structure.",
        "B": "The application must enforce approved shapes rather than trust arbitrary client query choices.",
        "C": "Map allowed filters and sort choices to reviewed internal query expressions.",
        "D": "Query shape controls returned fields, permitted predicates, and expensive operations affecting security."
      }
    },
    "q5": {
      "options": {
        "A": "Raw SQL is not universally safer than provider-supported expressions and parameter binding.",
        "B": "Raw commands put structure and parameter safety more directly under developer control.",
        "C": "Raw SQL still needs correct parameter binding for externally influenced values.",
        "D": "Raw queries can access sensitive records and need appropriate permission and projection rules."
      }
    },
    "q6": {
      "options": {
        "A": "Stored procedures execute database behavior rather than style application interfaces.",
        "B": "Procedures can fail and still require error, transaction, and permission review.",
        "C": "A procedure can contain unsafe dynamic SQL or run with excessive authority.",
        "D": "Stored procedures can accept parameters, which still require safe internal use."
      }
    },
    "q7": {
      "options": {
        "A": "Filtering and resource authorization complement each other in restricting returned or modified records.",
        "B": "Object authorization normally depends on trusted identity rather than replacing authentication.",
        "C": "Database records and operations require resource checks beyond static-file concerns.",
        "D": "Feature permission does not automatically grant access to every record or tenant selected by input."
      }
    },
    "q8": {
      "options": {
        "A": "Tenant boundaries protect actual customer data rather than merely visual labels.",
        "B": "A submitted tenant identifier must agree with trusted identity and resource ownership.",
        "C": "Query filters need tests and review, including paths that bypass or change their assumptions.",
        "D": "Derive and enforce tenant context consistently so queries cannot cross customer data boundaries."
      }
    },
    "q9": {
      "options": {
        "A": "Operation-specific DTOs restrict writable fields and avoid exposing broad persistence entities to binding.",
        "B": "Audit and ownership fields should remain server-controlled unless explicitly authorized for change.",
        "C": "Limiting fields does not establish who is permitted to update the selected entity.",
        "D": "Narrow update models can change selected properties rather than every database column."
      }
    },
    "q10": {
      "options": {
        "A": "Migrations and seed logic can directly modify production schema, data, and permissions.",
        "B": "Review delivery changes because schema, defaults, roles, and seed values alter application behavior.",
        "C": "These operations execute real database changes beyond editing local comments.",
        "D": "Database changes are part of the trusted release and need production review."
      }
    },
    "q11": {
      "options": {
        "A": "Operational EF diagnostics can be retained and accessed by multiple systems and teams.",
        "B": "Provider diagnostics and sensitive logging modes can include actual query parameter values.",
        "C": "Diagnostic copies can expose private values independently of the protected primary database.",
        "D": "Production troubleshooting should not require indiscriminate logging of secret or personal data."
      }
    },
    "q12": {
      "options": {
        "A": "Result limits do not replace the credentials used to access the database.",
        "B": "Pagination bounds retrieval and does not inherently make private records public.",
        "C": "Bounded results still need caller and tenant authorization for every included record.",
        "D": "Restrict broad reads and total work to reduce data exposure and shared database pressure."
      }
    }
  }
};
