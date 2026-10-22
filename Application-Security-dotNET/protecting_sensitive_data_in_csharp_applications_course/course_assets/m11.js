window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d8fa697737",
  "questions": {
    "q01": {
      "options": {
        "A": "Sensitive information moves through many application and operational paths beyond primary storage.",
        "B": "Protection needs to inform design before and during any later compliance review.",
        "C": "Developers, operators, and platform owners also influence sensitive-data handling and exposure.",
        "D": "Managed C# code can still disclose or misuse sensitive application data."
      }
    },
    "q02": {
      "options": {
        "A": "Classification identifies required safeguards, while minimization reduces avoidable sensitive copies and collection.",
        "B": "Classifying data does not make every field suitable for diagnostic logging.",
        "C": "Minimized data still needs server-side access checks for authorized consumers.",
        "D": "Classification is especially useful for distinguishing confidential or otherwise sensitive information."
      }
    },
    "q03": {
      "options": {
        "A": "Credentials and infrastructure-bearing strings need controlled storage and exclusion from public outputs.",
        "B": "Screenshots can be copied and retained, creating additional credential exposure.",
        "C": "Access-bearing secrets have security implications beyond ordinary source comments.",
        "D": "Sharing production secrets with other environments broadens exposure and weakens separation."
      }
    },
    "q04": {
      "options": {
        "A": "Choose recoverable encryption, purpose-bound payload protection, or password verification according to the goal.",
        "B": "These mechanisms provide distinct guarantees and are not interchangeable names.",
        "C": "Password hashing is designed for verification without recovery of the original password.",
        "D": "Data Protection secures payloads and does not replace encrypted authenticated network transport."
      }
    },
    "q05": {
      "options": {
        "A": "Secondary copies need access, retention, retry, and deletion review just like primary records.",
        "B": "Caches and exports commonly contain application data or sensitive derived values.",
        "C": "A secondary copy can retain the same sensitivity as the original database record.",
        "D": "Queues, backups, and exports can outlive requests and require explicit retention policies."
      }
    },
    "q06": {
      "options": {
        "A": "Operational records can aggregate sensitive fields and distribute them to many tools and readers.",
        "B": "Logs and telemetry are often visible to operators and systems beyond the originating user.",
        "C": "Request, exception, and header capture can include personal data and reusable credentials.",
        "D": "Diagnostics need deliberate redaction rather than making redaction unnecessary."
      }
    },
    "q07": {
      "options": {
        "A": "Explicit response contracts restrict returned fields to data the client actually needs.",
        "B": "DTOs still need validation and authorization appropriate to their accepted or returned values.",
        "C": "Returning full domain objects can leak internal fields beyond the intended response contract.",
        "D": "Response shaping does not require storing confidential server secrets in browser storage."
      }
    },
    "q08": {
      "options": {
        "A": "Protected storage does not decide which authenticated caller may read a particular record.",
        "B": "Route names are client-visible identifiers and do not enforce tenant isolation.",
        "C": "Authentication alone does not authorize every record available to the application.",
        "D": "A client-supplied tenant identifier must be checked against trusted caller and resource context."
      }
    },
    "q09": {
      "options": {
        "A": "Real production copies can expose people and credentials in environments with weaker safeguards.",
        "B": "The concern is confidentiality and controlled use rather than tests completing too quickly.",
        "C": "Production copies do not remove the need for safe, deliberate test fixtures.",
        "D": "Copying production information can create exposure instead of preventing all disclosure."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate data classification, minimization, storage, keys, access, diagnostics, retention, and response readiness.",
        "B": "Broad logging and unrestricted domain responses can spread data beyond intended recipients.",
        "C": "Client-side controls cannot enforce server storage, response, or resource-access boundaries.",
        "D": "Distributing production records to every development environment increases sensitive-data exposure."
      }
    }
  }
};
