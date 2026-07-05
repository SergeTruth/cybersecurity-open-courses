window.COURSE_MODULE = {
  "title": "The Wireshark Interface",
  "graphicAlt": "Conceptual visual of the Wireshark interface with packet list, details, and bytes areas.",
  "narration": "The Wireshark interface is built around three main panes. The packet list is the timeline of captured traffic. Each row is one packet, usually with columns such as number, time, source, destination, protocol, length, and a short information summary. This pane is where you notice patterns: bursts of traffic, repeated requests, retransmissions, protocol changes, or communication with an unexpected address.\n\nThe packet details pane is where Wireshark decodes the selected packet into protocol layers and fields. You can expand Ethernet, IP, TCP, UDP, DNS, HTTP, TLS, and other layers when they are present. This is the pane you use to answer detailed questions. What was the source address? What was the destination port? Was this a DNS query or a DNS response? Which TCP flags were set? Which field supports the observation you are about to write down?\n\nThe packet bytes pane shows the raw packet data. Beginners do not need to read every byte manually, but it is useful to know that the decoded fields are based on this underlying data. When you click a field in packet details, Wireshark can highlight the related bytes. That connection helps you understand that the display is not a separate story. It is an interpretation of captured bytes.\n\nWireshark also gives visual aids. Coloring rules can make common traffic patterns easier to scan. Columns can be customized to bring useful fields forward. The status bar can show profile, packet counts, and filter feedback. These aids are helpful, but they are not conclusions.\n\nA dependable workflow moves from overview to detail. First scan the packet list. Then select a packet that appears relevant. Expand the layers in packet details. Read the fields carefully. Compare the packet to its neighbors. This rhythm keeps you from overreacting to one row or one color.",
  "narrationPoints": [
    "The packet list shows captured packets.",
    "Packet details show decoded protocol layers.",
    "Packet bytes show raw packet data.",
    "Columns and colors help guide attention.",
    "Good analysis moves from overview to detail."
  ]
};
