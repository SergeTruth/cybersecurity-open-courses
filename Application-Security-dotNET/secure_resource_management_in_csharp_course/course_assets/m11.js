window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-801d4e4b1c",
  "questions": {
    "q01": {
      "options": {
        "A": "Leaked or unbounded resources can exhaust shared capacity and undermine safe application behavior.",
        "B": "Garbage collection does not eliminate unmanaged handles, pool exhaustion, or retained managed objects.",
        "C": "Releasing resources does not determine caller identity or permission for operations.",
        "D": "Resource lifetime affects runtime availability and confidentiality beyond cosmetic coding style."
      }
    },
    "q02": {
      "options": {
        "A": "Ownership assigns release responsibility, while lifetime defines when the resource remains usable.",
        "B": "Log font choice is unrelated to a resource's responsible owner and cleanup interval.",
        "C": "Cleanup responsibilities remain on failures as well as successful operation paths.",
        "D": "Course assessment size does not determine application resource ownership contracts."
      }
    },
    "q03": {
      "options": {
        "A": "Scoped disposal releases owned resources predictably when their required lifetime ends.",
        "B": "Using statements normally shorten resource lifetime rather than retain every object until exit.",
        "C": "Disposal supports cleanup around exceptions and does not prevent all failures.",
        "D": "The programmer must still identify which code owns and may dispose each resource."
      }
    },
    "q04": {
      "options": {
        "A": "Use asynchronous cleanup when releasing an owned resource itself requires asynchronous operations.",
        "B": "An object's field count does not determine whether its release operation is asynchronous.",
        "C": "Async cleanup can be relevant to database and network resources alike.",
        "D": "A scope ending should trigger the required cleanup rather than justify ignoring it."
      }
    },
    "q05": {
      "options": {
        "A": "Client and handler lifetimes affect connection pooling, name resolution, cookies, and shared request state.",
        "B": "Creating a fresh client for every call without review can undermine intended connection reuse.",
        "C": "HttpClient uses handlers and underlying connections whose lifetimes influence network behavior.",
        "D": "Lifecycle decisions change runtime resource management rather than merely diagnostic names."
      }
    },
    "q06": {
      "options": {
        "A": "Match connections, transactions, contexts, and injected scopes to their intended units of work.",
        "B": "Storing scoped services in static state can extend them beyond their valid design lifetime.",
        "C": "Transactions can hold locks and affect concurrent work and consistency.",
        "D": "DI lifetime declarations govern object creation and retention with real correctness implications."
      }
    },
    "q07": {
      "options": {
        "A": "Unbounded retention can expose sensitive buffers and exceed producer, consumer, or memory capacity.",
        "B": "Unlimited buffering can increase latency and exhaustion rather than guarantee fast responses.",
        "C": "Retained queues and buffers still need disposal, clearing, and lifecycle policies where appropriate.",
        "D": "Bounded resource handling can coexist with useful safe diagnostic context."
      }
    },
    "q08": {
      "options": {
        "A": "Cooperative cancellation and deadlines bound resource retention and support predictable shutdown and cleanup.",
        "B": "A deadline can stop waiting or request cancellation rather than guarantee successful completion.",
        "C": "Concurrency budgets remain necessary alongside per-operation cancellation and time limits.",
        "D": "Background workers and services also need cancellation and bounded operation duration."
      }
    },
    "q09": {
      "options": {
        "A": "Report approved resource metrics and references without reusable credentials or sensitive raw contents.",
        "B": "Logging full secrets creates exposure independently of the original resource problem.",
        "C": "Nonsecret correlation identifiers can connect related resource failures and aid investigation.",
        "D": "Resource diagnostics need capacity and lifecycle context beyond a navigation click event."
      }
    },
    "q10": {
      "options": {
        "A": "A complete baseline coordinates ownership, cleanup, bounded work, dependency lifetimes, and safe operations.",
        "B": "Unbounded work and shared scoped services introduce exhaustion and lifetime problems.",
        "C": "GC settings alone do not establish correct disposal, connection reuse, or bounded queues.",
        "D": "Cleanup must be designed and verified before release rather than deferred without ownership."
      }
    }
  }
};
