window.COURSE_MODULE = {
  "title": "DNS and Infrastructure Clues",
  "narration": "DNS maps names to services and publishes supporting information. An A record maps a name to an IPv4 address, while an AAAA record maps it to IPv6. A CNAME record aliases one name to another, often revealing a hosted platform or service dependency.\n\nMX records identify mail exchangers. NS records identify authoritative name servers. TXT records carry text used for purposes such as domain verification, email-security policy, and service configuration. A TXT value should be interpreted according to its specific standard and context.\n\nTogether, records can describe public service names, mail providers, verification relationships, and third-party dependencies. They can also expose stale configurations or inconsistent ownership that deserves internal review.\n\nInterpret DNS cautiously. Records may be cached, changed, split by resolver location, fronted by a proxy, or delegated to a provider. One destination can serve many customers, and one service can use many addresses. A record is an observed configuration, not automatic proof of who operates the underlying system.\n\nTime matters. Note when the record was observed and whether the source represents current, historical, passive, or authoritative data. Independent sources with different collection paths can increase confidence, but repeated copies of one record are not independent corroboration.\n\nDefensive analysis should reconcile public DNS with approved asset inventories, service owners, and vendor records. The useful outcome is a documented question or remediation item, not an unsupported conclusion based on a single lookup.",
  "narrationPoints": [
    "DNS maps names to services and publishes supporting information.",
    "MX records identify mail exchangers.",
    "Together, records can describe public service names, mail providers, verification relationships, and third-party dependencies.",
    "Interpret DNS cautiously.",
    "Time matters.",
    "Defensive analysis should reconcile public DNS with approved asset inventories, service owners, and vendor records."
  ],
  "graphicAlt": "Blank course graphic placeholder"
};
