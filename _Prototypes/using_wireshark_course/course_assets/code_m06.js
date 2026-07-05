window.COURSE_CODE_MODULE = {
  "title": "Packet Field Examples",
  "codeIntro": "These examples focus on packet fields that help an analyst move from a packet-list row to a specific observation.",
  "codeExamples": [
    {
      "title": "Field-Focused Display Filters",
      "language": "text",
      "blurb": "Use field names to test a specific question, then compare related packets before making a conclusion.",
      "code": `ip.src == 192.0.2.10
ip.dst == 198.51.100.20
tcp.flags.syn == 1
tcp.flags.ack == 0
tcp.analysis.retransmission
dns.qry.name contains "example"
dns.flags.rcode != 0`
    }
  ]
};
