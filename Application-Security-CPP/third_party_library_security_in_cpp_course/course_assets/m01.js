window.COURSE_MODULE = {
  "title": "Why Third-Party Library Security Matters",
  "graphicAlt": "A dependency enters product behavior with explicit purpose, version, configuration and ownership.",
  "narration": "Third-party libraries become part of the trusted computing base of a C++ product. They may parse files, handle network input, process images, perform compression, manage cryptography, allocate memory, expose native APIs, or influence runtime behavior. When a library is linked into the application, the product inherits more than a convenient feature. It also inherits assumptions about quality, configuration, update cadence, and operational support.\n\nA defect or unsafe default in a dependency can become a product defect. A version change can alter behavior. A build option can enable an unneeded parser, disable a defensive check, or select a different backend. ABI mismatches and runtime loading differences can create unstable behavior that only appears in deployed artifacts. That is why dependency security cannot be separated from build security, release engineering, and application design.\n\nThe goal is not to avoid dependencies entirely. Modern C++ teams reasonably rely on proven libraries for parsing, networking, storage, math, cryptography, and platform integration. The security question is whether those libraries are selected, integrated, monitored, updated, and governed deliberately. Convenience can start the conversation, but it should not be the final approval criterion.\n\nA secure dependency program asks practical questions before and after integration. Who owns this library? What purpose does it serve? Where did it come from? Which version is used? Which features are enabled? How will updates be evaluated? How will the application contain risky API behavior? Good answers turn third-party code from a hidden assumption into a managed engineering asset.",
  "narrationPoints": [
    "When a library is linked into the application, the product inherits more than a convenient feature.",
    "A build option can enable an unneeded parser, disable a defensive check, or select a different backend.",
    "A defect or unsafe default in a dependency can become a product defect.",
    "Convenience can start the conversation, but it should not be the final approval criterion.",
    "The security question is whether those libraries are selected, integrated, monitored, updated, and governed deliberately.",
    "A secure dependency program asks practical questions before and after integration."
  ]
};
