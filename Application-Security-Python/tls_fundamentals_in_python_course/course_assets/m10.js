window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a61c3e0b16",
  "questions": {
    "q01": {
      "options": {
        "A": "TLS protects transport rather than encrypting stored files or database rows.",
        "B": "TLS does not convert application content into safe media formats.",
        "C": "Application authorization remains separate from establishing a TLS connection.",
        "D": "TLS protects confidentiality and integrity of data moving between systems."
      }
    },
    "q02": {
      "options": {
        "A": "Using port 443 alone does not establish protected HTTPS transport.",
        "B": "Application signed plaintext responses are not equivalent to HTTPS.",
        "C": "HTTPS carries HTTP over appropriately authenticated and encrypted TLS transport.",
        "D": "Browser script source restrictions are separate from HTTPS transport."
      }
    },
    "q03": {
      "options": {
        "A": "Availability, input validation, and object permissions need separate application controls.",
        "B": "TLS provides transport confidentiality, integrity, and authenticated endpoint identity.",
        "C": "Stored keys and database privileges require separate protection controls.",
        "D": "Authenticated services can still return incorrect or malformed application data."
      }
    },
    "q04": {
      "options": {
        "A": "Server authentication does not validate response fields or current permissions.",
        "B": "Applications must still validate data and authorize actions after TLS succeeds.",
        "C": "Integrity does not prevent a peer intentionally sending invalid data.",
        "D": "Compromised authenticated services can still deliver dangerous application input."
      }
    },
    "q05": {
      "options": {
        "A": "Certificates contain public keys rather than recoverable private key material.",
        "B": "Certificates bind asserted identities to public keys within a trust model.",
        "C": "DNS address mapping is different from certificate identity binding.",
        "D": "Certificates do not automatically authorize every application resource operation."
      }
    },
    "q06": {
      "options": {
        "A": "Public certificates should not permit reconstruction of their associated private keys.",
        "B": "Private key disclosure can enable impersonation or unauthorized signatures.",
        "C": "Public certificates do not protect readable private key files.",
        "D": "Private keys grant identity related capabilities requiring restricted access."
      }
    },
    "q07": {
      "options": {
        "A": "Chains connect endpoint certificates through issuers to trusted certification authorities.",
        "B": "DNS resolution records do not form a certificate trust chain.",
        "C": "Protocol version negotiation is different from certificate issuer chaining.",
        "D": "Strong algorithms do not make unrelated self-signed certificates automatically trusted."
      }
    },
    "q08": {
      "options": {
        "A": "Routing classification does not establish certificate identity for a hostname.",
        "B": "Some valid chain certificate does not establish endpoint name matching.",
        "C": "Application token acceptance does not authenticate the responding server identity.",
        "D": "Hostname checks verify the certificate matches the intended service name."
      }
    },
    "q09": {
      "options": {
        "A": "Verification can be disabled while traffic remains encrypted to an impostor.",
        "B": "Unverified certificates may belong to unexpected or impersonating endpoints.",
        "C": "HTTPS syntax does not independently ensure trusted certificate selection.",
        "D": "Disabling checks removes the expected certificate identity authentication guarantee."
      }
    },
    "q10": {
      "options": {
        "A": "Unverified initial connections can expose credentials before later verified retries.",
        "B": "HTTPS alone does not provide deadlines or application response validation.",
        "C": "Fixed IP routing does not replace certificate trust and identity checks.",
        "D": "Combine certificate verification with deadlines, safe credentials, and response checks."
      }
    },
    "q11": {
      "options": {
        "A": "Termination decrypts TLS traffic before handing it to the next layer.",
        "B": "Certificate issuance does not define a connection's TLS termination point.",
        "C": "Private-network bypass is a separate configuration choice from termination.",
        "D": "Session ending does not guarantee erasure of all received application data."
      }
    },
    "q12": {
      "options": {
        "A": "Secure cookies do not themselves encrypt values or replace HTTPS.",
        "B": "Secure attributes generally restrict cookie sending to protected transport contexts.",
        "C": "Cookie attributes and HTTPS jointly reduce exposure of session credentials.",
        "D": "Cookie settings do not replace TLS endpoint identity validation."
      }
    },
    "q13": {
      "options": {
        "A": "Mutual TLS does not require both peers sharing one private key.",
        "B": "Mutual TLS establishes identities rather than automatic administrative permissions.",
        "C": "Mutual TLS validates certificates presented by both connection peers.",
        "D": "Two trust roots do not remove endpoint identity verification requirements."
      }
    },
    "q14": {
      "options": {
        "A": "Verified service identity still needs application permissions and resource checks.",
        "B": "Certificates do not automatically encode every future business permission.",
        "C": "Certificate verification does not prove client software is uncompromised.",
        "D": "Internal issuance does not grant unrestricted application action authority."
      }
    },
    "q15": {
      "options": {
        "A": "Operators must manage expiry and renewal as well as protocol versions.",
        "B": "Handshake failures can reveal expiry, misconfiguration, or endpoint identity problems.",
        "C": "Monitor expiry, failed renewals, handshakes, and configuration drift over time.",
        "D": "Raw certificate metric dimensions do not replace focused lifecycle monitoring."
      }
    },
    "q16": {
      "options": {
        "A": "Verified identities and protected keys need maintained configuration and lifecycle controls.",
        "B": "Encryption alone leaves impersonation, key exposure, and expiration risks unresolved.",
        "C": "Defaults still require correct integration, server setup, and lifecycle testing.",
        "D": "Certificates expire and trust assumptions require ongoing validation and maintenance."
      }
    }
  }
};
