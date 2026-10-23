window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9f10ee0f0d",
  "questions": {
    "q01": {
      "options": {
        "A": "HTTPS and JSON decoding alone leave destination and workflow risks.",
        "B": "Unbounded retries can amplify failures and duplicate sensitive operations.",
        "C": "Protect secrets and decisions across outbound request and response boundaries.",
        "D": "Arbitrary HTTPS destinations and parseable JSON do not establish safety."
      }
    },
    "q02": {
      "options": {
        "A": "Mapping boundaries does not prove remote business decisions are authorized.",
        "B": "Boundary analysis identifies where sensitive data and trust assumptions change.",
        "C": "Internal connections still require appropriate endpoint and certificate verification.",
        "D": "Documentation does not validate remote decisions or their current authorization."
      }
    },
    "q03": {
      "options": {
        "A": "Internal routing does not guarantee every responding service is authenticated.",
        "B": "Private DNS does not validate returned schema, size, or freshness.",
        "C": "Internal services still require validation and explicit trust controls.",
        "D": "Private DNS alone cannot establish authentic and well-formed responses."
      }
    },
    "q04": {
      "options": {
        "A": "URLs frequently enter telemetry and support systems beyond credential handling.",
        "B": "HTTPS encrypts transport but does not separately protect query credentials.",
        "C": "Disabling redirects does not stop local URL logging and copying.",
        "D": "Percent encoding is reversible and does not prevent URL collection."
      }
    },
    "q05": {
      "options": {
        "A": "Administrator tokens grant unnecessary power and increase potential compromise impact.",
        "B": "Limit each credential to the specific required API capabilities.",
        "C": "Network restrictions do not justify unnecessary API operation permissions.",
        "D": "Future convenience does not justify current administrator access for clients."
      }
    },
    "q06": {
      "options": {
        "A": "Remote services may retain unknown or undocumented fields they receive.",
        "B": "Encryption does not prevent unnecessary disclosure to the recipient.",
        "C": "Minimize transmitted fields to reduce downstream exposure and misuse opportunities.",
        "D": "Transport encryption protects transit rather than recipient data minimization."
      }
    },
    "q07": {
      "options": {
        "A": "Space escaping does not safely validate all URL and header components.",
        "B": "Automatic inference can disclose unnecessary fields or choose unsafe destinations.",
        "C": "Validate fields and use controlled URL, header, and payload construction.",
        "D": "Escaping spaces alone leaves other request interpretation risks unresolved."
      }
    },
    "q08": {
      "options": {
        "A": "Validate response status, type, bounds, schema, and relevant freshness.",
        "B": "TLS protects transport rather than confirming application contract compliance.",
        "C": "Successful status does not prove response freshness or correct types.",
        "D": "TLS and success codes do not validate response data schemas."
      }
    },
    "q09": {
      "options": {
        "A": "Top-level JSON type checks omit nested fields and semantic constraints.",
        "B": "Schema validation checks expected structures and values before application use.",
        "C": "Validation must happen before untrusted fields affect sensitive decisions.",
        "D": "A dictionary can contain missing, unexpected, or incorrectly typed fields."
      }
    },
    "q10": {
      "options": {
        "A": "Incomplete or inconsistent pagination can undermine security relevant workflows.",
        "B": "Pagination errors may omit, duplicate, or overexpose protected records.",
        "C": "HTTPS does not prevent infinite pagination or malicious next links.",
        "D": "Requests still need destination, cursor, page, and record limits."
      }
    },
    "q11": {
      "options": {
        "A": "Repeated requests can duplicate effects even with identical request contents.",
        "B": "Unbounded retries increase load and can worsen service failures.",
        "C": "Repeated methods and bodies may still cause duplicate state changes.",
        "D": "Bound retries and account for side effects and failure amplification."
      }
    },
    "q12": {
      "options": {
        "A": "Idempotency associates retries with one intended operation to avoid duplication.",
        "B": "Idempotency does not make every method read-only or harmless.",
        "C": "New identifiers can make retries appear to be different operations.",
        "D": "Reusing the operation's key lets servers recognize duplicate attempts."
      }
    },
    "q13": {
      "options": {
        "A": "TLS does not validate the response's application data schema.",
        "B": "Certificate and hostname checks help authenticate the expected server endpoint.",
        "C": "Valid certificates do not authorize arbitrary endpoint business operations.",
        "D": "Response authorization and structure require separate application level checks."
      }
    },
    "q14": {
      "options": {
        "A": "Credential stripping varies with client behavior and redirect circumstances.",
        "B": "HTTPS does not keep redirects within the original trust boundary.",
        "C": "A different HTTPS destination can belong to an untrusted operator.",
        "D": "Review redirect destinations and credential forwarding before crossing trust boundaries."
      }
    },
    "q15": {
      "options": {
        "A": "Partial bearer tokens can still expose sensitive credential material.",
        "B": "Percent encoding does not conceal credentials in recorded URLs.",
        "C": "Exclude secret headers, sensitive URLs, and unnecessary private response contents.",
        "D": "Encoding changes representation rather than protecting logged secret values."
      }
    },
    "q16": {
      "options": {
        "A": "Defaults need review against the client's actual trust boundaries.",
        "B": "Combine destination controls, credential protection, validation, and bounded workflow behavior.",
        "C": "TLS does not enforce authorization, minimization, or complete pagination behavior.",
        "D": "TLS alone does not validate workflows, schemas, retries, or data scope."
      }
    }
  }
};
