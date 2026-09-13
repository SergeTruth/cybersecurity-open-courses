window.COURSE_MODULE = {
  "title": "Firmware Assets, Boundaries, and Lifecycle Risk",
  "graphicAlt": "Device assets are mapped against wireless, service, update, and physical-access boundaries across manufacturing, operation, and retirement.",
  "narration": "Secure firmware starts with a clear model of assets and trust boundaries. A device may protect keys, configuration, measurements, user data, safety-relevant outputs, network identity, intellectual property, service availability, or the integrity of actions it performs in the physical world.\n\nBoundaries appear across the entire product lifecycle. Boot, runtime commands, update handling, provisioning, manufacturing, diagnostics, debug, cloud communication, local service tools, field maintenance, and end-of-life handling can each introduce assumptions. If those assumptions stay informal, they are difficult to test and easy to forget.\n\nPhysical access assumptions should be stated rather than silently inherited. Some devices operate in controlled facilities. Others are installed in public, customer, remote, or mobile environments. The expected access model influences debug policy, key storage, diagnostic behavior, update recovery, and what data should remain on the device.\n\nInterfaces should be reviewed as part of the same map. Local buttons, wired buses, wireless links, service ports, maintenance commands, update channels, cloud APIs, storage media, and manufacturing tools may all affect device behavior. Even interfaces that are not internet-facing can become important if they influence configuration, identity, or update state.\n\nA useful firmware threat model does not need dramatic language. It needs to turn lifecycle assumptions into engineering requirements that can be implemented, reviewed, tested, and maintained. The result should help teams decide what to validate, what to log, what to bound, what to protect, and what evidence to keep for support and security review.",
  "narrationPoints": [
    "Secure firmware starts with a clear model of assets.",
    "Boundaries appear across the entire product lifecycle.",
    "Physical access assumptions should be stated rather than.",
    "Interfaces should be reviewed as part of the same map.",
    "A useful firmware threat model does not need dramatic.",
    "If those assumptions stay informal."
  ]
};
