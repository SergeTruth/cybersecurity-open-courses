window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-24ed81d4be",
  "questions": {
    "q01": {
      "options": {
        "A": "Login presentation does not maintain verified identity across later requests.",
        "B": "Sessions maintain authenticated state across requests after identity verification succeeds.",
        "C": "Every protected action still needs an appropriate authorization decision.",
        "D": "Database encryption is separate from maintaining authenticated application state."
      }
    },
    "q02": {
      "options": {
        "A": "Authentication verifies identity; sessions preserve its state for subsequent use.",
        "B": "Identity verification and ongoing session lifecycle are different responsibilities.",
        "C": "Sessions normally maintain state after login as well as during it.",
        "D": "Logout must invalidate appropriate authenticated state after identity verification."
      }
    },
    "q03": {
      "options": {
        "A": "Strong initial authentication does not guarantee safe session lifecycle behavior.",
        "B": "Session controls protect access as well as influence user experience.",
        "C": "Leaked or persistent sessions can bypass otherwise strong initial authentication.",
        "D": "Password hashing and session protection address different authentication security risks."
      }
    },
    "q04": {
      "options": {
        "A": "Protective attributes limit cookie exposure rather than improve script readability.",
        "B": "Secure transport remains necessary alongside appropriate cookie attribute settings.",
        "C": "Cookies and associated sessions still need appropriate expiration rules.",
        "D": "Cookie attributes control transmission, scope, and client script access."
      }
    },
    "q05": {
      "options": {
        "A": "HttpOnly blocks ordinary script access to protected cookie values.",
        "B": "HttpOnly restricts script visibility rather than making cookies public.",
        "C": "HttpOnly does not extend the lifetime of authenticated sessions.",
        "D": "Server authorization remains necessary regardless of client cookie restrictions."
      }
    },
    "q06": {
      "options": {
        "A": "SameSite does not hash or safely store application passwords.",
        "B": "SameSite restricts cookie sending in relevant cross-site request contexts.",
        "C": "SameSite is not a cryptographic token signature validation mechanism.",
        "D": "Logout must still invalidate appropriate session or token state."
      }
    },
    "q07": {
      "options": {
        "A": "Interface themes do not store authenticated backend session state.",
        "B": "Public browser settings are separate from protected session storage.",
        "C": "Backend stores map session identifiers to associated authenticated state.",
        "D": "Reset emails support recovery rather than store ongoing session state."
      }
    },
    "q08": {
      "options": {
        "A": "More stored data can increase exposure and management complexity.",
        "B": "Sessions should not indiscriminately duplicate every user database record.",
        "C": "Session stores can be exposed through compromise or misconfiguration.",
        "D": "Minimizing session data reduces sensitive exposure and lifecycle complexity."
      }
    },
    "q09": {
      "options": {
        "A": "Possession of a valid bearer token generally enables its scoped access.",
        "B": "Password hashing derives verifiers rather than bearer access credentials.",
        "C": "Database migration tools change schemas rather than represent session authority.",
        "D": "Browser rendering modes do not grant scoped API access capabilities."
      }
    },
    "q10": {
      "options": {
        "A": "Accept only tokens meeting the application's issuer and usage requirements.",
        "B": "Validate trust, audience, lifetime, and intended token use appropriately.",
        "C": "Valid token identity still requires authorization for requested resources.",
        "D": "Expired tokens should be rejected rather than treated as safe."
      }
    },
    "q11": {
      "options": {
        "A": "Backup schedules do not determine inactivity based session expiration.",
        "B": "Static cache rules concern response storage rather than session activity.",
        "C": "Idle expiration ends sessions after the configured inactivity period.",
        "D": "Code formatting does not determine authenticated session timeout behavior."
      }
    },
    "q12": {
      "options": {
        "A": "Changing interface labels does not terminate authenticated session state.",
        "B": "Revocation may still be needed beyond an individual logout operation.",
        "C": "Web applications need ways to end relevant authenticated sessions.",
        "D": "Logout must address the underlying session or token access state."
      }
    },
    "q13": {
      "options": {
        "A": "Revocation invalidates existing access when compromise or policy changes occur.",
        "B": "Revocation helps response but cannot guarantee accounts never become compromised.",
        "C": "Expiration remains useful alongside explicit access revocation mechanisms too.",
        "D": "Revocation affects authentication authority rather than webpage styling behavior."
      }
    },
    "q14": {
      "options": {
        "A": "Distributed applications can support sessions with appropriate storage or routing.",
        "B": "Backend servers need consistent recognition of authenticated session state.",
        "C": "Load balancing distributes requests rather than verifies user identity.",
        "D": "Routing requests does not automatically invalidate existing access tokens."
      }
    },
    "q15": {
      "options": {
        "A": "Page speed alone does not reveal suspicious authenticated session activity.",
        "B": "Visual errors omit many important token validation and revocation events.",
        "C": "Monitor anomalous activity and important session lifecycle security events.",
        "D": "Schema names alone do not show suspicious session lifecycle changes."
      }
    },
    "q16": {
      "options": {
        "A": "A working login interface does not establish safe session lifecycle controls.",
        "B": "Hiding usernames leaves underlying authenticated state potentially still usable.",
        "C": "Token possession still requires validation and resource authorization checks.",
        "D": "Protect session credentials throughout issuance, use, expiration, invalidation, and monitoring."
      }
    }
  }
};
