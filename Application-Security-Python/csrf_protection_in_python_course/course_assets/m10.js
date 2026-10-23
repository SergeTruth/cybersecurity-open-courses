window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-0453fc300d",
  "questions": {
    "q01": {
      "options": {
        "A": "Failure to log out concerns session lifetime rather than the core forged request mechanism.",
        "B": "CSRF abuses automatic authentication on state changes outside the user's legitimate application flow.",
        "C": "Long lived database session records do not define cross site request forgery.",
        "D": "Cookie free requests are not the automatic cookie authentication scenario described here."
      }
    },
    "q02": {
      "options": {
        "A": "Not every cookie is a CSRF token or provides intent validation.",
        "B": "Cookies can authenticate state changes as well as read operations.",
        "C": "Browsers may automatically include destination cookies without establishing the user's intended action.",
        "D": "Cookies do not inherently prevent forms from sending requests."
      }
    },
    "q03": {
      "options": {
        "A": "Requests modifying server state are the central target of CSRF defenses.",
        "B": "Requests with no ambient credentials do not describe the usual authenticated CSRF scenario.",
        "C": "Static image reads do not normally perform the sensitive state changes being protected.",
        "D": "Retrieving public documentation does not usually require an authenticated state mutation."
      }
    },
    "q04": {
      "options": {
        "A": "Successful status codes do not establish that the user intended the action.",
        "B": "Browser authentication commonly uses cookies that can be attached automatically.",
        "C": "Authenticated users can submit forms, including requests influenced by other sites.",
        "D": "Valid automatically supplied credentials do not demonstrate deliberate approval of this state change."
      }
    },
    "q05": {
      "options": {
        "A": "CSRF checks complement identity verification and resource authorization rather than replacing them.",
        "B": "An anti CSRF token helps bind a state change to an application controlled flow.",
        "C": "Raw token values remain sensitive and should not be logged unnecessarily.",
        "D": "GET should remain safe rather than acquire state changes because tokens exist."
      }
    },
    "q06": {
      "options": {
        "A": "CSRF middleware does not require making all cookies public to scripts.",
        "B": "Protection should validate expected flows rather than approve every foreign origin request.",
        "C": "Framework protections supply established generation, validation, and route coverage patterns.",
        "D": "Teams still need to identify which endpoints change state and require protection."
      }
    },
    "q07": {
      "options": {
        "A": "Python applications can route GET requests normally without using them for mutations.",
        "B": "Browsers can include cookies on GET requests according to applicable cookie rules.",
        "C": "GET is easily triggered through navigation or embedded resources and should avoid state changes.",
        "D": "CORS does not universally prevent browsers from issuing GET requests."
      }
    },
    "q08": {
      "options": {
        "A": "SameSite controls cookie sending rather than performs server token validation.",
        "B": "Cookie attributes do not encrypt every HTTP request body.",
        "C": "Authorization still determines whether the authenticated caller may perform the action.",
        "D": "SameSite restricts cookie transmission in particular cross site request contexts."
      }
    },
    "q09": {
      "options": {
        "A": "CORS governs browser cross origin response access, not independent proof of user intent.",
        "B": "CORS is a browser mechanism rather than a Python specific session option.",
        "C": "Browser cookie handling depends on several policies and is not universally disabled by CORS.",
        "D": "Cross origin browser controls do not apply only to database communication."
      }
    },
    "q10": {
      "options": {
        "A": "High level validation outcomes can help operators detect rejected requests.",
        "B": "Avoid exposing CSRF tokens, credentials, sensitive request bodies, and unnecessary personal data.",
        "C": "Safe route context and timestamps can support analysis without revealing token values.",
        "D": "Bounded failure categories aid troubleshooting without disclosing sensitive request contents."
      }
    },
    "q11": {
      "options": {
        "A": "Stylesheets do not establish whether backend state changes enforce user intent.",
        "B": "Logging every token increases exposure rather than demonstrates effective protection.",
        "C": "Review mutation endpoints, middleware coverage, token checks, cookies, origins, and authentication design.",
        "D": "Making all endpoints GET can introduce unintended state changes through simple navigation."
      }
    },
    "q12": {
      "options": {
        "A": "Applications can retain legitimate state changing forms with appropriate protective checks.",
        "B": "CORS does not replace authenticating callers or validating legitimate state changing flows.",
        "C": "Cookies can remain useful when combined with appropriate intent and session protections.",
        "D": "Protected flows should establish legitimate intent as well as authentication for state changes."
      }
    }
  }
};
