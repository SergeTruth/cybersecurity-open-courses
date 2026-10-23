window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e413897455",
  "questions": {
    "q01": {
      "options": {
        "A": "Query safety does not secure authentication or the database connection.",
        "B": "Backup encryption addresses stored data rather than live connection security.",
        "C": "Private networks do not replace account controls or endpoint verification.",
        "D": "Connection security covers identity, transport, permissions, and operational behavior together."
      }
    },
    "q02": {
      "options": {
        "A": "Internal routing does not prove every connecting identity is authorized.",
        "B": "Boundaries expose interactions among identities, secrets, drivers, and database permissions.",
        "C": "Shared administrator credentials expand access rather than secure separate workloads.",
        "D": "Drivers cannot infer the application's intended secret ownership and permissions."
      }
    },
    "q03": {
      "options": {
        "A": "Migrations define schema changes rather than database connection parameters.",
        "B": "DSNs commonly include endpoint, identity, database, and transport configuration.",
        "C": "Connection descriptions specify where and how applications reach databases.",
        "D": "SQL statements and bound parameters are separate from connection configuration."
      }
    },
    "q04": {
      "options": {
        "A": "DSNs may reveal sensitive hosts, keys, and options beyond passwords.",
        "B": "Percent encoding is reversible and does not protect embedded credentials.",
        "C": "Connection details can disclose credentials and sensitive infrastructure access information.",
        "D": "Environment storage does not eliminate disclosure through diagnostics and inheritance."
      }
    },
    "q05": {
      "options": {
        "A": "Source copies and history can preserve embedded database credentials widely.",
        "B": "Private repositories still produce artifacts, backups, and developer copies.",
        "C": "Splitting literals or renaming variables does not protect credential values.",
        "D": "Deleted source lines can remain accessible through repository history."
      }
    },
    "q06": {
      "options": {
        "A": "Database grants require explicit policy beyond the application's current queries.",
        "B": "Secret stores centralize credentials and control workload retrieval and lifecycle.",
        "C": "Row encryption does not replace credential rotation or access policy.",
        "D": "Managed retrieval does not make secret values safe for logging."
      }
    },
    "q07": {
      "options": {
        "A": "Properly verified TLS protects database traffic against interception and tampering.",
        "B": "TLS protects network transport rather than stored database files.",
        "C": "Query authorization still requires database and application permission controls.",
        "D": "Hostname and certificate verification remain necessary to authenticate endpoints."
      }
    },
    "q08": {
      "options": {
        "A": "Private IP addresses do not authenticate the intended database service.",
        "B": "Password acceptance does not establish the database server's trusted identity.",
        "C": "Encryption without identity verification can connect securely to an attacker.",
        "D": "Certificate checks authenticate the database endpoint the application intended."
      }
    },
    "q09": {
      "options": {
        "A": "Private routing cannot replace verification of the expected server identity.",
        "B": "Accepting arbitrary certificates permits encrypted connections to impersonating endpoints.",
        "C": "Expired or unrelated certificates change which endpoints clients accept.",
        "D": "Sending passwords to an unverified endpoint may expose those credentials."
      }
    },
    "q10": {
      "options": {
        "A": "Grant only operations and schema access required by each workload.",
        "B": "Shared administrator roles grant unnecessarily broad power to compromised applications.",
        "C": "Least privilege grants needed writes when the workload requires them.",
        "D": "Network reachability controls do not replace narrow database account grants."
      }
    },
    "q11": {
      "options": {
        "A": "Runtime requests should not retain unnecessary schema modification authority.",
        "B": "Different pool names do not change identical underlying database grants.",
        "C": "Migration privileges often exceed normal application runtime database requirements.",
        "D": "Separation should restrict underlying privileges rather than merely rename accounts."
      }
    },
    "q12": {
      "options": {
        "A": "Pools do not universally refresh credentials and grants before every statement.",
        "B": "Retained sessions can outlive credential and permission lifecycle changes.",
        "C": "Pooling affects session security and revocation behavior beyond performance.",
        "D": "More connections do not fix stale or improperly retained sessions."
      }
    },
    "q13": {
      "options": {
        "A": "Unknown commit outcomes require care to avoid duplicate database effects.",
        "B": "Removing deadlines can exhaust workers and database connection capacity.",
        "C": "Parameterization does not make repeated writes automatically safe or idempotent.",
        "D": "Limits and retry policy affect availability, duplication, and failure safety."
      }
    },
    "q14": {
      "options": {
        "A": "Exclude credentials and unnecessary sensitive connection details from diagnostic logs.",
        "B": "Masking passwords may leave other sensitive DSN values exposed.",
        "C": "Credential fingerprints and lengths may leak unnecessary secret information.",
        "D": "Raw driver messages can disclose sensitive details in public responses."
      }
    },
    "q15": {
      "options": {
        "A": "SQL typography is not a meaningful database authentication security signal.",
        "B": "Failed logins and unexpected role changes can indicate compromise.",
        "C": "Monitor anomalous access, accounts, privileges, and unsafe connection configurations.",
        "D": "Healthy pool capacity does not prove endpoint or credential security."
      }
    },
    "q16": {
      "options": {
        "A": "Parameter binding does not repair embedded secrets or excessive database privileges.",
        "B": "Network isolation and backup encryption do not secure every runtime control.",
        "C": "Driver defaults cannot define every application's privileges and recovery policy.",
        "D": "Combine verified connections, protected credentials, narrow privileges, and controlled operations."
      }
    }
  }
};
