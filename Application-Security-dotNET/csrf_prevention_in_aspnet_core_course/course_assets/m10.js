window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-01fbc78e7a",
  "questions": {
    "q1": {
      "options": {
        "A": "CSRF concerns browser request behavior rather than database backup configuration.",
        "B": "A browser can submit an unwanted state-changing request while attaching existing authenticated credentials.",
        "C": "Authorization checks permissions and does not describe the forged browser-request threat itself.",
        "D": "Read-only retrieval without side effects is not the usual state-changing CSRF scenario."
      }
    },
    "q2": {
      "options": {
        "A": "Authentication applies to protected application operations rather than only static files.",
        "B": "Authentication and antiforgery validation are separate controls requiring appropriate integration.",
        "C": "Identifying the browser user does not establish that this particular request was deliberately initiated.",
        "D": "Cookie authentication commonly relies on cookies rather than automatically disabling them."
      }
    },
    "q3": {
      "options": {
        "A": "A user may have permission while an attacker induces an unwanted authenticated request.",
        "B": "Cookie attributes and authorization address different parts of browser request protection.",
        "C": "Authorization applies to protected actions and resources, not merely stylesheet delivery.",
        "D": "Authorized forms can be submitted legitimately; CSRF protection targets forged submissions."
      }
    },
    "q4": {
      "options": {
        "A": "A genuinely read-only documentation request is not the usual state-changing protection target.",
        "B": "Public pages without state changes generally lack the credentialed mutation at issue here.",
        "C": "Protect browser-credentialed mutations such as approvals, updates, deletion, and configuration changes.",
        "D": "A public static image retrieval normally does not perform an authenticated state change."
      }
    },
    "q5": {
      "options": {
        "A": "Database migration state is not what antiforgery token validation verifies.",
        "B": "The protected request must carry the expected valid antiforgery token for its context.",
        "C": "Antiforgery validation is independent of granting broad browser cross-origin access.",
        "D": "Antiforgery tokens do not determine whether the authenticated user has administrator permissions."
      }
    },
    "q6": {
      "options": {
        "A": "Protected tokens do not replace application authorization over the requested operation.",
        "B": "Data Protection supplies cryptographic protection rather than static-file compression.",
        "C": "Compatible Data Protection keys and configuration are needed for reliable antiforgery token validation.",
        "D": "Data Protection does not determine the visibility of HTML interface elements."
      }
    },
    "q7": {
      "options": {
        "A": "SameSite constrains cookie sending and does not turn CORS into authentication.",
        "B": "A cookie attribute does not prove the user's actual intent for a business operation.",
        "C": "SameSite is an additional browser control rather than a universal replacement for antiforgery tokens.",
        "D": "Cookie restrictions reduce some cross-site scenarios while other request defenses remain necessary."
      }
    },
    "q8": {
      "options": {
        "A": "CORS does not rotate the key material used for protected antiforgery payloads.",
        "B": "CORS origin processing does not perform the server's antiforgery token validation.",
        "C": "Resource editing permissions require separate authorization rather than a CORS decision.",
        "D": "Restricting cross-origin reads does not establish legitimate intent for a state-changing request."
      }
    },
    "q9": {
      "options": {
        "A": "Assess CSRF based on how the browser attaches credentials, especially cookie-authenticated requests.",
        "B": "Bearer tokens still need protection against disclosure and other browser security threats.",
        "C": "SPAs commonly issue updates and other state-changing API requests.",
        "D": "Cookie and explicitly supplied bearer credentials have different browser request behavior."
      }
    },
    "q10": {
      "options": {
        "A": "Client-side checks can be bypassed and do not enforce protected server requests.",
        "B": "Coordinate endpoint protection, token validation, cookie policy, key persistence, and identity decisions.",
        "C": "A login page and broad CORS policy do not validate legitimate state-changing requests.",
        "D": "State-changing GET routes undermine safe request semantics and increase forgery exposure."
      }
    }
  }
};
