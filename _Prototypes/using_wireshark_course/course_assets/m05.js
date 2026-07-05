window.COURSE_MODULE = {
  "title": "Display Filters and Capture Filters",
  "graphicAlt": "Conceptual visual comparing display filters with capture filters.",
  "narration": "Filters are one of the first skills that make Wireshark usable. The important beginner distinction is between display filters and capture filters. A display filter changes which captured packets are shown on the screen. The packets remain in the file. You can clear the filter and return to the full capture. A capture filter changes what is collected in the first place. Packets excluded by a capture filter are not available later.\n\nDisplay filters are usually safer while you are exploring. If you want to focus on TCP traffic, you can use tcp. If you want UDP, use udp. For DNS, use dns. For HTTP, use http when that protocol is visible. To focus on a host, a beginner-friendly example is ip.addr == 192.0.2.10. To focus on a service port, you might use tcp.port == 443. To look for a simple approved test string in packet data, frame contains \"example\" can be useful in a lab capture. These examples are for defensive analysis of authorized traffic.\n\nA display filter should match your question. If the question is whether a device queried DNS, filtering on dns makes sense. If the question is whether a connection to a server was attempted, filtering on the server IP address or TCP port may help. If the filter returns nothing, that is information, but it is not automatically proof. The capture point, timing, and protocol behavior still matter.\n\nCapture filters can reduce noise and file size, but they require more care. If you filter too narrowly at capture time, you may exclude packets that would have explained the issue. For beginners, it is often better to capture within a clear authorized scope, then use display filters for analysis.\n\nGood filtering is not about hiding data you do not like. It is about reducing noise while preserving the evidence needed to answer the question.",
  "narrationPoints": [
    "Display filters change what you see.",
    "Capture filters change what you collect.",
    "Display filters are safer for exploration.",
    "Capture filters reduce noise but can miss evidence.",
    "Filters should match the analysis question."
  ]
};
