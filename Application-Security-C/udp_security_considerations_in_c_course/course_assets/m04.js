window.COURSE_MODULE = {
  "title": "Source Addresses and Trust Decisions",
  "graphicAlt": "Source-address routing card enters operational-context area, separate from action-policy gate requiring appropriate identity/correlation/replay checks.",
  "narration": "A UDP datagram usually arrives with source address information. That information is useful for sending replies and for operational context, but it should not be treated as a complete proof of identity. Network location can be useful evidence, yet it is not the same as authorization for an application action.\n\nTrust decisions should not depend only on a datagram's apparent source address. The application should decide what the source information means in its deployment model and what additional checks are needed. A low-risk status request may require less assurance than a request that changes state, reveals sensitive data, or consumes significant resources.\n\nAuthorization should be tied to the requested action. Some messages might be accepted from a broad set of peers, while others require stronger identity, a shared trust relationship, or a protected channel. The protocol should not treat every datagram that reaches the port as equally authorized.\n\nProtocols may need request correlation, replay awareness, or peer authentication depending on sensitivity. Correlation can help match responses to requests and keep state transitions clear. Replay awareness can help the service avoid applying stale or repeated state changes. Peer authentication may be needed when the message has meaningful authority.\n\nState tables and peer records should be bounded and cleaned up predictably. UDP does not provide connection state, so applications often create their own. That state should have limits, expiration, and cleanup rules so unexpected traffic cannot cause unbounded memory growth or stale trust assumptions.",
  "narrationPoints": [
    "Network location can be useful evidence, yet it is not the same as authorization for an application action.",
    "Trust decisions should not depend only on a datagram's apparent source address.",
    "The protocol should not treat every datagram that reaches the port as equally authorized.",
    "Correlation can help match responses to requests and keep state transitions clear.",
    "State tables and peer records should be bounded and cleaned up predictably."
  ]
};
