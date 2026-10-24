window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-5a415828a2",
  "questions": {
    "q1": {
      "options": {
        "A": "Transport delivery does not validate the application's protocol semantics or the peer's authority to request an action.",
        "B": "The application can use received bytes for indexing, copying, allocation, and state changes despite kernel-managed transport buffers.",
        "C": "Socket data crosses peer and trust boundaries and must be validated before it drives application behavior.",
        "D": "A locally created descriptor identifies an endpoint, not the trustworthiness of the peer or received bytes."
      }
    },
    "q2": {
      "options": {
        "A": "Loopback delivery does not inherently supply encryption or authenticated application identity.",
        "B": "A private address identifies network location rather than permission to execute every requested operation.",
        "C": "Managed systems and internal components can be compromised, misconfigured, or operating under different trust assumptions.",
        "D": "Local and internal peers can still represent different principals and authorities, so their requests need appropriate verification."
      }
    },
    "q3": {
      "options": {
        "A": "Binding selects exposure and does not authenticate peers or validate their requests.",
        "B": "The chosen local addresses and interfaces determine where connection attempts can reach the service.",
        "C": "A binding change can expose a service on additional interfaces and materially change runtime reachability.",
        "D": "A reachable endpoint can still receive connections from untrusted peers, regardless of the intended binding policy."
      }
    },
    "q4": {
      "options": {
        "A": "Clear ownership and cleanup on every path prevent leaked sockets and confused responsibility after partial failures.",
        "B": "Deferring every close to process exit can exhaust descriptors and preserve unintended access during long-running execution.",
        "C": "Passing additional descriptors expands inherited authority rather than establishing correct socket ownership.",
        "D": "Creation success does not guarantee complete I/O or remove failures during connection setup, reading, or writing."
      }
    },
    "q5": {
      "options": {
        "A": "Applications can often observe addresses, but address visibility does not establish authenticated identity or authorization.",
        "B": "A source location alone does not establish who the caller is or which application operations that caller may perform.",
        "C": "Peers on one network can have different users, roles, and permissions.",
        "D": "Commands received through sockets can perform sensitive actions and require authorization just as other interfaces do."
      }
    },
    "q6": {
      "options": {
        "A": "TCP can split one write across reads or combine data from several writes in one read.",
        "B": "C structure names and layout do not define message boundaries in a TCP byte stream.",
        "C": "A connected TCP stream still needs an application framing contract; transport connection state does not provide it.",
        "D": "TCP supplies ordered bytes, while the application must identify complete messages and enforce their framing rules."
      }
    },
    "q7": {
      "options": {
        "A": "Local transport can also return short operations, so the returned byte count must be handled explicitly.",
        "B": "A short read or write describes I/O progress, not peer identity or permission.",
        "C": "Bytes outside the completed transfer are not established as received message data and must not be parsed as such.",
        "D": "Actual counts and preserved progress state allow incomplete I/O to continue or terminate without interpreting unavailable bytes."
      }
    },
    "q8": {
      "options": {
        "A": "The network stack does not know the application's message lengths, destination capacity, or allocation policy.",
        "B": "Declared sizes must fit safe arithmetic and resource policy and agree with the data available before use.",
        "C": "Unsafe allocation or copying can already occur before a handler reaches delayed length checks.",
        "D": "Fixed buffers still require bounds checks because peer-provided lengths can exceed their capacity or misdirect parsing."
      }
    },
    "q9": {
      "options": {
        "A": "Services also have finite connections, memory, workers, and processing time that require availability controls.",
        "B": "Encrypted peers can still send abusive or expensive requests, so encryption does not replace consumption limits.",
        "C": "Bounded work and timely cleanup keep incomplete, malformed, or abandoned connections from holding capacity indefinitely.",
        "D": "Cleanup alone cannot make unlimited simultaneous allocation and connections safe for finite server resources."
      }
    },
    "q10": {
      "options": {
        "A": "These measures address different layers: protected transport, safe diagnostics, robust parsing, selected memory defects, and sound trust decisions.",
        "B": "Neither encryption nor testing proves that every peer and requested action is trusted.",
        "C": "TLS protects a byte transport and sanitizers find selected defects; neither supplies the application's message framing contract.",
        "D": "Development and CI can exercise malformed traffic and failure paths before deployment."
      }
    }
  }
};
