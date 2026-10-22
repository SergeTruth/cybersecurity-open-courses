window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c1a6a54f51",
  "questions": {
    "q1": {
      "options": {
        "A": "Internal services can exchange data safely through explicit validated contracts.",
        "B": "Crossing a boundary can change assumptions about origin, freshness, meaning, and permitted use.",
        "C": "Deserialization constructs a representation without proving that its business meaning is valid.",
        "D": "Serialization changes representation and does not automatically encrypt all output."
      }
    },
    "q2": {
      "options": {
        "A": "Stored application data can be stale, modified, or inappropriate for a later consumer.",
        "B": "Later code can interpret earlier serialized formats differently unless compatibility rules are defined.",
        "C": "Validate retrieved content because internal location alone does not prove current validity or trust.",
        "D": "Stored fields should not become authoritative permission evidence solely because the application wrote them."
      }
    },
    "q3": {
      "options": {
        "A": "Explicit DTOs restrict boundary fields to those the operation intentionally accepts or exposes.",
        "B": "Typed transfer objects still need semantic and authorization checks at the server boundary.",
        "C": "Narrow DTOs can omit private domain properties instead of making them public.",
        "D": "A data contract does not guarantee coordinated producer and consumer deployment times."
      }
    },
    "q4": {
      "options": {
        "A": "Unknown submitted fields must not automatically grant or alter administrative authority.",
        "B": "A .NET runtime type does not establish the trustworthiness of its populated values.",
        "C": "Validate required data, domain rules, and resource context before deserialized values affect trusted state.",
        "D": "Persisting every field can accept unintended properties or invalid combinations without review."
      }
    },
    "q5": {
      "options": {
        "A": "Broad serialization can expose internal fields rather than guarantee their protection.",
        "B": "Persistence and domain objects can contain fields unsuitable for input assignment or public output.",
        "C": "Internal model changes can still introduce compatibility and data-exposure concerns.",
        "D": "Serialization can expose undocumented fields unless the output contract is deliberately restricted."
      }
    },
    "q6": {
      "options": {
        "A": "Each created object still needs validation even when polymorphic types are supported.",
        "B": "Type discriminators from input remain untrusted unless restricted to an approved contract.",
        "C": "Limit type selection because it changes the concrete representation and behavior created from input.",
        "D": "Polymorphism affects boundary construction rather than merely response styling."
      }
    },
    "q7": {
      "options": {
        "A": "Successful deserialization does not establish compatibility or correct semantics across versions.",
        "B": "Arbitrary runtime-type selection can expose types and behavior outside the intended message contract.",
        "C": "Legacy formats need deliberate support, ownership, migration, and retirement policies.",
        "D": "Allow only known representations and validate their values before making business decisions."
      }
    },
    "q8": {
      "options": {
        "A": "Age does not establish that a serializer's trust or type-selection assumptions remain suitable.",
        "B": "Queues, caches, files, and service messages also need serialization inventory and review.",
        "C": "Remediation can migrate contracts and configurations without indiscriminately deleting all storage infrastructure.",
        "D": "Legacy assumptions can fail when records outlive releases or cross newer trust boundaries."
      }
    },
    "q9": {
      "options": {
        "A": "Structured document parsing needs bounded work, controlled external-resource behavior, and safe failures.",
        "B": "Well-formed XML says nothing about the producer's authority for an operation.",
        "C": "Parser defaults must be reviewed against the particular workflow and deployment requirements.",
        "D": "Partners can provide malformed or inappropriate documents, so receiving-side validation remains necessary."
      }
    },
    "q10": {
      "options": {
        "A": "Debug dumps can contain sensitive object fields and should not be stored broadly by default.",
        "B": "Any serialized copy can inadvertently publish fields through APIs, diagnostics, exports, or support artifacts.",
        "C": "Serializers do not universally identify and remove every secret property.",
        "D": "Private signing or decryption keys should not be distributed to ordinary client storage."
      }
    },
    "q11": {
      "options": {
        "A": "Version rules need to define missing-field handling and retained business meaning.",
        "B": "Contracts require owners and tests to maintain safe supported compatibility behavior.",
        "C": "Messages and persisted records can survive releases and therefore need explicit interpretation rules.",
        "D": "Versioning is important to durable data and messages beyond visual asset changes."
      }
    },
    "q12": {
      "options": {
        "A": "Custom parsing behavior can introduce failures that still need bounded monitoring and diagnosis.",
        "B": "Converters and settings can change interpretation and are not guaranteed to match defaults.",
        "C": "Parser behavior affects trust boundaries, resource budgets, and data exposure.",
        "D": "Review customization and dependencies because they can change accepted input and published output contracts."
      }
    }
  }
};
