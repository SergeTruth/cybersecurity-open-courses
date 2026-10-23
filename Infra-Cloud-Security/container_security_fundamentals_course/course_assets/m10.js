window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8c885dc1be",
  "questions": {
    "q01": {
      "options": {
        "A": "A logo does not establish security controls for containerized workloads.",
        "B": "Container security covers the full chain from image construction through runtime operations.",
        "C": "Applications still need authentication, authorization, input validation, and other security controls.",
        "D": "Containers require monitoring to identify suspicious activity and operational failures."
      }
    },
    "q02": {
      "options": {
        "A": "Containers commonly share a host kernel; VMs typically run separate guest systems.",
        "B": "Container processes still depend on operating system and kernel support.",
        "C": "Containers package and execute applications using isolated operating system resources.",
        "D": "Isolation depends on configuration and architecture, so containers are not universally stronger."
      }
    },
    "q03": {
      "options": {
        "A": "A running container is an instance created from image content.",
        "B": "Firewall rules control network access rather than package application filesystems.",
        "C": "An image packages filesystem content and metadata for creating containers.",
        "D": "Password resets change credentials rather than define container image artifacts."
      }
    },
    "q04": {
      "options": {
        "A": "Privileged mode generally expands authority instead of restricting it to necessary actions.",
        "B": "Privileged containers can interact with sensitive host resources and capabilities.",
        "C": "Privileged mode does not identify vulnerable software or replace image scanning.",
        "D": "Broad host capabilities can increase the impact of container compromise."
      }
    },
    "q05": {
      "options": {
        "A": "Inherited packages, libraries, and defaults influence the resulting image's security.",
        "B": "Base images supply software and filesystem content rather than decorative branding.",
        "C": "Base images can contain vulnerable components requiring updates and review.",
        "D": "Base choice affects dependencies and defaults far beyond an application logo."
      }
    },
    "q06": {
      "options": {
        "A": "Networking mode controls connectivity rather than documenting an image's origin.",
        "B": "Provenance records image origin and build history to support trust decisions.",
        "C": "Memory limits constrain runtime resources rather than establish artifact provenance.",
        "D": "Backup scheduling concerns recovery rather than the origin of container images."
      }
    },
    "q07": {
      "options": {
        "A": "Images are routinely copied between registries, builders, caches, and deployment systems.",
        "B": "Images can be shared or exposed despite an intended private deployment.",
        "C": "Embedded secrets can spread with copied, cached, or reused image content.",
        "D": "Building an image does not automatically erase secrets from its layers."
      }
    },
    "q08": {
      "options": {
        "A": "Multi stage builds do not require running application containers as root.",
        "B": "Separating build stages does not eliminate the value of vulnerability scanning.",
        "C": "Build controls remain necessary to protect dependencies and final artifacts.",
        "D": "Separate build and runtime stages can exclude unnecessary build tools from deployment."
      }
    },
    "q09": {
      "options": {
        "A": "Least privilege restricts capabilities, files, permissions, and connectivity to workload needs.",
        "B": "Root execution often grants more authority than an application actually requires.",
        "C": "Mounting the entire host exposes files beyond most workload requirements.",
        "D": "Disabling controls removes boundaries rather than limiting access to necessary actions."
      }
    },
    "q10": {
      "options": {
        "A": "Resource limits constrain consumption but cannot guarantee bug free application behavior.",
        "B": "Resource limits can contain excessive consumption and protect neighboring workloads.",
        "C": "Authentication verifies identity and cannot be replaced by CPU or memory limits.",
        "D": "Monitoring remains necessary to detect limit pressure, failures, and suspicious behavior."
      }
    },
    "q11": {
      "options": {
        "A": "A registry stores images rather than serving only as a password database.",
        "B": "Runtime process monitoring observes execution instead of distributing container images.",
        "C": "Registries store and distribute images for builds and deployments.",
        "D": "A physical network cable is not an image storage service."
      }
    },
    "q12": {
      "options": {
        "A": "Unrestricted production publishing permits unreviewed or malicious artifacts to enter deployment.",
        "B": "Registry permissions affect artifact confidentiality and the integrity of deployed images.",
        "C": "Registry controls complement pipeline safeguards rather than replacing them entirely.",
        "D": "Unauthorized pulls can expose artifacts, while unauthorized pushes can introduce malicious images."
      }
    },
    "q13": {
      "options": {
        "A": "Network controls restrict the services and endpoints a container can reach.",
        "B": "Network restrictions complement application authorization but do not replace it.",
        "C": "Publishing every port increases exposure instead of limiting unnecessary communication.",
        "D": "Network policy should work alongside logging rather than remove operational evidence."
      }
    },
    "q14": {
      "options": {
        "A": "Orchestrators can change production workloads and therefore need carefully limited permissions.",
        "B": "Orchestrator authority can permit deployment, inspection, and modification of running workloads.",
        "C": "Production control planes require access controls as well as developer devices.",
        "D": "Access control limits operations but does not detect vulnerable image packages."
      }
    },
    "q15": {
      "options": {
        "A": "Monitoring improves detection but cannot guarantee prevention of every incident.",
        "B": "Secrets require controlled storage and delivery even when monitoring is enabled.",
        "C": "Logs, events, runtime activity, and drift help reveal failures and threats.",
        "D": "Monitoring is valuable while workloads run and during later incident investigation."
      }
    },
    "q16": {
      "options": {
        "A": "Default container settings still need evaluation against workload and infrastructure risks.",
        "B": "A single scan cannot cover later intelligence, configuration drift, or runtime behavior.",
        "C": "Container controls complement the application's own security requirements and protections.",
        "D": "Effective container security combines lifecycle controls with ongoing monitoring and response."
      }
    }
  }
};
