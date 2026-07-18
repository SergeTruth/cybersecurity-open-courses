window.COURSE_MODULE = {
  "title": "Hunting for Unauthorized Access",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "Unauthorized-access hunts examine whether people or systems reached OT assets outside approved identity, path, time, or privilege. Start with the authorized-access model: which vendors, employees, service accounts, jump hosts, VPNs, destinations, and maintenance windows are expected.\n\nReview remote-access and VPN sessions for unusual source systems, locations, login times, duration, and targets. Correlate jump-host activity with identity events, ticket approval, firewall connections, and destination logs. A successful session without a corresponding work record may require validation.\n\nShared accounts complicate attribution. Hunters should identify where they remain, whether use can be tied to an individual session, and whether privilege exceeds the task. Service accounts deserve separate baselines because interactive or cross-zone use may be unexpected.\n\nLook for access that bypasses managed entry points, originates from an unapproved workstation, reaches an unusual asset, or continues beyond the authorized window. Failed logons, privilege changes, and access after account expiration can add context, but none proves intent by itself.\n\nCoordinate findings with operations and the access owner. Emergency support, outages, or field work may explain unusual timing. Preserve session and approval evidence before it expires, and avoid terminating active access without understanding process consequence.\n\nThe hunt should conclude with affected accounts and assets, evidence, confidence, and recommended follow-up. Findings may improve access policy, account ownership, monitoring, vendor procedures, and detections for future unauthorized pathways.",
  "narrationPoints": [
    "Unauthorized-access hunts examine whether people or systems reached OT assets outside approved identity, path, time, or privilege.",
    "Start with the authorized-access model: which vendors, employees, service accounts, jump hosts, VPNs, destinations, and maintenance windows are expected.",
    "Review remote-access and VPN sessions for unusual source systems, locations, login times, duration, and targets.",
    "Correlate jump-host activity with identity events, ticket approval, firewall connections, and destination logs.",
    "A successful session without a corresponding work record may require validation.",
    "Shared accounts complicate attribution."
  ]
};
