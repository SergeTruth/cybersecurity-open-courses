window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-600f72a7ba",
  "questions": {
    "q01": {
      "options": {
        "A": "Managed infrastructure does not remove handler validation, access policy, credential, or operational responsibilities.",
        "B": "Handlers must still validate events and enforce authorization appropriate to their actions.",
        "C": "Function code can use role permissions to access highly sensitive resources.",
        "D": "Trigger data can cross different trust boundaries and must not be trusted automatically."
      }
    },
    "q02": {
      "options": {
        "A": "Review shipped files because packages carry executable dependencies and may accidentally include sensitive artifacts.",
        "B": "Build and deployment systems process package contents and can retain copies.",
        "C": "Local files can include credentials, diagnostics, and test material unsuitable for production delivery.",
        "D": "Dependencies and configuration inside the package can change runtime and diagnostic behavior."
      }
    },
    "q03": {
      "options": {
        "A": "The execution role defines the function's permitted access to AWS resources and services.",
        "B": "IAM permissions govern access rather than the presentation font used by log viewers.",
        "C": "Role permissions do not validate the syntax or meaning of incoming event data.",
        "D": "Roles should receive only required access rather than automatic administrative permissions."
      }
    },
    "q04": {
      "options": {
        "A": "HTTP exposure depends on authentication, policy, validation, origin handling, diagnostics, and traffic controls.",
        "B": "Public HTTP endpoints can be reached by non-browser callers as well as browsers.",
        "C": "CORS controls browser origin behavior and does not establish authenticated identity.",
        "D": "Request logging must exclude secret-bearing headers and unnecessary sensitive payload fields."
      }
    },
    "q05": {
      "options": {
        "A": "Event sources bring data into a workload under source-specific identity, delivery, and trust assumptions.",
        "B": "Delivery does not establish that every event field satisfies application-level rules.",
        "C": "A trigger's presence does not prove that the requested tenant and resource belong to the caller.",
        "D": "Retries and source delivery semantics can produce duplicates that handlers must accommodate."
      }
    },
    "q06": {
      "options": {
        "A": "A managed secret service provides a reviewed lifecycle and access model for sensitive credentials.",
        "B": "Deployment and diagnostic access can expose environment values under the platform's permission model.",
        "C": "Secret retrieval still requires appropriate IAM permissions and least-privilege review.",
        "D": "Source-embedded secrets spread through repositories and packages beyond governed runtime access."
      }
    },
    "q07": {
      "options": {
        "A": "Private connectivity does not determine the caller's identity or authorized business action.",
        "B": "A private subnet does not automatically grant application-level resource permissions.",
        "C": "Security groups constrain connectivity rather than replace IAM or data authorization.",
        "D": "VPC attachment changes networking and does not universally prevent outbound service calls."
      }
    },
    "q08": {
      "options": {
        "A": "Idempotent processing avoids repeating unsafe side effects when an event is delivered again.",
        "B": "Application idempotency does not guarantee that every source delivers exactly once.",
        "C": "Repeatedly failing work still needs controlled retry and dead-letter handling.",
        "D": "Idempotency handles repetition and does not prevent every possible network error."
      }
    },
    "q09": {
      "options": {
        "A": "Bound scaling and operation duration against the capacity of databases and downstream services.",
        "B": "Downstream systems have finite throughput, connection, and cost budgets.",
        "C": "Timeouts affect deployed execution and resource retention as well as local tests.",
        "D": "Configured concurrency still needs monitoring to understand pressure and rejected work."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate artifact content, identity, exposure, secrets, event handling, capacity, and safe operations.",
        "B": "Broad privileges and unlimited work increase impact, while raw logs can disclose sensitive data.",
        "C": "Handler review alone omits role authority, trigger trust, and deployed operational behavior.",
        "D": "Unmanaged long-lived secrets in configuration do not establish a governed credential lifecycle."
      }
    }
  }
};
