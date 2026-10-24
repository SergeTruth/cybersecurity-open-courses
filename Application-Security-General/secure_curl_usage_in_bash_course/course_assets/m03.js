window.COURSE_MODULE = {
  "title": "TLS, Certificates, and Transport Trust",
  "graphicAlt": "A managed trust store supports certificate verification between the client and expected service, without a bypass path.",
  "narration": "When curl connects over HTTPS, certificate validation helps confirm that the script is communicating with the expected service through a protected channel. That trust check is part of the security design, not a cosmetic feature.\n\nDisabling verification can make a failing script appear to work, but it removes an important control. In automation, that is especially risky because there may be no person watching the request. A job may send credentials, payloads, or downloaded output through a channel it has not properly verified.\n\nInternal services sometimes use private certificate authorities or managed trust stores. That is normal, but it should be handled deliberately. The better pattern is to configure the appropriate trust store or CA bundle for the environment, not to bypass verification because the script runs on an internal network.\n\nProxies and inspection systems also affect transport trust. A corporate proxy, service mesh, or inspection gateway may terminate or reissue certificates. Scripts should be reviewed with those network assumptions in mind so teams understand what identity is actually being trusted.\n\nTransport trust should be explicit in the runbook and script design. If a certificate changes, a CA rotates, or a proxy path changes, that should be treated as an operational event. Secure curl automation keeps verification enabled and manages trust intentionally.",
  "narrationPoints": [
    "When curl connects over HTTPS, certificate validation helps confirm that the script is communicating with the expected service through a protected channel.",
    "Disabling verification can make a failing script appear to work, but it removes an important control.",
    "Internal services sometimes use private certificate authorities or managed trust stores.",
    "Proxies and inspection systems also affect transport trust.",
    "Transport trust should be explicit in the runbook and script design.",
    "In automation, that is especially risky because there may be no person watching the request."
  ]
};
