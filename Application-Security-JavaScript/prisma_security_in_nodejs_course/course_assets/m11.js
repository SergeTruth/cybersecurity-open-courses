window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7d065e2ccb",
  "questions": {
    "q01": {
      "options": {
        "A": "Generated data access does not establish application permissions or operational controls; teams must design and verify those separately.",
        "B": "Knowing models and relations does not tell Prisma which current user may access each object.",
        "C": "Successful schema migration does not establish safe deployment credentials, exposure, backups, or monitoring.",
        "D": "Typed model operations can still violate tenant, mutation, or response policies without explicit application controls."
      }
    },
    "q02": {
      "options": {
        "A": "Generated type declarations do not automatically strip unexpected properties from incoming JSON.",
        "B": "TypeScript's compile-time checking does not validate arbitrary runtime values received by deployed code.",
        "C": "Database constraints enforce selected storage rules, not every request, authorization, or user-facing validation requirement.",
        "D": "An explicit runtime boundary must check and map external data before it becomes a Prisma operation."
      }
    },
    "q03": {
      "options": {
        "A": "The generated client is not a universal filter that transforms arbitrary request properties into intended safe behavior.",
        "B": "A type assertion changes compile-time assumptions without validating the submitted query structure.",
        "C": "Selection, filtering, sorting, and relations can all change which data is accessed or exposed.",
        "D": "The server must construct allowed operation shapes rather than letting request objects choose arbitrary fields and nested behavior."
      }
    },
    "q04": {
      "options": {
        "A": "Model operations reduce handwritten SQL syntax and make common data-access paths easier to inspect, while authorization still remains necessary.",
        "B": "Relation declarations do not derive the current caller's tenant or object permissions automatically.",
        "C": "Declared relations can contain sensitive fields and still need intentional selection and access checks.",
        "D": "Visibility of raw SQL text does not inherently make its construction, scope, or returned fields safer."
      }
    },
    "q05": {
      "options": {
        "A": "Ad hoc string replacement does not establish safe parameterization for arbitrary raw SQL construction.",
        "B": "Bound values and SQL structure have different rules; identifiers and sort syntax need explicit safe construction.",
        "C": "Raw queries need deliberate value binding, allowed structural choices, tenant constraints, and response-field review.",
        "D": "The schema does not automatically apply every application authorization or field-exposure policy to raw-query results."
      }
    },
    "q06": {
      "options": {
        "A": "A tenant's existence does not prove the requesting user is authorized to operate within it.",
        "B": "Trusted tenant context must constrain every relevant operation, including alternate write, export, raw, and background paths.",
        "C": "Scoping one method does not prove that extensions cover every operation or nested access path.",
        "D": "A shared database credential does not establish which tenant a particular job may access."
      }
    },
    "q07": {
      "options": {
        "A": "Intentional selections limit unnecessary fields and relations, reducing sensitive data loaded and exposed by a request.",
        "B": "Schema-declared fields can be internal or private and are not automatically public API data.",
        "C": "Nested relations need their own deliberate selection rules rather than inheriting every parent restriction.",
        "D": "Response filtering matters, but loading less unnecessary sensitive data also reduces exposure within the application."
      }
    },
    "q08": {
      "options": {
        "A": "Frontend types cannot prevent a caller from sending arbitrary runtime fields to the server.",
        "B": "Explicit writable-field lists prevent a whole request from assigning internal, privileged, or unintended model data.",
        "C": "Allowed top-level names do not automatically authorize arbitrary nested writes and relation changes.",
        "D": "Known relation names can still be used to request unauthorized nested mutations."
      }
    },
    "q09": {
      "options": {
        "A": "Runtime queries do not need migration authority merely to detect or adapt to schema changes.",
        "B": "Separate migration and runtime grants reduce the authority exposed by an ordinary application compromise.",
        "C": "TLS protects transport rather than a credential URI copied into logs or configuration records.",
        "D": "Keeping migration authority available to runtime code expands its compromise impact for convenience."
      }
    },
    "q10": {
      "options": {
        "A": "Types and deployment tools do not enforce every runtime input, authorization, logging, and migration policy.",
        "B": "Background access, response selection, and separated credentials can each create substantial security gaps.",
        "C": "The review must cover external inputs, authority, returned data, mutations, raw operations, deployment, and failure evidence together.",
        "D": "Denied, cross-tenant, invalid, and rollback paths need testing before deployment as well as operational monitoring."
      }
    }
  }
};
