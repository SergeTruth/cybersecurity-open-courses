window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-1e09519986",
  "questions": {
    "q01": {
      "options": {
        "A": "Containers package supply-chain inputs rather than removing the application from dependency and provenance risks.",
        "B": "Released images also inherit operating-system layers, dependencies, tooling outputs, and other build inputs.",
        "C": "Container images combine multiple software sources whose versions, origins, and release evidence affect trust.",
        "D": "Base layers and build tooling influence both the software shipped and how the runtime artifact is produced."
      }
    },
    "q02": {
      "options": {
        "A": "Image tags can be reassigned, so a familiar tag does not establish immutable image content.",
        "B": "Base selection determines inherited components, known issues, provenance, update practices, and runtime characteristics.",
        "C": "Newer tags may introduce different components or vulnerabilities and still require evidence-based evaluation.",
        "D": "Application scanning does not establish the origin or integrity of the underlying base image."
      }
    },
    "q03": {
      "options": {
        "A": "Earlier build stages and their caches may retain secrets even when the final runtime excludes them.",
        "B": "Copying the complete builder filesystem brings unnecessary tools, caches, and potentially credentials into production.",
        "C": "Selective copying between stages can keep build tools and unnecessary dependencies out of the runtime image.",
        "D": "Multiple stages enable separation but do not automatically ensure minimal contents, reproducibility, or secret removal."
      }
    },
    "q04": {
      "options": {
        "A": "Install commands can differ in lockfile handling; npm ci requires a compatible lockfile and does not update it.",
        "B": "Pinning direct dependencies alone does not capture the complete resolved graph of transitive dependencies.",
        "C": "Repeatable releases are essential for verifying which dependency graph is actually shipped in container images.",
        "D": "A committed compatible lockfile and npm ci reproduce the resolved dependency graph rather than resolving ranges anew."
      }
    },
    "q05": {
      "options": {
        "A": "Non-root execution reduces authority but leaves filesystem access, capabilities, networks, and resource controls to configure.",
        "B": "A non-root runtime identity limits the operating-system privileges available to compromised application code.",
        "C": "Numeric user zero is root, and the effective user and group must both be checked.",
        "D": "Omitting an interactive shell does not remove the privileges available to application code running as root."
      }
    },
    "q06": {
      "options": {
        "A": "Image layers, metadata, caches, and distributed copies may retain secrets despite deletion in subsequent layers.",
        "B": "Deleting a file in a later layer hides it without erasing its contents from earlier layers.",
        "C": "Build arguments can leak through metadata or build tooling; multiple stages do not make unrestricted secret use safe.",
        "D": "ENV instructions can persist credentials in image configuration and expose them to containers or inspection tools."
      }
    },
    "q07": {
      "options": {
        "A": "Environment delivery does not independently govern secret authorization, rotation, or the underlying storage lifecycle.",
        "B": "Runtime values can remain visible through diagnostics, process inspection, inherited environments, and crash reports.",
        "C": "Delivery by an orchestrator does not change a credential's sensitivity or prevent its disclosure.",
        "D": "Environment variables carry secret values while dedicated mechanisms must provide storage policy, access control, rotation, and auditing."
      }
    },
    "q08": {
      "options": {
        "A": "Actual exposure depends on runtime port publication, host bindings, routing, network policies, and firewall rules.",
        "B": "EXPOSE documents intended ports; it does not publish them or establish runtime network access policy.",
        "C": "Namespace isolation alone does not establish a complete service-to-service network policy across deployment configurations.",
        "D": "Internal naming conventions do not prove that ingress, port publishing, or other routes cannot expose endpoints."
      }
    },
    "q09": {
      "options": {
        "A": "Non-root identity is one layer; filesystem, network, resource, privilege, and application controls still require attention.",
        "B": "A successful health response demonstrates limited availability behavior rather than comprehensive security of the running service.",
        "C": "Combining restricted identity, filesystem permissions, privilege reduction, resource bounds, health checks, and networks reduces multiple risks.",
        "D": "A read-only root filesystem does not bound computation, memory, process count, temporary storage, or network access."
      }
    },
    "q10": {
      "options": {
        "A": "Scanners detect covered findings and cannot establish the absence of unknown vulnerabilities or application logic flaws.",
        "B": "An SBOM inventories components; signatures and provenance supply different evidence about artifact integrity and production.",
        "C": "Mutable tags may point to different artifacts later, so scan evidence must be tied to specific image content.",
        "D": "Component inventories and scan results inform risk assessment without proving authorization, runtime configuration, or application behavior secure."
      }
    }
  }
};
