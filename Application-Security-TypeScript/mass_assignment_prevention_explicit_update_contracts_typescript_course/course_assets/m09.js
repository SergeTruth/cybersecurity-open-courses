window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e6e62941f4",
  "questions": {
    "q1": {
      "options": {
        "A": "ORMs commonly accept update objects, which is why uncontrolled request-to-model mapping can expose unintended writable fields.",
        "B": "Authentication identifies the requester but does not stop an ORM from processing supplied sensitive properties.",
        "C": "Direct body updates can assign fields that the endpoint never intended to permit the caller to change.",
        "D": "Optional JSON fields are not the core issue; the danger is giving client properties excessive update authority."
      }
    },
    "q2": {
      "options": {
        "A": "Partial makes every existing property optional rather than defining the small field set this operation may write.",
        "B": "Partial does not duplicate properties; it changes their requiredness while preserving the original broad field set.",
        "C": "A static Partial type does not prevent runtime validation from examining incoming data.",
        "D": "Optional fields do not automatically become null, and the endpoint must define omission semantics explicitly."
      }
    },
    "q3": {
      "options": {
        "A": "An assertion does not remove undeclared properties from the runtime object or filter its keys.",
        "B": "A cast performs neither nested validation nor any guaranteed treatment of unknown top-level fields.",
        "C": "Object permissions require a real authorization decision independent of the asserted request type.",
        "D": "Static assertions do not validate values, remove extra fields, or establish permission to update them."
      }
    },
    "q4": {
      "options": {
        "A": "Mapping restricts persistence fields but does not validate allowed values, lengths, nested structures, or enumerations by itself.",
        "B": "Validation checks accepted input, while explicit mapping limits how approved values can affect the stored model.",
        "C": "Validation and mapping do not automatically authenticate a caller or establish resource ownership.",
        "D": "ORMs do not generally require two identical objects; the separate layers provide independent control over the update contract."
      }
    },
    "q5": {
      "options": {
        "A": "Ownership of a profile is not limited to string fields and does not define privileged field permissions.",
        "B": "Databases can represent roles; the issue is whether this endpoint grants authority to change them.",
        "C": "Permission to edit an object does not authorize every field or administrative transition available on its underlying model.",
        "D": "Authentication and authorization must precede protected persistence rather than occur after potentially unauthorized changes."
      }
    },
    "q6": {
      "options": {
        "A": "A UI derived from the whole database schema can expose new fields rather than preserve a narrow update contract.",
        "B": "Spreading request fields into a generated update type leaves externally supplied runtime properties broadly influential.",
        "C": "A historical blocklist can miss newly introduced sensitive fields, so it does not enforce a fixed writable set.",
        "D": "An explicit schema and mapper require a deliberate code change before a newly added model field becomes writable."
      }
    },
    "q7": {
      "options": {
        "A": "Object spread copies caller-controlled properties without restricting them to the endpoint's approved update fields.",
        "B": "TypeScript interfaces are erased and do not filter which runtime properties object spread copies.",
        "C": "Logged-in users can over-post sensitive fields, so authentication does not make a broad update object safe.",
        "D": "ORMs can accept objects built with spread syntax; the risk comes from the copied fields' authority."
      }
    },
    "q8": {
      "options": {
        "A": "Approving a parent key does not establish that all its nested properties or relation operations are permitted.",
        "B": "Nested objects need their own validated field set, explicit persistence mapping, and authorization for referenced resources.",
        "C": "A broad Partial model preserves unrelated fields and does not enforce a nested operation-specific runtime contract.",
        "D": "Passing raw ORM nested inputs can expose unintended relation changes or privileged nested state transitions."
      }
    },
    "q9": {
      "options": {
        "A": "Leaving semantics implicit can make omitted, null, and empty values trigger unexpected or inconsistent persistence behavior.",
        "B": "Collapsing distinct inputs before validation can erase meaningful differences such as no change versus explicit clearing.",
        "C": "These values do not universally mean whole-object deletion; their meaning depends on the particular field and operation.",
        "D": "Field-specific PATCH semantics should be validated and mapped deliberately so each accepted input has a clear effect."
      }
    },
    "q10": {
      "options": {
        "A": "A normal display-name update does not test whether extra privileged properties could also be accepted.",
        "B": "Hiding a role control in the UI does not prevent direct submission of a role field.",
        "C": "Submitting a forbidden field and checking unchanged stored privileges verifies both rejection and absence of an unauthorized effect.",
        "D": "Response-time comparisons of valid updates do not reveal whether unexpected fields can alter protected state."
      }
    }
  }
};
