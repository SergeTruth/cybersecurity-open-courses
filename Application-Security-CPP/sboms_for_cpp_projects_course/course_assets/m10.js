window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5418ea673b",
  "questions": {
    "q01": {
      "options": {
        "A": "A signature can authenticate a statement's origin, but it does not establish that every component is defect-free.",
        "B": "An SBOM records component identities and relationships within a stated scope rather than serving as a universal security guarantee.",
        "C": "Compiler paths are build evidence, not by themselves a structured inventory of component identities and relationships.",
        "D": "Feature and approval records describe release governance rather than the software components included in the artifact."
      }
    },
    "q02": {
      "options": {
        "A": "Native artifacts do not uniformly embed all package and build metadata needed for a complete inventory.",
        "B": "Headers and static libraries can contribute code to shipped binaries even when not delivered as separate files.",
        "C": "Compiler output alone may omit the provenance and dependency relationships needed to reconstruct the build inventory.",
        "D": "Native builds combine several kinds of inputs whose identities and relationships may require multiple sources of evidence."
      }
    },
    "q03": {
      "options": {
        "A": "Precise identity connects an included component with its provenance, relevant advisories, release scope, and responsible owner.",
        "B": "Directory names can be reused or changed and do not uniquely identify supplier, version, or content.",
        "C": "Identity is needed to determine whether an advisory applies before remediation decisions can be made.",
        "D": "Shared display names cannot reliably distinguish forks, supplier variants, or repackaged contents."
      }
    },
    "q04": {
      "options": {
        "A": "A standard format constrains representation but does not force tools to inspect identical discovery inputs.",
        "B": "Binary inspection can miss build-time relationships and source-derived components visible in build metadata.",
        "C": "Different observation points expose different evidence, so discrepancies need investigation against the declared inventory scope.",
        "D": "A lower count may reflect a different scope or discovery method rather than prove the tool is defective."
      }
    },
    "q05": {
      "options": {
        "A": "Repositories can contain tests, tools, and unused dependencies that differ from each released artifact's contents.",
        "B": "Declaring scope prevents an inventory of repository or build inputs from being mistaken for the components of a particular release artifact.",
        "C": "Defining scope after evidence is lost can leave omissions and uncertain artifact correspondence.",
        "D": "An installer can include additional tools and libraries beyond the dependencies of one extracted executable."
      }
    },
    "q06": {
      "options": {
        "A": "Inventory helps locate affected component versions in particular releases and route investigation and remediation to an owner.",
        "B": "Component presence alone does not establish that a vulnerable path is reachable or exploitable in the application.",
        "C": "Ownership, patch tests, and deployment checks remain necessary after inventory identifies a potentially affected release.",
        "D": "No current advisory match does not prove the absence of unknown, unmatched, or incorrectly identified vulnerabilities."
      }
    },
    "q07": {
      "options": {
        "A": "Human readability can affect usability but does not determine whether the inventory still matches its artifact.",
        "B": "Presentation-only changes can preserve the same component identities and relationships without causing inventory drift.",
        "C": "An unchanged dependency graph can remain accurate when correctly bound to the corresponding rebuild.",
        "D": "Drift means the recorded inventory and its actual build inputs or artifact contents have diverged."
      }
    },
    "q08": {
      "options": {
        "A": "Component identities and versions can reveal useful architectural and vulnerability information to additional readers.",
        "B": "Internal deployment notes can add sensitive information beyond the intended component disclosure scope.",
        "C": "Sharing policy should consider the details an inventory reveals and which recipients are authorized to receive them.",
        "D": "Removing versions can undermine inventory usefulness without eliminating all disclosure, so policy needs a deliberate sharing decision."
      }
    },
    "q09": {
      "options": {
        "A": "A compiler produces output but does not own inventory correction, policy decisions, or vulnerability response.",
        "B": "Assigned accountable owners keep inventory generation, validation, release binding, and response tasks maintained over time.",
        "C": "Customers may report errors, but responsibility for the producer's release inventory should be explicitly assigned internally.",
        "D": "One-time coordination does not establish durable ownership for later updates and incident response."
      }
    },
    "q10": {
      "options": {
        "A": "A one-time manual inventory becomes stale as dependencies, build inputs, and release artifacts change.",
        "B": "Missing versions and reused identities make it difficult to determine which releases contain affected components.",
        "C": "Separating inventory from artifact identity makes it easier to apply accurate-looking evidence to the wrong release.",
        "D": "Repeatable generation and quality checks keep inventory current, while drift tracking and response integration make it operationally useful."
      }
    }
  }
};
