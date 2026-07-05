window.COURSE_CODE_MODULE = {
  "title": "Summary Examples",
  "codeIntro": "These read-only examples use tshark against an approved local capture file. They summarize traffic so the analyst can decide where to inspect more deeply.",
  "codeExamples": [
    {
      "title": "Traffic Summary Commands",
      "language": "bash",
      "blurb": "Summary views are investigation guides, not final proof. Use them to choose the next packet-level review step.",
      "code": `# Protocol hierarchy summary
tshark -r approved_lab_capture.pcapng -q -z io,phs

# IP endpoint summary
tshark -r approved_lab_capture.pcapng -q -z endpoints,ip

# TCP conversation summary
tshark -r approved_lab_capture.pcapng -q -z conv,tcp`
    },
    {
      "title": "Focused Field Export",
      "language": "bash",
      "blurb": "Export only the fields needed for an approved defensive question, and protect the output like the original capture.",
      "code": `tshark -r approved_lab_capture.pcapng \\
  -Y "dns && ip.addr == 192.0.2.10" \\
  -T fields \\
  -e frame.time \\
  -e ip.src \\
  -e ip.dst \\
  -e dns.qry.name \\
  -e dns.flags.rcode`
    }
  ]
};
