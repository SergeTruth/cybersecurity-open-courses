window.COURSE_MODULE = {
  "title": "Networking, VPC Access, and Service Boundaries",
  "graphicAlt": "A function uses reviewed network paths where needed, while private-service access still requires IAM or application policy and bounded failure handling.",
  "narration": "Lambda functions can run with or without VPC configuration depending on resource access needs. VPC access can enable private connectivity to databases, caches, internal services, and VPC endpoints. It can also introduce networking, routing, DNS, and permission considerations that should be understood before production.\n\nPrivate subnet placement is not authorization. A function may reach a private database or internal API, but the application should still rely on IAM, application policy, resource policy, and data-layer controls where appropriate. Network location can reduce exposure; it does not prove business permission.\n\nSecurity groups, subnet selection, route tables, NAT access, VPC endpoints, DNS resolution, and outbound dependency access all need review. A function should have the network paths it needs and no more. Missing paths can cause timeouts, while broad paths can make the workload harder to reason about.\n\nVPC-attached functions may require EC2 network-interface permissions as part of their operation. Those role permissions should be scoped and reviewed so that networking requirements do not accidentally expand the function's authority beyond the workload need.\n\nService boundaries should be explicit. A function that calls another service should have a clear identity, authorization model, timeout, retry behavior, logging pattern, and failure response. The network is only one layer of the decision.",
  "narrationPoints": [
    "VPC access can enable private connectivity to databases, caches, internal services, and VPC endpoints.",
    "A function may reach a private database or internal API, but the application should still rely on IAM, application policy, resource policy.",
    "A function should have the network paths it needs and no more.",
    "VPC-attached functions may require EC2 network-interface permissions as part of their operation.",
    "A function that calls another service should have a clear identity, authorization model, timeout, retry behavior, logging pattern."
  ]
};
