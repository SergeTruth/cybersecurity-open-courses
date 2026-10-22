window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5e23501006",
  "questions": {
    "q1": {
      "options": {
        "A": "Limits restrict admitted work but cannot guarantee that expensive operations themselves are fast.",
        "B": "Controlling request flow protects shared capacity, cost, fairness, and availability.",
        "C": "Monitoring remains necessary to observe rejected traffic, policy effectiveness, and resource pressure.",
        "D": "Request budgets do not establish caller identity or permission to access a resource."
      }
    },
    "q2": {
      "options": {
        "A": "Application limiters can protect API and other dynamic endpoints as configured.",
        "B": "A useful limiter admits permitted work rather than necessarily disabling every request.",
        "C": "Upstream protections may be needed when distributed traffic exceeds application or network capacity.",
        "D": "Application request controls directly support availability by limiting accepted work."
      }
    },
    "q3": {
      "options": {
        "A": "Time windows bound arrivals over time, while concurrency limits bound simultaneously active work.",
        "B": "Concurrency control tracks active work rather than only completed requests per hour.",
        "C": "Time-based budgets can apply to many endpoint types beyond uploads.",
        "D": "The two approaches measure different dimensions of request pressure and resource use."
      }
    },
    "q4": {
      "options": {
        "A": "Endpoint cost includes backend computation and I/O rather than only static assets.",
        "B": "Different operations can have very different database, CPU, and downstream costs.",
        "C": "Cost-aware policies protect scarce resources consumed by expensive operations.",
        "D": "An endpoint's name does not describe the full work its implementation performs."
      }
    },
    "q5": {
      "options": {
        "A": "Public endpoints can still need limits to protect shared resources and fairness.",
        "B": "Partitions keep counters separate for meaningful identities, tenants, routes, or client groups.",
        "C": "Rate-limit partitioning is unrelated to cryptographic Data Protection key storage.",
        "D": "Partition counters do not encrypt request bodies or replace transport security."
      }
    },
    "q6": {
      "options": {
        "A": "Configured rate-limiting middleware participates in the request-processing pipeline.",
        "B": "Policy scope still needs explicit configuration regardless of middleware placement.",
        "C": "The limiter must run where the required endpoint and identity context are available.",
        "D": "Pipeline ordering affects enforcement rather than merely the page's visual layout."
      }
    },
    "q7": {
      "options": {
        "A": "Request queues retain work and are not merely a logging presentation feature.",
        "B": "Queued requests can retain memory and other resources instead of using none.",
        "C": "Waiting work still needs deadlines, cancellation, and retry policies.",
        "D": "Bounded queues can absorb bursts, but excessive waiting work can exhaust resources."
      }
    },
    "q8": {
      "options": {
        "A": "Body limits do not determine user roles or resource authorization.",
        "B": "Browser font choices are unrelated to the server's accepted request body size.",
        "C": "Response representation is a separate endpoint decision from request-size enforcement.",
        "D": "A request body limit bounds the amount of body data the server accepts."
      }
    },
    "q9": {
      "options": {
        "A": "Control original and expanded sizes and processing work to prevent resource exhaustion.",
        "B": "File storage and processing can consume significant backend and downstream capacity.",
        "C": "Decompression can expand a small encoded body into much larger processed data.",
        "D": "Uploads can require costly buffering, scanning, parsing, and persistent storage."
      }
    },
    "q10": {
      "options": {
        "A": "Production limits need capacity and traffic review rather than unexamined development settings.",
        "B": "Coordinate limiter algorithms, partitions, endpoint scope, server budgets, and observed infrastructure behavior.",
        "C": "A hidden constant alone omits policy scope, operational visibility, and environment-specific capacity.",
        "D": "Client retries cannot enforce server resource budgets and may increase overload."
      }
    }
  }
};
