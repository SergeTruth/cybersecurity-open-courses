window.COURSE_MODULE = {
  "title": "Conversations, Streams, and Statistics",
  "graphicAlt": "Conceptual visual of related conversations, streams, and traffic statistics.",
  "narration": "After you understand individual packets, Wireshark can help you group related traffic. Conversations show communication pairs, such as two IP addresses or two TCP endpoints. This is useful when a capture has many packets and you need to see which systems talked the most, which ports were involved, or which pair deserves deeper inspection.\n\nStreams are another way to follow related packet sequences. Following a TCP stream can present the application conversation in order when that content is visible and when you are authorized to view it. This can be helpful in an approved lab or troubleshooting capture, but it must be handled carefully. Streams may reveal sensitive data. If private data, credentials, tokens, cookies, or personal information appear, protect the capture and report only what policy allows.\n\nWireshark statistics provide summary views. Protocol hierarchy shows the mix of protocols in the capture. Endpoints show communicating systems. Conversations show pairs of systems and ports. I/O graphs can show traffic volume over time. Expert information can point out conditions Wireshark noticed, such as retransmissions or malformed packets.\n\nThese views are investigation guides, not final proof. A large number of packets to one endpoint may be normal for a file transfer. A warning may be caused by capture loss rather than a real network fault. A protocol count may reflect where you captured, not the whole environment. Use summaries to decide where to inspect more deeply.\n\nA practical pattern is to start with a question, look at a statistic that might narrow the field, apply a display filter, inspect packets, and then return to the summary if needed. This back-and-forth keeps the work grounded. You are not trying to make the statistics tell the whole story. You are using them to find the packets that can support a careful explanation.",
  "narrationPoints": [
    "Conversations group related traffic.",
    "Streams help review related packet sequences.",
    "Statistics summarize traffic patterns.",
    "Summaries guide deeper inspection.",
    "Statistics need context before conclusions."
  ]
};
