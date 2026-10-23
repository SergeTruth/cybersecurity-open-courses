window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-2617998efd",
  "questions": {
    "q01": {
      "options": {
        "A": "Determining which record is accessible is authorization rather than identity verification.",
        "B": "Authentication verifies the identity of the user or workload requesting access.",
        "C": "Encryption protects data but does not establish the caller's identity.",
        "D": "Response presentation does not verify who or what made the request."
      }
    },
    "q02": {
      "options": {
        "A": "Authentication establishes identity while authorization determines permitted actions and resources.",
        "B": "Authenticated users can still lack permission for particular records or operations.",
        "C": "Authorization decisions apply throughout protected workflows beyond password recovery.",
        "D": "Establishing identity and granting specific permissions are distinct security decisions."
      }
    },
    "q03": {
      "options": {
        "A": "Centralized checks still require testing of protected routes and exceptional paths.",
        "B": "Shared authentication logic can still contain defects requiring review and validation.",
        "C": "Centralization reduces inconsistent verification and simplifies maintenance and review.",
        "D": "A common identity check does not remove authorization requirements from individual operations."
      }
    },
    "q04": {
      "options": {
        "A": "Convenient reset handling does not justify storing recoverable plaintext passwords.",
        "B": "User experience does not eliminate the disclosure consequences of exposed plaintext credentials.",
        "C": "MFA remains a separate protection rather than something plaintext storage makes unnecessary.",
        "D": "Database disclosure can directly reveal passwords when they are stored in plaintext."
      }
    },
    "q05": {
      "options": {
        "A": "Salted password hashing stores verifiers rather than directly recoverable user passwords.",
        "B": "Passwords should not be copied into logs merely because verifiers are hashed.",
        "C": "Recovery still needs secure identity verification and limited reset mechanisms.",
        "D": "Password hashing is intended as one way verification rather than reversible storage."
      }
    },
    "q06": {
      "options": {
        "A": "Rate limits reduce guessing opportunities without guaranteeing no compromise is possible.",
        "B": "Throttling reduces automated guessing and complements strong credentials and monitoring.",
        "C": "Password hashing remains necessary to protect stored verifiers after disclosure.",
        "D": "Monitoring still identifies abuse, lockout problems, and suspicious authentication patterns."
      }
    },
    "q07": {
      "options": {
        "A": "Sessions often carry authenticated identity after the original credential check.",
        "B": "Sessions commonly remain valid for a configured lifetime rather than expiring instantly.",
        "C": "An active session can continue representing a user after initial authentication.",
        "D": "Stolen session cookies can be replayed when sufficient protections are absent."
      }
    },
    "q08": {
      "options": {
        "A": "Some attributes deliberately restrict script access rather than expose cookies to all scripts.",
        "B": "Authentication records remain useful even when cookie handling is constrained.",
        "C": "Cookie attributes do not increase the length or strength of user passwords.",
        "D": "Cookie flags constrain browser transmission and access in their respective contexts."
      }
    },
    "q09": {
      "options": {
        "A": "Bearer access generally depends on presenting a valid token within its scope.",
        "B": "A bearer token is an access credential rather than a password hashing algorithm.",
        "C": "Template engines render output rather than define possession based access credentials.",
        "D": "Migration scripts change database structure rather than represent bearer authentication."
      }
    },
    "q10": {
      "options": {
        "A": "A presented token can be forged, expired, misissued, or intended for another audience.",
        "B": "Validate token integrity and applicable issuer, audience, expiration, and purpose.",
        "C": "A valid token still needs application authorization for the requested action.",
        "D": "Untrusted issuers or contexts should not be accepted without the required validation."
      }
    },
    "q11": {
      "options": {
        "A": "A logging format does not establish multiple independent types of authentication evidence.",
        "B": "Backups preserve data rather than verify user identity with additional factors.",
        "C": "MFA combines evidence from more than one authentication factor category.",
        "D": "A package manager installs software rather than verifies users with multiple factors."
      }
    },
    "q12": {
      "options": {
        "A": "Attackers can target reset channels and recovery procedures to take over accounts.",
        "B": "Recovery controls affect security as well as convenience for legitimate users.",
        "C": "Account recovery activity still needs appropriate monitoring and audit context.",
        "D": "Weak recovery can bypass the protection offered by otherwise strong sign in controls."
      }
    },
    "q13": {
      "options": {
        "A": "Step up requires stronger or additional verification for sensitive actions or risky contexts.",
        "B": "Removing MFA from privileged users weakens rather than strengthens verification.",
        "C": "Reused passwords create shared exposure rather than extra identity assurance.",
        "D": "Accepting expired sessions does not provide additional verification of the requester."
      }
    },
    "q14": {
      "options": {
        "A": "OpenID Connect concerns identity claims rather than compression of log archives.",
        "B": "OpenID Connect adds an identity layer to OAuth based authorization flows.",
        "C": "Identity claims do not replace every application specific access permission decision.",
        "D": "Source encryption is unrelated to a protocol for sign in identity information."
      }
    },
    "q15": {
      "options": {
        "A": "Service identities can have powerful unattended permissions and sensitive credentials.",
        "B": "Services may authenticate through keys, tokens, certificates, or managed identity mechanisms.",
        "C": "Unattended accounts can retain access to jobs, APIs, data, and infrastructure.",
        "D": "Human users still need their own identities and accountable access boundaries."
      }
    },
    "q16": {
      "options": {
        "A": "A login form is one interface within a broader authentication lifecycle.",
        "B": "Verified identity still requires authorization for particular actions and resources.",
        "C": "Client only checks can be bypassed through direct requests to the backend.",
        "D": "Strong authentication joins credential security, sessions, tokens, MFA, recovery, tests, and monitoring."
      }
    }
  }
};
