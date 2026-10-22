window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-2b73579616",
  "questions": {
    "q01": {
      "options": {
        "A": "Packaging and isolation supplement rather than replace application, host, and deployment security controls.",
        "B": "Container boundaries do not determine which users may access application operations.",
        "C": "Internal connectivity does not authenticate the peer or authorize its requests.",
        "D": "Containerization does not automatically correct vulnerable business or authorization logic."
      }
    },
    "q02": {
      "options": {
        "A": "Base images determine included components, update obligations, compatibility, and available runtime surface.",
        "B": "Image selection changes executable dependencies rather than merely the image's label.",
        "C": "Application NuGet dependencies still need maintenance independently of the base image.",
        "D": "A suitable base image does not automatically validate the application's runtime configuration."
      }
    },
    "q03": {
      "options": {
        "A": "Separate stages let the final image omit build tools and unnecessary source artifacts.",
        "B": "The final runtime stage can omit the SDK when the workload does not need it.",
        "C": "Build-context filtering still matters even when the Dockerfile uses several stages.",
        "D": "Inspect final contents because multi-stage structure alone does not guarantee minimal output."
      }
    },
    "q04": {
      "options": {
        "A": "Secret injection can leave copies in build records, logs, layers, or caches if handled unsafely.",
        "B": "Ordinary build configuration does not guarantee erasure of every historical secret copy.",
        "C": "Build-only credentials should not be copied into the deployed runtime image.",
        "D": "Container builds can expose secrets for services and APIs, not only desktop applications."
      }
    },
    "q05": {
      "options": {
        "A": "Running with a restricted identity limits the default authority available after compromise.",
        "B": "Non-root workloads can still need carefully owned writable locations for legitimate work.",
        "C": "Non-root execution reduces rather than grants broad host-level access.",
        "D": "Filesystem ownership must match the restricted runtime identity and intended writable paths."
      }
    },
    "q06": {
      "options": {
        "A": "Separate environments need distinct credentials and reviewed settings that do not override policy accidentally.",
        "B": "Reusing production secrets elsewhere expands exposure and complicates selective incident response.",
        "C": "Provider precedence can change which settings ASP.NET Core actually uses.",
        "D": "Local deployment files can contain insecure defaults requiring review before production use."
      }
    },
    "q07": {
      "options": {
        "A": "Being on an internal network does not establish caller identity or resource permission.",
        "B": "Administrator access should follow explicit need rather than internal connectivity alone.",
        "C": "Publishing ports changes reachability and does not remove authentication obligations.",
        "D": "A proxy requires deliberate authorization integration and does not universally authorize forwarded requests."
      }
    },
    "q08": {
      "options": {
        "A": "Runtime controls constrain permissions, storage behavior, identity, and available processing resources.",
        "B": "Security contexts and limits affect execution behavior beyond the pod's display name.",
        "C": "Workload controls supplement rather than replace logging and application configuration review.",
        "D": "Broad host access conflicts with the least-privilege purpose of these controls."
      }
    },
    "q09": {
      "options": {
        "A": "Inventories and scans identify components and known exposure for prioritized maintenance and response.",
        "B": "New vulnerabilities can require rebuilding an image that previously passed scanning.",
        "C": "Component scans do not establish correct application authorization or runtime behavior.",
        "D": "Generate inventory and scan evidence during delivery rather than only after outages."
      }
    },
    "q10": {
      "options": {
        "A": "A complete baseline coordinates image provenance, credentials, runtime authority, configuration, and operations.",
        "B": "Unnecessary tools, shared credentials, and broad privileges increase the deployment's attack surface.",
        "C": "A Dockerfile alone does not establish secure deployment or operational maintenance.",
        "D": "Internal network location cannot replace identity validation and application authorization."
      }
    }
  }
};
