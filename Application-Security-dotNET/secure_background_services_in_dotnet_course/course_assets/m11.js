window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-80562e3c37",
  "questions": {
    "q1": {
      "options": {
        "A": "Lack of a visible interface does not prevent a worker from modifying sensitive user data.",
        "B": "Automated workers can hold powerful access to data, infrastructure, services, and credentials.",
        "C": "Background services commonly run as long-lived production workloads with real resource authority.",
        "D": "Workers must enforce relevant security decisions while processing each job or message."
      }
    },
    "q2": {
      "options": {
        "A": "Startup and shutdown still need observability to detect failures and incomplete work.",
        "B": "Ignoring cancellation can leave work running beyond its intended lifetime.",
        "C": "Lifecycle boundaries define validated startup, safe work admission, and coordinated shutdown behavior.",
        "D": "Starting a worker does not prove that each queued message satisfies its contract."
      }
    },
    "q3": {
      "options": {
        "A": "Long-lived workers need deliberate scope boundaries so dependencies and resources do not become stale.",
        "B": "Retaining scoped state indefinitely can violate intended units of work and resource lifetimes.",
        "C": "Dependency injection can be used safely when scopes and lifetimes match each operation.",
        "D": "Dependency lifetime affects services and workers as well as interface code."
      }
    },
    "q4": {
      "options": {
        "A": "Committed tokens distribute runtime access into source history and build artifacts.",
        "B": "One broad identity combines unrelated authority and expands compromise impact.",
        "C": "Use governed workload identities or scoped service credentials with accountable replacement and revocation.",
        "D": "Printing startup secrets exposes credentials rather than safely confirming their availability."
      }
    },
    "q5": {
      "options": {
        "A": "Queue delivery does not automatically validate each message's business meaning.",
        "B": "Messages may be outdated, duplicated, malformed, or derived from a different trust context.",
        "C": "A message identifier supports tracking and does not authorize its requested action.",
        "D": "Internal producers can still send incompatible or invalid data requiring schema checks."
      }
    },
    "q6": {
      "options": {
        "A": "Queue transport does not establish every tenant ownership relationship referenced by a message.",
        "B": "Background actions still need the correct tenant and resource context.",
        "C": "Verify authoritative resource ownership and applicable permissions before applying a message's requested action.",
        "D": "Tenant identifiers define important data boundaries rather than merely display choices."
      }
    },
    "q7": {
      "options": {
        "A": "Idempotency often requires explicit state or deduplication records to govern repeated processing.",
        "B": "Safe repetition does not guarantee instant completion of every operation.",
        "C": "Workers can log bounded outcomes while preserving idempotent side-effect behavior.",
        "D": "A retry or duplicate delivery should not cause an additional unauthorized or unintended effect."
      }
    },
    "q8": {
      "options": {
        "A": "Routing failed messages for review does not turn invalid input into successful work.",
        "B": "Dead-letter records can contain sensitive data and should not become a secret-debugging store.",
        "C": "Poison-message handling isolates problematic work rather than necessarily stopping all future processing.",
        "D": "Controlled isolation prevents repeatedly failing messages from consuming unbounded retry effort."
      }
    },
    "q9": {
      "options": {
        "A": "Cooperative cancellation and deadlines limit retained resources and support orderly shutdown.",
        "B": "Cancellation affects running asynchronous work rather than only compilation.",
        "C": "Cancellation support does not justify unbounded queues or unlimited processing demand.",
        "D": "A cancellation token does not establish the health of every external dependency."
      }
    },
    "q10": {
      "options": {
        "A": "Queue depth and retry behavior still need operational monitoring under constrained processing policies.",
        "B": "Unbounded work can exhaust shared processing, memory, connections, and downstream capacity.",
        "C": "More parallelism and retries can reduce throughput when they overload constrained dependencies.",
        "D": "Worker Services can and should apply deliberate bounds rather than require runaway processing."
      }
    },
    "q11": {
      "options": {
        "A": "Approved nonsecret correlation identifiers can support tracing without exposing message contents.",
        "B": "Worker and operation names can provide useful bounded diagnostic context.",
        "C": "Exclude reusable credentials and unnecessary sensitive payload or file contents from routine logs.",
        "D": "Controlled outcome categories and state transitions can improve visibility without raw data dumps."
      }
    },
    "q12": {
      "options": {
        "A": "Support or operational workflows can initiate repair work and need appropriate authorization.",
        "B": "High-impact maintenance actions need auditability of the actor, scope, and outcome.",
        "C": "Background execution does not make broad data or administrative operations low impact.",
        "D": "Review broad authority and bulk effects before jobs modify many resources or tenants."
      }
    }
  }
};
