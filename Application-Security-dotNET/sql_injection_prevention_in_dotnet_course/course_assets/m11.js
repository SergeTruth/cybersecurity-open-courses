window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b765fe717b",
  "questions": {
    "q1": {
      "options": {
        "A": "Safe construction still needs appropriate database identity and resource permissions.",
        "B": "Keep SQL syntax application-controlled and send caller-supplied values through provider-supported parameter binding.",
        "C": "Public database error detail can expose internals and is not a prevention strategy.",
        "D": "Parameterization avoids treating values as syntax rather than guessing every malicious string."
      }
    },
    "q2": {
      "options": {
        "A": "Stored values can cross new trust boundaries when reused in later operations.",
        "B": "A database does not automatically reject every unsafe command assembled by application code.",
        "C": "Stored or internal values still need parameters when they later influence a database command.",
        "D": "A value becomes a parameter through safe API use rather than merely internal origin."
      }
    },
    "q3": {
      "options": {
        "A": "Bind variable values independently so they cannot change the intended command structure.",
        "B": "Parameter binding does not require disclosing more database detail in public errors.",
        "C": "Authorization should remain explicit and reviewable alongside safe query construction.",
        "D": "Parameters represent values and should not allow callers to choose arbitrary executable structure."
      }
    },
    "q4": {
      "options": {
        "A": "Manual escaping still needs careful context and does not remove data-access review.",
        "B": "Ad hoc filtering is not universally stronger than the provider's supported parameter binding.",
        "C": "Blacklists and escaping can fail when encoding, syntax, providers, or use contexts change.",
        "D": "Filtering strings does not restrict the authority granted to the database identity."
      }
    },
    "q5": {
      "options": {
        "A": "ORM queries still need semantic validation and resource-level authorization.",
        "B": "LINQ and supported parameterized APIs separate variable data from generated database operations.",
        "C": "The database identity's permissions come from database configuration rather than ORM selection alone.",
        "D": "Unsafe manually assembled raw SQL can still be passed through ORM escape hatches."
      }
    },
    "q6": {
      "options": {
        "A": "Raw SQL can read or change highly sensitive data and requires suitable permissions.",
        "B": "Raw commands require tests of structure, values, failures, and supported query choices.",
        "C": "Manual command text needs an explicit boundary between approved syntax and parameter values.",
        "D": "Raw SQL can be used deliberately when its construction and permission contracts are reviewed."
      }
    },
    "q7": {
      "options": {
        "A": "Procedures can fail and require normal database error and transaction handling.",
        "B": "Stored procedures can accept parameters and must use them safely internally.",
        "C": "Procedures implement database logic rather than only user-interface rendering.",
        "D": "Unsafe dynamic SQL and excessive execution rights can exist inside a stored procedure."
      }
    },
    "q8": {
      "options": {
        "A": "A validation check does not automatically transform string-built SQL into bound parameters.",
        "B": "Database account authority must be configured independently of input validation.",
        "C": "Validation should happen before sensitive use rather than only after command execution.",
        "D": "Validate domain meaning and separately bind values to preserve the intended command structure."
      }
    },
    "q9": {
      "options": {
        "A": "Map supported caller choices to known query shapes instead of accepting arbitrary SQL fragments.",
        "B": "SQL structure determines executed behavior and which protected data can be accessed.",
        "C": "Unrestricted query structure complicates authorization by exposing operations beyond the supported contract.",
        "D": "The server must define safe supported queries rather than trust client-selected command structure."
      }
    },
    "q10": {
      "options": {
        "A": "Ordinary runtime operations generally need fewer permissions than full database administration.",
        "B": "Narrow authority limits potential damage when an unexpected or compromised path executes.",
        "C": "Least privilege limits impact but does not prevent injection through unsafe query construction.",
        "D": "A restricted account's connection details may still contain confidential access material."
      }
    },
    "q11": {
      "options": {
        "A": "A nonsecret request reference and safe support guidance can be appropriate public context.",
        "B": "A bounded validation message can help users without disclosing database implementation.",
        "C": "Detailed SQL and internal diagnostics can expose infrastructure, credentials, and protected records.",
        "D": "A generic operation-failure message can communicate status without unnecessary internal disclosure."
      }
    },
    "q12": {
      "options": {
        "A": "Internal or administrative tools can still contain unsafe queries and excessive permissions.",
        "B": "Reporting and imports can reuse stored or externally supplied values in later commands.",
        "C": "Search, reporting, exports, and administrative operations often access databases directly.",
        "D": "Flexible query options and powerful operational access make these paths important security review targets."
      }
    }
  }
};
