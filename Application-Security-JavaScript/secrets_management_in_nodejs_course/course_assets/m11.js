window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-99035cf41d",
  "questions": {
    "q01": {
      "options": {
        "A": "Service credentials can grant sensitive access just like passwords, so both require secret protection.",
        "B": "Access credentials and cryptographic keys convey authority, making their confidentiality and controlled use essential.",
        "C": "Encryption at rest protects stored copies but does not make decrypted runtime values non-sensitive.",
        "D": "Internal tokens still authorize actions and can be stolen through internal exposure paths."
      }
    },
    "q02": {
      "options": {
        "A": "Ignoring a file prevents future tracking but does not erase previously committed credentials from history.",
        "B": "Repository history and distributed copies retain secrets after the current file has been removed.",
        "C": "Private repositories still distribute credentials to collaborators, tooling, backups, and potentially compromised accounts.",
        "D": "Removing the working file leaves historical commits and other retained copies available to attackers."
      }
    },
    "q03": {
      "options": {
        "A": "Process startup does not remove a credential's ability to grant access or its disclosure risk.",
        "B": "Environment delivery alone does not implement rotation workflows or produce secret-access audit records.",
        "C": "Environment variables carry secret values; separate controls must govern storage, access, rotation, and auditing.",
        "D": "Variable names do not stop diagnostic capture or inheritance from disclosing their actual values."
      }
    },
    "q04": {
      "options": {
        "A": "Precise identity, workflow, environment, and version grants reduce unnecessary access to production credentials.",
        "B": "Incident response can use controlled emergency access without granting every developer permanent production access.",
        "C": "Reviewed workflow definitions do not make every job or execution context trustworthy with production secrets.",
        "D": "Project-level access can include identities and tooling that do not need the service's production credentials."
      }
    },
    "q05": {
      "options": {
        "A": "Minification changes representation but leaves embedded credentials recoverable from the delivered browser bundle.",
        "B": "HTTPS protects transport, while browser users and scripts can still inspect locally stored values.",
        "C": "Build tools can substitute environment values into browser bundles, exposing them to every recipient.",
        "D": "Users can inspect delivered scripts, network traffic, and runtime values, so frontend secrets cannot remain confidential."
      }
    },
    "q06": {
      "options": {
        "A": "Repository membership alone does not establish approval to access each environment's deployment credentials.",
        "B": "Workflow and environment restrictions reduce the pipelines that can retrieve a particular credential.",
        "C": "Branch builds may execute untrusted changes and should not automatically receive production deployment secrets.",
        "D": "Encryption at rest does not replace approval controls governing which running jobs receive decrypted credentials."
      }
    },
    "q07": {
      "options": {
        "A": "Narrow grants reduce the actions and resources an attacker can access with a stolen credential.",
        "B": "Authorized callers can still copy or disclose secrets; least privilege limits authority rather than preventing leakage.",
        "C": "Reading a stored credential can enable downstream actions even without permission to modify that credential.",
        "D": "Periodic rotation does not restrict the damage a leaked credential can cause before revocation."
      }
    },
    "q08": {
      "options": {
        "A": "Consumers may require coordinated version transitions, so replacing active secrets without testing can break service.",
        "B": "Cached clients and established connections may continue using old credentials until explicitly refreshed or reconnected.",
        "C": "Rotation rehearsals reveal transition, caching, rollback, and dependency problems before an urgent incident.",
        "D": "Emergency urgency increases the value of prepared compatibility and recovery procedures instead of eliminating them."
      }
    },
    "q09": {
      "options": {
        "A": "Secrets can appear under many field names and inside messages, URLs, headers, and nested data.",
        "B": "Logs can remain accessible long after a request ends, preserving any secrets they captured.",
        "C": "Low-entropy secrets can be guessed from digests, and some digest values can themselves confer authority.",
        "D": "Log retention and aggregation can spread credentials to many systems and readers beyond their intended scope."
      }
    },
    "q10": {
      "options": {
        "A": "Prompt revocation or rotation limits ongoing misuse while containment and safe evidence collection support investigation.",
        "B": "Deleting one local copy leaves the credential active and other exposed copies potentially usable.",
        "C": "Waiting for a complete investigation leaves an exposed credential usable while responders search for evidence.",
        "D": "Removing a committed value does not revoke it or eliminate copies already obtained by attackers."
      }
    }
  }
};
