window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-8a692e50af",
  "questions": {
    "q1": {
      "options": {
        "A": "A documented port does not establish caller trust or enforce message validity.",
        "B": "Accepting a connection does not validate the peer's identity or the bytes it sends.",
        "C": "Even nonprivileged protocols can expose parsing, resource-exhaustion, and lifetime vulnerabilities.",
        "D": "Socket data crosses process or network boundaries and needs an explicit trust contract."
      }
    },
    "q2": {
      "options": {
        "A": "One receive may return only part of a record or bytes from several records.",
        "B": "TCP provides an ordered byte stream, so the application must define record boundaries.",
        "C": "Transport encryption does not automatically preserve application message boundaries for socket consumers.",
        "D": "A connected TCP stream does not inherently supply application record lengths."
      }
    },
    "q3": {
      "options": {
        "A": "Establishing a connection does not give the byte stream application-level message boundaries.",
        "B": "Resource ceilings do not resolve ambiguous field interpretation or malformed framing.",
        "C": "Validate framing and fields before allowing their values to drive business operations.",
        "D": "Interpreting unvalidated fields can already cause side effects or unsafe resource use."
      }
    },
    "q4": {
      "options": {
        "A": "The chosen local address determines which interfaces can accept incoming connections.",
        "B": "Authentication does not eliminate unnecessary exposure created by listening on additional interfaces.",
        "C": "Both port and selected interface address affect which callers can reach a service.",
        "D": "Binding decisions affect the service's exposure boundary as well as routing behavior."
      }
    },
    "q5": {
      "options": {
        "A": "A scoped socket owner closes its handle on normal and exceptional exits.",
        "B": "Waiting for process termination can leak handles throughout a long-running service.",
        "C": "RAII manages lifetime and does not automatically change a socket's blocking mode.",
        "D": "Socket ownership does not independently establish TLS certificate or hostname validation."
      }
    },
    "q6": {
      "options": {
        "A": "A successful stream write can report fewer bytes than the supplied buffer length.",
        "B": "Stream I/O can complete partially and does not preserve application buffers as records.",
        "C": "Track progress and continue from the untransferred portion while handling errors and closure.",
        "D": "Restarting a short write from the beginning can duplicate bytes in the stream."
      }
    },
    "q7": {
      "options": {
        "A": "Backpressure also bounds retained work and protects resources under overload.",
        "B": "Authenticated peers can still stall or overload a service and require deadlines.",
        "C": "Many individually bounded connections can still exhaust total connection and memory budgets.",
        "D": "Combined deadlines, budgets, and overload behavior keep resource use controlled under pressure."
      }
    },
    "q8": {
      "options": {
        "A": "Encryption without the required identity checks may terminate at an impersonating peer.",
        "B": "Skipping certificate or hostname checks weakens authentication of the intended endpoint.",
        "C": "Private routing does not replace the required trust decision about the peer's identity.",
        "D": "Application configuration must prevent insecure development settings reaching production paths."
      }
    },
    "q9": {
      "options": {
        "A": "Restrictive log permissions do not justify unnecessary copies of sensitive network payloads.",
        "B": "Controlled bounded logging can report useful failures without recording attacker-selected raw content.",
        "C": "Use approved categories and context while excluding credentials and sensitive body data.",
        "D": "A complete body is not required for every useful diagnostic event."
      }
    },
    "q10": {
      "options": {
        "A": "Application framing and partial I/O behavior still require malformed transport-input tests.",
        "B": "Happy paths and throughput leave disconnect, rejection, and exhaustion handling unverified.",
        "C": "Library tests do not establish that the application configured certificate rejection correctly.",
        "D": "Test protocol rejection, partial progress, failures, shutdown, and resource-budget enforcement together."
      }
    }
  }
};
