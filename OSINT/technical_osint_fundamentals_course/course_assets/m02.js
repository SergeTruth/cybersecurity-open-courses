window.COURSE_MODULE = {
  "title": "Domains and Naming",
  "narration": "A domain name provides a human-readable label within the Domain Name System. A registered domain can contain subdomains such as app.example.com or mail.example.com. Organizations use naming to organize services, environments, regions, products, and third-party integrations.\n\nRegistrars manage registration relationships, while name servers publish authoritative DNS information for a domain. Administrative arrangements can change over time. Public registration details may be privacy-protected, incomplete, or maintained by a service provider rather than the operational team.\n\nNaming patterns can help defenders recognize likely services or environments, but labels are not proof. A name containing dev may host production traffic, remain unused, or point to a vendor. Analysts should document the literal name separately from any interpretation.\n\nAbandoned or forgotten names create operational and brand risk. Records can outlive projects, vendors, or cloud resources. A stale name may confuse customers, expose old documentation, or point toward infrastructure no longer governed by the expected owner.\n\nDomain data is time-sensitive. Registrations, name servers, DNS answers, and ownership arrangements change. Preserve observation dates and historical context. A current lookup should not be used to rewrite what was true during an earlier event.\n\nUse domain information to form defensible questions: Is the asset in the internal inventory? Is there an assigned owner? Is the record still needed? Confirm through authorized organizational records before labeling a domain as rogue, compromised, or controlled by a specific party.",
  "narrationPoints": [
    "A domain name provides a human-readable label within the Domain Name System.",
    "Registrars manage registration relationships, while name servers publish authoritative DNS information for a domain.",
    "Naming patterns can help defenders recognize likely services or environments, but labels are not proof.",
    "Abandoned or forgotten names create operational and brand risk.",
    "Domain data is time-sensitive.",
    "Use domain information to form defensible questions: Is the asset in the internal inventory?"
  ],
  "graphicAlt": "Blank course graphic placeholder"
};
