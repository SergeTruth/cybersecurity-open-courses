window.COURSE_MODULE = {
  "title": "Networking, Service Exposure, and Traffic Flow",
  "graphicAlt": "Trace routing, ports, selectors and listener behavior while separating public, internal and monitoring endpoints.",
  "narration": "A useful way to reason about Kubernetes networking is to follow a request. A client reaches an ingress controller, gateway, load balancer, or reverse proxy. That routing layer forwards traffic to a Service. The Service selects ready Pods using labels. Traffic then reaches a container port inside a Pod, where the Node.js process must be listening on the expected interface and port. A mistake at any one of those steps can look like an application outage even when the code itself is healthy.\n\nMany production bugs are configuration mismatches. The Service targets the wrong port. The Pod labels do not match the Service selector. The application listens only on localhost when it should accept traffic inside the container. The Ingress routes the wrong hostname or path. TLS termination happens at a proxy, but the application does not trust forwarded headers correctly. Cookie security, CORS, redirects, and absolute URLs may all depend on the real deployment path, not the local development path.\n\nExposure should be deliberate. Internal admin endpoints, debug ports, development servers, and metrics endpoints should not be reachable from the public internet by accident. Health endpoints should reveal service status without leaking sensitive details. Metrics should be available to monitoring systems without becoming an information disclosure path. Network policies, service mesh policy, namespaces, and platform controls can restrict traffic paths where available, but they need clear design intent to be effective.\n\nFor Node.js teams, networking review should be part of deployment review. Confirm the container port, Service port, selectors, Ingress or gateway rules, TLS assumptions, trusted proxy settings, CORS behavior, cookie settings, and separation of public, internal, health, and metrics endpoints. Kubernetes provides several layers of routing and service discovery. The engineering task is to make sure those layers expose exactly the service boundary you intended, and no more.",
  "narrationPoints": [
    "A useful way to reason about Kubernetes networking is.",
    "Many production bugs are configuration mismatches.",
    "Exposure should be deliberate.",
    "js process must be listening on the expected interface.",
    "The application listens only on localhost.",
    "Internal admin endpoints."
  ]
};
