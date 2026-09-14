window.COURSE_MODULE = {
  "title": "What Is Content Security Policy?",
  "graphicAlt": "The application delivers a CSP that the browser enforces for resource loading and execution, adding defense in depth while blocked resources stop at the policy boundary.",
  "narration": "Content Security Policy, usually called CSP, is a browser-enforced security policy delivered by a web application. The application tells the browser which resource sources are expected for a page, and the browser uses that policy when loading or executing scripts, styles, images, fonts, frames, connections, and other resources. CSP is powerful because enforcement happens in the browser, close to the place where many frontend injection problems become visible.\n\nA CSP does not make insecure code safe by itself. It is a defense-in-depth control. Output encoding, safe templates, input validation, secure framework use, dependency management, and careful frontend architecture still matter. CSP helps reduce the impact of some injection conditions by limiting what the browser is allowed to execute or load. If an attacker-controlled string reaches the page, a strong CSP can make successful script execution harder and easier to detect.\n\nDevelopers should think of CSP as a contract between the application and the browser. The policy says which scripts are expected, which style sources are acceptable, where images and fonts may come from, which APIs the page may connect to, and which frames or forms are allowed. A useful policy reflects the application architecture. It is specific enough to reduce risk, flexible enough to support legitimate behavior, and maintained as the frontend changes.",
  "narrationPoints": [
    "Content Security Policy, usually called CSP, is a browser-enforced security policy delivered by a web application.",
    "A CSP does not make insecure code safe by itself.",
    "Developers should think of CSP as a contract between the application and the browser."
  ]
};
