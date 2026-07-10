window.COURSE_MODULE = {
  "title": "Threat Modeling and Secure Design",
  "graphicAlt": "Blank placeholder image for a lesson on threat modeling and secure design.",
  "narration": "Threat modeling is a structured way to identify what can go wrong before code is written or before a major change is released. It examines assets, trust boundaries, data flows, entry points, identities, dependencies, and sensitive operations. The value is not the diagram itself. The value is the engineering conversation that reveals assumptions, unclear ownership, and design choices that can reduce risk early.\n\nTrust boundaries are especially important. They show where data, identity, permissions, or assumptions change. A browser to API call crosses a boundary. A public endpoint to an internal service crosses another. A low-privilege user action that reaches an administrative function crosses a sensitive boundary. Once these transitions are visible, teams can reason about validation, authentication, authorization, logging, and failure behavior.\n\nCommon design concerns include authentication, authorization, input handling, secrets, logging, error handling, data storage, APIs, integrations, and administrative functions. Misuse cases help teams ask how legitimate features could be used in unintended ways. Design reviews then connect those risks to practical choices, such as narrowing permissions, separating duties, limiting data exposure, or adding monitoring around sensitive actions.\n\nThreat modeling should be practical, iterative, and tied to engineering decisions. It does not have to be a ceremonial meeting for every small change. It can be a lightweight discussion for routine work and a deeper review for high-risk features, new trust boundaries, sensitive data, or major architecture changes. Secure architecture reduces risk before implementation locks in expensive assumptions.",
  "narrationPoints": [
    "Threat modeling is a structured way to identify what can go wrong before code is written or before a major change is released.",
    "It examines assets, trust boundaries, data flows, entry points, identities, dependencies, and sensitive operations.",
    "The value is not the diagram itself.",
    "The value is the engineering conversation that reveals assumptions, unclear ownership, and design choices that can reduce risk early.",
    "Trust boundaries are especially important.",
    "They show where data, identity, permissions, or assumptions change."
  ]
};
