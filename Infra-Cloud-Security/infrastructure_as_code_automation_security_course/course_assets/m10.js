window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-b7cb249a5c",
  "questions": {
    "q1": {
      "options": {
        "A": "IaC automation can create, alter, or delete resources in production environments.",
        "B": "Infrastructure definitions and automation can change real resources and security boundaries.",
        "C": "Automation still requires access controls to restrict who can change infrastructure.",
        "D": "IaC definitions can execute resource changes rather than merely store comments."
      }
    },
    "q2": {
      "options": {
        "A": "Infrastructure repositories define operational resources and controls beyond formatting preferences.",
        "B": "Repository protection complements review of the actual planned infrastructure changes.",
        "C": "Repository changes can alter production networks, identities, data exposure, and compute.",
        "D": "IaC repositories commonly connect directly to build and deployment automation."
      }
    },
    "q3": {
      "options": {
        "A": "Untrusted events should not automatically obtain credentials with infrastructure change authority.",
        "B": "Automatically privileging every file change allows insufficiently reviewed code to affect infrastructure.",
        "C": "Untrusted triggers should be constrained before reaching production apply credentials.",
        "D": "Validation can run with limited permissions while privileged execution remains separated."
      }
    },
    "q4": {
      "options": {
        "A": "Broad administrator credentials grant more power than many planning tasks require.",
        "B": "Required permissions depend on each job; planning is not inherently more privileged.",
        "C": "Applying changes normally requires credentials authorized to modify targeted resources.",
        "D": "Reading intended changes may require fewer permissions than applying those changes."
      }
    },
    "q5": {
      "options": {
        "A": "State can contain operational details and secrets beyond public documentation.",
        "B": "State may reveal identifiers, configuration, relationships, outputs, and other sensitive information.",
        "C": "State tracks information about infrastructure that the automation actually manages.",
        "D": "Publishing state may expose secrets and internal infrastructure information unnecessarily."
      }
    },
    "q6": {
      "options": {
        "A": "Monitoring remains necessary after changes to detect failures, drift, and misuse.",
        "B": "Review does not make destructive or stateful infrastructure changes automatically reversible.",
        "C": "Reviewing a plan helps identify unintended or risky changes before application.",
        "D": "Plan review should expose meaningful changes so reviewers can evaluate risk."
      }
    },
    "q7": {
      "options": {
        "A": "Reusable components still require policy checks appropriate to their operational impact.",
        "B": "Modules and providers can materially affect resource creation and configuration.",
        "C": "Dependencies can change resources and may operate with sensitive credentials or state.",
        "D": "Reusability alone does not establish a component's origin or trustworthiness."
      }
    },
    "q8": {
      "options": {
        "A": "Automated policy checks complement review rather than bypass every approval requirement.",
        "B": "Policy enforcement should constrain changes without broadly expanding pipeline credentials.",
        "C": "Sensitive state still needs access protection regardless of automated policy checks.",
        "D": "Policy as code can enforce guardrails before risky changes reach infrastructure."
      }
    },
    "q9": {
      "options": {
        "A": "Separate credentials and state help contain lower environment access away from production.",
        "B": "Explicit separation makes environment boundaries clearer for operators and automation.",
        "C": "Separate environments do not eliminate review requirements for high impact changes.",
        "D": "Isolation reduces risk but cannot guarantee every production operation succeeds."
      }
    },
    "q10": {
      "options": {
        "A": "Useful logs can contain carefully selected non sensitive infrastructure context.",
        "B": "Broadly accessible logs can expose secrets, endpoints, state, and internal configuration.",
        "C": "Logs are often retained and copied into monitoring or support systems.",
        "D": "Sensitive log content does not provide an automatic rollback mechanism."
      }
    },
    "q11": {
      "options": {
        "A": "Rollback planning concerns infrastructure behavior and recovery beyond text formatting.",
        "B": "Access review still matters even when a recovery plan exists.",
        "C": "Some infrastructure changes are destructive or difficult to reverse safely.",
        "D": "Cloud resources do not universally revert when a deployment causes problems."
      }
    },
    "q12": {
      "options": {
        "A": "Operations teams need appropriate visibility into plans, state handling, and approvals.",
        "B": "One powerful credential across environments removes useful isolation and least privilege.",
        "C": "Immediate unreviewed applies can introduce unintended infrastructure and security changes.",
        "D": "Secure IaC combines controlled changes, review, limited authority, visibility, and recovery preparation."
      }
    }
  }
};
