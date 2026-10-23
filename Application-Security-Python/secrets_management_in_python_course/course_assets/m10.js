window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-bb700c3cf6",
  "questions": {
    "q01": {
      "options": {
        "A": "Secrets provide sensitive capabilities such as authentication, decryption, or signing.",
        "B": "A production label does not make configuration intrinsically secret.",
        "C": "Public selectors identify keys without granting their private capabilities.",
        "D": "Public key identifiers generally select keys without disclosing private material."
      }
    },
    "q02": {
      "options": {
        "A": "Repository history preserves literals rather than automatically encrypting them.",
        "B": "Rebuilding bytecode does not rotate credentials embedded in source.",
        "C": "Embedded credentials spread into many retained copies and artifacts.",
        "D": "Deleting current code does not remove historical credential copies."
      }
    },
    "q03": {
      "options": {
        "A": "Public certificates and identifiers do not normally grant secret capabilities.",
        "B": "Worker counts and feature labels are ordinarily nonsecret configuration.",
        "C": "Region and release identifiers are usually public configuration metadata.",
        "D": "Credentials and private key material grant sensitive access capabilities."
      }
    },
    "q04": {
      "options": {
        "A": "Source artifacts often enter reviews, builds, backups, and shared tools.",
        "B": "Source code has broad copying and retention that expands exposure.",
        "C": "Committed credentials may be exposed even before production use.",
        "D": "Encryption still requires managed keys and does not justify source storage."
      }
    },
    "q05": {
      "options": {
        "A": "Environment values can leak through process inheritance and diagnostic tooling.",
        "B": "Environment variables are process state accessible beyond one code line.",
        "C": "Child processes and diagnostic snapshots may inherit environment values.",
        "D": "Environment values may appear in crash data and platform diagnostics."
      }
    },
    "q06": {
      "options": {
        "A": "Embedding generated tokens in source recreates credential retention risks.",
        "B": "Managed stores centralize secret storage and controlled access decisions.",
        "C": "Workloads should retrieve only secrets required for their approved purpose.",
        "D": "Authentication alone must not grant every workload every stored credential."
      }
    },
    "q07": {
      "options": {
        "A": "Shared namespace access exposes more secrets than each workload needs.",
        "B": "Grant each workload access only to required secret values.",
        "C": "Shared administrator credentials violate least privilege and expand compromise impact.",
        "D": "One shared administrator credential grants unnecessarily broad workload capabilities."
      }
    },
    "q08": {
      "options": {
        "A": "Environment separation limits access impact regardless of password change frequency.",
        "B": "Separate credentials prevent development compromise from granting production access.",
        "C": "Shared credentials weaken isolation between environments with different trust levels.",
        "D": "Consistent behavior does not make shared production credentials safely isolated."
      }
    },
    "q09": {
      "options": {
        "A": "Rotation replaces actual credential material and manages consumer transitions.",
        "B": "Re-encoding preserves the credential and its existing access capability.",
        "C": "Moving storage does not replace or invalidate the credential.",
        "D": "Base64 changes representation rather than underlying authentication secret material."
      }
    },
    "q10": {
      "options": {
        "A": "Coordinate consumers, timing, retirement, and recovery to maintain availability.",
        "B": "Consumers may cache values or require coordinated redeployment updates.",
        "C": "Revoking active credentials too early can interrupt dependent workloads.",
        "D": "Consumers do not universally update simultaneously or without rollback needs."
      }
    },
    "q11": {
      "options": {
        "A": "Build logs can retain credentials after image publication completes.",
        "B": "Multi-stage design does not automatically prevent sensitive build cache exposure.",
        "C": "Build stages still need secret safe logging and cache handling.",
        "D": "Build credentials can persist beyond the intended build execution lifetime."
      }
    },
    "q12": {
      "options": {
        "A": "Image copying and reuse expand the lifetime of embedded credentials.",
        "B": "Stored image layers may reveal secrets without running containers.",
        "C": "Registries do not universally rotate embedded credentials found in layers.",
        "D": "Image inspection can expose embedded secrets outside production runtime."
      }
    },
    "q13": {
      "options": {
        "A": "Controlled secret access metadata can be logged without credential values.",
        "B": "Truncated keys and tokens may still expose sensitive secret material.",
        "C": "Exclude capability granting secret values from ordinary diagnostic records.",
        "D": "Truncation is not a universal safe treatment for private keys."
      }
    },
    "q14": {
      "options": {
        "A": "Scanning detects likely leaked credentials across source and build artifacts.",
        "B": "Credential generation without retirement is not secret exposure detection.",
        "C": "Hiding credentials from scanners does not fix unsafe source storage.",
        "D": "Discovery still requires response, revocation, and history remediation decisions."
      }
    },
    "q15": {
      "options": {
        "A": "Waiting for visible misuse leaves exposed credentials available for abuse.",
        "B": "Treat exposure as compromise and revoke or rotate affected credentials.",
        "C": "Deleting one copy does not invalidate the exposed authentication value.",
        "D": "Lack of observed misuse does not establish credential confidentiality."
      }
    },
    "q16": {
      "options": {
        "A": "Tiny tokens and plaintext logs provide inadequate secret protection.",
        "B": "Environment delivery alone does not manage rotation or incident response.",
        "C": "Environment variables do not establish complete lifecycle and access policies.",
        "D": "Secret management protects capabilities throughout creation, use, response, and retirement."
      }
    }
  }
};
