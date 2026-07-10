window.COURSE_MODULE = {
  "title": "What Are Security Headers?",
  "graphicAlt": "Blank placeholder image for What Are Security Headers?.",
  "narration": "HTTP response headers are instructions that a web application, web server, proxy, CDN, or platform sends with a response. Some headers describe content type and caching. Others tell browsers how the page is allowed to behave. Security headers are the subset that help browsers enforce safer behavior when they render pages, load resources, send requests, and decide whether content can be embedded or interpreted in a risky way.\n\nSecurity headers are defense-in-depth controls. They are not magic shields and they do not fix vulnerable code by themselves. They can, however, reduce the impact of common mistakes and make exploitation harder. A well-designed header set can reduce exposure to cross-site scripting, clickjacking, MIME sniffing, insecure transport, privacy leakage through referrers, and unnecessary browser feature access.\n\nThe important word is reduce. Headers work best when the application already uses secure coding, strong authentication, authorization checks, input validation, output encoding, secure session handling, dependency management, and careful deployment. A Content Security Policy can make some script injection harder to exploit, but it is not a substitute for output encoding. HSTS can enforce HTTPS in future browser visits, but it is not a replacement for certificate management.\n\nA mature header program starts with the application architecture. What domains host content. Which scripts are required. Which pages can be embedded. Which browser features are needed. Which partners legitimately frame or call the application. Once those requirements are clear, headers become a precise set of browser instructions rather than a copied list of fashionable settings.",
  "narrationPoints": [
    "HTTP response headers are instructions that a web application, web server, proxy, CDN, or platform sends with a response.",
    "Security headers are defense-in-depth controls.",
    "The important word is reduce.",
    "A mature header program starts with the application architecture."
  ]
};
