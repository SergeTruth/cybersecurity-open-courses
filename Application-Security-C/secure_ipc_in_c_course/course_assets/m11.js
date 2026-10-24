window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-ea6b30f8b2",
  "questions": {
    "q1": {
      "options": {
        "A": "Local reachability does not establish a shared identity, privilege level, or trust domain.",
        "B": "The C runtime does not automatically authenticate arbitrary IPC peers or validate application-specific message fields.",
        "C": "IPC can cross identities and privilege levels, so each endpoint and request needs deliberate trust and authority rules.",
        "D": "A privileged local service can be attacked without its traffic ever crossing the public internet."
      }
    },
    "q2": {
      "options": {
        "A": "A known name identifies a destination but does not alone establish who controls the endpoint or who is connecting.",
        "B": "Local peers can supply malformed or attacker-controlled structured messages just as other external input sources can.",
        "C": "Locality does not remove differences between the users, containers, services, and privileges represented by peers.",
        "D": "A channel does not automatically grant a client the receiving server's authority."
      }
    },
    "q3": {
      "options": {
        "A": "Connection permission does not establish that a message's size, structure, and requested action are valid.",
        "B": "Ownership and access settings affect who can create, connect to, replace, or remove endpoint state.",
        "C": "Endpoint lifecycle and cleanup depend on the mechanism and failure path and cannot be assumed universally automatic.",
        "D": "Ownership and permissions restrict endpoint manipulation and use, reducing unauthorized access and endpoint replacement opportunities."
      }
    },
    "q4": {
      "options": {
        "A": "Endpoint naming must be supplemented with appropriate peer verification and operation-specific authorization.",
        "B": "Knowing or reaching a name does not authorize every command the service exposes.",
        "C": "Peer identity is relevant context for authorization, and both concerns belong in the trust-boundary design.",
        "D": "A string naming an endpoint does not provide the proof associated with authenticated credentials."
      }
    },
    "q5": {
      "options": {
        "A": "Framing identifies complete application messages within a stream before fields are interpreted and actions dispatched.",
        "B": "A stream read can contain a partial message or bytes from multiple messages.",
        "C": "Local byte-stream delivery also does not preserve application write boundaries as complete messages.",
        "D": "Service commands need an explicit framing contract unless their protocol already defines an unambiguous message boundary."
      }
    },
    "q6": {
      "options": {
        "A": "The operating system transports bytes without validating every application-defined length or safe allocation policy.",
        "B": "A declared length must fit arithmetic and policy constraints and be consistent with the message bytes actually available.",
        "C": "Unchecked sizes can cause unsafe allocation or copying before the handler reaches later validation.",
        "D": "A local sender with different privileges remains an untrusted source for lengths and message contents."
      }
    },
    "q7": {
      "options": {
        "A": "A larger region does not make related writes atomic or synchronize the participating processes.",
        "B": "Shared access requires agreement about permitted users, representation, coordination, bounds, ownership, and cleanup.",
        "C": "Sharing bytes does not guarantee identical interpretation or prevent a peer from supplying invalid state.",
        "D": "Signals do not by themselves define a complete data-synchronization, ownership, and lifecycle protocol."
      }
    },
    "q8": {
      "options": {
        "A": "Local peers can exhaust shared server capacity, so limits remain important without public network access.",
        "B": "A timeout does not universally close application resources or remove every IPC object and retained state.",
        "C": "Limits bound consumption but do not establish that a message is structurally valid or authorized.",
        "D": "Connections and requests can consume finite server resources indefinitely unless limits and timeout recovery bound their use."
      }
    },
    "q9": {
      "options": {
        "A": "Child creation can preserve open descriptors and environment state unless the launch policy prevents that inheritance.",
        "B": "Successful creation does not prove that every inherited descriptor or credential was intentionally granted.",
        "C": "Inherited state can carry authority across the process boundary and therefore needs explicit restriction and review.",
        "D": "Children can inherit existing resources without reopening their names, depending on launch and descriptor settings."
      }
    },
    "q10": {
      "options": {
        "A": "Complementary checks exercise rejection, resource management, and trust decisions and can reveal leaks or unsafe failure behavior.",
        "B": "Tests and analysis do not authenticate every possible peer or justify removing access checks.",
        "C": "Sanitizers detect selected runtime defects rather than enforce endpoint permissions or client authorization.",
        "D": "Development and CI can exercise malicious messages and failure conditions before production incidents occur."
      }
    }
  }
};
