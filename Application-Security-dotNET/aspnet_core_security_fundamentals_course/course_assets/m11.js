window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-da6ea0c115",
  "questions": {
    "q1": {
      "options": {
        "A": "Both authentication and authorization apply to APIs, pages, and other protected endpoints.",
        "B": "Authentication identifies a caller; authorization evaluates permitted actions and resources.",
        "C": "An authenticated caller can still be denied access to a particular operation.",
        "D": "These controls address caller identity and permissions rather than schema or logging configuration."
      }
    },
    "q2": {
      "options": {
        "A": "Pipeline order changes request processing and which security checks run before execution.",
        "B": "Publishing preserves the configured request pipeline rather than ignoring its ordering.",
        "C": "Controls must run with their required context before requests reach protected endpoints.",
        "D": "Endpoint-aware authorization needs appropriate routing context and cannot universally run before it exists."
      }
    },
    "q3": {
      "options": {
        "A": "Server enforcement is required because clients can bypass or alter interface restrictions.",
        "B": "A hidden control does not prevent a direct request to its server endpoint.",
        "C": "Production requests require authorization regardless of the application's build configuration.",
        "D": "Successful authentication does not grant every caller all available permissions."
      }
    },
    "q4": {
      "options": {
        "A": "Antiforgery mechanisms are not a general defense against all failed sign-in attempts.",
        "B": "Antiforgery addresses a specific browser request threat rather than every deployment misconfiguration.",
        "C": "Browsers may attach existing credentials to cross-site state-changing requests without the user's intent.",
        "D": "Antiforgery tokens do not patch vulnerable packages or replace dependency maintenance."
      }
    },
    "q5": {
      "options": {
        "A": "CORS specifies browser origin behavior rather than storing or verifying user passwords.",
        "B": "CORS governs browser cross-origin access without establishing the caller's authenticated identity.",
        "C": "CORS does not validate cryptographic Data Protection keys or their storage policy.",
        "D": "Server-side authorization remains necessary regardless of the allowed browser origins."
      }
    },
    "q6": {
      "options": {
        "A": "Raw rendering primarily changes browser interpretation and does not inherently stop server validation.",
        "B": "Secure cookie settings remain useful but cannot make untrusted raw markup safe.",
        "C": "Untrusted content rendered as executable markup or script can create cross-site scripting.",
        "D": "Raw rendering does not encrypt responses or protect their contents."
      }
    },
    "q7": {
      "options": {
        "A": "Applications can consume repository secrets, which is precisely why exposure is dangerous.",
        "B": "Source control records changes and does not automatically rotate exposed credentials.",
        "C": "Repository users, clones, caches, and artifacts can expose secrets beyond the compiler.",
        "D": "Source repositories distribute and retain content and should not serve as secret stores."
      }
    },
    "q8": {
      "options": {
        "A": "Data Protection key persistence affects protected state rather than page styling.",
        "B": "Unrelated keys can prevent instances from reading state that should work across them.",
        "C": "Protected cookies and tokens depend on cryptographic keys, not merely logging settings.",
        "D": "Compatible protected-state consumers need appropriate key persistence and sharing across intended instances."
      }
    },
    "q9": {
      "options": {
        "A": "Record bounded authentication, authorization, error, and administration events without exposing secrets.",
        "B": "Successful page views alone omit denied access and other important security signals.",
        "C": "Sensitive request dumps can disclose credentials and unnecessary personal data.",
        "D": "Passwords and access tokens must be excluded from operational logs."
      }
    },
    "q10": {
      "options": {
        "A": "Client validation and interface visibility do not enforce the server's security boundary.",
        "B": "Secure applications need coordinated identity, authorization, pipeline, data, diagnostics, and deployment controls.",
        "C": "A login page and database do not cover authorization or protected request handling.",
        "D": "Permissive origins and verbose errors can increase exposure instead of establishing a secure baseline."
      }
    }
  }
};
