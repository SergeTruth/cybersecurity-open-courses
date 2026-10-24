window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-7d8e4492f7",
  "questions": {
    "q1": {
      "options": {
        "A": "Wrappers can select credentials and targets and invoke changes that alter live infrastructure and access.",
        "B": "A reviewed module can still be executed with the wrong variables, identity, backend, or operation.",
        "C": "Remote state does not authorize every requested change or prevent destructive plans.",
        "D": "Helper scripts can invoke apply and other operations with lasting infrastructure effects."
      }
    },
    "q2": {
      "options": {
        "A": "Caller-supplied environment is input rather than proof of the intended cloud identity or target.",
        "B": "Checking effective identity, workspace, and backend prevents a valid command from operating on the wrong environment's resources.",
        "C": "A workspace label does not prove which cloud account and role the process is using.",
        "D": "Backend access grants do not automatically authorize changes across every environment represented in state."
      }
    },
    "q3": {
      "options": {
        "A": "Separate credentials and workflows prevent lower-trust automation from automatically receiving production infrastructure authority.",
        "B": "Different paths organize files without necessarily restricting credentials, state access, or cloud permissions.",
        "C": "Workspace separation alone cannot constrain the broad production permissions of a shared role.",
        "D": "Plan review complements environment and identity separation rather than replacing them."
      }
    },
    "q4": {
      "options": {
        "A": "Provider validation does not restrict cloud permissions to the helper job's actual required scope.",
        "B": "A short run can still execute high-impact changes using a broadly privileged identity.",
        "C": "Avoiding permission failures by granting everything increases the authority exposed to mistakes and compromise.",
        "D": "Narrow grants limit the infrastructure a defective or compromised helper can modify beyond its intended task."
      }
    },
    "q5": {
      "options": {
        "A": "Fixed operation policy, separate validated arguments, and explicit outcome checks keep wrappers within the approved workflow.",
        "B": "An existing plan does not make a failed initialization or wrong backend state acceptable.",
        "C": "A single interpreted command string can merge caller data with shell syntax and ambiguous argument boundaries.",
        "D": "Allowed subcommands can still receive dangerous caller-controlled flags that alter targets, inputs, or behavior."
      }
    },
    "q6": {
      "options": {
        "A": "State records actual deployment details and can include sensitive values beyond public provider documentation.",
        "B": "Encrypted transit does not protect an unguarded stored state file or copied artifact.",
        "C": "Removing displayed outputs does not necessarily remove sensitive resource attributes retained in state.",
        "D": "State can reveal resources, relationships, identifiers, and sensitive operational values and therefore needs controlled access and retention."
      }
    },
    "q7": {
      "options": {
        "A": "Saved plans can contain detailed values and execution context beyond the visible summary diff.",
        "B": "A plan can expose sensitive details and lose correspondence with the state, inputs, or approvals needed for a later operation.",
        "C": "A checksum establishes byte correspondence, not who authorized the plan or its target environment.",
        "D": "Changed inputs or target state can invalidate assumptions behind an earlier saved and reviewed plan."
      }
    },
    "q8": {
      "options": {
        "A": "Approval records should reference safe evidence without distributing unnecessary sensitive plan contents.",
        "B": "Command success does not establish that the proposed effects satisfy the deployment's authorization and security policy.",
        "C": "Inspecting planned effects exposes deletions, replacements, privilege changes, and other high-impact operations before execution.",
        "D": "Equal resource counts can hide materially different changes to data, permissions, and infrastructure."
      }
    },
    "q9": {
      "options": {
        "A": "Provisioners can run as part of infrastructure workflows and affect systems beyond declarative resource definitions.",
        "B": "Local quoting does not validate all later command interpretation and remote execution boundaries.",
        "C": "Environment and workflow choices can expose credentials to child processes and need explicit execution-boundary review.",
        "D": "Modules and execution hooks can introduce commands using powerful credentials, so their code and authority need deliberate review."
      }
    },
    "q10": {
      "options": {
        "A": "Apply gates protect infrastructure-changing authority rather than primarily govern documentation edits.",
        "B": "A valid-looking plan still needs the correct identity, environment, backend, and activation authority.",
        "C": "Review and effective-target checks before application prevent lower-trust jobs from automatically turning plans into production effects.",
        "D": "Feature-branch code should not automatically obtain production mutation authority merely for workflow consistency."
      }
    },
    "q11": {
      "options": {
        "A": "Short retention does not make secrets harmless while logs are readable or copied elsewhere.",
        "B": "State and secret-bearing output should not be replicated into logs that widen access and retention.",
        "C": "Diagnosis can use safe metadata and controlled artifacts rather than retaining complete sensitive state in logs.",
        "D": "Identifiers and architecture details can remain sensitive even after obvious passwords and tokens are redacted."
      }
    },
    "q12": {
      "options": {
        "A": "Arbitrary flags can redefine operation behavior and scope beyond the helper's approved contract.",
        "B": "Broad recovery roles expose more infrastructure to mistakes and require their own justified controls.",
        "C": "Scoped identities, reviewed changes, checked outcomes, and prepared recovery keep infrastructure automation accountable and bounded.",
        "D": "Generating a plan does not itself authorize the actor, target, or later application of its effects."
      }
    }
  }
};
