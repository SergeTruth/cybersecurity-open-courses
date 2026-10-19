window.COURSE_MODULE = {
  "title": "Cookies and Browser Session Controls",
  "graphicAlt": "Cookie transport, script visibility, cross-site behavior, scope and lifetime complement request protections.",
  "narration": "Browser sessions often depend on cookies, so cookie settings are part of application security. A session cookie may carry a session identifier, a signed session value, or a reference to server-side state. The browser will send cookies according to domain, path, expiration, and security attributes. If those settings are too broad or inconsistent with the application's authentication model, authenticated state can travel farther than intended.\n\nSecure cookie attributes help control how cookies are transmitted or accessed in browser contexts. The Secure attribute concept is about sending cookies only over protected transport. HttpOnly concepts reduce unnecessary access to certain cookies from client-side scripts. SameSite concepts help control when cookies are sent with cross-site requests. These attributes are not magic, but they are important layers when matched to the application's domain and cross-site behavior.\n\nCookie scope deserves careful review. Domain and path settings should be no broader than necessary. Expiration should match the intended session lifetime. A cookie used for one application should not accidentally be shared with unrelated applications on the same parent domain. If an application intentionally spans multiple subdomains or external identity flows, cookie and redirect behavior should be designed rather than discovered by trial and error.\n\nBrowser storage risks should also be considered at a high level. Sensitive session values should not be exposed unnecessarily to client-side scripts or stored in places where unrelated scripts can read them. CSRF concepts matter when browsers automatically attach cookies to requests. The stable defensive principle is to align cookie settings, request protections, server-side authorization, and session lifecycle so that browser convenience does not become unintended authority.",
  "narrationPoints": [
    "Browser sessions often depend on cookies.",
    "Secure cookie attributes help control how cookies.",
    "Cookie scope deserves careful review.",
    "Browser storage risks should also be considered at a high.",
    "Domain and path settings should be no broader than.",
    "Expiration should match the intended session lifetime."
  ]
};
