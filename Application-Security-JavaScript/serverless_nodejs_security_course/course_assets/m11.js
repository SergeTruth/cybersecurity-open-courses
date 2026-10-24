window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-cb1962a02f",
  "questions": {
    "q01": {
      "options": {
        "A": "Managed infrastructure does not establish the safety of application code, grants, input handling, or secret use that the team controls.",
        "B": "Container isolation does not transfer responsibility for application authorization, dependencies, and data handling to the provider.",
        "C": "Function IAM, event validation, dependencies, logging, and response all include decisions owned by the application team.",
        "D": "Short execution and managed scaling do not limit the authority of an overprivileged function or remove runtime lifecycle risks."
      }
    },
    "q02": {
      "options": {
        "A": "Resources in one account can still have different publishers, privileges, and input trust assumptions.",
        "B": "Mapping the full event and administration flow reveals where identity, input validity, and access assumptions must be re-established.",
        "C": "Managed transport does not validate every field's business meaning or remove boundaries before and after the handler.",
        "D": "Queues, replay, administrators, and logs have their own permissions and disclosure risks that belong in the map."
      }
    },
    "q03": {
      "options": {
        "A": "Local handler tests do not establish that the deployed package excludes secrets, unsafe modules, or unexpected files.",
        "B": "A lockfile records dependency resolution, not proof that all deployed code and files are safe.",
        "C": "The deployed artifact can include many executable and sensitive inputs beyond the handler source, so its actual contents need review.",
        "D": "Layers add code and dependencies to the runtime and need explicit provenance, version, and ownership review."
      }
    },
    "q04": {
      "options": {
        "A": "Wildcard resources grant authority beyond the function's current task and increase the consequences of compromise.",
        "B": "A trusted trigger does not make every action taken by the function authorized or safe.",
        "C": "Audit records help detect misuse after the fact but do not prevent excessive grants from being exercised.",
        "D": "Restricting actions and resources limits what exploited code or a stolen execution identity can do."
      }
    },
    "q05": {
      "options": {
        "A": "Managed delivery does not guarantee that an event's application fields are correct or authorized.",
        "B": "Transported events can retain untrusted content and delivery anomalies, so handlers must check both payload and relevant authority.",
        "C": "Non-HTTP sources also carry data that can be malformed, oversized, stale, or unsupported.",
        "D": "A field naming its source is a claim in the payload; it does not alone authenticate the event origin."
      }
    },
    "q06": {
      "options": {
        "A": "Delivery through environment variables does not by itself provide rotation, access governance, safe redaction, or exposure controls.",
        "B": "Configuration readers, diagnostic tools, and application behavior can expose values beyond their intended use.",
        "C": "Redeployment does not inherently rotate an external credential or invalidate every cached copy.",
        "D": "Cold-start logs can retain and distribute secrets; initialization is not a safe exception to redaction."
      }
    },
    "q07": {
      "options": {
        "A": "Function scaling can exceed the capacity of dependencies whose limits are not coordinated with invocation concurrency.",
        "B": "Bounding active invocations can reduce simultaneous database or API calls as well as affect cost.",
        "C": "Per-invocation deadlines do not alone cap aggregate parallel load, retries, or lingering downstream work.",
        "D": "Rapid parallel invocation can exhaust dependent capacity, and retries or failures can multiply work and spending."
      }
    },
    "q08": {
      "options": {
        "A": "Local memory is isolated and temporary, so it cannot coordinate duplicates across instances, restarts, and replay.",
        "B": "Recording an ID before completing the effect can cause retries to skip work that never succeeded.",
        "C": "Durable idempotency coordinated with business state prevents repeated delivery from repeating charges, emails, or other effects.",
        "D": "Managed queue delivery semantics do not provide universal body-based deduplication or remove the application's idempotency needs."
      }
    },
    "q09": {
      "options": {
        "A": "An unsuccessful invocation can still receive secrets and personal data that must not be copied into logs.",
        "B": "Short retention does not make disclosure safe while a secret remains usable or while copies persist elsewhere.",
        "C": "Operational logs become another retained exposure surface when they contain credentials or complete sensitive event data.",
        "D": "JSON structure alone does not redact values; redaction must be explicitly configured and verified."
      }
    },
    "q10": {
      "options": {
        "A": "Provider defaults do not determine whether application packages, identities, downstream usage, and response controls are appropriate.",
        "B": "Success and cost dashboards omit important failure-path and recovery behaviors that need testing before release.",
        "C": "Business authorization, response shaping, observability, and response remain application responsibilities under serverless hosting.",
        "D": "The review must cover the full deployed event flow, authority, data handling, resource use, delivery behavior, and operational recovery."
      }
    }
  }
};
