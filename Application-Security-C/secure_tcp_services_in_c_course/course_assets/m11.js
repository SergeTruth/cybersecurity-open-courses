window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-3c1a056d37",
  "questions": {
    "q01": {
      "options": {
        "A": "TCP delivers bytes without deciding whether application messages are valid or authorized.",
        "B": "Peer input exercises the service's parsing, lifetime, authority, and resource contracts and therefore defines a security boundary.",
        "C": "A listening TCP service can receive traffic from peers with different identities and trust assumptions.",
        "D": "The application still owns buffers, descriptors, worker state, and lifecycle decisions above the transport."
      }
    },
    "q02": {
      "options": {
        "A": "Binding can change which networks and interfaces expose the service rather than merely changing diagnostics.",
        "B": "Different local addresses can expose different interfaces and sets of reachable clients.",
        "C": "An explicit listening address bounds network reachability according to the deployment's intended exposure.",
        "D": "Reduced exposure does not authenticate a reachable client or authorize its application commands."
      }
    },
    "q03": {
      "options": {
        "A": "Field validation belongs to the application protocol rather than TCP's transport implementation.",
        "B": "TCP preserves ordered bytes but does not preserve each sender write as one application message.",
        "C": "One read can return part of a message or bytes spanning several messages.",
        "D": "TCP does not automatically validate and deserialize the service's custom C data structures."
      }
    },
    "q04": {
      "options": {
        "A": "A complete framed message can still be excessively large and needs explicit size and allocation limits.",
        "B": "Encrypted and plaintext byte streams both need a defined application-message boundary.",
        "C": "Complete framing does not establish that the fields or requested state transition are valid.",
        "D": "Framing establishes when a complete message is available before structural and semantic validation and dispatch."
      }
    },
    "q05": {
      "options": {
        "A": "One available byte does not establish that later fields, lengths, and message data can be read safely.",
        "B": "Private network location does not make every client or message trustworthy.",
        "C": "TCP checks transport behavior rather than the application's field meaning and authority requirements.",
        "D": "Checks must establish safe representation, bounds, conversions, and permitted protocol-state meaning before received fields drive operations."
      }
    },
    "q06": {
      "options": {
        "A": "A short transfer reports progress, not an authenticated identity or permission decision.",
        "B": "Partial I/O is a normal possibility under production connection and scheduling behavior.",
        "C": "Actual byte counts and retained progress state let code safely continue incomplete transfers or handle failure.",
        "D": "Dispatching individual bytes without a complete protocol contract can interpret incomplete or invalid requests."
      }
    },
    "q07": {
      "options": {
        "A": "A resource budget defines when to reject or stop work rather than guarantee every request succeeds.",
        "B": "Explicit quotas prevent peers from demanding unbounded memory, descriptors, connection slots, queues, and processing.",
        "C": "A bounded message can still be malformed or unauthorized, so validation remains necessary.",
        "D": "Long-running services have finite resources and need limits even without any graphical interface."
      }
    },
    "q08": {
      "options": {
        "A": "Uncoordinated mutation can make concurrent clients observe inconsistent state or affect one another's decisions.",
        "B": "Sharing state does not isolate clients and can create interference without suitable ownership and synchronization.",
        "C": "Making every thread an owner creates ambiguous cleanup rather than guaranteeing safe resource lifetime.",
        "D": "Earlier valid state can change, and each request still needs its own relevant validation and authority checks."
      }
    },
    "q09": {
      "options": {
        "A": "Transport protection does not automatically assign application permissions for every command.",
        "B": "An encrypted peer can still request data or actions outside its permitted authority.",
        "C": "Successfully decrypted messages still require application framing, validation, and state checks.",
        "D": "Encryption protects exchanged data, while authorization separately evaluates the caller's permitted actions and resources."
      }
    },
    "q10": {
      "options": {
        "A": "Raw client bytes can contain secrets, uncontrolled formatting, and excessive content unsuitable for retained logs.",
        "B": "Socket delivery does not sanitize data for log format or establish that it is safe to disclose.",
        "C": "Bounded sanitized diagnostics reduce disclosure, forged log structure, operator confusion, and storage exhaustion.",
        "D": "Large raw logs do not replace purpose-built metrics, outcome checks, and operational monitoring."
      }
    },
    "q11": {
      "options": {
        "A": "Every lifecycle outcome can leave resources to release, including early setup failures and abandoned connections.",
        "B": "Failed requests can still allocate buffers, descriptors, and worker state requiring cleanup.",
        "C": "Unauthenticated peers can consume resources before authorization and also need bounded cleanup paths.",
        "D": "Established application connections retain resources and state that the service must manage explicitly."
      }
    },
    "q12": {
      "options": {
        "A": "Secure service behavior depends on coordinated transport exposure, input contracts, authority, budgets, isolation, diagnostics, and lifecycle handling.",
        "B": "No single socket flag defines every parser, authorization, resource, and cleanup contract.",
        "C": "Connection establishment does not enforce the application's custom message and state-machine rules.",
        "D": "Safe limited diagnostics can support investigation without exposing secrets or uncontrolled client payloads."
      }
    }
  }
};
