window.COURSE_CODE_MODULE = {
  "title": "Filter Examples",
  "codeIntro": "Use these examples on approved capture files or authorized lab traffic. Display filters change what is shown; capture filters change what is collected.",
  "codeExamples": [
    {
      "title": "Beginner Display Filters",
      "language": "text",
      "blurb": "Display filters are good for exploration because they do not remove packets from the saved capture.",
      "code": `tcp
udp
dns
http
ip.addr == 192.0.2.10
tcp.port == 443
frame contains "example"`
    },
    {
      "title": "Capture Filter Comparison",
      "language": "text",
      "blurb": "Use capture filters carefully. Packets excluded during capture are not available later for review.",
      "code": `# Display filter examples, applied after capture:
ip.addr == 192.0.2.10
tcp.port == 443

# Capture filter examples, applied before collection:
host 192.0.2.10
tcp port 443

# Analyst checkpoint:
# If the question is still broad, prefer display filters first.`
    }
  ]
};
