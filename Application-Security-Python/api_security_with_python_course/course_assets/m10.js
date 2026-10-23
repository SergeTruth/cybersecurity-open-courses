window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a0e4cc147a",
  "questions": {
    "q01": {
      "options": {
        "A": "Endpoint naming alone does not protect exposed data or access decisions.",
        "B": "API security protects identities, data, business actions, integrations, and service exchanges.",
        "C": "Backend code still implements the application behavior and necessary security controls.",
        "D": "Documentation supports operation and review rather than being inherently a security weakness."
      }
    },
    "q02": {
      "options": {
        "A": "Boundaries identify changes in trust, identity, data handling, control, and responsibility.",
        "B": "Each boundary can still require authenticating the caller or workload.",
        "C": "Mapping boundaries does not guarantee that implementation defects are absent.",
        "D": "Service and backend exchanges have trust boundaries as well as browser interactions."
      }
    },
    "q03": {
      "options": {
        "A": "Internal endpoints can expose sensitive records and consequential business operations.",
        "B": "Internal identities can be compromised or granted excessive permissions.",
        "C": "Misconfiguration, compromise, and unexpected call paths can undermine assumed internal trust.",
        "D": "Internal APIs can perform sensitive actions requiring authorization and validation."
      }
    },
    "q04": {
      "options": {
        "A": "JSON syntax alone does not establish safe sizes, values, or business meaning.",
        "B": "Presence alone does not validate field type, content, scope, or size.",
        "C": "Client type does not establish whether the request data is acceptable.",
        "D": "Validate structural properties, limits, content, and the intended business action."
      }
    },
    "q05": {
      "options": {
        "A": "A valid type can still carry unauthorized, out of range, or invalid business data.",
        "B": "Typed fields can still support workflow misuse and unauthorized object access.",
        "C": "Authentication establishes identity independently of whether submitted data has correct types.",
        "D": "Monitoring remains useful for detecting valid looking but abusive requests."
      }
    },
    "q06": {
      "options": {
        "A": "Password verification belongs to authentication rather than deciding access permissions.",
        "B": "Authentication establishes identity; authorization determines the permitted resources and actions.",
        "C": "Authentication applies to application users and workloads beyond database connections.",
        "D": "Identity verification and access permission decisions have different responsibilities."
      }
    },
    "q07": {
      "options": {
        "A": "Presence does not establish who issued a token or whether it remains valid.",
        "B": "Length does not validate a token's signature, audience, or expiry.",
        "C": "Validate the signature and relevant issuer, audience, expiry, and usage context.",
        "D": "Accepting a header does not establish that its token is trustworthy."
      }
    },
    "q08": {
      "options": {
        "A": "Tokens commonly carry identity or access information used by APIs.",
        "B": "A validated identity still needs authorization for the requested resource and action.",
        "C": "Tokens may omit permissions or contain claims requiring policy evaluation.",
        "D": "Validate the token and apply resource, permission, and context checks for the request."
      }
    },
    "q09": {
      "options": {
        "A": "Object authorization checks permission for the particular record or resource requested.",
        "B": "Naming conventions do not enforce who may access a specific object.",
        "C": "Memory encryption does not decide whether this caller owns or can access the record.",
        "D": "Hidden buttons can be bypassed through direct requests to the API."
      }
    },
    "q10": {
      "options": {
        "A": "Tenant isolation protects access boundaries beyond naming entries on billing reports.",
        "B": "Tenant checks restrict one organization's access to another organization's data and operations.",
        "C": "Callers still need authenticated identities before tenant access rules can be evaluated.",
        "D": "Tenant isolation limits disclosure rather than makes all stored records public."
      }
    },
    "q11": {
      "options": {
        "A": "Returning all fields can expose information beyond the caller's legitimate permission or need.",
        "B": "Compression changes payload size rather than decides which fields may be disclosed.",
        "C": "Response minimization returns only necessary data that the caller is authorized to receive.",
        "D": "Error handling remains necessary alongside limiting data in successful responses."
      }
    },
    "q12": {
      "options": {
        "A": "Database migration changes schemas rather than governs browser cross origin access.",
        "B": "Password hashing protects credentials rather than sets browser cross origin permissions.",
        "C": "Source formatting does not establish which origins browsers may read responses from.",
        "D": "CORS specifies browser enforced permissions for cross origin requests and response access."
      }
    },
    "q13": {
      "options": {
        "A": "Parameterized queries keep untrusted values separate from SQL statement structure.",
        "B": "Hiding error output does not prevent malicious input changing an unsafe query.",
        "C": "Client side checks can be bypassed and do not safely construct server SQL.",
        "D": "Table name length does not stop values becoming executable SQL syntax."
      }
    },
    "q14": {
      "options": {
        "A": "An external request needs validation rather than unconditional trust in its origin.",
        "B": "Webhooks can trigger actions and require source, integrity, freshness, and purpose validation.",
        "C": "Webhook authentication and verification are needed rather than replaced by the integration.",
        "D": "Webhooks commonly carry payloads that can affect application decisions and state."
      }
    },
    "q15": {
      "options": {
        "A": "Rate limits constrain volume but do not decide resource access permissions.",
        "B": "Public disclosure of credentials increases compromise risk rather than controls request volume.",
        "C": "Request limits can reduce guessing, automated abuse, and resource exhaustion.",
        "D": "Monitoring helps tune limits and identify abuse patterns or unintended blocking."
      }
    },
    "q16": {
      "options": {
        "A": "Hiding endpoint documentation does not enforce authentication or authorization.",
        "B": "Gateways provide useful controls but cannot replace application specific permission checks.",
        "C": "Internal services still need protection against compromise and unexpected callers.",
        "D": "Secure APIs combine validation, identity, permissions, safe data handling, testing, and monitoring."
      }
    }
  }
};
