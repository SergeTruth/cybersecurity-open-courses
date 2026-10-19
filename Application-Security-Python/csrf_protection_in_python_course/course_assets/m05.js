window.COURSE_MODULE = {
  "title": "Cookies, SameSite, and Session Controls",
  "graphicAlt": "SameSite, Secure and HttpOnly strengthen session handling alongside CSRF token validation.",
  "narration": "CSRF depends heavily on how browsers handle credentials. Session cookies are especially important because they commonly represent the authenticated user in Python web applications. When the browser sends a session cookie automatically, the server may recognize the request as authenticated even though the request still needs to prove user intent.\n\nCookie attributes can reduce risk. SameSite settings can limit when cookies are sent in cross-site contexts. Secure helps ensure cookies are sent only over HTTPS. HttpOnly helps protect cookies from client-side script access. These controls are valuable because they strengthen the session boundary and reduce exposure from several directions.\n\nCookie settings are not always a complete replacement for CSRF tokens. Application architecture, browser behavior, legacy clients, subdomain relationships, embedded flows, and mixed authentication patterns can affect the protection model. Teams should avoid treating one cookie flag as a universal answer for every state-changing route.\n\nA strong Python application treats cookie settings as defense in depth alongside framework CSRF protection, secure session management, and careful request design. The practical review question is whether the application has multiple aligned controls: reasonable cookie attributes, consistent token validation, safe methods for state changes, and clear handling when validation fails.",
  "narrationPoints": [
    "CSRF depends heavily on how browsers handle credentials.",
    "Cookie attributes can reduce risk.",
    "Cookie settings are not always a complete replacement.",
    "A strong Python application treats cookie settings.",
    "SameSite settings can limit.",
    "HttpOnly helps protect cookies from client-side script."
  ]
};
