window.COURSE_MODULE = {
  "title": "Saving Evidence and Reporting Findings",
  "graphicAlt": "Conceptual visual of packet evidence being documented and reported responsibly.",
  "narration": "Packet analysis does not end when you find an interesting field. You need to preserve the evidence and communicate the finding responsibly. Keep the original capture in an approved location. If you create a filtered view, exported subset, screenshot, or packet excerpt, make sure it is allowed by policy and that it does not expose more data than needed.\n\nDocument what you did. A useful Wireshark note includes the analysis question, authorization or ticket reference when appropriate, scope, capture time, source of the capture, system or interface, filters used, packets reviewed, observations, interpretation, uncertainty, and recommended next step. This may sound like a lot, but it prevents confusion later. Another analyst should be able to understand how you moved from question to evidence.\n\nSeparate observations from interpretations. An observation is something the capture shows, such as a DNS query for a name, a TCP retransmission, or a response code in an approved lab capture. An interpretation is what you think that observation means, such as possible packet loss, a service not responding, or a misconfigured name. A recommendation is what should happen next, such as checking a server log, repeating the test from another capture point, or validating a configuration.\n\nBe careful with sensitive data. If a capture contains credentials, tokens, cookies, API keys, personal data, or private communications, protect it according to policy. Redact values in reports when the exact value is not necessary. Do not paste sensitive packet contents into places that are not approved for that data.\n\nGood reporting is disciplined and modest. A packet capture shows observed traffic. It may strongly support a conclusion, but it rarely explains every possible cause by itself. State what you know, what you do not know, and what evidence supports the next action.",
  "narrationPoints": [
    "Preserve original captures responsibly.",
    "Record scope, time, filters, and findings.",
    "Protect or redact sensitive packet data.",
    "Separate observations from interpretations.",
    "Reports should include uncertainty and next steps."
  ]
};
