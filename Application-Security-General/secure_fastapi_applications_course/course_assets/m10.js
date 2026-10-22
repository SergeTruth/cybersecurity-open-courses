window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-de9982f2c9",
  "questions": {
    "q01": {
      "options": {
        "A": "Secure API design spans input, identity, data, resources, dependencies, and deployment controls.",
        "B": "Application safeguards supplement rather than replace infrastructure and host protections.",
        "C": "Comment formatting does not establish secure API behavior or access policy.",
        "D": "Integrations can be supported through explicitly validated and authorized boundaries."
      }
    },
    "q02": {
      "options": {
        "A": "APIs commonly expose important business logic and protected state changes.",
        "B": "Direct machine-accessible functions need deliberate identity and permission enforcement.",
        "C": "API access still requires authorization for specific actions and resources.",
        "D": "APIs can read or modify confidential user and business information."
      }
    },
    "q03": {
      "options": {
        "A": "JSON syntax alone does not establish valid business meaning or appropriate limits.",
        "B": "A present parameter can still have an invalid value or type.",
        "C": "Validate shape and domain requirements before values affect sensitive API behavior.",
        "D": "Route naming cannot validate the request's actual submitted data."
      }
    },
    "q04": {
      "options": {
        "A": "Type checks help establish representation and remain a useful defensive layer.",
        "B": "A type does not authenticate the person or service providing it.",
        "C": "Typed values still need useful secret-safe operational failure records.",
        "D": "Representable values can violate ownership, policy, workflow, or resource-budget constraints."
      }
    },
    "q05": {
      "options": {
        "A": "Authenticate identity and separately evaluate allowed actions on protected resources.",
        "B": "Password verification establishes identity rather than resource-specific authorization.",
        "C": "Service and automation callers can also authenticate to protected APIs.",
        "D": "Identity verification and permission evaluation remain distinct application responsibilities."
      }
    },
    "q06": {
      "options": {
        "A": "Presence alone cannot establish a token's issuer, authenticity, or valid audience.",
        "B": "Validate cryptographic trust and token context before using its identity claims.",
        "C": "String length cannot prove signature validity or an appropriate token lifetime.",
        "D": "Client acceptance is not authoritative evidence for server token trust decisions."
      }
    },
    "q07": {
      "options": {
        "A": "APIs commonly use credentials and tokens to identify requesting callers.",
        "B": "Token claims are inputs to policy rather than replacements for all checks.",
        "C": "Validate the token and then authorize this caller for this resource context.",
        "D": "Local ownership and workflow rules may restrict even valid scoped tokens."
      }
    },
    "q08": {
      "options": {
        "A": "Dependency injection can organize checks rather than deliberately disable authentication.",
        "B": "Shared dependencies do not remove the need for request semantic validation.",
        "C": "Reusable checks still need appropriate operational diagnostics and outcomes.",
        "D": "Security dependencies can consistently apply common preconditions across protected operations."
      }
    },
    "q09": {
      "options": {
        "A": "Check access to the actual selected object and its ownership context.",
        "B": "Object naming style does not establish a caller's resource permission.",
        "C": "Encrypting records does not decide which identity may retrieve them.",
        "D": "Documentation controls can be bypassed by directly calling the API endpoint."
      }
    },
    "q10": {
      "options": {
        "A": "Tenant boundaries protect real data and actions beyond accounting labels.",
        "B": "Consistent tenant checks prevent one organization's callers reaching another's resources.",
        "C": "Resource partitioning still needs trusted caller identity and permissions.",
        "D": "Tenant separation narrows visibility rather than making every record public."
      }
    },
    "q11": {
      "options": {
        "A": "Database schema changes are independent of browser cross-origin response policy.",
        "B": "Password hashing does not define which browser origins receive API responses.",
        "C": "CORS controls browser origin access according to the configured response policy.",
        "D": "Source formatting does not determine browser cross-origin permissions."
      }
    },
    "q12": {
      "options": {
        "A": "Selecting response fields does not establish caller permission for the included records.",
        "B": "Narrow response models can omit private properties rather than publish everything.",
        "C": "Response filtering concerns data disclosure beyond page presentation colors.",
        "D": "Deliberate output contracts reduce accidental exposure of internal or confidential fields."
      }
    },
    "q13": {
      "options": {
        "A": "Bound values and safe ORM construction keep input separate from SQL syntax.",
        "B": "Hiding errors limits disclosure without preventing unsafe command construction.",
        "C": "Client-only validation can be skipped before submitting arbitrary server requests.",
        "D": "Identifier length does not prevent supplied data becoming query syntax."
      }
    },
    "q14": {
      "options": {
        "A": "An extension can misrepresent both file type and actual contents.",
        "B": "Uploads combine untrusted bytes and names with storage and processing authority.",
        "C": "Authenticated delivery does not establish that the uploaded content is harmless.",
        "D": "File workflows need permissions for upload, processing, publication, and download."
      }
    },
    "q15": {
      "options": {
        "A": "Deferred processing can still affect protected data and external resources.",
        "B": "Background execution does not eliminate permission checks for sensitive actions.",
        "C": "Continued work needs valid identity, authorization, lifetime, and resource constraints.",
        "D": "Tasks should receive only the secrets required for their own operation."
      }
    },
    "q16": {
      "options": {
        "A": "Type hints cannot establish all trust, access, and operational security requirements.",
        "B": "Controls should be designed and verified before the service is deployed.",
        "C": "One dependency cannot govern every API, data, and deployment trust boundary.",
        "D": "Combine explicit contracts, trusted identity, scoped permissions, safe data, and operational controls."
      }
    }
  }
};
