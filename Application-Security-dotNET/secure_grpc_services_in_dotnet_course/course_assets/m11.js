window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-637b06e7b0",
  "questions": {
    "q1": {
      "options": {
        "A": "Generated clients do not enforce the server's complete method and resource authorization policy.",
        "B": "A communication framework still needs explicit trust, permissions, validation, resource, and operational controls.",
        "C": "HTTP/2 provides transport behavior rather than every service-level security decision.",
        "D": "gRPC services receive client messages that may be untrusted or inappropriate."
      }
    },
    "q2": {
      "options": {
        "A": "A message contract does not provide encrypted authenticated transport on its own.",
        "B": "Protobuf describes exchanged data and methods rather than only interface presentation.",
        "C": "Contracts define exposed capabilities and fields, including streaming shapes with resource implications.",
        "D": "Typed fields do not enforce every semantic business rule or resource permission."
      }
    },
    "q3": {
      "options": {
        "A": "TLS protects bytes in transit and authenticates the expected service when validation is correct.",
        "B": "Protobuf field meaning still needs server-side semantic and workflow validation.",
        "C": "Method authorization remains an application policy beyond encrypted transport.",
        "D": "Transport security complements rather than replaces safe operational event logging."
      }
    },
    "q4": {
      "options": {
        "A": "Identity and permission checks are not merely two names for message serialization.",
        "B": "Message size and compression settings do not define authentication and authorization.",
        "C": "Authentication identifies a caller, while authorization evaluates access to actions and resources.",
        "D": "Latency recording and certificate rotation support operations but are different from these decisions."
      }
    },
    "q5": {
      "options": {
        "A": "gRPC metadata is available to service infrastructure and can carry sensitive values.",
        "B": "Treat metadata as a potential carrier of credentials and confidential call context.",
        "C": "Client options influence destinations, credential attachment, and transport trust behavior.",
        "D": "Internal calls can still disclose credentials through logs and need redaction."
      }
    },
    "q6": {
      "options": {
        "A": "Message limits enforce runtime budgets rather than only change service documentation.",
        "B": "Resource ceilings directly affect availability and predictable behavior under load.",
        "C": "Large payloads and persistent streams can retain scarce resources and downstream capacity.",
        "D": "Streaming can be expensive or long-lived and is not universally cheaper than unary calls."
      }
    },
    "q7": {
      "options": {
        "A": "Deadlines limit work and do not decide whether the caller may invoke a method.",
        "B": "Slow calls still need authentication and should not receive identity bypasses.",
        "C": "Deadlines and cancellation constrain duration instead of permitting indefinite execution.",
        "D": "Propagate deadlines and cancellation so abandoned calls do not retain expensive processing indefinitely."
      }
    },
    "q8": {
      "options": {
        "A": "Interceptors support shared checks without proving each method's semantic input is valid.",
        "B": "Central policies should remain explicit and reviewable rather than hidden from maintainers.",
        "C": "Response safety still needs an intentional contract and controlled returned fields.",
        "D": "Shared interceptors can enforce common preconditions and provide safe consistent diagnostic context."
      }
    },
    "q9": {
      "options": {
        "A": "Reflection reveals service structure, while transcoding can add another externally reachable request surface.",
        "B": "Production deployments can enable these features and need explicit exposure review.",
        "C": "Neither feature makes secret-bearing metadata safe to record in logs.",
        "D": "Service introspection and alternate HTTP mapping do not replace transport encryption and identity checks."
      }
    },
    "q10": {
      "options": {
        "A": "Broad contracts and unlimited streams expose unnecessary capabilities and resource consumption.",
        "B": "Coordinate narrow contracts, trusted transport, identity, permissions, budgets, failures, and deployment controls.",
        "C": "Generated code and internal hostnames do not establish complete caller authorization or resource safety.",
        "D": "Development discovery features require production decisions beyond their default local convenience."
      }
    }
  }
};
