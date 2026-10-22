window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0c7891c412",
  "questions": {
    "q01": {
      "options": {
        "A": "TLS protects transit without removing trust and permission boundaries at the application endpoint.",
        "B": "Network-exposed business actions and data access need authorization as well as valid input.",
        "C": "Published contracts describe expected use without authorizing every caller or enforcing the schema.",
        "D": "API requests can exercise protected identity, data, and business capabilities across network boundaries."
      }
    },
    "q02": {
      "options": {
        "A": "An approved issuer authenticates claims without granting every application operation.",
        "B": "Active sessions still need current object, workflow, and tenant-specific permission checks.",
        "C": "Protected reads can disclose confidential data even when they do not mutate state.",
        "D": "Authentication identifies the subject while authorization decides its permitted operations and resources."
      }
    },
    "q03": {
      "options": {
        "A": "Enforce permission for the exact target using authoritative ownership and tenant context.",
        "B": "Hard-to-guess identifiers do not inherently prove resource-specific permission for their presenter.",
        "C": "A tenant role need not grant every member access to every private record.",
        "D": "The server cannot rely on a client to enforce which resource identifiers are allowed."
      }
    },
    "q04": {
      "options": {
        "A": "A broad route permission can omit restrictions specific to the selected target object.",
        "B": "Check ownership and target-specific context in addition to the general route role.",
        "C": "Roles can still need finer resource, tenant, and workflow constraints.",
        "D": "Valid route syntax does not establish that its referenced resource is authorized."
      }
    },
    "q05": {
      "options": {
        "A": "Valid fields can still refer to resources or actions outside the caller's authority.",
        "B": "Ignoring and rejecting produce different feedback and may have different contract consequences.",
        "C": "Allowed fields still need type, range, relationship, and semantic validation.",
        "D": "Explicit schema and field contracts constrain what can influence operations and updates."
      }
    },
    "q06": {
      "options": {
        "A": "Correct tenant partitioning does not make every property suitable for the recipient.",
        "B": "Response models should omit private and internal fields not justified by the endpoint's contract.",
        "C": "Nested relations and later spreading need review despite hidden-field model settings.",
        "D": "Compatibility must follow an intentional response contract rather than unrestricted entity disclosure."
      }
    },
    "q07": {
      "options": {
        "A": "Different endpoints can consume vastly different resources despite each being one request.",
        "B": "Request counts do not replace payload, concurrency, duration, and result-size budgets.",
        "C": "Tailor budgets to expensive work, abuse modes, identities, tenant sharing, and business effects.",
        "D": "Shared accounts and tenant resources can still need deliberate partitioning and fairness policy."
      }
    },
    "q08": {
      "options": {
        "A": "Credentialed sharing requires explicit origin trust while server access decisions remain independently enforced.",
        "B": "CORS is browser policy and does not serve as the API's primary authorization mechanism.",
        "C": "Credentialed CORS cannot rely on an unrestricted wildcard origin as a meaningful allowlist.",
        "D": "Non-browser callers are not governed by the same browser-origin enforcement rules."
      }
    },
    "q09": {
      "options": {
        "A": "Origin restrictions do not reliably keep browser-delivered access-bearing credentials confidential.",
        "B": "Failed requests can still carry valid reusable credentials that must not be logged.",
        "C": "Exposed credentials can be replayed and are difficult to contain across copied artifacts.",
        "D": "Private source branches can still distribute secrets through histories, builds, and checkout copies."
      }
    },
    "q10": {
      "options": {
        "A": "Resource authorization, output fields, dependencies, and logs interact directly with endpoint security.",
        "B": "Negative permissions and resource-abuse behavior need verification before production exposure.",
        "C": "Review boundaries and controls across identity, data, capacity, dependencies, evidence, and changes.",
        "D": "Packages and gateways do not infer every application's query and ownership requirements."
      }
    }
  }
};
