window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-d1c73c50d9",
  "questions": {
    "q1": {
      "options": {
        "A": "Repository state can select workflow code and released executable artifacts.",
        "B": "Repository automation still needs governance over source and privileged actions.",
        "C": "Git operations influence the code later built and deployed by automation.",
        "D": "Git automation changes trusted source state beyond local editor settings."
      }
    },
    "q2": {
      "options": {
        "A": "Low-trust source content must not control workflows holding privileged credentials.",
        "B": "Credential authority should follow justified task needs rather than repository existence.",
        "C": "Repository trust matters for scripts, workflows, configuration, and other executable content.",
        "D": "Cloning does not establish that received source or configuration is trustworthy."
      }
    },
    "q3": {
      "options": {
        "A": "Different repository events can trigger build, test, and release workflows.",
        "B": "Protection and review policies vary across refs and contribution sources.",
        "C": "A new branch or fork does not automatically represent an approved release.",
        "D": "Contributions and refs can originate from different identities with different permissions."
      }
    },
    "q4": {
      "options": {
        "A": "Credential logging discloses access material rather than establishing safe auditability.",
        "B": "Broad shared tokens expand compromise and complicate attribution across unrelated tasks.",
        "C": "Read-only work should not receive authority to modify repository contents.",
        "D": "Limit credentials to required repositories, actions, environments, and effective lifetimes."
      }
    },
    "q5": {
      "options": {
        "A": "Write permissions do not inherently prevent a read-only clone operation.",
        "B": "Cloning reads repository data and does not require write authority.",
        "C": "Extra permission cannot make secret-bearing operational logs safer to retain.",
        "D": "A validation or clone job need not possess production deployment privileges."
      }
    },
    "q6": {
      "options": {
        "A": "Command strings do not validate a chosen branch or repository identifier.",
        "B": "String construction does not prevent Git execution and network failures.",
        "C": "Joining syntax with values invites unintended shell interpretation during reparsing.",
        "D": "Git accepts separately passed arguments with explicit validated operational meaning."
      }
    },
    "q7": {
      "options": {
        "A": "Directory changes do not rotate repository credentials or revoke access.",
        "B": "Git commonly locates repository state through the effective working directory.",
        "C": "Working directory affects repository selection rather than merely output colors.",
        "D": "Verify repository context so commands cannot modify an unintended checkout."
      }
    },
    "q8": {
      "options": {
        "A": "Hooks and configuration can select executable behavior and therefore need trust review.",
        "B": "Automated workflows can encounter Git configuration and supported hook execution paths.",
        "C": "Hooks do not categorically remove access to the process's available credentials.",
        "D": "Local execution policy complements rather than replaces protected branch governance."
      }
    },
    "q9": {
      "options": {
        "A": "Build outputs and scripts can disclose credentials granted to untrusted jobs.",
        "B": "Production credentials remain valuable even inside a short validation workflow.",
        "C": "Unreviewed contribution triggers must not inherit production secrets or deployment authority.",
        "D": "Trigger trust must justify access instead of automatically granting release privileges."
      }
    },
    "q10": {
      "options": {
        "A": "Submodules can reference different repositories and independent maintenance identities.",
        "B": "Additional source introduces dependency and provenance obligations rather than eliminating risk.",
        "C": "Submodule use does not prevent builds from generating trusted artifacts.",
        "D": "Review both the additional repository origin and the specific referenced commit."
      }
    },
    "q11": {
      "options": {
        "A": "Exclude reusable credentials and unnecessarily sensitive output from repository diagnostics.",
        "B": "Approved repository and outcome metadata can support useful operational traceability.",
        "C": "Evidence is useful when it records outcomes without disclosing secret material.",
        "D": "Clear bounded failure categories help investigation without full credential dumps."
      }
    },
    "q12": {
      "options": {
        "A": "Reviewers need explicit refs and target context to assess release intent.",
        "B": "Scope authority and preserve accountable review, evidence, and recovery for repository operations.",
        "C": "Unrestricted tokens make low-impact tasks unnecessarily powerful across repositories.",
        "D": "Each event needs appropriate trust and release policy before production changes."
      }
    }
  }
};
