window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-69f78dd540",
  "questions": {
    "q01": {
      "options": {
        "A": "A public product label does not ordinarily grant database access.",
        "B": "Database secrets are sensitive values used to connect or authenticate.",
        "C": "A visual styling setting is not a database authentication credential.",
        "D": "Schema descriptions normally document structure rather than authorize database connections."
      }
    },
    "q02": {
      "options": {
        "A": "Hardcoded values can spread through repositories, images, backups, logs, and shared outputs.",
        "B": "Embedded copies make credential replacement and complete rotation harder.",
        "C": "A usable leaked credential can enable access within its permissions.",
        "D": "Database roles and permissions remain necessary regardless of credential storage."
      }
    },
    "q03": {
      "options": {
        "A": "Interface colors do not authenticate an application to the database.",
        "B": "A public document title does not grant database access privileges.",
        "C": "Passwords, tokens, keys, and sensitive connection values can authenticate database clients.",
        "D": "A static asset filename does not normally supply database authentication material."
      }
    },
    "q04": {
      "options": {
        "A": "Environment separation should restrict production access rather than make databases public.",
        "B": "Each environment still needs suitable authentication and permission boundaries.",
        "C": "Separate credentials create real access boundaries beyond configuration naming conventions.",
        "D": "Isolation prevents lower trust environments from inheriting production database authority."
      }
    },
    "q05": {
      "options": {
        "A": "A managed store protects secrets and controls authorized retrieval of their values.",
        "B": "Query parameterization is a separate concern from credential storage.",
        "C": "Data backups remain necessary for recovery alongside protected credential management.",
        "D": "A secret store should restrict disclosure rather than publish live credentials."
      }
    },
    "q06": {
      "options": {
        "A": "Environment variables commonly carry runtime configuration, including sensitive values.",
        "B": "Environments can leak through inspection, diagnostics, logs, tooling, or broad process access.",
        "C": "Reading configuration from an environment does not itself rotate credentials.",
        "D": "Access restrictions still govern who can inspect or retrieve sensitive values."
      }
    },
    "q07": {
      "options": {
        "A": "Administrator credentials usually exceed the access needed for ordinary application queries.",
        "B": "Shared credentials weaken environment separation and expand compromise impact.",
        "C": "Each credential should authorize only its approved database operations and scope.",
        "D": "Audit visibility remains useful when least privilege permissions are enforced."
      }
    },
    "q08": {
      "options": {
        "A": "Migration credentials can change schemas and deserve careful access control.",
        "B": "Runtime identities ordinarily do not need unrestricted ownership of all database objects.",
        "C": "Credential separation limits privilege but cannot prevent every deployment failure.",
        "D": "Schema changes can require privileges that the runtime application should not retain."
      }
    },
    "q09": {
      "options": {
        "A": "Connection strings can embed credentials even when their hostnames are public.",
        "B": "A hostname identifies a destination rather than inherently acts as its password.",
        "C": "Connection configuration affects actual database access rather than being only commentary.",
        "D": "Connection values can determine authentication, identity, destinations, and security behavior."
      }
    },
    "q10": {
      "options": {
        "A": "Centralized loading should control disclosure rather than make secrets public.",
        "B": "Shared loading logic improves consistency, review, rotation, and safe error reporting.",
        "C": "Database permissions still limit the actions a loaded credential authorizes.",
        "D": "Centralization can support fake providers and controlled tests of failures."
      }
    },
    "q11": {
      "options": {
        "A": "Rotation changes authentication material rather than only alters visual presentation.",
        "B": "Deleting logs destroys useful evidence and does not safely rotate credentials.",
        "C": "Rotation can affect pools, jobs, running instances, migrations, recovery, and availability.",
        "D": "Credentials still need accountable ownership during rotation and eventual retirement."
      }
    },
    "q12": {
      "options": {
        "A": "Old credentials should be retired after the transition is validated.",
        "B": "Live credentials should not be published in public configuration examples.",
        "C": "Monitoring helps confirm the new credential works and detects failures.",
        "D": "Controlled overlap allows clients to transition before old access is revoked."
      }
    },
    "q13": {
      "options": {
        "A": "Image content can be copied, cached, scanned, and reused beyond its intended runtime.",
        "B": "Container layers can contain text files and embedded credential values.",
        "C": "Building an image does not automatically replace embedded credentials when they rotate.",
        "D": "Images distribute application content rather than provide a managed secret retrieval boundary."
      }
    },
    "q14": {
      "options": {
        "A": "Timestamps can provide safe operational context when recorded appropriately.",
        "B": "Avoid passwords, tokens, private keys, and complete credential bearing connection strings.",
        "C": "Non sensitive correlation identifiers can connect events without exposing credentials.",
        "D": "Bounded error categories support diagnosis without disclosing authentication material."
      }
    },
    "q15": {
      "options": {
        "A": "Normal service operation does not establish that an exposed credential is safe.",
        "B": "Keeping compromised access active can allow unauthorized database operations.",
        "C": "Assess scope, revoke or rotate exposed credentials, and investigate affected access.",
        "D": "Committing a credential adds more copies rather than contains its exposure."
      }
    },
    "q16": {
      "options": {
        "A": "One shared embedded password creates broad, persistent, and difficult to rotate access.",
        "B": "Query safety and authorization still matter after credential storage is improved.",
        "C": "Scripts, jobs, internal services, and administrative tools also use sensitive credentials.",
        "D": "Manage credential creation, storage, access, use, rotation, monitoring, and retirement."
      }
    }
  }
};
