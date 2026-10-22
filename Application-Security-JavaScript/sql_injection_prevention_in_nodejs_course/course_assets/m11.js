window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e1bd8011dd",
  "questions": {
    "q01": {
      "options": {
        "A": "Injection occurs when untrusted text crosses the data boundary and changes the structure of executed SQL.",
        "B": "Attackers can influence application-supplied SQL without controlling the database server or its software.",
        "C": "Correctly bound values remain data; their presence alone does not make a properly parameterized query injectable.",
        "D": "Restricted privileges limit consequences but do not prevent unsafe string construction from changing SQL syntax."
      }
    },
    "q02": {
      "options": {
        "A": "Ordinary value placeholders do not safely stand in for arbitrary SQL fragments or table identifiers.",
        "B": "Parameter binding preserves the distinction between the query's SQL structure and untrusted scalar values.",
        "C": "Binding protects the SQL boundary while business validation and object authorization remain separate application responsibilities.",
        "D": "Later dynamic SQL must bind its own values; an earlier parameterized call does not protect subsequent concatenation."
      }
    },
    "q03": {
      "options": {
        "A": "JavaScript template syntax inserts text into a string without preserving the database's code-versus-data boundary.",
        "B": "Interpolating untrusted values into SQL can let their contents become executable query structure.",
        "C": "Escaping rules depend on the database dialect, encoding, context, and connection configuration and are easy to misuse.",
        "D": "Some injection contexts accept operators, numeric expressions, or other syntax without requiring quote characters."
      }
    },
    "q04": {
      "options": {
        "A": "Scalar placeholders represent data values rather than selecting trusted SQL column identifiers in an ORDER BY clause.",
        "B": "String-value escaping and identifier construction follow different rules, so arbitrary identifiers need a controlled mapping.",
        "C": "Map supported public choices to fixed application-owned SQL identifiers and reject unsupported sort selections.",
        "D": "Alphanumeric text can still select unauthorized columns or introduce unexpected identifiers and keywords in structural positions."
      }
    },
    "q05": {
      "options": {
        "A": "ORM query execution does not automatically check whether the caller may access each returned object.",
        "B": "Raw fragments and dynamic identifiers can remain unsafe even when surrounded by query-builder-generated SQL.",
        "C": "ORM abstractions help parameterize ordinary queries, but raw SQL boundaries and application authorization still require review.",
        "D": "Parameterization protects SQL structure while validation and authorization enforce different business and access requirements."
      }
    },
    "q06": {
      "options": {
        "A": "Validation helps enforce allowed values but should not replace parameter binding at the SQL execution boundary.",
        "B": "Bound parameters do not establish valid business state, acceptable ranges, or the caller's authority over an object.",
        "C": "Allowlisting field names controls identifiers without establishing the validity of the values associated with those fields.",
        "D": "Validation enforces application rules while binding prevents ordinary values from becoming executable SQL structure."
      }
    },
    "q07": {
      "options": {
        "A": "Injectable reads can disclose sensitive records even when the database role cannot modify stored data.",
        "B": "Prepared statements require appropriate execution and data privileges rather than broad ownership of database objects.",
        "C": "Narrow runtime grants reduce the reachable data and operations if an injection or other query defect occurs.",
        "D": "Database grants do not automatically implement every application-level ownership or tenant authorization rule."
      }
    },
    "q08": {
      "options": {
        "A": "Procedure internals must keep untrusted values bound rather than concatenate them into dynamically executed SQL.",
        "B": "Stored procedures may construct dynamic SQL strings that remain injectable unless their own boundaries are protected.",
        "C": "Procedure arguments still require safe parameter binding at the calling boundary and inside any dynamic execution.",
        "D": "Procedure execution identity and application tenant rules vary, so ownership alone does not establish caller authorization."
      }
    },
    "q09": {
      "options": {
        "A": "Queries and parameters can expose sensitive inputs, schema structure, and deployment information even without returning stored rows.",
        "B": "Generic external errors can coexist with carefully redacted internal diagnostics, monitoring, and alerting.",
        "C": "Stack traces can reveal code paths, internals, and sensitive context despite omitting database credentials.",
        "D": "Minimal external errors avoid leaking SQL structure, bound values, database metadata, and sensitive driver details."
      }
    },
    "q10": {
      "options": {
        "A": "A keyword search misses indirect query construction, raw ORM APIs, stored dynamic SQL, and privilege problems.",
        "B": "One successful test cannot establish the safety of all production query paths and dynamic construction cases.",
        "C": "Automated scanning complements privilege review, failure-path tests, and telemetry rather than replacing those controls.",
        "D": "A practical review follows query construction through execution, checking identifiers, values, authority, error handling, and verification controls."
      }
    }
  }
};
