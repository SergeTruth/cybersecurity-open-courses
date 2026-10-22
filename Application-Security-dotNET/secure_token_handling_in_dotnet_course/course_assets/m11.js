window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-580b5722f4",
  "questions": {
    "q1": {
      "options": {
        "A": "A disclosed bearer token can be used by parties other than its original intended holder.",
        "B": "Possession can be sufficient to exercise a token's granted access until its validity ends.",
        "C": "Bearer credentials commonly represent API access and other protected capabilities.",
        "D": "An access-bearing token is confidential material rather than merely a harmless configuration label."
      }
    },
    "q2": {
      "options": {
        "A": "These descriptions confuse token purposes and do not match their intended identity workflows.",
        "B": "An ID token is for the client authentication context rather than general API authorization.",
        "C": "Use access tokens at APIs, ID tokens for client sign-in context, and refresh tokens for renewal.",
        "D": "Different audiences and lifecycle roles mean these token types are not interchangeable."
      }
    },
    "q3": {
      "options": {
        "A": "Validate token trust, intended audience, permitted cryptography, time constraints, and relevant claims.",
        "B": "A token-shaped string can be fabricated and needs full trust validation.",
        "C": "Text length does not establish signature validity, audience, issuer, or expiry.",
        "D": "An attacker can include a username in an untrusted token without proving identity."
      }
    },
    "q4": {
      "options": {
        "A": "Protected token storage does not decide whether a requested action is authorized.",
        "B": "Business meaning of scopes comes from policy rather than the storage mechanism alone.",
        "C": "Storage and delivery choices determine which components, logs, and clients can expose token values.",
        "D": "A safely transported token still needs validation before its claims are trusted."
      }
    },
    "q5": {
      "options": {
        "A": "APIs commonly consume valid access tokens and still enforce action-specific permissions.",
        "B": "Validated identity evidence must be evaluated against scopes, local policy, tenants, and resource ownership.",
        "C": "Token validity does not imply administrative authority or unrestricted access.",
        "D": "Authorization applies to API operations and resources beyond password-reset workflows."
      }
    },
    "q6": {
      "options": {
        "A": "Refresh tokens govern continuing access rather than interface presentation styles.",
        "B": "They can preserve or extend session access after individual access tokens expire.",
        "C": "Longer-lived renewal capability needs governed replacement, revocation, binding, and anomaly handling.",
        "D": "Refresh tokens can grant continued access and must not be treated as public data."
      }
    },
    "q7": {
      "options": {
        "A": "Account-workflow tokens are not interchangeable with API bearer authorization headers.",
        "B": "Protected workflow tokens do not universally represent access to external APIs.",
        "C": "Their purpose, validation, and lifetime can depend on configured providers and key rings.",
        "D": "Use account and protected-payload tokens for their intended workflow rather than general API access."
      }
    },
    "q8": {
      "options": {
        "A": "Signing and protection keys are fundamental to validating token authenticity and protected state.",
        "B": "Keys need an appropriate lifecycle, including replacement and compromise-response planning.",
        "C": "Publicly exposed private keys can undermine the trust they are supposed to establish.",
        "D": "Key exposure or inconsistent key availability can break token trust or intended validation behavior."
      }
    },
    "q9": {
      "options": {
        "A": "Use nonsecret references and outcomes while excluding complete credential-bearing token and cookie values.",
        "B": "Client-visible errors must not contain reusable session cookie values.",
        "C": "Raw authorization headers commonly contain credentials that need redaction.",
        "D": "Refresh-token logging exposes a credential capable of obtaining continuing access."
      }
    },
    "q10": {
      "options": {
        "A": "Client storage choices alone do not establish token validation or least-privilege API access.",
        "B": "Coordinate purpose, trust validation, storage, transport, permissions, renewal, keys, and incident handling.",
        "C": "Readable claims and long lifetimes do not establish authenticity or safe access policy.",
        "D": "Development keys and detailed public diagnostics require review before production exposure."
      }
    }
  }
};
