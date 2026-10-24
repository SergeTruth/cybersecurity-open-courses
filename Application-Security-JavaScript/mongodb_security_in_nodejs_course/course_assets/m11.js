window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-cc7aa6462a",
  "questions": {
    "q01": {
      "options": {
        "A": "Drivers do not automatically establish safe application query shape, tenant scope, or resource authorization.",
        "B": "Authenticated internal database access still needs appropriate grants, data handling, and operational protections.",
        "C": "Managed hosting does not implement the application's document permissions, response filtering, or tenant decisions.",
        "D": "Security depends on both application request handling and the database's identity, exposure, data-copy, and operational controls."
      }
    },
    "q02": {
      "options": {
        "A": "Request-supplied structure can select unintended operators, fields, or update behavior unless the application constructs allowed queries explicitly.",
        "B": "The driver is not a universal sanitizer that turns arbitrary request objects into the application's intended safe query.",
        "C": "JSON can represent nested objects and strings used as MongoDB operator keys.",
        "D": "Unsafe filters can change which records are selected; projecting the response does not repair unauthorized selection."
      }
    },
    "q03": {
      "options": {
        "A": "An unexpected document field can violate a model without describing the mechanism of query injection.",
        "B": "Driver query objects can contain attacker-influenced operators and structure without shell command concatenation.",
        "C": "The injection boundary is crossed when input controls database operation structure beyond the intended data values.",
        "D": "Missing indexes can affect performance but do not define attacker control over query meaning."
      }
    },
    "q04": {
      "options": {
        "A": "A well-formed document can still be accessed or changed by a caller without permission.",
        "B": "Schema rules constrain representation, while authorization must check the caller's permitted operation on the specific document.",
        "C": "Immutability does not authorize a caller to read a document or request other protected operations.",
        "D": "A required tenantId field does not prove that its value belongs to the authenticated caller."
      }
    },
    "q05": {
      "options": {
        "A": "Permitted fields still need type, range, semantic, and operation-specific validation.",
        "B": "Allowing a field name does not justify preserving arbitrary nested query or update operators beneath it.",
        "C": "Selecting only explicitly writable fields prevents clients from assigning internal or privileged fields through a whole-body update.",
        "D": "Field allowlists complement collection validation and do not depend on disabling it."
      }
    },
    "q06": {
      "options": {
        "A": "A well-formed tenant identifier supplied by a requester is still an untrusted claim about tenant authority.",
        "B": "Writes also require tenant scoping; stored tenant metadata does not automatically constrain the update query.",
        "C": "Background credentials can be broad while each job still needs an explicit permitted tenant scope.",
        "D": "Trusted server context must constrain all relevant read, write, and background paths so alternate operations cannot bypass tenant boundaries."
      }
    },
    "q07": {
      "options": {
        "A": "Connection metadata can reveal internal topology and sensitive options even after the password is removed.",
        "B": "Connection strings combine access and deployment details that can leak through configuration errors, diagnostics, and telemetry.",
        "C": "Transport encryption does not protect a URI copied into logs or error records.",
        "D": "Managed connection strings can still carry sensitive credentials and operational details requiring controlled handling."
      }
    },
    "q08": {
      "options": {
        "A": "These controls restrict transport exposure and granted authority, reducing the damage of credential misuse or application failure.",
        "B": "Deployment protections do not establish that an application's filter and update construction matches its intended contract.",
        "C": "Database role permission does not prove the current application user is authorized for each affected document.",
        "D": "Encrypted transport does not prevent credential theft through application exposure or misuse by an overprivileged identity."
      }
    },
    "q09": {
      "options": {
        "A": "Export and restore paths can use different encryption and access controls from the original database.",
        "B": "Copied production data remains sensitive and may reach readers or retention systems outside the database's original controls.",
        "C": "Individual fields, query arguments, errors, and partial results can leak document data without a full-object log.",
        "D": "Moving data into files does not remove its sensitivity or the need for access and retention controls."
      }
    },
    "q10": {
      "options": {
        "A": "Reviewing query structure, caller authority, tenant scope, exposed fields, grants, and failure paths covers the application-database boundary.",
        "B": "Transport and indexes do not establish safe query construction or appropriate response-field exposure.",
        "C": "Sanitization and schema checks do not replace document authorization, tenant enforcement, or response shaping.",
        "D": "Negative cases and copied-data access need evaluation before release rather than relying only on successful production operations."
      }
    }
  }
};
