window.COURSE_MODULE = {
  "title": "Threat Modeling Embedded Rust Systems",
  "graphicAlt": "A device threat model identifies assets, exposed interfaces, physical-access assumptions, and lifecycle requirements.",
  "narration": "Embedded security begins with a realistic threat model. Before choosing controls, the team should understand what the device protects, what it controls, what data it stores, what interfaces it exposes, and how it is manufactured, updated, serviced, and retired.\n\nA device may include local physical access, maintenance connectors, serial ports, wireless interfaces, cloud connections, removable media, service commands, manufacturing credentials, field-update paths, and safety-critical outputs. Rust helps reduce some implementation risk, but it does not choose the architecture or define which interfaces should exist.\n\nPhysical access assumptions need to be explicit. Some products assume devices are in controlled facilities. Others assume they may be handled by customers, technicians, or untrusted parties. The design should state what physical access means for debug policy, key storage, update behavior, data retention, and recovery.\n\nA useful threat model turns assumptions into reviewable requirements. Boot, update, debug, configuration, storage, communications, diagnostics, and recovery behavior should each have requirements that can be tested. The point is not to predict every possible failure; it is to make important assumptions visible before firmware design hardens around them.\n\nEmbedded systems also blend safety, reliability, and security. A malformed message, resource leak, failed update, or unclear recovery path can become a security concern when it affects device availability or safe operation. Good threat modeling keeps these concerns connected instead of treating them as separate checklists.",
  "narrationPoints": [
    "Embedded security begins with a realistic threat model.",
    "A device may include local physical access.",
    "Physical access assumptions need to be explicit.",
    "A useful threat model turns assumptions into reviewable.",
    "Embedded systems also blend safety.",
    "Rust helps reduce some implementation risk."
  ]
};
