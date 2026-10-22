window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c08b8e725e",
  "questions": {
    "q01": {
      "options": {
        "A": "Permission decisions are authorization rather than proof of caller identity.",
        "B": "Field encryption protects storage rather than identifying the requesting party.",
        "C": "Billing records do not authenticate the party requesting application access.",
        "D": "Authentication checks identity evidence for the requesting person or service."
      }
    },
    "q02": {
      "options": {
        "A": "Identity verification and permission evaluation solve related but distinct problems.",
        "B": "Authorization applies throughout protected operations, not only password recovery.",
        "C": "Authenticated identity still needs resource and action permission checks.",
        "D": "Establish identity first, then decide its allowed actions and resources."
      }
    },
    "q03": {
      "options": {
        "A": "A job title describes a role rather than a possession factor.",
        "B": "A physical authenticator demonstrates possession of a protected authentication device.",
        "C": "A username identifies an account without proving device possession.",
        "D": "A password is knowledge rather than a physical possession factor."
      }
    },
    "q04": {
      "options": {
        "A": "One leaked credential can be replayed against other services using it.",
        "B": "Password reuse does not prevent users entering credentials into phishing sites.",
        "C": "Convenience does not remove the cross-service consequences of credential disclosure.",
        "D": "Reused passwords still benefit from separate additional authentication factors."
      }
    },
    "q05": {
      "options": {
        "A": "Password verifiers support safe storage without replacing authentication event logging.",
        "B": "Hashing aims to limit exposure rather than publish raw passwords.",
        "C": "Emailing passwords creates additional plaintext copies instead of protected verification.",
        "D": "Salted costly verifiers resist offline guessing after database disclosure."
      }
    },
    "q06": {
      "options": {
        "A": "MFA describes identity verification rather than a software licensing arrangement.",
        "B": "Backups protect recovery data rather than supply multiple identity factors.",
        "C": "MFA combines distinct authentication factors or proof types for access.",
        "D": "Query formats do not define the factors used for authentication."
      }
    },
    "q07": {
      "options": {
        "A": "Origin-aware authenticators reduce disclosure or approval of credentials to impostors.",
        "B": "Strong authenticators still need operational monitoring for suspicious access behavior.",
        "C": "Phishing resistance reduces specific threats without guaranteeing impossible compromise.",
        "D": "Verified identity must still be authorized for requested application actions."
      }
    },
    "q08": {
      "options": {
        "A": "Privileged actions generally need greater assurance rather than disabling MFA.",
        "B": "Higher-risk contexts can require another authentication check before proceeding.",
        "C": "Sensitive operations should not deliberately receive less identity assurance.",
        "D": "Sessions need bounded validity instead of permanent unconditional trust."
      }
    },
    "q09": {
      "options": {
        "A": "Session credentials continue the authenticated context after initial sign-in.",
        "B": "Stolen session credentials can often be replayed while still valid.",
        "C": "Protect sessions because they can continue acting for the authenticated user.",
        "D": "Session duration follows policy rather than universally ending immediately."
      }
    },
    "q10": {
      "options": {
        "A": "Bearer credentials grant scoped access based on possession and validity.",
        "B": "Password hashing stores verifiers and is not a bearer access mechanism.",
        "C": "A backup file does not inherently represent presented application authority.",
        "D": "Interface preferences do not normally grant protected resource access."
      }
    },
    "q11": {
      "options": {
        "A": "Short expiry reduces a window without eliminating disclosure or misuse.",
        "B": "Expiry bounds the period before renewal or fresh authentication is required.",
        "C": "A token's permitted use depends on whether it remains valid.",
        "D": "Longer lifetimes generally enlarge the opportunity to reuse exposed credentials."
      }
    },
    "q12": {
      "options": {
        "A": "Recovery endpoints and support workflows can be targeted by attackers.",
        "B": "An alternative weak recovery path can defeat otherwise strong login protection.",
        "C": "Recovery can transfer account authority and is more than usability.",
        "D": "Recovery must complement rather than bypass the account's assurance requirements."
      }
    },
    "q13": {
      "options": {
        "A": "SSO includes shared identity integration rather than only timeout settings.",
        "B": "A central identity provider supports access across multiple relying applications.",
        "C": "Database backup mechanisms do not establish shared authentication across services.",
        "D": "SSO avoids separate sign-ins rather than requiring password reuse everywhere."
      }
    },
    "q14": {
      "options": {
        "A": "OpenID Connect adds standardized identity information to OAuth-style authorization flows.",
        "B": "OIDC defines identity protocols rather than log-file presentation formats.",
        "C": "Disk encryption is unrelated to exchanging validated sign-in identity claims.",
        "D": "Application permissions still need enforcement after successful OIDC authentication."
      }
    },
    "q15": {
      "options": {
        "A": "Workload accounts serve automation rather than replace every human identity.",
        "B": "Noninteractive identities can retain powerful access that requires lifecycle governance.",
        "C": "Service accounts can authorize sensitive actions and are not inherently harmless.",
        "D": "Service identities still need an approved way to authenticate their workloads."
      }
    },
    "q16": {
      "options": {
        "A": "Strong identity verification does not eliminate resource-level permission decisions.",
        "B": "Coordinate authenticators, credentials, sessions, recovery, monitoring, and identity lifecycle controls.",
        "C": "Password-only login cannot provide the additional factors of MFA.",
        "D": "Users still need governed recovery when authenticators are lost or replaced."
      }
    }
  }
};
