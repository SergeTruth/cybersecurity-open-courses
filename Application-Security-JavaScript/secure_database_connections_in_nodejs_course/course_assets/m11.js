window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-78901182f2",
  "questions": {
    "q01": {
      "options": {
        "A": "Database clients possess the permissions of their authenticated roles, including potentially broad data and transaction authority.",
        "B": "Connections may execute persistent operations and expose data independently of the current HTTP response.",
        "C": "Network location controls reachability, while database permissions determine available statements and data access.",
        "D": "A connection authenticates an application to persistent data stores and conveys the authority of its database role."
      }
    },
    "q02": {
      "options": {
        "A": "Database URLs commonly include credentials and internal deployment details beyond a public endpoint identifier.",
        "B": "Connection strings combine access credentials with deployment topology and security-sensitive connection configuration.",
        "C": "Removing a password can still leave usernames, hosts, database names, and sensitive options exposed.",
        "D": "Internal hostnames and TLS settings can reveal deployment structure and security configuration useful to attackers."
      }
    },
    "q03": {
      "options": {
        "A": "Publishing a new secret does not automatically refresh process environments or existing database clients.",
        "B": "Environment variables transport values without implementing database grants, rotation, version policy, or access auditing.",
        "C": "A complete strategy adds controlled secret storage, access policy, rotation, version transitions, and auditability.",
        "D": "Diagnostics, inherited environments, process inspection, and crash reports can expose database environment values."
      }
    },
    "q04": {
      "options": {
        "A": "Encryption without authenticated certificate validation can establish an encrypted connection to an impersonating server.",
        "B": "Internal network placement does not prevent server impersonation or remove the need to validate server identity.",
        "C": "Encrypting credentials to an unverified peer can deliver them securely to an attacker-controlled server.",
        "D": "Certificate and hostname checks bind the encrypted connection to the intended database server identity."
      }
    },
    "q05": {
      "options": {
        "A": "Ordinary queries generally require scoped operational permissions rather than ownership of every database object.",
        "B": "Superuser or privileged roles may bypass row-level policies and expose capabilities beyond application needs.",
        "C": "Restricting runtime roles to required schemas and operations reduces the damage from application compromise.",
        "D": "Pooling reuses authenticated connections and does not narrow their effective grants to one prepared statement."
      }
    },
    "q06": {
      "options": {
        "A": "Schema migrations often need object-creation or alteration permissions that ordinary runtime requests should lack.",
        "B": "Separate roles keep schema-changing DDL authority out of the long-running application's normal execution context.",
        "C": "Shared credentials obscure which workflow acted and give runtime traffic unnecessary migration-level authority.",
        "D": "Deployment review does not prevent a compromised runtime from exercising any migration privileges it retains."
      }
    },
    "q07": {
      "options": {
        "A": "Bounded pools and deadlines support availability, while excessive concurrency or retries can worsen database overload.",
        "B": "Oversized pools can exhaust database resources and increase contention rather than improve resilience.",
        "C": "An acquisition timeout limits waiting for a connection; statement execution needs its own timeout controls.",
        "D": "Unlimited retries multiply load and can prolong an outage when the database is already overloaded."
      }
    },
    "q08": {
      "options": {
        "A": "Authentication is one layer; public reachability still increases exposure to attacks and service exhaustion.",
        "B": "Namespaces do not guarantee separation of credentials, privileges, networks, or production data access.",
        "C": "Strong rotating credentials do not eliminate the attack surface created by unnecessary network reachability.",
        "D": "Restricting reachability to approved identities and environments reduces exposure and blocks unintended deployment access."
      }
    },
    "q09": {
      "options": {
        "A": "Connection diagnostics should be minimized and redacted because credentials and other sensitive details can appear throughout them.",
        "B": "Complete connection URLs can reveal passwords, account identities, internal hosts, and sensitive configuration to clients.",
        "C": "Removing passwords does not make topology and role information appropriate for unrestricted client disclosure.",
        "D": "Driver diagnostics may expose queries, data, paths, credentials, or internals beyond the password field."
      }
    },
    "q10": {
      "options": {
        "A": "TLS protects transport but does not establish correct credentials, privileges, network boundaries, resource limits, or cleanup.",
        "B": "A successful readiness query proves basic connectivity, not least privilege or proper environment isolation.",
        "C": "Secure connection review must cover identity, transport, authority, availability controls, exposure, diagnostics, and lifecycle behavior.",
        "D": "Cleanup and failure-path tests should happen before production so leaks and exhaustion can be prevented."
      }
    }
  }
};
