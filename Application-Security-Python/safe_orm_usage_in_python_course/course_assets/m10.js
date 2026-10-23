window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-4020b87401",
  "questions": {
    "q01": {
      "options": {
        "A": "ORM mapping does not automatically encrypt stored model attributes.",
        "B": "ORMs translate model operations into database queries and record changes.",
        "C": "Schemas still need managed migrations and appropriate database constraints.",
        "D": "Encryption requires explicit controls beyond ordinary ORM model mapping."
      }
    },
    "q02": {
      "options": {
        "A": "Model relationships do not automatically establish caller object authorization.",
        "B": "Structural query parameters need controls beyond ordinary value binding.",
        "C": "Tenant membership does not authorize every related object automatically.",
        "D": "Unsafe queries and overly broad updates can undermine ORM protections."
      }
    },
    "q03": {
      "options": {
        "A": "Binding keeps supplied values separate from executable query structure.",
        "B": "Binding passes values separately rather than escaping already assembled statements.",
        "C": "Converting values to strings does not separate SQL syntax.",
        "D": "Escaping completed SQL is different from binding values separately."
      }
    },
    "q04": {
      "options": {
        "A": "Concatenated values can become executable SQL instead of plain data.",
        "B": "ORM sessions do not sanitize already interpolated query structure automatically.",
        "C": "Quoted text can still alter SQL when concatenated unsafely.",
        "D": "Passing assembled SQL through an ORM does not repair injection."
      }
    },
    "q05": {
      "options": {
        "A": "Removing spaces does not validate arbitrary structural query expressions.",
        "B": "Map external sort choices to known approved internal fields.",
        "C": "Public requests should not expose every possible model attribute.",
        "D": "Space removal cannot establish that a requested field is approved."
      }
    },
    "q06": {
      "options": {
        "A": "Filters can expose relationships or trigger expensive query behavior.",
        "B": "Binding values does not restrict field names and operators.",
        "C": "Structural filter choices require allowlists beyond safe value binding.",
        "D": "Constrained filters prevent unauthorized field, relationship, and query access."
      }
    },
    "q07": {
      "options": {
        "A": "Membership alone does not establish permission for a particular record.",
        "B": "Object authorization evaluates this caller's rights over this specific record.",
        "C": "Public primary keys identify objects without establishing access permission.",
        "D": "Tenant checks complement rather than replace specific object access decisions."
      }
    },
    "q08": {
      "options": {
        "A": "Apply authorization scope so list results exclude inaccessible records.",
        "B": "Pagination does not determine or remove unauthorized record access.",
        "C": "Tenant membership may not authorize every record within that tenant.",
        "D": "Authorization scoping should constrain the query before paging results."
      }
    },
    "q09": {
      "options": {
        "A": "Multiple approved updates do not constitute unauthorized field binding.",
        "B": "Server defined transfer objects can explicitly restrict writable fields.",
        "C": "Transaction size does not define whether request fields are unauthorized.",
        "D": "Broad request binding may update fields callers must not control."
      }
    },
    "q10": {
      "options": {
        "A": "Reject protected fields before any model binding can affect state.",
        "B": "UI restrictions do not prevent callers invoking writable API fields.",
        "C": "Explicit writable field allowlists prevent unauthorized request driven model changes.",
        "D": "Hidden interface fields remain exploitable when writable through API requests."
      }
    },
    "q11": {
      "options": {
        "A": "Generic serializers do not universally apply suitable public field policies.",
        "B": "Lazy relationships may expose sensitive nested data without raw SQL.",
        "C": "Default serialization should not be assumed to enforce public field selection.",
        "D": "Review responses to avoid exposing sensitive columns and related records."
      }
    },
    "q12": {
      "options": {
        "A": "Wrapping interpolated SQL does not undo injection introduced during construction.",
        "B": "Bind values separately and restrict any necessary structural SQL choices.",
        "C": "Raw SQL still requires binding for untrusted data values.",
        "D": "Trusted source text does not make interpolated caller values trustworthy."
      }
    },
    "q13": {
      "options": {
        "A": "Schema changes can weaken defaults, constraints, and security assumptions.",
        "B": "Database changes affect confidentiality and integrity as well as availability.",
        "C": "Migration tooling cannot automatically preserve every application authorization assumption.",
        "D": "Tenant and integrity assumptions need review during schema evolution."
      }
    },
    "q14": {
      "options": {
        "A": "Transactions do not prevent individual database statements from failing.",
        "B": "Transaction boundaries do not establish permission for included operations.",
        "C": "Transactions keep related changes consistent through commit or rollback behavior.",
        "D": "Successful commits do not prove each included operation was authorized."
      }
    },
    "q15": {
      "options": {
        "A": "Bounded operation identifiers can support diagnostics without exposing sensitive values.",
        "B": "SQL injection prevention does not make bound secrets safe to log.",
        "C": "Parameterization protects query structure rather than confidentiality of logged values.",
        "D": "Exclude credentials and sensitive query data from ORM diagnostics."
      }
    },
    "q16": {
      "options": {
        "A": "Avoiding raw SQL leaves authorization and response exposure risks unresolved.",
        "B": "Tenant scope alone does not authorize every possible object modification.",
        "C": "Combine safe query construction with permissions and controlled data exposure.",
        "D": "ORM use does not automatically enforce field permissions or minimization."
      }
    }
  }
};
