window.COURSE_MODULE = {
  "title": "Common Session Security Risks",
  "graphicAlt": "Blank placeholder graphic for module 5, Common Session Security Risks.",
  "narration": "Session security risks usually come from weak identifiers, weak storage, long exposure windows, or incomplete lifecycle handling. Predictable session identifiers can undermine the entire authentication model. Excessive session lifetimes increase the value of a stale or exposed session. Improper logout can leave an old session usable longer than the user expects. Insecure storage can expose tokens to places the application did not intend.\n\nSession fixation and session hijacking are important concepts to understand defensively. Session fixation involves an attempt to make a victim use a known session identifier. Session hijacking is unauthorized use of another user?s active session. This course does not teach techniques for either behavior. The defensive lesson is that applications should rotate identifiers at authentication, protect cookies and tokens, validate sessions server-side, expire sessions appropriately, and watch for unusual session activity.\n\nUsability and security often need balance. A very short timeout may frustrate users and increase risky workarounds. A very long timeout may leave accounts exposed on shared or lost devices. Concurrent sessions may be convenient, but they also require visibility and control. The best design is risk-based: administrative actions, financial workflows, account recovery, sensitive data access, and privilege changes usually deserve stronger session controls than ordinary low-risk navigation.",
  "narrationPoints": [
    "Session security risks usually come from weak identifiers, weak storage, long exposure windows, or incomplete lifecycle handling.",
    "Session fixation and session hijacking are important concepts to understand defensively.",
    "Usability and security often need balance."
  ]
};
