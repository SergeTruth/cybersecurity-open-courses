window.COURSE_MODULE = {
  "title": "What Wireshark Helps You See",
  "graphicAlt": "Conceptual visual of a packet analysis workflow moving from network traffic to evidence.",
  "narration": "Wireshark is a packet analyzer. It lets an analyst look closely at network traffic that has been captured from an authorized source, such as an approved lab system, a test environment, or a troubleshooting capture that falls inside an assigned scope. The basic unit you inspect is a packet. A packet is a small unit of communication that carries addressing information, protocol information, and often part of an application exchange.\n\nFor defensive work, Wireshark helps turn vague network questions into observable evidence. You might ask whether a device is talking to the host you expect, whether DNS is resolving a name correctly, whether a TCP connection is being established, whether traffic is retransmitting, or whether an application is using the protocol and port you expected. Wireshark does not answer those questions by itself. It gives you the packets, fields, timestamps, and relationships that help you reason carefully.\n\nThat distinction matters. A capture shows what was observed at a particular capture point during a particular time window. It may not show traffic that took a different path. It may not show decrypted application content. It may be missing packets because of timing, loss, capture filters, or interface limitations. Good packet analysis starts by writing down the question, the capture point, and the assumptions you are making.\n\nAs you work, treat Wireshark as an evidence viewer rather than a guessing tool. Start broad, then narrow. Look at the packet list to understand the flow of traffic. Use packet details to inspect fields and protocol layers. Use filters to reduce noise. Compare related packets before making a conclusion. The goal is not to find a dramatic answer quickly. The goal is to build a careful explanation that another analyst could follow and repeat.",
  "narrationPoints": [
    "Wireshark shows captured network packets in detail.",
    "Packets help explain how systems communicate.",
    "Defensive analysis starts with a clear question.",
    "Wireshark shows evidence, not guesses.",
    "Context keeps packet analysis accurate."
  ]
};
