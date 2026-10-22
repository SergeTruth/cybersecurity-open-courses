window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a36480abb3",
  "questions": {
    "q1": {
      "options": {
        "A": "Runtime configuration can materially change production trust, access, and diagnostic behavior.",
        "B": "Settings can select identity, storage, network exposure, logging, and other security-sensitive behavior.",
        "C": "Configuration needs review because correct code can still run with unsafe settings.",
        "D": "Configuration governs far more than presentation themes and visual preferences."
      }
    },
    "q2": {
      "options": {
        "A": "Provider precedence changes effective values rather than merely configuration-file comments.",
        "B": "Override order does not provide encryption or access control for secret values.",
        "C": "An overriding provider can replace a reviewed value with a different security-sensitive setting.",
        "D": "Runtime providers can supply configuration after compilation and during application startup."
      }
    },
    "q3": {
      "options": {
        "A": "Assess the combined values actually consumed by the running application after overrides.",
        "B": "Environment variables and deployment overrides can make runtime settings differ from repository files.",
        "C": "A single file may omit later providers and environment-specific override values.",
        "D": "Deployed applications also use configuration providers and environment-specific values."
      }
    },
    "q4": {
      "options": {
        "A": "Public production errors should avoid unnecessary internal traces and sensitive details.",
        "B": "Development convenience does not establish that a setting is appropriate for production.",
        "C": "Mocks, debug modes, local secrets, and temporary bypasses can weaken a production deployment.",
        "D": "Production applications can consume environment-specific settings that materially change behavior."
      }
    },
    "q5": {
      "options": {
        "A": "Connection strings select data providers and access paths rather than interface colors.",
        "B": "Endpoints, database names, and identity settings can expose sensitive infrastructure even without passwords.",
        "C": "Connection settings directly influence which data resources and identities an application uses.",
        "D": "A harmless-looking configuration label does not make the actual value safe to disclose."
      }
    },
    "q6": {
      "options": {
        "A": "Ordinary appsettings files are not automatically encrypted in every storage and deployment context.",
        "B": "Logging a credential does not automatically rotate or revoke it.",
        "C": "Files and logs spread retained copies that can expose credentials beyond approved consumers.",
        "D": "Operational logs can be accessed by tools, operators, and support systems beyond the developer."
      }
    },
    "q7": {
      "options": {
        "A": "Typed options can bind environment-supplied values and do not forbid environment configuration.",
        "B": "An explicit options type does not make every setting appropriate for public disclosure.",
        "C": "Typed configuration still needs allowed values, relationships, and policy validation.",
        "D": "Grouped options make related settings and their validation contract explicit and reviewable."
      }
    },
    "q8": {
      "options": {
        "A": "A clear startup rejection exposes the problem safely rather than hiding every operational issue.",
        "B": "Silently accepting unsafe settings can select weak fallbacks or undefined runtime behavior.",
        "C": "Fail-fast validation protects security and correctness rather than merely formatting.",
        "D": "Reject incomplete required settings before requests depend on ambiguous or insecure fallback behavior."
      }
    },
    "q9": {
      "options": {
        "A": "Flags can bypass controls or change policy, so temporary settings need owners and retirement plans.",
        "B": "Ownership matters for security-impacting flag behavior beyond interface labels.",
        "C": "Deployment does not automatically remove every temporary or outdated feature flag.",
        "D": "Feature flags can select authentication, authorization, and other security-sensitive paths."
      }
    },
    "q10": {
      "options": {
        "A": "Hosting and middleware settings remain effective inside cloud and container deployments.",
        "B": "These settings determine important request, identity, browser, diagnostic, and exposure behavior.",
        "C": "Runtime hosting behavior is separate from source indentation or formatting preferences.",
        "D": "Changing runtime settings can directly alter how requests are processed and protected."
      }
    },
    "q11": {
      "options": {
        "A": "Public health responses should not disclose complete configuration and secret-bearing state.",
        "B": "Diagnostic endpoints themselves add an exposure surface that needs deliberate scope and audience.",
        "C": "Detailed reports can disclose internal paths, dependency identities, and deployment assumptions.",
        "D": "Diagnostics can include sensitive values and require controlled detail and access."
      }
    },
    "q12": {
      "options": {
        "A": "Drift detection complements rather than replaces credential rotation and lifecycle management.",
        "B": "Configuration drift can change trust and permissions rather than only test-data labels.",
        "C": "Overrides and infrastructure changes can alter settings after the first release.",
        "D": "Monitor effective settings because deployments, emergency edits, and external providers can change over time."
      }
    }
  }
};
