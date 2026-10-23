window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8d6458aa46",
  "questions": {
    "q01": {
      "options": {
        "A": "Unrelated vulnerability scans do not cover the cloud incident response lifecycle.",
        "B": "Response complements architecture work and does not replace secure design.",
        "C": "Incident response covers detection, investigation, containment, recovery, and organizational learning.",
        "D": "Disabling every service would disrupt operations without establishing a response process."
      }
    },
    "q02": {
      "options": {
        "A": "Responsibility boundaries identify customer actions, provider controls, and escalation needs.",
        "B": "Customers still need visibility into activity within their responsibility boundaries.",
        "C": "Providers do not assume responsibility for every customer configuration or credential.",
        "D": "Shared responsibility clarifies response obligations rather than eliminating incident response."
      }
    },
    "q03": {
      "options": {
        "A": "Enabling logs only after discovery may leave earlier activity unrecorded.",
        "B": "Configuration records can provide valuable baselines and evidence during investigation.",
        "C": "Broadly shared administrator credentials weaken accountability and increase compromise exposure.",
        "D": "Prepared logging and runbooks give responders visibility and repeatable response actions."
      }
    },
    "q04": {
      "options": {
        "A": "An inventory identifies assets but does not itself block attacker activity.",
        "B": "Account, region, resource, and ownership information defines the possible incident scope.",
        "C": "Responders must investigate evidence even when asset records are complete.",
        "D": "Cloud services and identities also need inventory for effective triage."
      }
    },
    "q05": {
      "options": {
        "A": "A normally loading static website does not alone indicate control plane abuse.",
        "B": "Unexpected keys, privilege changes, API calls, and resources can signal compromise.",
        "C": "An expected maintenance notice alone does not demonstrate unauthorized cloud activity.",
        "D": "Reading public documentation is ordinary behavior without additional suspicious context."
      }
    },
    "q06": {
      "options": {
        "A": "Cloud identities can authorize sensitive operations across many cloud resources.",
        "B": "Containing credentials reduces access but investigation must still establish scope.",
        "C": "Cloud incidents can involve identities, data, workloads, and control plane APIs.",
        "D": "Compromised identities can change configuration and extend attacker access across services."
      }
    },
    "q07": {
      "options": {
        "A": "A leaked key may authorize API actions permitted by its attached policies.",
        "B": "Many access keys can be used from other devices unless controls restrict them.",
        "C": "Cloud API keys affect service access rather than only browser cookies.",
        "D": "Credential expiration depends on its type and configuration, not mere exposure."
      }
    },
    "q08": {
      "options": {
        "A": "Destroying evidence reduces the ability to explain incident impact and causes.",
        "B": "Logs and workload state can establish attacker actions and incident scope.",
        "C": "Major changes can overwrite evidence needed to reconstruct what happened.",
        "D": "Evidence handling should balance investigative needs with timely containment and recovery."
      }
    },
    "q09": {
      "options": {
        "A": "A snapshot preserves state but cannot immediately establish reliable attacker attribution.",
        "B": "Publishing a compromised workload could expose secrets and sensitive evidence.",
        "C": "Deleting logs would remove evidence that can support workload analysis.",
        "D": "Snapshots preserve workload state for analysis alongside containment and recovery work."
      }
    },
    "q10": {
      "options": {
        "A": "Overly broad storage permissions can expose objects beyond their intended audience.",
        "B": "Exposed storage may lack intended restrictions even when encryption is enabled.",
        "C": "Object storage exposure concerns data accessibility rather than password hashing settings.",
        "D": "Serverless compute limits do not define who can access stored objects."
      }
    },
    "q11": {
      "options": {
        "A": "Containment scope affects both business availability and the investigation's evidence.",
        "B": "Communication remains necessary to coordinate containment and business impact decisions.",
        "C": "Excessive containment can disrupt unrelated systems or destroy useful evidence.",
        "D": "Shutting down everything can cause avoidable outages without addressing specific threats."
      }
    },
    "q12": {
      "options": {
        "A": "Restarting one server does not validate identities, configuration, or continued compromise.",
        "B": "Recovery restores trusted operation and verifies controls while monitoring for recurrence.",
        "C": "Closing a ticket cannot establish that affected services are trustworthy again.",
        "D": "Identity changes may preserve attacker access and must be investigated during recovery."
      }
    },
    "q13": {
      "options": {
        "A": "Communication coordinates response but does not technically contain the incident itself.",
        "B": "Response plans coordinate technical work with business, legal, privacy, and provider stakeholders.",
        "C": "Business owners and other stakeholders may need timely, relevant incident information.",
        "D": "Waiting until evidence is deleted prevents timely coordination and informed decisions."
      }
    },
    "q14": {
      "options": {
        "A": "Reviews should improve documentation and procedures using evidence from the incident.",
        "B": "Unsupported blame obscures systemic issues and does not improve response capability.",
        "C": "After action reviews turn incident evidence into detection, control, and runbook improvements.",
        "D": "Lessons learned should incorporate root cause analysis rather than replace it."
      }
    },
    "q15": {
      "options": {
        "A": "Effective response joins preparation, evidence, scoped containment, recovery, communication, and improvement.",
        "B": "Server shutdown alone cannot establish scope, address identities, or restore trust.",
        "C": "Useful response requires available evidence and should begin before logs disappear.",
        "D": "Compromised identities are a common route to unauthorized cloud operations."
      }
    }
  }
};
