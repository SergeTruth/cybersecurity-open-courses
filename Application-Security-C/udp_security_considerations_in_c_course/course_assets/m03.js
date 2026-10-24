window.COURSE_MODULE = {
  "title": "Binding, Listening, and Endpoint Exposure",
  "graphicAlt": "Compare loopback-only listener boundary with multi-interface listener receiving broader network paths.",
  "narration": "Binding determines which interfaces and addresses can receive UDP traffic. A listener bound only to a loopback address has a different exposure profile from a listener bound to every interface. A service reachable only inside a controlled environment has different assumptions from one that can receive datagrams from broader networks.\n\nListening on all interfaces can expose a UDP service more broadly than intended. This can happen quietly when the same binary moves from a developer machine to a server with multiple interfaces, container networking, overlay networks, or network segments the developer did not think about during testing.\n\nPort choices, service accounts, firewall assumptions, container networking, orchestration rules, and deployment configuration all affect exposure. The binding call is part of the boundary, but it is not the whole boundary. The code and the deployment model need to agree on where the service is supposed to listen.\n\nLeast privilege matters even for network listeners. The process should have only the local permissions and storage access required for the UDP workflow. If message handling fails or an unexpected datagram reaches a sensitive path, a restricted service account and controlled storage layout reduce potential impact.\n\nEndpoint exposure should be reviewed against the intended deployment model. Reviewers should ask which addresses are reachable, which networks can send datagrams, what surrounding network controls are assumed, and whether the service behaves safely when unrelated or malformed traffic reaches the port.",
  "narrationPoints": [
    "A listener bound only to a loopback address has a different exposure profile from a listener bound to every interface.",
    "The binding call is part of the boundary, but it is not the whole boundary.",
    "The code and the deployment model need to agree on where the service is supposed to listen.",
    "The process should have only the local permissions and storage access required for the UDP workflow.",
    "Reviewers should ask which addresses are reachable, which networks can send datagrams, what surrounding network controls are assumed."
  ]
};
