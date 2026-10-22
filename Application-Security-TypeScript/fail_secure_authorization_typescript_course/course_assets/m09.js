window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-dc980ac479",
  "questions": {
    "q1": {
      "options": {
        "A": "Starting with permission does not force successful policy evaluation to return an indeterminate result.",
        "B": "A default allow can survive an exception or skipped check and incorrectly authorize the protected action.",
        "C": "A permissive Boolean does not inherently prevent asynchronous TypeScript code from compiling.",
        "D": "The risk reaches actual side effects, not merely how denial or authentication events appear in logs."
      }
    },
    "q2": {
      "options": {
        "A": "Unknown or malformed results are not evidence of permission merely because they are not literally false.",
        "B": "Expired cached permissions require an explicit stale-use policy rather than automatic acceptance during dependency failure.",
        "C": "An indeterminate response does not establish a trustworthy allow even when no denial reason is present.",
        "D": "Execution needs a validated explicit allow tied to the actual subject, resource, action, and required context."
      }
    },
    "q3": {
      "options": {
        "A": "Blocking the action while recording evaluation failure preserves security and distinguishes an outage from a policy denial.",
        "B": "Absence of a denial during a timeout is not trustworthy evidence that the operation is permitted.",
        "C": "Exhausting a retry budget does not turn an unresolved policy decision into an authorization grant.",
        "D": "Performing the change first leaves an unauthorized side effect that later review may be unable to undo."
      }
    },
    "q4": {
      "options": {
        "A": "Nullish coalescing with true preserves explicit allow rather than converting it into a denial.",
        "B": "The expression selects a fallback immediately and does not itself wait for a policy service.",
        "C": "A null or undefined decision means evidence is missing; replacing it with true grants access without a trusted allow.",
        "D": "This fallback changes missing-decision handling rather than defining or preventing cache expiry."
      }
    },
    "q5": {
      "options": {
        "A": "Missing tenant context cannot justify granting cross-tenant authority that the request has not established.",
        "B": "Required context is part of the permission evidence, so its absence must not authorize the operation.",
        "C": "Selecting the first record's tenant can substitute attacker-influenced or unrelated data for trusted request context.",
        "D": "Authentication establishes identity but does not necessarily establish the tenant required for this specific action."
      }
    },
    "q6": {
      "options": {
        "A": "Indefinite allows ignore revocation, policy changes, and contextual differences and can outlive valid permission.",
        "B": "Role-only cache keys can reuse decisions across different tenants, resources, actions, or subjects incorrectly.",
        "C": "Stale-use behavior needs documented risk and availability rules rather than a context-free universal assumption.",
        "D": "Context binding and explicit freshness, version, revocation, and stale-use policies make cache authorization behavior reviewable."
      }
    },
    "q7": {
      "options": {
        "A": "Collapsing failures into false can conceal policy-service outages and prevent accurate error reporting and monitoring.",
        "B": "A false decision does not automatically execute the protected action; the surrounding control flow determines that behavior.",
        "C": "Boolean false is valid in TypeScript, so representability is not the operational concern.",
        "D": "Exception handling does not make public-route authentication middleware optional or establish the route's intended security policy."
      }
    },
    "q8": {
      "options": {
        "A": "Calling next without error in finally can continue into the protected handler after denial or evaluation failure.",
        "B": "An unresolved promise is truthy regardless of its eventual authorization result and must be awaited correctly.",
        "C": "Every non-grant branch must terminate protected execution, with normal continuation reserved for an explicit trusted allow.",
        "D": "Reporting denial without terminating control flow can still allow subsequent protected work to execute."
      }
    },
    "q9": {
      "options": {
        "A": "Discriminated unions model result alternatives but do not authenticate the external service that supplied a response.",
        "B": "Explicit cases support exhaustive internal handling, while external data still needs runtime validation before entering that model.",
        "C": "A static union does not establish actual cache age, policy version, or revocation status at runtime.",
        "D": "Modeling outcomes does not remove the need to bind decisions to the correct resource, action, and context."
      }
    },
    "q10": {
      "options": {
        "A": "An exception alone does not prove that persistence or other protected side effects were prevented.",
        "B": "Healthy success tests do not exercise dependency outages, indeterminate results, or failure-path fallthrough.",
        "C": "A non-200 response can occur after side effects have already happened, so response status alone is insufficient.",
        "D": "Outage tests must verify both the non-grant response and the absence of every relevant protected side effect."
      }
    }
  }
};
