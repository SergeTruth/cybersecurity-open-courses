window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-e2665de57c",
  "questions": {
    "q01": {
      "options": {
        "A": "Identity services support authentication while application validation, authorization, and safe handling remain necessary.",
        "B": "Applications must still enforce their own resource and business authorization rules.",
        "C": "APIs need to validate received tokens even when an identity provider issued them.",
        "D": "Application logging still needs explicit configuration, policy, and secret-safe event design."
      }
    },
    "q02": {
      "options": {
        "A": "Registrations and service principals define concrete identity integration and permission relationships.",
        "B": "Their configuration controls credentials, callbacks, permissions, and API access beyond display names.",
        "C": "Exposed permissions and granted consent still need deliberate scope and governance review.",
        "D": "Production trust and access depend on these identities and their configuration."
      }
    },
    "q03": {
      "options": {
        "A": "Choose a flow suited to the application's type, credential capabilities, and trust boundary.",
        "B": "Interactive clients and app-only services have different security and credential requirements.",
        "C": "Flow selection changes token acquisition and trust behavior rather than merely button labels.",
        "D": "Authentication flows affect identity and token handling rather than determining database schema."
      }
    },
    "q04": {
      "options": {
        "A": "The library integrates identity-platform authentication and token handling into ASP.NET Core applications.",
        "B": "Correct integration retains required issuer, audience, and other token validation checks.",
        "C": "Client secrets belong in approved secret management rather than committed source files.",
        "D": "Identity integration does not replace application-specific decisions about authorized business actions."
      }
    },
    "q05": {
      "options": {
        "A": "Delegated access includes user context, while application permissions support an app acting as itself.",
        "B": "Delegated permissions concern acting for a user rather than only certificate-based credentials.",
        "C": "App-only permissions are designed for access without an interactive signed-in user's session.",
        "D": "The distinction changes whose authority is represented and how access should be reviewed."
      }
    },
    "q06": {
      "options": {
        "A": "Consent can grant significant access and therefore needs review of scope and affected resources.",
        "B": "Consent grants permissions and is not merely a change to application branding.",
        "C": "Downstream API access can require user or administrator consent according to policy.",
        "D": "Consent should grant necessary access and does not remove least-privilege obligations."
      }
    },
    "q07": {
      "options": {
        "A": "Validate token trust and intended use before applying action and resource authorization rules.",
        "B": "Authorization should rely on authenticated, validated identity evidence rather than untrusted token claims.",
        "C": "A trustworthy token can still identify a caller lacking the requested permission.",
        "D": "Server APIs need token validation independently of whether any client-side page is involved."
      }
    },
    "q08": {
      "options": {
        "A": "Managed identities let supported Azure workloads obtain tokens without distributing manually maintained credentials.",
        "B": "The workload identity still needs explicitly assigned permissions appropriate to its role.",
        "C": "A managed identity does not automatically receive tenant-wide administrative authority.",
        "D": "Managed identities primarily support deployed workloads rather than only local development."
      }
    },
    "q09": {
      "options": {
        "A": "Access policies can introduce authentication requirements or claims challenges the application must handle.",
        "B": "Conditional Access affects authentication requirements rather than simply styling sign-in pages.",
        "C": "Policies can affect user access and interactive authentication behavior for applications.",
        "D": "Access-policy enforcement does not replace validation of a received token's issuer."
      }
    },
    "q10": {
      "options": {
        "A": "Review identity configuration, token trust, scoped permissions, credentials, logging, and operational behavior together.",
        "B": "Broad shared configuration can grant excessive authority and obscure application-specific trust boundaries.",
        "C": "Unreviewed consent and long-lived unmanaged secrets increase identity and credential exposure.",
        "D": "Client-only checks and ignored downstream permissions leave server-side authorization gaps."
      }
    }
  }
};
