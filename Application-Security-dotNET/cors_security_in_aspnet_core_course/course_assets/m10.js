window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5d3675eb4e",
  "questions": {
    "q1": {
      "options": {
        "A": "Browser origin restrictions do not replace server-side resource and operation authorization.",
        "B": "The same-origin policy limits one origin's script access to another origin's responses.",
        "C": "Non-browser clients are not generally constrained by browser same-origin enforcement.",
        "D": "Origin policy does not establish the identity of the person using the browser."
      }
    },
    "q2": {
      "options": {
        "A": "An allowed origin does not authenticate the user or service making a request.",
        "B": "CORS is browser policy and does not block every direct non-browser connection.",
        "C": "CORS lets servers grant selected browser origins access to cross-origin responses.",
        "D": "Frontend origin approval does not authorize every action exposed by the API."
      }
    },
    "q3": {
      "options": {
        "A": "CORS governs browser origin access without verifying a caller's credentials or identity.",
        "B": "CORS does not create user accounts for scripts from allowed origins.",
        "C": "Password storage is unrelated to the browser's CORS policy evaluation.",
        "D": "Cookies and token authentication still need their own secure configuration and validation."
      }
    },
    "q4": {
      "options": {
        "A": "Routes and controllers identify application paths rather than defining a browser origin.",
        "B": "Identity attributes such as role and tenant do not define a web origin.",
        "C": "Scheme, host, and port together determine the origin used in browser comparisons.",
        "D": "Request methods, headers, and bodies are properties of requests rather than origin identity."
      }
    },
    "q5": {
      "options": {
        "A": "Preflight checks cross-origin policy rather than user access to individual resources.",
        "B": "The browser checks permission for the proposed method and relevant request headers.",
        "C": "A successful preflight does not verify the correctness of frontend code.",
        "D": "Database encryption is independent of the browser's cross-origin preflight exchange."
      }
    },
    "q6": {
      "options": {
        "A": "CORS middleware executes according to the configured pipeline rather than always running last.",
        "B": "Ordering and explicit policy selection address different configuration requirements.",
        "C": "The pipeline must apply the intended origin policy before relevant endpoint processing completes.",
        "D": "Order affects CORS handling for APIs and other responses, not merely stylesheet delivery."
      }
    },
    "q7": {
      "options": {
        "A": "Allowing credentials requires an explicit trust decision about particular permitted origins.",
        "B": "Credentialed CORS remains browser policy and does not become a network firewall.",
        "C": "Browser-attached credentials still require applicable CSRF defenses for state-changing requests.",
        "D": "Explicit credential allowance can expose authenticated browser interactions across an origin boundary."
      }
    },
    "q8": {
      "options": {
        "A": "The main concern is excessive access rather than an inherent speed penalty.",
        "B": "Development can use narrow explicit origins instead of unrestricted production policy.",
        "C": "Broad permissions do not automatically enforce least privilege for browser access.",
        "D": "Overly broad policies can expose unintended responses, methods, headers, or authenticated behavior."
      }
    },
    "q9": {
      "options": {
        "A": "Review every policy dimension and the actual pipeline and proxy behavior together.",
        "B": "Framework choice alone does not establish a suitable origin-access policy.",
        "C": "A browser error does not reveal the full policy scope or authentication behavior.",
        "D": "Presentation themes have no bearing on the appropriate CORS trust boundary."
      }
    },
    "q10": {
      "options": {
        "A": "CORS cannot serve as the sole authentication or authorization control for an API.",
        "B": "Use explicit scoped policies while separately enforcing caller identity, authorization, and credential safety.",
        "C": "One broad global policy can expose endpoints and environments beyond the intended frontend.",
        "D": "Production origin lists should include required trusted origins rather than every development convenience."
      }
    }
  }
};
