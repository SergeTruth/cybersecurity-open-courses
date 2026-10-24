window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-fbe44aaf4b",
  "questions": {
    "q1": {
      "options": {
        "A": "Binding a socket does not create an authenticated trust relationship with every datagram sender.",
        "B": "Private addressing does not establish that all reachable peers are trusted or authorized.",
        "C": "Incoming datagrams can originate from peers outside the service's identity and trust assumptions and need explicit validation.",
        "D": "The kernel does not validate the application's custom datagram schema or requested operation."
      }
    },
    "q2": {
      "options": {
        "A": "UDP does not itself guarantee that every sent datagram reaches the receiver.",
        "B": "Automatic reliability and congestion-control behavior are not supplied as a general UDP application guarantee.",
        "C": "Datagram boundaries do not include a built-in proof of the sender's trusted identity.",
        "D": "UDP preserves datagram-oriented delivery semantics without adding guaranteed delivery, ordering, retransmission, or an authenticated session."
      }
    },
    "q3": {
      "options": {
        "A": "The local bind choice changes the interfaces and addresses on which peers can reach the listener.",
        "B": "An undocumented port bound to wildcard interfaces can still receive traffic on those reachable interfaces.",
        "C": "Binding affects receive exposure as well as interacting with routing and firewall configuration.",
        "D": "An ephemeral port is not an authorization boundary and can still be reached or discovered."
      }
    },
    "q4": {
      "options": {
        "A": "Reverse-name lookup does not prove the sender's application identity or permission to request an action.",
        "B": "Source address and port provide routing context, while authority for sensitive actions needs appropriate higher-layer verification.",
        "C": "Subnet membership does not authorize every peer for every operation within that network.",
        "D": "Repeated source tuples do not alone establish an authenticated identity or freshness."
      }
    },
    "q5": {
      "options": {
        "A": "Another receive obtains a separate datagram rather than automatically completing the previous message's missing payload.",
        "B": "A datagram need not be a terminated string and must be bounded by its actual received length.",
        "C": "Checking actual size first establishes that fields exist and that the message fits the accepted parser contract.",
        "D": "Reading a length field before confirming its bytes exist can already access unavailable input."
      }
    },
    "q6": {
      "options": {
        "A": "Missing bytes can make structural and semantic validation incomplete even when some header fields were received.",
        "B": "Matching source addresses do not make two independent datagrams parts of one message without an explicit higher-layer protocol.",
        "C": "A safely bounded prefix can still omit required fields or constraints needed before dispatch.",
        "D": "A complete header can depend on missing payload data for authorization, consistency, or message validation."
      }
    },
    "q7": {
      "options": {
        "A": "Even small individual responses can consume excessive aggregate bandwidth and processing without suitable rate policy.",
        "B": "A work counter needs a time and reset or refill contract to implement meaningful rate limits.",
        "C": "Authentication does not justify unlimited resource use by a valid but abusive or compromised caller.",
        "D": "Bounded processing and response amplification limit how much capacity a weakly validated request can demand or redirect."
      }
    },
    "q8": {
      "options": {
        "A": "Group membership does not authenticate every sender or authorize its application messages.",
        "B": "Broad discovery traffic can mix peers and trust assumptions, requiring explicit size, content, authority, and exposure policy.",
        "C": "TTL and interface choices can change where discovery traffic travels and who can observe or send it.",
        "D": "Interoperability needs deliberate extension policy rather than indiscriminately accepting unknown fields or unsafe structure."
      }
    },
    "q9": {
      "options": {
        "A": "Segmentation constrains reachability but does not itself authenticate messages or detect every replay.",
        "B": "An ordinary datagram checksum does not supply cryptographic authentication, confidentiality, or replay defenses.",
        "C": "UDP alone lacks the cryptographic authenticity, confidentiality, integrity, and replay controls some application operations require.",
        "D": "Protected transport identity still does not authorize every application command requested by that peer."
      }
    },
    "q10": {
      "options": {
        "A": "Raw datagrams can contain sensitive and attacker-controlled material that should not be copied indiscriminately into logs.",
        "B": "Memory checks on exercised inputs do not establish every deployment exposure or rate-limit assumption.",
        "C": "Checking byte counts is necessary but does not replace negative protocol, authority, and lifecycle tests.",
        "D": "Complementary engineering checks expose validation, state, memory, logging, and deployment defects while reinforcing an explicit protocol contract."
      }
    }
  }
};
