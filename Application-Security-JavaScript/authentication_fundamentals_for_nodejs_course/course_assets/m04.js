window.COURSE_MODULE = {
  "title": "Sessions, Cookies, and Browser-Based Login",
  "graphicAlt": "A browser sends a session identifier over HTTPS while trusted identity and lifecycle state remain in the server-side session store.",
  "narration": "In a browser-based login flow, the session and the cookie are related but not the same thing. A server-side session stores trusted authentication state on the server or in a protected backing store. The browser usually receives a session identifier in a cookie. That identifier is a bearer secret. Whoever can use it may be treated as the authenticated user, so protecting it is just as important as protecting the original login credential.\n\nAuthentication cookies should use attributes that match the deployment and risk model. HttpOnly helps keep the cookie out of normal client-side JavaScript. Secure limits transmission to HTTPS contexts. SameSite can reduce some cross-site request behavior. Domain and path determine where the cookie is sent. Expiration and renewal policy shape session lifetime. HTTPS is required to protect credentials and session identifiers in transit, especially behind reverse proxies and load balancers.\n\nSession lifecycle should be deliberate: creation, expiration, renewal, logout, revocation, and regeneration after important authentication or privilege events. A password change, MFA reset, role change, account disablement, or suspicious activity may require revoking existing sessions or forcing reauthentication. Session storage should be reliable, protected, and appropriate for the deployment model. When cookie-based authentication is used, CSRF risk must be evaluated for state-changing requests.",
  "narrationPoints": [
    "In a browser-based login flow.",
    "Authentication cookies should use attributes that match.",
    "Session lifecycle should be deliberate: creation.",
    "HTTPS is required to protect credentials and session.",
    "Session storage should be reliable.",
    "When cookie-based authentication is used."
  ]
};
