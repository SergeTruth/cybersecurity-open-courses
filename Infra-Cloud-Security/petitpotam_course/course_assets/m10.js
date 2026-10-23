window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-32f0a89b34",
  "questions": {
    "q01": {
      "options": {
        "A": "PetitPotam involves EFSRPC coercion that can combine with vulnerable NTLM relay destinations.",
        "B": "NTLM relay includes techniques beyond the EFSRPC coercion associated with PetitPotam.",
        "C": "Relaying authentication does not require directly extracting a plaintext domain password.",
        "D": "The chain involves coercion and relay rather than only standalone CA templates."
      }
    },
    "q02": {
      "options": {
        "A": "Certificate impersonation requires later certificate issuance and use beyond induced authentication alone.",
        "B": "Inducing a host to authenticate to an unintended destination is forced authentication.",
        "C": "Strong mapping concerns linking certificates to identities rather than inducing authentication.",
        "D": "Directory replication abuse is distinct from causing an outbound authentication attempt."
      }
    },
    "q03": {
      "options": {
        "A": "NTLM authentication does not depend on IIS logging a plaintext password.",
        "B": "NTLMv2 does not automatically convert the account password into a certificate.",
        "C": "A relay can forward authentication to a target accepting the relayed identity.",
        "D": "NTLM messages do not inherently carry Kerberos tickets for relay authentication."
      }
    },
    "q04": {
      "options": {
        "A": "EFSRPC manages encrypted files rather than issuing domain controller authentication certificates.",
        "B": "Disabling NTLM is an administrative control rather than EFSRPC's legitimate purpose.",
        "C": "Certificate template auditing is separate from managing remote encrypted files.",
        "D": "EFSRPC supports maintenance and management of remotely stored encrypted data."
      }
    },
    "q05": {
      "options": {
        "A": "An insecure enrollment service may accept relayed authentication and issue an identity certificate.",
        "B": "Certificate enrollment does not require cracking the relayed identity's plaintext password.",
        "C": "Accepting enrollment requests does not disable EFSRPC on other domain systems.",
        "D": "An insecure enrollment endpoint permits a relay path rather than preventing authentication."
      }
    },
    "q06": {
      "options": {
        "A": "Revocation publication alone does not prevent an endpoint accepting relayed authentication.",
        "B": "HTTPS with correctly enforced EPA protects enrollment endpoints against this relay path.",
        "C": "Longer certificate lifetimes do not secure enrollment against NTLM relay.",
        "D": "Disabling Kerberos while retaining NTLM does not establish the needed relay protection."
      }
    },
    "q07": {
      "options": {
        "A": "HTTPS encrypts HTTP headers in transit as part of the protected connection.",
        "B": "HTTPS can protect enrollment transport while legitimate certificate issuance continues.",
        "C": "Encrypted transport alone may not bind authentication to its intended channel.",
        "D": "HTTPS does not automatically convert Windows authentication into anonymous access."
      }
    },
    "q08": {
      "options": {
        "A": "Removing every template disrupts legitimate issuance without first identifying authentication dependencies.",
        "B": "Disabling controller interfaces can cause outages without addressing the actual relay condition.",
        "C": "Legacy NTLM dependencies need investigation before broad restrictions risk service failures.",
        "D": "Auditing usage and dependencies enables informed restrictions and removal of unnecessary fallback."
      }
    },
    "q09": {
      "options": {
        "A": "This EFSRPC connection alert is associated with PetitPotam style coercion activity.",
        "B": "An alert does not establish guaranteed domain compromise or successful certificate misuse.",
        "C": "Successful disabling of enrollment describes a configuration event rather than coercion detection.",
        "D": "Safe Kerberos renewal does not describe suspicious EFSRPC network connection activity."
      }
    },
    "q10": {
      "options": {
        "A": "The finding identifies an insecure enrollment endpoint requiring configuration review and remediation.",
        "B": "A posture weakness alone does not prove malicious certificate issuance occurred.",
        "C": "Exposed enrollment settings alone do not prove subsequent certificate based authentication.",
        "D": "Enrollment endpoint exposure does not establish whether EFSRPC is disabled elsewhere."
      }
    },
    "q11": {
      "options": {
        "A": "Certificate mapping does not replace protections preventing relay to enrollment services.",
        "B": "Strong mapping addresses certificate authentication while EPA protects the enrollment authentication channel.",
        "C": "Certificate identity mapping serves a different purpose from SMB message signing.",
        "D": "Strong mapping does not automatically disable every template capable of authentication."
      }
    },
    "q12": {
      "options": {
        "A": "Normal password changes and scheduled revocation publication lack the suspicious chain correlation.",
        "B": "A service restart without requests does not establish coerced enrollment activity.",
        "C": "Correlated coercion, outbound authentication, enrollment, and suspicious issuance strengthen the chain hypothesis.",
        "D": "Routine Group Policy retrieval alone does not show EFSRPC coercion or relay."
      }
    },
    "q13": {
      "options": {
        "A": "Revocation can invalidate certificates, although effectiveness depends on validation and propagation behavior.",
        "B": "Responders must investigate certificate use and fix exposure alongside addressing revocation limits.",
        "C": "Revoking a certificate does not automatically reset every machine account password.",
        "D": "Revocation does not automatically change web enrollment endpoint authentication or configuration."
      }
    },
    "q14": {
      "options": {
        "A": "Repeated production coercion can create unnecessary authentication exposure and operational risk.",
        "B": "Relaying production enrollment can issue powerful credentials and increase incident risk.",
        "C": "Inspection, telemetry, controlled labs, and authorized non destructive checks support safer validation.",
        "D": "Disabling monitoring removes visibility into test impact and suspicious activity."
      }
    },
    "q15": {
      "options": {
        "A": "A single coercion fix does not close every possible NTLM relay path.",
        "B": "Reactive revocation alone leaves coercion, relay, and enrollment weaknesses unresolved.",
        "C": "HTTPS alone leaves additional authentication binding and issuance controls needing review.",
        "D": "Resilient defense addresses coercion, authentication, relay targets, issuance, monitoring, and validation together."
      }
    }
  }
};
