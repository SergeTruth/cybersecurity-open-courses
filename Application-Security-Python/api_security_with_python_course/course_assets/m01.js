window.COURSE_MODULE = {
  "title": "What API Security Means for Python Developers",
  "graphicAlt": "A request passes through input validation and authorization to a limited response, with monitoring feeding continued review.",
  "narration": "APIs are interfaces that expose data, business logic, automation, and service-to-service communication. A Python API might support a customer portal, a mobile application, an internal operations tool, a partner integration, a batch workflow, or an automation endpoint used by other services. The interface may not have a traditional browser screen, but it still makes decisions about identity, data access, workflow state, and sensitive operations.\n\nAPI security with Python means protecting the full request and response lifecycle. That includes route design, request validation, authentication, authorization, token handling, object-level access control, data access, file handling, secrets, dependencies, logging, monitoring, and deployment assumptions. Frameworks such as Flask, Django, and FastAPI can provide useful patterns, but the application still owns its trust boundaries and business rules.\n\nIt helps to separate the layers involved. API design defines what clients can ask for. Application logic decides what the system should do. Identity systems establish who or what is calling. Authorization determines whether the caller may perform the action. Infrastructure may provide gateways, proxies, TLS, routing, and rate controls. Operations teams provide logging, alerting, patching, and incident response. Secure APIs require these layers to reinforce one another.\n\nThe safest API programs have clear ownership, documentation, tests, and monitoring. Every endpoint should have a purpose, an expected caller, an input contract, an authorization model, a response contract, and operational signals that show whether it is behaving normally. API security is not a one-time gate before launch. It is a continuous discipline across design, implementation, deployment, and production review.",
  "narrationPoints": [
    "APIs are interfaces that expose data.",
    "API security with Python means protecting the full request.",
    "separate the layers involved.",
    "The safest API programs have clear ownership.",
    "Application logic decides what the system should do.",
    "It is a continuous discipline across design."
  ]
};
