window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8ab830dbf7",
  "questions": {
    "q01": {
      "options": {
        "A": "Process environment values can vary at runtime rather than be permanently compiled into modules.",
        "B": "Environment values are configuration data rather than filesystem access permission bits.",
        "C": "Python does not compile every environment value into immutable bytecode constants.",
        "D": "Environment variables supply runtime values available to a process and its code."
      }
    },
    "q02": {
      "options": {
        "A": "Process environments are not universally encrypted against authorized inspection.",
        "B": "Privileged tools, dumps, diagnostics, and other processes may expose environment content.",
        "C": "Child processes commonly inherit environments even without shell execution enabled.",
        "D": "Logs, diagnostics, child processes, pipelines, and platform tooling can expose environment secrets."
      }
    },
    "q03": {
      "options": {
        "A": "API keys, passwords, tokens, and signing keys can grant sensitive access.",
        "B": "A public region label ordinarily identifies geography rather than authenticates a caller.",
        "C": "A bounded worker count generally controls resources rather than acts as a credential.",
        "D": "Public regions do not ordinarily carry the authority of authentication credentials."
      }
    },
    "q04": {
      "options": {
        "A": "Different settings require appropriate types and cannot all be interpreted as Boolean values.",
        "B": "Startup validation rejects absent, malformed, or security weakening configuration before serving requests.",
        "C": "The operating system does not infer secure defaults for every application setting.",
        "D": "Delaying critical validation can leave unsafe behavior active until particular requests arrive."
      }
    },
    "q05": {
      "options": {
        "A": "A missing optional visual preference is not equivalent to disabling authentication.",
        "B": "Silent defaults disabling authentication, validation, authorization, or audit protections weaken security.",
        "C": "An appropriate development worker default is not inherently a security critical failure.",
        "D": "An optional color preference does not carry the security significance of access controls."
      }
    },
    "q06": {
      "options": {
        "A": "Ordinary configuration can still require integrity protection against malicious changes.",
        "B": "Logical separation does not automatically change operating system inheritance behavior.",
        "C": "Secrets need stronger restrictions on access, logging, exposure, rotation, and incident handling.",
        "D": "A child can inherit secret variables unless the parent deliberately limits its environment."
      }
    },
    "q07": {
      "options": {
        "A": "Sensitive content can appear under names unrelated to conventional password labels.",
        "B": "Name matching alone can miss credentials with unexpected variable names.",
        "C": "Hashing tokens does not make every retained value and correlation context harmless.",
        "D": "Avoid logging passwords, tokens, private keys, and credential bearing strings or URLs."
      }
    },
    "q08": {
      "options": {
        "A": "Dotenv parsing is not generally equivalent to executing every value as Python code.",
        "B": "A leading dot does not grant encryption or prevent accidental copying.",
        "C": "Environment files can leak through repositories, backups, permissions, developer tools, and copies.",
        "D": "Hidden filenames can still be committed, backed up, uploaded, or shared."
      }
    },
    "q09": {
      "options": {
        "A": "Shortened production values can still reveal sensitive credentials or configuration context.",
        "B": "Brief expiry does not justify distributing usable credentials in sample files.",
        "C": "Temporary credentials remain active secrets during their validity and should not be included.",
        "D": "Sample files should document expected names using placeholders instead of working secrets."
      }
    },
    "q10": {
      "options": {
        "A": "Build outputs and logs can retain values consumed during the build.",
        "B": "Build secrets can persist in layers, caches, artifacts, logs, or metadata.",
        "C": "Commands, cache records, and build output can disclose consumed environment values.",
        "D": "Multiple stages do not automatically remove every secret from history or cache metadata."
      }
    },
    "q11": {
      "options": {
        "A": "Pipeline code or third party steps can access credentials made available to the job.",
        "B": "Human administrator scope is often broader than a particular build task requires.",
        "C": "Not every validation or packaging job needs production deployment permissions.",
        "D": "Job scoped permissions limit damage if a pipeline step or credential is compromised."
      }
    },
    "q12": {
      "options": {
        "A": "Python does not automatically redact every environment name containing TOKEN.",
        "B": "Ordinary subprocesses may inherit more than PATH without requiring shell mode.",
        "C": "Credential like names are not automatically removed during every process launch.",
        "D": "Child processes can inherit parent environment values unless explicit controls restrict them."
      }
    },
    "q13": {
      "options": {
        "A": "Renaming a secret does not prevent the child from exposing its value.",
        "B": "Broadening executable search can introduce untrusted program selection risks.",
        "C": "An explicit child environment can exclude unnecessary secrets and behavior changing configuration.",
        "D": "Removing one named variable does not remove every sensitive or unsafe inherited setting."
      }
    },
    "q14": {
      "options": {
        "A": "Search paths influence program discovery rather than dictate Python exception types.",
        "B": "PATH does not escape arguments or neutralize shell syntax in commands.",
        "C": "Search configuration can determine which executable or component the application loads.",
        "D": "Search paths affect actual code selection rather than merely display names."
      }
    },
    "q15": {
      "options": {
        "A": "Evidence of disclosure warrants response without waiting for confirmed malicious use.",
        "B": "Removing one process copy does not revoke the credential elsewhere.",
        "C": "Other copies can remain usable until the underlying credential is retired.",
        "D": "Assess spread, rotate or revoke the secret, and correct the disclosure mechanism."
      }
    },
    "q16": {
      "options": {
        "A": "Runtime environments still need validation and controlled handling after process creation.",
        "B": "Validate values, minimize sensitive data, constrain disclosure and inheritance, and plan rotation.",
        "C": "Files and environments have different risks; neither is universally safer for every secret.",
        "D": "Placement in an environment does not finish protection, monitoring, rotation, or retirement."
      }
    }
  }
};
