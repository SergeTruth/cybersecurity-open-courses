window.COURSE_MODULE = {
  "title": "HTTP Exposure, Function URLs, and API Gateway",
  "graphicAlt": "API Gateway and function URLs need deliberate exposure policy, with local validation and authorization and separate browser-read controls.",
  "narration": "HTTP-triggered Lambda patterns are API surfaces. They may be exposed through API Gateway, Application Load Balancer, Lambda function URLs, or another front door. Public exposure should be deliberate, documented, and reviewed because it defines how users, services, and browsers can reach the function.\n\nFunction URLs can provide direct HTTP endpoints. They need authorization configuration and resource-based policy review because a direct endpoint can change who can invoke the function and how requests reach handler code. The chosen model should match the sensitivity of the operation.\n\nAPI Gateway can add controls such as authorizers, routing, throttling, request validation, custom domains, logging, and deployment stages when configured appropriately. IAM authorization, function URL policies, API keys, JWT authorizers, Lambda authorizers, and application authorization solve different problems and should not be treated as interchangeable.\n\nCORS controls browser cross-origin access. It is not authentication or authorization. Browser-facing endpoints may also need CSRF, cookie, redirect, TLS, security header, and rate-limit review depending on the design and where identity is enforced.\n\nRequest and response logging should avoid sensitive headers, cookies, tokens, authorization data, and raw request bodies. HTTP diagnostics should help operators understand routing, status, latency, and failure category without copying sensitive user or application data into logs.",
  "narrationPoints": [
    "Public exposure should be deliberate, documented, and reviewed because it defines how users, services.",
    "The chosen model should match the sensitivity of the operation.",
    "API Gateway can add controls such as authorizers, routing, throttling, request validation, custom domains.",
    "Browser-facing endpoints may also need CSRF, cookie, redirect, TLS, security header.",
    "Request and response logging should avoid sensitive headers, cookies, tokens, authorization data, and raw request bodies."
  ]
};
