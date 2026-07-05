window.COURSE_MODULE = {
  "title": "Inspecting Packets and Protocol Layers",
  "graphicAlt": "Conceptual visual of packet layers and fields being inspected carefully.",
  "narration": "When you inspect a packet, read it as a stack of layers. Start with the frame information, then move through link, network, transport, and application layers when they are present. In many beginner captures, you will see Ethernet, IP, TCP or UDP, and then a higher-level protocol such as DNS, HTTP, TLS, or another application protocol.\n\nSource and destination fields tell you direction. At the IP layer, the source address is the system that sent the packet and the destination address is the system it was sent to. At the TCP or UDP layer, ports help identify the service or application conversation. A destination port of 443 commonly suggests encrypted web traffic, but remember that ports are clues, not absolute proof of application behavior.\n\nProtocol fields give more detail. In TCP, flags help show whether a connection is being established, acknowledged, or closed. Sequence and acknowledgment values help Wireshark track order and reliability. Retransmissions may suggest loss or delay, but they need context. In DNS, queries and responses show names, record types, response codes, and returned addresses. In HTTP, if visible in an approved lab capture, requests and response codes can help explain application behavior.\n\nAvoid building a conclusion from one packet alone. One SYN packet can show that a connection attempt was made, but the next packets tell you whether it was answered. One DNS response can show a returned address, but related queries may show retries, failures, or alternate names. One error-looking field may be normal for that protocol or that environment.\n\nA careful analyst compares related packets, checks timestamps, and separates observation from interpretation. Say what the packet shows first. Then explain what it may mean. If you are not sure, write down the uncertainty. Packet fields are precise, but conclusions still depend on context.",
  "narrationPoints": [
    "Packets contain layers and fields.",
    "Source and destination show communication direction.",
    "Ports and protocols help identify services.",
    "One packet rarely tells the whole story.",
    "Compare related packets before concluding."
  ]
};
