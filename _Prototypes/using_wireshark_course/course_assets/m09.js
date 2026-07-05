window.COURSE_MODULE = {
  "title": "Course Summary: A Repeatable Wireshark Workflow",
  "graphicAlt": "Conceptual visual of a repeatable Wireshark analysis workflow.",
  "narration": "A repeatable Wireshark workflow begins before the first packet is opened. Start with a clear defensive question. What are you trying to understand? Is a client reaching the expected server? Is name resolution working? Is a connection being established? Is traffic repeating, failing, or taking longer than expected? A clear question gives your analysis direction.\n\nNext, confirm authorization and scope. Know which network, device, interface, time window, and purpose are approved. When learning, prefer approved capture files and lab traffic. When capturing live traffic, collect only what you are allowed to collect and only long enough to answer the question. Record context while you capture so the packet timestamps have meaning later.\n\nThen move through the interface deliberately. Use the packet list for the timeline and overview. Use display filters to reduce noise without removing packets from the file. Inspect packet details to read protocol layers and fields. Use the packet bytes pane as a reminder that the decoded view comes from captured data. Compare related packets before concluding. One field may be useful, but a sequence usually tells the stronger story.\n\nUse conversations, streams, and statistics to summarize patterns and guide deeper review. These tools can show endpoints, protocol mix, traffic volume, and related packet sequences. They help you decide where to look next, but they do not replace packet-level evidence or environmental context.\n\nFinally, preserve and report responsibly. Save the original capture according to policy. Protect sensitive data. Document the question, scope, filters, packets reviewed, observations, interpretations, uncertainty, and next steps. Avoid overclaiming. Wireshark is powerful because it lets you see details, but skill comes from careful, ethical, repeatable analysis.",
  "narrationPoints": [
    "Start with a clear defensive question.",
    "Confirm authorization and scope.",
    "Filter, inspect, and compare packets.",
    "Use statistics to guide deeper review.",
    "Preserve evidence and report responsibly."
  ]
};
