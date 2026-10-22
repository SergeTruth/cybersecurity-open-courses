window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ae03ce3599",
  "questions": {
    "q01": {
      "options": {
        "A": "Public traces can disclose internal implementation and confidential operational details.",
        "B": "Safe errors preserve predictable behavior without unnecessary information reaching callers.",
        "C": "Operators still need controlled visibility into failures and recovery requirements.",
        "D": "Protected diagnostics support investigation without exposing internals to every user."
      }
    },
    "q02": {
      "options": {
        "A": "Traces can identify implementation paths and infrastructure inappropriate for public disclosure.",
        "B": "Internal traces can be valuable when access and sensitive fields are controlled.",
        "C": "Publicly suppressing a trace does not prevent protected internal logging.",
        "D": "A stack trace neither identifies the caller nor replaces authentication."
      }
    },
    "q03": {
      "options": {
        "A": "Correlation identifiers link events and do not encrypt password material.",
        "B": "Linking records does not authorize the underlying resource operation.",
        "C": "A safe reference connects a caller's failure to protected diagnostic records.",
        "D": "Better traceability cannot guarantee prevention of every possible incident."
      }
    },
    "q04": {
      "options": {
        "A": "Password values must stay out of diagnostic authentication event records.",
        "B": "Session tokens can be replayed and should not be logged.",
        "C": "Private keys are confidential material rather than useful routine audit fields.",
        "D": "Authentication outcomes reveal suspicious patterns without recording the presented credentials."
      }
    },
    "q05": {
      "options": {
        "A": "Timestamps help establish event order without inherently exposing access credentials.",
        "B": "Outcomes explain whether the attempted operation succeeded, failed, or was denied.",
        "C": "API keys and session tokens may grant reusable access if disclosed.",
        "D": "Approved nonsecret correlation values can help connect related operational events."
      }
    },
    "q06": {
      "options": {
        "A": "Different failures can reveal whether a targeted account actually exists.",
        "B": "Detailed account-state disclosure can help attackers rather than always improve security.",
        "C": "Error wording does not provide an additional independent authentication factor.",
        "D": "Generic failures still need request limits and abuse-detection controls."
      }
    },
    "q07": {
      "options": {
        "A": "Structured logging uses fields and templates rather than only screenshots.",
        "B": "Consistent named fields make records easier to query and review safely.",
        "C": "Useful structured records can and should include appropriate event timing.",
        "D": "Structure does not justify recording confidential credential values in plaintext."
      }
    },
    "q08": {
      "options": {
        "A": "Operational context and aggregated identifiers can make diagnostic records sensitive.",
        "B": "Access control limits readers rather than preventing every application bug.",
        "C": "Public access can disclose private events and implementation context.",
        "D": "Limit readers because records may contain sensitive identities and system details."
      }
    },
    "q09": {
      "options": {
        "A": "Integrity concerns unauthorized alteration or deletion of retained event evidence.",
        "B": "Display colors do not establish the trustworthiness of log contents.",
        "C": "Recovery workflows are separate from preserving diagnostic evidence against tampering.",
        "D": "A request deadline does not verify whether records were later modified."
      }
    },
    "q10": {
      "options": {
        "A": "Indefinite retention can create unnecessary exposure and storage cost.",
        "B": "Retain useful evidence for justified needs while limiting unnecessary accumulation.",
        "C": "Immediate deletion can destroy evidence needed for investigation and support.",
        "D": "Retention policy does not encrypt stored records or replace access control."
      }
    },
    "q11": {
      "options": {
        "A": "Password rules govern credentials rather than excessive operational notification volume.",
        "B": "A logging format does not define responders' overload from noisy alerts.",
        "C": "Too many low-value notifications can reduce effective attention and response.",
        "D": "Index performance is separate from the human impact of repetitive alerts."
      }
    },
    "q12": {
      "options": {
        "A": "Logs support attribution but do not universally prove who caused an incident.",
        "B": "Evidence records must themselves be preserved with suitable integrity protections.",
        "C": "Deleting records after alerts undermines reconstruction of activity and scope.",
        "D": "Records help establish timelines, affected objects, and observed operational decisions."
      }
    },
    "q13": {
      "options": {
        "A": "Give actionable correction guidance without exposing private implementation or data details.",
        "B": "Database schema names are usually unnecessary for a user correcting input.",
        "C": "Raw stack traces can expose internal code and infrastructure information.",
        "D": "Adding credentials to errors creates exposure rather than safe troubleshooting."
      }
    },
    "q14": {
      "options": {
        "A": "Bodies can contain highly confidential values despite appearing as ordinary request data.",
        "B": "Full payload capture may disclose credentials, personal records, and protected workflow details.",
        "C": "Logging payloads cannot replace tests verifying security and failure behavior.",
        "D": "More diagnostic data can increase exposure instead of automatically reducing risk."
      }
    },
    "q15": {
      "options": {
        "A": "Reusable secrets should not become copied operational troubleshooting material.",
        "B": "Removing all logs can undermine detection, support, and incident reconstruction.",
        "C": "Balance useful events with protected content, evidence integrity, access, and retention.",
        "D": "User-facing output should omit internal detail reserved for controlled diagnostics."
      }
    }
  }
};
