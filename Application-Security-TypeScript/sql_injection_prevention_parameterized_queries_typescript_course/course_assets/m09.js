window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a458b6dc4d",
  "questions": {
    "q1": {
      "options": {
        "A": "Interpolation inserts text into the query; it does not universally convert an email value into an identifier.",
        "B": "Request text interpolated into SQL can be interpreted as query syntax rather than remain separate bound data.",
        "C": "Drivers can execute generated SQL text, which makes unsafe construction a real runtime concern.",
        "D": "Transport location does not determine SQL safety; values need binding whether supplied by queries, bodies, or headers."
      }
    },
    "q2": {
      "options": {
        "A": "Binding protects SQL structure but does not establish acceptable types, lengths, ranges, meaning, or permissions.",
        "B": "Correct binding keeps values distinct from statement structure rather than requiring application-side string concatenation.",
        "C": "Driver parameter APIs can be useful without a permanently stored prepared statement on the server.",
        "D": "Separate statement and value channels let the driver handle database-specific representation while preserving the code-data boundary."
      }
    },
    "q3": {
      "options": {
        "A": "Escaping depends on dialect, connection mode, and context, whereas binding directly preserves the separation of values from syntax.",
        "B": "Authentication does not determine whether a chosen escaping rule correctly handles the relevant SQL context.",
        "C": "Properly bound strings can contain quotes and be stored in text columns without unsafe manual rewriting.",
        "D": "TypeScript permits strings containing quotes and does not reject runtime SQL injection through compile-time character checks."
      }
    },
    "q4": {
      "options": {
        "A": "Raw methods may have different binding rules or deliberately accept SQL fragments, so ORM membership alone is insufficient evidence.",
        "B": "A typed result describes expected output and does not prove safe construction of the SQL sent to the database.",
        "C": "Verify the specific raw API's parameter semantics and track every dynamic fragment to a controlled source.",
        "D": "Read-only queries can disclose protected data, so construction review is necessary beyond modifying statements."
      }
    },
    "q5": {
      "options": {
        "A": "Authorization may restrict sorting choices, but the placeholder issue concerns SQL grammar rather than administrator status alone.",
        "B": "Ordinary placeholders supply values, while a column identifier is part of the statement's structural syntax.",
        "C": "Parameterized queries can include ORDER BY with fixed or safely selected server-authored structural fragments.",
        "D": "Removing punctuation from a column name does not make a value placeholder represent an identifier."
      }
    },
    "q6": {
      "options": {
        "A": "An explicit mapping lets supported public sort choices select fixed developer-authored identifiers without accepting arbitrary SQL structure.",
        "B": "Treating a complete ORDER BY clause as an escaped value does not establish a safe structural grammar boundary.",
        "C": "A short column string can still select unintended fields or introduce an unapproved structural choice.",
        "D": "A type assertion does not transform or validate the runtime string before SQL interpolation."
      }
    },
    "q7": {
      "options": {
        "A": "Validation and binding address different concerns, so validated external values should still remain separately bound.",
        "B": "Browser-authored SQL predicates give the caller control of query structure and cannot serve as a trusted server contract.",
        "C": "Escaping a whole already-interpolated statement cannot reliably recover intended boundaries between SQL syntax and data.",
        "D": "Fixed server predicates combined with a separate value list preserve safe structure while supporting optional filters."
      }
    },
    "q8": {
      "options": {
        "A": "Validation checks accepted data semantics rather than instructing the driver which placeholder grammar to implement.",
        "B": "Validating an identifier does not turn an ordinary scalar placeholder into a structural identifier placeholder.",
        "C": "Binding protects the query boundary, while validation enforces meaningful types, lengths, ranges, and business constraints.",
        "D": "Read-only access still requires authorization to protect other users' records and confidential data."
      }
    },
    "q9": {
      "options": {
        "A": "Safely bound identifiers prevent one injection path but do not authorize access to another user's or tenant's document.",
        "B": "A scalar placeholder remains a bound value rather than automatically becoming a table identifier.",
        "C": "Binding a value does not grant new database privileges to that value or to the requesting user.",
        "D": "Databases use bound values in the statement's defined expressions rather than ignore them for being parameterized."
      }
    },
    "q10": {
      "options": {
        "A": "Least privilege does not rewrite or automatically parameterize unsafe raw SQL elsewhere in the application.",
        "B": "Narrow database grants limit reachable data and operations if a query defect or another application control is bypassed.",
        "C": "Database grants do not make untrusted interpolation into SQL identifiers structurally safe.",
        "D": "Stored procedures and raw-query APIs can still construct dynamic SQL and need their own boundary review."
      }
    }
  }
};
