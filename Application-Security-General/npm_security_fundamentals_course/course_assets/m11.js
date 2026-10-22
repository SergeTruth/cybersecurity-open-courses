window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-f543bad57b",
  "questions": {
    "q01": {
      "options": {
        "A": "Dependency trees include code maintained outside the application team's direct control.",
        "B": "Packages, installation hooks, registries, and maintainers can affect delivered executable behavior.",
        "C": "Package installation still needs source, dependency, and operational security review.",
        "D": "Node applications commonly depend on third-party direct and transitive packages."
      }
    },
    "q02": {
      "options": {
        "A": "A lockfile records resolved dependencies for reproducible installs and reviewable changes.",
        "B": "Recorded versions and integrity do not prove every dependency is vulnerability-free.",
        "C": "Known component identity still requires assessing applicable vulnerability findings.",
        "D": "Install-script policy needs separate controls beyond the lockfile's dependency record."
      }
    },
    "q03": {
      "options": {
        "A": "Clean CI installation follows locked resolution rather than upgrading every package.",
        "B": "Reproducible installation does not mean deliberately bypassing package integrity checks.",
        "C": "Installed dependencies still need relevant application and integration behavior tests.",
        "D": "Clean lockfile-driven installs detect mismatched manifests instead of silently resolving new trees."
      }
    },
    "q04": {
      "options": {
        "A": "Audit reports can identify real applicable issues and need careful review.",
        "B": "Vulnerability auditing differs from checking source style and formatting rules.",
        "C": "Prioritize findings using reachable behavior, exposure, environment, and practical correction options.",
        "D": "Development dependencies can execute in powerful build environments and deserve context-specific review."
      }
    },
    "q05": {
      "options": {
        "A": "Automatic updates can change behavior and require review of dependency and regression effects.",
        "B": "Dependency correction can modify the recorded resolution and lockfile contents.",
        "C": "Package changes can alter executable code rather than only documentation.",
        "D": "Teams can and should test behavior after applying dependency changes."
      }
    },
    "q06": {
      "options": {
        "A": "Lifecycle hooks are executable behavior rather than harmless package comments.",
        "B": "Installation hooks can execute with the build job's available files and credentials.",
        "C": "Such scripts can run on installation hosts outside browser contexts.",
        "D": "Install hooks are directly connected to package acquisition and workflow behavior."
      }
    },
    "q07": {
      "options": {
        "A": "Clear ownership and registry selection do not prove safe package implementation.",
        "B": "Scoped naming does not automatically eliminate all transitive package relationships.",
        "C": "Explicit naming and registry mapping reduce ambiguity about internal package ownership and source.",
        "D": "Lockfiles still record the exact selected versions for reproducible resolution."
      }
    },
    "q08": {
      "options": {
        "A": "One broad token exposes unrelated repositories and publishing capabilities together.",
        "B": "Committed credentials spread through histories and artifacts beyond intended consumers.",
        "C": "Install-only workflows generally do not need package publishing authority.",
        "D": "Use managed scoped credentials with task-specific rights and explicit replacement policies."
      }
    },
    "q09": {
      "options": {
        "A": "Provenance links released packages to identifiable source, workflow, and publisher context.",
        "B": "Provenance establishes origin evidence rather than absence of every vulnerability.",
        "C": "Publisher identities still require strong account and workflow access protections.",
        "D": "Known build origin does not replace reviewing the code being published."
      }
    },
    "q10": {
      "options": {
        "A": "Unreviewed dependency changes can introduce incompatible or compromised executable components.",
        "B": "Govern resolution changes, clean installs, secret access, exceptions, and remediation ownership.",
        "C": "Registry settings affect package sources and should be reviewable and documented.",
        "D": "Audit reports supplement rather than constitute the entire supply-chain security program."
      }
    }
  }
};
