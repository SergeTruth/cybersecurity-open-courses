window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ae0c3efbd8",
  "questions": {
    "q01": {
      "options": {
        "A": "Password hashing protects verifiers rather than continuity of authenticated requests.",
        "B": "Sessions retain identity context but do not replace resource permissions.",
        "C": "Database encryption is a separate control from maintaining browser sign-in state.",
        "D": "Sessions carry the authenticated context across multiple application requests."
      }
    },
    "q02": {
      "options": {
        "A": "Unpredictable identifiers reduce the chance of guessing another valid session.",
        "B": "Predictability creates access risk without being an appropriate performance optimization.",
        "C": "Session identifiers represent earlier authentication and do not replace identity verification.",
        "D": "Debugging convenience cannot justify making reusable session credentials guessable."
      }
    },
    "q03": {
      "options": {
        "A": "HttpOnly does not determine the complexity required for account passwords.",
        "B": "The flag restricts ordinary direct script access to the cookie.",
        "C": "Cookie script restrictions do not eliminate the need for encrypted transport.",
        "D": "Database event logging is independent of a browser cookie's script visibility."
      }
    },
    "q04": {
      "options": {
        "A": "A cookie represents state and does not inherently replace identity verification.",
        "B": "Secure restricts cookie delivery to appropriate encrypted HTTPS transport.",
        "C": "Cookie expiry is configured separately from its secure transport attribute.",
        "D": "The flag does not itself encrypt the stored cookie value."
      }
    },
    "q05": {
      "options": {
        "A": "SameSite governs cookie sending behavior rather than encrypting its identifier.",
        "B": "API response validation requires a separate content and semantic contract.",
        "C": "Browser cookie rules do not prevent users reusing account passwords.",
        "D": "SameSite constrains when browsers attach cookies to cross-site requests."
      }
    },
    "q06": {
      "options": {
        "A": "Idle expiry ends authenticated state after an allowed inactivity interval.",
        "B": "Response caching policy is separate from session inactivity enforcement.",
        "C": "An idle timeout does not universally terminate every session after one request.",
        "D": "Expiration policy does not automatically encrypt the session storage representation."
      }
    },
    "q07": {
      "options": {
        "A": "Maximum session lifetime is separate from certificate and TLS configuration.",
        "B": "Absolute expiry caps total session duration even when activity continues.",
        "C": "A maximum lifetime can expire access without waiting for explicit logout.",
        "D": "Absolute duration is an application lifecycle policy beyond one cookie attribute."
      }
    },
    "q08": {
      "options": {
        "A": "Fixation tries to make a victim authenticate using an attacker-known session identifier.",
        "B": "Password expiry concerns credential lifetime rather than forced session-identifier selection.",
        "C": "Encrypting session state does not define attacker control over its identifier.",
        "D": "Idle logout is a session lifecycle control rather than fixation itself."
      }
    },
    "q09": {
      "options": {
        "A": "Logout ends authentication context without replacing authorization during active sessions.",
        "B": "Token invalidation across systems needs explicit coordinated logout and revocation behavior.",
        "C": "Logging logout outcomes can still support monitoring and investigation.",
        "D": "Server invalidation prevents continued use of a previously active session credential."
      }
    },
    "q10": {
      "options": {
        "A": "A password update does not universally disable every browser cookie automatically.",
        "B": "Credential changes do not replace required additional authentication factors.",
        "C": "Reassess existing session authority when credentials change or an account is recovered.",
        "D": "An older session can remain relevant to compromise even after password replacement."
      }
    },
    "q11": {
      "options": {
        "A": "JWT generation creates tokens and does not itself define stolen-session reuse.",
        "B": "Password hashing protects verifiers rather than unauthorized active session access.",
        "C": "Compression changes representation and does not describe session takeover.",
        "D": "Hijacking uses another user's valid session authority without that user's permission."
      }
    },
    "q12": {
      "options": {
        "A": "Encrypted transport does not decide which protected resources a user may access.",
        "B": "TLS limits network disclosure and modification of session credentials in transit.",
        "C": "Application logic and browser threats still exist despite correctly configured TLS.",
        "D": "Secure cookies help enforce appropriate delivery alongside encrypted connection settings."
      }
    },
    "q13": {
      "options": {
        "A": "New session implementations need especially careful tests and lifecycle review.",
        "B": "Mature frameworks can supply supported session management and credential protections.",
        "C": "Reuse maintained session mechanisms instead of unnecessarily rebuilding subtle lifecycle controls.",
        "D": "Custom implementation alone does not establish better security than reviewed facilities."
      }
    },
    "q14": {
      "options": {
        "A": "Lifecycle records can reveal suspicious access and support reconstruction of user activity.",
        "B": "Recording session events does not authenticate a new requesting caller.",
        "C": "Diagnostics must exclude raw passwords and reusable session credential values.",
        "D": "Monitoring helps detect abuse but cannot prevent every possible attack."
      }
    },
    "q15": {
      "options": {
        "A": "Session credentials can be stolen independently of the user's password strength.",
        "B": "Coordinate identifier generation, browser protections, lifetime, revocation, and trusted server enforcement.",
        "C": "A valid session does not grant universal resource or administrative permission.",
        "D": "Cookies need secure lifecycle and backend controls beyond their mere existence."
      }
    }
  }
};
