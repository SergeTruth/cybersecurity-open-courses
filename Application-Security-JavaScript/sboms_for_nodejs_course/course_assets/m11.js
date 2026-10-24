window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-cb37aed5c8",
  "questions": {
    "q01": {
      "options": {
        "A": "A component inventory is separate from the changing vulnerability evidence associated with those components.",
        "B": "An SBOM describes identified components and their relationships for a particular artifact or release, making its scope essential.",
        "C": "A manifest lists declarations and can differ from the resolved components in a specific built artifact.",
        "D": "Production components belong in scope when present in the artifact being described; inventory is not limited to developer tools."
      }
    },
    "q02": {
      "options": {
        "A": "The manifest declares dependencies but does not enumerate every resolved transitive version in the released artifact.",
        "B": "A requested version range does not identify the exact resolved graph or packaged files.",
        "C": "The installed and packaged dependency graph contains resolution details beyond the declarations in package.json.",
        "D": "These dependency categories can affect the released artifact and should be evaluated against its actual contents."
      }
    },
    "q03": {
      "options": {
        "A": "Transitive code can execute inside the application and affect security even when not declared directly.",
        "B": "Lockfiles record resolution details that go beyond the ranges requested by the manifest.",
        "C": "Declarations and resolved relationships together explain which packages were requested and which dependency graph was installed.",
        "D": "Dependency relationships explain why transitive components are present and help trace affected paths."
      }
    },
    "q04": {
      "options": {
        "A": "SPDX and CycloneDX describe exchange formats rather than being names for vulnerability-scanning products.",
        "B": "Standard fields and relationships let tools exchange and interpret component inventory consistently.",
        "C": "A valid format does not authenticate a supplier or establish that a component is trustworthy.",
        "D": "Standard formatting does not remove the need to bind inventory to the exact artifact it describes."
      }
    },
    "q05": {
      "options": {
        "A": "Structured package identity makes ecosystem, namespace, name, and version explicit so tools can match components consistently.",
        "B": "Display names can collide across ecosystems, namespaces, or versions and are not sufficient identity.",
        "C": "Package URL structure separates namespace and name; treating a scoped name as one opaque segment loses that structure.",
        "D": "A local bom-ref links records within a document and does not replace component namespace and version identity."
      }
    },
    "q06": {
      "options": {
        "A": "Before installation, the final resolved or packaged components may not yet be known.",
        "B": "Inventory must reflect the resolved inputs and contents of the released artifact rather than assumptions from an earlier stage.",
        "C": "Container build stages, pruning, and packaging can make final image contents differ from the repository inventory.",
        "D": "Correct inventory timing is necessary for reliable release evidence even before any vulnerability is known."
      }
    },
    "q07": {
      "options": {
        "A": "Reusing a version label does not guarantee that separate builds produced the same bytes or dependencies.",
        "B": "A shared commit can produce differing artifacts when dependency resolution, build inputs, or environments differ.",
        "C": "A timestamp alone does not uniquely identify the artifact whose components were inventoried.",
        "D": "Build and artifact identifiers prevent an inventory from being applied to a different binary, image, or release by mistake."
      }
    },
    "q08": {
      "options": {
        "A": "Presence in inventory does not by itself establish a known vulnerability, runtime reachability, or exploitability.",
        "B": "Vulnerability knowledge changes, so retaining inventory supports later analysis even after a clean scan.",
        "C": "Reachability and exploitability require additional application and runtime evidence beyond component presence.",
        "D": "Inventory establishes what is included; vulnerability analysis combines that inventory with advisories and contextual risk evidence."
      }
    },
    "q09": {
      "options": {
        "A": "Component identities and relationships can reveal internal architecture and supplier choices even without source code.",
        "B": "Inventories may include private packages and relationships rather than only publicly known component names.",
        "C": "Removing versions can still leave internal names, suppliers, and architecture relationships exposed.",
        "D": "A public artifact does not automatically justify disclosure of every inventory detail or internal relationship."
      }
    },
    "q10": {
      "options": {
        "A": "Reliable SBOM use requires accurate generation, quality checks, artifact binding, appropriate protection, and retention for later investigation.",
        "B": "An arbitrary list can omit identities, relationships, and artifact scope needed for useful evidence.",
        "C": "Scanner acceptance checks compatibility, not necessarily inventory completeness or correspondence with the artifact.",
        "D": "Attaching a file does not provide every integrity, retention, comparison, or incident-access capability the workflow may need."
      }
    }
  }
};
