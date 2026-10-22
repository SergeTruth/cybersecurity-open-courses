window.COURSE_MODULE = {
  "title": "Final Quiz"
};

window.QUIZ_FEEDBACK = {
  "version": "v10-c6c2d3b01c",
  "questions": {
    "q1": {
      "options": {
        "A": "Node fetch supports HTTPS; the problem is giving untrusted input control over the server's outbound destination.",
        "B": "A static URL type does not determine whether the running HTTP client can execute a request.",
        "C": "Arbitrary destinations can let callers exercise the server's network reachability across boundaries unavailable from their own clients.",
        "D": "Fetching fixed trusted destinations can be appropriate when the operation, credentials, resource use, and response handling are controlled."
      }
    },
    "q2": {
      "options": {
        "A": "A configured integration maps an authorized record to approved destination behavior instead of accepting unrestricted caller-selected URLs.",
        "B": "Opaque record identifiers do not change DNS resolution or guarantee globally routable addresses.",
        "C": "A known or leaked integration identifier still requires tenant and action authorization before the server uses it.",
        "D": "Approved configuration still needs bounded processing and appropriately scoped credentials for the intended operation."
      }
    },
    "q3": {
      "options": {
        "A": "A prefix can include paths and queries, but successful text matching does not establish the parsed origin.",
        "B": "Prefix comparison does not choose a port or enforce that the URL uses an approved one.",
        "C": "String prefix tests do not resolve DNS or establish the address the transport will ultimately reach.",
        "D": "Authority syntax and hostname boundaries must be parsed and checked explicitly rather than inferred from a similar-looking prefix."
      }
    },
    "q4": {
      "options": {
        "A": "A parsed hostname can resolve differently over time, and URL parsing does not establish its address class.",
        "B": "Parsing and scheme checks establish only part of policy; destination, resolution, redirects, ports, and transport still need controls.",
        "C": "Redirect targets can cross the original boundary and require independent destination checks if following them is allowed.",
        "D": "new URL performs runtime parsing, but TypeScript types do not independently authorize or verify network destinations."
      }
    },
    "q5": {
      "options": {
        "A": "HTTPS normally supports hostnames and uses them to validate server identity; that does not make every resolved address permitted.",
        "B": "Endpoint classification restricts network reachability but does not determine tenant ownership or permission to use a resource.",
        "C": "An acceptable hostname can resolve to a private, loopback, link-local, or other forbidden endpoint that needs explicit rejection.",
        "D": "DNS resolution does not automatically remove sensitive headers or prevent credential forwarding to the selected service."
      }
    },
    "q6": {
      "options": {
        "A": "Sorting DNS answers does not establish that all addresses the connection may select are permitted.",
        "B": "Clients may use IPv6, so ignoring those answers leaves part of the actual transport choice unchecked.",
        "C": "One permitted answer does not make another forbidden candidate safe for fallback or connection selection.",
        "D": "Every selectable endpoint must satisfy address policy, with forbidden or malformed results causing a non-grant outcome."
      }
    },
    "q7": {
      "options": {
        "A": "Disable unneeded redirects; any future redirect support should validate each resulting target as a fresh outbound destination.",
        "B": "HTTPS on the initial request does not authorize subsequent redirect hosts, addresses, schemes, or ports.",
        "C": "Redirect resolution has its own URL semantics and each resolved destination still needs the applicable policy checks.",
        "D": "Even one unchecked redirect can cross into a destination the initial request was not authorized to contact."
      }
    },
    "q8": {
      "options": {
        "A": "A second DNS lookup need not change the URL scheme; its selected network address is the relevant mismatch.",
        "B": "Separate validation and connection lookups can produce different endpoints, so approved resolution must be bound to actual transport behavior.",
        "C": "DNS lookup alone does not copy cookies; header forwarding is a separate outbound credential policy.",
        "D": "DNS address changes can affect endpoints, while parsed ports and relevant service-resolution behavior require their own explicit controls."
      }
    },
    "q9": {
      "options": {
        "A": "Forwarding inbound bearer and cookie headers can disclose credentials to destinations not authorized to receive them.",
        "B": "Successful URL parsing does not justify attaching every process credential to an arbitrary outbound request.",
        "C": "Proxy credentials must remain scoped to their intended proxy rather than be forwarded to caller-selected remote servers.",
        "D": "Minimize headers and add only credentials required for an authorized configured operation and its approved destination."
      }
    },
    "q10": {
      "options": {
        "A": "Firewalls constrain reachability but do not replace application interpretation of URLs and operation-specific destination policy.",
        "B": "Network rules cannot determine whether the requesting tenant is allowed to use a particular configured integration.",
        "C": "Egress controls limit consequences of application failures while destination validation and business permissions remain essential.",
        "D": "Egress restrictions chiefly govern network reachability; response and decompression budgets require separate resource controls."
      }
    }
  }
};
