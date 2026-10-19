window.COURSE_MODULE = {
  "title": "What CSRF Is and Why It Matters",
  "graphicAlt": "A state-changing request requires session authentication and expected-flow validation; a cookie alone is insufficient.",
  "narration": "Cross-Site Request Forgery is a browser and session-based risk. At a defensive level, the issue is that a browser may send an authenticated request that does not represent the user's intended action inside the trusted application flow. The browser is doing what browsers normally do: attaching matching credentials, especially cookies, to requests for the destination site.\n\nThis distinction matters because authentication and intent are not the same thing. A valid session cookie can prove that the browser has an authenticated session, but it does not automatically prove that the user intentionally submitted a specific state-changing action. If an application treats the cookie alone as enough evidence, sensitive operations may lack an important layer of request validation.\n\nIn Python web applications, CSRF review matters for workflows that change server-side state. Account updates, profile changes, payment settings, administrative actions, password or email changes, workflow approvals, and configuration changes all deserve attention. The concern is not ordinary page viewing. The concern is an authenticated browser request that causes the server to create, update, delete, approve, configure, or submit something meaningful.\n\nThe defensive goal is straightforward: make state-changing requests prove both authentication and user intent. A secure design uses framework protections, request semantics, token validation, cookie controls, and review discipline so that the server can distinguish an expected application flow from a request that merely arrived with a session cookie.",
  "narrationPoints": [
    "Cross-Site Request Forgery is a browser and session-based.",
    "This distinction matters.",
    "In Python web applications.",
    "The defensive goal is straightforward: make state-changing.",
    "A secure design uses framework protections.",
    "The browser is doing what browsers normally do: attaching."
  ]
};
