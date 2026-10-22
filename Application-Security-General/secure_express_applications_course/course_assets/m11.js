window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-92e8e46380",
  "questions": {
    "q01": {
      "options": {
        "A": "Middleware order determines actual processing rather than merely source formatting.",
        "B": "Controls protect only requests reaching them in their configured sequence and scope.",
        "C": "Routes can have different middleware coverage depending on registration and routing.",
        "D": "Shared middleware still needs the intended resource authorization policy."
      }
    },
    "q02": {
      "options": {
        "A": "Authentication proves identity while authorization evaluates its permitted operations and resources.",
        "B": "Verifying a caller does not automatically prove ownership of each requested object.",
        "C": "API and data mutations also need authorization beyond static files.",
        "D": "Express applications still distinguish identity from action and resource permission decisions."
      }
    },
    "q03": {
      "options": {
        "A": "A client can assert ownership values that require authoritative server verification.",
        "B": "Object identifiers should not be assumed confidential access credentials.",
        "C": "Hidden links do not prevent direct requests to resource endpoints.",
        "D": "Enforce access to the particular requested object using trusted ownership context."
      }
    },
    "q04": {
      "options": {
        "A": "Framework parsing exposes request values without making their contents trustworthy.",
        "B": "Parsed syntax does not establish semantic validity or caller permissions.",
        "C": "Validate all relevant client-controlled fields before using them in sensitive operations.",
        "D": "Headers and cookies require validation rather than automatically prove authority."
      }
    },
    "q05": {
      "options": {
        "A": "Internal persistence records can contain fields beyond the caller's approved response needs.",
        "B": "Raw objects can serialize and thereby accidentally disclose private properties.",
        "C": "Express does not automatically remove every inappropriate database field from responses.",
        "D": "Raw response objects do not categorically prevent operational log generation."
      }
    },
    "q06": {
      "options": {
        "A": "Visual style properties do not govern session cookie confidentiality or delivery.",
        "B": "Appropriate cookie flags and scope constrain how session credentials are sent and accessed.",
        "C": "Package metadata does not determine session cookie transport and browser access behavior.",
        "D": "Length alone cannot establish safe session handling, expiry, or scope."
      }
    },
    "q07": {
      "options": {
        "A": "Browser-origin rules do not validate passwords presented to the application.",
        "B": "Origin approval does not prove that a caller owns a record.",
        "C": "CORS controls browser sharing while server identity and permission policies enforce actual access.",
        "D": "Direct non-browser clients are not universally stopped by CORS enforcement."
      }
    },
    "q08": {
      "options": {
        "A": "Protected internal diagnostics remain useful when public errors are deliberately limited.",
        "B": "Callers rarely need every internal frame to correct their request.",
        "C": "Public trace detail does not substitute for controlled operational monitoring.",
        "D": "Detailed errors can expose sensitive dependencies, paths, queries, and credential material."
      }
    },
    "q09": {
      "options": {
        "A": "Review executable packages and credentials that determine runtime trust and resource authority.",
        "B": "Middleware and dependencies can directly alter production request-processing behavior.",
        "C": "Private commits can still spread through copies, builds, and repository history.",
        "D": "Vulnerability audits complement code, configuration, and operational safeguards rather than replace them."
      }
    },
    "q10": {
      "options": {
        "A": "Headers add browser defenses without replacing endpoint and data-access review.",
        "B": "Coordinate route coverage, identity, permissions, validated data, sessions, dependencies, and operations.",
        "C": "Broad origin sharing does not establish meaningful user or service authorization.",
        "D": "Client validation can be skipped, so the backend must enforce its own contract."
      }
    }
  }
};
