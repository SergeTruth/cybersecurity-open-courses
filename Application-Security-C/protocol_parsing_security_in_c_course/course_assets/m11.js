window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-a76a5d294a",
  "questions": {
    "q1": {
      "options": {
        "A": "Parsed fields can drive memory access and state changes, making the parser security-relevant.",
        "B": "Parsing assigns meaning and potential actions to external bytes, so it must enforce the boundary between untrusted input and application behavior.",
        "C": "Parsed commands and identifiers can influence authorization-sensitive actions even when authorization is enforced later.",
        "D": "External bytes are not trustworthy merely because they reached the parser."
      }
    },
    "q2": {
      "options": {
        "A": "Hidden assumptions can conceal disagreements about valid messages rather than provide a guaranteed speed benefit.",
        "B": "Scattered checks can be incomplete or inconsistent without an explicit message contract.",
        "C": "A documented contract lets reviewers assess whether framing, field checks, and state transitions implement the intended protocol.",
        "D": "C parsers need clear contracts because the implementation must explicitly manage byte, memory, and state boundaries."
      }
    },
    "q3": {
      "options": {
        "A": "A read may return part of one message or data spanning messages, so framing must identify application-message boundaries explicitly.",
        "B": "Streams also need framing because they do not preserve application-message boundaries.",
        "C": "A byte stream preserves byte order, not the sender's application write boundaries.",
        "D": "Struct layout does not tell the compiler where network messages begin or end."
      }
    },
    "q4": {
      "options": {
        "A": "Local peers can still send partial payloads; locality does not establish message completeness.",
        "B": "A complete header may describe a payload that has not arrived yet, so total message availability must be checked separately.",
        "C": "Header completion alone does not establish that the declared body bytes are available.",
        "D": "A version field identifies protocol interpretation, not whether the rest of the message has arrived."
      }
    },
    "q5": {
      "options": {
        "A": "Partial delivery says nothing about whether the bytes are valid or authorized.",
        "B": "Incremental parsers must preserve verified progress and wait safely for additional bytes or handle termination and timeout conditions.",
        "C": "Event-driven I/O commonly supplies partial data, so handlers must support incomplete messages.",
        "D": "Uninitialized buffer space is not received data and must never be parsed as part of the message."
      }
    },
    "q6": {
      "options": {
        "A": "The operating system does not know the parser's protocol-specific length and arithmetic invariants.",
        "B": "Unchecked fields can cause unsafe allocations or accesses before command dispatch occurs.",
        "C": "These fields influence memory and state operations, so representability, bounds, and overflow must be checked before use.",
        "D": "Byte-order conversion changes representation; it does not validate range, arithmetic, or available bytes."
      }
    },
    "q7": {
      "options": {
        "A": "Ignoring state can permit valid-looking commands at an invalid point in the exchange.",
        "B": "A valid format does not establish permission to request the represented operation.",
        "C": "Protocol state machines constrain network exchanges and are not limited to user-interface behavior.",
        "D": "A well-formed message can still violate the current protocol state or the sender's authority."
      }
    },
    "q8": {
      "options": {
        "A": "Dispatch can trigger side effects before invalid or unauthorized input has been rejected.",
        "B": "A command byte alone does not establish complete framing, valid arguments, or authority.",
        "C": "Unchecked allocation sizes can cause memory or availability failures before the request is validated.",
        "D": "Dispatch should consume a complete, validated, state-appropriate, authorized request so parsing does not prematurely trigger actions."
      }
    },
    "q9": {
      "options": {
        "A": "Size, count, time, and complexity limits bound how much work and storage an untrusted peer can demand.",
        "B": "Network services and other non-graphical parsers also face resource-exhaustion attacks.",
        "C": "A bounded request can still be unauthorized, so access checks remain separate.",
        "D": "Resource limits address consumption and complement structural, semantic, and authorization validation."
      }
    },
    "q10": {
      "options": {
        "A": "No finite collection of these checks proves that all possible inputs are valid or safe.",
        "B": "Complementary techniques reveal different failure classes and provide evidence about parser robustness and boundary enforcement.",
        "C": "Tools can test a contract but cannot replace a sound protocol contract and state design.",
        "D": "These techniques help detect flaws during development and CI, before deployment as well as afterward."
      }
    }
  }
};
