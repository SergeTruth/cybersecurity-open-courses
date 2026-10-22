window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ef4aacc9bc",
  "questions": {
    "q1": {
      "options": {
        "A": "An unpredictable JWT identifier does not establish permission for a particular project or operation.",
        "B": "Authentication identifies the subject, while a separate object-level decision must authorize the requested action on that project.",
        "C": "Object identifiers can become known through legitimate use or leakage and cannot substitute for access checks.",
        "D": "Asynchronous middleware can still perform unauthorized lookups; its implementation style does not establish resource permission."
      }
    },
    "q2": {
      "options": {
        "A": "UUIDs can be used in route parameters, so identifier format does not prevent implementing access checks.",
        "B": "Tenant filters can apply to UUID-based records just as they can to sequential identifiers.",
        "C": "ORMs do not universally convert UUID identifiers into sequential integers, and that is not the authorization issue.",
        "D": "Hard-to-guess identifiers still require permission checks because a known or leaked identifier conveys no automatic access right."
      }
    },
    "q3": {
      "options": {
        "A": "Combining the requested identifier with trusted tenant context constrains the lookup to the caller's established scope.",
        "B": "Client-side hiding cannot protect records already returned by an unrestricted server query.",
        "C": "A body-supplied tenant is untrusted and must not override the scope established by authentication and policy.",
        "D": "Authentication does not automatically add tenant restrictions to a database query that filters only by object identifier."
      }
    },
    "q4": {
      "options": {
        "A": "Being near the operation does not make a caller-selected tenant trustworthy or authorized.",
        "B": "Choosing the tenant where a record exists lets target data replace the caller's established access scope.",
        "C": "Verified server-side context should establish the tenant boundary unless another explicit authorized cross-tenant workflow applies.",
        "D": "Identifier length has no relationship to trusted tenant membership or permission for the requested object."
      }
    },
    "q5": {
      "options": {
        "A": "Valid syntax does not establish parent-child membership or the caller's authority over either resource.",
        "B": "The lookup must bind the task to the named project and place that relationship inside authorized caller scope.",
        "C": "A general user role does not prove access to the selected project or its nested task.",
        "D": "A parent identifier in a route does not automatically constrain a separate global lookup of the child record."
      }
    },
    "q6": {
      "options": {
        "A": "Each target needs authorization, and the batch must follow its documented all-or-nothing or partial-success behavior.",
        "B": "The first project's permission does not establish access to other objects in a mixed batch.",
        "C": "Correct identifier formatting does not prove ownership, tenant relationship, state eligibility, or action permission.",
        "D": "One endpoint can receive objects from different scopes, so authorization must cover each actual target."
      }
    },
    "q7": {
      "options": {
        "A": "Express applications can store validated role information on requests, but roles alone do not establish object access.",
        "B": "Authorization must precede returning protected data or performing the side effect rather than follow the response.",
        "C": "Changing comparison syntax does not supply the missing relationship between the requester and the invoice.",
        "D": "A broad role does not prove invoice ownership, tenant membership, a specific grant, or permission for the action."
      }
    },
    "q8": {
      "options": {
        "A": "An explicit policy function still relies on validated runtime inputs and trusted authentication context.",
        "B": "Naming a policy function does not automatically generate database constraints or enforce ORM query scope.",
        "C": "A named policy decision exposes the rule at the enforcement point and supports consistent review and targeted tests.",
        "D": "Object-level policy generally needs the target or equivalent trusted attributes to decide access correctly."
      }
    },
    "q9": {
      "options": {
        "A": "Using another user's valid object tests whether authenticated callers can cross the intended horizontal access boundary.",
        "B": "Access to the caller's own object exercises ordinary success rather than unauthorized access to another user's resource.",
        "C": "Rejecting malformed identifiers tests validation, not permission when a different user's real identifier is supplied.",
        "D": "Requiring login tests authentication but does not establish correct isolation between authenticated users."
      }
    },
    "q10": {
      "options": {
        "A": "Changing a response code does not authorize the operation or permit protected work to occur.",
        "B": "A 404 can conceal existence while the same underlying policy still denies access and prevents side effects.",
        "C": "Query scoping and policy enforcement remain necessary regardless of which denial status the API returns.",
        "D": "A deliberately concealed denial does not prove that the object is absent from every tenant."
      }
    }
  }
};
