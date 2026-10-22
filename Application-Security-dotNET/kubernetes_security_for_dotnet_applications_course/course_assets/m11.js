window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8e1627e1ab",
  "questions": {
    "q01": {
      "options": {
        "A": "The deployed workload depends on application and cluster configuration, identity, network, and operations.",
        "B": "Kubernetes does not automatically correct authorization or input-validation defects in application code.",
        "C": "Internal cluster connectivity does not establish that a requesting workload is authorized.",
        "D": "Application developers also need to understand workload configuration and runtime security assumptions."
      }
    },
    "q02": {
      "options": {
        "A": "Manifests select executable content, effective configuration, access permissions, and network exposure.",
        "B": "Workload declarations control real runtime behavior beyond dashboard comments and labels.",
        "C": "Credentials should use approved secret delivery rather than be embedded in ordinary manifests.",
        "D": "Deployment declarations do not enforce every application-specific resource authorization rule."
      }
    },
    "q03": {
      "options": {
        "A": "Security contexts constrain process identity, privileges, capabilities, and filesystem-related behavior.",
        "B": "Log text appearance is not the access-control purpose of pod security contexts.",
        "C": "SCORM assessment content is unrelated to Kubernetes runtime privilege configuration.",
        "D": "Application request validation remains necessary regardless of the pod's configured restrictions."
      }
    },
    "q04": {
      "options": {
        "A": "Separate and govern configuration to prevent cross-environment leakage and unintended production overrides.",
        "B": "Reusing production secrets elsewhere expands exposure and weakens environment separation.",
        "C": "ConfigMaps are not an appropriate default location for confidential passwords or private keys.",
        "D": "ASP.NET Core can consume environment configuration inside containers, affecting effective settings."
      }
    },
    "q05": {
      "options": {
        "A": "Service-account identity and RBAC determine permitted interactions with Kubernetes API resources.",
        "B": "Identity bindings control real access rather than merely a dashboard icon.",
        "C": "Workload credentials can grant significant API permissions when RBAC allows them.",
        "D": "Grant only required Kubernetes permissions instead of broad cluster authority to every application."
      }
    },
    "q06": {
      "options": {
        "A": "An internal route establishes reachability rather than identity or business permission.",
        "B": "Administrative actions require explicit authorization even for requests from internal services.",
        "C": "Ingress routing does not universally implement each application's user permissions.",
        "D": "NetworkPolicies constrain connectivity and do not replace caller authentication."
      }
    },
    "q07": {
      "options": {
        "A": "Readiness determines traffic eligibility, while liveness supports decisions about restarting a workload.",
        "B": "These roles are reversed; readiness is not an unconditional restart request.",
        "C": "Probe purposes differ and should not blindly share every dependency check.",
        "D": "Probes affect deployed traffic and lifecycle behavior as well as local testing."
      }
    },
    "q08": {
      "options": {
        "A": "Resource declarations affect placement, capacity, availability, and behavior under pressure.",
        "B": "Application queues and expensive work still need bounded overload and backpressure policies.",
        "C": "Limits do not explain runtime behavior without suitable metrics and diagnostics.",
        "D": "Resource settings control execution budgets rather than merely naming a pod."
      }
    },
    "q09": {
      "options": {
        "A": "Deployment policy, component evidence, and safe telemetry support release control and incident response.",
        "B": "These controls are relevant to operating workloads rather than only archived course content.",
        "C": "Supply-chain and monitoring controls supplement secret governance and least-privilege API access.",
        "D": "Early shared review helps developers meet deployment requirements before the release boundary."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate workload provenance, runtime restrictions, identity, secrets, networking, limits, and governance.",
        "B": "Broad identities, raw secret logs, and unrestricted debugging increase production exposure.",
        "C": "A container image alone does not establish safe workload or cluster configuration.",
        "D": "Internal networking cannot serve as the sole authentication and authorization boundary."
      }
    }
  }
};
