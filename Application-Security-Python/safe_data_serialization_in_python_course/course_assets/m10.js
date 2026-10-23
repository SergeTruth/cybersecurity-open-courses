window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9a43523c74",
  "questions": {
    "q01": {
      "options": {
        "A": "Serialization represents data without necessarily encrypting its stored contents.",
        "B": "Serialization does not automatically validate data against business rules.",
        "C": "Object representation and encryption are separate security relevant operations.",
        "D": "Serialization converts structures into bytes or another exchange representation."
      }
    },
    "q02": {
      "options": {
        "A": "Copying bytes does not reconstruct their represented application structures.",
        "B": "Deserialization interprets stored representations to reconstruct application data structures.",
        "C": "Filename extensions do not safely authorize arbitrary object construction.",
        "D": "Decoding and interpretation distinguish deserialization from merely copying bytes."
      }
    },
    "q03": {
      "options": {
        "A": "Encrypted transport does not prove serialized application input is safe.",
        "B": "Input from external boundaries can affect application behavior after decoding.",
        "C": "Queues, caches, requests, and files can all cross trust boundaries.",
        "D": "Transport protection does not replace validation at serialization boundaries."
      }
    },
    "q04": {
      "options": {
        "A": "Parsing creates structures; validation enforces their intended data contract.",
        "B": "Validation checks constraints rather than merely choosing character encoding.",
        "C": "Valid syntax still needs schema and semantic contract checks.",
        "D": "Business rules require validation beyond decoding serialized bytes alone."
      }
    },
    "q05": {
      "options": {
        "A": "Data-only formats reduce implicit object reconstruction and executable behavior.",
        "B": "Ordinary formats still need explicit field and type validation.",
        "C": "Valid UTF-8 says nothing about safe object reconstruction behavior.",
        "D": "Unknown fields and incorrect types need explicit validation rules."
      }
    },
    "q06": {
      "options": {
        "A": "Pickle does not safely reject dangerous functions in untrusted input.",
        "B": "Unpickling can execute reconstruction behavior selected by malicious input.",
        "C": "Pickle is not restricted to harmless primitive values by default.",
        "D": "Unauthenticated pickle data can still trigger dangerous object reconstruction."
      }
    },
    "q07": {
      "options": {
        "A": "Top-level container checks leave nested data and business constraints unchecked.",
        "B": "Ranges and field relationships may determine whether input is safe.",
        "C": "Validate structural, type, value, and relationship constraints across fields.",
        "D": "Required names alone do not establish safe values or relationships."
      }
    },
    "q08": {
      "options": {
        "A": "Consumers may interpret extra fields differently across versions and contexts.",
        "B": "Extra fields can influence binding and future application behavior.",
        "C": "Rejecting unexpected fields can expose contract drift and unauthorized controls.",
        "D": "Unknown fields may acquire meaning and should follow explicit policy."
      }
    },
    "q09": {
      "options": {
        "A": "Class naming conventions do not establish safe loader behavior.",
        "B": "Safe loaders restrict construction to ordinary data representations only.",
        "C": "Accepting arbitrary tags can enable unsafe object construction behavior.",
        "D": "Safe loading still requires application schema and business validation."
      }
    },
    "q10": {
      "options": {
        "A": "One root element proves neither safe features nor bounded parsing.",
        "B": "Entity handling and external resource access can introduce serious risks.",
        "C": "Parser features can affect network access and resource consumption.",
        "D": "Structural well-formedness does not establish safe XML parser behavior."
      }
    },
    "q11": {
      "options": {
        "A": "Integrity checks detect unauthorized alteration when correctly designed and verified.",
        "B": "Producer authorization requires separate policy checks beyond data integrity.",
        "C": "Confidentiality and transport readability are different from integrity verification.",
        "D": "Integrity does not establish current permission for the requested operation."
      }
    },
    "q12": {
      "options": {
        "A": "Verified origin does not validate each field or current permission.",
        "B": "Trusted producers can emit stale, malformed, or excessive data.",
        "C": "Authenticated data still requires size, freshness, schema, and authorization checks.",
        "D": "Origin assurance cannot replace validation of current data and context."
      }
    },
    "q13": {
      "options": {
        "A": "Explicit versions need compatibility policy rather than blind field acceptance.",
        "B": "Versions identify contracts so changes and migrations can be managed.",
        "C": "Changing schemas may still require migrations and compatibility handling.",
        "D": "Future schemas cannot be safely assumed compatible from version numbers."
      }
    },
    "q14": {
      "options": {
        "A": "Personal and regulated data also require minimization and appropriate protection.",
        "B": "Hidden interface fields remain exposed if transmitted in API responses.",
        "C": "Interface hiding does not remove fields from serialized network data.",
        "D": "Serialize only fields necessary for the intended authorized use."
      }
    },
    "q15": {
      "options": {
        "A": "Adversarial and boundary cases exercise safe rejection and parser controls.",
        "B": "Valid examples alone do not test unsafe deserialization behavior.",
        "C": "Compatibility does not justify accepting malformed or dangerous serialized input.",
        "D": "One valid example misses malformed, oversized, stale, and dangerous inputs."
      }
    },
    "q16": {
      "options": {
        "A": "Parsing alone does not establish origin, permission, or privacy protections.",
        "B": "Known producers can still send oversized or invalid data.",
        "C": "Combine controlled parsing, strict contracts, limits, and lifecycle protections.",
        "D": "Parser choice does not remove privacy, integrity, or compatibility requirements."
      }
    }
  }
};
