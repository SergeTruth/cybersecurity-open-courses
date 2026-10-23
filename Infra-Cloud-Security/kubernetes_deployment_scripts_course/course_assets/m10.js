window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-9d97d01df3",
  "questions": {
    "q1": {
      "options": {
        "A": "Deployment scripts can modify production cluster resources when authorized to do so.",
        "B": "Scripts can change workloads, service exposure, secrets, and application availability.",
        "C": "RBAC still limits which resources the deployment identity can modify.",
        "D": "Deployment tools can call cluster APIs beyond printing local status."
      }
    },
    "q2": {
      "options": {
        "A": "Context checks can be automated without making every deployment interactive.",
        "B": "Target checks complement pipeline gates rather than bypassing their controls.",
        "C": "Checking context helps prevent applying changes to an unintended cluster or environment.",
        "D": "Namespace scoping remains useful after the cluster context is validated."
      }
    },
    "q3": {
      "options": {
        "A": "Wrong namespaces can direct changes or exposure outside the intended deployment scope.",
        "B": "Image review remains necessary to establish what software will be deployed.",
        "C": "Namespaces scope many Kubernetes resources rather than merely label log messages.",
        "D": "Namespace selection can determine where namespaced resources are applied or modified."
      }
    },
    "q4": {
      "options": {
        "A": "Production clusters need RBAC because deployment actions can have significant impact.",
        "B": "Cluster administrator access permits broad changes rather than preventing them.",
        "C": "Powerful credentials still require lifecycle management and appropriate rotation practices.",
        "D": "Broad authority expands the consequences of errors, misconfiguration, and credential misuse."
      }
    },
    "q5": {
      "options": {
        "A": "Reparsing constructed command strings introduces avoidable quoting and interpretation risks.",
        "B": "Fixed commands, quoted arguments, validation, arrays, and failure checks constrain execution.",
        "C": "An accidental working directory may select unintended configuration or deployment files.",
        "D": "Failure checks should stop dependent actions from using invalid earlier results."
      }
    },
    "q6": {
      "options": {
        "A": "Template values and overlays can change the generated resources and security settings.",
        "B": "Reviewing intended resources does not establish that the resulting rollout is healthy.",
        "C": "Rendered manifests reveal the actual configuration being submitted to the cluster.",
        "D": "Generated manifests are commonly submitted to create or update cluster resources."
      }
    },
    "q7": {
      "options": {
        "A": "Mutable tags still require trust in the registry and its publishers.",
        "B": "Mutable tags can deploy successfully while making artifact identity less predictable.",
        "C": "A tag can change targets, obscuring which exact image content ran.",
        "D": "Tags alone do not establish an image's origin or build history."
      }
    },
    "q8": {
      "options": {
        "A": "Approved retrieval mechanisms can deliver secrets without embedding them in scripts.",
        "B": "Job scoped access reduces how widely deployment credentials can be used.",
        "C": "Environment separation helps avoid mixing production secrets with lower trust workloads.",
        "D": "Plaintext secrets in scripts, output, or artifacts can reach unintended readers."
      }
    },
    "q9": {
      "options": {
        "A": "A successful apply can precede failed readiness, unhealthy pods, or incomplete rollout.",
        "B": "Acceptance of a manifest does not guarantee application health or readiness.",
        "C": "Verification detects problems but does not eliminate the possible need for recovery.",
        "D": "Rollout verification uses health information rather than disabling health checks."
      }
    },
    "q10": {
      "options": {
        "A": "Kubernetes changes do not universally provide automatic or complete rollback.",
        "B": "Recovery needs defined ownership and preparation, particularly when persistent state changes.",
        "C": "Planning improves recovery readiness but cannot prevent every deployment failure.",
        "D": "Stateful workloads can require data recovery and compatibility considerations during rollback."
      }
    },
    "q11": {
      "options": {
        "A": "Safe target and version context helps operators understand deployment actions.",
        "B": "Non sensitive operational details support troubleshooting without exposing protected information.",
        "C": "Logs should exclude tokens, kubeconfig credentials, secrets, and sensitive manifest content.",
        "D": "Clear failure status helps responders identify and stop unsuccessful deployments."
      }
    },
    "q12": {
      "options": {
        "A": "Deployment results provide useful evidence for verification, troubleshooting, and accountability.",
        "B": "One broad identity weakens cluster isolation and unnecessarily increases compromise impact.",
        "C": "Unreviewed applies can introduce unintended changes to production workloads and exposure.",
        "D": "Secure deployments combine scoped access, review, visibility, verification, and recovery preparation."
      }
    }
  }
};
